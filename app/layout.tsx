import './globals.css'

export const metadata = {
  title: 'PM Lite',
  description: 'Lightweight portfolio management toolkit for small studios.',
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