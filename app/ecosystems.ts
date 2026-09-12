// Shared by the homepage, mobile navigation, and article library.
export const ecosystems = [
  { label: "EVM", slug: "evm", href: "/blogs/evm", searchHint: "Try calldata, proxies, or signatures" },
  { label: "Solana", slug: "solana", href: "/blogs/solana", searchHint: "Try accounts, Borsh, or Token-2022" },
  { label: "Hyperliquid", slug: "hyperliquid", href: "/blogs/hyperliquid", searchHint: "Search Hyperliquid articles" },
] as const;

export type Ecosystem = (typeof ecosystems)[number]["label"];
