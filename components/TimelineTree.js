import TimelineNode from './TimelineNode';

export default function TimelineTree({ data }) {
  if (!data) return null;

  const renderTree = (node, isRoot = false) => {
    return (
      <div className="tree-node-container" key={node.id}>
        <div className="tree-node-content">
          <TimelineNode node={node} isRoot={isRoot} />
        </div>
        {node.branches && node.branches.length > 0 && (
          <div className="tree-branches">
            {node.branches.map(branch => renderTree(branch, false))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="timeline-tree-wrapper">
      {renderTree(data, true)}
    </div>
  );
}
