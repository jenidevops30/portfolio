import { useEffect } from 'react';

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

  if (!isOpen) return null;

  const { title, date, read_time, tags, image, content } = post;

  const parseInline = (text) => {
    if (typeof text !== 'string') return text;
    const tokenRegex = /(\*\*.*?\*\*|`.*?`)/g;
    const splitParts = text.split(tokenRegex);
    
    return splitParts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-bright)', fontWeight: '600' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} style={{
          background: 'rgba(255,255,255,0.08)',
          padding: '0.15rem 0.35rem',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          color: 'var(--accent)'
        }}>{part.slice(1, -1)}</code>;
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
            color: 'var(--text-dim)'
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
            color: 'var(--text-dim)'
          }}>
            {block.items.map((item, idx) => (
              <li key={idx} style={{ lineHeight: '1.6' }}>{parseInline(item)}</li>
            ))}
          </ol>
        );
      }
      
      const val = block.value;
      
      if (val === '---') {
        return <hr key={index} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />;
      }
      
      if (val.startsWith('### ')) {
        return (
          <h3 key={index} style={{
            color: 'var(--text-bright)',
            fontSize: '1.35rem',
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
            color: 'var(--text-bright)',
            fontSize: '1.6rem',
            marginTop: '2.25rem',
            marginBottom: '1rem',
            fontWeight: '600',
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
            background: 'rgba(10, 10, 10, 0.5)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            borderRadius: '8px',
            overflowX: 'auto',
            fontFamily: 'Fira Code, Source Code Pro, monospace',
            fontSize: '0.88rem',
            color: '#e2e8f0',
            lineHeight: '1.6',
            margin: '1.25rem 0'
          }}>
            <code>{code}</code>
          </pre>
        );
      }
      
      return (
        <p key={index} style={{ margin: '0 0 1.25rem 0', lineHeight: '1.8' }}>
          {parseInline(val)}
        </p>
      );
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <div className="section-label">DevOps Article</div>
          <h2 className="modal-title">{title}</h2>
          <div style={{ display: 'flex', gap: '1.5rem', margin: '0.75rem 0', fontSize: '0.88rem', color: 'var(--accent)' }}>
            <span>{date}</span>
            <span>{read_time}</span>
          </div>
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="modal-body" style={{ marginTop: '1.5rem' }}>
          {image && (
            <div className="architecture-diagram" style={{ padding: '0', overflow: 'hidden', border: 'none', marginBottom: '2rem' }}>
              <img src={image} alt={title} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', color: 'var(--text-dim)' }}>
            {content && renderBlocks()}
          </div>
        </div>

        <div className="modal-footer" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <button className="btn-outline" onClick={onClose}>Close Reader</button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
