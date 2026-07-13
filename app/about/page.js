export default function About() {
  return (
    <div className="container-fluid animate-fade-in-up">
      <div className="content-page">
        <h1>How It Works</h1>
        <div className="prose">
          <p>
            <strong>PathFinder</strong> is an AI-powered simulation engine designed to explore <em>"The Road Not Taken."</em> 
            We all have moments in our past where a single decision could have drastically altered the trajectory of our lives. 
            This application allows you to explore those divergent paths safely.
          </p>
          
          <h2>The Multiverse Engine</h2>
          <p>
            Under the hood, PathFinder is powered by the high-performance <strong>Gemini</strong> model by Google.
            When you enter a past decision, the AI acts as a "Timeline Architect", computing a vast branching structure of your life across multiple decades.
          </p>
          
          <h2>How We Simulate Reality</h2>
          <ul>
            <li><strong>Genuine Divergence:</strong> The AI is strictly prompted to ensure that each branch represents a truly different life path—some leading to massive success, others to unexpected pivots, and some to quiet contentment.</li>
            <li><strong>Deep Lore:</strong> A life is more than just a job. The simulation breaks down your alternate reality into three facets: your professional <strong>Career</strong>, your personal <strong>Lifestyle</strong>, and your internal <strong>Personality</strong> evolution.</li>
            <li><strong>Probability Estimation:</strong> Not all paths are equally likely. The engine calculates a logical, defensible probability estimate for each specific timeline branch occurring relative to its siblings, ensuring realistic outcomes.</li>
          </ul>

          <h2>The Architecture</h2>
          <p>
            This application was architected as part of a <strong>Caarya build sprint</strong>, utilizing <strong>Next.js</strong> for the frontend, 
            <strong>React</strong> for the complex recursive tree visualization, and a strict <strong>JSON Schema</strong> pipeline for LLM reasoning to ensure valid data structures.
          </p>
        </div>
      </div>
    </div>
  );
}
