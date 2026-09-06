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

test("the Solana archive exposes the corrected wallet example", async () => {
  const response=await render("/blogs/solana?q=Part%206");
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/Updated example/);
  assert.match(html,/https:\/\/github.com\/0xByteBeetle\/blog-solutions\/tree\/main\/articles\/solana\/understanding-solana-part-6-transactions/);
});

test("blog category tabs show labels without article counts", async () => {
  for (const pathname of ["/blogs", "/blogs/evm", "/blogs/solana"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    const navigation = html.match(/<nav\b[^>]*aria-label="Blog categories"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(navigation, pathname);
    const labels = [...navigation.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)]
      .map(match => match[1].replace(/<[^>]*>/g, "").trim());
    assert.deepEqual(labels, ["All articles", "EVM", "Solana"], pathname);
  }
});

test("server-renders the 0xByteBeetle landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>0xByteBeetle: Multichain Engineering Education<\/title>/i);
  assert.match(html, /Notes, bootcamps, and practical experiments/);
  assert.match(html, /Understanding blockchain,/);
  assert.match(html, /beneath the surface/);
  assert.match(html, /A few places to begin/);
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
  assert.match(html, /Prefer a structured path/);
  assert.match(html, /Hi, I’m Andrey/);
  assert.doesNotMatch(html, /What I am exploring|The course rule|<form/);
  const navs = [...html.matchAll(/<nav\b[^>]*aria-label="(?:Main|Mobile) navigation"[^>]*>([\s\S]*?)<\/nav>/g)];
  assert.equal(navs.length, 2);
  for (const nav of navs) assert.match(nav[1], /<a href="\/" aria-current="page">Home<\/a>/);
  assert.ok(html.indexOf('id="writing-title"') < html.indexOf('id="study-title"'));
  assert.equal((html.match(/<article>/g) ?? []).length, 3);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders the dedicated public knowledge pages", async () => {
  const expectations = [
    ["/blogs", /Article library/],
    ["/blogs/evm", /EVM blogs/],
    ["/blogs/solana", /Solana blogs/],
    ["/bootcamps", /A course should survive contact with the terminal/],
    ["/bootcamps/evm-engineering", /From protocol mechanics to a working system/],
    ["/bootcamps/advanced-evm", /advanced token engineering, from ERC-20 to hybrid standards/],
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
    assert.match(html, /<a href="\/">Home<\/a>/, pathname);
    if (pathname === "/contact") {
      assert.match(html, /<form/);
      assert.match(html, /Telegram/);
      assert.match(html, /Discord/);
    }
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

test("all public pages share the editorial header, navigation and footer", async () => {
  const routes = ["/", "/blogs", "/blogs/evm", "/blogs/solana", "/bootcamps", "/bootcamps/evm-engineering", "/bootcamps/advanced-evm", "/resources", "/about", "/contact", "/privacy"];
  let referenceFooter;
  for (const pathname of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.match(html, /<body class="site-design\b/, pathname);
    assert.equal((html.match(/class="site-header"/g) ?? []).length, 1, pathname);
    const desktop = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(desktop, pathname);
    const links = [...desktop.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map((match) => [match[1], match[2].trim()]);
    assert.deepEqual(links, [["/", "Home"], ["/blogs", "Blogs"], ["/bootcamps", "Bootcamps"], ["/resources", "Resources"], ["/about", "About"], ["/contact", "Contact"]], pathname);
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer, pathname);
    referenceFooter ??= footer;
    assert.equal(footer, referenceFooter, pathname);
    assert.match(footer, /href="\/inbox"/, pathname);
    assert.doesNotMatch(html, /class="brand-mark"|class="header-action"/, pathname);
  }
});

test("contact and curricula retain their controls after the visual update", async () => {
  const contact = await (await render("/contact")).text();
  for (const name of ["name", "email", "telegram", "discord", "message", "website"]) {
    assert.match(contact, new RegExp(`name="${name}"`));
  }
  assert.match(contact, /type="submit"/);
  assert.match(contact, /href="\/privacy"/);
  for (const route of ["/bootcamps/evm-engineering", "/bootcamps/advanced-evm"]) {
    const html = await (await render(route)).text();
    assert.match(html, /href="#curriculum"/, route);
    assert.match(html, /class="curriculum-weeks"/, route);
    assert.doesNotMatch(html, /href="https:\/\/docs\.google\.com/, route);
  }
});

test("full weekly curriculum summaries are server-rendered without external redirects", async () => {
  const { foundationCurriculum, advancedCurriculum } = await import("../app/bootcamps/curriculum-data.ts");
  for (const [route, weeks] of [["/bootcamps/evm-engineering", foundationCurriculum], ["/bootcamps/advanced-evm", advancedCurriculum]]) {
    const html = (await (await render(route)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.equal((html.match(/<details class="curriculum-week"/g) ?? []).length, weeks.length);
    assert.equal((html.match(/<details class="curriculum-week" open=""/g) ?? []).length, 1);
    for (const week of weeks) {
      assert.ok(html.includes(week.label), week.label);
      assert.ok(html.includes(week.title.replaceAll("&", "&amp;")), week.title);
      for (const suffix of ["topics", "hands-on work", "outcomes"]) {
        assert.ok(html.includes(`aria-label="${week.label} ${suffix}"`), `${week.label} ${suffix}`);
      }
    }
    assert.match(html, /Expand all weeks/);
    assert.match(html, /Collapse all/);
    assert.match(html, /aria-controls="curriculum-weeks"/);
    assert.doesNotMatch(html, /Open Google Doc|Open the full curriculum|Open the working curriculum/);
  }
  assert.equal(foundationCurriculum.length, 5);
  assert.equal(foundationCurriculum.at(-1).label, "Weeks 5–6");
  assert.equal(advancedCurriculum.length, 6);
  assert.equal(advancedCurriculum[0].modules.length, 8);
  const advanced = await (await render("/bootcamps/advanced-evm")).text();
  assert.match(advanced, /Working curriculum/);
  assert.match(advanced, /Modules in this week/);
  const resources = await (await render("/resources")).text();
  assert.match(resources, /href="\/bootcamps\/evm-engineering#curriculum"/);
  assert.match(resources, /href="\/bootcamps\/advanced-evm#curriculum"/);
  assert.doesNotMatch(resources, /href="https:\/\/docs\.google\.com/);
});

test("the shared theme owns the shell and includes responsive page and form layouts", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/design.css", import.meta.url), "utf8");
  const homeCss = await readFile(new URL("../app/home.css", import.meta.url), "utf8");
  assert.match(layout, /import "\.\/design.css"/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /\.site-design \.site-header/);
  assert.match(css, /\.site-design \.site-footer/);
  assert.match(css, /\.site-design \.contact-methods \{ grid-template-columns: 1fr; \}/);
  assert.match(css, /\.site-design \.form-message.error/);
  assert.doesNotMatch(homeCss, /\.site-header|\.mobile-menu|\.editorial-home footer/);
});
