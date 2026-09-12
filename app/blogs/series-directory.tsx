import type { Article } from "../content";
import { articleSeries, resolveSeries } from "../reading-paths";

export function SeriesDirectory({ articles }: { articles: Article[] }) {
  return (
    <section className="series-directory" aria-labelledby="series-directory-title">
      <h2 id="series-directory-title">Follow a series</h2>
      <p className="series-directory-note">Begin with Part 1, then follow the numbered articles. Individual deep dives are below.</p>
      <div className="series-rows">
        {articleSeries.map(series => {
          const parts = resolveSeries(series, articles);
          const first = parts[0];
          return (
            <article className="series-row" id={`series-${series.id}`} key={series.id}>
              <details className="series-disclosure">
                <summary>
                  <span className="series-summary-copy">
                    <span className="series-chain">{series.chain}</span>
                    <span className="series-name">{series.title}</span>
                    <span className="series-description">{series.introduction}</span>
                    <span className="series-expand">{parts.length === 1 ? "View published article" : "View reading order"}</span>
                  </span>
                  <span className="series-chevron" aria-hidden="true">↓</span>
                </summary>
                <ol className="series-parts" aria-label={`${series.title} reading order`}>
                  {parts.map((article, index) => (
                    <li key={article.href}>
                      <span className="series-part">Part {index + 1}</span>
                      <div>
                        <a href={article.localHref ?? article.href} target={article.localHref ? undefined : "_blank"} rel={article.localHref ? undefined : "noreferrer"}>{article.title} <span aria-hidden="true">{article.localHref ? "→" : "↗"}</span>{!article.localHref && <span className="blog-sr-only"> (opens on Substack in a new tab)</span>}</a>
                        <p>{article.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </details>
              <a className="series-start" href={first.localHref ?? first.href} target={first.localHref ? undefined : "_blank"} rel={first.localHref ? undefined : "noreferrer"} aria-label={`Start ${series.title} with Part 1${first.localHref ? "" : " on Substack (opens in a new tab)"}`}>Start with Part 1 <span aria-hidden="true">{first.localHref ? "→" : "↗"}</span></a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
