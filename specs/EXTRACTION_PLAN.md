# PM Lite — Extraction Plan

**Version:** 1.0
**Date:** 2026-05-14
**Status:** READY TO EXECUTE — but parked until other portfolio fires are resolved.
**Estimated effort:** 3–5 hours if smooth, 6–8 hours if non-obvious coupling surfaces.
**Prerequisites:** Local Windows clone of `shaneburrowes73-beep/ai-solutions` repo at a known path. Time of day with daylight (not late-night).

---

## What this plan extracts

A standalone GitHub repository `pm-lite` containing the Next.js tracker app currently embedded in the `ai-solutions` hub repo. The new repo will be deployable to a fresh Vercel project with no AI Solutions branding, hub navigation, or cross-product coupling.

**Source:** `https://github.com/shaneburrowes73-beep/ai-solutions`
**Target:** new repo at `https://github.com/shaneburrowes73-beep/pm-lite`

**Verified live (2026-05-14):** the tracker exists in production at `aisolutionsnet.net/tracker/login`. Route group is `app/tracker/(auth)/`. Login, register, forgot-password, dashboard, RAIDD, lessons all working. Branding uses Tailwind `brand-blue` and `brand-orange` custom colours. Hub nav (Home / Try Tools / Hire Us / Learn / Beta) and hub footer are rendered on every page including `/tracker/*` — this is the coupling we must remove.

---

## Pre-flight (15 minutes)

Before touching anything:

- [ ] **Confirm canonical paths.** Local clone is at: `C:\Users\barba\OneDrive\Desktop\Projects\ai-solutions\` (or wherever it lives — check first).
- [ ] **Confirm `ai-solutions` is at a clean commit.** Run `git status` — must show "nothing to commit, working tree clean". If dirty, stash or commit first.
- [ ] **Confirm `main` branch is up to date.** `git pull origin main` — must succeed with no conflicts.
- [ ] **Identify a throwaway Supabase project for testing.** Either create a new one (preferred) or reuse a previous test project. NOT the canonical tracker DB `izxsbtpepvjcmwjagvgz`.
- [ ] **Confirm a fresh Vercel project name is available.** The plan uses `pm-lite`. Open `https://vercel.com/aisolutions-9934s-projects` and verify nothing exists with that name yet.
- [ ] **Open Supabase MCP, Vercel MCP, and a terminal in the local clone.** All three needed simultaneously.

If any pre-flight check fails, stop and resolve before starting Phase 1.

---

## Phase 1 — Snapshot what's there (30 minutes)

Goal: write down the current `ai-solutions` folder layout so we know exactly what to copy.

### 1.1 Inventory the `app/` directory

In a terminal at `C:\Users\barba\OneDrive\Desktop\Projects\ai-solutions\`:

```powershell
Get-ChildItem -Recurse -Path .\app\ -File | Select-Object FullName, Length |
  Where-Object { $_.FullName -notmatch '\.next|node_modules' } |
  Export-Csv -Path "C:\Users\barba\OneDrive\Desktop\ai-solutions-app-inventory.csv" -NoTypeInformation
