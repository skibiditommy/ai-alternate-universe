'use client';

import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import TimelineTree from '../components/TimelineTree';

const LOADING_PHRASES = [
  "Initializing parameters...",
  "Calculating divergence...",
  "Simulating career paths...",
  "Weaving lifestyle branches...",
  "Finalizing timeline..."
];

const SUGGESTIONS = [
  "What if I chose Commerce instead of Science?",
  "What if I went to USA after high school?",
  "What if I chose mechanical engineering?",
];

export default function Home() {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [timelineData, setTimelineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 2500);
    } else {
      setLoadingTextIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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

  return (
    <div className="container-fluid">
      {!timelineData && !isLoading && (
        <div className="hero-section animate-slide-down">
          <div className="hero-badge">Simulation Engine v1.0</div>
          <h1 className="hero-title">
            The Road <span className="text-gradient">Not Taken</span>
          </h1>
          <p className="hero-subtitle">
            Input a historical decision point. The agent will compute an alternate life trajectory, generating branches for career, lifestyle, and personality divergence.
          </p>

          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                className="hero-input"
                placeholder="e.g. What if I pursued mechanical engineering instead of CS?"
                value={initialPrompt}
                onChange={(e) => setInitialPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateTimeline()}
              />
              <button 
                className="hero-submit-btn"
                onClick={generateTimeline}
                disabled={!initialPrompt.trim()}
              >
                <span>Simulate</span>
              </button>
            </div>
            
            <div className="suggestions-area">
              <span className="suggestions-label">Examples:</span>
              <div className="suggestion-pills">
                {SUGGESTIONS.map((text, i) => (
                  <button key={i} className="suggestion-pill" onClick={() => handleSuggestionClick(text)}>
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div style={{ marginTop: '1rem', color: '#F87171', fontSize: '0.9rem' }}>
                Error: {error}
              </div>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-container animate-fade-in">
           <div className="spinner"></div>
           <div className="loading-text-wrapper">
             <h2 className="loading-title">Generating Branches</h2>
             <p className="loading-phrase">{LOADING_PHRASES[loadingTextIdx]}</p>
           </div>
        </div>
      )}

      {timelineData && !isLoading && (
        <div className="timeline-view animate-fade-in">
           <div className="timeline-header-card">
             <div className="decision-reminder">
               <span className="label">Origin Point</span> 
               <span className="value">"{initialPrompt}"</span>
             </div>
             <button className="reset-btn" onClick={resetUniverse}>
                <RotateCcw size={14} /> New Simulation
             </button>
           </div>
           
           <TimelineTree data={timelineData} />
        </div>
      )}
    </div>
  );
}
