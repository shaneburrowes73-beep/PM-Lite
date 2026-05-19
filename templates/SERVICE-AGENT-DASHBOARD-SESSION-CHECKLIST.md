# service-agent — Dashboard session checklist

**Purpose:** unblock the 4 outstanding dependencies (Dep-005, Dep-007, Dep-008, plus the `live: false` flag) and push the three v0.1.0 component slices so the end-to-end smoke test can run.

**Estimated time:** 30–40 minutes.

**What you'll have at the end:** discovery → checkout → welcome flow live on https://service-agent-sable.vercel.app, with Stripe card payments working, Slack alerts firing into `#alerts-critical`, and Vercel showing `live: true`.

**Before you start, open these 6 tabs in your browser:**

1. Stripe Dashboard — https://dashboard.stripe.com
2. Slack — https://app.slack.com (workspace where `#alerts-critical` lives)
3. 1Password — https://my.1password.com
4. Vercel — https://vercel.com/aisolutions-9934s-projects/service-agent
5. n8n — https://aisolutionsglobal.app.n8n.cloud
6. GitHub — https://github.com/shaneburrowes73-beep/service-agent

You'll also need a terminal open at `C:\Users\barba\OneDrive\Desktop\Claude playground\` (or wherever you want to clone the repo for step 7).

---

## Step 1 — Stripe: create account, webhook endpoint, and grab the secret key

**This step resolves Dep-005 and Dep-007 in one session.**

### 1a. Confirm Stripe account exists

Go to https://dashboard.stripe.com and log in with the `AISolutions@aisolutionsnet.net` account.

If the account doesn't exist:
- Click "Sign up", use `AISolutions@aisolutionsnet.net`.
- Business name: `AI Solutions`.
- Business website: `https://aisolutionsnet.net`.
- You can stay in test mode for now — no need to complete the live-mode activation until you're ready to take real card payments.

### 1b. Make sure you're in TEST mode

Top-right of the Stripe dashboard, there's a toggle. Make sure it says **Test mode** (orange/dark). For everything below in this step, you want test mode.

### 1c. Copy the test secret key


1. In the left sidebar: **Developers** → **API keys**.
2. Under "Standard keys", find **Secret key**. Click "Reveal test key".
3. Copy the value (starts with `sk_test_...`). Keep this tab open — you'll paste this into Vercel in step 4.

### 1d. Create the webhook endpoint for the payment-received orchestrator

1. Still in **Developers** → **Webhooks**.
2. Click **Add endpoint**.
3. Endpoint URL: `https://aisolutionsglobal.app.n8n.cloud/webhook/service-agent-stripe`
   (this is the n8n webhook URL — if the orchestrator workflow uses a different path, copy it from the `service-agent-01-stripe-orchestrator-v1.json` workflow in n8n; see step 6 for how to confirm).
4. Description: `service-agent stripe payment events`.
5. Select events to listen to. Click **+ Select events** and tick these four:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
   - `checkout.session.expired`
6. Click **Add endpoint**.
7. On the endpoint detail page, click **Reveal signing secret** (starts with `whsec_...`). Copy it — this is `SERVICE_AGENT_STRIPE_WEBHOOK_SECRET`.

**You now have two values copied somewhere safe:**
- `STRIPE_SECRET_KEY` = `sk_test_...`
- `SERVICE_AGENT_STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

## Step 2 — Slack: grab the existing webhook URL

The webhook URL was already created per D-010 yesterday. You need to find it again.

1. Go to https://api.slack.com/apps and log in.
2. Click the app that owns the `#alerts-critical` webhook (likely named something like "AI Solutions Alerts" or similar).
3. In the left sidebar: **Features** → **Incoming Webhooks**.
4. Find the webhook pointing to `#alerts-critical`. Click "Copy" next to its URL.
5. The value starts with `https://hooks.slack.com/services/T.../B.../...`.

If you can't find the existing webhook:
- Create a new one: same app → **Incoming Webhooks** → **Add New Webhook to Workspace** → pick `#alerts-critical` → **Allow** → copy the new URL.

**You now have:**
- `SLACK_WEBHOOK_URL` = `https://hooks.slack.com/services/...`

---

## Step 3 — 1Password: store the 3 new secrets

**Vault to use:** the standard `AI Solutions` vault (per D-011 convention).

### 3a. Store the Slack webhook

1. In 1Password, click **+ New item** → **Secure Note** (or **API Credential** if your vault uses it).
2. Title: `AI Solutions / Slack / Critical alerts webhook`
3. Fields:
   - `webhook_url`: paste the value from step 2
   - `channel`: `#alerts-critical`
   - `created`: today's date
