import { User } from 'lucide-react';

export default function Creator() {
  return (
    <div className="container-fluid animate-fade-in">
      <article className="content-page">
        <h1>Creator</h1>
        
        <div className="creator-header">
          <div className="profile-avatar">
            <User size={28} color="var(--text-tertiary)" />
          </div>
          <div className="creator-info">
            <span className="creator-name">Harshith Bohini</span>
            <span className="creator-role">Developer &middot; BITS Pilani</span>
          </div>
        </div>

        <div className="prose">
          <p>
            I built PathFinder as part of the Caarya build sprint to explore the
            intersection of structured LLM reasoning and interactive frontend
            design. The goal was to move beyond standard chat interfaces and
            create an AI-native product that turns curiosity into a replayable,
            visual experience.
          </p>
        </div>

        <address>
          <ul className="contact-list">
            <li>
              <span className="contact-label">LinkedIn</span>
              <a href="https://www.linkedin.com/in/harshith-bohini/" className="contact-value" target="_blank" rel="noopener noreferrer">
                harshith-bohini
              </a>
            </li>
            <li>
              <span className="contact-label">Email</span>
              <a href="mailto:bohiniharshith@gmail.com" className="contact-value">
                bohiniharshith@gmail.com
              </a>
            </li>
            <li>
              <span className="contact-label">GitHub</span>
              <a href="https://github.com/skibiditommy" className="contact-value" target="_blank" rel="noopener noreferrer">
                skibiditommy
              </a>
            </li>
          </ul>
        </address>
      </article>
    </div>
  );
}
