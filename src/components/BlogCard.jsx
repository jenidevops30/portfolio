import React, { useState } from 'react';
import BlogModal from './BlogModal';

const BlogCard = (post) => {
  const { title, excerpt, date, read_time, tags, image, content } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="blog-card glass">
        <div className="blog-image">
          <img src={image} alt={title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=DevOps+Blog'; }} />
          <div className="blog-date">{date}</div>
        </div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-read-time">{read_time}</span>
            <div className="blog-tags">
              {tags.map((tag, index) => (
                <span key={index} className="blog-tag">{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="blog-title">{title}</h3>
          <p className="blog-excerpt">{excerpt}</p>
          <a href="#read" className="blog-link" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
            Read More <span>→</span>
          </a>
        </div>
      </div>
      <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} post={post} />
    </>
  );
};

export default BlogCard;
