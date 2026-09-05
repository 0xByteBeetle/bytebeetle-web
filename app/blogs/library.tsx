"use client";

import { useEffect, useRef, useState } from "react";
import type { Article } from "../content";
import { chainOptions, paginateArticles, selectArticles, topicOptions, type ChainFilter, type SortOrder } from "./library-model";

const PAGE_SIZE = 12;
export function BlogLibrary({ articles, chain, initialQuery, initialTopic, initialSort, initialPage }: {
  articles: Article[]; chain: ChainFilter; initialQuery: string; initialTopic: string; initialSort: string; initialPage: number;
}) {
  const chains = chainOptions(articles);
  const activeChainLink = useRef<HTMLAnchorElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const scopedArticles = articles.filter((article) => chain === "all" || article.chain === chain);
  const topics = topicOptions(scopedArticles);
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState(topics.some((item) => item.label === initialTopic) ? initialTopic : "");
  const [sort, setSort] = useState<SortOrder>(initialSort === "oldest" || initialSort === "title" ? initialSort : "newest");
  const [requestedPage, setRequestedPage] = useState(initialPage);
  function resetVisible() { setRequestedPage(1); }
  const results = selectArticles(scopedArticles, query, topic, sort);
  const pagination = paginateArticles(results, requestedPage, PAGE_SIZE);
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
    if (pagination.page > 1) url.searchParams.set("page", String(pagination.page));
    else url.searchParams.delete("page");
    window.history.replaceState(window.history.state, "", url);
  }, [query, topic, sort, pagination.page]);

  useEffect(() => {
    // Keep the selected tab visible when the category row overflows.
    const link = activeChainLink.current;
    if (link?.parentElement) link.parentElement.scrollLeft = Math.max(0, link.offsetLeft - link.parentElement.offsetLeft - 16);
  }, [chain]);

  function goToPage(page: number) {
    setRequestedPage(page);
    resultsHeading.current?.focus({ preventScroll: true });
    resultsHeading.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

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
        <span className="blog-chain-label">Explore by chain</span>
        <div className="blog-chain-tabs">
          <a href={chainHref("/blogs")} ref={chain === "all" ? activeChainLink : undefined} aria-current={chain === "all" ? "page" : undefined}>All articles <span>{articles.length}</span></a>
          {chains.map((item) => <a key={item.slug} ref={chain === item.label ? activeChainLink : undefined} href={chainHref(`/blogs/${item.slug}`)} aria-current={chain === item.label ? "page" : undefined}>{item.label}<span>{item.count}</span></a>)}
        </div>
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
        <h2 ref={resultsHeading} tabIndex={-1}>{topic || (query ? "Search results" : chain === "all" ? "All articles" : `${chain} articles`)}</h2>
        <div className="blog-result-status">
          <span role="status" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"}{query && ` matching “${query}”`}</span>
          {filtersActive && <button type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
      </div>
      {results.length ? (
        <ul className="blog-results">
          {pagination.articles.map((article) => (
            <li key={article.href}>
              <article className="blog-entry">
                <span className="blog-chain-badge">{article.chain}</span>
                <div className="blog-entry-copy">
                <h3><a href={article.href} target="_blank" rel="noreferrer">{article.title}<span className="blog-title-arrow" aria-hidden="true">↗</span><span className="blog-sr-only"> (opens on Substack in a new tab)</span></a></h3>
                <div className="blog-entry-bottom">
                  <span className="blog-entry-date">{article.date}</span>
                  {article.solutionHref && <a className="blog-code-link" href={article.solutionHref} target="_blank" rel="noreferrer" aria-label={`View example code for ${article.title} on GitHub (opens in a new tab)`}><span aria-hidden="true">&lt;/&gt;</span> Example code <span aria-hidden="true">↗</span></a>}
                </div>
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
      {results.length > 0 && <nav className="blog-page-controls" aria-label="Article pages">
        <button type="button" disabled={pagination.page === 1} onClick={() => goToPage(pagination.page - 1)}>← Previous</button>
        <span aria-live="polite">Page {pagination.page} of {pagination.pages}</span>
        <button type="button" disabled={pagination.page === pagination.pages} onClick={() => goToPage(pagination.page + 1)}>Next →</button>
      </nav>}
      <noscript><p>Search and filters require JavaScript. Browse the complete archive on <a href="https://andreyobruchkov1996.substack.com/archive">Substack</a>.</p></noscript>
    </section>
  );
}
