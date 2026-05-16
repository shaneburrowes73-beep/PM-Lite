# PM Lite — Supabase Configuration

**Project:** PM Lite
**Last Updated:** 2026-05-14
**Scope:** Per-tenant Supabase deployment. Each tenant gets a separate Supabase project.

---

## Connection details (template — actual values per tenant in 1Password)

- **Host:** `<tenant-project-ref>.supabase.co`
- **Port:** 5432 (Postgres direct) / 6543 (PgBouncer pooler)
- **Database name:** `postgres`
- **Project URL:** `https://<tenant-project-ref>.supabase.co`
- **Project ref:** Recorded in 1Password vault `AI Solutions / PM Lite / <tenant-name> / supabase`

**AI Solutions's own tracker is NOT a PM Lite tenant** — it has its own separate Supabase project at `AI-solutions-tracker` and is used to run the portfolio. Do not confuse the two.

---

## Tables

These are created per-tenant by running the four migrations in
`code/supabase/` in order.

### `raidd_entries`

- **Purpose:** Holds Risks, Assumptions, Issues, Decisions, Dependencies, and (legacy) Lessons. Core of the tracker.
- **Created by:** `001_schema.sql`
- **RLS:** Enabled. Policies: `raidd_select_auth`, `raidd_insert_auth`, `raidd_update_auth` — authenticated users can read/insert/update (suitable for one-Supabase-per-tenant model).
- **Indexes:** `raidd_project_status_idx`, `raidd_type_status_idx`, `raidd_owner_open_idx` (partial).
- **Constraints:** `type` lowercase set; `severity`/`likelihood` lowercase set; uniqueness `(project_id, entry_id, type)`.

### `lessons_entries`

- **Purpose:** Durable lessons that survive projects ending. Separate from RAIDD because the lifecycle differs.
- **Created by:** `001_schema.sql`
- **RLS:** Enabled. Policies: `lessons_select_auth`, `lessons_insert_auth`, `lessons_update_auth`.
- **Indexes:** `idx_lessons_date`, `idx_lessons_project`, `idx_lessons_status`.

### `raidd_append_tokens`

- **Purpose:** Bearer tokens for autonomous logging (n8n, GitHub Actions, CI).
- **Created by:** `001_schema.sql`
- **RLS:** Enabled, **no policies** = service-role-only access. By design.
- **Indexes:** `idx_raidd_tokens_active` (partial — active tokens only).

### `raidd_append_rate`

- **Purpose:** Sliding-hour rate limit for the append endpoint.
- **Created by:** `001_schema.sql`
- **RLS:** Enabled, no policies = service-role-only.
- **Indexes:** `idx_raidd_rate_window`.

### `pm_lite_feedback`

- **Purpose:** SMART feedback responses from PM Lite users (10 questions, 3 sub-scores, composite, RAG).
- **Created by:** `004_feedback_scaffold.sql`
- **RLS:** Enabled. Policies: `pm_lite_feedback_insert_public` (anon + auth can INSERT), `pm_lite_feedback_select_auth` (only auth can SELECT — dashboard).
- **Indexes:** `idx_pm_lite_feedback_stage`, `idx_pm_lite_feedback_rag`, `idx_pm_lite_feedback_created`, `idx_pm_lite_feedback_session`.

## Views

Created by `002_views.sql` and `004_feedback_scaffold.sql`:

- `v_raidd_by_project` — counts grouped by project/type/status.
- `v_raidd_open_risks` — active risk register.
- `v_raidd_open_issues` — open issues sorted by severity then age.
- `v_raidd_active_decisions` — non-superseded decisions.
- `v_raidd_overdue` — open entries older than 30 days.
- `v_raidd_project_summary` — one row per project, headline counts (drives the dashboard RAG widget).
- `v_lessons_by_project` — active lessons, most recent first.
- `pm_lite_feedback_summary` — feedback dashboard view.

## Functions

Created by `003_functions.sql`:

- `touch_updated_at()` — generic trigger updating `updated_at` on UPDATE.
- `raidd_check_and_increment_rate(token_hash, limit_per_hour)` — append endpoint rate limit. SECURITY DEFINER so it can write to the service-role-only `raidd_append_rate` table.

---

## Backup schedule and retention

- **Supabase Free tier:** Daily automated backups, 7-day retention. No point-in-time recovery.
- **Supabase Pro tier:** Daily automated backups, 7-day retention + point-in-time recovery (PITR).
- **AI Solutions's policy for tenants:** Enable Pro tier with PITR for any tenant on Agency or Enterprise. Studio tier uses Free tier backups (acceptable for the size of data).
- **Manual backup before risky migrations:** `pg_dump` to local file, stored in 1Password's secure notes for that tenant.

---

## Performance targets (per tenant)

| Operation | Target |
|---|---|
| Page load: `/tracker` dashboard | < 1.5s (Vercel Hobby + Supabase Free) |
| Insert: new RAIDD entry | < 300ms |
| Filter: open issues by project | < 200ms (uses `raidd_project_status_idx`) |
| Feedback submission | < 500ms |
| Dashboard refresh (RAG widget) | < 400ms (reads `v_raidd_project_summary` + `pm_lite_feedback_summary`) |

If any of these regress past target on Pro tier, log as an Issue (`type='issue'`, `severity='medium'`) and investigate.

---

## Scaling strategy

- **Up to ~5k rows per table:** Supabase Free, Vercel Hobby.
- **5k–50k rows per table:** Supabase Pro ($25/mo), Vercel Hobby. Add Pro-tier indexes if specific queries slow.
- **50k+ rows per table:** Supabase Pro, Vercel Pro ($20/mo). Consider partitioning `raidd_entries` by `project_id` if a single tenant exceeds 100k rows (unlikely for PM Lite's target market).
- **Beyond ~20 tenants on the operator side:** consider a shared-DB-with-RLS model rather than one Supabase per tenant. Recorded as `A-PML-001` open assumption.

---

## Per-tenant requirements (NOT in the SQL — manual)

When provisioning a new tenant Supabase project:

1. Create the project in the Supabase dashboard.
2. Run migrations 001–004 in order (via SQL Editor).
3. (Optional) Run `seed-OPTIONAL/001_demo_seed.sql` if the tenant wants a populated dashboard for demo purposes.
4. Configure **Authentication → URL Configuration**:
   - Site URL: tenant's domain or Vercel hostname.
   - Redirect URLs: `<site>/tracker/reset-password`, `<site>/tracker`, `<site>/tracker/**`.
5. Create the initial admin user via **Authentication → Users → Add user** with Auto Confirm.
6. Log the tenant's project URL + keys in 1Password under `AI Solutions / PM Lite / <tenant-name>`.
7. Set Vercel env vars (see `VERCEL_ENV_VARS.md`).

---

**Last reviewed:** 2026-05-14.
