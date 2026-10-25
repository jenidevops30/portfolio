const express = require("express");
const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");
const { marked } = require("marked");

const BLOG_CONTENT_DIR = path.join(__dirname, "../../content/blog");
const SLUG_REGEX = /^[a-z0-9-]+$/;

// Configure marked with sensible security and rendering options
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Cache structures for production
let postsCache = null;
let postBySlugCache = new Map();

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function calculateReadingTime(text) {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function loadPostsFromDisk() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_DIR).filter(file => file.endsWith(".md"));
  const posts = [];
  const postMap = new Map();

  for (const file of files) {
    const filePath = path.join(BLOG_CONTENT_DIR, file);
    try {
      const rawContent = fs.readFileSync(filePath, "utf8");
      const parsed = frontMatter(rawContent);
      const attributes = parsed.attributes || {};
      const body = parsed.body || "";

      const fileSlug = path.basename(file, ".md");
      const slug = attributes.slug || fileSlug;

      const readingTime = attributes.readingTime || calculateReadingTime(body);
      const htmlContent = marked.parse(body);

      const post = {
        title: attributes.title || fileSlug,
        slug,
        date: attributes.date || new Date().toISOString().split("T")[0],
        author: attributes.author || "Jeni Patel",
        authorRole: attributes.authorRole || "DevOps & Cloud Security Engineer",
        tags: Array.isArray(attributes.tags) ? attributes.tags : [],
        excerpt: attributes.excerpt || body.slice(0, 160).replace(/[#*`\n]/g, " ").trim() + "...",
        featured: Boolean(attributes.featured),
        cvss: attributes.cvss || null,
        cves: Array.isArray(attributes.cves) ? attributes.cves : [],
        readingTime,
        htmlContent,
        rawMarkdown: body,
      };

      posts.push(post);
      postMap.set(slug, post);
    } catch (err) {
      console.error(`[BlogService] Failed to parse article at ${filePath}:`, err.message);
    }
  }

  // Sort descending by date
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (isProduction()) {
    postsCache = posts;
    postBySlugCache = postMap;
  }

  return { posts, postMap };
}

function getBlogPosts() {
  if (isProduction() && postsCache) {
    return postsCache;
  }
  const { posts } = loadPostsFromDisk();
  return posts;
}

function getBlogPostBySlug(slug) {
  if (!slug || typeof slug !== "string" || !SLUG_REGEX.test(slug)) {
    return null;
  }

  if (isProduction() && postBySlugCache.has(slug)) {
    return postBySlugCache.get(slug);
  }

  const { postMap } = loadPostsFromDisk();
  return postMap.get(slug) || null;
}

// Clear cache helper (for testing or manual invalidation)
function clearBlogCache() {
  postsCache = null;
  postBySlugCache.clear();
}

// Router 1: HTML View Router (/blog)
const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
  const posts = getBlogPosts();
  const selectedTag = req.query.tag || null;
  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags && p.tags.map(t => t.toLowerCase()).includes(selectedTag.toLowerCase()))
    : posts;

  res.render("blog/index", {
    posts: filteredPosts,
    allPostsCount: posts.length,
    selectedTag,
    title: selectedTag ? `${selectedTag} Articles | Blog | Jeni Patel` : "DevSecOps & Cloud Engineering Blog | Jeni Patel",
    path: "/blog",
  });
});

blogRouter.get("/:slug", (req, res, next) => {
  const { slug } = req.params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return res.status(404).render("blog/index", {
      posts: getBlogPosts(),
      selectedTag: null,
      errorMessage: `Article "${slug}" could not be found.`,
      title: "Article Not Found | Blog | Jeni Patel",
      path: "/blog",
    });
  }

  res.render("blog/post", {
    post,
    title: `${post.title} | Blog | Jeni Patel`,
    path: `/blog/${post.slug}`,
  });
});

// Router 2: JSON API Router (/api/blog)
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  const posts = getBlogPosts();
  // Strip heavy HTML from list endpoint for efficiency
  const list = posts.map(({ htmlContent, rawMarkdown, ...meta }) => meta);
  res.json(list);
});

apiRouter.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return res.status(404).json({
      status: "error",
      message: `Blog post '${slug}' not found`,
    });
  }

  res.json(post);
});

blogRouter.blogRouter = blogRouter;
blogRouter.apiRouter = apiRouter;
blogRouter.getBlogPosts = getBlogPosts;
blogRouter.getBlogPostBySlug = getBlogPostBySlug;
blogRouter.clearBlogCache = clearBlogCache;

module.exports = blogRouter;