4. Save.

### 3b. Generate ALERTS_SHARED_SECRET and store it

1. In 1Password, **+ New item** → **Password**.
2. Title: `AI Solutions / service-agent / ALERTS_SHARED_SECRET`
3. Use the password generator → length 40, all character types → **Generate**.
4. Save.
5. Copy the generated value — you'll paste it into Vercel and n8n in steps 4 and 6.

### 3c. Store the Stripe values

1. **+ New item** → **API Credential** (or Secure Note).
2. Title: `AI Solutions / Stripe / service-agent — test mode`
3. Fields:
   - `secret_key`: paste the `sk_test_...` value from step 1c
   - `webhook_signing_secret`: paste the `whsec_...` value from step 1d
   - `mode`: `test`
   - `created`: today's date
4. Save.

**You now have 4 values stored in 1Password and copied to clipboard for the next step:**
- `STRIPE_SECRET_KEY`
- `SERVICE_AGENT_STRIPE_WEBHOOK_SECRET`
- `SLACK_WEBHOOK_URL`
- `ALERTS_SHARED_SECRET`

---

## Step 4 — Vercel: paste the 4 env vars into the service-agent project

1. Open https://vercel.com/aisolutions-9934s-projects/service-agent.
2. Click **Settings** (top of the project page) → **Environment Variables** (left sidebar).
3. For each of the 4 values, click **Add New**:

| Key | Value | Environments to tick |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_...` from 1c | Production, Preview, Development |
| `SERVICE_AGENT_STRIPE_WEBHOOK_SECRET` | `whsec_...` from 1d | Production, Preview, Development |
| `SLACK_WEBHOOK_URL` | `https://hooks.slack.com/...` from 2 | Production, Preview, Development |
| `ALERTS_SHARED_SECRET` | 40-char value from 3b | Production, Preview, Development |

After each one click **Save**.

### 4a. Spot-check the Supabase URL (per RAIDD v1.4 Dep-006)

While you're in the env vars page, look at `NEXT_PUBLIC_SUPABASE_URL`. It MUST read:

```
https://izxsbtpepvjcmwjagvgz.supabase.co
```

If it reads `xhsnjgsyuwthunyvtcke` or `kakcffjknzncfcydlsnt` (the two known ghost URLs), click the three dots on its row → **Edit** → paste the correct value → **Save**. This is the third known ghost-URL case; flag any other env var with a `*.supabase.co` URL and check it the same way.

### 4b. Set the framework explicitly

Still in **Settings**, click **General** (left sidebar).

Scroll to **Framework Preset**. If it says "Other" or is blank, click **Edit** → pick **Next.js** → **Save**.

This was `null` in the Vercel project metadata; setting it explicitly fixes detection on future deploys.

---

## Step 5 — Push the three component slices to GitHub

This is the bit that puts discovery, checkout, and monitoring into production. The components are sitting in Drive at `14-service-agent/code/service-agent/` but the GitHub repo only has the landing page from 2026-05-12.

### 5a. Open a terminal and clone the repo (if not already cloned)

```cmd
cd C:\Users\barba\OneDrive\Desktop\Claude playground
git clone https://github.com/shaneburrowes73-beep/service-agent.git
cd service-agent
git pull
```

If the folder already exists, just:
```cmd
cd C:\Users\barba\OneDrive\Desktop\Claude playground\service-agent
git pull
```

### 5b. Download the three component folders from Drive

Open Drive at https://drive.google.com/drive/folders/1UuA4NzGbtaTbOaFiU3Q_EhpkhsxfjjC8 (this is `code/service-agent/`).

Download all three component folders to your local repo, **merging into the existing structure** (not creating a `-v0.1.0` subfolder in the repo):

| Drive folder | Files to copy | Local destination |
|---|---|---|
| `discovery-v0.1.0/app/` | `discovery/page.tsx`, `discovery/DiscoveryWizard.tsx`, `api/discovery/route.ts` | `app/` (merge into existing app folder) |
| `discovery-v0.1.0/lib/` | `discovery.ts` | `lib/` (create if missing) |
| `checkout-v0.1.0/app/` | `checkout/page.tsx`, `checkout/CheckoutActions.tsx`, `welcome/page.tsx`, `api/checkout/stripe-session/route.ts`, `api/checkout/manual/route.ts` | `app/` |
| `checkout-v0.1.0/lib/` | `checkout.ts`, `stripe.ts` | `lib/` |
| `monitoring-v0.1.0/app/` | `api/alerts/route.ts` | `app/api/` |
| `monitoring-v0.1.0/lib/` | `alerts.ts`, `audit.ts` | `lib/` |

