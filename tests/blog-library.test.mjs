import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { chainOptions, paginateArticles, articleTopic, selectArticles, topicOptions } from "../app/blogs/library-model.ts";

const source = await readFile(new URL("../app/substack-articles.generated.ts", import.meta.url), "utf8");
const catalog = JSON.parse(source.slice(source.indexOf("= [") + 2).trim().replace(/;$/, ""));

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
});

test("new chains appear from catalog data and do not inherit EVM topics", () => {
  const additional = { title: "Object ownership", chain: "Sui", topic: "Objects", href: "https://example.com/sui", date: "September 2026" };
  const options = chainOptions([...catalog, additional]);
  assert.deepEqual(options.find((item) => item.label === "Sui"), { label: "Sui", slug: "sui", count: 1 });
  assert.equal(articleTopic(additional), "Objects");
  assert.equal(selectArticles([...catalog, additional], "Sui", "", "newest")[0], additional);
});

test("pagination reaches every article without overlap and clamps invalid pages", () => {
  const visited = [];
  const { pages } = paginateArticles(catalog, 1);
  for (let page = 1; page <= pages; page++) visited.push(...paginateArticles(catalog, page).articles);
  assert.deepEqual(visited, catalog);
  assert.equal(paginateArticles(catalog, 9999).page, pages);
  assert.equal(paginateArticles(catalog, -1).page, 1);
  assert.equal(paginateArticles(catalog, Infinity).page, 1);
  assert.deepEqual(paginateArticles([], 99), { page: 1, pages: 1, articles: [] });
});
