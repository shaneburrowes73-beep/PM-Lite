# [Project Name] — Backup and Restore

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Name]

---

## What is backed up

| Asset | Where | How often | Retention |
|---|---|---|---|
| Supabase database (all tables) | Supabase automated backups | Daily | 7 days (Free), 7 days + PITR (Pro) |
| GitHub repository | GitHub native (push history) | Every push | Indefinite (tied to repo lifetime) |
| Vercel deployment artifacts | Vercel build history | Every deploy | 30 days for free; longer on Pro |
| 1Password vault (credentials) | 1Password's own infra | Continuous | Tied to subscription |
| Tenant-uploaded files (if any) | Supabase Storage or external | Per-file | Same as Supabase |
| This documentation folder | Google Drive (this folder) | Edit-by-edit history | Drive's 30-day trash window + Drive version history |

If any asset is NOT in this table, it's NOT backed up — fix that.

---

## Daily verification

Pick a 5-minute slot each morning (or set a calendar reminder):

- [ ] Confirm yesterday's Supabase backup is present (Supabase → Database → Backups).
- [ ] Confirm the latest Vercel deployment is `READY` (Deployments tab, not the home page).
- [ ] Confirm the GitHub repo's `main` branch is at the expected commit SHA.

If anything is missing, open an issue and treat it as a SEV-3 incident.

---

## Monthly verification — restore drill

On the first business day of each month:

1. **Pick a recent Supabase backup** (≤ 7 days old).
2. **Create a scratch Supabase project** (or use a dedicated "restore-drill" project).
3. **Restore the backup** into the scratch project.
4. **Run a sanity query:**
   ```sql
   SELECT COUNT(*) FROM public.raidd_entries;
   SELECT COUNT(*) FROM public.lessons_entries;
   ```
5. **Confirm** the counts match (or are within expected delta of) the production project.
6. **Delete the scratch project** after the drill completes.
7. **Log** the drill outcome in `08_lessons-learned.md` if anything surprising came up.

If a restore drill fails, treat it as SEV-2 — backups that can't be restored are not backups.

---

## Quarterly verification — full restore drill

Once per quarter, do the monthly drill plus:

- Restore into a Vercel preview environment.
- Boot the app pointing at the restored DB.
- Log in and run the smoke-test list from `06_project-checklist.md`.
- Time the full restore from "decision made" to "app working" — target under 60 minutes.

---

## Restoring after an incident

If you're reading this during an incident, you've probably skipped the verification drills above. That's a lesson — log it later.

### Step 1 — Decide what to restore

| Scenario | What to restore |
|---|---|
| Accidental row deletion / bad migration | Just the affected table(s) — use point-in-time recovery |
| Database corrupted / Supabase outage | Full database from latest backup |
| Code-side bug introduced in last deploy | Revert via Vercel → Deployments → previous READY → Promote |
| Credential leak | Don't restore — rotate credentials and continue (see Playbook A in `04_incident-response.md`) |
| Tenant requests data restore to a previous point | Full PITR to that point — confirm with tenant before doing it |

### Step 2 — Run the restore

**Supabase point-in-time recovery (Pro tier):**

1. Supabase dashboard → Database → Backups → Point in Time.
2. Select the timestamp to restore to.
3. Confirm — Supabase creates a new branch with the restored data.
4. Verify the new branch has the expected rows.
5. **Promote the branch** or **export the data** and re-import to the main project.

**Supabase daily backup restore (Free tier):**

1. Supabase dashboard → Database → Backups → Restore.
2. Pick the backup date.
3. This restores into a NEW Supabase project (you cannot overwrite the existing one).
4. Re-point Vercel env vars to the new project URL and keys.
5. Old project can be deleted or kept as a reference for 7 days.

**Vercel deployment rollback:**

1. Vercel → Deployments → find the last good `READY` deployment.
2. Click the 3-dot menu → **Promote to Production**.
3. Vercel re-routes traffic in under 30 seconds.

### Step 3 — Verify after restore

Run through the smoke-test list (in `06_project-checklist.md`). Confirm:

- App loads.
- Login works.
- A representative tenant's data is visible and correct.
- No data older than the restore point is leaking through.

### Step 4 — Post-restore

- [ ] Log the incident timeline in `04_incident-response.md`.
- [ ] Open a RAIDD `issue` entry if not already done.
- [ ] Schedule a post-mortem within 1 week.
- [ ] Update this document if the procedure missed anything.

---

## Hard rules

1. **Test restores monthly. Untested backups are not backups.**
2. **Restoring overwrites data. Have a fresh backup of the current state BEFORE you restore over it** (in case the restore is the wrong choice).
3. **Document every restore.** A future post-mortem will need to know what was done and when.
4. **Tenant-facing restores require tenant confirmation in writing** (email is fine). The tenant owns their data; you don't unilaterally roll it back without consent.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document created | [Name] |

---

**End of backup and restore template.**
