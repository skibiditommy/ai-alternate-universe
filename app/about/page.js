export default function About() {
  return (
    <div className="container-fluid animate-fade-in">
      <article className="content-page">
        <h1>How It Works</h1>
        <div className="prose">
          <p>
            <strong>PathFinder</strong> is an AI simulation engine that explores
            &ldquo;The Road Not Taken.&rdquo; Enter a past decision point, and the
            engine computes a branching tree of alternate life trajectories —
            spanning career outcomes, lifestyle changes, and personality evolution.
          </p>
          
          <h2>Technical Architecture</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LLM Backend</td>
                <td>Groq API — LLaMA 3.3 70B Versatile, sub-second inference</td>
              </tr>
              <tr>
                <td>Framework</td>
                <td>Next.js with React server &amp; client components</td>
              </tr>
              <tr>
                <td>Output Schema</td>
                <td>Strict JSON with <code>response_format: json_object</code> enforcement</td>
              </tr>
              <tr>
                <td>Visualization</td>
                <td>Recursive flexbox tree with horizontal branching layout</td>
              </tr>
              <tr>
                <td>Deployment</td>
                <td>Vercel edge network with serverless API routes</td>
              </tr>
            </tbody>
          </table>

          <h2>Divergence Mechanics</h2>
          <p>
            The prompt engineering enforces three constraints on the LLM output
            to prevent generic &ldquo;AI slop&rdquo; timelines:
          </p>
          <ul>
            <li><strong>Genuine Divergence</strong> — sibling branches must represent
            meaningfully different life outcomes (e.g., success with burnout vs. quiet
            contentment vs. a complete career pivot).</li>
            <li><strong>Multi-faceted Simulation</strong> — each node breaks the
            alternate reality into three orthogonal dimensions: professional career,
            personal lifestyle, and internal personality evolution.</li>
            <li><strong>Calibrated Probability</strong> — the engine assigns probability
            estimates to sibling branches that sum to ~100%, producing a defensible
            likelihood distribution across possible futures.</li>
          </ul>

          <h2>Data Pipeline</h2>
          <p>
            User input flows through a Next.js API route to the Groq inference
            endpoint. The LLM responds with a structured JSON tree, which the
            frontend recursively renders as an interactive, expandable timeline.
            Each node is collapsible and displays career, lifestyle, and personality
            data on demand.
          </p>
        </div>
      </article>
    </div>
  );
}
