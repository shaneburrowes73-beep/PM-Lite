# PM Lite — PROJECT-CONFIG.md

**Master reference document.** Updated whenever any project fact changes.

---

## Project Overview

- **Project Name:** PM Lite
- **Project ID:** 16-pm-lite (Drive folder `15LRqMXh6W3uVwTsJzvJusOBQIxWKeM8O`)
- **Status:** Planning (packaging complete; deployable code repo and Vercel project not yet created)
- **Type:** Sellable product (Generic + brandable for resale)
- **Technology Stack:** Next.js 14 (App Router) + Supabase Postgres + Vercel + Tailwind CSS
- **Owner:** Shane Burrowes (AI Solutions)
- **Team:** Solo development; managed by Claude/Cowork
- **Date Created:** 2026-05-14

---

## Portfolio Governance & Dependencies

This project follows AI Solutions portfolio governance. Skills, security policies, and shared infrastructure are NOT duplicated locally — they are referenced from the canonical source.

### Skills & Security Hardening

- **Source:** https://github.com/shaneburrowes73-beep/ai-solutions
- **Skills location:** `/skills/` in the source repo (36 Cowork skills)
- **Security policies:** `/security/phase-1/` (credential detection), `/security/phase-2/` (RLS policies)
- **Authority:** RAIDD entries D-20260515-004, PDEP-01, R-20260515-001

**Do NOT:**

- Store skills in AppData
- Duplicate security policies
- Hardcode credentials

**Do:**

- Reference the AI Solutions repo as the single source of truth
- Use Vercel environment variables or 1Password references for credentials
- Never commit `.env` files, hardcode API keys, or store secrets in code

### Skill Sync Validation

To verify skills are correctly synced:

```
git clone https://github.com/shaneburrowes73-beep/ai-solutions.git
# Verify: 36 skill folders exist in skills/
```

If using Cowork: skills auto-load from installed location — DO NOT modify locally.

### Credentials Storage

- **Vault:** 1Password (AI Solutions shared vault)
- **Never:** commit `.env` files, hardcode API keys, store secrets in code
- **Always:** use Vercel environment variables or 1Password references

---

## Product Definition

PM Lite is a lightweight portfolio management toolkit for small AI/digital studios, solo founders, and agencies running 5–15 concurrent projects. It replaces a mix of Jira, Asana, Monday, and Notion with a single Supabase-backed tracker and a small Next.js UI.

**In scope (v1.0):** RAIDD log, Lessons-Learned DB, Decision register, 8 governance templates, Tracker UI with auth, multi-tenant support, SMART feedback scaffold, white-label rebrand path.

**Out of scope (v1.0):** Gantt charts, kanban, time tracking, invoicing, native mobile app.

## Delivery modes

| Mode | Buyer receives | Status |
|---|---|---|
| Packaged (Self-deploy) | This folder + read-only code repo link | Ready (this folder), code repo pending |
| Managed (Studio / Agency / Enterprise) | Live deployment URL, admin credentials, AI Solutions operates the infrastructure | Pending — needs Vercel project + Supabase per-tenant deploy procedure |

## Code Repository

- **GitHub URL:** `https://github.com/shaneburrowes73-beep/PM-Lite` (empty as of 2026-05-15; ready to be populated)
- **Branch strategy:** `main` is deployable. Feature branches via PR.
- **Deployment pipeline:** Vercel auto-deploy from `main` (once code is populated).
- **Last deployed:** N/A (no code yet).

## Data & Infrastructure

- **Database:** Each PM Lite tenant gets its own Supabase project (one DB per tenant — see `docs/SUPABASE_CONFIG.md`).
- **API integrations:** Supabase Auth, Supabase Storage (optional). No third-party APIs in v1.0.
- **Hosting:** Vercel (per-tenant project named `pm-lite-<tenantname>`).
- **Data retention:** Buyer owns 100% of their data. Export available via tracker UI at any time. On termination, AI Solutions provides final export and deletes the tenant Supabase within 30 days.

## Access & Credentials

- **Who has access:**
  - Owner / admin: Shane Burrowes (`AISolutions@aisolutionsnet.net`)
  - Developer: `clarenceburrows6@gmail.com` (Cowork licensed account)
  - Per-tenant: tenant admin (created at tenant onboarding)
- **Key identifiers (never paste values here):**
  - `NEXT_PUBLIC_SUPABASE_URL` = (per-tenant Supabase Project URL)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (per-tenant anon key)
  - `SUPABASE_SERVICE_ROLE_KEY` = (per-tenant service role, server-side only)
  - `NEXT_PUBLIC_SITE_URL` = (per-tenant Vercel hostname or custom domain)
- **Vault location:** 1Password — vault entry `AI Solutions / PM Lite / <tenant-name>`. Per-tenant entries are added at tenant onboarding.
- **Emergency contact:** Shane Burrowes (`AISolutions@aisolutionsnet.net`)

## Key Metrics

- **Monthly cost per tenant:** $0–$45 (Supabase Free → Pro, Vercel Hobby → Pro).
- **Margin on Studio tier:** ~£45+/month after setup fee.
- **Performance target:** Tracker page (open → add RAIDD → save) under 2 seconds end-to-end on free Supabase.
- **Uptime SLA:** Studio 99% / Agency 99.5% / Enterprise negotiated.
- **User capacity:** No per-seat limit. Designed for 5–15 concurrent projects, up to ~50 active RAIDD entries per project.

