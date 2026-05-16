# [Project Name] — Credentials Manifest

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Name]

---

## ⚠️ Critical rule

**Never paste a real secret value into this document.** Only reference where the value lives (1Password vault, Vercel env, etc.). If a secret leaks here, this document is now a vulnerability — rotate every referenced credential immediately.

---

## Vault locations

All actual values live in 1Password, vault entry path:
`[Your Org] / [Project Name] / [item]`

If your team uses a different secrets manager (AWS Secrets Manager, HashiCorp Vault, GitHub Secrets, etc.), substitute the path format accordingly.

---

## Credentials needed for this project

| Credential | Used by | Vault path | Sensitive? | Rotation | Owner |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | `[Org] / [Project] / supabase / project_url` | No | When Supabase project changes | [Name] |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser | `[Org] / [Project] / supabase / anon_key` | No | When Supabase project rotates | [Name] |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only | `[Org] / [Project] / supabase / service_role_key` | **Yes** | Quarterly | [Name] |
| `NEXT_PUBLIC_SITE_URL` | Auth redirects | Config — see `PROJECT-CONFIG.md` | No | When domain changes | [Name] |
| `GMAIL_USER` (if used) | Outbound email | `[Org] / [Project] / gmail / user` | No | As needed | [Name] |
| `GMAIL_APP_PASSWORD` (if used) | Outbound email | `[Org] / [Project] / gmail / app_password` | **Yes** | Quarterly | [Name] |
| `[Other credential]` | [What uses it] | `[vault path]` | [Y/N] | [Frequency] | [Name] |

Add a row for every credential the project depends on.

---

## Who has access

| Person | Role | Access scope | Last reviewed |
|---|---|---|---|
| [Name] | Owner | All credentials | [YYYY-MM-DD] |
| [Name] | Developer | Non-sensitive credentials only | [YYYY-MM-DD] |
| [Name] | Support | None — escalates to Owner | [YYYY-MM-DD] |

Review this list quarterly. Remove access from anyone who has left the team.

---

## Where credentials are USED at runtime

| Where | Which credentials | Notes |
|---|---|---|
| Vercel Production env vars | All `NEXT_PUBLIC_*` plus `SUPABASE_SERVICE_ROLE_KEY` | Configured in Vercel dashboard — see `VERCEL_ENV_VARS.md` |
| Vercel Preview env vars | Same as Production, but `SUPABASE_SERVICE_ROLE_KEY` typically omitted | Avoid preview deploys having production write access |
| Local development | `.env.local` (never committed) | Pulled via `vercel env pull` |
| CI / GitHub Actions | Stored as GitHub Secrets | Referenced by name in workflow YAML |

---

## Rotation log

Every time a credential is rotated, log the event:

| Date | Credential | Reason | Rotated by | Old value retained until |
|---|---|---|---|---|
| [YYYY-MM-DD] | [name] | [Routine quarterly / breach / staff change] | [Name] | [date] |

Retain the old value for ~24 hours in case rollback is needed. Then revoke fully.

---

## Incident response — exposed credential

If a credential appears in a place it shouldn't (code commit, public log, screenshot, support ticket):

1. **Revoke immediately** in the source system (Supabase Settings → API → rotate, or Vercel → delete env var, etc.).
2. **Generate a replacement.**
3. **Update all runtime locations** with the new value (Vercel env vars, GitHub Secrets, `.env.local` files).
4. **Redeploy** affected services.
5. **Document the incident** in `04_incident-response.md` and in a RAIDD `issue` entry.
6. **Notify affected stakeholders** within the SLA window (typically 2 hours for production credentials).

---

## Audit checklist (quarterly)

- [ ] Every credential in the table above is still in active use. Retire unused ones.
- [ ] Sensitive credentials have been rotated within their cycle (typically 90 days).
- [ ] The "Who has access" list matches current team membership.
- [ ] No real secret values have leaked into this document, the README, or any committed file.
- [ ] Verify with: `git log -p --all -S 'password\|token\|secret\|ghp_\|sk_live_' | head -50`

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document created | [Name] |

---

**End of credentials manifest template.**
