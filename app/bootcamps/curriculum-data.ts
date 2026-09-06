export type CurriculumWeek = {
  label: string;
  title: string;
  goal: string;
  modules?: string[];
  topics: { title: string; items: string[] }[];
  handsOn: string[];
  outcomes: string[];
};

// Website summaries of the author's curriculum documents, read 2026-09-06.
// Foundation: 1GowdQgZ0wf510Kt9NuNKI1086jfdWHdaIRoM55b-Wzg
// Advanced: 1tjLyXuMbwjgzDwafG_9aRbQ3Q1q-JhAwTPg_yeJBCbw
// Only curriculum scope is reproduced, not pricing/support promises or lesson bodies.
// Wording avoids source-document overclaims about testing and uses final EIP-7702
// persistent delegation semantics: https://eips.ethereum.org/EIPS/eip-7702.
// Source Google Docs remain unchanged.
export const foundationCurriculum: CurriculumWeek[] = [
  {
    "label": "Week 1",
    "title": "Ethereum internals, nodes, and the developer environment",
    "goal": "Follow a transaction from a wallet to execution and finality. Build a working mental model of Ethereum before relying on higher-level libraries.",
    "topics": [
      {
        "title": "Protocol foundations",
        "items": [
          "Ethereum as a state machine and the role of state transitions.",
          "Merkle trees and Merkle Patricia tries: organizing state and checking data integrity.",
          "EOAs, contract accounts, transaction fields, signatures, value transfers, calls, and deployments."
        ]
      },
      {
        "title": "Execution and consensus",
        "items": [
          "The post-Merge split between the Execution Layer and Consensus Layer.",
          "Transaction flow through the mempool, execution, and inclusion in a Beacon Block.",
          "Client pairs, the Engine API, and the responsibilities of each client."
        ]
      },
      {
        "title": "Inside the EVM",
        "items": [
          "Stack, memory, and storage: what each holds and how their lifetimes differ.",
          "Gas as payment, spam prevention, and prioritization; what a revert changes.",
          "ABI encoding, calldata, four-byte function selectors, and padded arguments."
        ]
      },
      {
        "title": "Tools and nodes",
        "items": [
          "Foundry: forge for builds and tests, cast for RPC interactions, and anvil for a local chain.",
          "RPC endpoints, full/archive/light node models, and provider selection."
        ]
      }
    ],
    "handsOn": [
      "Build and verify a Merkle tree in Python.",
      "Compute ERC-20 selectors and decode sample calldata.",
      "Query transactions and block headers through an RPC endpoint using curl.",
      "Install Foundry, run Anvil, compile and deploy a contract, then use cast call and cast send.",
      "Write a deliberately failing test, inspect its trace, and update a contract and its tests after changing fields or function signatures."
    ],
    "outcomes": [
      "Explain how execution and consensus clients work together.",
      "Recognize a function and its arguments in raw calldata.",
      "Choose an appropriate node/RPC setup and work comfortably in a local Foundry environment.",
      "Use execution traces to explain a failure."
    ]
  },
  {
    "label": "Week 2",
    "title": "Smart contract foundations and Solidity-to-EVM translation",
    "goal": "Connect Solidity, wallet signing, ABI encoding, and low-level execution. Understand how a call reaches the right function and which account, value, and storage context it uses.",
    "topics": [
      {
        "title": "ABI and calldata",
        "items": [
          "Function selectors and the ABI encoding specification.",
          "Static values, dynamic strings and arrays, structs and tuples.",
          "Head/tail layouts, offsets, padding, and manual decoding."
        ]
      },
      {
        "title": "Calls and execution context",
        "items": [
          "CALL, DELEGATECALL, and STATICCALL: reasoning about msg.sender, msg.value, storage, and state-writing restrictions.",
          "Internal jump-based calls versus external ABI-encoded calls.",
          "payable, receive(), fallback(), state rollback, and bubbling revert data."
        ]
      },
      {
        "title": "Dispatch and serialization",
        "items": [
          "The runtime dispatcher: extracting a selector and routing execution.",
          "Compiler-generated non-payable checks and relevant opcodes.",
          "RLP serialization and its role in transaction delivery."
        ]
      },
      {
        "title": "Wallets and keys",
        "items": [
          "Private keys, public keys, addresses, EOAs, and contract accounts.",
          "Wallet/provider responsibilities: connecting, signing, and broadcasting.",
          "Key custody and safely managing test accounts."
        ]
      }
    ],
    "handsOn": [
      "Encode and decode custom calls with cast calldata, including structs, offsets, and padded arguments.",
      "Generate test keys and sign messages with cast wallet.",
      "Connect a test-only MetaMask account to Anvil using its RPC URL and chain ID.",
      "Deploy contracts to compare receive(), fallback(), CALL, DELEGATECALL, STATICCALL, and propagated reverts.",
      "Inspect and disassemble runtime bytecode to locate dispatch and non-payable checks."
    ],
    "outcomes": [
      "Read complex calldata and relate it to the Solidity interface.",
      "Predict call context and explain why a particular execution path fails.",
      "Manage test accounts and connect high-level code to ABI, RLP, and EVM opcodes."
    ]
  },
  {
    "label": "Week 3",
    "title": "Transaction and message types in the EVM",
    "goal": "Treat the transaction as a signed protocol object. Understand the bytes being authorized, the fee model being used, and why submission to a node does not mean inclusion in a block.",
    "topics": [
      {
        "title": "What a wallet signs",
        "items": [
          "Canonical fields: nonce, destination, value, data, gas limit, fees, and chain ID.",
          "Nonce ordering and gaps; EIP-155 replay protection.",
          "Signing preimages versus transaction hashes, and the EIP-55 address checksum."
        ]
      },
      {
        "title": "Transaction types and fees",
        "items": [
          "EIP-2718 typed envelopes and legacy Type 0 transactions.",
          "Type 1 access lists under EIP-2930.",
          "Type 2 transactions under EIP-1559: base fee, priority fee, and maximum fee.",
          "Fee estimation with eth_feeHistory."
        ]
      },
      {
        "title": "Lifecycle and mempool behavior",
        "items": [
          "What eth_sendRawTransaction acknowledges and what still remains uncertain.",
          "Node-local mempools, pending versus queued transactions, and replacement policies.",
          "Immediate rejection versus an included transaction that reverts.",
          "Transaction intent versus receipt outcome: status, gas usage, and logs."
        ]
      }
    ],
    "handsOn": [
      "Construct legacy and EIP-1559 transaction fields manually.",
      "Compare latest and pending nonce queries.",
      "Inspect fee fields and implement fee estimation using eth_feeHistory.",
      "Simulate replacing a low-fee transaction with a higher-fee transaction using the same nonce.",
      "Compare malformed-transaction rejection with an on-chain revert, and decode real transaction calldata."
    ],
    "outcomes": [
      "Explain the serialized and signed transaction payload.",
      "Recognize the fee models of Types 0, 1, and 2.",
      "Diagnose nonce gaps, low fees, dropped transactions, and execution reverts.",
      "Implement replacement logic without treating the mempool as a global source of truth."
    ]
  },
  {
    "label": "Week 4",
    "title": "On-chain activity, logs, streaming, and monitoring systems",
    "goal": "Connect off-chain authorization with on-chain execution, then observe the result. Learn to choose between signed messages, event logs, lightweight simulation, and detailed execution traces.",
    "topics": [
      {
        "title": "Off-chain intent and signatures",
        "items": [
          "Authorization messages versus state-changing transactions.",
          "EIP-191 personal signing and its message prefix.",
          "EIP-712 structured data, type hashes, and domain separators.",
          "Binding signatures to chain ID and verifying contract; ERC-2612 permit and relayer-submitted approvals."
        ]
      },
      {
        "title": "Events and indexing",
        "items": [
          "State, logs, and execution history: what each can tell an off-chain application.",
          "Event signature topics, indexed fields, and ABI-encoded data.",
          "Filtering eth_getLogs by block range, address, and topics."
        ]
      },
      {
        "title": "Simulation and tracing",
        "items": [
          "eth_call for results and revert data; debug_traceCall for a deeper execution view.",
          "Logs as emitted data versus traces reconstructed by node tooling.",
          "Following contract-to-contract calls and locating a revert inside a call tree."
        ]
      }
    ],
    "handsOn": [
      "Implement an end-to-end EIP-712 permit flow with off-chain signing and on-chain verification.",
      "Design a DeFi event and choose which fields to index.",
      "Query logs using cast or curl with address, block-range, and topic filters.",
      "Compare a failing call through eth_call and debug_traceCall.",
      "Step through EVM execution in Foundry, including calldata reads, jumps, and storage writes."
    ],
    "outcomes": [
      "Reason about authorization, signing, execution, and observable results separately.",
      "Design off-chain signature flows with explicit context binding.",
      "Build log-based indexers and choose the right simulation or tracing tool for a debugging task."
    ]
  },
  {
    "label": "Weeks 5–6",
    "title": "Mini DEX and live monitoring system",
    "goal": "Bring the course together in a full-stack token application: contracts, wallets, a backend, PostgreSQL, a frontend, and transaction monitoring.",
    "topics": [
      {
        "title": "ERC-20 mechanics",
        "items": [
          "Token balances as contract-maintained accounting.",
          "Token metadata, total supply, balance queries, transfers, approvals, and transferFrom.",
          "Owner-initiated transfers versus allowance-based spending by another contract.",
          "Decimals, precision, and integer arithmetic."
        ]
      },
      {
        "title": "Application architecture",
        "items": [
          "Persisting wallets, token records, and transaction history in PostgreSQL.",
          "Generating test wallets and connecting them to on-chain addresses.",
          "Tracking a submitted transaction from pending to confirmed and updating the application state."
        ]
      }
    ],
    "handsOn": [
      "Deploy a custom OpenZeppelin ERC-20 token with a name, symbol, and initial supply.",
      "Build a SimpleSwap contract that pulls approved tokens with transferFrom and returns a reward token at a 1:1 ratio.",
      "Create PostgreSQL tables for wallets, tokens, and transactions, with APIs for creating/listing wallets and recording deployed tokens.",
      "Build wallet and native-balance views, plus a browser-based token deployment form.",
      "Build the approve-then-swap interface and an activity view that updates the database and UI after confirmation."
    ],
    "outcomes": [
      "Deploy tokens and correctly integrate the approve/transferFrom flow.",
      "Connect the contract, backend, database, and frontend layers of a DApp.",
      "Handle wallet interactions and make transaction progress understandable in the UI."
    ]
  }
];

