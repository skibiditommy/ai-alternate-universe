import React from 'react';

export default function StoryCard({ entry, isLatest }) {
  const isUser = entry.role === 'user';

  if (isUser) {
    return (
      <div className={`user-choice ${isLatest ? 'animate-fade-in' : ''}`} style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(59, 130, 246, 0.2)',
          border: '1px solid var(--accent-color)',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px 12px 0 12px',
          color: '#e2e8f0',
          maxWidth: '80%',
          textAlign: 'left'
        }}>
          <strong style={{ display: 'block', fontSize: '0.8rem', color: '#60a5fa', marginBottom: '0.25rem' }}>Your Choice</strong>
          {entry.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card ${isLatest ? 'animate-fade-in' : ''}`}>
      <div className="story-text">
        {entry.content}
      </div>
    </div>
  );
}
