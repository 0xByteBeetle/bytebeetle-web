import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Bootcamps | 0xByteBeetle",
  description: "Deep, runnable EVM engineering curricula by Andrey Obruchkov.",
};

const principles = [
  ["Start below the abstraction", "Understand what the EVM, client, transaction, or standard is doing before relying on a library."],
  ["Run what you read", "Code shown in a module is maintained in a matching reference project and tested before it becomes teaching material."],
  ["Separate knowing from doing", "Every module ends with technical questions and a separate hands-on section."],
  ["Build judgment", "The goal is not to remember an API. It is to reason about behavior, trade-offs, failures, and security."],
];

export default function BootcampsPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="page-hero">
        <p className="eyebrow">Bootcamps</p>
        <h1>Engineering courses for people who want to understand the system.</h1>
        <p>0xByteBeetle bootcamps are long-form technical paths. They combine explanation, runnable code, inspected output, and exercises that expose gaps in understanding.</p>
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
          <p>A production-level study of token internals, typed signatures, proxy architecture, DeFi mechanics, gas, MEV, and invariant testing.</p>
          <ul className="plain-list">
            <li>For working Solidity engineers</li>
            <li>Week one currently contains eight deep token modules</li>
            <li>Verified reference implementations accompany lesson code</li>
          </ul>
          <a className="button button-primary" href="/bootcamps/advanced-evm">Explore the curriculum</a>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">How the material is built</p>
          <h2>A course should survive contact with the terminal.</h2>
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
        <p className="eyebrow">Learning format</p>
        <h2>Use the curriculum independently, or ask about guided study.</h2>
        <p>The right format depends on your background, pace, and whether you need code review, private support, or team training.</p>
        <a className="text-link" href="/contact">Tell me what you are trying to learn →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
