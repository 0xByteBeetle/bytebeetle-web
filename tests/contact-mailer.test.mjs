import assert from "node:assert/strict";
import test from "node:test";
import worker from "../infra/contact-mailer/worker.mjs";
const input = { id: "test-request", name: "Reader", email: "reader@example.com", message: "Please contact me about the bootcamp." };
const request = (data = input, token = "test-token") => new Request("https://mailer.example/notify", { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(data) });
const env = (send, allowed = true) => ({ MAILER_TOKEN: "test-token", EMAIL: { send }, PER_CONTACT: { limit: async () => ({ success: allowed }) }, GLOBAL_LIMIT: { limit: async () => ({ success: allowed }) } });
test("mailer rejects unauthorized, invalid and rate-limited requests", async () => {
  const never = async () => assert.fail("Must not send");
  assert.equal((await worker.fetch(request(input, "wrong"), env(never))).status, 401);
  assert.equal((await worker.fetch(request({ ...input, email: "reader@example.com\nBcc: stranger@example.com" }), env(never))).status, 400);
  assert.equal((await worker.fetch(request(), env(never, false))).status, 429);
});
test("mailer fixes the recipient and sender and sets reply-to to the visitor", async () => {
  const sent = [];
  const response = await worker.fetch(request({ ...input, to: "stranger@example.com" }), env(async data => { sent.push(data); return { messageId: "test-id" }; }));
  assert.equal(response.status, 200);
  assert.equal(sent[0].to, "bytebeetle1@gmail.com");
  assert.equal(sent[0].from, "notifications@0xbytebeetle.com");
  assert.equal(sent[0].replyTo, "reader@example.com");
});
test("mailer does not report success for failed delivery", async () => {
  assert.equal((await worker.fetch(request(), env(async () => { throw new Error("unavailable"); }))).status, 502);
});
