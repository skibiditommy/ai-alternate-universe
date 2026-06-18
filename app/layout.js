import './globals.css';

export const metadata = {
  title: 'AI Alternate Universe Generator',
  description: 'Explore alternate life paths based on past choices with AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
