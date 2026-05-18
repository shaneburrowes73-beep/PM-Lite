'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function TrackerShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me')
      setIsLoggedIn(res.ok)
    }
    checkAuth()
  }, [])

  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <header className="border-b">
        <nav className="p-4 flex justify-between">
          <Link href="/tracker">Dashboard</Link>
          <button onClick={() => { router.push('/login') }}>
            Logout
          </button>
        </nav>
      </header>
      {children}
    </div>
  )
}
