# JeniDevOps Technical Blog Architecture

## Objective

Extend the existing React + Vite portfolio at https://jenidevops.in with a first-party technical publication. Markdown/MDX files in this repository are the source of truth. Articles may then be republished to Hashnode and AWS Builder Center with the personal website URL identified as the original source wherever the destination platform supports canonical attribution.

## Architecture decisions

- Keep the existing React 19 + Vite application and AWS S3 + CloudFront deployment.
- Keep articles in Git as Markdown/MDX; do not introduce a database or runtime CMS.
- Use frontmatter for article metadata and validate it during the build.
- Render article content with reusable React components for code, callouts, diagrams, and tables.
- Generate crawlable article pages at build time. Do not rely only on client-side title/meta updates for SEO.
- Generate sitemap.xml, RSS feed, and article metadata from the same content collection.
- Keep distribution to Hashnode and AWS Builder Center as an editorial/publishing step initially. Do not store platform credentials in the frontend or repository.

## Content layout

```text
frontend/
  content/
    blog/
      README.md
      _template.mdx
  scripts/
    (content validation and static generation)
  src/
    blog/
      (article listing, article page, and reusable MDX components)
```

## Article frontmatter contract

Required:
- title
- description
- slug
- publishedAt
- updatedAt
- category
- tags
- draft

Optional:
- coverImage
- series
- readingTime
- canonicalUrl

Use ISO dates (YYYY-MM-DD). Slugs must be lowercase, URL-safe, and unique. Draft articles must not appear in production listings, RSS, or sitemap.

## Publishing workflow

1. Research the topic and verify technical claims against official documentation.
2. Implement and test commands/configuration where practical.
3. Write the article in `frontend/content/blog/<slug>.mdx`.
4. Run content validation, lint, and production build.
5. Review the rendered article, code blocks, links, diagrams, accessibility, and mobile layout.
6. Merge through the existing deployment pipeline.
7. Republish to Hashnode and AWS Builder Center when suitable.
8. Set the canonical/original URL to the published article on jenidevops.in where supported.
9. Add the destination URLs back to article metadata only if they are useful to readers.

## SEO and quality requirements

- One unique title and meta description per article.
- Canonical URL points to the first-party article.
- Semantic headings and accessible navigation.
- Open Graph and social sharing metadata.
- XML sitemap and RSS feed.
- Descriptive image alt text and optimized images.
- Internal links to related articles and relevant project repositories.
- No fabricated production claims; clearly distinguish tested implementations, lab work, and conceptual examples.
- Include references to authoritative documentation for technical claims.

## Distribution policy

The personal website is the primary publication and source of truth. Hashnode and AWS Builder Center are distribution/community channels, not content databases. Do not automatically cross-post without a human review because platform formatting, canonical-link support, and community guidelines can differ.

## Delivery phases

1. Foundation: routing, content model, metadata validation, and sample draft.
2. Reader experience: blog index, category filters, article layout, TOC, code blocks, diagrams, and related posts.
3. Search and discovery: sitemap, RSS, canonical metadata, Open Graph, and search.
4. Distribution: repeatable Hashnode and AWS Builder Center publishing checklist.
5. Verification: production build, link checks, accessibility, mobile QA, and deployment review.
