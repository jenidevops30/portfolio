import { useState } from 'react';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

const Blog = ({ posts, onAddBlog }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [featuredModalPost, setFeaturedModalPost] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    readTime: '',
    tags: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const parsedTags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    const paragraphs = formData.content
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const newBlog = {
      title: formData.title,
      excerpt: formData.excerpt,
      read_time: formData.readTime || '5 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
      tags: parsedTags.length > 0 ? parsedTags : ['DevOps'],
      image: '/assets/blogs/terraform.png',
      content: paragraphs.length > 0 ? paragraphs : [formData.excerpt]
    };

    onAddBlog(newBlog);
    
    setFormData({
      title: '',
      excerpt: '',
      readTime: '',
      tags: '',
      content: ''
    });
    setIsWriting(false);
  };

  const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      post.title.toLowerCase().includes(q) || 
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });

  const showFeatured = selectedTag === 'All' && searchQuery === '' && filteredPosts.length > 0;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const displayPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Helper to parse markdown-like bold/code in strings
  const parseInlineText = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text)', fontWeight: '700' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} style={{
          background: 'rgba(255,255,255,0.08)',
          padding: '0.15rem 0.4rem',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.88em',
          color: 'var(--accent)'
        }}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // Render content blocks inside Full Article view
  const renderArticleContent = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) return null;

    return contentArray.map((item, idx) => {
      const trimmed = item.trim();

      if (trimmed === '---') {
        return <hr key={idx} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' }} />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'var(--text)',
            marginTop: '2.5rem',
            marginBottom: '0.8rem',
            letterSpacing: '-0.3px'
          }}>
            {parseInlineText(trimmed.replace('### ', ''))}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            color: 'var(--text)',
            marginTop: '3rem',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.5rem',
            letterSpacing: '-0.5px'
          }}>
            {parseInlineText(trimmed.replace('## ', ''))}
          </h2>
        );
      }
      if (trimmed.startsWith('```') && trimmed.includes('```', 3)) {
        const code = trimmed.replace(/```\w*\n?/, '').replace(/```$/, '');
        return (
          <pre key={idx} style={{
            background: 'rgba(10, 15, 25, 0.85)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent)',
            padding: '1.25rem 1.5rem',
            borderRadius: '12px',
            overflowX: 'auto',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '0.9rem',
            color: '#e2e8f0',
            lineHeight: '1.6',
            margin: '1.5rem 0'
          }}>
            <code>{code}</code>
          </pre>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return (
          <li key={idx} style={{ marginLeft: '1.5rem', marginBottom: '0.4rem', color: 'var(--text-dim)', lineHeight: '1.7' }}>
            {parseInlineText(trimmed.substring(2))}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} style={{ marginLeft: '1.5rem', marginBottom: '0.4rem', color: 'var(--text-dim)', lineHeight: '1.7' }}>
            {parseInlineText(trimmed.replace(/^\d+\.\s/, ''))}
          </li>
        );
      }
      return (
        <p key={idx} style={{ marginBottom: '1.35rem', lineHeight: '1.8', color: 'var(--text-dim)', fontSize: '1.02rem' }}>
          {parseInlineText(item)}
        </p>
      );
    });
  };

  return (
    <section id="blog" style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Full Article Dedicated Reader View */}
        {activeArticle ? (
          <div className="full-article-view" style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Top Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <button 
                onClick={() => { setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', fontSize: '0.88rem' }}
              >
                <span>←</span> Back to All Articles
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleCopyLink} 
                  className="btn-outline"
                  style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '0.82rem', color: copiedLink ? 'var(--accent)' : 'var(--text-dim)' }}
                >
                  {copiedLink ? '✓ Link Copied!' : '🔗 Share Link'}
                </button>
              </div>
            </div>

            {/* Article Header */}
            <header style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                <span className="hero-tag" style={{ background: 'rgba(62, 201, 168, 0.1)', color: 'var(--accent)', border: '1px solid rgba(62, 201, 168, 0.3)', padding: '4px 14px', borderRadius: '100px' }}>
                  {activeArticle.read_time}
                </span>
                <span style={{ color: 'var(--muted)' }}>{activeArticle.date}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', lineHeight: '1.25', color: 'var(--text)', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                {activeArticle.title}
              </h1>

              <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', lineHeight: '1.6', marginBottom: '2rem', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                {activeArticle.excerpt}
              </p>

              {/* Author Card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--glass)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <img src="/jeni-headshot.webp" alt="Jeni Patel" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text)' }}>Jeni Patel</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>DevOps Engineer at Webcontrive · AWS &amp; Cloud Architect</div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {activeArticle.image && (
              <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem', border: '1px solid var(--border)', maxHeight: '420px' }}>
                <img src={activeArticle.image} alt={activeArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}

            {/* Article Content */}
            <div className="article-body-content" style={{ fontSize: '1.05rem', color: 'var(--text-dim)' }}>
              {renderArticleContent(activeArticle.content)}
            </div>

            {/* Article Footer & Tags */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeArticle.tags.map((tag, idx) => (
                  <span key={idx} style={{ background: 'hsla(var(--h), var(--s), 55%, 0.1)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => { setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary"
                style={{ padding: '10px 24px', borderRadius: '12px', fontSize: '0.9rem' }}
              >
                Explore More Articles →
              </button>
            </div>
          </div>
        ) : (
          /* Catalog & Editor View */
          <>
            {/* Header Block */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>DevOps Engineering Blog</div>
                <h1 className="section-title" style={{ margin: '0', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  {isWriting ? 'Compose a New Article' : 'Insights, Guides & Operations'}
                </h1>
                <p style={{ color: 'var(--muted)', marginTop: '0.5rem', fontSize: '1rem', maxWidth: '600px' }}>
                  {isWriting ? 'Publish configuration blueprints, cloud architecture insights, and operational post-mortems.' : 'Deep-dives into automating cloud infrastructure, scalable configurations, and resilient SRE patterns.'}
                </p>
              </div>
              <button 
                className="btn-primary" 
                style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }} 
                onClick={() => setIsWriting(!isWriting)}
              >
                {isWriting ? (
                  <>
                    <span>←</span> Back to Catalog
                  </>
                ) : (
                  <>
                    <span>✍️</span> Write a Blog
                  </>
                )}
              </button>
            </div>

            {isWriting ? (
              /* Writer View */
              <div className="editor-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'start' }}>
                <div className="modern-form-container glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                  <form onSubmit={handleSubmit} className="modern-contact-form">
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="title" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Article Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Implementing OIDC Authentication for Secure AWS Deployments"
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="excerpt" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Brief Excerpt</label>
                      <input
                        type="text"
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="e.g., A comprehensive operational guide to configuring passwordless IAM role assumptions..."
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="form-group">
                        <label htmlFor="readTime" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Read Time</label>
                        <input
                          type="text"
                          id="readTime"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleChange}
                          placeholder="e.g., 6 min read"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tags" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Tags (comma-separated)</label>
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          placeholder="e.g., AWS, OIDC, Security"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                      <label htmlFor="content" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Article Body (Press Enter twice for paragraph breaks)</label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write detailed paragraphs describing architecture decisions, troubleshooting workflows, and operational commands..."
                        rows="10"
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '10px' }}>
                      Publish to Feed
                    </button>
                  </form>
                </div>

                <div style={{ position: 'sticky', top: '120px' }} className="live-preview-container">
                  <div className="section-label" style={{ marginBottom: '1rem' }}>Live Preview</div>
                  <div className="blog-card glass" style={{ opacity: 1, border: '1px solid var(--accent)' }}>
                    <div className="blog-image">
                      <img src="/assets/blogs/terraform.png" alt="Preview Template" />
                      <div className="blog-date" style={{ background: 'var(--accent)', color: '#000' }}>
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-read-time">{formData.readTime || '5 min read'}</span>
                        <div className="blog-tags">
                          {(formData.tags ? formData.tags.split(',') : ['DevOps']).map((tag, idx) => (
                            tag.trim().length > 0 && <span key={idx} className="blog-tag">{tag.trim()}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="blog-title">{formData.title || 'Untitled Draft'}</h3>
                      <p className="blog-excerpt">{formData.excerpt || 'Your article summary will populate here as you compose...'}</p>
                      <span className="blog-link" style={{ cursor: 'default' }}>
                        Read More <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Catalog View */
              <>
                {/* Search & Filter Control Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  {/* Filter Pills */}
                  <div className="filter-tabs" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`filter-tab-btn ${selectedTag === tag ? 'active' : ''}`}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '100px',
                          border: '1px solid var(--border)',
                          background: selectedTag === tag ? 'var(--accent)' : 'rgba(255, 255, 255, 0.03)',
                          color: selectedTag === tag ? '#000' : 'var(--text-dim)',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          boxShadow: selectedTag === tag ? '0 0 15px var(--accent-glow)' : 'none',
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div style={{ position: 'relative', minWidth: '260px', flexGrow: '0.3' }}>
                    <input
                      type="text"
                      placeholder="Search articles &amp; topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 18px 10px 38px',
                        borderRadius: '100px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.9rem' }}>🔍</span>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Featured Post Card */}
                {featuredPost && (
                  <div className="featured-blog-card glass" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '2.5rem',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    marginBottom: '3.5rem',
                    border: '1px solid var(--border)',
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        className="featured-image"
                        onError={(e) => { e.target.src = '/assets/blogs/terraform.png'; }}
                      />
                      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'var(--accent)', color: '#000', padding: '5px 16px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                        FEATURED DEVOPS GUIDE
                      </div>
                    </div>
                    
                    <div style={{ padding: '2.5rem 2.5rem 2.5rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="featured-card-info">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{featuredPost.read_time}</span>
                        <span style={{ color: 'var(--muted)' }}>{featuredPost.date}</span>
                      </div>
                      
                      <h3 style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '1rem', color: 'var(--text)' }}>
                        {featuredPost.title}
                      </h3>
                      
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                        {featuredPost.excerpt}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {featuredPost.tags.map((tag, idx) => (
                            <span key={idx} className="blog-tag" style={{ fontSize: '0.75rem', background: 'hsla(var(--h), var(--s), 55%, 0.1)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '6px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button 
                          className="btn-primary" 
                          style={{ padding: '10px 24px', fontSize: '0.88rem', borderRadius: '8px' }}
                          onClick={() => setActiveArticle(featuredPost)}
                        >
                          Read Full Guide →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                {displayPosts.length > 0 ? (
                  <div className="blogs-grid">
                    {displayPosts.map((post, index) => (
                      <div key={index} onClick={() => setActiveArticle(post)} style={{ cursor: 'pointer' }}>
                        <BlogCard {...post} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>No articles match your search query or selected filter.</p>
                    <button 
                      onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
                      className="btn-outline"
                      style={{ marginTop: '1rem', padding: '8px 20px', borderRadius: '100px', fontSize: '0.85rem' }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

      </div>

      {featuredModalPost && (
        <BlogModal 
          isOpen={!!featuredModalPost} 
          onClose={() => setFeaturedModalPost(null)} 
          post={featuredModalPost} 
        />
      )}
    </section>
  );
};

export default Blog;
