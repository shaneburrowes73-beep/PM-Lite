# [Project Name] — Project Checklist

**Version:** 1.1
**Date:** [YYYY-MM-DD]
**Owner:** [Name]

---

## How to use this document

This is the granular checklist for every phase of the project, complementary to `01_apply-order.md` (which is the high-level phase view). Use this to tick off items as they complete. If a line item doesn't apply to your project, strike it through with a one-line reason — don't delete.

---

## Phase A — Setup

### A.1 Project folder
- [ ] Drive folder created at `Projects/[NN]-[project-name]/`.
- [ ] Subfolders created: `specs/`, `code/`, `docs/`, `artifacts/`.
- [ ] `PROJECT-CONFIG.md` written and committed.
- [ ] `LICENCE.md` written (only for sellable products).
- [ ] `14_project-initiation.md` (PID) drafted and signed by Sponsor + Project Lead + Operations Lead.
- [ ] `10_project-roles.md` populated with named individuals.
- [ ] `16_raci-matrix.md` populated with project-specific rows.

### A.2 GitHub repository
- [ ] Repo created at `https://github.com/[org]/[repo-name]`.
- [ ] `.gitignore` includes `.env`, `.env.local`, `node_modules/`, `.next/`, `*.pem`.
- [ ] README.md committed.
- [ ] Branch protection enabled on `main` (require PR review, pass status checks).
- [ ] Code Scanning (CodeQL) enabled.
- [ ] Dependabot alerts enabled.

### A.3 Supabase project
- [ ] New Supabase project created.
- [ ] Project URL, anon key, service-role key saved to 1Password.
- [ ] SQL migrations applied in order (001, 002, 003, 004).
- [ ] RLS enabled on all public tables.
- [ ] Authentication URL config set (Site URL + Redirect URLs).
- [ ] Initial admin user created with Auto Confirm.

### A.4 Vercel project
- [ ] Project created and linked to GitHub.
- [ ] Framework auto-detected (Next.js).
- [ ] Environment variables set per `docs/VERCEL_ENV_VARS.md`.
- [ ] Sensitive variables marked Sensitive.
- [ ] Deployment Protection toggled per the project's public/private requirement.
- [ ] First deploy succeeds (Deployments tab shows READY).

### A.5 Documentation
- [ ] `docs/API_INTEGRATIONS.md` written.
- [ ] `docs/SUPABASE_CONFIG.md` written.
- [ ] `docs/VERCEL_ENV_VARS.md` written.
- [ ] `docs/SECURITY_CHECKLIST.md` written.
- [ ] `docs/EMAIL_CONFIG.md` written (or marked N/A).

### A.6 Governance baseline
- [ ] `03_decision-log.md` initialised with project-specific tolerances confirmed (or kit defaults accepted).
- [ ] `07_raidd-log.md` initialised; first batch of initiation-time risks/assumptions captured.
- [ ] `11_stakeholder-comms-plan.md` populated.
- [ ] `17_triage-guidance.md` reviewed; triage manager confirmed as Project Lead; deputy named.

---

## Phase B — Core build

### B.1 Application code
- [ ] Hello-world page renders at the deployed URL.
- [ ] Login flow works end-to-end (login, logout, password reset).
- [ ] Main feature pages render and pass a manual smoke test.
- [ ] API routes return expected JSON shapes.
- [ ] Error states render gracefully (404, 500, network failure).

### B.2 Database integration
- [ ] App reads from Supabase with anon key (RLS enforced).
- [ ] App writes via service-role key on server-only routes.
- [ ] No service-role key referenced in `NEXT_PUBLIC_*` env vars.
- [ ] Sample queries return expected counts.

### B.3 Feedback scaffold (if sellable product)
- [ ] `[product]_feedback` table created (per `004_feedback_scaffold.sql`).
- [ ] `[product]-questions-registry.md` written with 10 SMART questions.
- [ ] `/feedback` page renders questions from the registry.
- [ ] Submitting feedback writes a row and computes the composite score.
- [ ] RAG widget on the dashboard shows the latest score.

---

## Phase C — Testing

