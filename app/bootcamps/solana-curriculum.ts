import type { CurriculumWeek } from "./curriculum-data";

// Source-faithful summaries of the author's Solana syllabus, read 2026-10-31.
// Planned scope only: no claim of available lessons, support, price, or launch.
export const solanaCurriculum: CurriculumWeek[] = [
  {
    label: "Week 1",
    title: "SVM internals, the account model, and developer environment",
    goal: "Understand parallel execution and the separation between programs and the accounts they work with.",
    topics: [
      { title: "Architecture and state", items: ["Executable and data accounts, rent exemption, and serialized account data.", "Sealevel parallel execution and declaring read/write accounts in a transaction.", "Global state transitions compared with isolated account mutations."] },
      { title: "Tooling and infrastructure", items: ["Solana CLI, local keypairs, and the local test validator.", "RPC nodes and processed, confirmed, and finalized commitments."] },
    ],
    handsOn: ["Set up the Solana toolchain, Rust, and a local validator.", "Generate local wallets, request a local airdrop, and construct transfers through the CLI.", "Query account data with a TypeScript client and inspect the binary buffer returned by RPC."],
    outcomes: ["Explain how Solana schedules transactions for parallel execution.", "Run a local validator, manage development keypairs, and distinguish programs from state accounts."],
  },
  {
    label: "Week 2",
    title: "Rust foundations and native Solana programs",
    goal: "Work with the Rust concepts needed for Solana programs, then process instructions and serialized data without a framework.",
    topics: [
      { title: "Rust for programs", items: ["Ownership, borrowing, lifetimes, structs, enums, and traits.", "Result, Option, and custom program errors."] },
      { title: "Native program structure", items: ["Program entry points, program IDs, accounts, and instruction data.", "Borsh serialization and deserialization.", "Routing instruction bytes to program functions."] },
    ],
    handsOn: ["Build and deploy a native program that deserializes an instruction payload and logs a message.", "Reject invalid input with a custom program error.", "Construct and send an instruction from a TypeScript client."],
    outcomes: ["Use Rust ownership and error handling to structure program logic.", "Explain the instruction-processing work that higher-level frameworks automate."],
  },
  {
    label: "Week 3",
    title: "The Anchor framework and program derived addresses",
    goal: "Use Anchor to organize a stateful program and PDAs to derive deterministic accounts.",
    topics: [
      { title: "Anchor architecture", items: ["Program macros, Context, serialization, and the IDL.", "Constraints for signers, mutability, and account ownership."] },
      { title: "PDAs and state", items: ["Seeds and bumps for deterministic addresses.", "PDA authority and mapping users to their state accounts."] },
    ],
    handsOn: ["Initialize an Anchor workspace and build a state-tracking program.", "Derive user accounts with PDAs and test that users cannot overwrite one another’s state.", "Write TypeScript tests with the Anchor client to check state changes."],
    outcomes: ["Build and test stateful programs with Anchor.", "Design deterministic account layouts and lookups with PDAs."],
  },
  {
    label: "Week 4",
    title: "SPL tokens, Token-2022, and cross-program invocations",
    goal: "Create and manage token assets, then compose programs through CPIs and PDA authority.",
    topics: [
      { title: "Token assets", items: ["Mints, token accounts, and associated token accounts.", "Token-2022 transfer hooks, interest-bearing tokens, and metadata pointers."] },
      { title: "Cross-program invocations", items: ["Constructing instructions for another program.", "Using invoke_signed with PDA authority."] },
    ],
    handsOn: ["Launch a token through a script and manage mint authority and associated token accounts.", "Build an Anchor vending-machine program that accepts SOL and issues SPL tokens through a CPI.", "Build an escrow program that holds tokens in a PDA-controlled account until its conditions are met."],
    outcomes: ["Create and manage standard SPL and Token-2022 assets.", "Compose token operations across programs using CPIs and PDA authority."],
  },
  {
    label: "Week 5",
    title: "Security, exploits, and optimization",
    goal: "Investigate common account-validation and PDA failures, then profile program execution and memory use.",
    topics: [
      { title: "Exploit vectors", items: ["Missing identity, ownership, signer, and mutability checks.", "PDA seed collisions, initialization risks, and bump validation."] },
      { title: "Performance", items: ["Compute-unit limits and profiling.", "Heap allocations, Box and Vec, and zero-copy deserialization."] },
    ],
    handsOn: ["Inspect vulnerable Anchor examples, reproduce their exploits, and patch the affected checks.", "Profile a computationally heavy program and refactor its data structures to reduce compute usage."],
    outcomes: ["Recognize and address common SVM account-validation risks.", "Use compute and memory measurements to guide optimization."],
  },
  {
    label: "Week 6",
    title: "Full-stack integration, live monitoring, and capstone",
    goal: "Connect an on-chain program to a frontend and bring the course together in a deployed application.",
    topics: [
      { title: "Frontend integration", items: ["Wallet adapters in React or Next.js.", "WebSocket account subscriptions and readable program errors in the UI."] },
      { title: "Deployment", items: ["Upgrade authorities, program buffers, source verification, and closing unused buffers.", "Frontend deployment and the operational choices around program upgrades."] },
    ],
    handsOn: ["Build a capstone such as a real-time data tracker or an on-chain order-book module.", "Connect the frontend to the Anchor program for state reads and wallet-signed interactions.", "Deploy the stack, verify its source through an explorer, and submit the architecture for review."],
    outcomes: ["Connect program logic, wallet interactions, state subscriptions, and a web frontend.", "Explain the architecture and deployment of a full-stack Solana application."],
  },
];
