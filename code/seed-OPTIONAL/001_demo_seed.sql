-- =====================================================================
-- PM Lite — OPTIONAL demo seed
-- =====================================================================
--
-- ┌────────────────────────────────────────────────────────────────┐
-- │  ⚠️  DO NOT RUN THIS FILE AGAINST THE AI SOLUTIONS TRACKER.    │
-- │                                                                 │
-- │  Run only against a buyer's empty Supabase project — after     │
-- │  migrations 001–004 have been applied — to give them a         │
-- │  populated dashboard on day one instead of "no entries yet".   │
-- │                                                                 │
-- │  All sample data uses the project_id 'demo' so it's trivial    │
-- │  to remove later:                                               │
-- │     DELETE FROM public.raidd_entries  WHERE project_id='demo'; │
-- │     DELETE FROM public.lessons_entries WHERE project_id='demo';│
-- └────────────────────────────────────────────────────────────────┘
--
-- Verified safe with the schema produced by 001_schema.sql.
-- =====================================================================

BEGIN;

-- Sanity check: refuse to run if production-looking data exists.
-- A buyer's empty DB has zero rows in raidd_entries. If you're seeing
-- this error, you're trying to seed a populated tracker — stop.
DO $$
DECLARE
  v_existing int;
BEGIN
  SELECT COUNT(*) INTO v_existing FROM public.raidd_entries WHERE project_id <> 'demo';
  IF v_existing > 0 THEN
    RAISE EXCEPTION
      'Refusing to seed: raidd_entries already contains % non-demo rows. This file is for empty DBs only.', v_existing;
  END IF;
END;
$$;

-- --------------------------------------------------------------------
-- Sample RAIDD entries — one of each type, varied severity/status.
-- --------------------------------------------------------------------
INSERT INTO public.raidd_entries (
  project_id, entry_id, type, title, description, status, severity, likelihood,
  owner, rationale, consequences, action_or_mitigation, opened_date
) VALUES
('demo', 'R-001', 'risk',
 'Buyer locks themselves out of Supabase',
 'Tenant admin loses access to their Supabase login and cannot rotate keys.',
 'mitigated', 'medium', 'low',
 'tenant-admin', NULL, NULL,
 'Mandatory backup admin user documented during onboarding. Magic-link recovery enabled.',
 CURRENT_DATE - INTERVAL '14 days'),

('demo', 'A-001', 'assumption',
 'Tenant has their own domain',
 'Onboarding assumes the tenant has a domain to point at Vercel. Some hobbyists do not.',
 'open', NULL, NULL,
 'tenant-admin', NULL, NULL,
 'Offer subdomain on aisolutionsnet.net for tenants without a domain.',
 CURRENT_DATE - INTERVAL '7 days'),

('demo', 'I-001', 'issue',
 'Email reset link redirects to homepage',
 'On a fresh deploy, Supabase password-reset emails land on the homepage with otp_expired in the URL.',
 'resolved', 'high', NULL,
 'tenant-admin', NULL, NULL,
 'Add tenant-domain entries to Supabase Auth Redirect URLs (Step 6 of quickstart). Tested 2026-05-14.',
 CURRENT_DATE - INTERVAL '21 days'),

('demo', 'D-001', 'decision',
 'Use separate Supabase project per tenant',
 'Choosing per-tenant Supabase project over shared-DB-with-RLS.',
 'active', NULL, NULL,
 'tenant-admin',
 'Zero RLS bypass risk; trivial point-in-time recovery per tenant; pricing aligns to Supabase project cost.',
 'Operator maintains N Supabase projects. Acceptable up to ~20 tenants.',
 NULL,
 CURRENT_DATE - INTERVAL '30 days'),

('demo', 'Dep-001', 'dependency',
 'Vercel Pro for custom domains',
 'Tenant must be on Vercel Pro if they need multiple custom domains under one project.',
 'open', 'low', NULL,
 'tenant-admin', NULL, NULL,
 'Document in quickstart cost table.',
 CURRENT_DATE - INTERVAL '5 days');

-- --------------------------------------------------------------------
-- Sample lesson — propagated from a past RAIDD issue.
-- --------------------------------------------------------------------
INSERT INTO public.lessons_entries (
  lesson_id, project_id, date_logged, title,
  what_happened, root_cause, what_to_do_differently,
  raidd_entry_ref, standing_docs_changed, status
) VALUES
('L-DEMO-001', 'demo', CURRENT_DATE - INTERVAL '21 days',
 'Always configure Supabase Auth Redirect URLs before going live',
 'A test reset-password email arrived but landed on the homepage with otp_expired in the URL, blocking first login.',
 'Supabase Auth Site URL and Redirect URLs were left at defaults during deploy — they did not include the tenant domain.',
 'Add Site URL + Redirect URLs check to the deploy checklist before the first user is invited.',
 'I-001',
 ARRAY['docs/02_quickstart.md', 'templates/06_project-checklist.md'],
 'active');

-- --------------------------------------------------------------------
-- Sample feedback responses — three responses to drive a GREEN average.
-- --------------------------------------------------------------------
INSERT INTO public.pm_lite_feedback (
  stage, market, tier_at_time,
  q1_score, q2_score, q3_score, q4_score, q5_score,
  q6_score, q7_score, q8_score, q9_score, q10_score,
  compliance_score, usability_score, value_add_score,
  composite_score, rag_score, general_feedback, status
) VALUES
('beta', 'small-studio', 'Studio',
 100, 100, 60, 100, 100, 75, 100, 75, 50, 100,
 86.7, 93.8, 75.0,
 (86.7 * 0.40) + (93.8 * 0.40) + (75.0 * 0.20),
 'GREEN', 'Solid. Reset-password flow was the only initial hiccup, resolved fast.', 'reviewed'),

('beta', 'solo-founder', 'Self-deploy',
 100, 75, 100, 60, 60, 75, 60, 50, 0, 50,
 91.7, 63.8, 33.3,
 (91.7 * 0.40) + (63.8 * 0.40) + (33.3 * 0.20),
 'AMBER', 'Wanted a kanban view. Templates great, training would help.', 'reviewed'),

('beta', 'agency', 'Agency',
 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
 100, 100, 100,
 100,
 'GREEN', 'Saved 4 hours/week immediately. Pay again, easy.', 'submitted');

COMMIT;

-- =====================================================================
-- Seed complete. Verify with:
--   SELECT type, COUNT(*) FROM public.raidd_entries
--     WHERE project_id='demo' GROUP BY type;
--   SELECT rag_score, COUNT(*) FROM public.pm_lite_feedback GROUP BY rag_score;
--
-- Remove with:
--   DELETE FROM public.raidd_entries   WHERE project_id='demo';
--   DELETE FROM public.lessons_entries WHERE project_id='demo';
--   DELETE FROM public.pm_lite_feedback WHERE stage='beta';
-- =====================================================================
