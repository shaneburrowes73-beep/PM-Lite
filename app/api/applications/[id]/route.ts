// app/api/applications/[id]/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const ALLOWED_PATCH_FIELDS = [
  'assigned_to', 'status', 'priority', 'name', 'description', 'url', 'github_url',
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const id = params.id

  const { data: application, error: appError } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()

  if (appError) {
    if (appError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    return NextResponse.json({ error: appError.message }, { status: 500 })
  }

  const { data: items, error: itemsError } = await supabase
    .from('outstanding_items')
    .select('*')
    .eq('application_id', id)
    .order('priority', { ascending: true })
    .order('created_at', { ascending: false })

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  let assigned_member = null
  if (application.assigned_to) {
    const { data: member } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', application.assigned_to)
      .single()
    assigned_member = member ?? null
  }

  return NextResponse.json({
    application: {
      ...application,
      outstanding_items: items ?? [],
      assigned_member,
    },
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const id = params.id
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  for (const key of ALLOWED_PATCH_FIELDS) {
    if (key in body) {
      updates[key] = body[key]
    }
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ application: data })
}
