import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const source = JSON.parse(await readFile(new URL("../content/sources/hyperliquid-part-1.json", import.meta.url), "utf8"));
const article = JSON.parse(await readFile(new URL("../content/articles/hyperliquid-part-1.json", import.meta.url), "utf8"));
const flatten = nodes => nodes.flatMap(node => typeof node === "string" ? [] : [node, ...flatten(node.children ?? [])]);
const nodes = flatten(article.body);

test("the pilot is reproducible from the untouched public source snapshot", () => {
  const result = spawnSync("python3", ["scripts/import-article.py"], { input: JSON.stringify(source), encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), article);
});

test("all source prose and code are retained, with no hidden source controls", () => {
  const script = `import json,sys\nfrom html.parser import HTMLParser\nclass P(HTMLParser):\n def __init__(self):\n  super().__init__(convert_charrefs=True);self.parts=[]\n def handle_data(self,data): self.parts.append(data)\np=P();p.feed(json.load(sys.stdin)['html']);print(json.dumps(''.join(p.parts)))`;
  const result = spawnSync("python3", ["-c", script], { input: JSON.stringify(source), encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const bodyText = items => items.map(node => typeof node === "string" ? node : node.type === "codeblock" ? node.text : bodyText(node.children ?? [])).join("");
  assert.equal(bodyText(article.body), JSON.parse(result.stdout));
  const code = nodes.filter(node => node.type === "codeblock");
  assert.equal(code.length, 2);
  assert.match(code[0].text, /pub struct ClearinghouseState/);
  assert.match(code[1].text, /"signatureChainId": "0xa4b1", \/\/ Arbitrum One/);
  assert.equal(code[1].language, "jsonc");
  assert.ok(nodes.every(node => !["script", "iframe", "button", "svg"].includes(node.type)));
});

test("the three original images are hosted locally, and every contents link has a heading", async () => {
  const images = nodes.filter(node => node.type === "image");
  assert.equal(images.length, 3);
  for (const image of images) {
    await access(new URL(`../public${image.src}`, import.meta.url));
    assert.ok(image.sourceSrc.startsWith("https://substack-post-media.s3.amazonaws.com/public/images/"));
  }
  assert.equal(new Set(article.headings.map(heading => heading.id)).size, 10);
  assert.equal(article.headings.filter(heading => heading.level === 2).length, 5);
  for (const heading of article.headings) assert.ok(nodes.some(node => node.id === heading.id));
});
