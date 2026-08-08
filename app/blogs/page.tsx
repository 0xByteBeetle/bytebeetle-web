import type { Metadata } from "next";
import { mediumArticles, substackArticles } from "../content";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Blogs | 0xByteBeetle",
  description: "Andrey Obruchkov's deep dives into EVM, Solana, token architecture, and multichain engineering.",
};

export default function BlogsPage() {
  return (
    <main>
      <SiteHeader active="blogs" />
      <section className="page-hero writing-hero">
        <p className="eyebrow">Blogs</p>
        <h1>Technical ideas, followed all the way down.</h1>
        <p>I write sequential deep dives rather than isolated tips. The goal is to connect specifications, source code, runnable examples, and the behavior engineers eventually meet in production.</p>
        <div className="publication-links">
          <a href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noreferrer">Subscribe on Substack ↗</a>
          <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Follow on Medium ↗</a>
        </div>
      </section>

      <section className="featured-writing">
        <p className="eyebrow">Current direction</p>
        <div className="featured-grid">
          {substackArticles.slice(0, 3).map((article, index) => (
            <a className="featured-article" href={article.href} target="_blank" rel="noreferrer" key={article.href}>
              <span>0{index + 1}</span>
              <div className="article-meta"><span>{article.topic}</span><span>{article.date}</span></div>
              <h2>{article.title}</h2>
              <p>Read on Substack ↗</p>
            </a>
          ))}
        </div>
      </section>

      <section className="article-library">
        <div className="library-intro">
          <p className="eyebrow">Substack archive</p>
          <h2>Deep dives and connected series.</h2>
          <p>The latest twenty pieces are collected here. The publication itself remains the complete archive and subscription source.</p>
        </div>
        <div className="article-list">
          {substackArticles.map((article, index) => (
            <a href={article.href} target="_blank" rel="noreferrer" className="article-row" key={article.href}>
              <span className="article-number">{String(index + 1).padStart(2, "0")}</span>
              <div><span className="topic-label">{article.topic}</span><h3>{article.title}</h3></div>
              <span className="article-date">{article.date}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="article-library medium-library">
        <div className="library-intro">
          <p className="eyebrow">Medium archive</p>
          <h2>Recent articles and cross-published work.</h2>
          <p>Some pieces appear on both publications. They remain listed here so readers can use the platform they prefer.</p>
        </div>
        <div className="article-list">
          {mediumArticles.map((article, index) => (
            <a href={article.href} target="_blank" rel="noreferrer" className="article-row" key={article.href}>
              <span className="article-number">{String(index + 1).padStart(2, "0")}</span>
              <div><span className="topic-label">{article.topic}</span><h3>{article.title}</h3></div>
              <span className="article-date">{article.date}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="blog-companions">
        <div className="library-intro">
          <p className="eyebrow">Companion code</p>
          <h2>Resources connected to specific articles.</h2>
          <p>These public repositories let you move from the explanation into a working project without searching for the matching code.</p>
        </div>
        <div className="document-links">
          <a href="https://github.com/bounty-wiz/TransactionTypes" target="_blank" rel="noreferrer">
            <span>EVM transactions</span>
            <strong>Legacy transactions, typed transactions, and EIP-7702 examples</strong>
            <span>Open companion code ↗</span>
          </a>
          <a href="https://github.com/bounty-wiz/Anchor-Solana-Accounts" target="_blank" rel="noreferrer">
            <span>Solana accounts</span>
            <strong>Anchor accounts, seeds, bumps, PDAs, and client interaction</strong>
            <span>Open companion code ↗</span>
          </a>
        </div>
      </section>

      <section className="quiet-cta">
        <p className="eyebrow">Code and references</p>
        <h2>Articles are easier to trust when you can inspect what they are built from.</h2>
        <p>The resources page collects runnable examples, source repositories, protocol implementations, and the public course material connected to the writing.</p>
        <a className="text-link" href="/resources">Browse supporting resources →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
