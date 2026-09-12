import type { Metadata } from "next";
import CourseInterestForm from "../course-interest-form";
import { foundationCurriculum } from "../curriculum-data";
import { Curriculum } from "../curriculum";
import { LessonPreview } from "../lesson-preview";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "EVM Engineering Bootcamp | 0xByteBeetle",
  description: "A foundational six-week curriculum for understanding and building EVM systems.",
};

export default function EvmEngineeringPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="course-hero">
        <div>
          <p className="eyebrow">EVM foundation · Complete curriculum</p>
          <h1>EVM Engineering Bootcamp</h1>
          <p className="hero-lede">Understand how Ethereum works from the inside, then connect it to a working application. This six-week curriculum starts with nodes and EVM execution and builds toward a token-swap app with live transaction monitoring.</p>
          <p className="course-prerequisites">You should be comfortable with basic Solidity and writing code. The articles are open to any curious technical reader; this course includes substantial implementation work.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#curriculum">Explore the curriculum ↓</a>
            <a className="button button-secondary" href="#course-interest">Get in touch</a>
          </div>
        </div>
        <aside className="course-facts">
          <div><span>Length</span><strong>6 weeks</strong></div>
          <div><span>Depth</span><strong>20 modules</strong></div>
          <div><span>Tools</span><strong>Foundry, Anvil, Geth, Go, Python</strong></div>
          <div><span>Project</span><strong>Token-swap app and monitoring system</strong></div>
        </aside>
      </section>

      <section className="two-column-detail course-overview" aria-labelledby="course-overview-heading">
        <div>
          <p className="eyebrow">What the course connects</p>
          <h2 id="course-overview-heading">Follow a transaction all the way through.</h2>
          <p>Read the bytes, understand the execution, and explain the result. Then use that understanding in a system you can interact with.</p>
        </div>
        <div className="detail-stack">
          <h3>Understand what the tools are showing you</h3>
          <p>Read calldata and traces, work with nodes and RPCs, construct and sign transactions, and follow receipts, logs, and confirmations.</p>
          <h3>Bring it together in a full-stack project</h3>
          <p>Build an ERC-20 token and a fixed-ratio SimpleSwap contract, a wallet and swap interface, a backend API, and PostgreSQL storage. Track each transaction from pending to confirmed in the activity view.</p>
          <p>This first swap project focuses on token approvals and application integration. Building an AMM and its pricing mathematics belongs to the advanced course.</p>
        </div>
      </section>

      <section className="curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Curriculum map</p>
          <h2 id="curriculum-heading">From protocol mechanics to a working system.</h2>
          <p>Explore the topics, practical work, and outcomes for each week. The final two weeks come together in one full-stack project.</p>
        </div>
        <Curriculum weeks={foundationCurriculum} />
      </section>

      <LessonPreview />
      <CourseInterestForm course="evm-engineering" />
      <SiteFooter />
    </main>
  );
}
