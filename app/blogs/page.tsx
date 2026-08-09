import type { Metadata } from "next";
import { evmSubstackArticles, solanaSubstackArticles } from "../content";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Blogs | 0xByteBeetle",
  description:
    "Andrey Obruchkov's complete EVM and Solana writing archive, with checked companion code for every Substack article.",
};

const recentArticles = [
  ...evmSubstackArticles.slice(0, 2),
  ...solanaSubstackArticles.slice(0, 2),
];

export default function BlogsPage() {
  return (
    <main>
      <SiteHeader active="blogs" />
      <section className="page-hero writing-hero">
        <p className="eyebrow">Blogs</p>
        <h1>Two systems, studied from the inside.</h1>
        <p>
          I write connected technical series about the EVM and Solana. Each one starts
          with a mechanism, follows it into source code and runtime behavior, and keeps
          the matching examples close enough to run.
        </p>
        <div className="publication-links">
          <a href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noreferrer">
            Read on Substack ↗
          </a>
          <a href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">
            Read on Medium ↗
          </a>
        </div>
      </section>

      <section className="writing-paths" id="archives">
        <div className="writing-path-grid">
          <a className="writing-path" href="/blogs/evm">
            <span className="path-count">37 articles</span>
            <h2>EVM</h2>
            <p>
              Transactions, calldata, storage, execution, gas, proxies, token standards,
              RPC behavior, security, and protocol architecture.
            </p>
            <span className="text-link">Browse EVM writing →</span>
          </a>
          <a className="writing-path writing-path-soft" href="/blogs/solana">
            <span className="path-count">16 articles</span>
            <h2>Solana</h2>
            <p>
              Accounts, programs, messages, serialization, PDAs, Token-2022, metadata,
              zero-copy layouts, and runtime execution.
            </p>
            <span className="text-link">Browse Solana writing →</span>
          </a>
        </div>
      </section>

      <section className="featured-writing">
        <div className="library-intro">
          <p className="eyebrow">Recent writing</p>
          <h2>Continue from either chain.</h2>
          <p>
            The two archives stay separate, while the underlying habit is the same:
            inspect the bytes, run the example, and verify the explanation.
          </p>
        </div>
        <div className="article-preview-grid overview-latest-grid">
          {recentArticles.map((article) => (
            <a className="article-preview" href={article.href} target="_blank" rel="noreferrer" key={article.href}>
              <div className="article-meta">
                <span>{article.topic}</span>
                <span>{article.date}</span>
              </div>
              <h3>{article.title}</h3>
              <span className="text-link">Read article ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="quiet-cta">
        <p className="eyebrow">Companion code</p>
        <h2>Every Substack article has a place in the repository.</h2>
        <p>
          The archive maps all 53 posts to checked EVM or Solana examples, with honest
          notes where a live network or temporarily disabled runtime feature is required.
        </p>
        <a
          className="text-link"
          href="https://github.com/0xByteBeetle/blog-solutions"
          target="_blank"
          rel="noreferrer"
        >
          Open the complete companion repository ↗
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
