import type { Metadata } from "next";
import { EmailLink } from "../../contact-details";
import { foundationCurriculum } from "../curriculum-data";
import { Curriculum } from "../curriculum";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "EVM Engineering Bootcamp | 0xByteBeetle",
  description: "A foundational six-week curriculum for understanding and building EVM systems.",
};

const outcomes = [
  "Reason about Ethereum as a state machine and explain the relationship between execution and consensus clients.",
  "Read calldata, transaction envelopes, receipts, logs, traces, and low-level execution output.",
  "Construct, sign, replace, and debug EVM transactions without treating the wallet as magic.",
  "Build contracts, tests, monitoring code, and a small DEX using the same tools used throughout the lessons.",
];

export default function EvmEngineeringPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="course-hero">
        <div>
          <p className="eyebrow">EVM foundation · Complete curriculum</p>
          <h1>EVM Engineering Bootcamp</h1>
          <p className="hero-lede">A six-week engineering path for developers who know basic Solidity and want to understand what happens beneath contract interfaces.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#curriculum">Explore the curriculum ↓</a>
            <a className="button button-secondary" href="/contact">Ask about guided study</a>
          </div>
          <p className="direct-contact">Questions about the course? Email me at <EmailLink subject="EVM Engineering Bootcamp" />.</p>
        </div>
        <aside className="course-facts">
          <div><span>Length</span><strong>6 weeks</strong></div>
          <div><span>Depth</span><strong>20 modules</strong></div>
          <div><span>Tools</span><strong>Foundry, Anvil, Geth, Go, Python</strong></div>
          <div><span>Finish</span><strong>Mini DEX and monitoring system</strong></div>
        </aside>
      </section>

      <section className="curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Curriculum map</p>
          <h2 id="curriculum-heading">From protocol mechanics to a working system.</h2>
          <p>Explore the topics, practical work, and outcomes for each week. The final two weeks come together in one full-stack project.</p>
        </div>
        <Curriculum weeks={foundationCurriculum} />
      </section>

      <section className="two-column-detail">
        <div>
          <p className="eyebrow">Inside the work</p>
          <h2>You move between the protocol, the code, and the output.</h2>
        </div>
        <div className="detail-stack">
          <p>Lessons begin with the mental model: state transitions, account types, calldata, execution context, transaction envelopes, mempool behavior, logs, and traces.</p>
          <p>Hands-on work then makes those mechanics visible through RPC queries, Foundry traces, manual encoding, local nodes, Go services, and contract tests.</p>
          <p>When code appears in the material, a matching runnable version exists on the instructor side so the behavior and screenshot output can be reproduced.</p>
        </div>
      </section>

      <section className="outcomes-section">
        <p className="eyebrow">What you should be able to do</p>
        <div className="outcome-grid">
          {outcomes.map((outcome, index) => (
            <article key={outcome}><span>0{index + 1}</span><p>{outcome}</p></article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
