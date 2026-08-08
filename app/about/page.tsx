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
        <h1>I learn systems by taking them apart, then I teach what survives the process.</h1>
      </section>

      <section className="about-story">
        <div className="story-lede">
          <p>I am Andrey Obruchkov, a blockchain engineer and protocol builder.</p>
        </div>
        <div className="story-body">
          <p>My work has involved smart contract integrations, DEX tooling, multichain wallets, infrastructure, protocol-level debugging, Go, and Rust. A large part of that work required going beyond documentation: reading implementations, tracing transactions, and understanding what happens when assumptions meet a real network.</p>
          <p>0xByteBeetle is where I organize that knowledge. It includes deep technical writing, complete learning paths, runnable examples, and questions designed to expose whether a concept is actually understood.</p>
          <p>The EVM is the first course track, not the boundary of the project. The writing already covers Solana architecture, accounts, Token-2022, serialization, and runtime behavior. Over time, the same approach will extend into more ecosystems and the engineering problems between them.</p>
        </div>
      </section>

      <section className="beliefs-section">
        <p className="eyebrow">What matters to me</p>
        <div className="belief-grid">
          <article><span>01</span><h2>Depth should remain understandable.</h2><p>A subject can be advanced without hiding behind terminology. The explanation should make the mechanism visible.</p></article>
          <article><span>02</span><h2>Examples must be real.</h2><p>If code is used to teach an idea, it should exist, run, and produce output that has been inspected.</p></article>
          <article><span>03</span><h2>Different chains deserve different mental models.</h2><p>Multichain engineering begins by respecting each runtime rather than forcing every ecosystem into an EVM-shaped explanation.</p></article>
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
