import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Resources | 0xByteBeetle",
  description: "Companion code and bootcamp curricula connected to 0xByteBeetle writing.",
};

const ownedResources = [
  {
    label: "EVM · Solana",
    title: "Blog Solutions",
    description: "Companion code for the EVM and Solana articles, organized by post.",
    href: "https://github.com/0xByteBeetle/blog-solutions",
  },
  {
    label: "Organization",
    title: "0xByteBeetle on GitHub",
    description: "The public home for course resources, examples, blog companions, and future multichain repositories.",
    href: "https://github.com/0xByteBeetle",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <SiteHeader active="resources" />
      <section className="page-hero">
        <p className="eyebrow">Resources</p>
        <h1>Code and curricula you can explore yourself.</h1>
        <p>Find companion code for the articles and the curriculum for each bootcamp.</p>
      </section>

      <section className="resource-section">
        <div className="library-intro">
          <p className="eyebrow">Article resources</p>
          <h2>Code connected to the writing.</h2>
          <p>The companion repository is organized article by article. Each folder explains its source snippets, available examples, and verification status. Course solutions remain separate from student material.</p>
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
          <p>Explore the weekly topics, hands-on work, and learning outcomes directly on each bootcamp page.</p>
        </div>
        <div className="document-links">
          <a href="/bootcamps/evm-engineering#curriculum"><span>EVM foundation</span><strong>EVM Engineering Bootcamp curriculum</strong><span>Explore curriculum →</span></a>
          <a href="/bootcamps/advanced-evm#curriculum"><span>EVM advanced</span><strong>Advanced EVM Bootcamp curriculum</strong><span>Explore curriculum →</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
