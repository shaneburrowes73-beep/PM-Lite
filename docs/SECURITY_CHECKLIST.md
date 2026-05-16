# PM Lite — Security Checklist

**Project:** PM Lite
**Last Updated:** 2026-05-14
**Baseline:** AI Solutions portfolio-quick-reference security baseline. Each PM Lite tenant deployment must meet this before promotion to Production.

---

## GitHub Security (per repository)

For the `pm-lite` repo when it exists, and any tenant fork:

- [ ] Code Scanning enabled (CodeQL analysis)
- [ ] Dependabot alerts enabled
- [ ] Dependabot security updates enabled
- [ ] Secret scanning enabled
- [ ] Branch protection on `main` (require PR review, pass status checks)
- [ ] `.gitignore` configured (excludes `.env`, `.env.local`, `credentials.json`, `*.pem`, `node_modules/`, `.next/`)
- [ ] No secrets in git history. Verify: `git log -p --all -S 'password\|token\|secret\|ghp_\|sk_live_' | head -100`
- [ ] LICENCE.md included in repo root
- [ ] No buyer-identifying data in the repo (run `grep -ri "<tenant-name>" .` before public push)

---

## Vercel Security (per project)

For each per-tenant Vercel project (`pm-lite-<tenantname>`):

- [ ] Deployment Protection enabled (or explicitly disabled for public-facing testers, with reason logged as a Decision in RAIDD)
- [ ] Environment variables set in Vercel (NEVER hardcoded in code)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` marked Sensitive
- [ ] Security headers configured: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Custom domain configured with valid TLS (or `*.vercel.app` for tenants who haven't bought a domain)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` points to the tenant's own Supabase project — NOT the AI Solutions tracker DB

---

## Supabase Security (per tenant DB)

- [ ] RLS enabled on every public table (`raidd_entries`, `lessons_entries`, `pm_lite_feedback`, `raidd_append_tokens`, `raidd_append_rate`)
- [ ] Service-role-only tables (`raidd_append_tokens`, `raidd_append_rate`) have RLS-on with no policies
- [ ] Authentication → URL Configuration: Site URL and Redirect URLs match the tenant's domain
- [ ] Password reset email cap (4/hour) confirmed enabled (Supabase default — verify still set)
- [ ] Initial admin user created with Auto Confirm (so they can log in immediately)
- [ ] Backup admin user documented (RAIDD entry `A-PML-001` mitigation)
- [ ] If Pro tier: Point-in-Time Recovery enabled

---

## Credentials Management

- [ ] All tenant credentials stored in 1Password vault `AI Solutions / PM Lite / <tenant-name>`
- [ ] Service accounts used for any integration (never personal accounts)
- [ ] No plaintext secrets in any code file or documentation file
- [ ] Credential rotation schedule set (see `VERCEL_ENV_VARS.md` — quarterly for sensitive)
- [ ] PROJECT-CONFIG.md documents all credentials by vault reference only (never value)
- [ ] Incident response procedure documented (this file) and shared with anyone touching the tenant deployment

---

## Append-Endpoint Security (if `/api/raidd/append` is enabled for the tenant)

- [ ] Bearer token issued per (project, machine) and stored bcrypt-hashed in `raidd_append_tokens`
- [ ] Rate limit set to 60 inserts/hour per token (configurable per tenant)
- [ ] Webhook traffic logged with timestamp + token hash (not the raw token)
- [ ] Failed-auth attempts >5/min trigger alert (see Incident Response below)
- [ ] Token rotation: 90-day cycle; quarterly rotation entered into operator's calendar

---

## Monitoring & Documentation

- [ ] Security headers verified post-deploy: `curl -I https://<tenant-domain> | grep -E "strict|content-security|x-frame|x-content-type"` returns expected headers
- [ ] CodeQL alerts reviewed at least monthly; criticals fixed before next deploy
- [ ] Dependabot alerts triaged within 7 days
- [ ] Vercel Deployments dashboard checked weekly for ERROR states (see lesson L-003 — the Vercel home page can show green while the latest deployment errored)
- [ ] Team trained on credential management and the incident response below

---

## Compliance baseline

Per `portfolio-quick-reference`:

- [ ] No PII in `raidd_entries.description` text. PII goes in `metadata.jsonb` with explicit fields.
- [ ] GDPR: tenant has data export (CSV) and data deletion procedures on file. Documented in tenant onboarding pack.
- [ ] Data retention: buyer owns their data; on termination, deleted within 30 days unless legal hold.
- [ ] No data sales, no third-party data sharing in v1.0.

---

## Incident Response

If something goes wrong:

### Exposed credential (CRITICAL — escalate immediately)

1. Revoke the credential in the source system (Supabase Settings → API → rotate, or Vercel Settings → Env → delete + recreate).
2. Generate a replacement, update Vercel env vars, redeploy.
3. Email `security@aisolutionsnet.net` with: what credential, where found, when revoked.
4. Notify affected tenants within 1 hour.
- Target: fix within 1 hour, notify within 2 hours.

### CodeQL or Dependabot critical alert (CRITICAL — fix before next deploy)

1. Pause deployments of affected branch.
2. Fix the issue or update the dependency.
3. Re-run CodeQL / tests to confirm fix.
4. Merge only after all checks pass.
- Target: fix within 24 hours.

### Unauthorised tenant data access (HIGH — investigate immediately)

1. Review Supabase Auth audit log for the time window.
2. Confirm RLS policy was active when access occurred.
3. If RLS bypass: rotate service-role key, fix policy, redeploy, then notify tenant.
- Target: investigate within 2 hours.

### Failed-auth burst (MEDIUM — monitor and alert)

1. Check Supabase auth log for the source IP/email pattern.
2. If brute-force: rotate `BETA_PASSWORD_HASH` if applicable; consider Supabase rate-limit settings.
3. If misconfiguration on tenant side: notify tenant and fix.
- Target: respond within 1 hour.

### Vercel deployment showing ERROR while home page shows green (LOW — fix at next opportunity)

This is the recurring portfolio gotcha (lesson L-003). The Vercel home page lies; the Deployments tab is truth.

1. Open Vercel → Deployments tab.
2. Find the latest deployment in ERROR.
3. Read the build log to identify the cause.
4. Fix locally, push, verify.
- Target: fix within 1 business day.

---

## Verification commands

```bash
# Headers
curl -I https://<tenant-domain> | grep -E "strict|content-security|x-frame|x-content-type"

# Git history secrets scan
git log -p --all -S 'password\|token\|secret\|ghp_\|sk_live_' | head -100

# Env var sanity
vercel env pull .env.local
grep NEXT_PUBLIC_SUPABASE_URL .env.local
# Expected: the tenant's project URL, NOT the AI Solutions tracker URL

# RLS sanity (Supabase SQL Editor)
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public';
-- Every table in the list must show rowsecurity = true
```

---

**Last reviewed:** 2026-05-14.
