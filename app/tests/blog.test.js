const { describe, it } = require("node:test");
const assert = require("node:assert");
const express = require("express");
const path = require("path");
const { blogRouter, apiRouter, getBlogPosts, getBlogPostBySlug } = require("../src/routes/blog");

function createTestApp() {
  const app = express();
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  app.use("/blog", blogRouter);
  app.use("/api/blog", apiRouter);
  return app;
}

describe("Blog Service and Routes", () => {
  it("getBlogPosts() loads all markdown articles with frontmatter", () => {
    const posts = getBlogPosts();
    assert.ok(Array.isArray(posts));
    assert.strictEqual(posts.length >= 2, true);

    const phpPost = posts.find(p => p.slug === "php2shell-critical-php-vulnerabilities");
    assert.ok(phpPost, "PHP2Shell article should exist");
    assert.strictEqual(phpPost.title.includes("PHP2Shell"), true);
    assert.strictEqual(phpPost.cvss, "9.2 Critical");
    assert.strictEqual(phpPost.featured, true);

    const oidcPost = posts.find(p => p.slug === "aws-github-actions-oidc-zero-keys");
    assert.ok(oidcPost, "AWS OIDC article should exist");
  });

  it("getBlogPostBySlug() returns parsed HTML and metadata for valid slug", () => {
    const post = getBlogPostBySlug("php2shell-critical-php-vulnerabilities");
    assert.ok(post);
    assert.strictEqual(post.slug, "php2shell-critical-php-vulnerabilities");
    assert.ok(post.htmlContent);
    assert.strictEqual(post.htmlContent.includes("CVE-2026-109618"), true);
    assert.strictEqual(post.htmlContent.includes("CVE-2026-109619"), true);
  });

  it("getBlogPostBySlug() returns null for unknown slug or invalid path traversal", () => {
    assert.strictEqual(getBlogPostBySlug("non-existent-article"), null);
    assert.strictEqual(getBlogPostBySlug("../app.js"), null);
    assert.strictEqual(getBlogPostBySlug("invalid/slug"), null);
    assert.strictEqual(getBlogPostBySlug(""), null);
    assert.strictEqual(getBlogPostBySlug(null), null);
  });

  it("GET /api/blog returns JSON array with published articles", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/blog`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("content-type").includes("application/json"), true);
      const data = await res.json();
      assert.ok(Array.isArray(data));
      assert.strictEqual(data.length >= 2, true);
      assert.ok(data.some(p => p.slug === "php2shell-critical-php-vulnerabilities"));
    } finally {
      server.close();
    }
  });

  it("GET /api/blog/:slug returns JSON details for valid article", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/blog/php2shell-critical-php-vulnerabilities`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.slug, "php2shell-critical-php-vulnerabilities");
      assert.ok(data.htmlContent);
      assert.strictEqual(data.htmlContent.includes("CVE-2026-109618"), true);
    } finally {
      server.close();
    }
  });

  it("GET /api/blog/:slug returns 404 for nonexistent or invalid slug", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res404 = await fetch(`http://127.0.0.1:${port}/api/blog/non-existent-article`);
      assert.strictEqual(res404.status, 404);

      const resTraversal = await fetch(`http://127.0.0.1:${port}/api/blog/..%2F..%2Fpackage.json`);
      assert.strictEqual(resTraversal.status, 404);
    } finally {
      server.close();
    }
  });

  it("GET /blog renders HTML index page", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res = await fetch(`http://127.0.0.1:${port}/blog`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("content-type").includes("text/html"), true);
      const text = await res.text();
      assert.strictEqual(text.includes("Technical Blog"), true);
      assert.strictEqual(text.includes("PHP2Shell"), true);
    } finally {
      server.close();
    }
  });

  it("GET /blog/:slug renders HTML article page", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res = await fetch(`http://127.0.0.1:${port}/blog/php2shell-critical-php-vulnerabilities`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("content-type").includes("text/html"), true);
      const text = await res.text();
      assert.strictEqual(text.includes("PHP2Shell"), true);
      assert.strictEqual(text.includes("CVE-2026-109618"), true);
    } finally {
      server.close();
    }
  });

  it("GET /blog/:slug returns 404 for invalid slug or path traversal", async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const res = await fetch(`http://127.0.0.1:${port}/blog/unknown-slug-xyz`);
      assert.strictEqual(res.status, 404);
    } finally {
      server.close();
    }
  });
});
