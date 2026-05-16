'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const initialize = async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Fetch applications
      try {
        const response = await fetch('/api/applications')
        const data = await response.json()
        setApplications(data.applications || [])
      } catch (err) {
        console.error('Failed to fetch applications', err)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [supabase])

  const handleAssignmentChange = async (appId: string, newAssignee: string | null) => {
    try {
      const response = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_to: newAssignee,
        }),
      })

      if (!response.ok) throw new Error('Failed to update assignment')

      // Refresh applications
      const appResponse = await fetch('/api/applications')
      const appData = await appResponse.json()
      setApplications(appData.applications || [])
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update assignment')
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage team assignments and preferences</p>
      </div>

      {/* Team Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Assignments</h2>

        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No applications to assign
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.description || 'No description'}</p>
                </div>
                <div>
                  <select
                    value={app.assigned_to || ''}
                    onChange={(e) => handleAssignmentChange(app.id, e.target.value || null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Not assigned</option>
                    <option value={user?.id}>{user?.email}</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">User ID</p>
            <p className="text-gray-900 font-mono text-sm">{user?.id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
