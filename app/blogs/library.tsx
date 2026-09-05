"use client";

import { useEffect, useState } from "react";
import type { Article } from "../content";
import { selectArticles, topicOptions, type ChainFilter, type SortOrder } from "./library-model";

const PAGE_SIZE = 12;
const chains = [
  { label: "All articles", value: "all", href: "/blogs" },
  { label: "EVM", value: "EVM", href: "/blogs/evm" },
  { label: "Solana", value: "Solana", href: "/blogs/solana" },
] as const;

export function BlogLibrary({ articles, chain, initialQuery, initialTopic, initialSort }: {
  articles: Article[]; chain: ChainFilter; initialQuery: string; initialTopic: string; initialSort: string;
}) {
  const scopedArticles = articles.filter((article) => chain === "all" || article.chain === chain);
  const topics = topicOptions(scopedArticles);
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState(topics.some((item) => item.label === initialTopic) ? initialTopic : "");
  const [sort, setSort] = useState<SortOrder>(initialSort === "oldest" || initialSort === "title" ? initialSort : "newest");
  const [visibleCounts, setVisibleCounts] = useState({ EVM: chain === "all" ? 4 : PAGE_SIZE, Solana: chain === "all" ? 4 : PAGE_SIZE });
  function resetVisible() { setVisibleCounts({ EVM: chain === "all" ? 4 : PAGE_SIZE, Solana: chain === "all" ? 4 : PAGE_SIZE }); }
  const results = selectArticles(scopedArticles, query, topic, sort);
  const groups = (["EVM", "Solana"] as const).filter((value) => chain === "all" || chain === value).map((value) => ({
    chain: value,
    articles: results.filter((article) => article.chain === value),
  }));
  const filtersActive = Boolean(query || topic);

  // A copied URL or refresh restores the current filters, without a history
  // entry for every keystroke.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    if (topic) url.searchParams.set("topic", topic);
    else url.searchParams.delete("topic");
    if (sort !== "newest") url.searchParams.set("sort", sort);
    else url.searchParams.delete("sort");
    window.history.replaceState(window.history.state, "", url);
  }, [query, topic, sort]);

  function clearFilters() { setQuery(""); setTopic(""); resetVisible(); }
  function chainHref(href: string) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sort !== "newest") params.set("sort", sort);
    return `${href}${params.size ? `?${params}` : ""}`;
  }

  return (
    <section className="blog-library" aria-label="Article library">
      <nav className="blog-chain-navigation" aria-label="Blog categories">
        <div className="blog-chain-choices">
          {chains.filter((item) => item.value !== "all").map((item) => (
            <a key={item.value} className={`blog-chain-choice blog-chain-choice-${item.value.toLowerCase()}`} href={chainHref(item.href)} aria-current={chain === item.value ? "page" : undefined}>
              <strong>{item.label}<span aria-hidden="true">↗</span></strong>
              <span>{articles.filter((article) => article.chain === item.value).length} articles</span>
            </a>
          ))}
        </div>
        <a className="blog-all-link" href={chainHref("/blogs")} aria-current={chain === "all" ? "page" : undefined}>All articles <span>{articles.length}</span></a>
      </nav>
      <div className="blog-tools">
        <div className="blog-search">
          <label className="blog-sr-only" htmlFor="article-search">Search articles</label>
          <div className="blog-search-field">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input id="article-search" type="search" placeholder={chain === "all" ? "Search all articles…" : `Search ${chain} articles…`} value={query} onChange={(event) => { setQuery(event.target.value); resetVisible(); }} />
            {query && <button className="blog-clear-search" type="button" onClick={() => { setQuery(""); resetVisible(); }} aria-label="Clear search">×</button>}
          </div>
        </div>
        <details className="blog-refine" open={topic ? true : undefined}>
          <summary>{topic ? "Topic selected" : "Filter by topic"}</summary>
          <div className="blog-topic-select">
          <label htmlFor="article-topic">Topic</label>
          <select id="article-topic" value={topic} onChange={(event) => { setTopic(event.target.value); resetVisible(); }}>
            <option value="">All topics</option>
            {topics.map((item) => <option key={item.label} value={item.label}>{item.label} ({item.count})</option>)}
          </select>
          </div>
        </details>
        <div className="blog-sort">
          <label className="blog-sr-only" htmlFor="article-sort">Sort by</label>
          <select id="article-sort" value={sort} onChange={(event) => { setSort(event.target.value as SortOrder); resetVisible(); }}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>
      <div className="blog-results-heading">
        <h2>{topic || (query ? "Search results" : "All articles")}</h2>
        <div className="blog-result-status">
          <span role="status" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"}{query && ` matching “${query}”`}</span>
          {filtersActive && <button type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
      </div>
      {results.length ? (
        <div className={`blog-chain-groups ${chain === "all" ? "blog-chain-groups-both" : ""}`}>
          {groups.map((group) => (
            <section key={group.chain} className={`blog-chain-group blog-chain-group-${group.chain.toLowerCase()}`} aria-labelledby={`heading-${group.chain}`}>
              <header className="blog-group-heading">
                <h2 id={`heading-${group.chain}`}>{group.chain}</h2>
                <span>{group.articles.length} {group.articles.length === 1 ? "article" : "articles"}</span>
              </header>
              {group.articles.length === 0 && <p className="blog-group-empty">No {group.chain} articles match this search.</p>}
              <ul className="blog-results">
          {group.articles.slice(0, visibleCounts[group.chain]).map((article) => (
            <li key={article.href}>
              <article className="blog-entry">
                <h3><a href={article.href} target="_blank" rel="noreferrer">{article.title}<span className="blog-title-arrow" aria-hidden="true">↗</span><span className="blog-sr-only"> (opens on Substack in a new tab)</span></a></h3>
                <div className="blog-entry-bottom">
                  <span className="blog-entry-date">{article.date}</span>
                  {article.solutionHref && <a className="blog-code-link" href={article.solutionHref} target="_blank" rel="noreferrer" aria-label={`View example code for ${article.title} on GitHub (opens in a new tab)`}><span aria-hidden="true">&lt;/&gt;</span> Example code <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            </li>
          ))}
              </ul>
              {group.articles.length > visibleCounts[group.chain] && <button type="button" className="blog-group-more" onClick={() => setVisibleCounts((counts) => ({ ...counts, [group.chain]: counts[group.chain] + (chain === "all" ? 4 : PAGE_SIZE) }))}>More {group.chain} articles <span aria-hidden="true">↓</span></button>}
            </section>
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <h3>No articles found</h3>
          <p>Try another keyword or clear the topic filter.</p>
          <button type="button" className="button button-primary" onClick={clearFilters}>Show all {chain === "all" ? "" : `${chain} `}articles</button>
        </div>
      )}
      <noscript><p>Search and filters require JavaScript. Browse the complete archive on <a href="https://andreyobruchkov1996.substack.com/archive">Substack</a>.</p></noscript>
    </section>
  );
}
