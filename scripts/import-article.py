"""Convert a public article snapshot on stdin to inert, allowlisted content JSON.

No network access or writes. The source snapshot is retained separately so an
import can be reproduced and checked against the original text and code.
"""
import json
import re
import sys
from html.parser import HTMLParser


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"tag": "root", "attrs": {}, "children": []}
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = {"tag": tag, "attrs": dict(attrs), "children": []}
        self.stack[-1]["children"].append(node)
        if tag not in {"img", "source", "br", "hr", "input", "meta", "link"}:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index]["tag"] == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        self.stack[-1]["children"].append(data)


def text(node):
    return node if isinstance(node, str) else "".join(map(text, node["children"]))


def descendants(node, tag):
    if isinstance(node, str):
        return []
    return ([node] if node["tag"] == tag else []) + [item for child in node["children"] for item in descendants(child, tag)]


def import_article(source):
    parser = Parser()
    parser.feed(source["html"])
    headings = []
    images = []
    code_blocks = []

    def convert(node):
        if isinstance(node, str):
            return [node]
        tag, attrs = node["tag"], node["attrs"]
        if tag in {"button", "svg", "script", "style", "iframe", "source", "hr"}:
            return []
        if tag == "pre":
            codes = descendants(node, "code")
            language = codes[0]["attrs"].get("class", "").replace("language-", "") if codes else "text"
            # The published JSON example contains a comment; preserve it verbatim.
            language = "jsonc" if language == "json" and "//" in text(node) else language
            block = {"type": "codeblock", "language": language, "text": text(node)}
            code_blocks.append(block["text"])
            return [block]
        if tag == "img":
            original = json.loads(attrs.get("data-attrs", "{}"))
            src = original.get("src", attrs.get("src", ""))
            if not src.startswith("https://substack-post-media.s3.amazonaws.com/public/images/"):
                raise ValueError("Unexpected image source")
            image = {"type": "image", "src": "/articles/hyperliquid-part-1/" + src.rsplit("/", 1)[-1], "sourceSrc": src,
                     "alt": attrs.get("alt", ""), "width": int(attrs["width"]), "height": int(attrs["height"])}
            images.append(image)
            return [image]
        children = [item for child in node["children"] for item in convert(child)]
        if tag in {"h2", "h3", "h4"}:
            title = text(node)
            identifier = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
            # The original mixes h2 and h3 for peer sections. Normalize semantics,
            # preserving the heading wording and the h4 subsection relationship.
            level = 3 if tag == "h4" else 2
            headings.append({"id": identifier, "title": title, "level": level})
            return [{"type": "h" + str(level), "id": identifier, "children": children}]
        if tag == "a":
            if descendants(node, "img"):
                return children
            href = attrs.get("href", "")
            if not href.startswith(("https://", "http://", "#")):
                raise ValueError("Unexpected link protocol")
            return [{"type": "a", "href": href, "children": children}]
        if tag in {"p", "em", "strong", "ul", "ol", "li", "figure", "figcaption", "blockquote", "code", "br"}:
            return [{"type": tag, "children": children}]
        return children

    body = convert(parser.root)
    return {"title": source["title"], "sourceUrl": source["url"], "publishedAt": source["publishedAt"],
            "headings": headings, "body": body, "imageCount": len(images), "codeBlockCount": len(code_blocks)}


if __name__ == "__main__":
    print(json.dumps(import_article(json.load(sys.stdin)), ensure_ascii=False, indent=2))
