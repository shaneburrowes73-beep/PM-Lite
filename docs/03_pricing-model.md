# PM Lite — Pricing Model

**Version:** 1.0
**Status:** Suggested, not enforced. Adjust to market.

---

## Pricing philosophy

PM Lite costs almost nothing to host per tenant ($0–$45/month at scale). Your margin comes from:

1. **Deployment time saved** — buyers pay you to not spend 60 minutes setting it up themselves.
2. **Rebranding service** — you swap colours, logo, metadata, sender name — they look like it is theirs.
3. **Hosting and support** — they trust you to keep it running.
4. **Training** — a 1-hour walkthrough included on paid tiers.

Don't overthink margins. Charge what makes the buyer pull out a credit card without thinking too hard.

---

## Suggested tiers

| Tier | Setup fee | Monthly | What's included | Margin per tenant |
|---|---|---|---|---|
| **Self-deploy** | £0 | £0 | Full template set + Supabase SQL + deploy guide. They run it. You get nothing recurring, but it drives word-of-mouth. | £0 |
| **Studio** | £499 | £49 | We deploy + rebrand + 1-hour training call + hosting. Hosted on free Supabase + Vercel until they outgrow it. | £45+/month after setup |
| **Agency** | £1,499 | £149 | Multi-tenant setup — up to 10 client portfolios isolated by RLS or separate Supabase projects. | £100+/month |
| **Enterprise** | Custom (typically £5k+) | Custom (typically £499+) | White-label, SSO, custom auth providers, custom workflows, dedicated support SLA. | Variable |

Full licensing terms for each tier live in `LICENCE.md`.

---

## What each tier actually includes

### Self-deploy (free / open-source-ish)

- Full PM Lite folder (everything in `/templates`, `/docs`, `/code/supabase`).
- README + Quickstart guide.
- Licence: free for own use, paid for resale (see Resale terms below).
- Support: GitHub issues only, no SLA.

**Why offer it free?** Small studios who cannot afford £499 today might become Studio-tier customers when they hire their first VA. Word-of-mouth in the founder community is worth more than the £499 you "lost".

### Studio (£499 + £49/month)

Everything in Self-deploy, plus:

- **Setup:** we deploy a Supabase project and Vercel project under their account (or under ours if they prefer hosted).
- **Rebrand:** we swap logo, colours, metadata, sender name on auth emails.
- **Training:** a 1-hour video call walking through the tracker UI and the templates.
- **Hosting:** if they want us to host, we keep it running, monitor Vercel deploys, do monthly backups.
- **Support:** email, 2-business-day SLA.

Suitable for: solo founders, 1–5-person studios.

### Agency (£1,499 + £149/month)

Everything in Studio, plus:

- **Multi-tenant:** up to 10 client portfolios, each isolated by either separate Supabase projects (preferred) or RLS-scoped rows.
- **Admin view:** a meta-tracker showing portfolio health across all client tenants.
- **Bulk operations:** add or remove clients in under 5 minutes per client.
- **White-label:** their domain (e.g. `pm.agencyname.com`), not yours.
- **Support:** email plus a 30-minute monthly check-in call.

Suitable for: digital agencies, marketing consultancies, small dev shops managing client portfolios.

### Enterprise (custom)

Negotiated. Typically:

- SSO (Google Workspace, Okta, Azure AD).
- Custom workflows (e.g. approval chains on Decisions over a certain budget).
- Custom integrations (Slack, Teams, Linear, Notion).
- Dedicated Supabase instance with point-in-time recovery.
- Named support contact with phone SLA.
- DPA and security questionnaire support.

Suitable for: large agencies, in-house teams who want PM Lite as their portfolio tool inside their existing SSO and audit perimeter.

---

## Resale tier (separate licence — £2,500 one-off + per-client hosting)

If a buyer wants to resell PM Lite to their own clients (e.g. a consultant building "[Consultancy] PM"):

- **Single-client resale:** included in Studio/Agency tier — just rebrand.
- **Multi-client resale (white-label):** £2,500 one-off licence + standard hosting fee per client tenant.
- **Reseller agreement (unlimited clients):** £10k+ one-off licence.

This protects you from someone buying Studio (£499) and reselling it as their own product to 50 clients at £200/month each.

Full terms in `LICENCE.md`.

---

## How to position vs competitors

| Buyer says | You say |
|---|---|
| "I already pay £20/mo for Asana." | "Asana per-seat means £200/mo at 10 users. PM Lite is flat £49/mo at any size." |
| "Notion is free." | "Notion is free until your portfolio has 100 entries and nobody can find anything. PM Lite is structured." |
| "I can build this myself in Supabase." | "Yes, and PM Lite saves you 40 hours doing exactly that. £499 = £12/hour value to you." |
| "Is the source code mine?" | "Self-deploy: yes. Studio/Agency: hosted by us, but you can self-deploy any time — no lock-in." |

---

## Discount triggers

- **Founder community / first 10 buyers:** 50% off setup fee. Builds case studies.
- **Annual prepay:** 2 months free on monthly tier.
- **Nonprofit / charity:** 50% off all tiers.
- **Referral:** £100 credit per referred customer who pays for 3 months.

---

## What NOT to do

- Don't undercharge below £49/month — that signals it's worth less than it is.
- Don't bundle hosting separately — keep it inclusive so the buyer doesn't need to know what Vercel is.
- Don't promise features that aren't in v1.0 (no Gantt, no kanban, no time tracking).
- Don't lock the data — always offer CSV export so buyers know they can leave.

---

## Revenue model summary

If you sell:

- 10 Studio tenants → £4,990 setup + £490/month recurring = £5,880 in year 1.
- 3 Agency tenants → £4,497 setup + £447/month recurring = £5,364/year recurring + £4,497 one-off.
- 1 Enterprise → £5k+ one-off plus ongoing.

Conservative blended ARR at year 2 (assuming half retain): **£10k–£15k/year** from a tool you built to manage your own work.

Not life-changing. But it's a near-zero-effort revenue stream that runs on AI Solutions infrastructure you already pay for.

---

**Next:** `04_rebrand-guide.md` for the rebrand walkthrough on Studio/Agency tier sales.
