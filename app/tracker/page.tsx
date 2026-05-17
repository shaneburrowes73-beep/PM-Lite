'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TrackerPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
          router.push('/login')
          return
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data } = await supabase.auth.getSession()

        if (!data?.session) {
          router.push('/login')
        } else {
          setUser(data.session.user)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        await supabase.auth.signOut()
      }
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">PM Lite</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome to PM Lite — Project Governance Tracker</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">RAIDD Entries</h3>
            <p className="text-4xl font-bold text-blue-600">0</p>
            <p className="text-gray-600 text-sm mt-2">Coming in Phase 1</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lessons Learned</h3>
            <p className="text-4xl font-bold text-green-600">0</p>
            <p className="text-gray-600 text-sm mt-2">Coming in Phase 1</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback Score</h3>
            <p className="text-4xl font-bold text-gray-400">—</p>
            <p className="text-gray-600 text-sm mt-2">Coming in Phase 2</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 0 Status ✅ Complete</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Next.js 14 skeleton deployed</li>
            <li>✅ Supabase authentication configured</li>
            <li>✅ Login/signup flow working</li>
            <li>✅ Dashboard accessible after login</li>
            <li>✅ CI/CD pipeline active (GitHub → Vercel)</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Phase 1 Next Steps</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Add RAIDD entry form (Risks, Assumptions, Issues, Dependencies, Decisions)</li>
            <li>• Create lessons learned database UI</li>
            <li>• Build decisions register</li>
            <li>• Add feedback form (10 questions, SMART scoring)</li>
            <li>• Connect to Supabase tables for CRUD operations</li>
            <li>• Estimated effort: 4 weeks, 63 hours</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
