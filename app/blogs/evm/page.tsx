import type { Metadata } from "next";
import { evmMediumArticles, evmSubstackArticles } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-shell";
import { ArticleArchive } from "../article-archive";

export const metadata: Metadata = {
  title: "EVM Writing | 0xByteBeetle",
  description:
    "37 EVM deep dives by Andrey Obruchkov, from transaction encoding and execution to tokens, proxies, RPC behavior, and protocol architecture.",
};

export default function EvmBlogsPage() {
  return (
    <main>
      <SiteHeader active="blogs-evm" />
      <section className="page-hero writing-hero">
        <p className="eyebrow">EVM writing</p>
        <h1>Following Ethereum from encoded bytes to protocol behavior.</h1>
        <p>
          These articles move through transactions, calldata, execution, storage, gas,
          contracts, token standards, RPCs, and the architectural decisions built on top
          of them. The examples beside each article live in one checked repository.
        </p>
        <div className="publication-links">
          <a href="/blogs">All writing</a>
          <a href="/blogs/solana">Solana writing</a>
          <a href="https://github.com/0xByteBeetle/blog-solutions/tree/main/evm" target="_blank" rel="noreferrer">
            EVM companion code ↗
          </a>
        </div>
      </section>

      <section className="article-library" id="archive">
        <div className="library-intro">
          <p className="eyebrow">37 EVM articles</p>
          <h2>The complete EVM archive.</h2>
          <p>
            Read the article for the explanation, then open its code map to find the
            exact runnable project, command, and verification boundary behind it.
          </p>
        </div>
        <ArticleArchive articles={evmSubstackArticles} />
      </section>

      <section className="article-library medium-library">
        <div className="library-intro">
          <p className="eyebrow">Also on Medium</p>
          <h2>EVM cross-publications.</h2>
          <p>
            These pieces are available on Medium for readers who prefer that platform.
          </p>
        </div>
        <ArticleArchive articles={evmMediumArticles} />
      </section>
      <SiteFooter />
    </main>
  );
}
