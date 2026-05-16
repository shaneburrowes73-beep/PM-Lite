# PM Lite — Architecture

**Version:** 1.0
**Stack at a glance:** Supabase Postgres (+ RLS) ← Next.js 14 (App Router, Server Components) ← Vercel ← Cloudflare DNS.

---

## High-level diagram

```
┌──────────────────────────────────────────────────────────┐
│  Tenant Browser                                          │
│  https://<tenant>.example.com/tracker                    │
└──────────────────────────┬───────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────┐
│  Vercel — Next.js 14 (App Router)                        │
│  - /tracker/login         (Supabase Auth)                │
│  - /tracker               (dashboard + RAG widget)       │
│  - /tracker/raidd         (RAIDD log UI)                 │
│  - /tracker/lessons       (Lessons UI)                   │
│  - /tracker/settings      (env config check)             │
│  - /api/raidd             (GET/POST/PATCH)               │
│  - /api/lessons           (GET/POST/PATCH)               │
│  - /api/raidd/append      (project-scoped bearer token)  │
│  - /feedback              (SMART feedback shell)         │
└──────────────────────────┬───────────────────────────────┘
                           │ Service-role key (server-side only)
                           ▼
┌──────────────────────────────────────────────────────────┐
│  Supabase                                                │
│  - auth.users                                            │
│  - public.raidd_entries     (RLS: auth users only)       │
│  - public.lessons_entries   (RLS: auth users only)       │
│  - public.raidd_append_tokens  (service-role-only)       │
│  - public.raidd_append_rate    (service-role-only)       │
│  - public.pm_lite_feedback                               │
│  - public.pm_lite_feedback_summary (view)                │
└──────────────────────────────────────────────────────────┘
```

---

## Multi-tenant isolation

Each PM Lite tenant gets a **separate Supabase project** — not shared rows-with-tenant-id, but a separate database.

Reasons:

1. **Zero RLS bypass risk** — if a tenant accidentally gets the wrong service key, they only see their own data.
2. **Per-tenant performance** — one heavy tenant cannot slow another down.
3. **Per-tenant backup/restore** is trivial — point-in-time recovery on one DB doesn't touch others.
4. **Pricing aligns to Supabase project cost.**

Trade-off: you (the operator) maintain N Supabase projects. Acceptable up to ~20 tenants. Beyond that, consider a shared-DB-with-RLS model. Logged as `A-PML-001` open assumption.

---

## Auth flow

```
1. User visits /tracker → unauthenticated → redirected to /tracker/login
2. Enters email + password → supabase.auth.signInWithPassword()
3. Supabase returns session → stored in HTTP-only cookie (sb-access-token)
4. /tracker/(auth)/layout.tsx server-component checks cookie → loads user
5. /api/raidd, /api/lessons read the cookie token → verify with getUser()
```

Forgot-password flow:

```
1. /tracker/forgot-password → enter email
2. supabase.auth.resetPasswordForEmail(email, { redirectTo: '<site>/tracker/reset-password' })
3. User clicks email link → lands on /tracker/reset-password with recovery token
4. Enter new password → supabase.auth.updateUser({ password })
5. Redirect to /tracker
```

**Critical config:** Supabase Site URL and Redirect URLs must include the tenant's domain (Quickstart Step 6). Skipping this is the #1 cause of failed first-time logins — captured as Lesson `L-DEMO-001` in the seed file.

---

## RAIDD data model

The full DDL is in `code/supabase/001_schema.sql`. Headline:

```
raidd_entries (23 columns)
├─ id                    uuid PK
├─ project_id            text  (e.g. 'pm-lite', 'service-agent', 'portfolio')
├─ entry_id              text  (e.g. 'R-001', 'D-014')
├─ type                  text  (risk | assumption | issue | decision | dependency | lesson) — LOWERCASE
├─ title                 text
├─ description           text
├─ status                text  (open | active | mitigated | resolved | closed | superseded)
├─ severity              text  (low | medium | high | critical)
├─ likelihood            text  (low | medium | high | critical) — Risks only
├─ owner                 text
├─ rationale             text  — Decisions only
├─ consequences          text  — Decisions only
├─ action_or_mitigation  text  — Risks/Issues
├─ opened_date           date
├─ resolved_date         date
├─ last_reviewed_date    date
├─ superseded_by         text
├─ related_entries       text[]
├─ source_doc            text
├─ source_url            text
├─ metadata              jsonb
├─ created_at            timestamptz
└─ updated_at            timestamptz

Uniqueness: (project_id, entry_id, type)
```

Indexes on `(project_id, status)`, `(type, status)`, and a partial index on `owner` where the entry is not closed.

---

## Lessons data model

