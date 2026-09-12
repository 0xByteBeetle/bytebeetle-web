import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Bootcamps | 0xByteBeetle",
  description: "Compare the EVM Engineering and Advanced EVM bootcamps: prerequisites, detailed curricula, and hands-on projects.",
};

const principles = [
  ["Understand the mechanism", "Work through a detailed explanation, then inspect an example and the behavior it produces."],
  ["Put it into practice", "Each module closes with technical questions and a separate hands-on section. Explain what happens, then work through it yourself."],
];

export default function BootcampsPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="page-hero">
        <p className="eyebrow">Bootcamps</p>
        <h1>Understand the internals. Put them to work.</h1>
        <p>The bootcamps connect detailed explanations with technical questions, hands-on exercises, and a final project. Start with EVM Engineering if you know basic Solidity. Choose the advanced path when you are comfortable building and testing contracts.</p>
      </section>

      <section className="course-directory">
        <article className="course-directory-card">
          <div className="course-status"><span>01</span><span>Complete curriculum</span></div>
          <p className="eyebrow">EVM foundation</p>
          <h2>EVM Engineering Bootcamp</h2>
          <p>A six-week path from Ethereum internals and nodes to transaction construction, monitoring systems, and a working mini DEX.</p>
          <ul className="plain-list">
            <li>For developers with basic Solidity knowledge</li>
            <li>Twenty focused modules and runnable Foundry labs</li>
            <li>Technical questions and hands-on work in every module</li>
          </ul>
          <a className="button button-primary" href="/bootcamps/evm-engineering">Explore the curriculum</a>
        </article>

        <article className="course-directory-card soft-card">
          <div className="course-status"><span>02</span><span>In development</span></div>
          <p className="eyebrow">EVM advanced</p>
          <h2>Advanced EVM Bootcamp</h2>
          <p>A planned six-week study of custom tokens, signatures, upgradeable architecture, AMMs, gas, and adversarial testing.</p>
          <ul className="plain-list">
            <li>For people comfortable with Solidity and Foundry</li>
            <li>Eight token modules begin the planned curriculum</li>
            <li>Build toward a protocol capstone with fuzzing, invariants, and review</li>
          </ul>
          <a className="button button-primary" href="/bootcamps/advanced-evm">Explore the curriculum</a>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">How you will study</p>
          <h2>Read it, question it, try it.</h2>
        </div>
        <div className="principle-grid">
          {principles.map(([title, description], index) => (
            <article className="principle" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quiet-cta">
        <p className="eyebrow">Not sure where to begin?</p>
        <h2>Start with the curriculum, or send me a note.</h2>
        <p>You can read every week’s topics and practical work on the course pages. If you are unsure about the level or learning format, tell me a little about your background.</p>
        <a className="text-link" href="/contact">Get in touch →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
