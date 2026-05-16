-- =====================================================================
-- PM Lite — Migration 003: Functions, triggers, RLS policies
-- =====================================================================
-- Purpose: Auto-update timestamps, append-endpoint rate limiting,
--          and the RLS policy set for the buyer's tenant.
--
-- Depends on: 001_schema.sql must be applied first.
-- This file is PURE DDL.
-- =====================================================================

-- ---------------------------------------------------------------------
-- FUNCTION: touch_updated_at
-- Generic trigger function — bumps updated_at on any UPDATE.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


-- ---------------------------------------------------------------------
-- Triggers — attach touch_updated_at() to the relevant tables
-- ---------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_raidd_touch ON public.raidd_entries;
CREATE TRIGGER trg_raidd_touch
  BEFORE UPDATE ON public.raidd_entries
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_lessons_touch ON public.lessons_entries;
CREATE TRIGGER trg_lessons_touch
  BEFORE UPDATE ON public.lessons_entries
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();


-- ---------------------------------------------------------------------
-- FUNCTION: raidd_check_and_increment_rate
-- Sliding-hour rate limit for the append endpoint. Returns true if the
-- caller is under the limit (and was incremented), false if rate-limited.
--
-- Usage from the Next.js append route:
--   SELECT raidd_check_and_increment_rate('<bcrypt-hash>', 60);
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.raidd_check_and_increment_rate(
  p_token_hash     text,
  p_limit_per_hour int DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_window timestamptz := date_trunc('hour', now());
  v_count  int;
BEGIN
  INSERT INTO public.raidd_append_rate (token_hash, window_start, request_count)
  VALUES (p_token_hash, v_window, 1)
  ON CONFLICT (token_hash, window_start)
  DO UPDATE SET request_count = public.raidd_append_rate.request_count + 1
  RETURNING request_count INTO v_count;

  RETURN v_count <= p_limit_per_hour;
END;
$$;


-- =====================================================================
-- RLS Policies
-- =====================================================================
-- Model: authenticated users can read + write their tenant's data.
--        anonymous callers cannot read raidd_entries / lessons_entries.
--        raidd_append_tokens and raidd_append_rate stay service-role-only.
--
-- For multi-tenant deployments where one Supabase project hosts several
-- tenants, replace the `USING (true)` predicates below with predicates
-- that match auth.uid() to a tenant column. The default policies below
-- assume one Supabase project per tenant (the documented PM Lite model).
-- =====================================================================

-- raidd_entries policies
DROP POLICY IF EXISTS raidd_select_auth ON public.raidd_entries;
CREATE POLICY raidd_select_auth ON public.raidd_entries
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS raidd_insert_auth ON public.raidd_entries;
CREATE POLICY raidd_insert_auth ON public.raidd_entries
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS raidd_update_auth ON public.raidd_entries;
CREATE POLICY raidd_update_auth ON public.raidd_entries
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- lessons_entries policies
DROP POLICY IF EXISTS lessons_select_auth ON public.lessons_entries;
CREATE POLICY lessons_select_auth ON public.lessons_entries
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS lessons_insert_auth ON public.lessons_entries;
CREATE POLICY lessons_insert_auth ON public.lessons_entries
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS lessons_update_auth ON public.lessons_entries;
CREATE POLICY lessons_update_auth ON public.lessons_entries
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);


-- =====================================================================
-- End of migration 003.
-- =====================================================================