```

Open the CSV. Note the file count and sizes. Expected: somewhere between 30–80 files.

### 1.2 Identify which folders are PM Lite, which are hub-only

Looking at the live deployment, these are PM Lite (keep):

- `app/tracker/(auth)/page.tsx` — dashboard
- `app/tracker/(auth)/layout.tsx` — auth guard wrapping all logged-in tracker pages
- `app/tracker/login/page.tsx`
- `app/tracker/register/page.tsx`
- `app/tracker/forgot-password/page.tsx`
- `app/tracker/reset-password/page.tsx` (likely exists per the Supabase Auth flow)
- `app/tracker/raidd/**` (if separated as its own subfolder)
- `app/tracker/lessons/**`
- `app/tracker/settings/**` (if exists)
- `app/api/raidd/**` — GET / POST / PATCH for RAIDD entries
- `app/api/lessons/**`
- `app/api/raidd/append/**` — project-scoped bearer token endpoint
- `app/feedback/**` — IF this is a generic shell (verify in 1.4 below)

These are hub-only (do NOT copy):

- `app/page.tsx` — the AI Solutions marketing homepage
- `app/try-tools/**` — hub catalogue page
- `app/custom-services/**` — hub services page
- `app/about/**` — hub about page
- `app/beta/**` — hub beta gate
- `app/blog/**` — hub blog
- `app/tools/**` — all per-tool sell pages including `tools/pm-lite/page.tsx`
- `app/api/feedback-notifications/**` — Gmail SMTP relay for AI Solutions internal alerts
- `app/api/feedback-status/**` — cross-product feedback aggregator
- `app/api/contact/**` — hub contact form
- Any `app/api/*` endpoint that references other products by name

### 1.3 Identify `components/` and `lib/` dependencies

```powershell
# Find every import in the tracker code, then list unique module paths
Get-ChildItem -Recurse -Path .\app\tracker\, .\app\api\raidd\, .\app\api\lessons\ -Filter *.tsx, *.ts |
  Select-String -Pattern "from\s+['""]@/" |
  ForEach-Object { $_.Line -replace ".*from\s+['""](@/[^'""]+)['""].*", '$1' } |
  Sort-Object -Unique
```

Expected output: a list like `@/components/Navigation`, `@/lib/supabase/client`, `@/lib/auth/session`, etc. **Save this list — it tells you exactly which non-tracker files you must copy.**

### 1.4 Verify whether `/feedback` is hub-coupled

```powershell
Get-Content .\app\feedback\page.tsx | Select-String -Pattern "feedback-notifications|feedback-status|aisolutions"
```

If matches found, `/feedback` is hub-coupled and needs the same strip treatment as the layout. If no matches, it's already generic and can be copied as-is. Note the result.

### 1.5 Spot-check the layout chain

```powershell
Get-Content .\app\layout.tsx | Select-String -Pattern "Navigation|brand-blue|brand-orange|hello@aisolutionsnet"
```

This is the root layout that wraps EVERY page including `/tracker`. The hub nav and footer come from here. Note exactly which components are imported — they will need replacement, not removal (the tracker still needs *a* layout).

---

## Phase 2 — Create the new repo locally (30 minutes)

### 2.1 Create the empty repo on GitHub

In a browser at `https://github.com/shaneburrowes73-beep`:

1. Click **New repository**.
2. Name: `pm-lite`.
3. Description: "Lightweight portfolio management toolkit — Next.js + Supabase. Sellable product."
4. Visibility: **Private** for now. (Make public later when sellable.)
5. Initialize with: README only. (We'll replace it.)
6. Click **Create repository**.

### 2.2 Clone the new repo locally

```powershell
cd C:\Users\barba\OneDrive\Desktop\Projects\
git clone https://github.com/shaneburrowes73-beep/pm-lite.git
cd pm-lite
```

You now have an empty `pm-lite\` folder next to `ai-solutions\`.

### 2.3 Copy the scaffolding files first

```powershell
$src = "C:\Users\barba\OneDrive\Desktop\Projects\ai-solutions"
$dst = "C:\Users\barba\OneDrive\Desktop\Projects\pm-lite"

# Top-level config — copy as-is
Copy-Item "$src\package.json"       "$dst\package.json"
Copy-Item "$src\package-lock.json"  "$dst\package-lock.json"
Copy-Item "$src\tsconfig.json"      "$dst\tsconfig.json"
Copy-Item "$src\next.config.js"     "$dst\next.config.js"
Copy-Item "$src\next.config.mjs"    "$dst\next.config.mjs" -ErrorAction SilentlyContinue
Copy-Item "$src\tailwind.config.ts" "$dst\tailwind.config.ts"
Copy-Item "$src\postcss.config.js"  "$dst\postcss.config.js"
Copy-Item "$src\.gitignore"         "$dst\.gitignore"

# Ensure required dotfiles
if (-not (Test-Path "$dst\.env.example")) { New-Item "$dst\.env.example" -ItemType File }
```

**Important:** if `next.config.mjs` exists alongside `next.config.js`, only one should be in the new repo. Check the original repo and keep the one Next.js is actually using.

### 2.4 Copy the tracker code

```powershell
# Create app/ structure
New-Item -ItemType Directory -Path "$dst\app" -Force | Out-Null

# Copy the entire tracker route group
Copy-Item -Recurse "$src\app\tracker" "$dst\app\tracker"

# Copy the API routes that the tracker needs
New-Item -ItemType Directory -Path "$dst\app\api" -Force | Out-Null
Copy-Item -Recurse "$src\app\api\raidd"   "$dst\app\api\raidd"
Copy-Item -Recurse "$src\app\api\lessons" "$dst\app\api\lessons"

# Copy the feedback shell IF Phase 1.4 confirmed it's generic
# Uncomment the next line if applicable:
# Copy-Item -Recurse "$src\app\feedback" "$dst\app\feedback"
```

### 2.5 Copy the dependencies identified in Phase 1.3

For each item in your Phase 1.3 unique-imports list, copy it across. For example if the list contained `@/lib/supabase/client`, `@/lib/auth/session`, `@/components/Navigation`:

```powershell
New-Item -ItemType Directory -Path "$dst\lib\supabase", "$dst\lib\auth", "$dst\components" -Force | Out-Null

Copy-Item "$src\lib\supabase\client.ts" "$dst\lib\supabase\client.ts"
Copy-Item "$src\lib\auth\session.ts"    "$dst\lib\auth\session.ts"
# Note: Navigation is hub-specific — do NOT copy. We'll replace it in Phase 3.
```

**Critical:** ANY `@/components/...` import from the tracker code that names a hub-specific component (Nav, HubFooter, marketing components, sell-page components) must NOT be copied. They will be replaced with generic stubs in Phase 3.

### 2.6 Copy the SQL migrations from Drive

Open the Drive folder `Projects/16-pm-lite/code/supabase/` and download the 4 `.sql` files to `pm-lite\supabase\`:

```powershell
New-Item -ItemType Directory -Path "$dst\supabase", "$dst\supabase\seed-OPTIONAL" -Force | Out-Null

# Download from Drive (or copy from your local Drive sync if it's syncing)
# Drive folder: https://drive.google.com/drive/folders/1XqU1Ay_tt8vdoxCQm8zQUP06TZdjb22v
# Files needed in pm-lite\supabase\:
#   001_schema.sql
#   002_views.sql
#   003_functions.sql
#   004_feedback_scaffold.sql
# And in pm-lite\supabase\seed-OPTIONAL\:
#   001_demo_seed.sql
```

### 2.7 First sanity check

```powershell
cd $dst
git add .
git status
```

You should see "Changes to be committed" with a list of all the copied files. Don't commit yet.

```powershell
# Verify no NUL byte corruption (the recurring OneDrive issue)
Get-ChildItem -Recurse -File -Path .\app\, .\lib\, .\components\ |
  ForEach-Object { python3 -c "d=open('$($_.FullName)','rb').read(); n=d.count(b'\x00'); print($($_.Name), n)" } |
  Where-Object { $_ -match '\s[1-9]' }
```

If anything outputs a line with `\s[1-9]` (a non-zero NUL count), that file is corrupted by OneDrive. Apply the NUL-strip from the Track A Fix-Push script before continuing.

---

## Phase 3 — Strip and re-skeleton (1.5–2 hours)

This is where most of the time goes. The goal is a fully generic, brand-free codebase that builds and runs without any reference to AI Solutions.

### 3.1 Replace the root layout

`app\layout.tsx` is the file every other page inherits from. Currently it contains the AI Solutions hub nav and footer. Replace it with a minimal version.

Open `pm-lite\app\layout.tsx` in your editor and replace the contents with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PM Lite",
  description: "Lightweight portfolio management for small studios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Key changes:**
- Removed the `<nav>` element with Home / Try Tools / Hire Us / Learn / Beta links.
- Removed the `<footer>` with `mailto:hello@aisolutionsnet.net` and other hub links.
- Removed any imports of `Navigation`, `HubFooter`, or similar components.
- Title now generic. Buyers rebrand in Quickstart Step 9.

### 3.2 Replace the root page

`app\page.tsx` is the marketing homepage. The buyer's deployment shouldn't show your sales copy. Replace contents:

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tracker/login");
}
```

This makes the root URL redirect straight to login — the simplest behaviour for a single-product tracker. Buyers can replace later with their own homepage if they want one.

### 3.3 Strip the Tailwind brand colours

Open `pm-lite\tailwind.config.ts`. Find the `theme.extend.colors` block. It will contain:

```typescript
colors: {
  "brand-blue":   "#2563eb",
  "brand-orange": "#f97316",
  // ...possibly others
}
```

Replace with:

```typescript
colors: {
  primary: "#2563eb",
  accent:  "#1f2937",
}
```

Then find every reference to the old class names across the codebase:

```powershell
cd $dst
Get-ChildItem -Recurse -Include *.tsx, *.ts, *.css -File |
  Select-String -Pattern "brand-blue|brand-orange"
```

For each match, edit the file and replace:
- `brand-blue` → `primary`
- `brand-orange` → `accent`

Common forms to look for: `bg-brand-blue`, `text-brand-blue`, `hover:bg-brand-blue`, `ring-brand-blue`, `border-brand-blue`. Same for `brand-orange`.

### 3.4 Strip AI Solutions text references

```powershell
Get-ChildItem -Recurse -Include *.tsx, *.ts, *.md, *.json -File |
  Select-String -Pattern "AI Solutions|aisolutionsnet|hello@aisolutions"
```

For each match in code files, decide:
- **In comments:** delete the line.
- **In strings/JSX:** replace "AI Solutions" with "PM Lite" or with a generic placeholder like `{process.env.NEXT_PUBLIC_BRAND_NAME ?? "PM Lite"}` for the most reusable version.
- **In `mailto:` links:** delete or replace with a placeholder.

### 3.5 Remove the hub-specific feedback endpoints (if present)

If you accidentally copied any of these in Phase 2.4, delete them now:

```powershell
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue `
  "$dst\app\api\feedback-notifications", `
  "$dst\app\api\feedback-status", `
  "$dst\app\api\contact"
```

### 3.6 Add the README

Replace `pm-lite\README.md` with a one-pager that points to the canonical docs in Drive:

```markdown
# PM Lite

Lightweight portfolio management toolkit for small studios.

## Documentation

Full documentation, templates, and deployment guides live in Google Drive:
https://drive.google.com/drive/folders/15LRqMXh6W3uVwTsJzvJusOBQIxWKeM8O

## Quick start

See `docs/02_quickstart.md` in the Drive folder above for the 11-step
tenant deployment procedure.

## SQL migrations

See `supabase/` in this repo, or `code/supabase/` in the Drive folder.
Run 001 → 002 → 003 → 004 in order against an empty Supabase project.

## Licence

See `LICENCE.md` in the Drive folder for resale tiers and terms.

## Stack

- Next.js 14 (App Router)
- Supabase (Postgres + Auth + RLS)
- Vercel (hosting)
- Tailwind CSS
```

### 3.7 Add a minimal `.env.example`

Replace `pm-lite\.env.example` with:

```
# Required — see docs/VERCEL_ENV_VARS.md in the PM Lite Drive folder
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-tenant-hostname.example.com

# Optional — only if outbound notifications are enabled
# GMAIL_USER=
# GMAIL_APP_PASSWORD=

# Optional — only if running behind a beta access gate
# BETA_PASSWORD_HASH=
```

---

## Phase 4 — Local build verification (30 minutes)

### 4.1 Install dependencies

```powershell
cd $dst
npm install
```

Expected: clean install with no errors. If a peer-dependency warning fires, it's almost certainly a version mismatch with `package-lock.json` from the original repo — note it for fix later but don't block on it.

### 4.2 Type-check

```powershell
npx tsc --noEmit
```

Expected: zero errors. Common failures and fixes:

- **`Cannot find module '@/components/Navigation'`** → you imported a hub-specific component. Find the import in the tracker code and remove it or replace with a stub. Repeat until clean.
- **`Cannot find name 'process'`** → `@types/node` missing from `package.json`. Run `npm install -D @types/node`.
- **JSX type mismatches** → usually because a hub layout passed props the tracker doesn't expect. Adjust the tracker page.

### 4.3 Local dev build

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL = "https://your-throwaway-project.supabase.co"
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = "your-throwaway-anon-key"
$env:SUPABASE_SERVICE_ROLE_KEY = "your-throwaway-service-role-key"
$env:NEXT_PUBLIC_SITE_URL = "http://localhost:3000"

npm run dev
```

Open `http://localhost:3000` in a browser.

**Expected behaviour:**
- Root URL redirects to `/tracker/login`.
- Login page renders with no hub nav, no hub footer.
- Page title in browser tab says "PM Lite" not "AI Solutions".
- View source: no references to `aisolutionsnet`, no hub footer links.

**If anything still shows AI Solutions branding:** you missed a reference in Phase 3.4. Stop the dev server, grep again, fix, retry.

### 4.4 Local production build

```powershell
npm run build
```

Expected: a clean build with no warnings about missing pages or invalid routes. If a route fails to compile, it's almost always because it imported something that was stripped. Find the missing import, decide whether to restore it or stub it.

---

## Phase 5 — Deploy to a fresh Vercel project (30 minutes)

### 5.1 Create the throwaway Supabase project

In Supabase dashboard:

1. New project, name: `pm-lite-extraction-test`.
2. Generate a DB password, save to 1Password as a temporary entry.
3. Wait 2 minutes for provisioning.
4. SQL Editor → run `pm-lite\supabase\001_schema.sql` → `002` → `003` → `004`.
5. Verify with `SELECT table_name FROM information_schema.tables WHERE table_schema='public';` — expect raidd_entries, lessons_entries, pm_lite_feedback, raidd_append_tokens, raidd_append_rate, plus views.

### 5.2 Push the repo to GitHub

```powershell
cd $dst
git add .
git commit -m "Initial extraction from ai-solutions hub"
git push origin main
```

### 5.3 Create the Vercel project

In Vercel dashboard:

1. **New Project → Import** the `pm-lite` GitHub repo.
2. Project name: `pm-lite`.
3. Framework: Next.js (auto-detected).
4. **Environment Variables** — add all 4 required ones from `.env.example`, using values from the throwaway Supabase project.
5. **Do NOT deploy yet** — confirm Deployment Protection setting first.

### 5.4 Deployment Protection setting

- **For a private internal test:** leave "Vercel Authentication" enabled (default).
- **For an open public test:** Settings → Deployment Protection → Vercel Authentication → set to "Disabled". This is the same trap from your `ai-solutions-vercel-deployment-defensive` skill — when SSO is on, public URLs return 404.

### 5.5 Configure Supabase Auth URLs

In Supabase dashboard for the throwaway project → **Authentication → URL Configuration**:

- Site URL: `https://pm-lite-<random-suffix>.vercel.app` (you'll know the URL after deploy)
- Redirect URLs: add `/tracker/reset-password`, `/tracker`, `/tracker/**` for that hostname.

**Note:** at first deploy you won't know the exact Vercel hostname. Use a placeholder, deploy, then come back here and fix once you see the real URL.

### 5.6 Deploy

Vercel → **Deploy**. Wait for the build.

**Check the Deployments tab, not the project home page.** The home page lies — it can show green while the latest deployment is in ERROR. Per your `ai-solutions-vercel-deployment-defensive` skill, always verify in the Deployments tab.

**If build fails:** click into the failed deployment, read the build log, fix locally, push, retry. Most common failures:
- Missing env var that the build references at build time. Add it and redeploy.
- Module not found — you missed a `@/lib/...` import in Phase 2.5. Add the missing file from `ai-solutions`.

### 5.7 First-time smoke test

In a fresh browser tab:

- [ ] Visit the Vercel hostname. Root URL redirects to `/tracker/login`.
- [ ] Login page renders. No AI Solutions branding visible.
- [ ] Browser tab title: "PM Lite".
- [ ] View page source: zero matches for `aisolutionsnet`, `brand-blue`, `brand-orange`, `hello@`.

If all four pass, the extraction has worked structurally.

### 5.8 Functional smoke test

- [ ] In Supabase → Authentication → Users → Add user. Create a test user with Auto Confirm.
- [ ] On the Vercel deployment, sign in with that user.
- [ ] Land on `/tracker` dashboard. Should show empty state.
- [ ] Open `/tracker/raidd` (or whatever the RAIDD log URL is). Empty list.
- [ ] Click "New Entry" or equivalent. Form opens.
- [ ] Submit a test RAIDD entry. Confirm:
  - It appears in the list.
  - SQL: `SELECT * FROM public.raidd_entries WHERE project_id='test';` — row is there.
- [ ] Test forgot-password flow:
  - Click "Forgot password" link.
  - Enter the test email.
  - Confirm email arrives (check inbox).
  - Click the email link.
  - Lands on `/tracker/reset-password` — NOT the homepage with `?error=otp_expired`. If it lands on the homepage, Supabase Auth URLs are misconfigured (Phase 5.5).
  - Set a new password.
  - Logs in successfully.

If all 8 pass, the extraction is functionally complete.

---

## Phase 6 — Cleanup and finalisation (30 minutes)

### 6.1 Final grep for leaks

```powershell
cd $dst
Get-ChildItem -Recurse -File -Include *.tsx, *.ts, *.js, *.json, *.md |
  Where-Object { $_.FullName -notmatch '\.next|node_modules' } |
  Select-String -Pattern "aisolutionsnet|izxsbtpepvjcmwjagvgz|brand-blue|brand-orange|hello@aisolutions|clarenceburrows6|kakcffjknzncfcydlsnt"
```

**Expected: zero matches.** If anything fires, fix it before continuing.

### 6.2 Tag the v1.0 release

```powershell
git tag -a v1.0.0 -m "First standalone PM Lite release"
git push origin v1.0.0
```

### 6.3 Update the PROJECT-CONFIG in Drive

Open `Projects/16-pm-lite/PROJECT-CONFIG.md` and update:

- **Code Repository → GitHub URL** → set to the real URL.
- **Implementation Status → Pending** → move "Create pm-lite GitHub repo" and "Create pm-lite Vercel project" from Pending to Completed.
- **Last Updated** → add a row with today's date and "Initial extraction completed".

### 6.4 Delete the throwaway Supabase project

```
Supabase dashboard → pm-lite-extraction-test → Settings → General → Delete project
```

Free up the slot, remove the test data.

### 6.5 Add PM Lite to the bootstrap skill registry

Update the `ai-solutions-project-bootstrap` skill's registry to include PM Lite with:

- Project name: PM Lite
- Vercel project: `pm-lite`
- GitHub repo: `https://github.com/shaneburrowes73-beep/pm-lite`
- Drive folder: `Projects/16-pm-lite/` (id `15LRqMXh6W3uVwTsJzvJusOBQIxWKeM8O`)
- Supabase: per-tenant (not in canonical tracker)
- Framework: Next.js 14
- Status: READY

Note: per the governance doc this should happen in the `ai-solutions-skills` GitHub repo once it exists. If it doesn't yet, capture the change as a pending edit somewhere we won't lose track.

---

## Common failure modes and recoveries

| Failure | Where it surfaces | Fix |
|---|---|---|
| `Cannot find module '@/components/X'` at build time | Phase 4.2 or 5.6 | Find the import in tracker code. If component is hub-specific, remove the import + the usage. If component is generic, copy it from `ai-solutions/components/`. |
| `Cannot find name 'process'` | Phase 4.2 | `npm install -D @types/node` |
| Build succeeds but root URL still shows the AI Solutions homepage | Phase 5.7 | Phase 3.2 wasn't applied — `app/page.tsx` still has the marketing copy. Replace with the redirect. |
| Login submits but lands back on `/tracker/login` | Phase 5.8 | Auth cookie not persisting. Confirm `NEXT_PUBLIC_SITE_URL` env var matches the Vercel hostname EXACTLY (no trailing slash, https not http). |
| Password reset email lands on homepage with `?error=otp_expired` | Phase 5.8 | Supabase Auth URL config (Phase 5.5) was skipped or wrong. Site URL + Redirect URLs must include the tenant domain. |
| `/api/raidd` POST returns 401 | Phase 5.8 | `SUPABASE_SERVICE_ROLE_KEY` not set in Vercel env, or set as a public `NEXT_PUBLIC_*` variable by accident. Verify in Vercel settings — must NOT be prefixed with `NEXT_PUBLIC_`. |
| `/api/raidd` POST returns 500 | Phase 5.8 | RLS policy mismatch. SQL: `SELECT * FROM pg_policies WHERE tablename='raidd_entries';` — must show the three policies from `003_functions.sql`. |
| Vercel build green but page errors 500 at runtime | Phase 5.6 | Build-time vs runtime env var split. Some env vars need both — re-check Vercel Environment Variables panel. |
| OneDrive NUL byte corruption on `.tsx` files | Phase 2.7 | Use the NUL-strip step from the Track A Fix-Push script. Then `git add` again. |
| Vercel project shows `live: false` despite a READY deployment | Phase 5.6 | Per your defensive skill: Deployments tab → … → Promote to Production. |

---

## What this plan deliberately does NOT do

The following are deliberately scoped OUT — they happen later, after the extraction has stabilised:

- **Custom domain for `pm-lite.vercel.app`.** Use the default Vercel hostname for the test. Custom domains come when there's a real tenant.
- **Multi-tenant code for the Agency tier.** The first extraction is single-tenant per Supabase project (the simpler model documented in `ARCHITECTURE.md`). Agency-tier multi-tenancy is a v1.1 task.
- **CSV export, email digests, webhook on RAIDD insert.** v1.1+ roadmap.
- **Removing AI Solutions branding from the live `ai-solutions` hub.** The hub continues to serve `aisolutionsnet.net/tracker/login` as-is until you decide to deprecate it.
- **Promoting `pm-lite` to Production at a real-tenant domain.** First test deploy is a throwaway. Real-tenant deploys follow `docs/02_quickstart.md`.
- **Adding the hosted-demo tenant.** Open question per `PROJECT_MANIFEST.md`.

---

## Time tracking

When you actually execute this plan, time-box each phase:

| Phase | Estimated | Actual |
|---|---|---|
| Pre-flight | 15 min | _____ |
| Phase 1 — Snapshot | 30 min | _____ |
| Phase 2 — Create new repo | 30 min | _____ |
| Phase 3 — Strip and re-skeleton | 1.5–2 hr | _____ |
| Phase 4 — Local build verification | 30 min | _____ |
| Phase 5 — Deploy to fresh Vercel | 30 min | _____ |
| Phase 6 — Cleanup | 30 min | _____ |
| **Total** | **3–5 hr** | _____ |

If you blow past 6 hours, stop, log it as a RAIDD `issue` entry, and resume the next day. Sleep-deprived extraction is how files get accidentally deleted.

---

## Sign-off

Once Phases 1–6 are complete:

- [ ] All 6 cleanup checks passed (Phase 6.1).
- [ ] PROJECT-CONFIG.md updated.
- [ ] v1.0.0 tag pushed.
- [ ] Throwaway Supabase project deleted.
- [ ] First Drive lesson logged: anything that surprised you, captured in `Projects/16-pm-lite/specs/` or in the lessons-entries table for project_id='pm-lite'.

The next time someone deploys PM Lite for a real tenant, they follow `docs/02_quickstart.md` against the now-real `pm-lite` repo, and the deployment time drops from "extraction + quickstart" to just "quickstart" (~60 minutes).

---

## Change log

| Date | Change | By |
|---|---|---|
| 2026-05-14 | Plan written. Not yet executed. | Claude (Cowork) |

---

**End of extraction plan.**
