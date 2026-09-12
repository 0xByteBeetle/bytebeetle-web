"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Article } from "../content";
import { ecosystems } from "../ecosystems";
import { articlePublicationDate, articleTopic, selectArticles, topicOptions, type ChainFilter, type SortOrder } from "./library-model";
import { articleSeriesPosition } from "../reading-paths";
import { SeriesDirectory } from "./series-directory";

const PAGE_SIZE = 12;
const chains = [
  { label: "All articles", value: "all", href: "/blogs" },
  ...ecosystems.map(item => ({ ...item, value: item.label })),
] as const;

export function BlogLibrary({ articles, chain, introduction, initialQuery, initialTopic, initialSort, initialView = "" }: {
  articles: Article[]; chain: ChainFilter; introduction?: ReactNode; initialQuery: string; initialTopic: string; initialSort: string; initialView?: string;
}) {
  const combined = chain === "all";
  // Preserve old sort URLs as archive views. Explicit series links omit sort.
  const view = initialView === "latest" || (!initialView && ["oldest", "title"].includes(initialSort)) ? "latest" : "series";
  const scopedArticles = articles.filter((article) => chain === "all" || article.chain === chain);
  const topics = topicOptions(scopedArticles);
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState(topics.some((item) => item.label === initialTopic) ? initialTopic : "");
  const [sort, setSort] = useState<SortOrder>(combined && view === "series" ? "newest" : initialSort === "oldest" || initialSort === "title" ? initialSort : "newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filtersActive = Boolean(query || topic);
  const showSeries = combined && view === "series" && !filtersActive;
  const resultSource = showSeries ? scopedArticles.filter(article => !articleSeriesPosition(article)) : scopedArticles;
  const results = selectArticles(resultSource, query, topic, sort);
  const visible = results.slice(0, visibleCount);
  const showTools = scopedArticles.length > 1 || filtersActive || sort !== "newest";
  const showArchiveFilters = !combined || view === "latest";

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
    if (combined && view === "latest") url.searchParams.set("view", "latest");
    else if (combined) url.searchParams.delete("view");
    window.history.replaceState(window.history.state, "", url);
  }, [query, topic, sort, combined, view]);

  function clearFilters() { setQuery(""); setTopic(""); setVisibleCount(PAGE_SIZE); }
  function chainHref(href: string) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sort !== "newest") params.set("sort", sort);
    return `${href}${params.size ? `?${params}` : ""}`;
  }

  function viewHref(next: "series" | "latest") {
    const params = new URLSearchParams();
    if (next === "latest") params.set("view", "latest");
    if (query) params.set("q", query);
    if (topic) params.set("topic", topic);
    if (next === "latest" && sort !== "newest") params.set("sort", sort);
    return `/blogs${params.size ? `?${params}` : ""}`;
  }

  return (
    <section className={combined ? "blog-library combined-library" : "blog-library"} aria-label="Article library">
      <nav className="blog-tabs" aria-label="Blog categories">
        {chains.map((item) => (
          <a key={item.value} href={chainHref(item.href)} aria-current={chain === item.value ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      {!filtersActive && sort === "newest" && introduction}
      {combined && <nav className="blog-view-switch" aria-label="Article views">
        <a href={viewHref("series")} aria-current={view === "series" ? "page" : undefined}>Browse series</a>
        <a href={viewHref("latest")} aria-current={view === "latest" ? "page" : undefined}>Latest articles</a>
      </nav>}
      {showTools && <div className={`blog-tools${combined && !showArchiveFilters ? " blog-tools-search-only" : ""}`}>
        <div className="blog-search">
          <label htmlFor="article-search">Search articles</label>
          <div className="blog-search-field">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input id="article-search" type="search" placeholder={ecosystems.find(item => item.label === chain)?.searchHint ?? "Search by title, ecosystem, or topic"} value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} />
            {query && <button className="blog-clear-search" type="button" onClick={() => { setQuery(""); setVisibleCount(PAGE_SIZE); }} aria-label="Clear search">×</button>}
          </div>
        </div>
        {showArchiveFilters && <div className="blog-topic-select">
          <label htmlFor="article-topic">Topic</label>
          <select id="article-topic" value={topic} onChange={(event) => { setTopic(event.target.value); setVisibleCount(PAGE_SIZE); }}>
            <option value="">All topics</option>
            {topics.map((item) => <option key={item.label} value={item.label}>{item.label} ({item.count})</option>)}
          </select>
        </div>}
        {showArchiveFilters && <div className="blog-sort">
          <label htmlFor="article-sort">Sort by</label>
          <select id="article-sort" value={sort} onChange={(event) => { setSort(event.target.value as SortOrder); setVisibleCount(PAGE_SIZE); }}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>}
      </div>}
      {showSeries && <SeriesDirectory articles={articles} />}
      <div className="blog-results-heading">
        <h2>{query ? "Search results" : topic || (showSeries ? "Individual deep dives" : combined ? (sort === "oldest" ? "Oldest first" : sort === "title" ? "Articles A–Z" : "Latest articles") : scopedArticles.length === 1 ? "Start here" : "All articles")}</h2>
        <div className="blog-result-status">
          {showTools && <span role="status" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"}{query && ` matching “${query}”`}</span>}
          {filtersActive && <button type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
      </div>
      {showSeries && <p className="standalone-note">Explore these individually, or search for a specific question. Listed by publication date, newest first.</p>}
      {results.length ? (
        <ul className="blog-results">
          {visible.map((article) => {
            const position = combined ? articleSeriesPosition(article) : undefined;
            const first = position ? articles.find(item => item.slug === position.series.slugs[0]) : undefined;
            return (
            <li key={article.href}>
              <article className="blog-entry">
                <div className="blog-entry-meta"><span>{article.chain}</span><span>{articleTopic(article)}</span>{position && <span className="article-series-position">Part {position.part}{!position.series.openEnded && ` of ${position.total}`}</span>}</div>
                <h3><a href={article.localHref ?? article.href} target={article.localHref ? undefined : "_blank"} rel={article.localHref ? undefined : "noreferrer"}>{article.title}<span className="blog-title-arrow" aria-hidden="true">{article.localHref ? "→" : "↗"}</span>{!article.localHref && <span className="blog-sr-only"> (opens on Substack in a new tab)</span>}</a></h3>
                {article.description && <p className="blog-entry-description">{article.description}</p>}
                <div className="blog-entry-bottom">
                  {combined ? <time className="blog-entry-date" dateTime={article.publishedAt}>{articlePublicationDate(article)}</time> : <span className="blog-entry-date">{article.date}</span>}
                  {first && position && position.part > 1 && <a className="article-start-series" href={first.localHref ?? first.href} target={first.localHref ? undefined : "_blank"} rel={first.localHref ? undefined : "noreferrer"} aria-label={`Start ${position.series.title} with Part 1${first.localHref ? "" : " on Substack (opens in a new tab)"}`}>Start series {first.localHref ? "→" : "↗"}</a>}
                  {article.solutionHref && <a className="blog-code-link" href={article.solutionHref} target="_blank" rel="noreferrer" aria-label={`View ${article.codeUpdated ? "updated example" : "article resources"} for ${article.title} on GitHub (opens in a new tab)`}>{article.codeUpdated ? "Updated example" : "Article resources"} <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            </li>
          );})}
        </ul>
      ) : (
        <div className="blog-empty">
          <h3>No articles found</h3>
          <p>Try another keyword or clear the topic filter.</p>
          <button type="button" className="button button-primary" onClick={clearFilters}>Show all {chain === "all" ? "" : `${chain} `}articles</button>
        </div>
      )}
      {results.length > PAGE_SIZE && <div className="blog-pagination">
        <p>Showing {visible.length} of {results.length} articles</p>
        {visible.length < results.length && <button type="button" className="button button-secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show {Math.min(PAGE_SIZE, results.length - visible.length)} more articles <span aria-hidden="true">↓</span></button>}
      </div>}
      {showTools && <noscript><p>Search and filters require JavaScript. Browse the complete archive on <a href="https://andreyobruchkov1996.substack.com/archive">Substack</a>.</p></noscript>}
    </section>
  );
}
