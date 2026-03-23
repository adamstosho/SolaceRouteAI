import type { Metadata, Viewport } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TripProvider } from '@/lib/tripContext'
import { AppToaster } from '@/components/AppToaster'
import { TripBottomNav } from '@/components/TripBottomNav'
import { DmoBottomNav } from '@/components/DmoBottomNav'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1D9E75',
}

export const metadata: Metadata = {
  title: 'SolaceRouteAI - Smart Urban Navigation',
  description:
    'Navigate cities intelligently and reduce overcrowding with AI-powered route optimization',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'SolaceRouteAI',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body className="font-sans antialiased">
        <TripProvider>
          {children}
          <TripBottomNav />
          <DmoBottomNav />
          <AppToaster />
        </TripProvider>
        <Analytics />
      </body>
    </html>
  )
}
