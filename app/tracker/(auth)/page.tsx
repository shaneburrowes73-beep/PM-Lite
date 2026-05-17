'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Application } from '@/lib/tracker/types'
import { STATUS_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '@/lib/tracker/constants'

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications')
        if (!response.ok) throw new Error('Failed to fetch applications')
        const data = await response.json()
        setApplications(data.applications || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) return <div className="text-center py-8">Loading applications...</div>
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications & Projects</h1>
        <p className="text-gray-600">Track status, outstanding items, and assignments</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No applications found. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Link key={app.id} href={`/tracker/applications/${app.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{app.name}</h2>

                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[app.status] || 'bg-gray-100'}`}>
                    {STATUS_LABELS[app.status] || app.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : app.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' : app.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {PRIORITY_LABELS[app.priority] || app.priority}
                  </span>
                </div>

                {app.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>
                )}

                {app.github_url && (
                  <p className="text-xs text-blue-600 truncate mb-4">
                    <a href={app.github_url} target="_blank" rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}>
                      GitHub →
                    </a>
                  </p>
                )}

                <div className="text-xs text-gray-500">
                  Click to view details and outstanding items
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
