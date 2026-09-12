import { createElement, type ReactNode } from "react";
import { ArticleImage, CodeBlock } from "./reading-tools";

export type ContentNode = string | {
  type: string;
  children?: ContentNode[];
  id?: string;
  href?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  language?: string;
  text?: string;
};

// Only text and this explicit set of elements can be rendered from an import.
// Article HTML is never executed and cannot supply event handlers or embeds.
const elements = new Set(["p", "em", "strong", "ul", "ol", "li", "figure", "figcaption", "blockquote", "code", "br", "h2", "h3"]);

export function ArticleContent({ nodes, imageDescriptions }: { nodes: ContentNode[]; imageDescriptions: Record<string, string> }) {
  function render(node: ContentNode, key: number): ReactNode {
    if (typeof node === "string") return node;
    const children = node.children?.map(render);
    if (node.type === "codeblock") return <CodeBlock key={key} text={node.text ?? ""} language={node.language ?? "text"} />;
    if (node.type === "image" && node.src?.startsWith("/articles/")) return <ArticleImage key={key} src={node.src} alt={node.alt || imageDescriptions[node.src] || "Article illustration"} width={node.width ?? 800} height={node.height ?? 600} />;
    if (node.type === "a" && /^(https?:\/\/|#)/.test(node.href ?? "")) return <a key={key} href={node.href}>{children}</a>;
    if (elements.has(node.type)) return createElement(node.type, { key, ...(node.id ? { id: node.id } : {}) }, children);
    return null;
  }
  return <div className="reading-body" data-article-body>{nodes.map(render)}</div>;
}
