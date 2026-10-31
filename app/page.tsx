import { SiteHeader, SiteFooter } from "./site-shell";
import { ecosystems } from "./ecosystems";
import { substackArticles } from "./content";
import { readingPathArticles } from "./reading-paths";
import "./home.css";

export default function Home() {
  return (
    <div className="editorial-home">
      <a className="skip" href="#content">Skip to content</a>
      <SiteHeader active="home" />
      <main id="content">
        <section className="intro wrap" aria-labelledby="intro-title">
          <p className="byline">Blockchain internals, by Andrey Obruchkov</p>
          <h1 id="intro-title">Understanding blockchain,<br />beneath the surface.</h1>
          <p className="intro-copy">0xByteBeetle is where I write about how blockchains actually work. I unpack EVM execution, Solana’s account model, and Hyperliquid’s architecture for technical people who want to go deeper, whether for their work or their own curiosity.</p>
          <div className="actions">
            <a className="primary" href="#writing-title">Find a place to start <span aria-hidden="true">↓</span></a>
            <a className="secondary" href="/bootcamps">Browse bootcamps <span aria-hidden="true">→</span></a>
            <a className="secondary" href="#work-title">Work with me <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="writing wrap" aria-labelledby="writing-title">
          <div className="section-top"><h2 id="writing-title">Start exploring</h2><a href="/blogs">All articles <span aria-hidden="true">→</span></a></div>
          <p className="section-note">Pick a chain. These are the first articles in each series; you don’t need to start in the middle.</p>
          <div className="article-grid">
            {ecosystems.map(ecosystem => {
              const article = readingPathArticles(ecosystem.label, substackArticles)[0];
              const link = article.localHref ?? article.href;
              const external = !article.localHref;
              return (
                <article key={ecosystem.slug}>
                  <div className="metadata">{ecosystem.label}</div>
                  <h3><a href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{article.title}</a></h3>
                  <p>{article.description}</p>
                  <div className="article-links">
                    <a href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`Read ${ecosystem.label} Part 1${external ? " on Substack (opens in a new tab)" : ""}`}>Read Part 1 {external ? "↗" : "→"}</a>
                    <a href={ecosystem.href}>Explore the series →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="study" aria-labelledby="study-title">
          <div className="wrap">
            <div className="study-intro"><h2 id="study-title">Prefer a structured path?</h2><p>I’ve taught blockchain bootcamps before. Study EVM Engineering at your own pace through detailed lessons, technical questions, and hands-on projects. Advanced EVM and Solana are not available yet; their waitlists are open.</p><a href="/bootcamps">Explore the bootcamps →</a></div>
            <div>
              <div className="course"><h3><a href="/bootcamps/evm-engineering">EVM Engineering Bootcamp</a></h3><p>Trace calldata and bytecode through contract execution, examine signatures and transactions, and build a token-swap app with a backend and live monitoring.</p><a href="/bootcamps/evm-engineering">View curriculum and prerequisites →</a></div>
              <div className="course"><span className="status">Not available yet · Waitlist open</span><h3><a href="/bootcamps/advanced-evm">Advanced EVM Bootcamp</a></h3><p>Preview the planned advanced curriculum and register your interest in future availability.</p><a href="/bootcamps/advanced-evm#course-interest">Join the Advanced EVM waitlist →</a></div>
              <div className="course"><span className="status">Not available yet · Waitlist open</span><h3><a href="/bootcamps/solana">Solana Bootcamp</a></h3><p>Explore the planned Solana curriculum and register your interest in a future bootcamp.</p><a href="/bootcamps/solana#course-interest">Join the Solana waitlist →</a></div>
            </div>
          </div>
        </section>

        <section className="services wrap" aria-labelledby="work-title">
          <div className="section-top"><h2 id="work-title">Work with me</h2></div>
          <p className="section-note">Technical writing, consulting, one-to-one mentoring, and bootcamps for people working with blockchain systems.</p>
          <dl className="service-list">
            <div><dt>Technical writing</dt><dd>Articles and technical explanations for blockchain teams.</dd></div>
            <div><dt>Consulting</dt><dd>Discuss a blockchain engineering problem or project. <a href="/consulting">Email me about consulting →</a></dd></div>
            <div><dt>One-to-one mentoring</dt><dd>Individual guidance on what you are learning or building.</dd></div>
            <div><dt>Bootcamps</dt><dd>Study blockchain internals through a structured curriculum at your own pace. <a href="/bootcamps">Explore the bootcamps →</a></dd></div>
          </dl>
          <div className="actions"><a className="primary" href="/contact">Discuss a project <span aria-hidden="true">→</span></a></div>
        </section>

        <section className="selected-work wrap" aria-labelledby="selected-work-title">
          <div className="section-top"><h2 id="selected-work-title">Selected writing and code</h2></div>
          <ul className="proof-list">
            <li><span className="proof-source">Chainstack · By Andrey Obruchkov</span><h3><a href="https://chainstack.com/solana-durable-nonces-offline-signing-and-replay-protection/" target="_blank" rel="noreferrer">Solana durable nonces: offline signing and replay protection ↗</a></h3></li>
            <li><span className="proof-source">Chainstack · By Andrey Obruchkov</span><h3><a href="https://chainstack.com/solana-architecture-parallel-transactions/" target="_blank" rel="noreferrer">Solana: Architecture &amp; Parallel Transactions ↗</a></h3></li>
            <li><span className="proof-source">GitHub · 0xByteBeetle</span><h3><a href="https://github.com/0xByteBeetle/blog-solutions" target="_blank" rel="noreferrer">Companion code for the articles ↗</a></h3></li>
          </ul>
        </section>

        <section className="about wrap" aria-labelledby="about-title">
          <h2 id="about-title">Hi, I’m Andrey.</h2>
          <div><p>I’m a blockchain engineer. I like following a question past the interface: into the transaction, the account data, or the code that makes the behavior possible. 0xByteBeetle is where I share what I find.</p><div className="actions"><a href="/about">More about me →</a><a href="/contact">Get in touch →</a></div></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
