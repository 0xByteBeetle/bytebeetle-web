import type { Metadata } from "next";
import { advancedCurriculumUrl, advancedWeekOneModules, advancedWeeks } from "../../content";
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
            <a className="button button-primary" href={advancedCurriculumUrl} target="_blank" rel="noreferrer">Open the working curriculum ↗</a>
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

      <section className="curriculum-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Six-week direction</p>
          <h2>The curriculum follows the decisions senior engineers face.</h2>
        </div>
        <ol className="curriculum-list">
          {advancedWeeks.map((week, index) => (
            <li key={week}><span>0{index + 1}</span><h3>{week}</h3></li>
          ))}
        </ol>
      </section>

      <section className="module-map-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Week one · In active development</p>
          <h2>Advanced token engineering, from ERC-20 to hybrid standards.</h2>
          <p>These modules are written as deep student-facing lessons with runnable instructor references, visible code context, and separate technical and hands-on questions.</p>
        </div>
        <ol className="module-grid">
          {advancedWeekOneModules.map((module, index) => (
            <li key={module}><span>{String(index + 1).padStart(2, "0")}</span><p>{module}</p></li>
          ))}
        </ol>
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
