# PM Lite — Quickstart

**Deploy a tenant in under 60 minutes.**

This is the step-by-step for spinning up PM Lite for a new tenant (a client, or your own studio). The full procedure has 11 steps and assumes you already have a Supabase account, a Vercel account, and access to the `pm-lite` GitHub repo.

Estimated time: **45–60 minutes** start to finish.
Estimated tenant cost: **$0–$45/month** depending on tier.

---

## Prerequisites

Before you start, confirm you have:

1. A Supabase account (signed in with the tenant's preferred email, or use AI Solutions's account for hosted Studio tier).
2. A Vercel account on the same email.
3. Access to the `pm-lite` GitHub repository, or your fork of it.
4. The tenant's preferred subdomain or custom domain (optional — can be added later).
5. The tenant's brand colours, logo, and metadata for the rebrand step.

If anything in this list is missing, sort it before starting Step 1.

---

## Step 1 — Create the Supabase project (5 min)

1. Open `https://supabase.com/dashboard`.
2. Click **New project**.
3. Name it: `pm-lite-<tenantname>` (e.g. `pm-lite-acmestudio`).
4. Region: pick the closest to the tenant.
5. Database password: generate one and save it to your password manager (1Password).
6. Wait ~2 minutes for the project to provision.

When ready, note these three values from **Settings → API**:

- `Project URL` (e.g. `https://xxxxxxxxxxxxx.supabase.co`)
- `anon public` key
- `service_role` key — keep this secret, server-side only.

Save all three in 1Password under `AI Solutions / PM Lite / <tenant-name>`.

---

## Step 2 — Run the SQL migrations (10 min)

In the Supabase dashboard:

1. Click **SQL Editor** in the left nav.
2. Click **New query**.
3. Open `code/supabase/001_schema.sql` from this folder.
4. Copy the entire contents, paste into the SQL Editor, click **Run**.
5. Expected result: "Success. No rows returned."
6. Repeat in order for:
   - `code/supabase/002_views.sql`
   - `code/supabase/003_functions.sql`
   - `code/supabase/004_feedback_scaffold.sql`

Verify with this query in the SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('raidd_entries', 'lessons_entries', 'pm_lite_feedback', 'raidd_append_tokens');
```

Expected: **4 rows**.

**Optional:** if the tenant wants a populated dashboard for demo purposes, also run `code/seed-OPTIONAL/001_demo_seed.sql`. This file refuses to run if the database already has non-demo data, so it is safe.

---

## Step 3 — Fork or clone the code repo (5 min)

You have two paths:

**Path A — One repo per tenant (recommended for Studio resale):**

1. Fork `https://github.com/shaneburrowes73-beep/pm-lite` to the tenant's GitHub, or to yours managed on their behalf.
2. Clone locally if you need to make rebrand changes before deploy.

**Path B — Shared multi-tenant repo (Agency tier):**

Use one repo, configure each tenant via env vars only. Not covered here — see the buyer-facing docs in `docs/04_rebrand-guide.md` and the Agency-tier appendix.

For this quickstart, assume Path A.

---

## Step 4 — Create the Vercel project (5 min)

1. Open `https://vercel.com/new`.
2. Import the fork from Step 3.
3. Framework Preset: **Next.js** (auto-detected).
4. Project name: `pm-lite-<tenantname>`.
5. **Do NOT click Deploy yet.** Go to the Environment Variables section first.

---

## Step 5 — Set environment variables (5 min)

In the Vercel **Environment Variables** section, add the variables documented in `docs/VERCEL_ENV_VARS.md`. Headline list:

| Name | Value source | Sensitive? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Step 1 — Project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Step 1 — anon public key | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Step 1 — service_role key | **Yes** (tick Sensitive) |
| `NEXT_PUBLIC_SITE_URL` | The tenant's planned hostname | No |
| `BETA_PASSWORD_HASH` | bcrypt hash if running a beta landing | **Yes** |

**Important quirk:** once you tick **Sensitive** and save, the field appears EMPTY when you reopen it. That is normal — the value is saved. Do not re-paste.

For full guidance see `docs/VERCEL_ENV_VARS.md` (the protocol document).

---

## Step 6 — Configure Supabase Auth URLs (5 min)

**This is the step that catches most deploys. Get it right the first time.**