```
lessons_entries
├─ id                       uuid PK
├─ lesson_id                text UNIQUE
├─ project_id               text  (nullable = portfolio-wide)
├─ date_logged              date
├─ title                    text
├─ what_happened            text
├─ root_cause               text
├─ what_to_do_differently   text
├─ raidd_entry_ref          text  (link to a RAIDD entry_id)
├─ standing_docs_changed    text[]
├─ status                   text  (active | superseded)
├─ superseded_by            text
├─ created_at               timestamptz
└─ updated_at               timestamptz
```

Lessons are deliberately separate from RAIDD because the lifecycle differs — RAIDD captures the moment, Lessons captures the durable pattern that survives the project.

---

## Three-path update mechanism

A user has 3 ways to log a RAIDD entry. All three write to the same `raidd_entries` table.

| Path | When to use | Auth |
|---|---|---|
| **1. /tracker UI** | Manual logging during the day | Supabase Auth cookie |
| **2. AI-assistant session** | While discussing a project with an AI assistant — assistant inserts on user's behalf | User's session + Supabase service-role |
| **3. /api/raidd/append endpoint** | An automation (n8n, CI, GitHub Action) needs to log autonomously | Project-scoped bearer token + rate limit |

Path 3 details:

- Token lives in `raidd_append_tokens` table — one per (project, machine).
- Rate-limited via `raidd_check_and_increment_rate()` function (default 60 inserts/hour per token).
- Token is scoped to project — can only insert with that project name.
- Service-role key never leaves the server.

---

## Feedback scaffold

Per the AI Solutions standard, every artefact ships a per-product feedback table. Full DDL in `code/supabase/004_feedback_scaffold.sql`. Headline:

```
pm_lite_feedback
├─ id                uuid PK
├─ session_id        uuid
├─ tester_id         uuid
├─ stage             text  ('alpha' / 'beta' / 'released')
├─ market            text
├─ tier_at_time      text
├─ q1_score..q10_score   int   (one per question — registry defines mapping)
├─ compliance_score  numeric
├─ usability_score   numeric
├─ value_add_score   numeric
├─ composite_score   numeric
├─ rag_score         text  (GREEN | AMBER | RED)
├─ general_feedback  text
├─ status            text  (submitted | reviewed | actioned)
├─ created_at        timestamptz
└─ updated_at        timestamptz
```

The composite score is `0.40 × compliance + 0.40 × usability + 0.20 × value_add`. Application code computes it on insert.

The dashboard widget reads `pm_lite_feedback_summary` (a view with one row averaging all responses) and renders the `rag_band` column.

---

## Cost model (per tenant, USD)

| Component | Monthly | Notes |
|---|---|---|
| Supabase Free | $0 | Covers ~5–10k rows comfortably |
| Supabase Pro (when needed) | $25 | Recommended once tenant has >50k rows |
| Vercel Hobby | $0 | Fine for single-tenant deploys |
| Vercel Pro | $20 | Needed for multi-tenant ops, custom domains |
| Cloudflare DNS | $0 | Free tier covers everything |
| **Total at scale** | $0–$45/tenant/month | |

At Studio tier (£49/month) operator margin is healthy. At Agency tier (£149/month for up to 10 client portfolios) you're at ~10× margin if all tenants are on free Supabase.

---

## Security baseline

Per `docs/SECURITY_CHECKLIST.md`:

- ✅ All Supabase tables have RLS enabled — even tables with no policies, where RLS-on + no-policies = service-role-only.
- ✅ Service-role key never in `NEXT_PUBLIC_*` env vars — server-side only.
- ✅ Vercel Deployment Protection on (off only for `/api/*` rate-limited routes).
- ✅ GitHub Code Scanning + Dependabot enabled.
- ✅ Security headers: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- ✅ Forgot-password rate-limited (Supabase built-in: max 4 requests per hour per email).
- ✅ Append-API rate-limited (60 inserts/hour per token, configurable).

---

## Deployment workflow

Summary — full step-by-step in `docs/02_quickstart.md`:

1. Clone the `pm-lite` repo (or your fork).
2. Create new Supabase project for the tenant.
3. Run 4 SQL migrations from `code/supabase/`.
4. Vercel → new project → import repo → set env vars.
5. Add custom domain (optional).
6. Verify auth flow end-to-end.
7. Hand tenant their `/tracker` URL + admin credentials.

---

## Roadmap (v1.1+)

- Optional Sentry integration for error tracking.
- CSV export of RAIDD log (currently view-only).
- Email digests (daily / weekly RAIDD summary).
- Webhook on RAIDD insert (for Slack / Teams).
- Hosted demo tenant for prospects.
- Bulk operations API for Agency tier.

---

**End of architecture doc. Open `docs/02_quickstart.md` for deploy steps.**
