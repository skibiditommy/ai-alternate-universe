'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, RotateCcw } from 'lucide-react';
import StoryCard from '../components/StoryCard';

export default function Home() {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [choices, setChoices] = useState([]);
  
  const endOfStoryRef = useRef(null);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, choices]);

  const generateStory = async (userChoice) => {
    if (!userChoice.trim()) return;
    
    setIsLoading(true);
    setChoices([]);
    
    const newHistory = [...history, { role: 'user', content: userChoice }];
    setHistory(newHistory);
    setInitialPrompt('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: userChoice, history: history })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate story');
      }

      const data = await response.json();
      
      setHistory([...newHistory, { role: 'assistant', content: data.story }]);
      setChoices(data.choices || []);
      
    } catch (error) {
      console.error(error);
      setHistory([...newHistory, { role: 'assistant', content: `Error: ${error.message}. The timelines have destabilized.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUniverse = () => {
    setHistory([]);
    setChoices([]);
    setInitialPrompt('');
  };

  return (
    <main className="container">
      <h1 className="title">Alternate Universe Generator</h1>
      <p className="subtitle">Explore the paths not taken. What if...</p>

      {history.length === 0 ? (
        <div className="input-area animate-fade-in">
          <input
            type="text"
            className="input-field"
            placeholder="e.g. What if I pursued art instead of engineering?"
            value={initialPrompt}
            onChange={(e) => setInitialPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateStory(initialPrompt)}
            disabled={isLoading}
          />
          <button 
            className="primary-btn"
            onClick={() => generateStory(initialPrompt)}
            disabled={isLoading || !initialPrompt.trim()}
          >
            {isLoading ? <Loader2 className="loading-spinner" /> : <Sparkles size={20} />}
            Generate
          </button>
        </div>
      ) : (
        <div className="story-container">
          {history.map((entry, index) => (
            <StoryCard key={index} entry={entry} isLatest={index === history.length - 1} />
          ))}
          
          {isLoading && (
            <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
              <Loader2 className="loading-spinner" style={{ width: '30px', height: '30px', color: 'var(--accent-color)' }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Weaving the fabric of reality...</p>
            </div>
          )}

          {!isLoading && choices.length > 0 && (
            <div className="choices-grid animate-fade-in">
              {choices.map((choice, idx) => (
                <button 
                  key={idx} 
                  className="choice-btn"
                  onClick={() => generateStory(choice.action)}
                >
                  <div className="choice-title">{choice.title}</div>
                  <div className="choice-desc">{choice.action}</div>
                </button>
              ))}
            </div>
          )}

          {!isLoading && history.length > 0 && (
             <div style={{ textAlign: 'center', marginTop: '3rem' }} className="animate-fade-in">
                <button className="primary-btn" onClick={resetUniverse} style={{ background: 'transparent', border: '1px solid var(--card-border)', margin: '0 auto', color: 'var(--text-muted)' }}>
                  <RotateCcw size={16} /> Reset Timeline
                </button>
             </div>
          )}

          <div ref={endOfStoryRef} />
        </div>
      )}
    </main>
  );
}
