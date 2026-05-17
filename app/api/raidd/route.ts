// ============================================================================
// AI Solutions - /api/raidd
// ============================================================================
// GET: returns RAIDD entries from the tracker Supabase. Filterable by:
//   ?project=<slug>     - filter to one project
//   ?type=<type>        - filter to risk/assumption/issue/decision/dependency/lesson
//   ?open=1             - only entries that aren't resolved/closed/superseded
//
// POST: insert a new RAIDD entry from the /tracker/raidd New Entry form.
// PATCH: update an existing entry (resolve / change status / add mitigation).
//
// Auth: every method requires an authenticated tracker user session
// (Supabase RLS policies enforce this).
// ============================================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const VALID_TYPES = ["risk", "assumption", "issue", "decision", "dependency", "lesson"] as const;
const VALID_STATUSES = ["open", "in-progress", "resolved", "closed", "superseded"] as const;
const VALID_SEVERITIES = ["low", "medium", "high", "critical"] as const;

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectFilter = searchParams.get("project") || undefined;
  const typeFilter = searchParams.get("type") || undefined;
  const openOnly = searchParams.get("open") === "1";

  let query = supabase
    .from("raidd_entries")
    .select("*")
    .order("opened_date", { ascending: false, nullsFirst: false });

  if (projectFilter) query = query.eq("project_id", projectFilter);
  if (typeFilter)    query = query.eq("type", typeFilter);
  if (openOnly) {
    query = query.not("status", "in", "(resolved,closed,superseded)");
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: summary } = await supabase
    .from("v_raidd_project_summary")
    .select("*");

  return NextResponse.json({
    entries: data || [],
    summary: summary || [],
    count: (data || []).length,
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["project_id", "entry_id", "type", "title", "status"];
  const missing = required.filter((k) => !body[k] || String(body[k]).trim() === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!VALID_TYPES.includes(body.type)) {
    return NextResponse.json(
      { error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
      { status: 400 }
    );
  }
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }
  if (body.severity && !VALID_SEVERITIES.includes(body.severity)) {
    return NextResponse.json(
      { error: `Invalid severity. Must be one of: ${VALID_SEVERITIES.join(", ")}` },
      { status: 400 }
    );
  }

  const insertPayload = {
    project_id: String(body.project_id).trim(),
    entry_id: String(body.entry_id).trim(),
    type: body.type,
    title: String(body.title).trim(),
    description: body.description ? String(body.description).trim() : null,
    status: body.status,
    severity: body.severity || null,
    likelihood: body.likelihood || null,
    owner: body.owner ? String(body.owner).trim() : user.email,
    rationale: body.rationale ? String(body.rationale).trim() : null,
    action_or_mitigation: body.action_or_mitigation
      ? String(body.action_or_mitigation).trim()
      : null,
    opened_date: body.opened_date || new Date().toISOString().split("T")[0],
    source_doc: body.source_doc || null,
    source_url: body.source_url || null,
    metadata: {
      logged_by: user.email,
      logged_at: new Date().toISOString(),
      via: "tracker_ui",
    },
  };

  const { data, error } = await supabase
    .from("raidd_entries")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const allowed = [
    "status", "severity", "likelihood", "owner", "rationale",
    "action_or_mitigation", "resolved_date", "last_reviewed_date",
    "superseded_by", "source_doc", "source_url", "description",
  ];
  const update: Record<string, any> = {};
  for (const k of allowed) {
    if (k in body) update[k] = body[k];
  }

  if (
    (body.status === "resolved" || body.status === "closed") &&
    !("resolved_date" in body)
  ) {
    update.resolved_date = new Date().toISOString().split("T")[0];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("raidd_entries")
    .update(update)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data });
}
