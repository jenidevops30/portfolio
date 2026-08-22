import { Trophy, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const AwardsArticles = ({ onSelectArticle, onViewAllArticles }) => {
  const { awards, knowledgeTopics, blogs } = PORTFOLIO_DATA;

  return (
    <section id="articles" aria-labelledby="awards-articles-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Recognition &amp; Knowledge</div>
          <h2 id="awards-articles-heading" className="section-title">Awards &amp; Technical Publications</h2>
          <p className="section-subtitle">
            Demonstrated engineering leadership recognized across enterprise organizations, alongside published blueprints on cloud modernization and infrastructure security.
          </p>
        </div>

        <div className="awards-knowledge-grid">
          {/* Left: Awards Showcase */}
          <div className="awards-showcase-panel">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-20, 20px)' }}>
                <Trophy size={24} color="var(--status-warning)" />
                <h3 className="section-title" style={{ fontSize: '22px' }}>Professional Honors</h3>
              </div>

              <div>
                {awards.map((award, idx) => (
                  <div key={idx} className="award-item-row">
                    <div className="award-icon-badge">
                      <Trophy size={20} />
                    </div>
                    <div className="award-details">
                      <h4>{award.title}</h4>
                      <p style={{ color: 'var(--secondary-accent)', fontWeight: 600, fontSize: '13px', margin: '2px 0' }}>
                        {award.organization} · {award.date}
                      </p>
                      <p>{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Articles & Publications */}
          <div className="knowledge-sharing-panel">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-20, 20px)', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={24} color="var(--secondary-accent)" />
                  <h3 className="section-title" style={{ fontSize: '22px' }}>Engineering Articles</h3>
                </div>

                <button 
                  className="btn btn-secondary" 
                  style={{ minHeight: '36px', height: '36px', padding: '0 14px', fontSize: '13px' }}
                  onClick={onViewAllArticles}
                >
                  <span>All Articles ({blogs.length})</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: 'var(--space-16)' }}>
                Technical deep-dives written to share production-tested architectures and operational best practices:
              </p>

              {/* Shared Expert Topics Cluster */}
              <div className="knowledge-tags-cluster">
                {knowledgeTopics.map((topic, idx) => {
                  const matchedBlog = blogs.find(b => 
                    b.tags.some(t => t.toLowerCase().includes(topic.tag.toLowerCase().split(' ')[0]))
                  ) || blogs[0];

                  return (
                    <div 
                      key={idx} 
                      className="knowledge-topic-card"
                      onClick={() => onSelectArticle(matchedBlog)}
                      role="button"
                      tabIndex={0}
                    >
                      <h5>{topic.name}</h5>
                      <span>{topic.count} →</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Publication Highlight */}
            {blogs.length > 0 && (
              <div style={{ 
                marginTop: 'var(--space-24)', 
                background: 'rgba(9, 9, 11, 0.8)', 
                border: '1px solid var(--card-border)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '16px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--primary-accent)', fontWeight: 600, marginBottom: '6px' }}>
                  <Sparkles size={14} />
                  <span>Latest Release</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {blogs[0].title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                  {blogs[0].excerpt}
                </p>
                <button 
                  className="btn btn-ghost" 
                  style={{ minHeight: '38px', height: '38px', fontSize: '13px', width: '100%' }}
                  onClick={() => onSelectArticle(blogs[0])}
                >
                  <span>Read Full Article ({blogs[0].read_time})</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsArticles;
