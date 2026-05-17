'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [validSession, setValidSession] = useState<boolean | null>(null)

  // Supabase places the user in a temporary recovery session when they
  // click the reset link. If there's no session, the user landed here
  // without a valid token — show a friendly error.
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setValidSession(Boolean(data.session))
    }
    checkSession()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    // Redirect to login after 3 seconds
    setTimeout(() => router.push('/tracker/login'), 3000)
  }

  if (validSession === null) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-600">
          Checking reset link…
        </div>
      </div>
    )
  }

  if (validSession === false) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Reset link invalid or expired</h1>
          <p className="text-sm text-gray-600">
            This password reset link is no longer valid. Links expire after 1 hour
            or after a successful reset.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/tracker/forgot-password"
              className="block w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 text-center"
            >
              Request a new link
            </Link>
            <Link
              href="/tracker/login"
              className="block w-full text-center text-sm text-blue-600 hover:underline font-medium pt-2"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Password updated</h1>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg text-sm">
            Your password has been changed. Redirecting you to sign in…
          </div>
          <Link
            href="/tracker/login"
            className="block w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 text-center"
          >
            Sign in now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Set a new password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Choose a new password. Minimum 8 characters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
