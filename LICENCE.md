# PM Lite — Licence and Resale Terms

**Version:** 1.0
**Date:** 2026-05-14
**Licensor:** AI Solutions (aisolutionsnet.net) — owner Shane Burrowes
**Licensed product:** PM Lite (this folder plus the deployable code repo it depends on)

---

## What is licensed

Three layers form the PM Lite product. Each is licensed separately
under this document.

| Layer | Contents | Default rights |
|---|---|---|
| **A. Templates and docs** | Everything in `templates/`, `docs/`, the SMART questions registry, the architecture and manifest docs. | Buyer may use freely for their own projects under any tier. May redistribute internally. May not resell unmodified. |
| **B. Database schema and SQL** | Everything in `supabase/`. | Same as A. Buyer runs against their own Supabase. |
| **C. Application code** | The Next.js tracker UI (in the separate `pm-lite` code repo). | Tier-dependent — see below. |

The seed file in `seed-OPTIONAL/` is throwaway sample data, not part of
the licensed product.

---

## Tier-by-tier rights

### Self-deploy (free)

- **Layers A + B:** full use for buyer's own projects. No redistribution to third parties.
- **Layer C:** clone the public repo, deploy to buyer's own Vercel + Supabase. No support.
- **Branding:** buyer may rebrand for their own internal use. May not present as their own product to third parties.
- **Resale:** prohibited. To resell, upgrade to Studio + Multi-client.

### Studio (£499 one-off + £49/month)

- **Layers A + B + C:** AI Solutions deploys for buyer, hosted by AI Solutions on AI Solutions infrastructure.
- **Branding:** AI Solutions rebrands for buyer (logo, colours, metadata, sender name).
- **Single-tenant only:** buyer uses the deployment for buyer's own work. May not extend access to buyer's customers as a service.
- **Resale:** prohibited.
- **Source code access:** buyer may export a snapshot of their data at any time. Source code remains AI Solutions-owned; buyer may inspect via the public repo but may not redeploy a parallel instance.

### Agency (£1,499 one-off + £149/month)

- **Layers A + B + C:** AI Solutions deploys a multi-tenant variant supporting up to 10 of the buyer's clients.
- **Each client tenant:** isolated by separate Supabase project (preferred) or RLS-scoped rows.
- **Branding:** white-label — the buyer's brand, not AI Solutions's, visible to the buyer's clients.
- **Resale:** the buyer may charge their own clients for the use of the platform. The buyer may NOT package PM Lite as a standalone product for resale to a third party (that is the Reseller tier).
- **Source code access:** same as Studio.

### Enterprise (custom — typically £5k+ one-off, £499+/month)

- Negotiated bespoke terms. Usually includes:
  - Source-available licence (buyer can audit, may not redistribute).
  - Custom integrations (SSO, Slack, Linear, Notion).
  - DPA and security-questionnaire support.
  - Named support contact with phone SLA.
- All other terms as negotiated.

### Reseller (£2,500 one-off + standard hosting fee per onward client)

- Buyer may resell PM Lite to their own clients as a standalone product.
- Buyer is responsible for first-line support to their clients.
- AI Solutions provides second-line support to the buyer (not the buyer's clients).
- Buyer must brand the product distinctly (e.g. "[Consultancy] PM" not "PM Lite") to avoid market confusion.
- Volume discounts available for unlimited-client licences (£10k+).

---

## What buyers may NEVER do, under any tier

- Redistribute the AI Solutions branded version of the product.
- Claim authorship of the templates, schema, or code.
- Strip licence headers from source files.
- Use the AI Solutions name or trademarks in marketing without written permission.
- Sell, sublicense, or transfer this licence without written consent.
- Use the product for purposes that would breach the law in the buyer's jurisdiction.

---

## Service delivery — what the buyer gets in each mode

### Packaged delivery (Self-deploy, or as part of any tier)

The buyer receives:

- This folder (`pm-lite/`) in full — docs, templates, SQL.
- A read-only link to the `pm-lite` code repo, plus the licence-cleared deploy guide.
- The SMART questions registry, white-label-ready.
- NO AI Solutions-specific secrets, env values, Supabase project keys, or operational credentials.

Before any packaged delivery:

- Scrub the repo of `.env`, `.env.local`, anything in `.gitignore` that may have leaked.
- Remove any references to AI Solutions internal URLs, ports, or credentials.
- Confirm `seed-OPTIONAL/` data uses only `project_id='demo'` rows.
- Verify with: `grep -ri "<your-supabase-project-ref>\|<your-business-domain>\|<your-sender-email>" <package>` → must return zero matches.

### Service delivery (Studio / Agency / Enterprise)

The buyer receives:

- A live deployment URL.
- Their initial admin credentials (delivered via 1Password share, never email).
- Documentation links and the rebrand artefacts.
- AI Solutions retains all infrastructure credentials.
- AI Solutions monitors and operates the deployment per the SLA of the tier.

A specific per-client PM structure is built and applied per
`templates/06_project-checklist.md` during onboarding.

---

## Data ownership

- The buyer owns 100% of the data they enter into their PM Lite deployment.
- The buyer may export their data at any time (CSV export from the tracker).
- AI Solutions makes no claim to buyer data and uses it only to operate the service.
- On termination, AI Solutions provides one final export and deletes the buyer's Supabase project within 30 days unless legally required to retain.

---

## Warranty and liability

The product is provided as-is. The licensor's total liability under
this licence is capped at fees paid by the buyer in the 12 months
preceding the claim. No warranty of fitness for any particular purpose.

This clause is intentionally short. Enterprise tier may negotiate
stronger warranties and uncapped liability for documented breach.

---

## Term and termination

- Self-deploy and Reseller: perpetual, subject to compliance with this licence.
- Studio / Agency / Enterprise: month-to-month after the setup fee, or annual prepay (2 months free).
- Either party may terminate with 30 days' notice.
- AI Solutions may terminate immediately for breach of "What buyers may NEVER do".

---

## Jurisdiction

This licence is governed by the laws of Barbados (registered office of
AI Solutions). Disputes are resolved by Barbados courts unless both
parties agree to arbitration.

---

## Change log

| Date | Change |
|---|---|
| 2026-05-14 | v1.0 — first published. |

---

**End of licence document.**
