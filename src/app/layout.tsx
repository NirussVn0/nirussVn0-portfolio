import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PerformanceProvider from '@/components/PerformanceProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Niruss Portfolio - fullstack developer',
  description: 'A visually stunning, high-performance portfolio website showcasing expertise in modern web technologies, clean code, and innovative solutions.',
  keywords: ['fullstack developer', 'react', 'nextjs', 'typescript', 'portfolio', 'web development'],
  authors: [{ name: 'Niruss', url: 'https://github.com/NirussVn0' }],
  creator: 'Niruss',
  publisher: 'Niruss',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio-website-2025.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Niruss Portfolio - fullstack developer',
    description: 'A visually stunning, high-performance portfolio website showcasing expertise in modern web technologies.',
    url: 'https://portfolio-website-2025.vercel.app',
    siteName: 'Niruss Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Niruss Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niruss Portfolio - fullstack developer',
    description: 'A visually stunning, high-performance portfolio website showcasing expertise in modern web technologies.',
    images: ['/og-image.png'],
    creator: '@niruss_dev',
  },
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
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
        suppressHydrationWarning
      >
        <PerformanceProvider>
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
