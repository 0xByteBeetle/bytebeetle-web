import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import { Miniflare } from "miniflare";

test("Cloudflare runtime accepts the relay request and never follows redirects", async () => {
  const source = stripTypeScriptTypes(await readFile(new URL("../db/contact-notifications.ts", import.meta.url), "utf8"));
  let status = 200;
  let calls = 0;
  const mf = new Miniflare({
    compatibilityDate: "2026-05-22",
    modules: true,
    script: `${source}
        export default { async fetch() {
          const reasons = [];
          const ok = await deliverContactNotification(
            { id: "runtime-test", name: null, email: "reader@example.com", telegram: null, discord: null, message: "Course enquiry" },
            { url: "https://bytebeetle-contact-mailer.0xbytebeetle.workers.dev/notify", token: "test-only" },
            fetch, reason => reasons.push(reason)
          );
          return Response.json({ ok, reasons });
        }};
      `,
    // Intercept all outbound traffic: this regression test cannot send an email.
    outboundService: async request => {
      calls++;
      assert.equal(request.url, "https://bytebeetle-contact-mailer.0xbytebeetle.workers.dev/notify");
      assert.equal(request.headers.get("authorization"), "Bearer test-only");
      await request.body?.cancel();
      return status === 200 ? Response.json({ ok: true }) : new Response(null, { status, headers: { Location: "https://unexpected.example" } });
    },
  });
  try {
    assert.deepEqual(await (await mf.dispatchFetch("https://test.example")).json(), { ok: true, reasons: [] });
    status = 302;
    assert.deepEqual(await (await mf.dispatchFetch("https://test.example")).json(), { ok: false, reasons: ["relay_http_302"] });
    assert.equal(calls, 2);
  } finally { await mf.dispose(); }
});
