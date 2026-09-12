import type { Article } from "../content";

export type ChainFilter = "all" | Article["chain"];
export type SortOrder = "newest" | "oldest" | "title";

export function articleTimestamp(article: Article): number {
  const timestamp = article.publishedAt ? Date.parse(article.publishedAt) : NaN;
  // Older alternate-publication records still have month-only dates.
  return Number.isFinite(timestamp) ? timestamp : Date.parse(`1 ${article.date} UTC`);
}

export function articlePublicationDate(article: Article): string {
  if (!article.publishedAt) return article.date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(articleTimestamp(article)));
}

// Labels describe the subjects named in the original article titles.
export function articleTopic(article: Article): string {
  if (article.subject) return article.subject;
  const title = article.title.toLowerCase();
  if (article.chain === "Solana") {
    if (article.topic === "Token-2022" || /token|metadata|native zk|interest-bearing mint/.test(title)) return "Tokens & extensions";
    if (/borsh|zero-copy/.test(title)) return "Serialization & memory";
    if (/part\s*[456]|instructions and messages/.test(title)) return "Transactions & messages";
    return "Accounts & programs";
  }
  if (article.chain !== "EVM") return `${article.chain} internals`;
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
    const searchable = `${article.title} ${article.chain} ${label} ${(article.keywords ?? []).join(" ")}`.toLowerCase();
    return (!topic || label === topic) && words.every((word) => searchable.includes(word));
  });
  if (sort === "title") return matches.sort((a, b) => a.title.localeCompare(b.title, "en"));
  const direction = sort === "oldest" ? 1 : -1;
  return matches.sort((a, b) => direction * (articleTimestamp(a) - articleTimestamp(b)) || a.href.localeCompare(b.href));
}

export function topicOptions(articles: Article[]) {
  return [...new Set(articles.map(articleTopic))].sort().map((label) => ({
    label,
    count: articles.filter((article) => articleTopic(article) === label).length,
  }));
}
