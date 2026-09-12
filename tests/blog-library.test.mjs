import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { articlePublicationDate, articleTopic, selectArticles, topicOptions } from "../app/blogs/library-model.ts";

const source = await readFile(new URL("../app/substack-articles.generated.ts", import.meta.url), "utf8");
const catalog = JSON.parse(source.slice(source.indexOf("= [") + 2).trim().replace(/;$/, ""));

test("the corrected wallet example points to the published main-branch article resources", () => {
  const updated=catalog.filter(article=>article.codeUpdated);
  assert.equal(updated.length,1);
  assert.equal(updated[0].slug,"understanding-solana-part-6-transactions");
  assert.equal(updated[0].solutionHref,"https://github.com/0xByteBeetle/blog-solutions/tree/main/articles/solana/understanding-solana-part-6-transactions");
  assert.ok(catalog.every(article=>!article.solutionHref.includes("codex/")));
});

test("topic browsing accounts for every catalog entry without duplicates", () => {
  for (const chain of ["EVM", "Solana"]) {
    const articles = catalog.filter((article) => article.chain === chain);
    const groups = topicOptions(articles);
    const grouped = groups.flatMap(({ label }) => selectArticles(articles, "", label, "newest"));
    assert.equal(grouped.length, articles.length);
    assert.equal(new Set(grouped.map((article) => article.href)).size, articles.length);
    assert.equal(groups.reduce((sum, group) => sum + group.count, 0), articles.length);
  }
});

test("search combines keywords, chain and topic rather than returning unrelated articles", () => {
  const matches = selectArticles(catalog, " SOLANA   borsh ", "Serialization & memory", "newest");
  assert.equal(matches.length, 1);
  assert.match(matches[0].title, /Borsh/);
  assert.equal(selectArticles(catalog, "borsh", "Proxies & deployment", "newest").length, 0);
  assert.equal(selectArticles(catalog, "no-such-article", "", "newest").length, 0);
  assert.equal(selectArticles(catalog, "   ", "", "newest").length, catalog.length);
});

test("sorting is chronological and does not change the original catalog", () => {
  const snapshot = JSON.stringify(catalog);
  const newest = selectArticles(catalog, "", "", "newest");
  const oldest = selectArticles(catalog, "", "", "oldest");
  assert.match(newest[0].title, /Zero-Copy/);
  assert.equal(newest[0].href, oldest.at(-1).href);
  const alphabetical = selectArticles(catalog, "", "", "title");
  assert.equal(alphabetical[0].title, "ABI Encoding Deep Dive: How Solidity Turns Your Data into Bytes");
  assert.equal(JSON.stringify(catalog), snapshot);
});

test("topics distinguish Solana fundamentals from extensions and execution from RPCs", () => {
  const topic = (title) => articleTopic(catalog.find((article) => article.title.includes(title)));
  assert.equal(topic("Part4"), "Transactions & messages");
  assert.equal(topic("Borsh"), "Serialization & memory");
  assert.equal(topic("Confidential Transfers"), "Tokens & extensions");
  assert.equal(topic("UUPS"), "Proxies & deployment");
  assert.equal(topic("SignTypedData"), "Signatures");
  assert.equal(topic("Interest-Bearing"), "Tokens & extensions");
});

test("reading paths resolve to published articles and keep their explicit order", async () => {
  const { readingPaths, readingPathArticles } = await import("../app/reading-paths.ts");
  for (const chain of ["EVM", "Solana"]) {
    const result = readingPathArticles(chain, [...catalog].reverse());
    assert.deepEqual(result.map(article => article.slug), readingPaths[chain].slugs);
    assert.ok(result.every(article => article.chain === chain));
    assert.equal(new Set(result.map(article => article.slug)).size, result.length);
  }
  assert.throws(() => readingPathArticles("EVM", []), /unpublished or missing/);
  assert.deepEqual(readingPaths.Hyperliquid.slugs, ["hyperliquid-beyond-generic-vms-the"]);
});

test("editorial notes cover the published catalog without inventing article records", async () => {
  const { articleDescriptions, articlesWithoutCode } = await import("../app/article-notes.ts");
  const publishedSlugs = [...catalog.map(article => article.slug), "hyperliquid-beyond-generic-vms-the"];
  assert.deepEqual(Object.keys(articleDescriptions).sort(), publishedSlugs.sort());
  assert.ok(Object.values(articleDescriptions).every(description => description.length > 40 && description.length < 190));
  assert.ok([...articlesWithoutCode].every(slug => publishedSlugs.includes(slug)));
});

test("publication sorting uses the original timestamps, including posts on the same day", () => {
  assert.ok(catalog.every(article => Number.isFinite(Date.parse(article.publishedAt))));
  const first = catalog.find(article => article.slug.endsWith("part-1-83a93c618257"));
  assert.equal(first.publishedAt, "2025-07-01T07:29:23.265Z");
  assert.equal(articlePublicationDate(first), "Jul 1, 2025");
  const sameDay = catalog.filter(article => article.publishedAt.startsWith("2025-11-08"));
  assert.ok(sameDay.length > 20);
  const shuffled = [...sameDay].sort((a, b) => a.title.localeCompare(b.title));
  for (const sort of ["newest", "oldest"]) {
    const result = selectArticles(shuffled, "", "", sort);
    for (let index = 1; index < result.length; index++) {
      const delta = Date.parse(result[index].publishedAt) - Date.parse(result[index - 1].publishedAt);
      assert.ok(sort === "newest" ? delta < 0 : delta > 0);
    }
  }
  assert.equal(articlePublicationDate({ ...first, publishedAt: undefined }), "July 2025");
});

test("numbered series resolve in part order and never consume standalone articles", async () => {
  const { articleSeries, resolveSeries, articleSeriesPosition } = await import("../app/reading-paths.ts");
  const hyperliquid = { slug: "hyperliquid-beyond-generic-vms-the", chain: "Hyperliquid", title: "Hyperliquid: Beyond Generic VMs: The Architecture Internals Part 1" };
  const all = [...catalog, hyperliquid];
  const assigned = articleSeries.flatMap(series => {
    const ordered = resolveSeries(series, [...all].reverse());
    assert.deepEqual(ordered.map(article => article.slug), series.slugs);
    ordered.forEach((article, index) => {
      assert.match(article.title, new RegExp(`part\\s*${index + 1}\\b`, "i"));
      assert.equal(articleSeriesPosition(article).part, index + 1);
    });
    return ordered;
  });
  assert.equal(articleSeries.length, 5);
  assert.equal(assigned.length, 14);
  assert.equal(new Set(assigned.map(article => article.slug)).size, 14);
  const standalone = all.filter(article => !articleSeriesPosition(article));
  assert.equal(standalone.length, 40);
  assert.equal(standalone.length + assigned.length, all.length);
  assert.ok(standalone.some(article => article.slug === "architecting-high-performance-solana"));
  assert.equal(articleSeriesPosition({ ...hyperliquid, chain: "EVM" }), undefined);
  assert.throws(() => resolveSeries(articleSeries[0], []), /unpublished or missing/);
});
