# System Design: Markdown-Driven Technical Blog System for Portfolio (`v3`)

- **Author:** Jeni Patel (DevOps & Cloud Security Engineer)
- **Date:** 2026-10-25
- **Status:** Approved
- **Target Route:** `/blog` and `/blog/:slug`
- **Primary Objective:** Deliver a high-performance, Markdown-driven publishing platform integrated directly into the Express-based portfolio (`v3`) with zero database overhead, clean DevSecOps aesthetics, and full responsive design.

---

## 1. Executive Summary & Architecture

The portfolio requires a dedicated **Blog** section to publish technical insights, security advisories, infrastructure guides, and post-mortems. To maintain the project's zero-maintenance, file-based operational model, the blog system uses **Markdown files with YAML frontmatter** stored directly in the repository under `app/content/blog/`.

An Express router (`app/src/routes/blog.js`) parses these Markdown files using `front-matter` and `marked`, extracts metadata, generates reading times and excerpts, and renders them through high-aesthetic EJS templates (`app/views/blog/index.ejs` and `app/views/blog/post.ejs`).

### Architectural Characteristics:
1. **Zero Database Dependency:** Posts are committed as Git artifacts, enabling peer review, version tracking, and immutable publishing without database hosting costs.
2. **In-Memory Caching:** Article metadata and parsed HTML are cached in memory in production (`NODE_ENV === 'production'`) and dynamically re-read in development for instant live reloading.
3. **Consistent Portfolio Aesthetics:** Typography, dark callout cards, security severity badges, and terminal windows align with the existing `style.css` and `case-study.css`.

---

## 2. Directory Layout & Data Flow

```
app/
├── content/
│   └── blog/
│       ├── php2shell-critical-php-vulnerabilities.md  (Featured Post)
│       └── aws-github-actions-oidc-zero-keys.md       (Post 2)
├── src/
│   ├── app.js                          (Mounts /blog router)
│   └── routes/
│       └── blog.js                     (File scanning, parser, routing)
├── views/
│   └── blog/
│       ├── index.ejs                   (Blog listing & topic filter)
│       └── post.ejs                    (Article reader template)
├── public/
│   ├── css/
│   │   └── blog.css                    (Blog styling & typography)
│   └── index.html                      (Adds Blog to nav bar)
```

---

## 3. Article Schema & Markdown Frontmatter

Every article under `app/content/blog/<slug>.md` adheres to the following YAML schema:

```yaml
---
title: "PHP2Shell: Two Critical PHP Vulnerabilities Every DevOps Engineer Should Know About"
slug: "php2shell-critical-php-vulnerabilities"
date: "2026-10-21"
author: "Jeni Patel"
authorRole: "DevOps Engineer"
tags: ["DevSecOps", "PHP", "Security", "CVE", "Linux"]
excerpt: "On 21 October 2026, PHP security updates addressed two critical remote code execution vulnerabilities (CVE-2026-109618 & CVE-2026-109619, CVSS 9.2). Here is what happened and how to protect production servers."
featured: true
cvss: "9.2 Critical"
---
```

---

## 4. Routing & API Endpoints

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/blog` | Renders the blog listing hub with featured article, tag pills, reading times, and search/filter. |
| `GET` | `/blog/:slug` | Renders the single blog post view with table of contents, author bio, and related articles. |
| `GET` | `/api/blog` | Returns raw JSON array of all published blog post metadata. |
| `GET` | `/api/blog/:slug` | Returns JSON of a single blog post including parsed HTML and raw markdown. |

---

## 5. Security & Performance Guardrails

1. **Path Traversal Protection:** The slug parameter in `/blog/:slug` is sanitized with regex (`/^[a-z0-9-]+$/`) to prevent directory traversal attacks (`../`).
2. **HTML Sanitization & Safe Markdown:** Markdown rendering via `marked` is configured with safe parsing options and sanitization for raw HTML injections.
3. **Responsive Breakpoints:** Fully responsive across mobile (390px), tablet (768px), and desktop (1280px+).

---

## 6. Seed Articles

1. **Featured Post:** `PHP2Shell: Two Critical PHP Vulnerabilities Every DevOps Engineer Should Know About`
   - Covers CVE-2026-109618 & CVE-2026-109619 (CVSS 9.2 RCE)
   - Fixed releases breakdown (PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12)
   - 7 DevOps mitigation checklist items
   - Official CVE and PHP security advisory links
2. **Post 2:** `Eliminating Long-Lived AWS Access Keys with GitHub Actions OIDC Federation`
   - Covers elimination of static IAM access keys
   - AWS STS AssumeRoleWithWebIdentity architecture
   - Terraform trust policy example and security benefits
