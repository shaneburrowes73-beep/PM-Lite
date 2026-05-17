// ============================================================================
// AI Solutions - /api/lessons
// ============================================================================
// GET: returns lessons_entries from the tracker Supabase. Filterable by
//   ?project=<slug> (or 'portfolio-wide' for null) and ?status=<status> (default 'active').
// POST: create new lesson.
// PATCH: update existing lesson (mark superseded, edit fields).
// Auth: every method requires an authenticated tracker user session.
// ============================================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const VALID_STATUSES = ["active", "superseded"] as const;

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectFilter = searchParams.get("project") || undefined;
  const statusFilter = searchParams.get("status") || "active";

  let query = supabase
    .from("lessons_entries")
    .select("*")
    .eq("status", statusFilter)
    .order("date_logged", { ascending: false })
    .order("lesson_id", { ascending: false });

  if (projectFilter === "portfolio-wide") {
    query = query.is("project_id", null);
  } else if (projectFilter) {
    query = query.eq("project_id", projectFilter);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    lessons: data || [],
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

  const required = ["lesson_id", "title", "what_happened", "root_cause", "what_to_do_differently"];
  const missing = required.filter((k) => !body[k] || String(body[k]).trim() === "");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  let docs: string[] | null = null;
  if (Array.isArray(body.standing_docs_changed)) {
    docs = body.standing_docs_changed.map((s: any) => String(s).trim()).filter(Boolean);
  } else if (typeof body.standing_docs_changed === "string" && body.standing_docs_changed.trim()) {
    docs = body.standing_docs_changed
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  const insertPayload = {
    lesson_id: String(body.lesson_id).trim(),
    project_id: body.project_id ? String(body.project_id).trim() : null,
    date_logged: body.date_logged || new Date().toISOString().split("T")[0],
    title: String(body.title).trim(),
    what_happened: String(body.what_happened).trim(),
    root_cause: String(body.root_cause).trim(),
    what_to_do_differently: String(body.what_to_do_differently).trim(),
    raidd_entry_ref: body.raidd_entry_ref || null,
    standing_docs_changed: docs,
    status: "active" as const,
  };

  const { data, error } = await supabase
    .from("lessons_entries")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lesson: data }, { status: 201 });
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
    "title", "what_happened", "root_cause", "what_to_do_differently",
    "raidd_entry_ref", "standing_docs_changed", "status", "superseded_by",
  ];
  const update: Record<string, any> = {};
  for (const k of allowed) {
    if (k in body) update[k] = body[k];
  }

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("lessons_entries")
    .update(update)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lesson: data });
}
