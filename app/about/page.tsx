import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "About | 0xByteBeetle",
  description: "About Andrey Obruchkov and the thinking behind 0xByteBeetle.",
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />
      <section className="page-hero about-hero">
        <p className="eyebrow">About</p>
        <h1>I want to understand what happens beneath the interface.</h1>
      </section>

      <section className="about-story">
        <div className="story-lede">
          <p>I am Andrey Obruchkov, a blockchain engineer and protocol builder.</p>
        </div>
        <div className="story-body">
          <p>My work has involved smart contract integrations, DEX tooling, multichain wallets, infrastructure, protocol-level debugging, Go, and Rust. A large part of that work required going beyond documentation: reading implementations, tracing transactions, and understanding what happens when assumptions meet a real network.</p>
          <p>0xByteBeetle is the name I write under when exploring blockchain internals. I start with a question, follow the mechanism, and use examples to make it easier to see. The writing is for technical people, whether you build software, work with blockchain systems, or simply want to understand them.</p>
          <p>The articles let you follow one question at a time. The bootcamps bring related ideas together into a longer path with exercises and projects. EVM is the first course track; the publication also explores Solana and Hyperliquid, with room for other chains as the work grows.</p>
        </div>
      </section>

      <section className="beliefs-section">
        <p className="eyebrow">The questions I follow</p>
        <div className="belief-grid">
          <article><h2>What happens after you call a contract?</h2><p>Follow calldata into bytecode, inspect a transaction trace, and see how the execution context changes between calls.</p><a className="text-link" href="/blogs/evm">Explore the EVM writing →</a></article>
          <article><h2>Where does a Solana program keep its state?</h2><p>Start with accounts, then connect their data to instructions, serialization, and token extensions.</p><a className="text-link" href="/blogs/solana">Explore the Solana writing →</a></article>
          <article><h2>How does an exchange shape a blockchain?</h2><p>Look at HyperCore and HyperEVM, and how Hyperliquid’s architecture connects them.</p><a className="text-link" href="/blogs/hyperliquid">Explore the Hyperliquid writing →</a></article>
        </div>
      </section>

      <section className="profile-band">
        <div><p className="eyebrow">Elsewhere</p><h2>Follow the work where it is published.</h2></div>
        <div className="profile-link-list">
          <a href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noreferrer">Substack <span>↗</span></a>
          <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Medium <span>↗</span></a>
          <a href="https://github.com/0xByteBeetle" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <a href="https://www.linkedin.com/in/andrey-obruchkov/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://andreyobruchkov.com" target="_blank" rel="noreferrer">Personal site <span>↗</span></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
