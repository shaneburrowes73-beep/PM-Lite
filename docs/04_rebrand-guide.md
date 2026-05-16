# PM Lite — Rebrand Guide

**Estimated time:** 30–60 minutes for a full rebrand.
**Prerequisites:** Quickstart steps 1–8 complete. Tenant logo and brand colours in hand.

---

## What you are rebranding

PM Lite ships with **AI Solutions branding** by default. To resell or deploy for a tenant, swap:

1. Logo (homepage + tracker header).
2. Site title and metadata.
3. Brand colours (primary + dark accent).
4. Sender name on auth emails.
5. Optional: favicon, social share image, custom homepage hero text.

Total files touched: about 6.

---

## Step 1 — Logo (10 min)

The tenant gives you a logo. Ideal format:

- SVG (preferred — scales without quality loss).
- Or PNG at 512x512 with transparent background.

### Replace the header logo

In your local clone of the tenant's fork, save the file as:

```
public/logo.svg
```

If the original was named differently, update the references in:

- `components/Navigation.tsx`
- `app/layout.tsx`

Search for `logo.svg` and replace with the new filename if needed.

### Replace the favicon

Save the tenant's icon as:

```
app/favicon.ico
```

Format: 32x32 `.ico` file. Generate one at `https://favicon.io` if they only have a PNG.

---

## Step 2 — Site title and metadata (5 min)

Open `app/layout.tsx`. Find the `metadata` export — it looks like this:

```typescript
export const metadata: Metadata = {
  title: 'AI Solutions — Portfolio Management',
  description: 'Lightweight portfolio management for small studios.',
  // ...
}
```

Replace with the tenant's:

- `title` — tenant company name + tagline.
- `description` — one-sentence what-it-is.

Save the file.

Also check `app/page.tsx` for any hardcoded "AI Solutions" strings in the hero or footer and swap them.

---

## Step 3 — Brand colours (15 min)

Open `tailwind.config.ts`. Find the `theme.extend.colors` block — it looks like:

```typescript
colors: {
  primary: '#2563eb',
  dark: '#1f2937',
  // ...
}
```

Replace with the tenant's brand colours. If the tenant only gives you one colour, use it as `primary` and pick a dark neutral (`#1f2937` or similar) for `dark`.

Save the file. Run a local build to confirm no contrast issues:

```bash
npm run dev
```

Open `http://localhost:3000` and scroll through:

- Homepage.
- `/tracker/login`.
- `/tracker` dashboard.
- A RAIDD entry detail page.

If any text is unreadable on the new colour, adjust the `dark` value or pick a softer `primary`.

---

## Step 4 — Sender name on auth emails (5 min)

In the Supabase dashboard (the tenant's project, from Quickstart Step 1):

1. **Authentication → Email Templates**.
2. For each of: Confirm signup, Magic link, Change email, Reset password, Invite user — replace "AI Solutions" in the body and subject lines with the tenant's name.
3. **Project Settings → General → Project name** — set to `pm-lite-<tenantname>` (this appears as the sender name on outbound auth emails).

Click **Save** on each template.

Send yourself a test password-reset email to confirm the new sender shows correctly.

---

## Step 5 — Custom homepage hero (10 min, optional)

Open `app/page.tsx`. Find the hero section — it looks like:

```tsx
<h1>AI Solutions</h1>
<p>Portfolio management for small studios.</p>
```

Replace with the tenant's preferred wording. Keep it under 12 words for the headline.

If the tenant has supplied a custom hero image, save it as `public/hero.jpg` and update the `<Image src="/hero.jpg" />` reference (or add one if it doesn't exist).

---

## Step 6 — Social share image (5 min, optional)

The tenant's link will be shared on Slack, LinkedIn, etc. Make sure the preview looks right:

1. Save a 1200x630 PNG as `public/og-image.png` — typically the tenant's logo on a brand-coloured background.
2. In `app/layout.tsx`, add to the metadata:

```typescript
openGraph: {
  images: ['/og-image.png'],
},
```

Test by pasting the deployed URL into Slack — the preview should show the new image.

---

## Step 7 — Commit, push, verify (5 min)

```bash
git add .
git commit -m "rebrand for <tenant-name>"
git push origin main
```

Vercel auto-deploys. Wait ~2 minutes, then open the tenant's URL and confirm:

- New logo visible top-left on every page.
- New colours throughout (no `#2563eb` blue from AI Solutions).
- Browser tab title shows tenant name, not "AI Solutions".
- Favicon updated.
- Test password-reset email shows tenant name.

If anything still shows AI Solutions branding, search the codebase:

```bash
grep -ri "AI Solutions" .
grep -ri "aisolutionsnet" .
```

Both should return zero matches in `app/`, `components/`, `public/`, and `tailwind.config.ts`.

---

## Step 8 — Document the rebrand (5 min)

In the tenant's `PROJECT-CONFIG.md` (if you've created one for them), record:

- Brand colours used (hex values).
- Logo file source (where the tenant's master logo lives).
- Date of rebrand.
- Who did the rebrand.

This makes future colour-tweaks or logo-refreshes trivial.

---

## Common rebrand mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Forgot to update Supabase email templates | Reset emails still say "AI Solutions" | Step 4 |
| Tailwind colour changed but components still hardcoded | Some buttons still blue | Search `bg-[#2563eb]` and replace with `bg-primary` |
| Favicon cached in browser | Old icon still shows | Hard refresh (Ctrl+Shift+R) or wait 24h |
| OG image too small | Slack preview shows blank | Must be ≥ 1200x630 px |
| Logo SVG includes hardcoded colours | Logo doesn't theme correctly | Either use a single-colour SVG with `currentColor`, or export a brand-coloured PNG |

---

## What rebrand does NOT change

- The SQL schema (still `raidd_entries`, `lessons_entries`, `pm_lite_feedback`). Schema names are internal — tenants never see them.
- The URL paths (`/tracker`, `/tracker/raidd`, etc). Standard across all tenants.
- The 10 SMART feedback questions (in `artifacts/feedback-scaffold/pm-lite-questions-registry.md`). Wording changes are a separate decision logged as a RAIDD `decision` entry.

If a tenant wants any of these changed, that is **not a rebrand** — it is a customisation, priced separately (Enterprise tier).

---

**End of rebrand guide. Open `05_handover-checklist.md` for the final tenant-handover steps.**
