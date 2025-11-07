import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutClient from './LayoutClient';

export const metadata: Metadata = {
  title: '7Z2 - Trouve le 722 !',
  description: 'Trouve la case "722" le plus vite possible parmi les "7Z2"',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
