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

test("direct email is available in the footer and on contact and course pages", async () => {
  for (const path of ["/", "/contact", "/bootcamps/evm-engineering", "/bootcamps/advanced-evm"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.match(footer ?? "", /href="mailto:bytebeetle1@gmail\.com"/);
    if (path !== "/") {
      const content = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/, "");
      assert.match(content, /href="mailto:bytebeetle1@gmail\.com(?:\?subject=[^"]*)?"/);
    }
  }
});

test("bootcamp enquiries stay on the course page with a small inline form", async () => {
  for (const path of ["/bootcamps/evm-engineering", "/bootcamps/advanced-evm"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href="#course-interest"/);
    assert.match(html, /id="course-interest"/);
    assert.doesNotMatch(html, /Ask about guided study/);
    const form = html.match(/<form\b[^>]*aria-label="Bootcamp interest"[^>]*>([\s\S]*?)<\/form>/)?.[1];
    assert.ok(form);
    assert.match(form, /name="name"/);
    assert.match(form, /name="email"/);
    assert.doesNotMatch(form, /<textarea|name="telegram"|name="discord"/);
    assert.match(form, /No newsletter signup/);
  }
});

test("the Solana archive exposes the corrected wallet example", async () => {
  const response=await render("/blogs/solana?q=Part%206");
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/Updated example/);
  assert.match(html,/https:\/\/github.com\/0xByteBeetle\/blog-solutions\/tree\/main\/articles\/solana\/understanding-solana-part-6-transactions/);
});

