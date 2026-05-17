// app/api/applications/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const PRIORITY_RANK: Record<string, number> = {
  CRITICAL: 1, HIGH: 2, MEDIUM: 3, LOW: 4,
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const sorted = (data || []).sort((a, b) => {
    const rankA = PRIORITY_RANK[a.priority] || 99
    const rankB = PRIORITY_RANK[b.priority] || 99
    if (rankA !== rankB) return rankA - rankB
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return NextResponse.json({ applications: sorted, count: sorted.length })
}
