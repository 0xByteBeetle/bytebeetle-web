import type { Article } from "./content";
import type { Ecosystem } from "./ecosystems";

// Explicit series order, independent of publication dates and archive sorting.
// These are published posts only. Adding an ecosystem does not require new UI.
export const readingPaths: Record<Ecosystem, { title: string; introduction: string; slugs: string[] }> = {
  EVM: {
    title: "The EVM internals series",
    introduction: "Begin with the original three-part series, then explore individual mechanisms in the archive below.",
    slugs: [
      "what-every-blockchain-developer-should-know-about-evm-internals-part-1-83a93c618257",
      "what-every-blockchain-developer-should-know-about-evm-internals-part-2-eab0f4fae3de",
      "what-every-blockchain-developer-should-know-about-evm-internals-part-3-b6813d964592",
    ],
  },
  Solana: {
    title: "Understanding Solana",
    introduction: "Follow the series from architecture and accounts to the transactions that bring them together.",
    slugs: [
      "understanding-solana-architecture-account-model-and-transactions-part-1-1bffae449650",
      "understanding-solana-account-model",
      "understanding-solana-part-3-anchor",
      "understanding-solana-part4-instructions",
      "understanding-solana-part-5-transaction",
      "understanding-solana-part-6-transactions",
    ],
  },
  Hyperliquid: {
    title: "Inside Hyperliquid’s architecture",
    introduction: "The series begins with HyperCore, HyperEVM, and how the exchange fits together. Part 1 is available now.",
    slugs: ["hyperliquid-beyond-generic-vms-the"],
  },
};

export function readingPathArticles(chain: Ecosystem, articles: Article[]): Article[] {
  return readingPaths[chain].slugs.map(slug => {
    const article = articles.find(item => item.slug === slug && item.chain === chain);
    if (!article) throw new Error(`Reading path references an unpublished or missing article: ${slug}`);
    return article;
  });
}
