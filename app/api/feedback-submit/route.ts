// Drop at: app/api/feedback-submit/route.ts in the ai-solutions repo
//
// Accepts feedback submissions from any whitelisted feedback project and inserts
// into the named Supabase table using service_role (the table-side trigger then
// computes compliance_score, usability_score, value_add_score, rag_score).
//
// Called by the /feedback page on each feedback project via:
//   POST /api/feedback-submit
//   Body: { table, tester_email, q1_col, q2_col, q3_col, q1, q2, q3, general_feedback? }
//
// The caller passes the SMART-question column names explicitly because they
// differ per project (e.g. q1_delivered_4_modules for bookshelfiq,
// q1_glance_30sec for enterprise_pm_dashboard). Keeping the mapping client-side
// means this endpoint stays slim and doesn't need updating per new project.
//
// Required env vars on ai-solutions Vercel project (already set, used by feedback-status):
//   - NEXT_PUBLIC_SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY  (Production only)

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Allow-list of tables that may be written via this endpoint.
// Mirrors the feedback-status allow-list; keep in sync.
const ALLOWED_TABLES = new Set([
  'ai_lead_generator_feedback',
  'service_business_website_feedback',
  'social_content_pipeline_feedback',
  'voice_recording_transcription_feedback',
  'enterprise_pm_dashboard_feedback',
  'bookshelfiq_feedback',
]);

// Allow-list of column names callers may write to. Defence against injection
// through the q*_col parameters.
const ALLOWED_QUESTION_COLUMNS = new Set([
  // bookshelfiq
  'q1_delivered_4_modules',
  'q2_easy_to_understand',
  'q3_would_use_for_real_book',
  // enterprise_pm_dashboard (per existing schema)
  'q1_glance_30sec',
  'q2_rag_trustworthy',
  'q3_decisions_enabled',
  // ai-lead-generator (per existing schema)
  'q1_leads_in_5min',
  'q2_score_accuracy',
  'q3_daily_adoption',
  // Future projects: add their q*_col names here
]);

function isInt1to10(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 1 && v <= 10;
}

function isValidEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return cors(
        NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
      );
    }

    const {
      table,
      tester_email,
      q1_col,
      q2_col,
      q3_col,
      q1,
      q2,
      q3,
      general_feedback,
    } = body as Record<string, unknown>;

    // Validate table
    if (typeof table !== 'string' || !ALLOWED_TABLES.has(table)) {
      return cors(
        NextResponse.json({ error: `table '${table}' not in allow-list` }, { status: 400 })
      );
    }

    // Validate column names
    for (const [name, col] of [['q1_col', q1_col], ['q2_col', q2_col], ['q3_col', q3_col]] as const) {
      if (typeof col !== 'string' || !ALLOWED_QUESTION_COLUMNS.has(col)) {
        return cors(
          NextResponse.json({ error: `${name} '${col}' not in allow-list` }, { status: 400 })
        );
      }
    }

    // Validate email + scores
    if (!isValidEmail(tester_email)) {
      return cors(NextResponse.json({ error: 'tester_email must be a valid email' }, { status: 400 }));
    }
    if (!isInt1to10(q1)) return cors(NextResponse.json({ error: 'q1 must be an integer 1-10' }, { status: 400 }));
    if (!isInt1to10(q2)) return cors(NextResponse.json({ error: 'q2 must be an integer 1-10' }, { status: 400 }));
    if (!isInt1to10(q3)) return cors(NextResponse.json({ error: 'q3 must be an integer 1-10' }, { status: 400 }));

    if (general_feedback !== undefined && general_feedback !== null) {
      if (typeof general_feedback !== 'string' || general_feedback.length > 5000) {
        return cors(
          NextResponse.json({ error: 'general_feedback must be a string up to 5000 chars' }, { status: 400 })
        );
      }
    }

    const email = tester_email.toLowerCase().trim();

    // Look up tester_id (optional — RLS-bypass via service_role)
    const { data: tester } = await supabase
      .from('tester_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    // Build the insert payload using the caller-supplied column names
    const insertRow: Record<string, unknown> = {
      tester_email: email,
      [q1_col as string]: q1,
      [q2_col as string]: q2,
      [q3_col as string]: q3,
    };
    if (tester?.id) insertRow.tester_id = tester.id;
    if (general_feedback) insertRow.general_feedback = general_feedback;

    // Insert — the table trigger computes compliance_score, usability_score,
    // value_add_score, rag_score automatically.
    const { data: inserted, error: insertErr } = await supabase
      .from(table)
      .insert(insertRow)
      .select('id, compliance_score, usability_score, value_add_score, rag_score')
      .single();

    if (insertErr) {
      return cors(
        NextResponse.json({ error: insertErr.message }, { status: 500 })
      );
    }

    // Compute the composite overall score for the response (table stores the
    // three component scores but not the composite — RAG band is enough on the
    // server side, but returning overall is helpful for the client thank-you UI).
    const overall =
      Number(inserted.compliance_score) * 0.4 +
      Number(inserted.usability_score) * 0.4 +
      Number(inserted.value_add_score) * 0.2;

    return cors(
      NextResponse.json({
        id: inserted.id,
        rag_score: inserted.rag_score,
        overall_score: Number(overall.toFixed(2)),
      })
    );
  } catch (error: unknown) {
    console.error('Feedback submit failed:', error);
    return cors(
      NextResponse.json(
        { error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      )
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
