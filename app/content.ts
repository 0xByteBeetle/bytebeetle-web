export type Article = {
  title: string;
  href: string;
  date: string;
  topic: "EVM" | "Solana" | "Token-2022";
};

export const substackArticles: Article[] = [
  {
    title: "Architecting High-Performance Solana Programs: The Zero-Copy Deep Dive",
    href: "https://andreyobruchkov1996.substack.com/p/architecting-high-performance-solana",
    date: "August 2026",
    topic: "Solana",
  },
  {
    title: "Solana Deep Dive: Unpacking Borsh Serialization Under the Hood",
    href: "https://andreyobruchkov1996.substack.com/p/solana-deep-dive-unpacking-borsh",
    date: "July 2026",
    topic: "Solana",
  },
  {
    title: "The Utility Extensions: Completing the Token-2022 Architecture",
    href: "https://andreyobruchkov1996.substack.com/p/the-utility-extensions-completing",
    date: "July 2026",
    topic: "Token-2022",
  },
  {
    title: "Native ZK on Solana: The Architecture of Confidential Transfers",
    href: "https://andreyobruchkov1996.substack.com/p/native-zk-on-solana-the-architecture",
    date: "April 2026",
    topic: "Token-2022",
  },
  {
    title: "Engineering Native Yield: A Deep Dive into Solana's Interest-Bearing Mint Extension",
    href: "https://andreyobruchkov1996.substack.com/p/engineering-native-yield-a-deep-dive",
    date: "March 2026",
    topic: "Token-2022",
  },
  {
    title: "Transfer Hooks on Solana: Anchor 0.31 & Token-2022",
    href: "https://andreyobruchkov1996.substack.com/p/transfer-hooks-on-solana-anchor-031",
    date: "March 2026",
    topic: "Token-2022",
  },
  {
    title: "Solana Token-2022 Transfer Hooks and the Fee-on-Transfer Extension",
    href: "https://andreyobruchkov1996.substack.com/p/solana-token-2022-transfer-hooks",
    date: "March 2026",
    topic: "Token-2022",
  },
  {
    title: "From Convention to Explicit State: Token-2022 and Metadata Pointers on Solana",
    href: "https://andreyobruchkov1996.substack.com/p/from-convention-to-explicit-state",
    date: "March 2026",
    topic: "Token-2022",
  },
  {
    title: "Where Token Metadata Lives on Solana: From Convention to Explicit Data",
    href: "https://andreyobruchkov1996.substack.com/p/where-token-metadata-lives-on-solana",
    date: "January 2026",
    topic: "Token-2022",
  },
  {
    title: "SPL Token Program Architecture: A Technical Overview",
    href: "https://andreyobruchkov1996.substack.com/p/spl-token-program-architecture-a",
    date: "January 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Solana, Part 6: Transactions, Messages, and Address Lookup Tables in Practice",
    href: "https://andreyobruchkov1996.substack.com/p/understanding-solana-part-6-transactions",
    date: "December 2025",
    topic: "Solana",
  },
  {
    title: "Understanding Solana, Part 5: Transaction, Serialization, Signatures, Fees, and Runtime Execution",
    href: "https://andreyobruchkov1996.substack.com/p/understanding-solana-part-5-transaction",
    date: "December 2025",
    topic: "Solana",
  },
  {
    title: "Understanding Solana, Part 4: Instructions and Messages",
    href: "https://andreyobruchkov1996.substack.com/p/understanding-solana-part4-instructions",
    date: "December 2025",
    topic: "Solana",
  },
  {
    title: "Understanding Solana, Part 3: Anchor Accounts, Seeds, Bumps, PDAs, and the Client",
    href: "https://andreyobruchkov1996.substack.com/p/understanding-solana-part-3-anchor",
    date: "November 2025",
    topic: "Solana",
  },
  {
    title: "Understanding Solana: Account Model, Part 2",
    href: "https://andreyobruchkov1996.substack.com/p/understanding-solana-account-model",
    date: "November 2025",
    topic: "Solana",
  },
  {
    title: "Proxies and Upgradability: Minimal Proxy (EIP-1167)",
    href: "https://andreyobruchkov1996.substack.com/p/proxies-and-upgradability-minimal",
    date: "November 2025",
    topic: "EVM",
  },
  {
    title: "Factories: How Smart Contracts Deploy Other Contracts",
    href: "https://andreyobruchkov1996.substack.com/p/factories-how-smart-contracts-deploy",
    date: "November 2025",
    topic: "EVM",
  },
  {
    title: "Proxies and Upgradability: UUPS Proxy (EIP-1822)",
    href: "https://andreyobruchkov1996.substack.com/p/proxies-and-upgradability-uups-proxy",
    date: "November 2025",
    topic: "EVM",
  },
  {
    title: "Proxies and Upgradability: Transparent Proxy (EIP-1967)",
    href: "https://andreyobruchkov1996.substack.com/p/proxies-and-upgradability",
    date: "November 2025",
    topic: "EVM",
  },
  {
    title: "Deployments and Deterministic Addresses (CREATE vs CREATE2)",
    href: "https://andreyobruchkov1996.substack.com/p/deployments-and-deterministic-addresses",
    date: "November 2025",
    topic: "EVM",
  },
];

