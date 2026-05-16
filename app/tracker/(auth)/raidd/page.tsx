// ============================================================================
// AI Solutions - /tracker/raidd
// ============================================================================
// Drop this file at: app/tracker/(auth)/raidd/page.tsx
//
// Portfolio-wide RAIDD list. Uses existing (auth)/layout.tsx for auth + nav.
// Matches existing dashboard page styling (Tailwind, white cards on gray-50).
//
// Updated 2026-05-13 afternoon: adds NewEntryModal (Phase 2 New Entry form)
// and inline Resolve button on each open entry.
// ============================================================================

'use client'

import { useEffect, useState, useMemo } from 'react'

type RaiddEntry = {
  id: string
  project_id: string
  entry_id: string
  type: 'risk' | 'assumption' | 'issue' | 'decision' | 'dependency' | 'lesson'
  title: string
  description: string | null
  status: string
  severity: 'low' | 'medium' | 'high' | 'critical' | null
  likelihood: string | null
  owner: string | null
  rationale: string | null
  action_or_mitigation: string | null
  opened_date: string | null
  resolved_date: string | null
  source_doc: string | null
  source_url: string | null
}

type ProjectSummary = {
  project_id: string
  open_issues: number
  open_risks: number
  open_dependencies: number
  active_decisions: number
  critical_issues: number
}

const TYPE_COLORS: Record<string, string> = {
  risk:       'bg-red-100 text-red-800',
  assumption: 'bg-purple-100 text-purple-800',
  issue:      'bg-amber-100 text-amber-800',
  decision:   'bg-blue-100 text-blue-800',
  dependency: 'bg-emerald-100 text-emerald-800',
  lesson:     'bg-violet-100 text-violet-800',
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-red-700 text-white',
  high:     'bg-red-500 text-white',
  medium:   'bg-amber-500 text-white',
  low:      'bg-gray-300 text-gray-800',
}