### C.1 Unit tests
- [ ] Test suite runs locally (`npm test`).
- [ ] Test suite runs in CI (GitHub Actions).
- [ ] Coverage acceptable for the project's stage (no hard threshold — judgement call).

### C.2 Integration tests
- [ ] Auth flow tested against staging Supabase.
- [ ] Critical API routes tested.
- [ ] Database migrations tested on a fresh Supabase project (use the seed file as the populated state).

### C.3 Manual smoke test
- [ ] Open every page in the navigation. All load without error.
- [ ] Submit each form. Each gives correct success/error feedback.
- [ ] Run on mobile (responsive check).
- [ ] Run on a clean browser (no extensions interfering).

### C.4 Security verification
- [ ] `curl -I [deployment-url]` shows expected security headers.
- [ ] `git log -p --all -S 'password\|token\|secret\|ghp_\|sk_'` returns nothing concerning.
- [ ] Supabase RLS check: every public table has `rowsecurity = true`.

### C.5 Triage rhythm established
- [ ] Triage backlog review meeting scheduled and held weekly (per `17_triage-guidance.md` §3.5).
- [ ] Required attendees (Project Lead, Tech Lead, Ops Lead) confirmed.
- [ ] First triage review meeting produced minutes and RAIDD entries.

---

## Phase D — Deploy

### D.1 Pre-production
- [ ] Final code review completed.
- [ ] All open Issues with `severity='critical'` resolved.
- [ ] Backup/restore drill passed within the last 30 days.
- [ ] PROJECT-CONFIG.md "Last Updated" field current.

### D.2 Production deploy
- [ ] Tag v1.0 release in GitHub.
- [ ] Vercel promotes to production.
- [ ] Production smoke test passes (rerun C.3 against production URL).
- [ ] Production env vars verified via `vercel env pull`.
- [ ] Deployment Protection setting correct for the project's audience.

### D.3 Post-deploy
- [ ] Monitor for 24 hours — Vercel logs, Supabase logs.
- [ ] No `critical` alerts from CodeQL or Dependabot.
- [ ] First user (internal or tenant) successfully completes the main workflow.
- [ ] Status promoted in `applications` table (BETA → READY).

---

## Phase E — Handover

### E.1 Documentation
- [ ] User-facing documentation (`docs/01_what-is-[product].md`, `02_quickstart.md`) finalised.
- [ ] Admin/runbook documentation (this checklist, `04_incident-response.md`, `05_backup-restore.md`) finalised.
- [ ] Pricing and licensing finalised (`03_pricing-model.md`, `LICENCE.md`) — for sellable products.

### E.2 Operational readiness
- [ ] Backup verified (Phase C.4).
- [ ] Incident response procedure verified (someone other than the owner has read it and can execute Playbook A if needed).
- [ ] Monitoring set up (Vercel alerts, Supabase alerts).
- [ ] Cost tracking enabled (Vercel + Supabase usage dashboards bookmarked).

### E.3 Knowledge transfer
- [ ] Walkthrough call held with the tenant or internal team.
- [ ] Q&A documented in `08_lessons-learned.md`.
- [ ] Recipient confirms they can run a routine operation (add an entry, run a report) without help.

### E.4 Closure
- [ ] `13_project-closure.md` drafted with deliverable verdicts, success criteria assessment, final budget, final schedule.
- [ ] Closure signed off by Sponsor + Project Lead + Operations Lead.
- [ ] Project marked `READY` (or `BETA` if applicable) in the `applications` table.
- [ ] First scheduled review date set (monthly per `ai-solutions-cloud-first-practices` step 10).
- [ ] Project added to the bootstrap-skill registry (so future Cowork threads know about it).

### E.5 Warranty period (NEW — covers the post-closure stage before BAU)

The warranty period runs from closure sign-off for the duration defined in `15_warranty-and-bau-handover.md` (default: 30 days). During warranty, the project team is still on the hook for defects in delivered work.

- [ ] Warranty period start and end dates recorded in `15_warranty-and-bau-handover.md` §1.
- [ ] Triage SLA confirmed for warranty issues (default: 2 business days per `15` §"Lifecycle cadence").
- [ ] Weekly triage backlog meeting continues throughout warranty period.
- [ ] Warranty workflow (per `15` §4) followed for each issue raised: triage as warranty / new request / known-and-accepted.
- [ ] Any new requests during warranty routed to `03_decision-log.md` as Scope Decisions, NOT absorbed silently.

