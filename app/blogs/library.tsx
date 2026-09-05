"use client";

import { useEffect, useState } from "react";
import type { Article } from "../content";
import { articleTopic, selectArticles, topicOptions, type ChainFilter, type SortOrder } from "./library-model";

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const results = selectArticles(scopedArticles, query, topic, sort);
  const visible = results.slice(0, visibleCount);
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

  function clearFilters() { setQuery(""); setTopic(""); setVisibleCount(PAGE_SIZE); }
  function chainHref(href: string) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sort !== "newest") params.set("sort", sort);
    return `${href}${params.size ? `?${params}` : ""}`;
  }

  return (
    <section className="blog-library" aria-label="Article library">
      <nav className="blog-tabs" aria-label="Blog categories">
        {chains.map((item) => (
          <a key={item.value} href={chainHref(item.href)} aria-current={chain === item.value ? "page" : undefined}>
            {item.label}<span>{articles.filter((article) => item.value === "all" || article.chain === item.value).length}</span>
          </a>
        ))}
      </nav>
      <div className="blog-tools">
        <div className="blog-search">
          <label htmlFor="article-search">Search articles</label>
          <div className="blog-search-field">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input id="article-search" type="search" placeholder="Try calldata, proxies, or Token-2022" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} />
            {query && <button className="blog-clear-search" type="button" onClick={() => { setQuery(""); setVisibleCount(PAGE_SIZE); }} aria-label="Clear search">×</button>}
          </div>
        </div>
        <div className="blog-topic-select">
          <label htmlFor="article-topic">Topic</label>
          <select id="article-topic" value={topic} onChange={(event) => { setTopic(event.target.value); setVisibleCount(PAGE_SIZE); }}>
            <option value="">All topics</option>
            {topics.map((item) => <option key={item.label} value={item.label}>{item.label} ({item.count})</option>)}
          </select>
        </div>
        <div className="blog-sort">
          <label htmlFor="article-sort">Sort by</label>
          <select id="article-sort" value={sort} onChange={(event) => { setSort(event.target.value as SortOrder); setVisibleCount(PAGE_SIZE); }}>
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
        <ul className="blog-results">
          {visible.map((article) => (
            <li key={article.href}>
              <article className="blog-entry">
                <div className="blog-entry-meta"><span>{article.chain}</span><span>{articleTopic(article)}</span></div>
                <h3><a href={article.href} target="_blank" rel="noreferrer">{article.title}<span className="blog-title-arrow" aria-hidden="true">↗</span><span className="blog-sr-only"> (opens on Substack in a new tab)</span></a></h3>
                <div className="blog-entry-bottom">
                  <span className="blog-entry-date">{article.date}</span>
                  {article.solutionHref && <a className="blog-code-link" href={article.solutionHref} target="_blank" rel="noreferrer" aria-label={`View example code for ${article.title} on GitHub (opens in a new tab)`}><span aria-hidden="true">&lt;/&gt;</span> Example code <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="blog-empty">
          <h3>No articles found</h3>
          <p>Try another keyword or clear the topic filter.</p>
          <button type="button" className="button button-primary" onClick={clearFilters}>Show all {chain === "all" ? "" : `${chain} `}articles</button>
        </div>
      )}
      {results.length > 0 && <div className="blog-pagination">
        <p>Showing {visible.length} of {results.length} articles</p>
        {visible.length < results.length && <button type="button" className="button button-secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show {Math.min(PAGE_SIZE, results.length - visible.length)} more articles <span aria-hidden="true">↓</span></button>}
      </div>}
      <noscript><p>Search and filters require JavaScript. Browse the complete archive on <a href="https://andreyobruchkov1996.substack.com/archive">Substack</a>.</p></noscript>
    </section>
  );
}
