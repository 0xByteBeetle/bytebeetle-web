// Shared course identities and inquiry types. The server chooses the type from
// this list rather than accepting an enrollment or waitlist type from a visitor.
export const courseOptions = {
  "evm-engineering": { title: "EVM Engineering Bootcamp", waitlist: false },
  "advanced-evm": { title: "Advanced EVM Bootcamp", waitlist: true },
  solana: { title: "Solana Bootcamp", waitlist: true },
};