### E.6 BAU handover (NEW — formal transfer to operations)

BAU handover is the formal end of the project lifecycle. Per `15_warranty-and-bau-handover.md` §5, all of the following must be confirmed before sign-off.

- [ ] Operations Lead has access to all credentials in `02_credentials-manifest.md` (verified by ops lead attempting access).
- [ ] Operations Lead has `04_incident-response.md` runbook AND has read it (ideally walked through one tabletop scenario).
- [ ] `05_backup-restore.md` procedures tested IN OPS TEAM'S HANDS (backup created by ops, restore tested by ops).
- [ ] Monitoring and alerting routed to ops team's channels. Ops team has acknowledged at least one test alert.
- [ ] Knowledge transfer sessions complete and logged (per `15` §5 knowledge transfer log).
- [ ] Warranty period elapsed OR explicitly extended in writing.
- [ ] All warranty-period open items resolved OR formally accepted by ops team.
- [ ] **Triage manager role transferred** from Project Lead to Operations Lead (per `17_triage-guidance.md` §3.3). Date recorded.
- [ ] BAU handover signed off by Project Lead (releasing) + Operations Lead (receiving) + Sponsor (witnessing) per `15` §6.

---

## Hard rules

1. **Don't skip C.4** (security verification). Security has to be at the end of testing, not after deploy.
2. **Don't promote to production with open `severity='critical'` issues.** Resolve or downgrade with rationale.
3. **Don't hand over without a successful restore drill in the last 30 days.** If you've never restored, you have no backup.
4. **Don't declare closure without sign-offs in E.4.** A project that's "done" without a signed closure report is a project that gets re-litigated later.
5. **Don't enter BAU without ticking every box in E.6.** An unprepared ops team is worse than an extended warranty.
6. **Update PROJECT-CONFIG.md "Last Updated"** every time you tick off a major section here.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE from Phase A through BAU handover (per `01_apply-order.md` + new Phases E.5/E.6 above).
- The single most-referenced governance document throughout the project — it's the "are we ready to move on?" gate at every phase transition.

**Default cadence:**
- **Checked off** as each item completes — no fixed cadence, event-driven.
- **Reviewed at every phase transition** (A→B, B→C, etc.) — the project lead confirms every box in the previous phase is ticked OR has a strike-through with rationale.
- **Updated** if a step doesn't apply OR if a new step is required for this project (mark amendments in the change log).

**Why this default:**
- Phase-gate review is the discipline that prevents premature progression. "Are we ready to deploy?" requires Phase C complete, not Phase C "mostly done."
- Project-specific amendments are normal but must be visible — a strike-through with reason is auditable; a deletion is not.

**When to amend the cadence:**
- **Tighten** (weekly review of open items) if: project is in trouble OR phase has dragged on past expected duration.
- **Loosen** (review only at phase transitions) if: project is on track AND team is small enough that progress is visible without formal review.
- **Skip entirely** is not an option — this is the foundational gate-keeping artefact. If you skip it, you don't have governance.

---

## Linked documents

- `01_apply-order.md` — high-level phase view; this checklist is the granular form.
- `14_project-initiation.md` — PID referenced in A.1 and at every closure assessment.
- `13_project-closure.md` — closure assessment in E.4.
- `15_warranty-and-bau-handover.md` — defines E.5 and E.6 in detail.
- `16_raci-matrix.md` — referenced in A.1 sign-off.
- `17_triage-guidance.md` — referenced in A.6, C.5, E.5, E.6.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created | [Name] |
| 2026-05-19 | 1.1 | Added Phase A.6 governance baseline. Added Phase C.5 triage rhythm. Added Phase E.4 closure (formerly E.4 sign-off, expanded). Added Phase E.5 warranty period. Added Phase E.6 BAU handover. Added Hard Rules 4 and 5. Added Lifecycle cadence section per D-039. | Claude (Cowork) |

---

**End of project checklist template.**