export default function RaiddPage() {
  const [entries, setEntries] = useState<RaiddEntry[]>([])
  const [summary, setSummary] = useState<ProjectSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [openOnly, setOpenOnly] = useState<boolean>(true)
  const [showNewModal, setShowNewModal] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (projectFilter) params.set('project', projectFilter)
      if (typeFilter) params.set('type', typeFilter)
      if (openOnly) params.set('open', '1')
      const res = await fetch(`/api/raidd?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch RAIDD entries')
      const data = await res.json()
      setEntries(data.entries || [])
      setSummary(data.summary || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [projectFilter, typeFilter, openOnly])

  const grouped = useMemo(() => {
    const map = new Map<string, RaiddEntry[]>()
    for (const e of entries) {
      if (!map.has(e.project_id)) map.set(e.project_id, [])
      map.get(e.project_id)!.push(e)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [entries])

  const totals = useMemo(() => summary.reduce(
    (acc, r) => ({
      open_issues: acc.open_issues + Number(r.open_issues || 0),
      open_risks: acc.open_risks + Number(r.open_risks || 0),
      open_dependencies: acc.open_dependencies + Number(r.open_dependencies || 0),
      active_decisions: acc.active_decisions + Number(r.active_decisions || 0),
      critical_issues: acc.critical_issues + Number(r.critical_issues || 0),
    }),
    { open_issues: 0, open_risks: 0, open_dependencies: 0, active_decisions: 0, critical_issues: 0 }
  ), [summary])

  if (loading) return <div className="text-center py-8">Loading RAIDD...</div>
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio RAIDD</h1>
          <p className="text-gray-600">
            Risks, Assumptions, Issues, Decisions, Dependencies and Lessons across every project.
            Single source of truth — replaces the flat-file RAIDD logs.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex-shrink-0"
        >
          + New entry
        </button>
      </div>

      {/* Headline summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard label="Open issues"       value={totals.open_issues} />
        <SummaryCard label="Critical"          value={totals.critical_issues} highlight={totals.critical_issues > 0} />
        <SummaryCard label="Open risks"        value={totals.open_risks} />
        <SummaryCard label="Open dependencies" value={totals.open_dependencies} />
        <SummaryCard label="Active decisions"  value={totals.active_decisions} />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-3 items-center text-sm">
        <label className="text-gray-700 font-medium">Filters:</label>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5"
        >
          <option value="">All projects</option>
          {summary.map((s) => (
            <option key={s.project_id} value={s.project_id}>{s.project_id}</option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5"
        >
          <option value="">All types</option>
          <option value="risk">Risks</option>
          <option value="assumption">Assumptions</option>
          <option value="issue">Issues</option>
          <option value="decision">Decisions</option>
          <option value="dependency">Dependencies</option>
          <option value="lesson">Lessons</option>
        </select>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(e) => setOpenOnly(e.target.checked)}
            className="rounded"
          />
          Open only
        </label>

        <span className="ml-auto text-xs text-gray-500">
          Showing {entries.length} entr{entries.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      {/* Entries grouped by project */}
      {entries.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No entries match the current filters.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([projectId, projectEntries]) => (
            <section key={projectId}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {projectId}{' '}
                <span className="text-sm font-normal text-gray-500">
                  ({projectEntries.length})
                </span>
              </h2>
              <ul className="space-y-3">
                {projectEntries.map((e) => (
                  <RaiddRow key={e.id} entry={e} onChanged={fetchData} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {showNewModal && (
        <NewEntryModal
          knownProjects={summary.map((s) => s.project_id)}
          onClose={() => setShowNewModal(false)}
          onSaved={() => {
            setShowNewModal(false)
            fetchData()
          }}
        />
      )}
    </div>
  )
}

function SummaryCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 text-center ${highlight ? 'ring-2 ring-red-300' : ''}`}>
      <div className={`text-3xl font-bold ${value > 0 && label.includes('Critical') ? 'text-red-700' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{label}</div>
    </div>
  )
}

function RaiddRow({ entry, onChanged }: { entry: RaiddEntry; onChanged: () => void }) {
  const [resolving, setResolving] = useState(false)
  const typeColor = TYPE_COLORS[entry.type] || 'bg-gray-100 text-gray-700'
  const severityColor = entry.severity ? SEVERITY_COLORS[entry.severity] : null
  const isOpen = !['resolved', 'closed', 'superseded'].includes(entry.status)
  const statusColor = ['resolved', 'closed'].includes(entry.status)
    ? 'bg-emerald-100 text-emerald-800'
    : entry.status === 'superseded'
    ? 'bg-gray-100 text-gray-500'
    : 'bg-amber-100 text-amber-800'

  const resolve = async () => {
    if (!confirm(`Mark ${entry.entry_id} as resolved?`)) return
    setResolving(true)
    try {
      const res = await fetch('/api/raidd', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry.id, status: 'resolved' }),
      })
      if (!res.ok) {
        const j = await res.json()
        alert(`Failed: ${j.error || 'Unknown error'}`)
      } else {
        onChanged()
      }
    } finally {
      setResolving(false)
    }
  }

  return (
    <li className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded font-semibold ${typeColor}`}>{entry.type}</span>
            <span className="font-mono text-gray-500">{entry.entry_id}</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold ${statusColor}`}>{entry.status}</span>
            {severityColor && (
              <span className={`px-2 py-0.5 rounded-full font-semibold ${severityColor}`}>{entry.severity}</span>
            )}
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">{entry.title}</h3>
          {entry.description && <p className="mt-1 text-sm text-gray-700">{entry.description}</p>}
          {entry.action_or_mitigation && (
            <p className="mt-1 text-xs text-gray-600">
              <span className="font-semibold text-gray-700">Action:</span> {entry.action_or_mitigation}
            </p>
          )}
          {entry.rationale && (
            <p className="mt-1 text-xs text-gray-600">
              <span className="font-semibold text-gray-700">Why:</span> {entry.rationale}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-right text-xs text-gray-500 space-y-1">
          {entry.owner && <div className="font-medium text-gray-700">{entry.owner}</div>}
          {entry.opened_date && (
            <div>opened {new Date(entry.opened_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          )}
          {entry.resolved_date && (
            <div className="text-emerald-600">resolved {new Date(entry.resolved_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
          )}
          {isOpen && (
            <button
              onClick={resolve}
              disabled={resolving}
              className="mt-2 text-xs bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-2 py-1 rounded"
            >
              {resolving ? 'Resolving…' : 'Resolve'}
            </button>
          )}
        </div>
      </div>
      {entry.source_doc && (
        <div className="mt-2 text-[10px] uppercase tracking-wide text-gray-400">
          src:{' '}
          {entry.source_url ? (
            <a href={entry.source_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {entry.source_doc}
            </a>
          ) : (
            entry.source_doc
          )}
        </div>
      )}
    </li>
  )
}

// ----------------------------------------------------------------------------
// NewEntryModal — Phase 2 New Entry form (2026-05-13)
// ----------------------------------------------------------------------------
function NewEntryModal({
  knownProjects,
  onClose,
  onSaved,
}: {
  knownProjects: string[]
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    project_id: knownProjects[0] || '',
    entry_id: '',
    type: 'risk' as RaiddEntry['type'],
    title: '',
    description: '',
    status: 'open',
    severity: '',
    owner: '',
    rationale: '',
    action_or_mitigation: '',
    source_doc: '',
    source_url: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  useEffect(() => {
    if (form.project_id && form.type && !form.entry_id) {
      const typeInitial = form.type[0].toUpperCase()
      setForm((f) => ({ ...f, entry_id: `${f.project_id}-${typeInitial}-XXX` }))
    }
  }, [form.project_id, form.type])

  const submit = async () => {
    setSubmitError(null)
    if (!form.project_id || !form.entry_id || !form.title) {
      setSubmitError('project_id, entry_id, and title are required')
      return
    }
    if (form.entry_id.includes('XXX')) {
      setSubmitError('Replace XXX in entry_id with a number (e.g. 001)')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/raidd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          severity: form.severity || undefined,
          description: form.description || undefined,
          owner: form.owner || undefined,
          rationale: form.rationale || undefined,
          action_or_mitigation: form.action_or_mitigation || undefined,
          source_doc: form.source_doc || undefined,
          source_url: form.source_url || undefined,
        }),
      })
      if (!res.ok) {
        const j = await res.json()
        setSubmitError(j.error || `Request failed (${res.status})`)
      } else {
        onSaved()
      }
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-900">New RAIDD entry</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Project (slug)" required>
            <input
              list="known-projects"
              value={form.project_id}
              onChange={(e) => update('project_id', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
              placeholder="service-agent"
            />
            <datalist id="known-projects">
              {knownProjects.map((p) => <option key={p} value={p} />)}
            </datalist>
          </Field>

          <Field label="Type" required>
            <select
              value={form.type}
              onChange={(e) => update('type', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="risk">Risk</option>
              <option value="assumption">Assumption</option>
              <option value="issue">Issue</option>
              <option value="decision">Decision</option>
              <option value="dependency">Dependency</option>
              <option value="lesson">Lesson</option>
            </select>
          </Field>

          <Field label="Entry ID" required>
            <input
              value={form.entry_id}
              onChange={(e) => update('entry_id', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-mono"
              placeholder="service-agent-R-008"
            />
          </Field>

          <Field label="Status" required>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="open">open</option>
              <option value="in-progress">in-progress</option>
              <option value="resolved">resolved</option>
              <option value="closed">closed</option>
              <option value="superseded">superseded</option>
            </select>
          </Field>
        </div>

        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            placeholder="One-line summary"
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-20"
            placeholder="Context — 2-5 sentences"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Severity (risk/issue only)">
            <select
              value={form.severity}
              onChange={(e) => update('severity', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="">—</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </Field>

          <Field label="Owner">
            <input
              value={form.owner}
              onChange={(e) => update('owner', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
              placeholder="Shane (default = your email)"
            />
          </Field>
        </div>

        <Field label="Action / mitigation">
          <textarea
            value={form.action_or_mitigation}
            onChange={(e) => update('action_or_mitigation', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-16"
            placeholder="What we're doing about it"
          />
        </Field>

        <Field label="Rationale (decisions only)">
          <textarea
            value={form.rationale}
            onChange={(e) => update('rationale', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-16"
            placeholder="Why this option was chosen"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Source doc">
            <input
              value={form.source_doc}
              onChange={(e) => update('source_doc', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
              placeholder="optional"
            />
          </Field>
          <Field label="Source URL">
            <input
              value={form.source_url}
              onChange={(e) => update('source_url', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
              placeholder="optional"
            />
          </Field>
        </div>

        {submitError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{submitError}</div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold"
          >
            {submitting ? 'Saving…' : 'Save entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </div>
      {children}
    </label>
  )
}
