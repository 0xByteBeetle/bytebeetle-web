import type { Metadata } from "next";
import CourseInterestForm from "../course-interest-form";
import { foundationCurriculum } from "../curriculum-data";
import { Curriculum } from "../curriculum";
import { LessonPreview } from "../lesson-preview";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "EVM Engineering Bootcamp | 0xByteBeetle",
  description: "Build a deep understanding of EVM execution through calldata, bytecode, transactions, traces, and a full-stack project. Study at your own pace.",
};

export default function EvmEngineeringPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="course-hero">
        <div>
          <p className="eyebrow">EVM engineering · Complete curriculum</p>
          <h1>EVM Engineering Bootcamp</h1>
          <p className="hero-lede">Build a deep understanding of the EVM, starting from its foundations and following how contracts and transactions execute. Inspect calldata, bytecode, call contexts, signatures, and transaction traces, then bring them together in a token-swap app with live monitoring. Study at your own pace.</p>
          <p className="course-prerequisites">For programmers with some Solidity experience. The course develops the execution model in depth through substantial implementation work.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#curriculum">Explore the curriculum ↓</a>
            <a className="button button-secondary" href="#course-interest">Get in touch</a>
          </div>
        </div>
        <aside className="course-facts">
          <div><span>Format</span><strong>Self-paced</strong></div>
          <div><span>Current introductory price</span><strong>$799</strong><span>Prices will increase for future enrollments.</span></div>
          <div><span>Expected completion</span><strong>6–7 weeks</strong></div>
          <div><span>Extended study and support</span><strong>Up to 12 weeks</strong></div>
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

      <section className="two-column-detail course-overview" aria-labelledby="course-support-heading">
        <div>
          <p className="eyebrow">Study and support</p>
          <h2 id="course-support-heading">Work at your own pace, with private guidance.</h2>
          <p>The course is designed to take six to seven weeks. You can extend your active study period up to twelve weeks.</p>
        </div>
        <div className="detail-stack">
          <h3>One-to-one sessions</h3>
          <p>Up to two 45-minute private sessions per week during your active study period, for up to twelve weeks.</p>
          <h3>Telegram questions and code reviews</h3>
          <p>Telegram questions and code reviews are included for up to twelve weeks.</p>
          <p>Make time to work through the lessons, complete the exercises, and take part in your sessions. Your progress depends on your participation.</p>
        </div>
      </section>

      <section className="curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Curriculum map</p>
          <h2 id="curriculum-heading">From protocol mechanics to a working system.</h2>
          <p>Explore the topics, practical work, and outcomes for each week. The week labels organize the curriculum; work through them at your own pace. The final two curriculum weeks come together in one full-stack project.</p>
        </div>
        <Curriculum weeks={foundationCurriculum} />
      </section>

      <LessonPreview />
      <CourseInterestForm course="evm-engineering" />
      <SiteFooter />
    </main>
  );
}