test("blog category tabs show labels without article counts", async () => {
  for (const pathname of ["/blogs", "/blogs/evm", "/blogs/solana", "/blogs/hyperliquid"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    const navigation = html.match(/<nav\b[^>]*aria-label="Blog categories"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(navigation, pathname);
    const labels = [...navigation.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)]
      .map(match => match[1].replace(/<[^>]*>/g, "").trim());
    assert.deepEqual(labels, ["All articles", "EVM", "Solana", "Hyperliquid"], pathname);
  }
});

test("server-renders the 0xByteBeetle landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>0xByteBeetle \| Blockchain internals by Andrey Obruchkov<\/title>/i);
  assert.match(html, /for technical people who want to go deeper/);
  assert.match(html, /Understanding blockchain,/);
  assert.match(html, /beneath the surface/);
  assert.match(html, /Start exploring/);
  assert.match(html, /Blogs/);
  assert.match(html, /href="\/blogs"/);
  assert.match(html, /href="\/blogs\/evm"/);
  assert.match(html, /href="\/blogs\/solana"/);
  assert.match(html, /href="\/blogs\/hyperliquid"/);
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
  for (const nav of navs) assert.match(nav[1], /<a(?=[^>]*href="\/")(?=[^>]*aria-current="page")[^>]*>Home<\/a>/);
  assert.ok(html.indexOf('id="writing-title"') < html.indexOf('id="study-title"'));
  assert.equal((html.match(/<article>/g) ?? []).length, 3);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders the dedicated public knowledge pages", async () => {
  const expectations = [
    ["/blogs", /Article library/],
    ["/blogs/evm", /EVM blogs/],
    ["/blogs/solana", /Solana blogs/],
    ["/blogs/hyperliquid", /Hyperliquid blogs/],
    ["/bootcamps", /Read it, question it, try it/],
    ["/bootcamps/evm-engineering", /From protocol mechanics to a working system/],
    ["/bootcamps/advanced-evm", /advanced token engineering, from ERC-20 to hybrid standards/],
    ["/resources", /Code and curricula you can explore yourself/],
    ["/about", /I want to understand what happens beneath the interface/],
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

test("Hyperliquid lists only the published post, supports topic search, and has no invented companion", async () => {
  for (const path of ["/blogs/hyperliquid", "/blogs/hyperliquid?q=HyperCore", "/blogs?q=Hyperliquid"]) {
    const html = (await (await render(path)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const results = html.match(/<ul class="blog-results">([\s\S]*?)<\/ul>/)?.[1];
    assert.ok(results, path);
    assert.equal((results.match(/class="blog-entry"/g) ?? []).length, 1);
    assert.match(results, /Hyperliquid: Beyond Generic VMs: The Architecture Internals Part 1/);
    assert.match(results, /href="\/blogs\/hyperliquid\/hyperliquid-beyond-generic-vms-the"/);
    assert.doesNotMatch(results, /target="_blank"/);
    assert.match(results, /Architecture/);
    assert.doesNotMatch(results, /blog-code-link|Part 2|draft|Solana|EVM internals/);
    if (path.startsWith("/blogs/hyperliquid")) assert.doesNotMatch(html, /class="blog-medium"/);
  }
  const resources = await (await render("/resources")).text();
  assert.doesNotMatch(resources, /Implementations behind the explanations|Source reading|class="source-list"/);
});

test("the native article renders its full body, original link, code, and local images", async () => {
  const response = await render("/blogs/hyperliquid/hyperliquid-beyond-generic-vms-the");
  assert.equal(response.status, 200);
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(html, /data-article-body/);
  assert.match(html, /If you’ve been following my recent series/);
  assert.match(html, /pub struct ClearinghouseState/);
  assert.match(html, /Read on Substack/);
  assert.match(html, /href="https:\/\/andreyobruchkov1996.substack.com\/p\/hyperliquid-beyond-generic-vms-the"/);
  assert.equal((html.match(/class="reading-image-open"/g) ?? []).length, 3);
  assert.equal((html.match(/<pre\b/g) ?? []).length, 2);
  assert.equal((html.match(/<h2\b/g) ?? []).length, 5);
  assert.equal((html.match(/<h3\b/g) ?? []).length, 5);
  assert.match(html, /aria-label="Copy rust code"/);
  assert.match(html, /aria-label="Copy jsonc code"/);
  assert.doesNotMatch(html, /<iframe|substackcdn.com|<hr\b/);
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
    assert.deepEqual(links, [["/", "Home"], ["/blogs", "Blogs"], ["/bootcamps", "Bootcamps"], ["/about", "About"], ["/contact", "Contact"]], pathname);
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer, pathname);
    referenceFooter ??= footer;
    assert.equal(footer, referenceFooter, pathname);
    assert.match(footer, /href="\/resources"/, pathname);
    assert.doesNotMatch(footer, /href="\/inbox"|Owner inbox/, pathname);
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

test("the homepage starts with one first article per ecosystem", async () => {
  const html = (await (await render()).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const starters = html.match(/<section class="writing wrap"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(starters);
  const articles = [...starters.matchAll(/<article>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert.equal(articles.length, 3);
  for (const [index, chain, slug] of [
    [0, "EVM", "what-every-blockchain-developer-should-know-about-evm-internals-part-1-83a93c618257"],
    [1, "Solana", "understanding-solana-architecture-account-model-and-transactions-part-1-1bffae449650"],
    [2, "Hyperliquid", "hyperliquid-beyond-generic-vms-the"],
  ]) {
    assert.ok(articles[index].includes(slug));
    assert.ok(articles[index].includes(chain));
    assert.match(articles[index], /Read Part 1/);
    assert.match(articles[index], /Explore the series/);
    assert.match(articles[index], /<p>[^<]+<\/p>/);
  }
  assert.doesNotMatch(starters, /github\.com|Example code|Borsh|Factories/);
  assert.match(articles[2], /href="\/blogs\/hyperliquid\/hyperliquid-beyond-generic-vms-the"/);
});

test("chain pages offer explicit reading order, without interrupting archive searches", async () => {
  const { readingPaths } = await import("../app/reading-paths.ts");
  for (const chain of ["EVM", "Solana"]) {
    const route = `/blogs/${chain.toLowerCase()}`;
    const html = (await (await render(route)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const path = html.match(/<section class="reading-path"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(path);
    assert.match(path, /Start here/);
    assert.match(path, /<details class="reading-order">/);
    const list = path.match(/<ol>([\s\S]*?)<\/ol>/)?.[1];
    assert.ok(list);
    const hrefs = [...list.matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(hrefs.map(href => href.split("/p/")[1]), readingPaths[chain].slugs);
    assert.ok(html.indexOf('class="reading-path"') < html.indexOf('class="blog-tools"'));
    const filtered = (await (await render(`${route}?q=accounts`)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.doesNotMatch(filtered, /class="reading-path"/);
  }
});

test("a one-article chain stays simple while direct search URLs still work", async () => {
  const html = (await (await render("/blogs/hyperliquid")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(html, /<h2>Start here<\/h2>/);
  assert.doesNotMatch(html, /class="blog-tools"|class="blog-pagination"|class="reading-path"/);
  const filtered = (await (await render("/blogs/hyperliquid?q=missing-post")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(filtered, /No articles found/);
  assert.match(filtered, /id="article-search"/);
  assert.match(filtered, /Clear filters/);
});

test("article summaries and resource labels do not promise nonexistent code", async () => {
  const html = (await (await render("/blogs/solana?q=Architecture%20Account%20Model" )).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const results = html.match(/<ul class="blog-results">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(results);
  assert.match(results, /class="blog-entry-description"/);
  assert.doesNotMatch(results, /blog-code-link|github\.com/);
  const evm = (await (await render("/blogs/evm?q=Internals%20Part%201")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(evm, /Article resources/);
  assert.doesNotMatch(evm, />Example code/);
  const token = (await (await render("/blogs/solana?q=Interest-Bearing")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(token, /Tokens &amp; extensions/);
});

test("course pages explain the project before the curriculum and show grounded previews", async () => {
  for (const route of ["/bootcamps/evm-engineering", "/bootcamps/advanced-evm"]) {
    const html = (await (await render(route)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.ok(html.indexOf('id="course-overview-heading"') < html.indexOf('id="curriculum"'));
    assert.match(html, /A question from the course/);
    assert.match(html, /class="lesson-observation"/);
    assert.doesNotMatch(html, /instructor side|Course journal|instructor\/|teacher|testPermitCreates/);
    assert.doesNotMatch(html, /\$799|\$999|45-minute|daily private text support/i);
    if (route.endsWith("evm-engineering")) {
      assert.match(html, /fixed-ratio SimpleSwap/);
      assert.match(html, /PostgreSQL/);
      assert.match(html, /Static call/);
      assert.match(html, /Original caller/);
    } else {
      assert.match(html, /In development/);
      assert.match(html, /125 tokens/);
      assert.match(html, /1,000 tokens/);
      assert.match(html, /not a guarantee that a protocol is secure/);
    }
  }
});

test("All articles starts with expandable published series and separates standalone deep dives", async () => {
  const { articleSeries } = await import("../app/reading-paths.ts");
  const html = (await (await render("/blogs")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(html, /class="blog-library combined-library"/);
  assert.match(html, /<a href="\/blogs" aria-current="page">Browse series<\/a>/);
  assert.match(html, /href="\/blogs\?view=latest"/);
  assert.equal((html.match(/class="series-row"/g) ?? []).length, 5);
  assert.equal((html.match(/<details class="series-disclosure">/g) ?? []).length, 5);
  assert.match(html, /Individual deep dives/);
  assert.doesNotMatch(html, /id="article-topic"|id="article-sort"/);
  const lists = [...html.matchAll(/<ol class="series-parts"[^>]*>([\s\S]*?)<\/ol>/g)];
  lists.forEach((match, index) => {
    const hrefs = [...match[1].matchAll(/<a href="([^"]+)"/g)].map(link => link[1]);
    assert.deepEqual(hrefs.map(href => href.split("/").at(-1)), articleSeries[index].slugs);
  });
  const standalone = html.match(/<ul class="blog-results">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(standalone);
  for (const slug of articleSeries.flatMap(series => series.slugs)) assert.ok(!standalone.includes(slug), slug);
  assert.match(standalone, /architecting-high-performance-solana/);
});

test("Latest articles is a date-ordered feed and links numbered parts back to their beginning", async () => {
  const html = (await (await render("/blogs?view=latest")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<!--.*?-->/g, "");
  assert.match(html, /<a href="\/blogs\?view=latest" aria-current="page">Latest articles<\/a>/);
  assert.doesNotMatch(html, /class="series-directory"/);
  assert.match(html, /id="article-sort"/);
  const dates = [...html.matchAll(/<time class="blog-entry-date" dateTime="([^"]+)"/gi)].map(match => Date.parse(match[1]));
  assert.equal(dates.length, 12);
  for (let index = 1; index < dates.length; index++) assert.ok(dates[index - 1] > dates[index]);
  assert.match(html, /Sep 6, 2026/);
  assert.match(html, /Part 6 of 6/);
  assert.match(html, /Start series/);
  assert.match(html, /href="https:\/\/andreyobruchkov1996.substack.com\/p\/understanding-solana-architecture-account-model-and-transactions-part-1-1bffae449650"/);
  assert.doesNotMatch(html, /Part 1 of 1/);
});

test("search crosses series and standalone posts in either combined view", async () => {
  for (const view of ["", "&view=latest"]) {
    const html = (await (await render(`/blogs?q=Solana%20Part%203${view}`)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<!--.*?-->/g, "");
    assert.doesNotMatch(html, /class="series-directory"/);
    assert.match(html, /Part 3 of 6/);
    assert.match(html, /Start series/);
    assert.match(html, /Search results/);
    assert.match(html, /href="\/blogs\?view=latest&amp;q=Solana\+Part\+3"/);
    const standalone = (await (await render(`/blogs?q=Borsh${view}`)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.match(standalone, /Unpacking Borsh/);
    assert.doesNotMatch(standalone, /article-series-position/);
  }
  const oldest = (await (await render("/blogs?sort=oldest")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(oldest, /class="series-directory"/);
  assert.match(oldest, /Oldest first/);
  const missing = (await (await render("/blogs?q=not-a-published-article")).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(missing, /No articles found/);
  assert.match(missing, /Clear filters/);
});

test("individual chain pages retain their existing reading paths and layout", async () => {
  for (const chain of ["evm", "solana", "hyperliquid"]) {
    const html = (await (await render(`/blogs/${chain}`)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.doesNotMatch(html, /combined-library|Article views|class="series-directory"|article-series-position/);
    assert.match(html, /class="blog-library"/);
    if (chain !== "hyperliquid") assert.match(html, /class="reading-path"/);
  }
});
