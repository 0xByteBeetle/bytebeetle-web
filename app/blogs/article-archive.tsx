import type { Article } from "../content";

export function ArticleArchive({ articles }: { articles: Article[] }) {
  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <article className="article-row" key={article.href}>
          <span className="article-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="article-row-copy">
            <span className="topic-label">{article.topic}</span>
            <h3>
              <a href={article.href} target="_blank" rel="noreferrer">
                {article.title}
              </a>
            </h3>
          </div>
          <span className="article-date">{article.date}</span>
          <div className="article-row-links">
            <a href={article.href} target="_blank" rel="noreferrer">
              Read ↗
            </a>
            {article.solutionHref ? (
              <a href={article.solutionHref} target="_blank" rel="noreferrer">
                Code ↗
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
