import { SiteHeader } from "./site-shell";
import "./home.css";

export default function Home() {
  return (
<div className="editorial-home"><a className="skip" href="#content">Skip to content</a><SiteHeader active="home" /><main id="content">
    <section className="intro wrap" aria-labelledby="intro-title">
      <p className="byline">Notes by Andrey Obruchkov</p>
      <h1 id="intro-title">Understanding blockchain,<br />beneath the surface.</h1>
      <p className="intro-copy">I explore how blockchain systems work, from EVM execution to Solana’s account model. Here you’ll find deep dives, practical examples, and bootcamps for building a deeper understanding.</p>
      <div className="actions">
        <a className="primary" href="/blogs">Explore the articles <span aria-hidden="true">↗</span></a>
        <a className="secondary" href="/bootcamps">Browse bootcamps <span aria-hidden="true">→</span></a>
      </div>
    </section>
    <section className="writing wrap" aria-labelledby="writing-title">
      <div className="section-top"><h2 id="writing-title">A few places to begin</h2><a href="/blogs">All articles <span aria-hidden="true">→</span></a></div>
      <div className="article-grid">
        <article>
          <div className="metadata">EVM <span>Contract creation</span></div>
          <h3><a href="https://andreyobruchkov1996.substack.com/p/factories-how-smart-contracts-deploy" target="_blank" rel="noopener noreferrer">Factories - How Smart Contracts Deploy Other Contracts</a></h3>
          <p>What happens when the thing deploying a smart contract is another smart contract?</p>
          <div className="article-links"><a href="https://andreyobruchkov1996.substack.com/p/factories-how-smart-contracts-deploy" target="_blank" rel="noopener noreferrer">Read article ↗</a><a href="https://github.com/0xByteBeetle/blog-solutions/tree/main/articles/evm/factories-how-smart-contracts-deploy" target="_blank" rel="noopener noreferrer">Example code ↗</a></div>
        </article>
        <article>
          <div className="metadata">Solana <span>Accounts</span></div>
          <h3><a href="https://andreyobruchkov1996.substack.com/p/understanding-solana-account-model" target="_blank" rel="noopener noreferrer">Understanding Solana: Account Model - part 2</a></h3>
          <p>What is a Solana account, and how does the account model shape the way programs work?</p>
          <div className="article-links"><a href="https://andreyobruchkov1996.substack.com/p/understanding-solana-account-model" target="_blank" rel="noopener noreferrer">Read article ↗</a><a href="https://github.com/0xByteBeetle/blog-solutions/tree/main/articles/solana/understanding-solana-account-model" target="_blank" rel="noopener noreferrer">Example code ↗</a></div>
        </article>
        <article>
          <div className="metadata">Solana <span>Serialization</span></div>
          <h3><a href="https://andreyobruchkov1996.substack.com/p/solana-deep-dive-unpacking-borsh" target="_blank" rel="noopener noreferrer">Solana Deep Dive: Unpacking Borsh Serialization Under the Hood</a></h3>
          <p>How does structured data become a sequence of bytes that a program can read?</p>
          <div className="article-links"><a href="https://andreyobruchkov1996.substack.com/p/solana-deep-dive-unpacking-borsh" target="_blank" rel="noopener noreferrer">Read article ↗</a><a href="https://github.com/0xByteBeetle/blog-solutions/tree/main/articles/solana/solana-deep-dive-unpacking-borsh" target="_blank" rel="noopener noreferrer">Example code ↗</a></div>
        </article>
      </div>
      <p className="browse"><span>Explore by ecosystem</span><a href="/blogs/evm">EVM →</a><a href="/blogs/solana">Solana →</a></p>
    </section>
    <section className="study" aria-labelledby="study-title">
      <div className="wrap">
        <div className="study-intro"><h2 id="study-title">Prefer a structured path?</h2><p>The bootcamps connect the explanations with exercises. Start with the foundations, then work through the details.</p><a href="/bootcamps">Explore the bootcamps →</a></div>
        <div>
          <div className="course"><h3><a href="/bootcamps/evm-engineering">EVM Engineering Bootcamp</a></h3><p>For learning how Ethereum works through hands-on study: execution, transactions, smart contracts, and on-chain activity.</p><a href="/bootcamps/evm-engineering">View curriculum and prerequisites →</a></div>
          <div className="course"><span className="status">In development</span><h3><a href="/bootcamps/advanced-evm">Advanced EVM Bootcamp</a></h3><p>For those comfortable with Solidity who want to go deeper into token behavior, contract architecture, and security.</p><a href="/bootcamps/advanced-evm">Explore the planned curriculum →</a></div>
        </div>
      </div>
    </section>
    <section className="about wrap" aria-labelledby="about-title">
      <h2 id="about-title">Hi, I’m Andrey.</h2>
      <div><p>I’m a blockchain engineer and protocol builder. This is where I share the explanations, experiments, and questions that come out of my work.</p><div className="actions"><a href="/about">More about me →</a><a href="/contact">Get in touch →</a></div></div>
    </section>
  </main><footer className="wrap"><span>0xByteBeetle · Andrey Obruchkov</span><div><a href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noopener noreferrer">Substack ↗</a><a href="https://github.com/0xByteBeetle" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="/contact">Contact</a><a href="/inbox">Owner inbox</a></div></footer></div>
  );
}
