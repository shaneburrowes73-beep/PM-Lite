// ============================================================================
// AI Solutions - /tracker/lessons
// ============================================================================
// Drop this file at: app/tracker/(auth)/lessons/page.tsx
//
// Portfolio-wide lessons-learned list. Uses existing (auth)/layout.tsx for
// auth + nav. Matches /tracker/raidd styling.
//
// Source data: public.lessons_entries (migration 012, 2026-05-13).
// ============================================================================

'use client'

import { useEffect, useState } from 'react'

type Lesson = {
  id: string
  lesson_id: string
  project_id: string | null
  date_logged: string
  title: string
  what_happened: string
  root_cause: string
  what_to_do_differently: string
  raidd_entry_ref: string | null
  standing_docs_changed: string[] | null
  status: string
  superseded_by: string | null
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState<string>('')
  const [showNewModal, setShowNewModal] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (projectFilter) params.set('project', projectFilter)
      const res = await fetch(`/api/lessons?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch lessons')
      const data = await res.json()
      setLessons(data.lessons || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [projectFilter])

  // Build the list of unique projects for the filter dropdown
  const knownProjects = Array.from(
    new Set(lessons.map((l) => l.project_id).filter(Boolean) as string[])
  ).sort()

  if (loading) return <div className="text-center py-8">Loading lessons...</div>
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio lessons learned</h1>
          <p className="text-gray-600">
            Append-only log of what went wrong (or nearly did) and what we now do differently.
            Each lesson is paired with a behaviour change.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex-shrink-0"
        >
          + New lesson
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-3 items-center text-sm">
        <label className="text-gray-700 font-medium">Project:</label>
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5"
        >
          <option value="">All projects</option>
          <option value="portfolio-wide">Portfolio-wide (no project)</option>
          {knownProjects.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <span className="ml-auto text-xs text-gray-500">
          Showing {lessons.length} lesson{lessons.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Lessons list */}
      {lessons.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No lessons match the current filter.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </ul>
      )}

      {showNewModal && (
        <NewLessonModal
          knownProjects={knownProjects}
          nextSuggestedId={`L-${String(lessons.length + 1).padStart(3, '0')}`}
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

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <li className="bg-white rounded-lg shadow p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-800 font-semibold font-mono">
              {lesson.lesson_id}
            </span>
            {lesson.project_id ? (
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                {lesson.project_id}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">portfolio-wide</span>
            )}
            <span className="text-gray-500">
              {new Date(lesson.date_logged).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
            {lesson.raidd_entry_ref && (
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[10px]">
                ↔ {lesson.raidd_entry_ref}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-base font-semibold text-gray-900">{lesson.title}</h3>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">What happened</div>
          <p className="text-gray-700">{lesson.what_happened}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Root cause</div>
          <p className="text-gray-700">{lesson.root_cause}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">What to do differently</div>
          <p className="text-gray-700">{lesson.what_to_do_differently}</p>
        </div>
        {lesson.standing_docs_changed && lesson.standing_docs_changed.length > 0 && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Standing docs updated</div>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {lesson.standing_docs_changed.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        )}
      </div>
    </li>
  )
}

function NewLessonModal({
  knownProjects,
  nextSuggestedId,
  onClose,
  onSaved,
}: {
  knownProjects: string[]
  nextSuggestedId: string
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    lesson_id: nextSuggestedId,
    project_id: '',
    date_logged: new Date().toISOString().split('T')[0],
    title: '',
    what_happened: '',
    root_cause: '',
    what_to_do_differently: '',
    raidd_entry_ref: '',
    standing_docs_changed: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async () => {
    setSubmitError(null)
    const required = ['lesson_id', 'title', 'what_happened', 'root_cause', 'what_to_do_differently'] as const
    const missing = required.filter((k) => !form[k] || form[k].trim() === '')
    if (missing.length > 0) {
      setSubmitError(`Required: ${missing.join(', ')}`)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          project_id: form.project_id || undefined,
          raidd_entry_ref: form.raidd_entry_ref || undefined,
          standing_docs_changed: form.standing_docs_changed || undefined,
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
          <h2 className="text-xl font-bold text-gray-900">New lesson learned</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Lesson ID" required>
            <input
              value={form.lesson_id}
              onChange={(e) => update('lesson_id', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-mono"
              placeholder="L-007"
            />
          </Field>

          <Field label="Date">
            <input
              type="date"
              value={form.date_logged}
              onChange={(e) => update('date_logged', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            />
          </Field>
        </div>

        <Field label="Project (leave blank for portfolio-wide)">
          <input
            list="known-projects-lessons"
            value={form.project_id}
            onChange={(e) => update('project_id', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            placeholder="service-agent — or leave blank"
          />
          <datalist id="known-projects-lessons">
            {knownProjects.map((p) => <option key={p} value={p} />)}
          </datalist>
        </Field>

        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            placeholder="One-sentence title"
          />
        </Field>

        <Field label="What happened" required>
          <textarea
            value={form.what_happened}
            onChange={(e) => update('what_happened', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-20"
            placeholder="Objective description of the incident"
          />
        </Field>

        <Field label="Root cause" required>
          <textarea
            value={form.root_cause}
            onChange={(e) => update('root_cause', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-20"
            placeholder="Why it happened, not just what"
          />
        </Field>

        <Field label="What to do differently" required>
          <textarea
            value={form.what_to_do_differently}
            onChange={(e) => update('what_to_do_differently', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm h-20"
            placeholder="Concrete behaviour change"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="RAIDD entry ref (optional)">
            <input
              value={form.raidd_entry_ref}
              onChange={(e) => update('raidd_entry_ref', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-mono"
              placeholder="e.g. automated-test-tool-I-001"
            />
          </Field>

          <Field label="Standing docs updated (comma-separated)">
            <input
              value={form.standing_docs_changed}
              onChange={(e) => update('standing_docs_changed', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
              placeholder="01_SOP_..., 04_TEMPLATE_..., ai-solutions-vercel-... skill"
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
            {submitting ? 'Saving…' : 'Save lesson'}
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
