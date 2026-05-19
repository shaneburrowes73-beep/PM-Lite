# Integration Specification: Service-Agent

**Version:** 1.0
**Date:** 2026-05-12
**Purpose:** Describe exactly how the Service-Agent project connects to the rest of the AI Solutions portfolio and to external services. This is the document a Claude session or a human engineer reads before changing any integration.

---

## 1. Where Service-Agent sits in the portfolio

Service-Agent is **portfolio item #11** in the canonical 15-project portfolio (see Canonical Claude Instructions Statement v1.2). It is a **standalone product** with its own GitHub repo, its own Vercel project, and its own Supabase project. It is NOT part of the Iceing monorepo.

It re-uses these **portfolio-shared** resources:

| Shared resource | What Service-Agent uses |
|---|---|
| n8n self-hosted instance | New `service-agent` folder for the 9 workflows |
| Gmail SMTP | Transactional email send |
| 1Password (planned) | Credential vault for all external service keys |
| Vercel team | Same team `aisolutions-9934s-projects` |
| GitHub org | Same org `aisolutionsnetnet` |
| Portfolio tracker | Feedback aggregation pulls from Service-Agent's Supabase `feedback` table |
| Canonical CSS / brand tokens | Service-Agent uses prototype branding for MVP; tokens stay swappable |

It **does NOT share**:

- Supabase database (Service-Agent has its own — `service-agent-prod`)
- Authentication system (Service-Agent has its own per-business auth)
- Codebase (separate repo, separate Vercel project)

---

## 2. Inbound integrations (data flowing INTO Service-Agent)

### 2.1 Stripe (payments)

- **Direction:** Stripe → n8n webhook → Supabase
- **Endpoint:** `https://n8n.aisolutionsnet.net/webhook/service-agent/stripe`
- **Auth:** Stripe webhook signing secret, verified in n8n workflow 1
- **Events consumed:** `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`, `payout.paid`
- **Workflow:** see `02_n8n-workflow-specs/01_n8n_stripe-payment-received.md` and `02_n8n_stripe-failed-payment.md`

### 2.2 Twilio (SMS + voice)

- **Direction:** Twilio → n8n webhook → Supabase
- **SMS endpoint:** `https://n8n.aisolutionsnet.net/webhook/service-agent/twilio-sms`
- **Voice endpoint:** `https://n8n.aisolutionsnet.net/webhook/service-agent/twilio-voice`
- **Auth:** Twilio signature header verified in n8n
- **Workflows:** spec docs 03 and 04

### 2.3 Meta Graph API (Instagram + Facebook DMs)

- **Direction:** Meta → n8n webhook → Supabase
- **Endpoint:** `https://n8n.aisolutionsnet.net/webhook/service-agent/meta`
- **Auth:** Meta webhook verification token + signed request
- **Subscribed fields:** `messages`, `messaging_postbacks` on both Instagram and Page subscriptions
- **Workflows:** spec docs 05 and 06

### 2.4 Google Calendar push notifications

- **Direction:** Google → n8n webhook → Supabase
- **Endpoint:** `https://n8n.aisolutionsnet.net/webhook/service-agent/calendar`
- **Auth:** Google channel token + verification
- **Watch lifecycle:** each business calendar watch must be renewed every 7 days (handled by workflow 8 cron)
- **Workflow:** spec doc 07

---

## 3. Outbound integrations (data flowing OUT of Service-Agent)

### 3.1 Stripe (charge / refund / payout)

- Service-Agent's Next.js API routes call Stripe directly with secret key (server-side only)
- Used at: booking creation (charge or payment link), refund button (refund), business onboarding (Stripe Express account create)

### 3.2 Twilio (outbound SMS)

- n8n workflows 7, 8, 9 send SMS via Twilio REST API
- From-number per business (each business has a Twilio sub-account)

### 3.3 Meta Graph API (outbound DMs)

- Sent from Next.js API route when business owner replies in unified inbox
- Uses Page Access Token per connected business

### 3.4 Google Calendar (event create/update/delete)

- Next.js API routes write directly via service-account-impersonating-business-user OAuth tokens
- Tokens stored in Supabase `businesses.google_credentials_encrypted` (AES-256, key in Vercel env)

### 3.5 Gmail SMTP (transactional email)

- n8n workflows 1, 7, 9 send via portfolio Gmail SMTP credential
- From-address: `noreply@aisolutionsnet.net`
- Reply-to: business-specific address from `businesses.support_email`

---

## 4. Cross-portfolio integrations

