import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PM Lite — Project Governance Tracker',
  description: 'Lightweight project governance and decision tracking for product managers.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}