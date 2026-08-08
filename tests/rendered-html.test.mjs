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

test("server-renders the ByteBeetle landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ByteBeetle — EVM Engineering Education<\/title>/i);
  assert.match(html, /Understand Ethereum at the level where it actually runs/);
  assert.match(html, /What you learn to do/);
  assert.match(html, /EVM Engineering Bootcamp/);
  assert.match(html, /Advanced EVM Bootcamp/);
  assert.match(html, /Every code example shown in a lesson is maintained as runnable course code/);
  assert.match(html, /One-to-one mentoring/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships finished project metadata", async () => {
  const [layout, page] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /learn\.andreyobruchkov\.com/);
  assert.match(layout, /ByteBeetle — EVM Engineering Education/);
  assert.match(layout, /Understand Ethereum at the level where it actually runs/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  await access(new URL("../public/andrey-logo.jpeg", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
