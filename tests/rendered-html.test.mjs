import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
  assert.match(html, /Blogs/);
  assert.match(html, /href="\/blogs"/);
  assert.match(html, /href="\/blogs\/evm"/);
  assert.match(html, /href="\/blogs\/solana"/);
  assert.match(html, /href="\/bootcamps"/);
  assert.match(html, /href="\/resources"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /EVM Engineering Bootcamp/);
  assert.match(html, /Advanced EVM Bootcamp/);
  assert.match(html, /If code appears in a lesson, it exists on our side, it runs/);
  assert.match(html, /Send me a note/);
  assert.match(html, /Telegram/);
  assert.match(html, /Discord/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders the dedicated public knowledge pages", async () => {
  const expectations = [
    ["/blogs", /Article library/],
    ["/blogs/evm", /EVM blogs/],
    ["/blogs/solana", /Solana blogs/],
    ["/bootcamps", /A course should survive contact with the terminal/],
    ["/bootcamps/evm-engineering", /From protocol mechanics to a working system/],
    ["/bootcamps/advanced-evm", /Advanced token engineering, from ERC-20 to hybrid standards/],
    ["/resources", /Code, curricula, and sources you can inspect yourself/],
    ["/about", /I learn systems by taking them apart/],
    ["/contact", /I read these messages myself/],
  ];

  for (const [pathname, expected] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, expected, pathname);
    assert.match(html, /0xByteBeetle/, pathname);
  }
});

test("ships finished project metadata", async () => {
  const [layout, page, blogs, evmBlogs, solanaBlogs, bootcamps, resources, catalog] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blogs/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blogs/evm/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blogs/solana/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/bootcamps/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/resources/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/substack-articles.generated.ts", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /learn\.andreyobruchkov\.com/);
  assert.match(layout, /0xByteBeetle: Multichain Engineering Education/);
  assert.match(layout, /Notes, bootcamps, and practical experiments/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  assert.match(blogs, /BlogLibraryPage/);
  assert.match(evmBlogs, /chain="EVM"/);
  assert.match(solanaBlogs, /chain="Solana"/);
  assert.equal((catalog.match(/"solutionHref":/g) ?? []).length, 53);
  assert.equal((catalog.match(/"chain": "EVM"/g) ?? []).length, 37);
  assert.equal((catalog.match(/"chain": "Solana"/g) ?? []).length, 16);
  assert.match(bootcamps, /Complete curriculum/);
  assert.match(resources, /Blog Solutions/);
  await access(new URL("../public/andrey-logo.jpeg", import.meta.url));
  await access(new URL("../public/og-v2.png", import.meta.url));
  await access(new URL("../drizzle/0000_contact_submissions.sql", import.meta.url));
  await access(new URL("../app/api/contact/route.ts", import.meta.url));
  await access(new URL("../app/inbox/page.tsx", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("blog URLs restore searches and keep chain archives scoped", async () => {
  const scenarios = [
    ["/blogs?q=borsh", /Borsh/, /UUPS proxy/],
    ["/blogs/evm?topic=Proxies%20%26%20deployment", /UUPS proxy/, /Zero-Copy/],
    ["/blogs/solana?q=nonexistent-keyword", /No articles found/, /class="blog-entry"/],
  ];
  for (const [pathname, expected, absent] of scenarios) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    // Ignore hydration payloads, which legitimately contain the full catalog.
    const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const results = rendered.slice(rendered.indexOf('aria-label="Article library"'), rendered.indexOf('class="blog-medium"'));
    assert.match(results, expected, pathname);
    assert.doesNotMatch(results, absent, pathname);
    assert.match(results, /id="article-search"/);
    assert.match(results, /aria-label="Blog categories"/);
  }
});
