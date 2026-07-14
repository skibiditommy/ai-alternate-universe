import './globals.css';
import { Compass } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'PathFinder — The Road Not Taken',
  description: 'Simulate alternate life timelines from past decisions using AI-powered branching narratives.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-wrapper">
          <header className="navbar">
            <nav className="navbar-content">
              <Link href="/" className="logo-area" style={{ textDecoration: 'none' }}>
                <Compass className="logo-icon" size={22} />
                <span className="logo-text">PathFinder</span>
              </Link>
              <div className="nav-links">
                <Link href="/about" className="nav-link">How it Works</Link>
                <Link href="/creator" className="nav-link">Creator</Link>
                <Link href="/" className="nav-link primary">Simulator</Link>
              </div>
            </nav>
          </header>

          <main className="main-content">
            {children}
          </main>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} PathFinder. Built with Next.js &amp; Groq.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
