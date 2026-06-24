
import type {Metadata, Viewport} from 'next';
import './globals.css';
import {Navigation} from '@/components/Navigation';
import {Toaster} from '@/components/ui/toaster';
import {AudioProvider} from '@/context/AudioContext';
import {MiniPlayer} from '@/components/MiniPlayer';

export const metadata: Metadata = {
  title: 'Radio RCS Sicilia - I Grandi Successi',
  description: 'Radio RCS Sicilia è una storica emittente radiofonica locale siciliana, ascoltata a livello Nazionale e Internazionale grazie allo streaming ufficiale.',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Radio RCS',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Radio RCS',
  }
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo-rcs.jpg" />
        <link rel="apple-touch-icon" href="/logo-rcs.jpg" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background selection:bg-accent selection:text-accent-foreground pb-20 sm:pb-0">
        <AudioProvider>
          <Navigation />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <MiniPlayer />
          <Toaster />
        </AudioProvider>
      </body>
    </html>
  );
}
