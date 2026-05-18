// @ts-nocheck
// app/api/applications/[id]/outstanding/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'


export const dynamic = 'force-dynamic'


const VALID_PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']


export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }


  const application_id = params.id
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }


  const title = typeof body.title === 'string' ? body.title.trim() : ''
  if (!title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }


  const priority = typeof body.priority === 'string' ? body.priority : 'MEDIUM'
  if (!VALID_PRIORITIES.includes(priority)) {
    return NextResponse.json(
      { error: 'priority must be one of: ' + VALID_PRIORITIES.join(', ') },
      { status: 400 }
    )
  }


  const description = typeof body.description === 'string' ? body.description : null
  const next_steps = typeof body.next_steps === 'string' ? body.next_steps : null


  const { data: parent, error: parentError } = await supabase
    .from('applications')
    .select('id')
    .eq('id', application_id)
    .single()


  if (parentError || !parent) {
    return NextResponse.json({ error: 'Parent application not found' }, { status: 404 })
  }


  const { data, error } = await supabase
    .from('outstanding_items')
    .insert({
      application_id,
      title,
      description,
      priority,
      next_steps,
      status: 'OPEN',
    })
    .select()
    .single()


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }


  return NextResponse.json({ item: data }, { status: 201 })
}
