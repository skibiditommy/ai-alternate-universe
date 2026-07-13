import { useState } from 'react';
import { ChevronDown, Briefcase, Heart, Brain, Activity } from 'lucide-react';

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
    <div className={`timeline-node ${isRoot ? 'root-node' : ''} ${probClass}`}>
      <div className="node-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="node-meta">
          <span className="node-year">{node.year}</span>
          {!isRoot && (
            <div className={`probability-badge ${probClass}`}>
              <Activity size={12} strokeWidth={3} />
              <span>{node.probability}%</span>
            </div>
          )}
        </div>
        <h3 className="node-title">{node.title}</h3>
        <div className="node-toggle">
          <div className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}>
             <ChevronDown size={18} />
          </div>
        </div>
      </div>
      
      <div className={`node-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <div className="node-content">
          <div className="content-section">
            <h4><Briefcase size={14} /> Career</h4>
            <p>{node.career}</p>
          </div>
          <div className="content-section">
            <h4><Heart size={14} /> Lifestyle</h4>
            <p>{node.lifestyle}</p>
          </div>
          <div className="content-section">
            <h4><Brain size={14} /> Personality</h4>
            <p>{node.personality}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
