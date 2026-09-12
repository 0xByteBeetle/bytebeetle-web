import { mediumArticles, substackArticles } from "../content";
import { SiteFooter, SiteHeader } from "../site-shell";
import { ArticleArchive } from "./article-archive";
import { BlogLibrary } from "./library";
import { ReadingPath } from "./reading-path";
import type { ChainFilter } from "./library-model";

export type BlogSearchParams = Record<string, string | string[] | undefined>;
const single = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

export function BlogLibraryPage({ chain, searchParams = {} }: { chain: ChainFilter; searchParams?: BlogSearchParams }) {
  const alternateArticles = mediumArticles.filter((article) => chain === "all" || article.chain === chain);
  return (
    <main className="blog-page">
      <SiteHeader active={chain === "all" ? "blogs" : `blogs-${chain.toLowerCase()}`} />
      <div className="blog-shell">
        <header className="blog-heading">
          <div>
            <p className="blog-byline">Writing by Andrey Obruchkov</p>
            <h1>{chain === "all" ? "Blogs" : `${chain} blogs`}</h1>
            <p>{chain === "Hyperliquid" ? "The series begins with HyperCore, HyperEVM, and how the exchange fits together. Part 1 is available now." : chain === "Solana" ? "From accounts and transactions to token extensions and the way programs handle data." : chain === "EVM" ? "From bytecode and calldata to signatures, transactions, and contract architecture." : "Deep dives into blockchain internals. Choose a chain to follow a series, or find a question in the archive."}</p>
          </div>
          <a className="blog-publication" href="https://andreyobruchkov1996.substack.com" target="_blank" rel="noreferrer">Follow on Substack <span aria-hidden="true">↗</span></a>
        </header>
        <BlogLibrary articles={substackArticles} chain={chain} introduction={chain === "all" ? undefined : <ReadingPath chain={chain} articles={substackArticles} />} initialQuery={single(searchParams.q)} initialTopic={single(searchParams.topic)} initialSort={single(searchParams.sort)} />
        {alternateArticles.length > 0 && <details className="blog-medium">
          <summary>Prefer reading on Medium? <span>{alternateArticles.length} articles available</span></summary>
          <ArticleArchive articles={alternateArticles} />
          <a className="text-link" href="https://medium.com/@andrey_obruchkov" target="_blank" rel="noreferrer">Visit my Medium profile ↗</a>
        </details>}
      </div>
      <SiteFooter />
    </main>
  );
}
