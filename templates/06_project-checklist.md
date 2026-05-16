# [Project Name] — Project Checklist

**Version:** 1.0
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
- [ ] No critical alerts from CodeQL or Dependabot.
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

### E.4 Sign-off
- [ ] Project marked `READY` (or `BETA` if applicable) in the `applications` table.
- [ ] First scheduled review date set (monthly per `ai-solutions-cloud-first-practices` step 10).
- [ ] Project added to the bootstrap-skill registry (so future Cowork threads know about it).

---

## Hard rules

1. **Don't skip C.4** (security verification). Security has to be at the end of testing, not after deploy.
2. **Don't promote to production with open `severity='critical'` issues.** Resolve or downgrade with rationale.
3. **Don't hand over without a successful restore drill in the last 30 days.** If you've never restored, you have no backup.
4. **Update PROJECT-CONFIG.md "Last Updated"** every time you tick off a major section here.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document created | [Name] |

---

**End of project checklist template.**
