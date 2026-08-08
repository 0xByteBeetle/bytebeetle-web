import type { Metadata } from "next";
import { advancedCurriculumUrl, foundationCurriculumUrl } from "../content";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Resources | 0xByteBeetle",
  description: "Runnable examples, curricula, source references, and engineering resources connected to 0xByteBeetle writing.",
};

const ownedResources = [
  {
    label: "EVM · Go",
    title: "Transaction Types",
    description: "Working examples for constructing and signing legacy and modern EVM transactions, including EIP-7702 experiments.",
    href: "https://github.com/bounty-wiz/TransactionTypes",
  },
  {
    label: "Solana · Anchor",
    title: "Anchor Solana Accounts",
    description: "The runnable companion project for accounts, seeds, bumps, PDAs, and client interaction.",
    href: "https://github.com/bounty-wiz/Anchor-Solana-Accounts",
  },
  {
    label: "Organization",
    title: "0xByteBeetle on GitHub",
    description: "The public home for course resources, examples, blog companions, and future multichain repositories.",
    href: "https://github.com/0xByteBeetle",
  },
];

const sourceReferences = [
  ["Agave", "Solana's validator implementation and the source behind runtime, transaction, fee, and compute-budget explanations.", "https://github.com/anza-xyz/agave"],
  ["Token-2022", "The program and client implementations used while studying transfer hooks, confidential transfers, metadata, and extensions.", "https://github.com/solana-program/token-2022"],
  ["SPL Token", "The canonical token program source used to follow account layouts and token processing behavior.", "https://github.com/solana-program/token"],
  ["Borsh", "The serialization implementation referenced by the Borsh deep dive.", "https://github.com/near/borsh"],
  ["Metaplex Token Metadata", "The program source used when explaining metadata accounts, derivation, and ownership.", "https://github.com/metaplex-foundation/mpl-token-metadata"],
];

export default function ResourcesPage() {
  return (
    <main>
      <SiteHeader active="resources" />
      <section className="page-hero">
        <p className="eyebrow">Resources</p>
        <h1>Code, curricula, and sources you can inspect yourself.</h1>
        <p>This page connects the writing and teaching material to runnable examples and the implementations behind the explanation. Public resources appear here when they are ready to be useful.</p>
      </section>

      <section className="resource-section">
        <div className="library-intro">
          <p className="eyebrow">Runnable companions</p>
          <h2>Code connected to the writing.</h2>
          <p>These are public projects that support specific technical articles. Course solution repositories remain separate from student material and are not published here.</p>
        </div>
        <div className="resource-grid">
          {ownedResources.map((resource) => (
            <a className="resource-card" href={resource.href} target="_blank" rel="noreferrer" key={resource.title}>
              <p className="platform-label">{resource.label}</p>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className="text-link">Open resource ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="resource-section soft-section">
        <div className="library-intro">
          <p className="eyebrow">Course maps</p>
          <h2>Read the curricula.</h2>
          <p>The website gives a readable overview. These working documents contain the complete week-by-week direction.</p>
        </div>
        <div className="document-links">
          <a href={foundationCurriculumUrl} target="_blank" rel="noreferrer"><span>EVM foundation</span><strong>EVM Engineering Bootcamp curriculum</strong><span>Open Google Doc ↗</span></a>
          <a href={advancedCurriculumUrl} target="_blank" rel="noreferrer"><span>EVM advanced</span><strong>Advanced EVM Bootcamp curriculum</strong><span>Open Google Doc ↗</span></a>
        </div>
      </section>

      <section className="resource-section">
        <div className="library-intro">
          <p className="eyebrow">Source reading</p>
          <h2>Implementations behind the explanations.</h2>
          <p>These are upstream projects, not 0xByteBeetle repositories. They are included because several articles trace their behavior directly.</p>
        </div>
        <div className="source-list">
          {sourceReferences.map(([title, description, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={title}>
              <h3>{title}</h3><p>{description}</p><span>GitHub ↗</span>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
