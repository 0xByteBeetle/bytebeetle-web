import assert from "node:assert/strict";
import test from "node:test";
import { handleCourseInterest } from "../app/api/course-interest/handler.ts";

const valid = () => ({ course: "evm-engineering", name: "Reader", email: "reader@example.com", startedAt: Date.now() - 5000 });
const request = payload => new Request("https://0xbytebeetle.com/api/course-interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

test("a course request saves the visitor and server-selected course without a message field", async () => {
  for (const [course, title] of [["evm-engineering", "EVM Engineering Bootcamp"], ["advanced-evm", "Advanced EVM Bootcamp"]]) {
    const saved = [];
    const response = await handleCourseInterest(request({ ...valid(), course, message: "Ignore the selected course" }), async input => { saved.push(input); });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(saved.length, 1);
    assert.equal(saved[0].email, "reader@example.com");
    assert.match(saved[0].message, new RegExp(title));
    assert.match(saved[0].message, /not a newsletter subscription/);
    assert.doesNotMatch(saved[0].message, /Ignore/);
  }
});

test("course requests reject invalid fields and malformed payloads without saving", async () => {
  const invalid = [null, [], { ...valid(), course: "unknown" }, { ...valid(), course: "__proto__" }, { ...valid(), email: "wrong" }, { ...valid(), email: "" }, { ...valid(), name: "x".repeat(101) }, { ...valid(), startedAt: null }, { ...valid(), startedAt: Date.now() + 10000 }];
  for (const payload of invalid) {
    const response = await handleCourseInterest(request(payload), async () => assert.fail("Must not save invalid request"));
    assert.ok([400, 429].includes(response.status));
  }
  const malformed = new Request("https://0xbytebeetle.com/api/course-interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal((await handleCourseInterest(malformed, async () => assert.fail())).status, 400);
  assert.equal((await handleCourseInterest(request({ ...valid(), name: "Two\nLines" }), async () => assert.fail())).status, 400);
  assert.equal((await handleCourseInterest(request({ ...valid(), extra: "x".repeat(5000) }), async () => assert.fail())).status, 413);
});

test("optional names, honeypots and database failures are handled honestly", async () => {
  const saved = [];
  assert.equal((await handleCourseInterest(request({ ...valid(), name: "" }), async input => { saved.push(input); })).status, 200);
  assert.equal(saved[0].name, null);
  assert.equal((await handleCourseInterest(request({ ...valid(), website: "bot.example" }), async () => assert.fail())).status, 200);
  const failure = await handleCourseInterest(request(valid()), async () => { throw new Error("database unavailable"); });
  assert.equal(failure.status, 503);
  assert.match((await failure.json()).message, /could not be saved/);
});
