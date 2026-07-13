import { Globe, Mail, User } from 'lucide-react';

export default function Creator() {
  return (
    <div className="container-fluid animate-fade-in-up">
      <div className="content-page">
        <h1>The Creator</h1>
        <div className="profile-card">
          <div className="profile-avatar">
            <User size={32} color="var(--text-muted)" />
          </div>
          <div className="prose" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <p>
              Hi, I'm Harshith Bohini, the developer behind PathFinder. I built this application as part of the Caarya build sprint to explore the intersection of structured LLM reasoning and immersive frontend design.
            </p>
            <p>
              I am passionate about creating AI-native experiences that go beyond standard chat interfaces, building fully-fledged products that turn curiosity into replayable experiences.
            </p>
          </div>
          
          <div className="social-links">
            <a href="#" className="secondary-btn"><Globe size={18} /> Website</a>
            <a href="#" className="secondary-btn"><User size={18} /> www.linkedin.com/in/harshith-bohini/</a>
            <a href="#" className="secondary-btn"><Mail size={18} /> bohiniharshith@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
