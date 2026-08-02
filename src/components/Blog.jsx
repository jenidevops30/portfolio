import { useState } from 'react';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

const Blog = ({ posts, onAddBlog }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedTag, setSelectedTag] = useState('All');
  const [featuredModalPost, setFeaturedModalPost] = useState(null);
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
    
    // Parse tags (comma separated)
    const parsedTags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    // Parse content into paragraphs
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
      image: '/assets/blogs/terraform.png', // Fallback to Terraform blog image style
      content: paragraphs.length > 0 ? paragraphs : [formData.excerpt]
    };

    onAddBlog(newBlog);
    
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      readTime: '',
      tags: '',
      content: ''
    });
    setIsWriting(false);
  };

  // Get all unique tags for filtering
  const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))];

  // Filter posts
  const filteredPosts = posts.filter(post => 
    selectedTag === 'All' || post.tags.includes(selectedTag)
  );

  // Separate featured post (the first one when 'All' is selected)
  const showFeatured = selectedTag === 'All' && filteredPosts.length > 0;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const displayPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <section id="blog" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
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
          /* Split Writer View */
          <div className="editor-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'start' }}>
            
            {/* Form Left Side */}
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

            {/* Live Preview Right Side */}
            <div style={{ position: 'sticky', top: '120px' }} className="live-preview-container">
              <div className="section-label" style={{ marginBottom: '1rem' }}>Live Preview</div>
              <div className="blog-card glass" style={{ opacity: 1, border: '1px solid var(--accent)' }}>
                <div className="blog-image">
                  <img src="/assets/blogs/terraform.png" alt="Preview Template" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=DevOps+Insights'; }} />
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
          /* Articles Catalog View */
          <>
            
            {/* Filter Tabs */}
            <div className="filter-tabs" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`filter-tab-btn ${selectedTag === tag ? 'active' : ''}`}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '100px',
                    border: '1px solid var(--border)',
                    background: selectedTag === tag ? 'var(--accent)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedTag === tag ? '#000' : 'var(--text-dim)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: selectedTag === tag ? '0 0 15px var(--accent-glow)' : 'none',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Featured Horizontal Card (only on 'All' catalog view) */}
            {featuredPost && (
              <div className="featured-blog-card glass" style={{
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr',
                gap: '3rem',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '4rem',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '320px' }}>
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    className="featured-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=DevOps+Featured'; }}
                  />
                  <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--accent)', color: '#000', padding: '6px 18px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                    LATEST FEATURED ARTICLE
                  </div>
                </div>
                
                <div style={{ padding: '3rem 3rem 3rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="featured-card-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{featuredPost.read_time}</span>
                    <span style={{ color: 'var(--muted)' }}>{featuredPost.date}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.9rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '1.2rem', color: 'var(--text)' }}>
                    {featuredPost.title}
                  </h3>
                  
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    {featuredPost.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {featuredPost.tags.map((tag, idx) => (
                        <span key={idx} className="blog-tag" style={{ fontSize: '0.75rem', background: 'hsla(var(--h), var(--s), 55%, 0.1)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '6px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: '8px' }}
                      onClick={() => setFeaturedModalPost(featuredPost)}
                    >
                      Read Full Article
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Grid of remaining items */}
            {displayPosts.length > 0 ? (
              <div className="blogs-grid">
                {displayPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>No articles match the selected tag filter.</p>
              </div>
            )}

          </>
        )}

      </div>

      {/* Featured Post Modal Reader */}
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