### 4.1 Portfolio tracker dashboard

- The `/tracker/service-agent` page on the AI Solutions main site queries the Service-Agent Supabase `feedback` table via a read-only API
- Read-only Supabase user `tracker_reader` created in Service-Agent's Supabase project
- Returns aggregated RAG score, not raw feedback
- Integration is **pull-based** (portfolio tracker initiates); Service-Agent does not push to the tracker

### 4.2 Skills repository

- Skills that reference Service-Agent (notably `ai-solutions-project-bootstrap`) must be updated to include the project's Vercel + GitHub + Supabase facts once those exist
- Update path: edit skill in `ai-solutions-skills` GitHub repo (governance task #1), sync down

---

## 5. Environment variables (Vercel)

These are the env vars the Next.js app expects. Set them in the Vercel project settings, not in code.

| Variable | Where to get the value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | Public, safe in client bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | Public, safe in client bundle |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings | SECRET, server-only |
| `STRIPE_SECRET_KEY` | Stripe dashboard | SECRET, server-only |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook config | SECRET |
| `STRIPE_PLATFORM_ACCOUNT_ID` | Stripe Connect dashboard | Public-ish |
| `TWILIO_ACCOUNT_SID` | Twilio console | |
| `TWILIO_AUTH_TOKEN` | Twilio console | SECRET |
| `META_APP_ID` | Meta developer console | |
| `META_APP_SECRET` | Meta developer console | SECRET |
| `META_VERIFY_TOKEN` | Self-generated random string | Used in webhook verification |
| `GOOGLE_CLIENT_ID` | Google Cloud console | |
| `GOOGLE_CLIENT_SECRET` | Google Cloud console | SECRET |
| `GMAIL_SMTP_PASSWORD` | Existing portfolio Gmail app password | SECRET, shared with portfolio |
| `ENCRYPTION_KEY` | Self-generated 32-byte hex | SECRET, used for at-rest token encryption |
| `N8N_WEBHOOK_BASE_URL` | `https://n8n.aisolutionsnet.net/webhook/service-agent` | Public |

**Apply to:** Production AND Preview environments. Development can use local `.env.local` (gitignored).

---

## 6. Integration order — DO NOT INTEGRATE OUT OF ORDER

Wiring up Service-Agent has dependencies. Skipping ahead breaks things. Follow this order:

1. **Create Supabase project + tables** (from §3 of PROJECT-CONFIG)
2. **Create GitHub repo + push initial scaffold**
3. **Create Vercel project, connect to GitHub, set env vars** (with placeholder values where keys don't exist yet)
4. **Stripe Connect platform setup** + first business onboarding test
5. **Twilio sub-account + buy a test phone number** for a test business
6. **Meta app creation + webhook subscription** (start now because approval takes weeks)
7. **Google Calendar OAuth flow** for a test business
8. **Wire up n8n workflows 1–7** (per-channel ingest + Stripe + Calendar)
9. **Wire up n8n workflows 8–9** (cron-based reminders and reports)
10. **End-to-end test** in staging with a test business
11. **First real business onboarding** as a controlled pilot
12. **Production launch**

Each step has a verification test described in `05_TESTING-PLAN_Service-Agent.md`.

---

## 7. Failure-mode planning

| Failure | What happens | Recovery |
|---|---|---|
| n8n instance down | Inbound webhooks 503; messages may be lost | n8n self-hosted should have uptime monitoring; channels generally retry for 24h |
| Supabase outage | App down | Wait for Supabase; Vercel page should serve a friendly "we're down" page |
| Stripe API outage | New charges fail | Show user a "payment temporarily unavailable" message; do not retry automatically (Stripe is idempotent but retries should be operator-driven) |
| Meta token expiry | DMs stop arriving | Workflow 8 cron checks token validity daily and emails owner if expired |
| Google Calendar watch expiry | Bookings made directly in Calendar don't sync | Workflow 8 cron renews watches every 5 days (before 7-day expiry) |

---

## 8. Sign-off

Before going to production, the following must be ticked off:

- [ ] All §5 env vars present in Vercel Production
- [ ] All 9 n8n workflows imported and **Active**
- [ ] All webhook URLs registered with their respective services
- [ ] At least one end-to-end test booking completed (book → confirm → reminder → pay → feedback)
- [ ] RLS audit passed (see Testing Plan §5)
- [ ] Privacy policy + terms live on the production domain
- [ ] Owner has reviewed and approved §6 success metrics from PRD

---

**Document complete — 2026-05-12**
