import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Bootcamps | 0xByteBeetle",
  description: "Explore EVM Engineering and register future interest in the Advanced EVM and Solana bootcamps.",
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
        <p>Explore EVM Engineering for self-paced study, or register future interest in Advanced EVM and Solana. The EVM Engineering curriculum connects detailed explanations with technical questions, hands-on exercises, and a final project.</p>
        <p>I’ve taught blockchain bootcamps before, with a focus on hands-on blockchain engineering.</p>
      </section>

      <section className="course-directory">
        <article className="course-directory-card">
          <div className="course-status"><span>01</span><span>Complete curriculum</span></div>
          <p className="eyebrow">EVM engineering</p>
          <h2>EVM Engineering Bootcamp</h2>
          <p>Study Ethereum internals, transaction construction, monitoring systems, and a working mini DEX at your own pace. Plan for six to seven weeks, with up to twelve weeks for study and support.</p>
          <p><strong>Current introductory price: $799</strong><br />Prices will increase for future enrollments.</p>
          <ul className="plain-list">
            <li>For programmers with some Solidity experience</li>
            <li>Twenty modules covering protocol internals, transaction bytes, call contexts, traces, and a full-stack project</li>
            <li>Technical questions and hands-on work in every module</li>
          </ul>
          <a className="button button-primary" href="/bootcamps/evm-engineering">Explore the curriculum</a>
        </article>

        <article className="course-directory-card soft-card">
          <div className="course-status"><span>02</span><span>Not available yet · Waitlist open</span></div>
          <p className="eyebrow">EVM advanced</p>
          <h2>Advanced EVM Bootcamp</h2>
          <p>This bootcamp is not accepting students yet. Preview the planned curriculum on tokens, signatures, upgradeable architecture, AMMs, gas, and adversarial testing.</p>
          <p><strong>Current introductory early access price: $999</strong><br />Prices will increase for future enrollments. The waitlist collects future interest only; no payment or course access.</p>
          <ul className="plain-list">
            <li>For people comfortable with Solidity and Foundry</li>
            <li>Eight token modules begin the planned curriculum</li>
            <li>Build toward a protocol capstone with fuzzing, invariants, and review</li>
          </ul>
          <a className="button button-primary" href="/bootcamps/advanced-evm#course-interest">Join the Advanced EVM waitlist</a>
        </article>

        <article className="course-directory-card soft-card future-course">
          <div className="course-status"><span>03</span><span>Not available yet · Waitlist open</span></div>
          <p className="eyebrow">Solana</p>
          <h2>Solana Bootcamp</h2>
          <p>This bootcamp is not available yet. Preview the planned six-week curriculum and register your interest in future availability.</p>
          <p><strong>Planned introductory price: $999</strong></p>
          <p>Joining the waitlist does not enroll you, collect payment, or grant course access.</p>
          <a className="button button-primary" href="/bootcamps/solana">Preview the curriculum and join the waitlist</a>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">EVM Engineering study format</p>
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
