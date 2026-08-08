import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the 0xByteBeetle landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>0xByteBeetle: Multichain Engineering Education<\/title>/i);
  assert.match(html, /Notes, bootcamps, and practical experiments/);
  assert.match(html, /What I am exploring/);
  assert.match(html, /Writing/);
  assert.match(html, /EVM Engineering Bootcamp/);
  assert.match(html, /Advanced EVM Bootcamp/);
  assert.match(html, /If code appears in a lesson, it exists on our side, it runs/);
  assert.match(html, /Send me a note/);
  assert.match(html, /Telegram/);
  assert.match(html, /Discord/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships finished project metadata", async () => {
  const [layout, page] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /learn\.andreyobruchkov\.com/);
  assert.match(layout, /0xByteBeetle: Multichain Engineering Education/);
  assert.match(layout, /Notes, bootcamps, and practical experiments/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  await access(new URL("../public/andrey-logo.jpeg", import.meta.url));
  await access(new URL("../drizzle/0000_contact_submissions.sql", import.meta.url));
  await access(new URL("../app/api/contact/route.ts", import.meta.url));
  await access(new URL("../app/inbox/page.tsx", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
