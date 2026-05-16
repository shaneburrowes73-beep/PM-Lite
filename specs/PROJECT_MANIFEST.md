# PM Lite — Project Manifest

**Version:** 1.0
**Date:** 2026-05-14
**Owner:** AI Solutions (aisolutionsnet.net)

---

## Scope statement

PM Lite is a sellable, lightweight portfolio management toolkit aimed at small AI/digital studios, solo founders, and agencies running 5–15 concurrent projects who find enterprise PM tools (Jira, Asana, Monday, ClickUp) too heavy.

### In scope (v1.0)

- RAIDD log (Risks, Assumptions, Issues, Dependencies, Decisions) per project.
- Lessons-learned database (cross-project pattern capture).
- Decision register (separate query view over RAIDD `decision` entries).
- 8 generic governance templates.
- Tracker UI (Next.js App Router) with auth, filter, search, summary cards.
- Supabase schema bundle (4 migration files, pure DDL).
- Three-path update mechanism (UI form / AI-assistant session / project-scoped API).
- Standard feedback scaffold (SMART questions + 40/40/20 scoring + RAG widget).
- White-label rebrand path.

### Out of scope (v1.0)

- Gantt charts, swimlanes, kanban boards. Intentional — small studios don't need them.
- Time tracking. Use Toggl or Harvest.
- Invoicing. Use Xero or QuickBooks.
- Native mobile app.
- Auto-publish integrations (LinkedIn, X).

---

## Target persona

**Primary:** Solo founder or small studio lead running 5–15 concurrent projects, non-technical or lightly-technical, currently using a mix of Google Sheets + Notion + memory.

**Secondary:** Agencies managing client portfolios where each client is a separate tenant.

**Anti-persona:** Enterprise teams of 50+. PM Lite is too small a tool for them.

---

## Success metrics

| Metric | Target | How measured |
|---|---|---|
| Deploy-a-tenant time | < 60 minutes | Stopwatch during quickstart trial |
| Templates used per new project | ≥ 4 of 8 | Sample of deployed tenants |
| RAIDD entries logged per project per week | ≥ 3 | Supabase row counts |
| Cross-project lessons reuse | ≥ 1 lesson referenced per new project | Lessons table query |
| Feedback composite score | ≥ 80 | Compliance 40% + Usability 40% + Value Add 20% |

---

## SMART feedback questions (this product itself)

Per `portfolio-quick-reference`, every artefact has SMART feedback questions defined at project creation. The full list with options and scoring lives in:

`../artifacts/feedback-scaffold/pm-lite-questions-registry.md`

Headline:

- **Compliance (40%):** coverage, data integrity, isolation.
- **Usability (40%):** trainability, missing features, speed, template fit.
- **Value Add (20%):** time saved, lesson reuse, would-re-buy.

RAG bands: GREEN ≥ 75 · AMBER 50–74 · RED < 50.

---

## Pricing model (summary — full detail in `docs/03_pricing-model.md`)

| Tier | Price | What's included |
|---|---|---|
| Self-deploy | £0 | Full template set + Supabase SQL + deploy guide. Buyer runs it. |
| Studio | £499 + £49/month | We deploy, rebrand, train, host. |
| Agency | £1,499 + £149/month | Multi-tenant, up to 10 client portfolios. |
| Enterprise | Custom (typically £5k+) | White-label, SSO, custom workflows. |

Resale (separate licence): £2,500 one-off + standard hosting per client. Volume tier available.

---

## Technical stack

| Layer | Choice | Why |
|---|---|---|
| DB | Supabase Postgres + RLS | Cheap, fast, multi-tenant by RLS |
| Frontend | Next.js 14 App Router | Server components, ISR, easy Vercel deploy |
| Styling | Tailwind CSS | Generic and easy to rebrand |
| Auth | Supabase Auth (email/password + magic link) | Built-in, no third-party cost |
| Hosting | Vercel | One-click deploy, env var management |
| Internal automation | n8n (optional) | Webhooks for cross-tool sync — out of scope v1.0 |

Full architecture: `ARCHITECTURE.md`.

---

## Initial RAIDD entries

These are the entries that opening this manifest creates. They should be inserted into the live tracker at `project_id='pm-lite'`.

| ID | Type | Severity | Statement |
|---|---|---|---|
| R-PML-001 | risk | medium | Buyers may try to fork the code to avoid hosting fees. Mitigation: licensing terms in `LICENCE.md`. |
| A-PML-001 | assumption | — | Buyers have an `aisolutionsnet.net`-equivalent Supabase + Vercel account to deploy into. If not, sell them the Studio tier where we host. |
| D-PML-001 | decision | — | Pricing starts at the tiers above. Switch to fixed pricing once 3 tenants are live and we have data on real deploy time. |
| Dep-PML-001 | dependency | — | Requires the AI Solutions standard feedback scaffold (40/40/20) to be in place on the deploying repo. |
| I-PML-001 | issue | low | No screenshot images yet on `/tools/pm-lite` sell page. Capture after first real tenant deploy. |

These are tracked in the live tracker, not in this manifest, once a `pm-lite` GitHub repo and Vercel project exist (currently pending).

---

## Standard artefact scaffold compliance

Per `portfolio-quick-reference`:

- ✅ SMART feedback questions — defined in `../artifacts/feedback-scaffold/pm-lite-questions-registry.md`.
- ✅ Feedback page UI component — inherits from the canonical `/feedback` shell (in the `pm-lite` code repo, when extracted).
- ✅ Supabase tables — `code/supabase/004_feedback_scaffold.sql`.
- ✅ Scoring calculation — 40/40/20, computed on insert by application code.
- ✅ RAG dashboard widget — reads `pm_lite_feedback_summary`.

---

## Open questions for v1.1

- Should we offer a hosted "demo tenant" so prospects can try before they buy?
- Do we need a dedicated `/pm-lite` marketing microsite, or is `/tools/pm-lite` sufficient?
- Is there a free-forever community tier that drives word-of-mouth?

Each is logged as an Assumption or Decision in the tracker when answered.

---

**Next:** `ARCHITECTURE.md` for the technical detail.
