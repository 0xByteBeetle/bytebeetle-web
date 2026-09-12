import type { Article } from "../content";
import type { Ecosystem } from "../ecosystems";
import { readingPathArticles, readingPaths } from "../reading-paths";

export function ReadingPath({ chain, articles }: { chain: Ecosystem; articles: Article[] }) {
  const path = readingPaths[chain];
  const ordered = readingPathArticles(chain, articles);
  // A one-post collection already has a single, clear starting point.
  if (ordered.length < 2) return null;
  const first = ordered[0];
  return (
    <section className="reading-path" aria-labelledby="reading-path-title">
      <div className="reading-path-intro">
        <p className="eyebrow">Start here</p>
        <h2 id="reading-path-title">{path.title}</h2>
        <p>{path.introduction}</p>
        <a className="text-link" href={first.localHref ?? first.href} target={first.localHref ? undefined : "_blank"} rel={first.localHref ? undefined : "noreferrer"}>Read Part 1 <span aria-hidden="true">{first.localHref ? "→" : "↗"}</span>{!first.localHref && <span className="blog-sr-only"> on Substack (opens in a new tab)</span>}</a>
      </div>
      <details className="reading-order">
        <summary>See the reading order <span aria-hidden="true">↓</span></summary>
        <ol>
          {ordered.map((article, index) => (
            <li key={article.href}>
              <span className="reading-part">Part {index + 1}</span>
              <div>
                <a href={article.localHref ?? article.href} target={article.localHref ? undefined : "_blank"} rel={article.localHref ? undefined : "noreferrer"}>{article.title} <span aria-hidden="true">{article.localHref ? "→" : "↗"}</span>{!article.localHref && <span className="blog-sr-only"> (opens on Substack in a new tab)</span>}</a>
                <p>{article.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
