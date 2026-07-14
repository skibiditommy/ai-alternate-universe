'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, AlertCircle, X, GitBranch } from 'lucide-react';
import TimelineTree from '../components/TimelineTree';

const SUGGESTIONS = [
  "What if I chose Commerce instead of Science?",
  "What if I went to USA after high school?",
  "What if I chose mechanical engineering?",
];

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-section">
        <div className="skeleton-line w-40"></div>
        <div className="skeleton-line w-80 h-lg"></div>
      </div>
      <div className="skeleton-section">
        <div className="skeleton-label"></div>
        <div className="skeleton-line w-100"></div>
        <div className="skeleton-line w-60"></div>
      </div>
      <div className="skeleton-section">
        <div className="skeleton-label"></div>
        <div className="skeleton-line w-80"></div>
        <div className="skeleton-line w-100"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [timelineData, setTimelineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuggestionClick = (suggestion) => {
    setInitialPrompt(suggestion);
  };

  const generateTimeline = async () => {
    if (!initialPrompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setTimelineData(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: initialPrompt })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate timeline');
      }

      const data = await response.json();
      
      if (data.timeline) {
        setTimelineData(data.timeline);
      } else {
        throw new Error('Invalid timeline structure received');
      }
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUniverse = () => {
    setTimelineData(null);
    setInitialPrompt('');
    setError(null);
  };

  const showHero = !timelineData && !isLoading;

  return (
    <div className="container-fluid">
      {showHero && (
        <section className="hero-section animate-fade-in">
          <h1 className="hero-title">
            The Road <span className="text-gradient">Not Taken</span>
          </h1>
          <p className="hero-subtitle">
            Input a historical decision point. The engine computes an alternate
            life trajectory — branching across career, lifestyle, and personality.
          </p>

          <div className="input-container">
            <label htmlFor="decision-input" className="input-label">
              Describe your decision point
            </label>
            <div className="input-wrapper">
              <input
                id="decision-input"
                type="text"
                className="hero-input"
                placeholder="e.g. What if I pursued mechanical engineering instead of CS?"
                value={initialPrompt}
                onChange={(e) => setInitialPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateTimeline()}
                aria-describedby={error ? "input-error" : undefined}
              />
              <button 
                className="hero-submit-btn"
                onClick={generateTimeline}
                disabled={!initialPrompt.trim()}
                aria-label="Simulate timeline"
              >
                Simulate
              </button>
            </div>
            
            <div className="suggestions-area">
              <span className="suggestions-label">Try:</span>
              <div className="suggestion-pills">
                {SUGGESTIONS.map((text, i) => (
                  <button
                    key={i}
                    className="suggestion-pill"
                    onClick={() => handleSuggestionClick(text)}
                    aria-label={`Use suggestion: ${text}`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="error-banner" id="input-error" role="alert">
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span className="error-banner-text">{error}</span>
                <button className="error-dismiss" onClick={() => setError(null)} aria-label="Dismiss error">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {isLoading && (
        <div className="animate-fade-in">
          <div className="skeleton-container">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="loading-status">
            <span className="loading-dot"></span>
            <span>Generating branching timeline&hellip;</span>
          </div>
        </div>
      )}

      {timelineData && !isLoading && (
        <div className="timeline-view animate-fade-in">
           <div className="timeline-header-card">
             <div className="decision-reminder">
               <span className="label">Decision Point</span> 
               <span className="value">&ldquo;{initialPrompt}&rdquo;</span>
             </div>
             <button className="reset-btn" onClick={resetUniverse}>
                <RotateCcw size={13} /> New Simulation
             </button>
           </div>
           
           <TimelineTree data={timelineData} />
        </div>
      )}
    </div>
  );
}
