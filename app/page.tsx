import Link from "next/link";
import ContactForm from "./contact-form";
import { substackArticles } from "./content";
import { SiteFooter, SiteHeader } from "./site-shell";

const bootcamps = [
  {
    label: "Complete foundation",
    title: "EVM Engineering Bootcamp",
    href: "/bootcamps/evm-engineering",
    description:
      "A complete foundation in execution, calldata, transactions, signing, observability, tokens, testing, and protocol development.",
    note: "A six-week path with runnable Foundry labs",
  },
  {
    label: "In development",
    title: "Advanced EVM Bootcamp",
    href: "/bootcamps/advanced-evm",
    description:
      "A deeper study of token internals, typed signatures, permit flows, storage, gas behavior, integration risk, and adversarial testing.",
    note: "Long-form modules with verified reference projects",
  },
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">By Andrey Obruchkov</p>
          <h1>Notes, bootcamps, and practical experiments in multichain engineering.</h1>
          <p className="hero-lede">
            I use 0xByteBeetle to take blockchain systems apart and explain how they
            behave. The first learning track is focused on the EVM. The writing already
            extends into Solana, and the work will continue across chains.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/blogs">Read the blogs</Link>
            <a className="button button-secondary" href="/bootcamps">Explore the bootcamps</a>
          </div>
        </div>

        <aside className="focus-card" aria-label="Topics covered by 0xByteBeetle">
          <p className="focus-heading">What I am exploring</p>
          <ul>
            <li>EVM execution, storage, and transaction behavior</li>
            <li>Solana programs, accounts, tokens, and runtime mechanics</li>
            <li>Cross-chain systems and integration assumptions</li>
            <li>Infrastructure, Go, Rust, and engineering practice</li>
          </ul>
        </aside>
      </section>

      <section className="writing-section" id="writing">
        <div className="section-heading compact-heading section-heading-row">
          <div>
            <p className="eyebrow">Blogs</p>
            <h2>Ideas I am working through in public.</h2>
            <p>Long-form explanations built from source code, real executions, and the questions that appear while building systems.</p>
          </div>
          <Link className="text-link" href="/blogs">Browse all blogs →</Link>
        </div>

        <div className="article-preview-grid">
          {substackArticles.slice(0, 3).map((article) => (
            <a className="article-preview" href={article.href} target="_blank" rel="noreferrer" key={article.href}>
              <div className="article-meta"><span>{article.topic}</span><span>{article.date}</span></div>
              <h3>{article.title}</h3>
              <span className="text-link">Read article ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="bootcamps-section" id="bootcamps">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Bootcamps</p>
            <h2>The EVM is the first learning track.</h2>
            <p>Each module combines a careful explanation, code you can run, and questions that make you check whether you understand the mechanism.</p>
          </div>
          <a className="text-link" href="/bootcamps">See curricula and format →</a>
        </div>

        <div className="bootcamp-grid">
          {bootcamps.map((bootcamp) => (
            <a className="bootcamp-card linked-card" href={bootcamp.href} key={bootcamp.title}>
              <p className="platform-label">{bootcamp.label}</p>
              <h3>{bootcamp.title}</h3>
              <p>{bootcamp.description}</p>
              <p className="bootcamp-note">{bootcamp.note}</p>
              <span className="text-link">Explore this bootcamp →</span>
            </a>
          ))}
        </div>

        <div className="teaching-note">
          <p className="eyebrow">The course rule</p>
          <blockquote>“If code appears in a lesson, it exists on our side, it runs, and its output has been inspected.”</blockquote>
          <p>Technical questions test the explanation. Hands-on questions test whether you can use it. Solutions and reference projects stay separate from the student material.</p>
          <a href="/resources">Explore the public resources →</a>
        </div>
      </section>

      <section className="about-contact" id="about">
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>I build systems and teach what I learn from them.</h2>
          <p>
            I am Andrey Obruchkov, a blockchain engineer and protocol builder working
            across smart contracts, multichain systems, infrastructure, Go, and Rust.
            0xByteBeetle is where I collect the explanations, examples, and learning
            material that come out of that work.
          </p>
          <div className="profile-links">
            <a href="/about">Read more about the work →</a>
            <a href="/resources">Browse resources →</a>
          </div>
        </div>

        <div className="contact-panel" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Send me a note.</h2>
          <p className="contact-intro">Bootcamps, mentoring, team training, writing, protocol work, or simply an interesting technical question are all welcome.</p>
          <ContactForm />
          <a className="contact-page-link" href="/contact">Open the dedicated contact page →</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
