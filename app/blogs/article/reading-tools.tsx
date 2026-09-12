"use client";

import { useRef, useState } from "react";

export function CodeBlock({ text, language }: { text: string; language: string }) {
  const [status, setStatus] = useState("");
  const code = useRef<HTMLElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      const selection = window.getSelection();
      if (selection && code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("Code selected. Copy with your keyboard.");
    }
  }
  return <div className="reading-code">
    <div className="reading-code-toolbar">
      <span>{language === "rust" ? "Rust" : language === "jsonc" ? "JSON with comments" : language}</span>
      <span className="reading-copy-status" role="status">{status}</span>
      <button type="button" onClick={copy} aria-label={`Copy ${language} code`}>Copy code</button>
    </div>
    <pre tabIndex={0} aria-label={`${language} code example`}><code ref={code}>{text}</code></pre>
  </div>;
}

export function ArticleImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <div className={`reading-image${height > width ? " reading-image-portrait" : ""}`}>
    <button type="button" className="reading-image-open" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge image: ${alt}`}>
      {/* Original article assets, copied without modification. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <span className="reading-image-hint" aria-hidden="true">View larger ↗</span>
    </button>
    <dialog className="reading-image-dialog" ref={dialog} aria-label={alt} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="reading-image-expanded">
        <button type="button" onClick={() => dialog.current?.close()} autoFocus>Close image ×</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </div>
    </dialog>
  </div>;
}
