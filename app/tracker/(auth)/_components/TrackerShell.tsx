'use client'
<<<<<<< HEAD
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
=======

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function TrackerShell({
    children,
}: {
    children: React.ReactNode
}) {
            // @ts-ignore
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

  useEffect(() => {
        const getUser = async () => {
                const { data: { user } } = await supabase.auth.getUser()
                                // @ts-ignore    
            setUser(user)
                setLoading(false)
        }
        getUser()
  }, [supabase])

  const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/tracker/login')
  }

  if (loading) {
        return (
                <div className="min-h-screen flex items-center justify-center">
                        <div className="text-gray-600">Loading...</div>
                </div>
              )
  }
  
    return (
          <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                                  <Link href="/tracker" className="text-2xl font-bold text-gray-900">
                                              AI Solutions Tracker
                                  </Link>
                                  <nav className="flex gap-4 items-center">
                                              <Link href="/tracker" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                                              <Link href="/tracker/raidd" className="text-gray-600 hover:text-gray-900">RAIDD</Link>
                                              <Link href="/tracker/lessons" className="text-gray-600 hover:text-gray-900">Lessons</Link>
                                              <Link href="/tracker/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
                                    {user && (
                          <button
                                            onClick={handleLogout}
                                            className="text-gray-600 hover:text-gray-900"
                                          >
                                          Logout
                          </button>
                                              )}
                                  </nav>
                        </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
          </div>
        )
>>>>>>> 54991a77d8f4ce8694e7b74e15c4a7be268bf59d
}
