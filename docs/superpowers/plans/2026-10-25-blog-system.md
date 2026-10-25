# Technical Blog System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch a Markdown-driven DevSecOps and cloud engineering blog on the portfolio (`v3`) with zero database dependencies, featuring the live security advisory *PHP2Shell: Two Critical PHP Vulnerabilities Every DevOps Engineer Should Know About*.

**Architecture:** Articles are stored as Markdown files with YAML frontmatter in `app/content/blog/`. An Express router (`app/src/routes/blog.js`) parses frontmatter via `front-matter` and renders HTML via `marked`, feeding EJS templates (`app/views/blog/index.ejs` and `app/views/blog/post.ejs`) with in-memory caching in production and live reloading in dev.

**Tech Stack:** Node.js, Express, EJS, `marked`, `front-matter`, CSS3, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-25-blog-system-design.md`

## Global Constraints

- Storage: Pure Markdown files (`.md`) with YAML frontmatter; 0 external database requirements.
- Security: Slug parameters must be regex-validated (`/^[a-z0-9-]+$/`) to eliminate path traversal vulnerabilities.
- Aesthetics: Must match existing portfolio typography, color tokens (`#0f172a`, `#38bdf8`, `#10b981`, `#ef4444`), and responsive breakpoints.
- Navigation: "Blog" must be visible in the main site header across the portfolio.

---

### Task 1: Install Markdown & Frontmatter Dependencies

**Files:**
- Modify: `app/package.json`

**Interfaces:**
- Produces: `marked` (markdown compiler), `front-matter` (YAML frontmatter parser) installed in `app/node_modules`.

- [ ] **Step 1: Install dependencies**
Run: `npm install marked front-matter` in `app/`
- [ ] **Step 2: Verify package.json contains marked and front-matter**
Confirm both packages are listed under `dependencies`.
- [ ] **Step 3: Commit**
```bash
git add app/package.json app/package-lock.json
git commit -m "chore(deps): add marked and front-matter dependencies for blog system"
```

---

### Task 2: Create Seed Blog Articles

**Files:**
- Create: `app/content/blog/php2shell-critical-php-vulnerabilities.md`
- Create: `app/content/blog/aws-github-actions-oidc-zero-keys.md`

**Interfaces:**
- Produces: Markdown files with standard YAML frontmatter (`title`, `slug`, `date`, `author`, `authorRole`, `tags`, `excerpt`, `featured`, `cvss`).

- [ ] **Step 1: Author PHP2Shell advisory article**
Write complete technical advisory post containing CVE details, affected versions table, 7 DevOps mitigation steps, and references to `app/content/blog/php2shell-critical-php-vulnerabilities.md`.
- [ ] **Step 2: Author AWS OIDC security article**
Write companion technical article explaining GitHub Actions OIDC federation to `app/content/blog/aws-github-actions-oidc-zero-keys.md`.
- [ ] **Step 3: Commit**
```bash
git add app/content/blog/
git commit -m "docs(blog): add initial technical articles including PHP2Shell advisory"
```

---

### Task 3: Implement Blog Service & Route Controller

**Files:**
- Create: `app/src/routes/blog.js`
- Test: `app/tests/blog.test.js`

**Interfaces:**
- Consumes: `app/content/blog/*.md`
- Produces:
  - `GET /blog`: Renders `blog/index.ejs` with sorted post list.
  - `GET /blog/:slug`: Renders `blog/post.ejs` with compiled HTML, TOC, and metadata.
  - `GET /api/blog`: Returns JSON list of articles.
  - `GET /api/blog/:slug`: Returns JSON of specific article.

- [ ] **Step 1: Write integration tests in `app/tests/blog.test.js`**
Write tests asserting `/blog` returns 200, `/blog/php2shell-critical-php-vulnerabilities` returns 200 with article content, `/api/blog` returns JSON array with 2 articles, and invalid slugs (`/blog/../invalid`) return 404.
- [ ] **Step 2: Implement `app/src/routes/blog.js`**
Read `.md` files, parse frontmatter, compute reading time, compile Markdown to HTML, and handle routing.
- [ ] **Step 3: Run tests to verify**
Run: `node --test app/tests/blog.test.js`
- [ ] **Step 4: Commit**
```bash
git add app/src/routes/blog.js app/tests/blog.test.js
git commit -m "feat(blog): implement blog service, markdown parsing and routes"
```

---

### Task 4: Create Blog EJS Templates

**Files:**
- Create: `app/views/blog/index.ejs`
- Create: `app/views/blog/post.ejs`

**Interfaces:**
- Consumes: Post objects `{ title, slug, date, author, tags, excerpt, htmlContent, readingTime, cvss }` from `blog.js`.
- Produces: Server-rendered HTML pages for `/blog` and `/blog/:slug`.

- [ ] **Step 1: Create `app/views/blog/index.ejs`**
Create clean blog listing layout with featured article banner, tag filtering pills, search/filter input, post cards with dates, tags, reading time, and author bio.
- [ ] **Step 2: Create `app/views/blog/post.ejs`**
Create article reading view with sticky/interactive header, tag badges, CVSS alert box, full formatted article prose, styled code blocks, author card, and back-to-blog link.
- [ ] **Step 3: Commit**
```bash
git add app/views/blog/
git commit -m "feat(views): create blog index and article reading EJS templates"
```

---

### Task 5: Add Blog CSS Stylesheet

**Files:**
- Create: `app/public/css/blog.css`

**Interfaces:**
- Consumes: Classes used in `index.ejs` and `post.ejs`.
- Produces: Responsive styling, modern cards, alert banners, tags, and reading typography.

- [ ] **Step 1: Write `app/public/css/blog.css`**
Define styles for `.blog-container`, `.featured-article-card`, `.blog-grid`, `.blog-card`, `.tag-pill`, `.cvss-badge`, `.article-content`, and mobile media queries.
- [ ] **Step 2: Commit**
```bash
git add app/public/css/blog.css
git commit -m "style(blog): add modern responsive styling for blog section"
```

---

### Task 6: Wire Blog Router & Site Navigation

**Files:**
- Modify: `app/src/app.js`
- Modify: `app/public/index.html`
- Modify: `app/views/case-study/*.ejs` (ensure Blog appears in nav bar)

**Interfaces:**
- Mounts: `app.use("/blog", blogRouter)` and `app.use("/api/blog", blogApiRouter)` in `app.js`.
- Adds `<a href="/blog">Blog</a>` in site navigation header.

- [ ] **Step 1: Mount blog router in `app/src/app.js`**
Import `blogRouter` and register `/blog` and `/api/blog`.
- [ ] **Step 2: Update site navigation in `app/public/index.html`**
Add `<a href="/blog">Blog</a>` to the navigation bar.
- [ ] **Step 3: Commit**
```bash
git add app/src/app.js app/public/index.html
git commit -m "feat(nav): mount blog router in app.js and add Blog to site navigation"
```

---

### Task 7: End-to-End Verification & Knowledge Graph Update

**Files:**
- Verify: `http://localhost:3000/blog` and `http://localhost:3000/blog/php2shell-critical-php-vulnerabilities`

- [ ] **Step 1: Verify test suite passes**
Run: `node --test app/tests/blog.test.js`
- [ ] **Step 2: Playwright visual verification**
Navigate to `http://localhost:3000/blog` and `http://localhost:3000/blog/php2shell-critical-php-vulnerabilities`, take full page screenshots on desktop (1280px) and mobile (390px), verifying zero layout overflow and clean typography.
- [ ] **Step 3: Update knowledge graph**
Run: `graphify update .`
- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "chore: complete blog implementation and update knowledge graph"
```
