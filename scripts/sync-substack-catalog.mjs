import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = process.argv[2];

if (!source) {
  throw new Error(
    "Usage: node scripts/sync-substack-catalog.mjs /path/to/blog-solutions/catalog/articles.json",
  );
}

const articles = JSON.parse(await readFile(resolve(source), "utf8"));

if (!Array.isArray(articles) || articles.length === 0) {
  throw new Error("The companion catalog is empty or invalid.");
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const output = articles.map((article) => {
  if (typeof article.chain !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.chain) || article.chain === "all") {
    throw new Error(`Invalid chain identifier for ${article.title}`);
  }
  const knownLabels = { evm: "EVM", solana: "Solana" };
  const chain = knownLabels[article.chain] ?? article.chain.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
  const isToken2022 =
    chain === "Solana" &&
    /token-2022|spl token|token metadata|interest-bearing|transfer hook|fee-on-transfer|confidential transfer|metadata pointer/i.test(
      article.title,
    );

  return {
    title: article.title,
    href: article.url,
    date: formatter.format(new Date(article.publishedAt)),
    topic: article.topic || (isToken2022 ? "Token-2022" : chain),
    chain,
    slug: article.slug,
    solutionHref: `https://github.com/0xByteBeetle/blog-solutions/tree/main/articles/${article.chain}/${article.slug}`,
  };
});

if (new Set(output.map((article) => article.href)).size !== output.length) throw new Error("The catalog contains duplicate article URLs.");

const generated = `// Generated from 0xByteBeetle/blog-solutions/catalog/articles.json.\n// Run scripts/sync-substack-catalog.mjs to refresh it.\n\nimport type { Article } from "./content";\n\nexport const substackArticles: Article[] = ${JSON.stringify(output, null, 2)};\n`;

await writeFile(resolve("app/substack-articles.generated.ts"), generated);

console.log(`Synced ${output.length} Substack articles across ${new Set(output.map((article) => article.chain)).size} chains.`);
