# PM Lite

**Lightweight portfolio management toolkit for small AI/digital studios.**

Version: 1.0
Date: 2026-05-14
Status: READY (production-grade — built and battle-tested running the AI Solutions portfolio of 13+ projects).

---

## What is PM Lite?

PM Lite is the set of templates, Supabase tables, and Next.js pages built to manage a small portfolio. Small studios, solo founders, and agencies running 5–15 concurrent small projects don't need Jira / Asana / Monday — they need:

- **RAIDD log** — Risks, Assumptions, Issues, Dependencies, Decisions in one queryable table per project.
- **Lessons-learned database** — patterns from every project surface to every future project.
- **Decision register** — every meaningful technical/business decision logged with rationale.
- **Reusable templates** — start a new project in 10 minutes, not 2 days.
- **Three-path updates** — UI form, AI-assistant session, or project-scoped API endpoint.

That's the whole product. No Gantt charts. No swimlanes. No 12-seat enterprise pricing.

For a deeper explanation see `docs/01_what-is-pm-lite.md`.

---

## What's in this folder

```
16-pm-lite/
├── README.md                                ← you are here
├── PROJECT-CONFIG.md                        ← master reference for this project
├── LICENCE.md                               ← resale tiers and terms
├── specs/
│   ├── PROJECT_MANIFEST.md                  ← scope, persona, success metrics
│   └── ARCHITECTURE.md                      ← stack diagram + cost model
├── docs/
│   ├── 01_what-is-pm-lite.md
│   ├── 02_quickstart.md                     ← deploy a tenant in <60 minutes
│   ├── 03_pricing-model.md                  ← pricing tiers (Studio, Agency, Enterprise)
│   ├── 04_rebrand-guide.md                  ← swap branding for white-label resale
│   ├── API_INTEGRATIONS.md                  ← protocol step 3 doc
│   ├── SUPABASE_CONFIG.md                   ← protocol step 4 doc
│   ├── VERCEL_ENV_VARS.md                   ← protocol step 5 doc
│   ├── SECURITY_CHECKLIST.md                ← protocol step 6 doc
│   └── EMAIL_CONFIG.md                      ← protocol step 7 doc
├── templates/                               ← copy-paste starting documents for any new project
│   ├── 01_apply-order.md
│   ├── 02_credentials-manifest.md
│   ├── 03_decision-log.md
│   ├── 04_incident-response.md
│   ├── 05_backup-restore.md
│   ├── 06_project-checklist.md
│   ├── 07_raidd-log.md
│   └── 08_lessons-learned.md
├── code/
│   ├── supabase/
│   │   ├── 001_schema.sql                   ← raidd_entries, lessons_entries (pure DDL)
│   │   ├── 002_views.sql                    ← dashboard views
│   │   ├── 003_functions.sql                ← triggers + RLS policies
│   │   └── 004_feedback_scaffold.sql        ← pm_lite_feedback table (pure DDL)
│   └── seed-OPTIONAL/
│       └── 001_demo_seed.sql                ← demo data for fresh tenant deploys
└── artifacts/
    └── feedback-scaffold/
        └── pm-lite-questions-registry.md    ← 10 SMART feedback questions, 40/40/20 scoring
```

---

## Quick start (deploy a tenant)

Full guide is in `docs/02_quickstart.md`. Headline steps:

1. Create a new Supabase project for the tenant.
2. Run the 4 SQL files in `code/supabase/` in order.
3. Fork the `pm-lite` code repo, point its env vars at the new Supabase.
4. Deploy to Vercel.
5. Hand the tenant their `/tracker/login` URL.

About 60 minutes start to finish.

---

## Branding

This package ships with **AI Solutions branding by default** (primary blue `#2563eb`, dark `#1f2937`, Inter typography). For resale, swap:

- `tailwind.config.ts` colours.
- `public/logo.svg`.
- `app/layout.tsx` site title and metadata.

Full rebrand guide: `docs/04_rebrand-guide.md`.

---

## Standard artefact scaffold

PM Lite complies with the AI Solutions standard scaffold:

| Requirement | Where it lives |
|---|---|
| Artefact-specific SMART feedback questions | `artifacts/feedback-scaffold/pm-lite-questions-registry.md` |
| Feedback page UI component (reusable) | Inherits from the `/feedback` shell in the `pm-lite` code repo |
| Supabase tables | `code/supabase/004_feedback_scaffold.sql` |
| Scoring calculation (Compliance 40% + Usability 40% + Value Add 20%) | Computed in application code on insert |
| RAG dashboard widget | Reads from `pm_lite_feedback_summary` view |

---

## Licence and resale

PM Lite is built to be sold. Each new buyer gets:

1. Their own Supabase project (full data isolation).
2. Their own Vercel deployment.
3. The full template set, branded to their company.

See `LICENCE.md` for the full tier breakdown and resale terms.

---

## Catalogue listing

- **Live at:** `https://aisolutionsnet.net/tools/pm-lite`
- **Application row:** `applications.name = 'PM Lite'`, status `READY`.
- **Sell-page row:** `tool_sell_pages.slug = 'pm-lite'`, status `published`.

---

## Where to start

- New buyer evaluating PM Lite → `docs/01_what-is-pm-lite.md` → `docs/03_pricing-model.md`.
- Operator deploying PM Lite for a tenant → `docs/02_quickstart.md`.
- Operator inheriting PM Lite mid-project → `PROJECT-CONFIG.md`, then `specs/PROJECT_MANIFEST.md`.
- Auditor reviewing PM Lite → `LICENCE.md`, then `docs/SECURITY_CHECKLIST.md`.

---

**End of README.**
