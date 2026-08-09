# 0xByteBeetle Web

Public website for 0xByteBeetle's multichain engineering education, beginning with EVM bootcamps, mentoring, technical writing, and team training.

Google Docs and the private course repositories remain the source of truth for paid lesson content. This repository contains only the public website and its approved public claims.

## Local Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
npm test
```

The complete Substack index is generated from the public companion repository. After
updating its catalog, refresh the website copy with:

```bash
node scripts/sync-substack-catalog.mjs /path/to/blog-solutions/catalog/articles.json
```

## Public Destinations

- Website target: [learn.andreyobruchkov.com](https://learn.andreyobruchkov.com)
- Organization: [github.com/0xByteBeetle](https://github.com/0xByteBeetle)
- Article companions: [0xByteBeetle/blog-solutions](https://github.com/0xByteBeetle/blog-solutions)
- Writing: [Substack](https://substack.com/@andreyobruchkov) and [Medium](https://medium.com/@andrey_obruchkov)
