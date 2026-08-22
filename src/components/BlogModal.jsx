import { useEffect } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const BlogModal = ({ isOpen, onClose, post }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const { title, date, read_time, tags, image, content } = post;

  const parseInline = (text) => {
    if (typeof text !== 'string') return text;
    const tokenRegex = /(\*\*.*?\*\*|`.*?`)/g;
    const splitParts = text.split(tokenRegex);
    
    return splitParts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-main)', fontWeight: '600' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={{
            background: 'rgba(255,255,255,0.08)',
            padding: '0.15rem 0.35rem',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
            color: 'var(--secondary-accent)'
          }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const processContentBlocks = (contentArray) => {
    if (!contentArray) return [];
    
    const blocks = [];
    let currentList = null;
    
    contentArray.forEach((item) => {
      const trimmed = item.trim();
      
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const val = trimmed.substring(2);
        if (currentList && currentList.type === 'ul') {
          currentList.items.push(val);
        } else {
          if (currentList) blocks.push(currentList);
          currentList = { type: 'ul', items: [val] };
        }
      } else if (/^\d+\.\s/.test(trimmed)) {
        const val = trimmed.replace(/^\d+\.\s/, '');
        if (currentList && currentList.type === 'ol') {
          currentList.items.push(val);
        } else {
          if (currentList) blocks.push(currentList);
          currentList = { type: 'ol', items: [val] };
        }
      } else {
        if (currentList) {
          blocks.push(currentList);
          currentList = null;
        }
        blocks.push({ type: 'para', value: item });
      }
    });
    
    if (currentList) {
      blocks.push(currentList);
    }
    
    return blocks;
  };

  const renderBlocks = () => {
    const blocks = processContentBlocks(content);
    
    return blocks.map((block, index) => {
      if (block.type === 'ul') {
        return (
          <ul key={index} style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            margin: '0.5rem 0 1.25rem 0',
            color: 'var(--text-muted)'
          }}>
            {block.items.map((item, idx) => (
              <li key={idx} style={{ lineHeight: '1.6' }}>{parseInline(item)}</li>
            ))}
          </ul>
        );
      }
      
      if (block.type === 'ol') {
        return (
          <ol key={index} style={{
            listStyleType: 'decimal',
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            margin: '0.5rem 0 1.25rem 0',
            color: 'var(--text-muted)'
          }}>
            {block.items.map((item, idx) => (
              <li key={idx} style={{ lineHeight: '1.6' }}>{parseInline(item)}</li>
            ))}
          </ol>
        );
      }
      
      const val = block.value;
      
      if (val === '---') {
        return <hr key={index} style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '2rem 0' }} />;
      }
      
      if (val.startsWith('### ')) {
        return (
          <h3 key={index} style={{
            color: 'var(--text-main)',
            fontSize: '1.25rem',
            marginTop: '1.75rem',
            marginBottom: '0.75rem',
            fontWeight: '600',
            lineHeight: '1.4'
          }}>
            {parseInline(val.replace('### ', ''))}
          </h3>
        );
      }
      
      if (val.startsWith('## ')) {
        return (
          <h2 key={index} style={{
            color: 'var(--text-main)',
            fontSize: '1.5rem',
            marginTop: '2.25rem',
            marginBottom: '1rem',
            fontWeight: '700',
            lineHeight: '1.4'
          }}>
            {parseInline(val.replace('## ', ''))}
          </h2>
        );
      }
      
      if (val.startsWith('```') && val.includes('```', 3)) {
        const match = val.match(/^```(\w*)\n([\s\S]*)\n```$/) || val.match(/^```(\w*)\n([\s\S]*?)```$/);
        const code = match ? match[2] : val.replace(/```/g, '');
        return (
          <pre key={index} style={{
            background: 'rgba(9, 9, 11, 0.95)',
            border: '1px solid var(--card-border)',
            padding: '1.25rem',
            borderRadius: '8px',
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: '#E4E4E7',
            lineHeight: '1.6',
            margin: '1.25rem 0'
          }}>
            <code>{code}</code>
          </pre>
        );
      }
      
      return (
        <p key={index} style={{ margin: '0 0 1.25rem 0', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          {parseInline(val)}
        </p>
      );
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="blog-modal-title">
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Article">
          <X size={20} />
        </button>
        
        <div style={{ marginBottom: 'var(--space-24)' }}>
          <div className="section-label" style={{ marginBottom: '8px' }}>Engineering Blueprint</div>
          <h2 id="blog-modal-title" className="section-title" style={{ fontSize: '24px' }}>{title}</h2>
          
          <div style={{ display: 'flex', gap: '1.5rem', margin: '0.75rem 0', fontSize: '0.88rem', color: 'var(--secondary-accent)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {read_time}</span>
          </div>

          {tags && tags.length > 0 && (
            <div className="project-tags-row">
              {tags.map((tag, index) => (
                <span key={index} className="project-tech-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {image && (
            <div style={{ overflow: 'hidden', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--card-border)' }}>
              <img src={image} alt={title} style={{ width: '100%', maxHeight: '320px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {content && renderBlocks()}
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-32)', paddingTop: 'var(--space-16)', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