After this your repo's `app/` should have folders: existing landing-page files + `discovery/`, `checkout/`, `welcome/`, `api/discovery/`, `api/checkout/stripe-session/`, `api/checkout/manual/`, `api/alerts/`. And your `lib/` folder should have: `discovery.ts`, `checkout.ts`, `stripe.ts`, `alerts.ts`, `audit.ts`.

**Simpler alternative — let me know in this thread** and I can write a single PowerShell script that copies these from the Drive-synced OneDrive folder if you have the project synced locally. The drag-from-Drive approach above is the lowest-common-denominator option.

### 5c. Check for NUL byte corruption before pushing

Because the files came from OneDrive-synced Drive, run the NUL-strip check from your skill before committing:

```cmd
cd C:\Users\barba\OneDrive\Desktop\Claude playground\service-agent
python -c "import os; [print(f, os.path.getsize(f), open(f,'rb').read().count(b'\x00')) for f in ['app/discovery/page.tsx','app/discovery/DiscoveryWizard.tsx','app/checkout/page.tsx','app/checkout/CheckoutActions.tsx','app/welcome/page.tsx','app/api/discovery/route.ts','app/api/checkout/stripe-session/route.ts','app/api/checkout/manual/route.ts','app/api/alerts/route.ts','lib/discovery.ts','lib/checkout.ts','lib/stripe.ts','lib/alerts.ts','lib/audit.ts']]"
```

This prints `filename size nul_byte_count` for each file. **Every NUL count must be 0.** If any file has NUL bytes, run the Track A Fix-Push NUL-strip step on that specific file before continuing.

### 5d. Commit and push

```cmd
git add app/discovery app/checkout app/welcome app/api lib
git status
```

Eyeball the `git status` output — you should see ~14 new files. Then:

```cmd
git commit -m "feat: discovery wizard, checkout flow (Stripe + manual), monitoring + Slack alerts (v0.1.0)"
git push
```

Vercel will auto-trigger a deploy from this push. Watch the build at https://vercel.com/aisolutions-9934s-projects/service-agent/deployments. Wait until the new deployment shows **Ready**.

---

## Step 6 — n8n: paste the env vars and import/refresh the alerts orchestrator

### 6a. Add the two env vars to n8n