1. In Supabase dashboard → **Authentication → URL Configuration**.
2. Set **Site URL** to exactly:
   ```
   https://pm-lite-<tenantname>.vercel.app
   ```
   (or the custom domain if it's already set).
3. Under **Redirect URLs**, click **Add URL** for each (one per line):
   ```
   https://pm-lite-<tenantname>.vercel.app/tracker/reset-password
   https://pm-lite-<tenantname>.vercel.app/tracker
   https://pm-lite-<tenantname>.vercel.app/tracker/**
   ```
4. Click **Save**.

Without this step, password-reset emails will land on the homepage with `?error=otp_expired` instead of the reset form. See the troubleshooting table at the end of this doc.

---

## Step 7 — Deploy (3 min)

1. Back in Vercel, click **Deploy**.
2. Wait ~2 minutes for the build.
3. Click **Visit** when the build goes green.

You should land on the tenant's homepage. If it still says "AI Solutions" or shows the AI Solutions branding, you're good — the rebrand happens in Step 9.

**Important:** the Vercel home page sometimes shows green while the actual deployment is in ERROR. Open the **Deployments tab** and confirm the latest deployment shows `READY` (not `ERROR`). If it's `ERROR`, click in and read the build log.

---

## Step 8 — Create the tenant's first user (3 min)

In Supabase dashboard → **Authentication → Users → Add user → Send invitation**:

1. Email: the tenant's preferred login email.
2. Tick **Auto Confirm User** (so they don't need to click an email link to verify).
3. Click **Send invitation**.

The tenant clicks the invitation link, sets their password, and lands on `/tracker`.

Alternatively, use **Create new user** and set a temporary password yourself, then share it via 1Password.

---

## Step 9 — Rebrand (10 min)

Open `docs/04_rebrand-guide.md` for the full walkthrough. Headline changes:

1. **Logo:** replace `public/logo.svg` with the tenant's logo.
2. **Colours:** edit `tailwind.config.ts` — change `primary` (default `#2563eb`) and `dark` (default `#1f2937`) to the tenant's brand.
3. **Site title:** edit `app/layout.tsx` metadata.
4. **Hero text:** edit `app/page.tsx`.

Commit, push, Vercel auto-deploys. Confirm the new branding renders in the browser.

---

## Step 10 — Verify (5 min)

Open the tenant's URL and run through this checklist:

| Check | Pass criteria |
|---|---|
| `/` (homepage) loads | Tenant branding visible, no AI Solutions placeholders |
| `/tracker/login` loads | Login form visible |
| Login with tenant credentials | Lands on `/tracker` dashboard |
| `/tracker/raidd` loads | Empty list (or demo data if you ran the seed) |
| `/tracker/lessons` loads | Empty list |
| "New Entry" modal opens | Form validates required fields |
| Submit a test RAIDD entry | Appears in list, status pill shows correctly |
| `/tracker/forgot-password` flow | Email arrives, link goes to `/tracker/reset-password` (not the homepage) |
| Logout button works | Returns to `/tracker/login` |

If any check fails, see Troubleshooting below.

---

## Step 11 — Hand over to the tenant (5 min)

Send the tenant:

1. URL: `https://pm-lite-<tenantname>.vercel.app/tracker/login` (or custom domain).
2. Their email and initial password (delivered via 1Password share — never email).
3. Link to `docs/01_what-is-pm-lite.md` and the 8 template files in `templates/`.
4. Offer a 30-minute walkthrough call (included in Studio tier and above).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build fails with "Module not found: @supabase/ssr" | Repo dependencies outdated | `npm install` locally, commit `package.json` + lockfile, push |
| Login works but `/tracker` redirects back to login | Cookies not persisting | Confirm `NEXT_PUBLIC_SITE_URL` matches the actual hostname exactly (no trailing slash) |
| Password-reset email goes to homepage with `?error=otp_expired` | Step 6 incomplete OR email opened too late (OTP expires in ~5 min) | Redo Step 6, request a new email, click within 60 seconds |
| Password-reset email lands on wrong domain | Step 6 Site URL wrong | Fix Site URL in Supabase, request new email |
| "Failed to fetch" in browser console on `/tracker/raidd` | Env vars not set, or service-role key revoked | Verify all 5 env vars in Vercel, redeploy |
| Vercel shows "successful" but page shows old content | Vercel cache | Vercel → Deployments → 3-dot menu → Redeploy → untick "Use existing build cache" |
| RAIDD / Lessons POST returns 401 | Service-role key not present at runtime | Confirm `SUPABASE_SERVICE_ROLE_KEY` is in env vars (not just `SUPABASE_ANON_KEY`) |
| Vercel home page shows green but app errors | Latest deployment is in ERROR | Open Deployments tab and check `readyState` of the latest production deployment |

---

## Optional polish (do after handover)

- **Custom domain:** Vercel → Project → Settings → Domains → Add → follow DNS instructions.
- **Re-add custom domain to Supabase Redirect URLs** (Step 6) once added.
- **Email branding:** Supabase → Auth → Email Templates → customise sender name and body.
- **Backup schedule:** Supabase → Database → Backups → confirm Point-in-Time Recovery enabled (Pro tier).
- **Deployment Protection:** Vercel → Settings → Deployment Protection → enable for `/api/*` rate-limited routes.

---

## Cost summary

| Item | Cost |
|---|---|
| Supabase Free tier | $0/month (sufficient until ~5k rows) |
| Vercel Hobby tier | $0/month |
| Custom domain (optional) | ~$12/year |
| **Total month 1** | $0–$5 |

If the tenant scales to Pro: $25 Supabase + $20 Vercel = $45/month. Still under most enterprise PM tools' single-seat pricing.

---

**Next:** `03_pricing-model.md` for the resale conversation, or `04_rebrand-guide.md` for the visual rebrand in detail.
