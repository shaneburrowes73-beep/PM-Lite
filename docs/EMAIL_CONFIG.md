# PM Lite — Email Configuration

**Project:** PM Lite
**Last Updated:** 2026-05-14
**Scope:** Per-tenant. Email is OPTIONAL in PM Lite v1.0.

---

## What email PM Lite needs

| Email type | When it's sent | Required? | Sender |
|---|---|---|---|
| Password reset | User clicks "Forgot password" on `/tracker/login` | Yes (auth flow) | Supabase Auth (sends from `noreply@supabase.io` by default; rebrandable on Pro tier) |
| Magic-link login | If tenant enables passwordless | Optional | Supabase Auth (same as above) |
| Account invitation | Admin invites a new user from Supabase dashboard | Yes (onboarding flow) | Supabase Auth |
| RAIDD notification | A critical Issue is logged | Optional — Studio+ tier | Tenant's Gmail SMTP (configured per `VERCEL_ENV_VARS.md`) |
| Weekly digest | Sunday evening, summarising the week's RAIDD | Optional — Studio+ tier | Tenant's Gmail SMTP |

---

## Email provider

**Default:** Supabase Auth's built-in email service for auth-related emails. Free tier: 4 password-reset emails per hour per email address. Tenant can upgrade Supabase Pro to customise sender and increase rate.

**For RAIDD notifications and digests (optional):** Tenant's own Gmail / Google Workspace via Gmail SMTP with App Password.

**NOT used:**
- Resend (deprecated portfolio-wide per `portfolio-quick-reference`).
- SendGrid, Postmark, Mailgun (out of scope v1.0).
- AI Solutions's own `alerts@aisolutionsnet.net` for buyers — that sender is reserved for internal AI Solutions traffic and must not appear in any buyer-facing email path.

---

## Authentication method

- **Supabase Auth emails:** managed by Supabase. No tenant configuration needed beyond the URL Configuration step in onboarding (see `SUPABASE_CONFIG.md`).
- **Gmail SMTP (optional):** tenant generates an App Password at `https://myaccount.google.com/apppasswords`. Stored in 1Password under `AI Solutions / PM Lite / <tenant> / gmail / app_password`. Set in Vercel env vars `GMAIL_USER` and `GMAIL_APP_PASSWORD`.

---

## Email templates

### Supabase Auth templates (per-tenant rebranding)

Edit at: Supabase dashboard → Authentication → Email Templates.

- **Confirm signup:** off (we use Auto Confirm for admin-invited users).
- **Magic link:** standard wording — replace "Acme" with tenant name.
- **Change email address:** standard wording.
- **Reset password:** must include the `{{ .ConfirmationURL }}` placeholder. Verify it points to `<NEXT_PUBLIC_SITE_URL>/tracker/reset-password`.
- **Invite user:** customise to mention "you've been invited to <tenant name>'s PM Lite tracker".

### Outbound notification templates (in app code, if enabled)

When `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set:

- **RAIDD critical issue:** subject "[<tenant>] CRITICAL issue logged: <title>" — body: title, owner, link to entry.
- **Weekly digest:** subject "[<tenant>] Week ending <date> — <N> entries this week" — body: count by type, top 3 overdue.

Templates live in `code/app/api/notifications/templates/`. Not yet implemented.

---

## Sending rules / triggers

- **Password reset:** triggered by user action only. Supabase rate-limited.
- **RAIDD notification (if enabled):** triggered when a row is INSERTed into `raidd_entries` with `type='issue'` AND `severity='critical'`. Implemented via a Supabase trigger calling a webhook to the Next.js API route, which sends via Gmail SMTP.
- **Weekly digest (if enabled):** triggered by an n8n workflow (out of scope v1.0) or a Vercel Cron Job at `Sun 18:00 UTC`.

---

## Recipients

- **Tenant admin user:** receives all notifications by default.
- **Additional recipients:** configured in the tracker UI Settings page (optional v1.1 feature).
- **AI Solutions monitoring:** AI Solutions does NOT receive copies of tenant emails. Operator monitoring is via Vercel logs and Supabase dashboard, not via email.

---

## Rate limiting

- **Supabase Auth emails:** 4 per hour per email address (built-in).
- **Gmail SMTP:** 100 emails per day per Google Workspace user (free tier).
- **App-level:** outbound notifications throttled to 10 per hour per tenant. Excess queued and sent over the next hour. Exceeding the queue triggers an Issue (`severity='medium'`) in `raidd_entries`.

---

## Error handling

| Failure | Detection | Recovery |
|---|---|---|
| Supabase Auth email fails to send | Tenant reports "I clicked Forgot Password but no email arrived" | Check Supabase → Logs → Auth. Verify spam folder. Verify Auth URL config matches tenant domain. |
| Gmail SMTP returns 5xx | Server-side log + retry queue | Retry: 1 min, 5 min, 30 min, 2 hr. If all fail, log Issue. |
| Gmail SMTP returns 4xx (e.g. auth failure) | Server-side log | Do NOT retry. Notify tenant via dashboard banner: "Outbound email is currently unavailable. Please verify Gmail App Password." |
| Email goes to spam | Tenant reports | Add SPF / DKIM records to tenant domain (manual onboarding step). |

---

## Onboarding email step

Per `docs/02_quickstart.md` (buyer-facing, not yet written):

1. Confirm Supabase Auth URL configuration matches tenant domain.
2. Send a test password-reset to the admin user's email. Confirm it arrives.
3. Confirm the email landing page is `/tracker/reset-password`, not the home page.
4. (Optional) Configure Gmail SMTP env vars if tenant wants outbound notifications.
5. (Optional) Send a test notification from the tracker UI Settings page.

---

**Last reviewed:** 2026-05-14.
