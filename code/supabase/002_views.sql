-- =====================================================================
-- PM Lite — Migration 002: Views
-- =====================================================================
-- Purpose: Reporting views over raidd_entries and lessons_entries.
--          Mirror the live AI Solutions tracker views verified against
--          the canonical tracker DB on 2026-05-14.
--
-- Depends on: 001_schema.sql must be applied first.
-- This file is PURE DDL.
-- =====================================================================

-- ---------------------------------------------------------------------
-- v_raidd_by_project  — count of entries grouped by project/type/status
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_by_project AS
SELECT
  project_id,
  type,
  status,
  COUNT(*) AS entry_count
FROM public.raidd_entries
GROUP BY project_id, type, status;


-- ---------------------------------------------------------------------
-- v_raidd_open_risks  — actionable risk register
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_open_risks AS
SELECT
  id,
  project_id,
  entry_id,
  title,
  description,
  likelihood,
  severity,
  owner,
  opened_date,
  action_or_mitigation,
  source_doc,
  source_url
FROM public.raidd_entries
WHERE type = 'risk'
  AND status = ANY (ARRAY['open','mitigated']);


-- ---------------------------------------------------------------------
-- v_raidd_open_issues — open issues sorted by severity then age
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_open_issues AS
SELECT
  id,
  project_id,
  entry_id,
  title,
  description,
  severity,
  owner,
  opened_date,
  action_or_mitigation,
  source_doc,
  source_url
FROM public.raidd_entries
WHERE type = 'issue'
  AND status <> ALL (ARRAY['resolved','closed'])
ORDER BY
  CASE severity
    WHEN 'critical' THEN 1
    WHEN 'high'     THEN 2
    WHEN 'medium'   THEN 3
    WHEN 'low'      THEN 4
    ELSE 5
  END,
  opened_date;


-- ---------------------------------------------------------------------
-- v_raidd_active_decisions — decisions not yet superseded
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_active_decisions AS
SELECT
  id,
  project_id,
  entry_id,
  title,
  description,
  rationale,
  consequences,
  owner,
  opened_date
FROM public.raidd_entries
WHERE type = 'decision'
  AND (status = 'active' OR status IS NULL OR status <> 'superseded')
  AND superseded_by IS NULL;


-- ---------------------------------------------------------------------
-- v_raidd_overdue — open entries older than 30 days
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_overdue AS
SELECT
  id,
  project_id,
  entry_id,
  type,
  title,
  status,
  severity,
  owner,
  opened_date,
  (CURRENT_DATE - opened_date) AS days_open
FROM public.raidd_entries
WHERE status <> ALL (ARRAY['resolved','closed','superseded'])
  AND opened_date IS NOT NULL
  AND (CURRENT_DATE - opened_date) > 30;


-- ---------------------------------------------------------------------
-- v_raidd_project_summary — one row per project, headline counts
-- Used by the dashboard RAG widget.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_raidd_project_summary AS
SELECT
  project_id,
  COUNT(*) FILTER (
    WHERE type = 'issue'
      AND status <> ALL (ARRAY['resolved','closed'])
  ) AS open_issues,
  COUNT(*) FILTER (
    WHERE type = 'risk'
      AND status <> ALL (ARRAY['resolved','closed'])
  ) AS open_risks,
  COUNT(*) FILTER (
    WHERE type = 'dependency'
      AND status <> ALL (ARRAY['resolved','closed'])
  ) AS open_dependencies,
  COUNT(*) FILTER (
    WHERE type = 'decision'
      AND superseded_by IS NULL
  ) AS active_decisions,
  COUNT(*) FILTER (
    WHERE type = 'issue'
      AND severity = 'critical'
      AND status <> ALL (ARRAY['resolved','closed'])
  ) AS critical_issues,
  MAX(opened_date) AS last_entry_date
FROM public.raidd_entries
GROUP BY project_id;


-- ---------------------------------------------------------------------
-- v_lessons_by_project — active lessons, most recent first
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_lessons_by_project AS
SELECT
  COALESCE(project_id, 'portfolio-wide') AS scope,
  lesson_id,
  date_logged,
  title,
  what_happened,
  root_cause,
  what_to_do_differently,
  raidd_entry_ref,
  standing_docs_changed,
  status
FROM public.lessons_entries
WHERE status = 'active'
ORDER BY date_logged DESC, lesson_id DESC;


-- =====================================================================
-- End of migration 002.
-- =====================================================================
