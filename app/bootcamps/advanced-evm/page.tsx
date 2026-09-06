import type { Metadata } from "next";
import { advancedCurriculum } from "../curriculum-data";
import { Curriculum } from "../curriculum";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "Advanced EVM Bootcamp | 0xByteBeetle",
  description: "An advanced curriculum for production-level EVM architecture, security, DeFi, and testing.",
};

export default function AdvancedEvmPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="course-hero">
        <div>
          <p className="eyebrow">EVM advanced · In development</p>
          <h1>Advanced EVM Bootcamp</h1>
          <p className="hero-lede">A production-level study for Solidity engineers who want stronger judgment around standards, architecture, DeFi mechanics, gas, and adversarial behavior.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#curriculum">Explore the curriculum ↓</a>
            <a className="button button-secondary" href="/contact">Follow or ask about the course</a>
          </div>
        </div>
        <aside className="course-facts">
          <div><span>Planned length</span><strong>6 weeks</strong></div>
          <div><span>Current focus</span><strong>Eight week-one token modules</strong></div>
          <div><span>Tools</span><strong>Foundry, Yul, mainnet forks</strong></div>
          <div><span>Finish</span><strong>Production protocol capstone</strong></div>
        </aside>
      </section>

      <section className="curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Six-week direction</p>
          <h2 id="curriculum-heading">The curriculum follows the decisions senior engineers face.</h2>
          <p>Read the planned topics, practical work, and outcomes here. Week one includes eight modules on advanced token engineering, from ERC-20 to hybrid standards. The course is still in development.</p>
        </div>
        <Curriculum weeks={advancedCurriculum} planned />
      </section>

      <section className="quiet-cta dark-cta">
        <p className="eyebrow">Course journal</p>
        <h2>The advanced course is being built in public, but not rushed.</h2>
        <p>Examples are executed before publication. Screenshots come from real output. Internal implementation references are placed next to the explanation that needs them.</p>
        <div className="profile-links">
          <a href="/blogs">Read related writing →</a>
          <a href="/contact">Ask about the course →</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
