import type { Metadata } from "next";
import CourseInterestForm from "../course-interest-form";
import { advancedCurriculum } from "../curriculum-data";
import { Curriculum } from "../curriculum";
import { LessonPreview } from "../lesson-preview";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "Advanced EVM Bootcamp | 0xByteBeetle",
  description: "Preview the Advanced EVM curriculum and join the waitlist. The bootcamp is not accepting students yet.",
};

export default function AdvancedEvmPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="course-hero">
        <div>
          <p className="eyebrow">EVM advanced · Not available yet · Waitlist open</p>
          <h1>Advanced EVM Bootcamp</h1>
          <p className="hero-lede">Go from writing contracts to reasoning about how a protocol fits together. Explore custom tokens, upgradeable architecture, AMM mathematics, gas, and the ways a system can fail.</p>
          <p className="course-prerequisites">For people already comfortable writing Solidity contracts and Foundry tests. This bootcamp is not accepting students yet. Join the waitlist to register future interest; the curriculum below shows the planned scope.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#course-interest">Join the waitlist ↓</a>
            <a className="button button-secondary" href="#curriculum">Preview the curriculum ↓</a>
          </div>
        </div>
        <aside className="course-facts">
          <div><span>Availability</span><strong>Not accepting students yet</strong></div>
          <div><span>Planned format</span><strong>Self-paced</strong></div>
          <div><span>Current introductory early access price</span><strong>$999</strong><span>Prices will increase for future enrollments. No payment is collected on the waitlist.</span></div>
          <div><span>Planned curriculum</span><strong>6 weeks of study</strong></div>
          <div><span>Starting point</span><strong>Solidity and Foundry experience</strong></div>
          <div><span>Tools</span><strong>Foundry, Yul, mainnet forks</strong></div>
          <div><span>Planned project</span><strong>Tested protocol capstone</strong></div>
        </aside>
      </section>

      <section className="two-column-detail course-overview" aria-labelledby="course-overview-heading">
        <div>
          <p className="eyebrow">What the course connects</p>
          <h2 id="course-overview-heading">Design the system. Challenge its assumptions.</h2>
          <p>Move between architecture, state, financial mechanics, and the tests that put your decisions under pressure.</p>
        </div>
        <div className="detail-stack">
          <h3>Reason beyond a single contract</h3>
          <p>Study token lifecycle hooks and permits, factory and proxy patterns, storage layouts, AMM swaps and liquidity, Yul, and account abstraction. Explore the trade-offs before combining them.</p>
          <h3>Build and examine a protocol</h3>
          <p>The planned capstone brings custom token behavior, upgradeable components, and DeFi mechanics into one project. Exercise it on a mainnet fork, use fuzzing and invariants to search for failures, review the code, and document the architecture before a testnet deployment.</p>
          <p>Testing is evidence about behavior, not a guarantee that a protocol is secure. Understanding that boundary is part of the work.</p>
        </div>
      </section>

      <section className="curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Curriculum direction</p>
          <h2 id="curriculum-heading">From token behavior to protocol architecture.</h2>
          <p>Read the planned topics, practical work, and outcomes here. The week labels organize the curriculum; work through them at your own pace. Week one includes eight modules on advanced token engineering, from ERC-20 to hybrid standards. The bootcamp is not accepting students yet.</p>
        </div>
        <Curriculum weeks={advancedCurriculum} planned />
      </section>

      <LessonPreview advanced />
      <CourseInterestForm course="advanced-evm" />
      <SiteFooter />
    </main>
  );
}
