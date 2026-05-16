-- =====================================================================
-- PM Lite — Migration 004: Feedback scaffold
-- =====================================================================
-- Purpose: Per-product feedback table for PM Lite tenant deployments.
--          Follows the live AI Solutions per-product model (each product
--          has its own *_feedback table, e.g. pm_lite_feedback,
--          service_agent_feedback) rather than a single feedback_responses
--          table.
--
-- Why per-product? Verified live shape on 2026-05-14 — every artefact
-- ships its own feedback table with 10 question scores, 3 sub-scores,
-- composite, and RAG. This keeps feedback isolated per artefact, supports
-- different question wording per artefact, and matches the existing
-- dashboard queries.
--
-- Depends on: 001_schema.sql, 003_functions.sql (touch_updated_at).
-- This file is PURE DDL. The 10 SMART questions PM Lite asks its own
-- users are defined as docs in:
--   feedback-scaffold/pm-lite-questions-registry.md
-- and are surfaced by the application code, not seeded into a live table.
-- =====================================================================

-- ---------------------------------------------------------------------
-- TABLE: pm_lite_feedback
-- One row per submitted feedback response.
-- Compliance 40% + Usability 40% + Value Add 20% — composite enforced
-- by application code on insert (matches live tracker behaviour).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pm_lite_feedback (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id         uuid,                                     -- groups responses from the same browsing session
  tester_id          uuid,                                     -- stable across sessions if user has an account
  stage              text NOT NULL,                            -- 'alpha' / 'beta' / 'released' / etc.
  market             text,                                     -- target market the tester represents
  tier_at_time       text,                                     -- which pricing tier this tester is on
  q1_score           int,                                      -- C1 (Compliance — coverage)
  q2_score           int,                                      -- C2 (Compliance — data integrity)
  q3_score           int,                                      -- C3 (Compliance — isolation)
  q4_score           int,                                      -- U1 (Usability — trainability)
  q5_score           int,                                      -- U2 (Usability — missing features)
  q6_score           int,                                      -- U3 (Usability — speed)
  q7_score           int,                                      -- U4 (Usability — templates)
  q8_score           int,                                      -- V1 (Value Add — time saved)
  q9_score           int,                                      -- V2 (Value Add — cross-project lesson reuse)
  q10_score          int,                                      -- V3 (Value Add — would re-buy)
  compliance_score   numeric,                                  -- avg(q1..q3)
  usability_score    numeric,                                  -- avg(q4..q7)
  value_add_score    numeric,                                  -- avg(q8..q10)
  composite_score    numeric,                                  -- 0.4*comp + 0.4*usab + 0.2*value
  rag_score          text,                                     -- 'GREEN' (>=75) / 'AMBER' (50-74) / 'RED' (<50)
  general_feedback   text,
  status             text DEFAULT 'submitted',                 -- 'submitted' / 'reviewed' / 'actioned'
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pm_lite_feedback_stage     ON public.pm_lite_feedback (stage);
CREATE INDEX IF NOT EXISTS idx_pm_lite_feedback_rag       ON public.pm_lite_feedback (rag_score);
CREATE INDEX IF NOT EXISTS idx_pm_lite_feedback_created   ON public.pm_lite_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pm_lite_feedback_session   ON public.pm_lite_feedback (session_id);

-- Auto-update trigger (reuses touch_updated_at from 003)
DROP TRIGGER IF EXISTS trg_pm_lite_feedback_touch ON public.pm_lite_feedback;
CREATE TRIGGER trg_pm_lite_feedback_touch
  BEFORE UPDATE ON public.pm_lite_feedback
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.pm_lite_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous testers) can submit feedback
DROP POLICY IF EXISTS pm_lite_feedback_insert_public ON public.pm_lite_feedback;
CREATE POLICY pm_lite_feedback_insert_public ON public.pm_lite_feedback
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated tenant users can read the responses (dashboard)
DROP POLICY IF EXISTS pm_lite_feedback_select_auth ON public.pm_lite_feedback;
CREATE POLICY pm_lite_feedback_select_auth ON public.pm_lite_feedback
  FOR SELECT TO authenticated
  USING (true);


-- ---------------------------------------------------------------------
-- VIEW: pm_lite_feedback_summary
-- One row, used by the dashboard RAG widget.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.pm_lite_feedback_summary AS
SELECT
  COUNT(*)                                            AS response_count,
  ROUND(AVG(compliance_score)::numeric, 1)            AS compliance_avg,
  ROUND(AVG(usability_score)::numeric, 1)             AS usability_avg,
  ROUND(AVG(value_add_score)::numeric, 1)             AS value_add_avg,
  ROUND(AVG(composite_score)::numeric, 1)             AS composite_avg,
  CASE
    WHEN AVG(composite_score) >= 75 THEN 'GREEN'
    WHEN AVG(composite_score) >= 50 THEN 'AMBER'
    ELSE 'RED'
  END                                                 AS rag_band,
  MAX(created_at)                                     AS last_response_at
FROM public.pm_lite_feedback;


-- =====================================================================
-- End of migration 004. No data has been written.
-- =====================================================================
