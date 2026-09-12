import { substackArticles as generatedSubstackArticles } from "./substack-articles.generated";
import type { Ecosystem } from "./ecosystems";
import { articleDescriptions, articlesWithoutCode } from "./article-notes";

export type Article = {
  title: string;
  href: string;
  localHref?: string;
  date: string;
  topic: Ecosystem | "Token-2022";
  chain: Ecosystem;
  subject?: string;
  keywords?: string[];
  slug?: string;
  solutionHref?: string;
  codeUpdated?: boolean;
  description?: string;
};

// Public posts that do not yet have an entry in the companion-code catalog.
// Verified against the public Substack feed on 2026-09-12. Never list drafts.
const additionalPublishedArticles: Article[] = [
  {
    title: "Hyperliquid: Beyond Generic VMs: The Architecture Internals Part 1",
    href: "https://andreyobruchkov1996.substack.com/p/hyperliquid-beyond-generic-vms-the",
    localHref: "/blogs/hyperliquid/hyperliquid-beyond-generic-vms-the",
    date: "September 2026",
    topic: "Hyperliquid",
    chain: "Hyperliquid",
    subject: "Architecture",
    keywords: ["HyperCore", "HyperEVM", "clearinghouse", "cross-margin", "agent keys", "order book"],
    slug: "hyperliquid-beyond-generic-vms-the",
  },
];

// A verified companion can replace the supplemental record on a later sync.
export const substackArticles: Article[] = [
  ...generatedSubstackArticles,
  ...additionalPublishedArticles.filter(article => !generatedSubstackArticles.some(existing => existing.href === article.href)),
].map(article => ({
  ...article,
  description: article.slug ? articleDescriptions[article.slug] : undefined,
  solutionHref: article.slug && articlesWithoutCode.has(article.slug) ? undefined : article.solutionHref,
}));

export const evmSubstackArticles = substackArticles.filter(
  (article) => article.chain === "EVM",
);

export const solanaSubstackArticles = substackArticles.filter(
  (article) => article.chain === "Solana",
);

export const mediumArticles: Article[] = [
  {
    title: "Understanding Solana, Part 5: Transaction, Serialization, Signatures, Fees, and Runtime Execution",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-part-5-transaction-serialization-signatures-fees-and-runtime-execution-5bf7a3c02e9e",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Understanding Solana, Part 4: Instructions and Messages",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-part4-instructions-and-messages-7d351a7311fc",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Understanding Anchor Accounts: Seeds, Bumps, PDAs, and How the Client Really Works",
    href: "https://medium.com/@andrey_obruchkov/understanding-anchor-accounts-seeds-bumps-pdas-and-how-the-client-really-works-18e986784017",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Understanding Solana: Instructions and Messages, Part 3",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-instructions-and-messages-part3-88f056e95694",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Understanding Anchor Accounts: The Chainstack Edition",
    href: "https://medium.com/@andrey_obruchkov/understanding-anchor-accounts-seeds-bumps-pdas-and-how-the-client-really-works-chainstack-5452c7612b02",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Understanding Solana: Architecture, Account Model and Transactions, Part 2",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-architecture-account-model-and-transactions-part-2-eea178bce8b3",
    date: "April 2026",
    topic: "Solana",
    chain: "Solana",
  },
  {
    title: "Batching Calls Efficiently with Multicall and RPC Batch",
    href: "https://medium.com/@andrey_obruchkov/batching-calls-efficiently-with-multicall-and-rpc-batch-c1b018398186",
    date: "March 2026",
    topic: "EVM",
    chain: "EVM",
  },
  {
    title: "eth_call vs debug_traceCall: Simulating, Tracing, and Debugging Ethereum Transactions",
    href: "https://medium.com/@andrey_obruchkov/eth-call-vs-debug-tracecall-how-to-simulate-trace-and-debug-ethereum-transactions-d5d514ec2911",
    date: "March 2026",
    topic: "EVM",
    chain: "EVM",
  },
  {
    title: "EIP-7702: SetCode Transactions and Temporary Smart-Account Power for EOAs",
    href: "https://medium.com/@andrey_obruchkov/eip-7702-setcode-transactions-temporary-smart-account-power-for-eoas-explained-9db8cbb3134a",
    date: "March 2026",
    topic: "EVM",
    chain: "EVM",
  },
  {
    title: "Understanding Legacy Ethereum Transactions (Type 0x0)",
    href: "https://medium.com/@andrey_obruchkov/understanding-legacy-ethereum-transactions-type-0x0-c76ed9163cec",
    date: "March 2026",
    topic: "EVM",
    chain: "EVM",
  },
];

export const evmMediumArticles = mediumArticles.filter(
  (article) => article.chain === "EVM",
);

export const solanaMediumArticles = mediumArticles.filter(
  (article) => article.chain === "Solana",
);