export const mediumArticles: Article[] = [
  {
    title: "Understanding Solana, Part 5: Transaction, Serialization, Signatures, Fees, and Runtime Execution",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-part-5-transaction-serialization-signatures-fees-and-runtime-execution-5bf7a3c02e9e",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Solana, Part 4: Instructions and Messages",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-part4-instructions-and-messages-7d351a7311fc",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Anchor Accounts: Seeds, Bumps, PDAs, and How the Client Really Works",
    href: "https://medium.com/@andrey_obruchkov/understanding-anchor-accounts-seeds-bumps-pdas-and-how-the-client-really-works-18e986784017",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Solana: Instructions and Messages, Part 3",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-instructions-and-messages-part3-88f056e95694",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Anchor Accounts: The Chainstack Edition",
    href: "https://medium.com/@andrey_obruchkov/understanding-anchor-accounts-seeds-bumps-pdas-and-how-the-client-really-works-chainstack-5452c7612b02",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Understanding Solana: Architecture, Account Model and Transactions, Part 2",
    href: "https://medium.com/@andrey_obruchkov/understanding-solana-architecture-account-model-and-transactions-part-2-eea178bce8b3",
    date: "April 2026",
    topic: "Solana",
  },
  {
    title: "Batching Calls Efficiently with Multicall and RPC Batch",
    href: "https://medium.com/@andrey_obruchkov/batching-calls-efficiently-with-multicall-and-rpc-batch-c1b018398186",
    date: "March 2026",
    topic: "EVM",
  },
  {
    title: "eth_call vs debug_traceCall: Simulating, Tracing, and Debugging Ethereum Transactions",
    href: "https://medium.com/@andrey_obruchkov/eth-call-vs-debug-tracecall-how-to-simulate-trace-and-debug-ethereum-transactions-d5d514ec2911",
    date: "March 2026",
    topic: "EVM",
  },
  {
    title: "EIP-7702: SetCode Transactions and Temporary Smart-Account Power for EOAs",
    href: "https://medium.com/@andrey_obruchkov/eip-7702-setcode-transactions-temporary-smart-account-power-for-eoas-explained-9db8cbb3134a",
    date: "March 2026",
    topic: "EVM",
  },
  {
    title: "Understanding Legacy Ethereum Transactions (Type 0x0)",
    href: "https://medium.com/@andrey_obruchkov/understanding-legacy-ethereum-transactions-type-0x0-c76ed9163cec",
    date: "March 2026",
    topic: "EVM",
  },
];

export const foundationCurriculumUrl =
  "https://docs.google.com/document/d/1GowdQgZ0wf510Kt9NuNKI1086jfdWHdaIRoM55b-Wzg/edit";

export const advancedCurriculumUrl =
  "https://docs.google.com/document/d/1tjLyXuMbwjgzDwafG_9aRbQ3Q1q-JhAwTPg_yeJBCbw/edit";

export const foundationWeeks = [
  "Ethereum internals, nodes, and the developer environment",
  "Smart contract foundations and Solidity-to-EVM translation",
  "Transaction and message types in the EVM",
  "On-chain activity, logs, streaming, and monitoring systems",
  "Mini DEX and live monitoring system",
];

export const advancedWeeks = [
  "Advanced token standards, custom hooks, and extensibility",
  "Smart contract architecture, factories, and proxies",
  "DeFi mechanics, AMMs, swaps, and liquidity",
  "The EVM engine, gas optimization, and new transaction types",
  "Advanced security, MEV, fuzzing, and invariant testing",
  "Production protocol architecture capstone",
];

export const advancedWeekOneModules = [
  "ERC-20 internals and the token lifecycle",
  "Custom tokenomics: fees, rebasing, and reflection",
  "EIP-712 and ERC-2612 Permit",
  "ERC-721 internals and transfer safety",
  "ERC-721A and gas-optimized minting",
  "On-chain metadata and ERC-2981 royalties",
  "ERC-1155 multi-token engineering",
  "Dual-nature and hybrid tokens",
];