## Implementation Status

### Completed

- ✓ Drive folder structure created (`Projects/16-pm-lite/specs|code|docs|artifacts`)
- ✓ Supabase SQL migrations (001–004) written, pure DDL, verified against live schema
- ✓ Demo seed (`code/seed-OPTIONAL/001_demo_seed.sql`) with non-production sanity check
- ✓ SMART feedback questions registry (10 questions, 40/40/20 scoring)
- ✓ LICENCE.md with tier-by-tier resale terms
- ✓ Per-tenant feedback table (`pm_lite_feedback`) already exists in the AI Solutions tracker — shape proven
- ✓ Application registered in `applications` table (`name='PM Lite'`, status `BETA`) and `tool_sell_pages` (`slug='pm-lite'`, status `published`)
- ✓ `applications.github_url` set to `https://github.com/shaneburrowes73-beep/PM-Lite` (2026-05-15)
- ✓ Extraction plan written (`specs/EXTRACTION_PLAN.md`)
- ✓ 4 buyer-facing docs in `docs/` (01_what-is, 02_quickstart, 03_pricing, 04_rebrand)
- ✓ 8 governance templates in `templates/`
- ✓ `README.md`, `PROJECT_MANIFEST.md`, `ARCHITECTURE.md` written
- ✓ 5 protocol docs in `docs/` (API_INTEGRATIONS, SUPABASE_CONFIG, VERCEL_ENV_VARS, SECURITY_CHECKLIST, EMAIL_CONFIG)

### Pending

- [ ] Populate `PM-Lite` GitHub repo from this Drive folder (docs + SQL + templates first; code later)
- [ ] Extract Next.js tracker code from `ai-solutions` repo into `PM-Lite` (parked until other portfolio fires are resolved — see `specs/EXTRACTION_PLAN.md`)
- [ ] Create `pm-lite` Vercel project linked to the new repo
- [ ] First buyer-facing demo tenant deploy (validates the quickstart)
- [ ] Footer template added to tracker UI per cloud-first-practices step 9
- [ ] Add PM Lite to the `ai-solutions-project-bootstrap` skill registry (waiting for `ai-solutions-skills` repo to be confirmed canonical)
- [ ] Resolve repo-name capitalisation across Drive docs (currently uses `pm-lite`; canonical is `PM-Lite`)

### Known Issues

- Local folder `C:\Users\barba\OneDrive\Desktop\Projects\pm-lite\` is misconfigured (git remote points at `ai-solutions`, working tree extends to home directory). Do NOT use for `PM-Lite` work. Clean up tomorrow in daylight.
- `leadgen-pro2/ai-solutions-skills/` on local disk contains an accidental copy of skills-repo content uploaded in error. Canonical version is at top of `ai-solutions` repo. Delete `leadgen-pro2/ai-solutions-skills/` as part of tomorrow's cleanup.

### Next Steps

1. Populate `PM-Lite` GitHub repo with docs + SQL from this Drive folder (Track 1).
2. Clean up the misconfigured local `pm-lite\` folder and the `leadgen-pro2/ai-solutions-skills/` leftover.
3. When other portfolio fires resolved, execute `specs/EXTRACTION_PLAN.md` to extract the Next.js tracker into the populated `PM-Lite` repo (Track 2).
4. Create the `pm-lite` Vercel project after extraction.
5. First real buyer (or internal pilot) validates Studio tier deploy.

## Linked documents

- `docs/01_what-is-pm-lite.md` — buyer-facing positioning.
- `docs/02_quickstart.md` — 11-step tenant deployment procedure.
- `docs/03_pricing-model.md` — pricing tiers and resale.
- `docs/04_rebrand-guide.md` — white-label procedure.
- `docs/API_INTEGRATIONS.md` — third-party API integrations and rate limits.
- `docs/SUPABASE_CONFIG.md` — database configuration, table list, RLS policies.
- `docs/VERCEL_ENV_VARS.md` — environment variable inventory.
- `docs/SECURITY_CHECKLIST.md` — security baseline checklist.
- `docs/EMAIL_CONFIG.md` — email notifications and templates.
- `specs/PROJECT_MANIFEST.md` — scope, persona, success metrics.
- `specs/ARCHITECTURE.md` — stack diagram and data models.
- `specs/EXTRACTION_PLAN.md` — 6-phase plan to extract code from `ai-solutions` into `PM-Lite`.
- `code/supabase/001_schema.sql` through `004_feedback_scaffold.sql` — SQL migrations (pure DDL).
- `code/seed-OPTIONAL/001_demo_seed.sql` — demo seed (buyer's empty DB only).
- `artifacts/feedback-scaffold/pm-lite-questions-registry.md` — SMART feedback questions.
- `LICENCE.md` — resale terms.

## Last Updated

| Date | Update | By |
|---|---|---|
| 2026-05-14 | First draft. Folder created, SQL migrations written, 6 protocol docs added per cloud-first-practices. | Claude (Cowork) |
| 2026-05-15 | Merged Portfolio Governance & Dependencies section into this file (single source of truth). Updated GitHub URL to canonical `PM-Lite`. Marked completed items, refreshed pending list, noted local folder issues for tomorrow's cleanup. | Claude (Cowork) |
