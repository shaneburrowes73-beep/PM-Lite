-- =====================================================================
-- PM Lite — Migration 001: Schema
-- =====================================================================
-- Purpose: Create the core tables PM Lite needs in a buyer's empty
--          Supabase project. Mirrors the AI Solutions tracker schema
--          (verified against the canonical tracker DB on 2026-05-14)
--          so that PM Lite buyers get the same mature schema that
--          powers the AI Solutions portfolio.
--
-- Run order: 001_schema.sql → 002_views.sql → 003_functions.sql →
--            004_feedback_scaffold.sql.
--
-- CRITICAL: This file is PURE DDL. It contains no INSERT statements.
--           It is safe to run on a buyer's empty Supabase project.
--           Demo / seed data lives in seed-OPTIONAL/.
-- =====================================================================

-- ---------------------------------------------------------------------
-- TABLE: raidd_entries
-- Holds Risks, Assumptions, Issues, Dependencies, Decisions, and (legacy)
-- Lessons. Note all enum-like text values are LOWERCASE — the live
-- tracker uses 'risk' not 'Risk'. Do not change without coordinating
-- the UI and views.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.raidd_entries (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            text NOT NULL,                          -- e.g. 'pm-lite', 'service-agent', 'portfolio'
  entry_id              text NOT NULL,                          -- e.g. 'R-001', 'D-014' — unique per (project_id, type)
  type                  text NOT NULL,                          -- risk / assumption / issue / decision / dependency / lesson
  title                 text NOT NULL,
  description           text,
  status                text NOT NULL,                          -- open / active / mitigated / resolved / closed / superseded
  severity              text,                                   -- low / medium / high / critical
  likelihood            text,                                   -- low / medium / high / critical (Risks only)
  owner                 text,
  rationale             text,                                   -- Decisions: why we chose this
  consequences          text,                                   -- Decisions: what follows
  action_or_mitigation  text,                                   -- Risks/Issues: what we do about it
  opened_date           date,
  resolved_date         date,
  last_reviewed_date    date,
  superseded_by         text,                                   -- entry_id that replaces this one
  related_entries       text[],                                 -- cross-references
  source_doc            text,                                   -- path to the doc this came from
  source_url            text,
  metadata              jsonb,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- Composite uniqueness — same entry_id can exist in different projects
ALTER TABLE public.raidd_entries
  DROP CONSTRAINT IF EXISTS raidd_entries_project_id_entry_id_type_key;
ALTER TABLE public.raidd_entries
  ADD CONSTRAINT raidd_entries_project_id_entry_id_type_key
  UNIQUE (project_id, entry_id, type);

-- Check constraints — note lowercase
ALTER TABLE public.raidd_entries
  DROP CONSTRAINT IF EXISTS raidd_entries_type_check;
ALTER TABLE public.raidd_entries
  ADD CONSTRAINT raidd_entries_type_check
  CHECK (type = ANY (ARRAY['risk','assumption','issue','decision','dependency','lesson']));

ALTER TABLE public.raidd_entries
  DROP CONSTRAINT IF EXISTS raidd_entries_severity_check;
ALTER TABLE public.raidd_entries
  ADD CONSTRAINT raidd_entries_severity_check
  CHECK (severity IS NULL OR severity = ANY (ARRAY['low','medium','high','critical']));

ALTER TABLE public.raidd_entries
  DROP CONSTRAINT IF EXISTS raidd_entries_likelihood_check;
ALTER TABLE public.raidd_entries
  ADD CONSTRAINT raidd_entries_likelihood_check
  CHECK (likelihood IS NULL OR likelihood = ANY (ARRAY['low','medium','high','critical']));

-- Indexes (mirror live tracker)
CREATE INDEX IF NOT EXISTS raidd_project_status_idx
  ON public.raidd_entries (project_id, status);

CREATE INDEX IF NOT EXISTS raidd_type_status_idx
  ON public.raidd_entries (type, status);

CREATE INDEX IF NOT EXISTS raidd_owner_open_idx
  ON public.raidd_entries (owner)
  WHERE status <> ALL (ARRAY['resolved','closed','superseded']);

-- RLS — enable. Policies live in 003_functions.sql because they reference
-- the rate-limit machinery for the public append path.
ALTER TABLE public.raidd_entries ENABLE ROW LEVEL SECURITY;


-- ---------------------------------------------------------------------
-- TABLE: lessons_entries
-- Durable lessons that survive projects ending. Separate from RAIDD
-- because the lifecycle is different — a Lesson is propagated into
-- standing docs and SOPs, not resolved-and-closed.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lessons_entries (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id                text NOT NULL UNIQUE,
  project_id               text,                                -- nullable = portfolio-wide
  date_logged              date NOT NULL DEFAULT CURRENT_DATE,
  title                    text NOT NULL,
  what_happened            text NOT NULL,
  root_cause               text NOT NULL,
  what_to_do_differently   text NOT NULL,
  raidd_entry_ref          text,                                -- link to a RAIDD entry_id if applicable
  standing_docs_changed    text[],                              -- doc paths that were updated as a result
  status                   text NOT NULL DEFAULT 'active',      -- active / superseded
  superseded_by            text,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lessons_date     ON public.lessons_entries (date_logged DESC);
CREATE INDEX IF NOT EXISTS idx_lessons_project  ON public.lessons_entries (project_id);
CREATE INDEX IF NOT EXISTS idx_lessons_status   ON public.lessons_entries (status);

ALTER TABLE public.lessons_entries ENABLE ROW LEVEL SECURITY;


-- ---------------------------------------------------------------------
-- TABLE: raidd_append_tokens
-- Project-scoped bearer tokens for autonomous logging (n8n / GitHub
-- Actions / CI). RLS-on with no policies = service-role-only access.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.raidd_append_tokens (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash    text NOT NULL UNIQUE,                         -- bcrypt of the raw token
  project_scope text NOT NULL,                                -- which project can this token log to
  description   text,                                         -- 'n8n iceing webhook' etc.
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_used_at  timestamptz,
  revoked_at    timestamptz
);

CREATE INDEX IF NOT EXISTS idx_raidd_tokens_active
  ON public.raidd_append_tokens (token_hash)
  WHERE revoked_at IS NULL;

ALTER TABLE public.raidd_append_tokens ENABLE ROW LEVEL SECURITY;
-- No policies — service-role-only.


-- ---------------------------------------------------------------------
-- TABLE: raidd_append_rate
-- Sliding-hour rate limit for the append endpoint. Service-role-only.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.raidd_append_rate (
  token_hash    text NOT NULL,
  window_start  timestamptz NOT NULL,
  request_count int NOT NULL DEFAULT 0,
  PRIMARY KEY (token_hash, window_start)
);

CREATE INDEX IF NOT EXISTS idx_raidd_rate_window
  ON public.raidd_append_rate (window_start);

ALTER TABLE public.raidd_append_rate ENABLE ROW LEVEL SECURITY;
-- No policies — service-role-only.


-- =====================================================================
-- End of migration 001. No data has been written. Next: 002_views.sql.
-- =====================================================================
