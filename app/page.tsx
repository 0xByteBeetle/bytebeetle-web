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
            <div className="study-intro"><h2 id="study-title">Prefer a structured path?</h2><p>The articles explore individual questions. The bootcamps connect those ideas through detailed lessons, technical questions, and hands-on projects.</p><a href="/bootcamps">Compare the bootcamps →</a></div>
            <div>
              <div className="course"><h3><a href="/bootcamps/evm-engineering">EVM Engineering Bootcamp</a></h3><p>Start with Ethereum’s internals and follow a transaction through the system. Build toward a token-swap app with a backend, wallet views, and live transaction monitoring.</p><a href="/bootcamps/evm-engineering">View curriculum and prerequisites →</a></div>
              <div className="course"><span className="status">In development</span><h3><a href="/bootcamps/advanced-evm">Advanced EVM Bootcamp</a></h3><p>For people already comfortable with Solidity: custom tokens, upgradeable contracts, AMM mechanics, gas, and adversarial testing, brought together in a protocol project.</p><a href="/bootcamps/advanced-evm">Explore the planned curriculum →</a></div>
            </div>
          </div>
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
