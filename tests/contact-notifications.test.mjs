import assert from "node:assert/strict";
import test from "node:test";
import { deliverContactNotification } from "../db/contact-notifications.ts";
const input = { id: "example", name: "Reader", email: "reader@example.com", telegram: null, discord: null, message: "Course enquiry" };
const config = { url: "https://bytebeetle-contact-mailer.0xbytebeetle.workers.dev/notify", token: "test-only" };
test("notifications use the authenticated fixed relay", async () => {
  let called = false;
  assert.equal(await deliverContactNotification(input, config, async (url, options) => {
    called = true;
    assert.equal(url, config.url);
    assert.equal(options.headers.Authorization, "Bearer test-only");
    assert.equal(options.redirect, "manual");
    assert.deepEqual(JSON.parse(options.body), input);
    return Response.json({ ok: true });
  }), true);
  assert.equal(called, true);
});
test("notification failures and unexpected destinations are reported without throwing", async () => {
  for (const response of [Response.json({ ok: false }), new Response("Failure", { status: 502 })]) {
    assert.equal(await deliverContactNotification(input, config, async () => response), false);
  }
  assert.equal(await deliverContactNotification(input, config, async () => { throw new Error("offline"); }), false);
  assert.equal(await deliverContactNotification(input, { ...config, url: "https://stranger.example" }, async () => assert.fail()), false);
});
