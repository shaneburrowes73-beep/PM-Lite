# [Project Name] — Apply Order

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Name]
**Status:** [DRAFT / ACTIVE / COMPLETE]

---

## What is this document?

The Apply Order is the agreed sequence in which work on this project happens. It exists so anyone joining the project (a new team member, an AI assistant in a fresh thread, an auditor) can see at a glance:

1. What was done first, second, third.
2. Which steps depend on which other steps.
3. Which steps are complete vs open.

Update this document as steps complete. Never delete entries — strike-through instead, so the trail is preserved.

---

## Pre-flight checks

Before starting any step in this Apply Order, confirm:

- [ ] Project folder exists at: `[full path]`
- [ ] Supabase project (if applicable) created and credentials in `02_credentials-manifest.md`
- [ ] GitHub repo created and team has push access
- [ ] Vercel project (if applicable) linked to GitHub repo
- [ ] All credentials logged in `02_credentials-manifest.md`

---

## Apply Order — Phases

### Phase A — Setup (Day 1)

| # | Step | Owner | Status | Notes |
|---|------|-------|--------|-------|
| A1 | Create project folder + README | | [ ] | |
| A2 | Create GitHub repo + push initial commit | | [ ] | |
| A3 | Create Supabase project (if needed) | | [ ] | |
| A4 | Run initial DB migrations | | [ ] | |
| A5 | Set up Vercel project + env vars | | [ ] | |
| A6 | Verify deploy of "hello world" build | | [ ] | |
| A7 | Add credentials to `02_credentials-manifest.md` | | [ ] | |

### Phase B — Core build

| # | Step | Owner | Status | Notes |
|---|------|-------|--------|-------|
| B1 | [Feature 1] | | [ ] | |
| B2 | [Feature 2] | | [ ] | |
| B3 | [Feature 3] | | [ ] | |

### Phase C — Testing

| # | Step | Owner | Status | Notes |
|---|------|-------|--------|-------|
| C1 | Unit tests pass | | [ ] | |
| C2 | Integration tests pass | | [ ] | |
| C3 | Manual smoke test against staging | | [ ] | |
| C4 | UAT with end-user | | [ ] | |

### Phase D — Deploy

| # | Step | Owner | Status | Notes |
|---|------|-------|--------|-------|
| D1 | Tag v1.0 release | | [ ] | |
| D2 | Deploy to production | | [ ] | |
| D3 | Verify production env vars | | [ ] | |
| D4 | Run smoke test against prod | | [ ] | |
| D5 | Update RAIDD log with deploy decision | | [ ] | |

### Phase E — Handover

| # | Step | Owner | Status | Notes |
|---|------|-------|--------|-------|
| E1 | User documentation written | | [ ] | |
| E2 | Admin / runbook documentation written | | [ ] | |
| E3 | Backup procedure verified (see `05_backup-restore.md`) | | [ ] | |
| E4 | Incident response procedure verified (see `04_incident-response.md`) | | [ ] | |
| E5 | Project marked READY in portfolio applications table | | [ ] | |

---

## Hard rules

These apply to every project. Break them and the project drifts.

1. **No step starts until the previous step in the same phase is complete.** Phases can overlap; steps within a phase cannot.
2. **Every step has an owner.** If the owner column is blank, the step is not real.
3. **Every step that fails opens a RAIDD entry** (Issue or Risk).
4. **No deploy to production without Phase C signed off.**
5. **No handover without Phase E complete.**

---

## Linked documents

- `02_credentials-manifest.md` — secrets needed for each phase.
- `03_decision-log.md` — every decision made during this Apply Order.
- `06_project-checklist.md` — line-by-line checklist (more granular than this overview).
- `07_raidd-log.md` — risks, assumptions, issues, dependencies, decisions.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document created | [Name] |

---

**End of Apply Order template.**
