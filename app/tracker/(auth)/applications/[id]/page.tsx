'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ApplicationWithItems, OutstandingItem } from '@/lib/tracker/types'
import { STATUS_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '@/lib/tracker/constants'

export default function ApplicationDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [application, setApplication] = useState<ApplicationWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [newItemNextSteps, setNewItemNextSteps] = useState('')
  const [newItemPriority, setNewItemPriority] = useState('MEDIUM')

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`)
        if (!response.ok) throw new Error('Failed to fetch application')
        const data = await response.json()
        setApplication(data.application)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchApplication()
  }, [id])

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/applications/${id}/outstanding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newItemTitle,
          description: newItemDescription,
          next_steps: newItemNextSteps,
          priority: newItemPriority,
        }),
      })

      if (!response.ok) throw new Error('Failed to create item')

      // Refresh application data
      const appResponse = await fetch(`/api/applications/${id}`)
      const appData = await appResponse.json()
      setApplication(appData.application)

      // Reset form
      setNewItemTitle('')
      setNewItemDescription('')
      setNewItemNextSteps('')
      setNewItemPriority('MEDIUM')
      setShowNewItemForm(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create item')
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>
  if (!application) return <div className="text-gray-600">Application not found</div>

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link href="/tracker" className="text-blue-600 hover:text-blue-700">
        ← Back to Dashboard
      </Link>

      {/* Application Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{application.name}</h1>
            {application.description && (
              <p className="text-gray-600 mt-2">{application.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${STATUS_COLORS[application.status] || 'bg-gray-100'}`}>
              {STATUS_LABELS[application.status] || application.status}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${application.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : application.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' : application.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              {PRIORITY_LABELS[application.priority] || application.priority}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          {application.github_url && (
            <div>
              <p className="text-sm font-medium text-gray-700">GitHub</p>
              <a href={application.github_url} target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-700">
                {application.github_url}
              </a>
            </div>
          )}
          {application.url && (
            <div>
              <p className="text-sm font-medium text-gray-700">Live URL</p>
              <a href={application.url} target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-700">
                {application.url}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Outstanding Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Outstanding Items</h2>
          <button
            onClick={() => setShowNewItemForm(!showNewItemForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showNewItemForm ? 'Cancel' : '+ Add Item'}
          </button>
        </div>

        {/* New Item Form */}
        {showNewItemForm && (
          <form onSubmit={handleAddItem} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Outstanding item title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the item"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Steps
                </label>
                <textarea
                  value={newItemNextSteps}
                  onChange={(e) => setNewItemNextSteps(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="What needs to happen next"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newItemPriority}
                  onChange={(e) => setNewItemPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Create Item
              </button>
            </div>
          </form>
        )}

        {/* Items List */}
        {application.outstanding_items && application.outstanding_items.length > 0 ? (
          <div className="space-y-4">
            {application.outstanding_items.map((item: OutstandingItem) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${item.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : item.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' : item.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {PRIORITY_LABELS[item.priority] || item.priority}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                )}

                {item.next_steps && (
                  <div className="bg-blue-50 p-3 rounded mb-2">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Next Steps:</p>
                    <p className="text-sm text-blue-800">{item.next_steps}</p>
                  </div>
                )}

                <div className="flex gap-2 text-xs text-gray-500">
                  <span>Status: {item.status}</span>
                  {item.due_date && <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            No outstanding items yet. Add one to get started.
          </div>
        )}
      </div>
    </div>
  )
}
