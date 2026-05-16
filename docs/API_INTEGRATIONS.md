# PM Lite — API Integrations

**Project:** PM Lite
**Last Updated:** 2026-05-14
**Scope:** Per-tenant deployment. Each tenant has the same integration list.

---

## Integration inventory

| Integration | Status (v1.0) | Notes |
|---|---|---|
| Supabase Auth | Required | Email/password + magic-link reset |
| Supabase Postgres + RLS | Required | One DB per tenant |
| Vercel | Required | Hosting + env var management |
| Cloudflare DNS | Optional | When tenant uses custom domain |
| Gmail SMTP | Optional | Outbound notifications (per-tenant; we offer this as an upsell, not bundled) |
| n8n | Out of scope v1.0 | May be added in v1.1 for cross-tool sync |

No third-party LLM APIs in v1.0. No Stripe / billing API (collected manually via invoice for Studio tier).

---

## Integration 1 — Supabase Auth

- **Purpose:** Tenant user authentication (email/password + password reset via magic link).
- **Auth method:** Built into Supabase. Configured via Supabase dashboard → Authentication.
- **Rate limits:** Supabase default — password reset emails capped at 4/hour per email.
- **Cost model:** Free up to 50k monthly active users on Supabase Free tier. $25/month Pro tier when buyer scales.
- **Monitoring:** Supabase dashboard → Authentication → Users.
- **Fallback:** If Supabase Auth is down, tracker UI shows maintenance message. No fallback auth provider in v1.0.
- **Incident response:** See `SECURITY_CHECKLIST.md` "Emergency credential revocation". Affected tenant gets a status update within 1 hour.

## Integration 2 — Supabase Postgres + RLS

- **Purpose:** Persistent storage for `raidd_entries`, `lessons_entries`, `pm_lite_feedback`, etc.
- **Auth method:** Anon key (browser) + service-role key (server-side only, never exposed). Per-tenant.
- **Rate limits:** Supabase Free tier — soft cap at 500 concurrent connections, 5 GB DB size. Pro tier raises both.
- **Cost model:** Free → Pro $25/mo when needed.
- **Monitoring:** Supabase dashboard → Database → Performance.
- **Fallback:** RLS-on with no policies = service-role-only (deny by default). If RLS misconfigured, tenant sees empty lists, not other tenants' data.
- **Incident response:** Point-in-time recovery available on Supabase Pro. Backup procedure documented in `docs/05_handover-checklist.md` (buyer-facing).

## Integration 3 — Vercel

- **Purpose:** Hosts the Next.js tracker app per tenant.
- **Auth method:** Vercel account + GitHub OAuth for deploys.
- **Rate limits:** Vercel Hobby — 100 GB bandwidth/month, 12 serverless functions max. Pro raises both.
- **Cost model:** Hobby Free → Pro $20/mo when bandwidth or features require.
- **Monitoring:** Vercel dashboard → Deployments + Analytics.
- **Fallback:** Vercel CDN serves last-known-good if deploy fails mid-build.
- **Incident response:** Roll back via Vercel → Deployments → previous → Promote to Production.

## Integration 4 — Cloudflare DNS (optional, custom-domain tenants)

- **Purpose:** Tenant's custom domain points to Vercel.
- **Auth method:** Cloudflare account, per-tenant.
- **Rate limits:** Free tier covers unlimited DNS records.
- **Cost model:** Free for DNS-only use.
- **Monitoring:** Cloudflare dashboard → DNS → Records.
- **Fallback:** If DNS misconfigured, tenant accesses via `pm-lite-<tenantname>.vercel.app` until fixed.
- **Incident response:** DNS changes propagate in 5–60 min. If a tenant reports their custom domain offline, verify the A/CNAME record matches Vercel's instructions.

## Integration 5 — Gmail SMTP (optional upsell)

- **Purpose:** Outbound RAIDD notifications, weekly digests, etc. (only enabled if tenant requests.)
- **Auth method:** Gmail App Password (per-tenant). Stored in 1Password under that tenant's vault entry.
- **Rate limits:** Gmail SMTP free tier — 100 messages/day per Google Workspace account.
- **Cost model:** Free if tenant has their own Google Workspace. Otherwise Studio tier includes outbound via AI Solutions's relay (subject to AI Solutions's own 100/day cap).
- **Monitoring:** Supabase `feedback_notifications` audit log (when this feature is wired in).
- **Fallback:** Outbound email failures retried with exponential backoff (1 min, 5 min, 30 min, 2 hr).
- **Incident response:** If 3 retries fail, log to `raidd_entries` as an Issue (`type='issue'`, `severity='medium'`) and surface in the tracker UI.

---

## Adding a new integration

Per AI Solutions cloud-first-practices step 3:

1. Add a new entry in this table with all 7 sub-fields (Purpose, Auth, Rate, Cost, Monitor, Fallback, Incident).
2. Document credentials reference in `VERCEL_ENV_VARS.md` (vault location only, never the values).
3. Log a `decision` entry in `raidd_entries` (`project_id='pm-lite'`) capturing why this integration was chosen.
4. Update `PROJECT-CONFIG.md` "Last Updated" with the change.

---

**Last reviewed:** 2026-05-14.
