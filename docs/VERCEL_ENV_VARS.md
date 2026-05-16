# PM Lite — Vercel Environment Variables

**Project:** PM Lite
**Last Updated:** 2026-05-14
**Scope:** Per-tenant Vercel project. Each variable is set per-tenant; values are NEVER recorded here.

---

## Variable inventory

| Name | Required | Scope | Sensitive | Purpose | Vault reference |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Production, Preview, Development | No | Browser-side Supabase client URL | 1Password: `AI Solutions / PM Lite / <tenant> / supabase / project_url` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Production, Preview, Development | No | Browser-side Supabase anon key (rate-limited by RLS) | 1Password: `AI Solutions / PM Lite / <tenant> / supabase / anon_key` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Production, Preview, Development | **Yes** | Server-side service role key. Used by `/api/raidd/append` and admin queries. NEVER expose to the browser. | 1Password: `AI Solutions / PM Lite / <tenant> / supabase / service_role_key` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production, Preview, Development | No | Tenant's hostname (e.g. `https://pm-lite-acme.vercel.app` or `https://pm.acmestudio.com`). Used for auth redirect URLs. | Project config — see PROJECT-CONFIG.md |
| `BETA_PASSWORD_HASH` | Optional | Production, Preview, Development | **Yes** | bcrypt hash of beta-access password (only when tenant runs in beta with a public landing page) | 1Password: `AI Solutions / PM Lite / <tenant> / beta / password_hash` |
| `GMAIL_USER` | Optional | Production | No | Outbound email sender (only if tenant enables Gmail SMTP notifications) | 1Password: `AI Solutions / PM Lite / <tenant> / gmail / user` |
| `GMAIL_APP_PASSWORD` | Optional | Production | **Yes** | Gmail App Password for outbound SMTP (only with tenant's own Workspace) | 1Password: `AI Solutions / PM Lite / <tenant> / gmail / app_password` |

---

## How to set each variable

In the tenant's Vercel project: **Settings → Environment Variables → Add New**.

1. Type the variable Name (exactly as in the table — case-sensitive).
2. Paste the Value (from the 1Password vault entry referenced above).
3. Tick the environments: Production, Preview, Development (unless noted otherwise).
4. If marked **Sensitive** in the table above, tick the "Sensitive" checkbox.
   - **Important quirk per Lesson L-005:** once a field is marked Sensitive and saved, reopening it shows EMPTY. The value is still saved. Do not re-paste.
5. Click "Save".

Repeat for each variable in the list.

---

## Verification commands

After setting all variables, verify from a local clone:

```bash
vercel env pull .env.local
grep -E "NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SITE_URL" .env.local
```

Expected:
- `NEXT_PUBLIC_SUPABASE_URL` matches the tenant's Supabase project URL.
- `NEXT_PUBLIC_SITE_URL` matches the tenant's hostname (no trailing slash).

If `NEXT_PUBLIC_SUPABASE_URL` shows the AI Solutions tracker URL, the env vars were copied from the wrong tenant — fix immediately.

---

## Rotation schedule for secrets

| Variable | Frequency | Trigger for emergency rotation |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Quarterly (90 days) | If suspected exposure, GitHub commit leak, or service role used in an unauthorised context |
| `BETA_PASSWORD_HASH` | Per request | If the plain password is shared beyond the intended audience |
| `GMAIL_APP_PASSWORD` | Quarterly | If outbound traffic spikes unexpectedly |

Non-sensitive variables (`NEXT_PUBLIC_*`) don't need rotation — they're public by design. But they MUST be updated if the tenant changes their domain or migrates Supabase.

---

## Adding a new variable

Per cloud-first-practices step 5:

1. Add a row to the variable inventory table above.
2. Document the vault reference. Never paste the value here.
3. Set it in Vercel using the procedure above.
4. Update `PROJECT-CONFIG.md` "Last Updated" with the change.

---

**Last reviewed:** 2026-05-14.
