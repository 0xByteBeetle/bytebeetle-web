import type { Metadata } from "next";
import article from "../../../../content/articles/hyperliquid-part-1.json";
import { SiteFooter, SiteHeader } from "../../../site-shell";
import { ArticleContent } from "../../article/article-content";
import "../../article/reading.css";

const path = "/blogs/hyperliquid/hyperliquid-beyond-generic-vms-the";
const description = "Hyperliquid’s architecture, from the HyperCore and HyperEVM engines to the clearinghouse, cross-margin, and agent keys. By Andrey Obruchkov.";

export const metadata: Metadata = {
  title: `${article.title} | 0xByteBeetle`,
  description,
  // This pilot is a faithful republication; preserve the original publication's
  // search attribution without making any change to Substack itself.
  alternates: { canonical: article.sourceUrl },
  openGraph: { title: article.title, description, type: "article", url: `https://0xbytebeetle.com${path}`, publishedTime: new Date(article.publishedAt).toISOString(), authors: ["Andrey Obruchkov"], images: [] },
  twitter: { card: "summary", title: article.title, description, images: [] },
};

const imageDescriptions = {
  "/articles/hyperliquid-part-1/a055e73d-60af-4bf1-9af3-7423449f1a54_1510x584.png": "HyperEVM reads state and sends transactions to HyperCore, which returns data.",
  "/articles/hyperliquid-part-1/1d7a2a43-82ec-417b-ae81-0fb2f0ce9f04_3022x724.png": "Hyperliquid API wallet page with the Generate and Authorize API Wallet controls and existing agent wallets.",
  "/articles/hyperliquid-part-1/671af9bb-cecc-411e-87d0-e802deb127a3_780x998.png": "Wallet signature request for HyperliquidTransaction:ApproveAgent, showing the agent address, name, and nonce.",
};

function Contents() {
  return <ol>{article.headings.filter(heading => heading.level === 2).map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>;
}

export default function HyperliquidPartOne() {
  return <>
    <SiteHeader active="blogs-hyperliquid" />
    <main className="reading-page" id="article-top">
      <nav className="reading-breadcrumb" aria-label="Breadcrumb"><a href="/blogs">Blogs</a><span aria-hidden="true">/</span><a href="/blogs/hyperliquid">Hyperliquid</a><span aria-hidden="true">/</span><span>Part 1</span></nav>
      <article>
        <header className="reading-header">
          <p className="reading-kicker">Hyperliquid · Architecture</p>
          <h1>{article.title}</h1>
          <div className="reading-byline"><a href="/about">Andrey Obruchkov</a><span aria-hidden="true">·</span><time dateTime="2026-09-06">September 6, 2026</time></div>
          <a className="reading-original" href={article.sourceUrl} target="_blank" rel="noreferrer">Read on Substack <span aria-hidden="true">↗</span><span className="blog-sr-only"> (opens in a new tab)</span></a>
        </header>
        <div className="reading-layout">
          <aside className="reading-sidebar"><nav aria-label="In this article"><p>In this article</p><Contents /><a className="reading-back-top" href="#article-top">Back to top ↑</a></nav></aside>
          <div className="reading-main">
            <details className="reading-mobile-contents"><summary>In this article</summary><nav aria-label="Article sections"><Contents /></nav></details>
            <ArticleContent nodes={article.body} imageDescriptions={imageDescriptions} />
            <footer className="reading-end"><a href="/blogs/hyperliquid">← Hyperliquid articles</a><a href="/blogs">Explore all writing →</a></footer>
          </div>
        </div>
      </article>
    </main>
    <SiteFooter />
  </>;
}
