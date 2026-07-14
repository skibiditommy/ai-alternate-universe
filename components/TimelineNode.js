import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TimelineNode({ node, isRoot = false }) {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const getProbabilityClass = (prob) => {
    if (isRoot) return 'prob-root';
    if (prob >= 70) return 'prob-high';
    if (prob >= 30) return 'prob-medium';
    return 'prob-low';
  };

  const probClass = getProbabilityClass(node.probability);

  return (
    <div className={`timeline-node ${probClass}`}>
      <div
        className="node-header"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(!isExpanded); }}}
      >
        <div className="node-meta">
          <span className="node-year">{node.year}</span>
          {!isRoot && (
            <div className={`probability-indicator ${probClass}`}>
              <span className="prob-dot"></span>
              <span>{node.probability}%</span>
            </div>
          )}
        </div>
        <h3 className="node-title">{node.title}</h3>
        <div className="node-toggle">
          <div className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}>
             <ChevronDown size={16} />
          </div>
        </div>
      </div>
      
      <div className={`node-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <div className="node-content">
          <div className="content-section">
            <h4>Career</h4>
            <p>{node.career}</p>
          </div>
          <div className="content-section">
            <h4>Lifestyle</h4>
            <p>{node.lifestyle}</p>
          </div>
          <div className="content-section">
            <h4>Personality</h4>
            <p>{node.personality}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
