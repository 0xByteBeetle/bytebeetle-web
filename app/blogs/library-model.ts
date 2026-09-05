import type { Article } from "../content";

export type ChainFilter = "all" | Article["chain"];
export type SortOrder = "newest" | "oldest" | "title";

export function chainOptions(articles: Article[]) {
  return [...new Set(articles.map((article) => article.chain))].sort().map((label) => ({
    label,
    slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    count: articles.filter((article) => article.chain === label).length,
  }));
}

export function paginateArticles(articles: Article[], requestedPage: number, pageSize = 12) {
  const pages = Math.max(1, Math.ceil(articles.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1));
  return { page, pages, articles: articles.slice((page - 1) * pageSize, page * pageSize) };
}

// Labels describe the subjects named in the original article titles.
export function articleTopic(article: Article): string {
  const title = article.title.toLowerCase();
  if (article.chain !== "EVM" && article.chain !== "Solana") return article.topic || article.chain;
  if (article.chain === "Solana") {
    if (/token|metadata|native zk/.test(title)) return "Tokens & extensions";
    if (/borsh|zero-copy/.test(title)) return "Serialization & memory";
    if (/part\s*[456]|instructions and messages/.test(title)) return "Transactions & messages";
    return "Accounts & programs";
  }
  if (/prox|deploy|factor|create2|diamond/.test(title)) return "Proxies & deployment";
  if (/rpc|node type|client|multicall|stream|event|transfer|eth_call/.test(title)) return "RPCs & on-chain data";
  if (/signature|eip-712|eip-191|signed data|signtypeddata/.test(title)) return "Signatures";
  if (/evm tx|transaction.*message|rlp/.test(title)) return "Transactions & messages";
  if (/gas|developer tools|tracing/.test(title)) return "Gas & debugging";
  return "EVM internals";
}

export function selectArticles(articles: Article[], query: string, topic: string, sort: SortOrder): Article[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = articles.filter((article) => {
    const label = articleTopic(article);
    const searchable = `${article.title} ${article.chain} ${label}`.toLowerCase();
    return (!topic || label === topic) && words.every((word) => searchable.includes(word));
  });
  if (sort === "title") return matches.sort((a, b) => a.title.localeCompare(b.title, "en"));
  // Preserve the source catalog's order within each publication month.
  matches.sort((a, b) => Date.parse(`1 ${b.date} UTC`) - Date.parse(`1 ${a.date} UTC`));
  return sort === "oldest" ? matches.reverse() : matches;
}

export function topicOptions(articles: Article[]) {
  return [...new Set(articles.map(articleTopic))].sort().map((label) => ({
    label,
    count: articles.filter((article) => articleTopic(article) === label).length,
  }));
}