export const advancedCurriculum: CurriculumWeek[] = [
  {
    "label": "Week 1",
    "title": "Advanced token standards, custom hooks, and extensibility",
    "goal": "Understand token behavior beneath the default implementation: custom transfer logic, signature approvals, NFT trade-offs, metadata, and hybrid-token synchronization.",
    "modules": [
      "ERC-20 Internals and the Token Lifecycle",
      "Custom Tokenomics: Fees, Rebasing, and Reflection",
      "EIP-712 and ERC-2612 Permit",
      "ERC-721 Internals and Transfer Safety",
      "ERC-721A and Gas-Optimized Minting",
      "On-Chain Metadata and ERC-2981 Royalties",
      "ERC-1155 Multi-Token Engineering",
      "Dual-Nature and Hybrid Tokens"
    ],
    "topics": [
      {
        "title": "Custom ERC-20 behavior",
        "items": [
          "The _update override and where custom logic belongs in the token lifecycle.",
          "Fee-on-transfer systems, reflection, rebasing, and external-call risks in hooks."
        ]
      },
      {
        "title": "Signature-based approvals",
        "items": [
          "ERC-2612 permit with EIP-712 structured signatures.",
          "Nonce and deadline handling for replay protection and relayer-submitted approvals."
        ]
      },
      {
        "title": "NFT and multi-token design",
        "items": [
          "ERC-721 transfer behavior and ERC-721A batch-mint trade-offs.",
          "On-chain SVG/JSON metadata through tokenURI and ERC-2981 royalty signaling.",
          "ERC-1155 fungible and non-fungible token types in one contract.",
          "ERC-404 as historical context; ERC-7631 base-and-mirror architecture and synchronization risks."
        ]
      }
    ],
    "handsOn": [
      "Build an ERC-20 token with a dynamic transfer tax routed to a treasury.",
      "Implement permit and test an approval submitted by a relayer.",
      "Build an NFT collection with on-chain SVG output derived from the minter’s address."
    ],
    "outcomes": [
      "Choose a token standard based on behavior, integration needs, and gas trade-offs.",
      "Extend token implementations while reasoning about security and compatibility.",
      "Design signature-based approvals and on-chain metadata flows."
    ]
  },
  {
    "label": "Week 2",
    "title": "Smart contract architecture, factories, and proxies",
    "goal": "Separate deployment, logic, and state. Learn how to create contract instances efficiently and evolve a protocol without losing or corrupting its existing state.",
    "topics": [
      {
        "title": "Factories and deterministic deployment",
        "items": [
          "Factory contracts that deploy and track other contracts.",
          "EIP-1167 minimal proxies and shared implementations.",
          "CREATE2 salts and predictable deployment addresses."
        ]
      },
      {
        "title": "Upgrade mechanics and storage",
        "items": [
          "delegatecall execution context and storage ownership.",
          "Storage compatibility, layout changes, and collision risks.",
          "Unstructured storage and assembly-based slot access."
        ]
      },
      {
        "title": "Proxy designs",
        "items": [
          "Transparent proxies, admin separation, and selector clashes.",
          "UUPS implementations and upgrade authorization.",
          "EIP-2535 Diamonds: facets, loupe functions, routing, and contract-size constraints."
        ]
      }
    ],
    "handsOn": [
      "Deploy and safely initialize EIP-1167 clones through a factory.",
      "Upgrade a UUPS contract from V1 to V2 while preserving its state.",
      "Pre-compute and deploy to a CREATE2 address.",
      "Reproduce a storage collision in a controlled example, inspect the corrupted state, and correct the layout."
    ],
    "outcomes": [
      "Choose an appropriate deployment and proxy architecture.",
      "Reason about initialization, upgrade authorization, and storage compatibility.",
      "Calculate storage locations and debug delegatecall-related state corruption."
    ]
  },
  {
    "label": "Week 3",
    "title": "DeFi mechanics: AMMs, swaps, and liquidity",
    "goal": "Move from using exchange interfaces to understanding their underlying accounting, swap mathematics, liquidity positions, and price dependencies.",
    "topics": [
      {
        "title": "Constant-product pools",
        "items": [
          "x × y = k, pricing, slippage, and impermanent loss.",
          "Adding/removing liquidity, LP-token accounting, and swap output calculations."
        ]
      },
      {
        "title": "Concentrated liquidity",
        "items": [
          "Uniswap V3 ticks, price ranges, and capital efficiency.",
          "NFT liquidity positions and range-dependent liquidity accounting."
        ]
      },
      {
        "title": "Flash loans and arbitrage",
        "items": [
          "Atomic repayment requirements and callback flows.",
          "Aave/Uniswap integrations and arbitrage calculations that include fees and gas."
        ]
      },
      {
        "title": "Oracles",
        "items": [
          "Time-weighted average prices and price-manipulation considerations.",
          "Chainlink feeds, stale data, and sequencer downtime checks."
        ]
      }
    ],
    "handsOn": [
      "Build a Uniswap V2-style pool with swap mathematics and LP tokens.",
      "Implement flash-loan arbitrage across DEXes in a local mainnet-fork environment.",
      "Add a guarded price feed to a mock lending contract and test stale-data behavior."
    ],
    "outcomes": [
      "Explain pool pricing and build direct integrations with pair contracts.",
      "Reason about atomic trades and their costs.",
      "Evaluate oracle dependencies and manipulation risks in financial contracts."
    ]
  },
  {
    "label": "Week 4",
    "title": "The EVM engine, gas optimization, and new transaction types",
    "goal": "Measure execution costs and understand the lower-level operations behind Solidity. Connect those mechanics with newer transaction formats and smart-account workflows.",
    "topics": [
      {
        "title": "Gas and Yul",
        "items": [
          "Memory versus calldata when passing arrays.",
          "Storage packing, caching, SLOAD, and SSTORE costs.",
          "Yul operations such as mload, mstore, and calldataload, with attention to the checks bypassed by assembly."
        ]
      },
      {
        "title": "Transaction formats",
        "items": [
          "EIP-1559 base fees, priority fees, and transaction selection.",
          "EIP-4844 blob transactions and Layer 2 data availability."
        ]
      },
      {
        "title": "Account abstraction and delegation",
        "items": [
          "ERC-4337 UserOperations, bundlers, EntryPoint, and paymasters.",
          "EIP-7702 authorization tuples, delegated EOA execution, batching, and sponsorship. Delegation persists until replaced or cleared."
        ]
      }
    ],
    "handsOn": [
      "Rewrite a Solidity operation in Yul and compare Foundry gas reports.",
      "Reorganize a contract’s state to explore storage packing.",
      "Construct an EIP-7702 authorization and execute a batch of token transfers in a test environment."
    ],
    "outcomes": [
      "Find and measure avoidable gas costs.",
      "Relate compiler output to EVM operations.",
      "Compare account-abstraction and delegated-account workflows, including their authorization boundaries."
    ]
  },
  {
    "label": "Week 5",
    "title": "Advanced security, MEV, fuzzing, and invariant testing",
    "goal": "Move beyond happy-path tests. Study how assumptions fail, reproduce attacks in controlled environments, and build test campaigns around properties that must remain true.",
    "topics": [
      {
        "title": "Exploit classes",
        "items": [
          "Cross-contract and read-only reentrancy.",
          "Signature replay, integer truncation, and access-control failures in upgradeable systems."
        ]
      },
      {
        "title": "MEV and transaction ordering",
        "items": [
          "Sandwiching, frontrunning, and backrunning mechanics.",
          "Searcher behavior, Flashbots, builders, and bundled transactions."
        ]
      },
      {
        "title": "Property-based testing",
        "items": [
          "Stateless fuzzing and randomized inputs.",
          "Stateful invariant tests that exercise sequences of protocol interactions.",
          "Defining properties such as collateral/debt constraints and interpreting failures within the tested assumptions."
        ]
      }
    ],
    "handsOn": [
      "Solve a controlled read-only-reentrancy challenge and explain the exploit trace.",
      "Model a sandwich scenario against a local DEX/mempool simulation.",
      "Build a Foundry invariant suite for a provided lending protocol and investigate counterexamples."
    ],
    "outcomes": [
      "Identify architecture assumptions that deserve adversarial testing.",
      "Explain ordering risks and how they can affect users.",
      "Use fuzzing and invariants to find failures and strengthen confidence, without treating finite test runs as a proof of security."
    ]
  },
  {
    "label": "Week 6",
    "title": "Final project: production protocol architecture",
    "goal": "Integrate architecture, tokens, DeFi mechanics, testing, and optimization in a protocol project, then review and deploy it to a testnet.",
    "topics": [
      {
        "title": "System design",
        "items": [
          "Separating factory, logic, and storage components.",
          "Architecture diagrams, state transitions, user flows, and storage layouts."
        ]
      },
      {
        "title": "Fork-based integration",
        "items": [
          "Testing against mainnet state through a local fork.",
          "Simulating liquidity movement between existing protocols and the new system."
        ]
      },
      {
        "title": "Review and communication",
        "items": [
          "Peer code review and documenting architecture risks.",
          "Audit reports covering logical flaws, gas inefficiencies, and recommended fixes."
        ]
      }
    ],
    "handsOn": [
      "Prepare architecture diagrams and storage layouts for review.",
      "Build a capstone such as an upgradeable yield protocol with a token hook or a modular minimal-proxy DEX.",
      "Review another participant’s project and document findings and fixes.",
      "Automate deployment to a live testnet."
    ],
    "outcomes": [
      "Take a protocol from a design to an integrated, tested testnet deployment.",
      "Review another codebase and communicate findings clearly.",
      "Write technical documentation that explains the architecture and its trade-offs."
    ]
  }
];

