import assert from "node:assert/strict";
import test from "node:test";
import { submitCourseInterest } from "../app/bootcamps/submit-course-interest.ts";
import { handleCourseInterest } from "../app/api/course-interest/handler.ts";

const payload = course => ({ course, name: "Reader", email: "reader@example.com", website: "", startedAt: Date.now() - 5000 });

test("both waitlists pass through client serialization and server validation to the mocked inbox", async () => {
  for (const [course, title] of [["advanced-evm", "Advanced EVM Bootcamp"], ["solana", "Solana Bootcamp"]]) {
    const saved = [];
    await submitCourseInterest(payload(course), async (url, init) => {
      assert.equal(url, "/api/course-interest");
      assert.equal(init.method, "POST");
      assert.equal(init.headers["Content-Type"], "application/json");
      assert.equal(JSON.parse(init.body).course, course);
      return handleCourseInterest(new Request(`https://test.invalid${url}`, init), async input => { saved.push(input); });
    });
    assert.equal(saved.length, 1);
    assert.equal(saved[0].email, "reader@example.com");
    assert.ok(saved[0].message.startsWith(`Waitlist interest: ${title}`));
    assert.match(saved[0].message, /not enrollment, payment, or course access/);
  }
});

test("a waitlist request cannot report success before the mocked inbox save completes", async () => {
  let release;
  let entered;
  const blocked = new Promise(resolve => { release = resolve; });
  const saving = new Promise(resolve => { entered = resolve; });
  let completed = false;
  const operation = submitCourseInterest(payload("solana"), async (url, init) =>
    handleCourseInterest(new Request(`https://test.invalid${url}`, init), async () => { entered(); await blocked; })
  ).then(() => { completed = true; });
  await saving;
  assert.equal(completed, false);
  release();
  await operation;
  assert.equal(completed, true);
});

test("waitlist save failures, invalid acknowledgements and network errors stay failures", async () => {
  for (const course of ["advanced-evm", "solana"]) {
    await assert.rejects(submitCourseInterest(payload(course), async (url, init) =>
      handleCourseInterest(new Request(`https://test.invalid${url}`, init), async () => { throw new Error("mock database unavailable"); })
    ), /could not be saved/);
  }
  for (const response of [Response.json({ ok: false }), new Response("invalid JSON"), Response.json({ ok: true }, { status: 503 })]) {
    await assert.rejects(submitCourseInterest(payload("solana"), async () => response), /could not be saved/);
  }
  await assert.rejects(submitCourseInterest(payload("solana"), async () => { throw new Error("mock network offline"); }), /mock network offline/);
});
