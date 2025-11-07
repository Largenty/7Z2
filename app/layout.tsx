import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutClient from './LayoutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com';

export const metadata: Metadata = {
  title: {
    default: '7Z2 - Trouve le 722 ! | Jeu de Rapidité et Observation',
    template: '%s | 7Z2',
  },
  description: 'Jeu de rapidité inspiré par Pékin Express. Trouve la case 722 parmi des centaines de 7Z2 le plus vite possible ! 4 niveaux de difficulté, leaderboard, 100% gratuit.',
  keywords: [
    '7Z2',
    '722',
    'jeu de rapidité',
    'jeu d\'observation',
    'jeu en ligne gratuit',
    'Pékin Express',
    'trouve le 722',
    'jeu de réflexes',
    'challenge rapide',
    'leaderboard',
    'jeu gratuit',
    'jeu navigateur',
    'game',
  ],
  authors: [{ name: 'Ludovic Argenty', url: 'https://ludovicargenty.com' }],
  creator: 'Ludovic Argenty',
  publisher: 'Ludovic Argenty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph (Facebook, Discord, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: '7Z2 - Trouve le 722',
    title: '7Z2 - Trouve le 722 ! | Jeu de Rapidité',
    description: 'Trouve la case 722 parmi des centaines de 7Z2 le plus vite possible ! Jeu inspiré par Pékin Express. Gratuit, 4 niveaux de difficulté.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: '7Z2 - Trouve le 722',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '7Z2 - Trouve le 722 !',
    description: 'Jeu de rapidité : trouve le 722 parmi les 7Z2 ! Gratuit, 4 niveaux, leaderboard.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@ludovicargenty', // Remplacer par ton Twitter si tu en as un
  },

  // Icônes et Manifeste PWA
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/manifest.json',

  // Robots et indexation
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Métadonnées additionnelles
  alternates: {
    canonical: siteUrl,
  },

  category: 'games',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
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