1. Open https://aisolutionsglobal.app.n8n.cloud.
2. Top-right user menu → **Settings** → **Environment variables** (or **Variables** depending on n8n cloud's current UI).
3. Add:

| Name | Value |
|---|---|
| `SLACK_WEBHOOK_URL_ALERTS_CRITICAL` | the same Slack webhook URL from step 2 |
| `ALERTS_SHARED_SECRET` | the 40-char value from step 3b |

4. Save.

### 6b. Import the alerts orchestrator workflow

1. n8n → **Workflows** → **Import from file**.
2. Download `service-agent-02-alerts-orchestrator-v1.json` from Drive: https://drive.google.com/file/d/1zvgTf_l2lLUwuvZuzpE5hddV4MV1Vacs/view
3. Upload the JSON.
4. Open the imported workflow → **Activate** (toggle top-right).

### 6c. Confirm the Stripe orchestrator workflow is also active

1. n8n → **Workflows**.
2. Find `service-agent-01-stripe-orchestrator-v1` (imported from Drive on 2026-05-13 if not already there — file id `1ACTnOCoBBMQ0szEuq7DtfPj6U9lGEfl-`).
3. Click into it. Find the webhook node and confirm the path matches what you used in step 1d. If it doesn't, update the Stripe endpoint URL there.
4. Toggle **Active**.

---

## Step 7 — Promote to Production and verify `live: true`

This clears the `live: false` flag flagged in RAIDD v1.4 D-025.

1. Open https://vercel.com/aisolutions-9934s-projects/service-agent/deployments.
2. Find the most recent **Ready** deployment (the one from step 5d's push).
3. Click the three dots `...` on that row → **Promote to Production**.
4. Refresh the project home page. The `live` indicator should now be green/true.

---

## Step 8 — End-to-end smoke test (the RAIDD v1.5 D-030 trigger)

Open https://service-agent-sable.vercel.app in a fresh incognito window.

### 8a. Landing → discovery
- Click any "Get started" or "Pick your plan" button on the landing page → should land at `/discovery`.
- Walk through the 5 questions. Pick:
  - Industry: anything
  - Volume: `150–500` (this should push you into `pro` tier)
  - Channels: tick at least 2 including `Phone calls`
  - Integrations: anything
  - Contact: real email + phone (use a throwaway like `+1 555 0100` if you don't want a real one)
- Click finish. Should redirect to `/checkout?tier=pro&market=…&cid=…`.

### 8b. Discovery sanity-check in Supabase
- Open https://supabase.com/dashboard/project/izxsbtpepvjcmwjagvgz/editor.
- Open `public.customers`. Find your new row, status should be `discovery_complete`, tier should be `pro`.

### 8c. Checkout — Stripe path
- On `/checkout`, you should see a Stripe "Pay with card" button (and, if your market is Barbados, a "Pay by bank transfer" button alongside).
- Click the Stripe button. You should be redirected to a Stripe Checkout Session page.
- Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC, any postcode.
- Submit. You should be redirected to `/welcome`.

### 8d. Checkout — verify webhook fired
- Back in Supabase, refresh `public.customers`. Your row should now have `payment_status='paid'` and `subscription_status` should have moved off `discovery_complete`.
- Also check `public.stripe_payment_events` — there should be a row for the `payment_intent.succeeded` event.

### 8e. Slack alert smoke
- Trigger a deliberate manual-bank-transfer to test the alert flow: in another incognito window, redo 8a but at checkout click the manual bank transfer button (Barbados market or force it via URL).
- Within 5 minutes, `#alerts-critical` should get a Slack message about a new pending manual transfer (the n8n alerts orchestrator runs every 5 min).

### 8f. Manual alerts test (Vercel-side)
- Test the `/api/alerts` endpoint directly. From your terminal:

```cmd
curl -X POST https://service-agent-sable.vercel.app/api/alerts ^
  -H "Content-Type: application/json" ^
  -H "x-alerts-secret: PASTE_ALERTS_SHARED_SECRET_HERE" ^
  -d "{\"severity\":\"info\",\"message\":\"smoke test from local terminal\",\"source\":\"manual\"}"
```

You should see a 200 response, a row in `public.audit_logs`, and an info-blue message in `#alerts-critical`.

---

## After the session — what to update

1. **RAIDD v1.5** — add D-030 (full integration test passed) and close Dep-005, Dep-007, Dep-008.
2. **PROJECT-CONFIG v1.1** — bump to v1.2 with the new env vars listed.
3. **Cleanup pass** (separate session, low priority):
   - Delete the 4 duplicate `" (1)"` files in `14-service-agent/docs/`.
   - Archive the two unversioned `PROJECT-CONFIG.md` duplicates in `14-service-agent/` root.
   - Move `_ARCHIVED-service-agent-landing-page-impl1` to `_portfolio-shared/archive/`.
   - Replace the 32-byte `code/service-agent/README.md` with a real one.
4. **Add service-agent to the project-bootstrap skill registry** as project #14 — `prj_qOryzlaWFqK8n0BnIcf5lD0P1FL6`, live URL `https://service-agent-sable.vercel.app`.

---

## If something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| Vercel build fails after step 5d push | NUL byte corruption snuck through, or missing import | Run step 5c again on every changed file. If clean, check the build log for the specific error. |
| `/checkout` shows "card payments launching soon" | `STRIPE_SECRET_KEY` not set or wrong | Re-check step 4, make sure all 3 environments are ticked, redeploy. |
| Stripe Checkout redirects but webhook doesn't update Supabase | Webhook URL or signing secret mismatch | Re-check step 1d webhook URL vs. n8n workflow webhook path; re-check step 4 env var; check Stripe dashboard → Webhooks → click endpoint → "Events" tab to see delivery attempts and error messages. |
| Slack message never arrives | n8n workflow not active, or env var typo | n8n → Workflows → check both `service-agent-01-stripe-orchestrator-v1` and `service-agent-02-alerts-orchestrator-v1` are toggled active. Check env var names exactly (`SLACK_WEBHOOK_URL_ALERTS_CRITICAL` not `SLACK_WEBHOOK_URL`). |
| `/api/alerts` returns 401 | `ALERTS_SHARED_SECRET` header missing or wrong | Check the curl command in 8f has the exact same value as the Vercel env var. |
| Vercel still shows `live: false` after step 7 | Promote didn't take, or you promoted an older deploy | Refresh, try again. Make sure you clicked the most recent Ready deployment, not an older one. |

---

**Last item before you start:** if any of steps 1–4 feel unclear, ping me with the question before continuing. It's much cheaper to clarify on this end than to undo a wrong env var setting later.
