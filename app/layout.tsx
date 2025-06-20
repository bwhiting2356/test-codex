import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'AI App',
  description: 'Minimal AI chat app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 p-4">{children}</body>
    </html>
  );
}
