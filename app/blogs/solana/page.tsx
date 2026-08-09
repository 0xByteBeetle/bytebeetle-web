import type { Metadata } from "next";
import { solanaMediumArticles, solanaSubstackArticles } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-shell";
import { ArticleArchive } from "../article-archive";

export const metadata: Metadata = {
  title: "Solana Writing | 0xByteBeetle",
  description:
    "16 Solana deep dives by Andrey Obruchkov, covering accounts, messages, serialization, PDAs, Token-2022, metadata, and runtime behavior.",
};

export default function SolanaBlogsPage() {
  return (
    <main>
      <SiteHeader active="blogs-solana" />
      <section className="page-hero writing-hero">
        <p className="eyebrow">Solana writing</p>
        <h1>Following accounts, messages, programs, and token extensions.</h1>
        <p>
          This archive traces Solana from its account model and transaction format into
          Anchor, Borsh, PDAs, zero-copy layouts, metadata, Token-2022, and the runtime
          behavior that connects them.
        </p>
        <div className="publication-links">
          <a href="/blogs">All writing</a>
          <a href="/blogs/evm">EVM writing</a>
          <a href="https://github.com/0xByteBeetle/blog-solutions/tree/main/solana" target="_blank" rel="noreferrer">
            Solana companion code ↗
          </a>
        </div>
      </section>

      <section className="article-library" id="archive">
        <div className="library-intro">
          <p className="eyebrow">16 Solana articles</p>
          <h2>The complete Solana archive.</h2>
          <p>
            Every article links directly to its code map. Deterministic examples are
            tested locally, and network-dependent limits are described without invented
            output.
          </p>
        </div>
        <ArticleArchive articles={solanaSubstackArticles} />
      </section>

      <section className="article-library medium-library">
        <div className="library-intro">
          <p className="eyebrow">Also on Medium</p>
          <h2>Solana cross-publications.</h2>
          <p>
            These pieces are available on Medium for readers who prefer that platform.
          </p>
        </div>
        <ArticleArchive articles={solanaMediumArticles} />
      </section>
      <SiteFooter />
    </main>
  );
}
