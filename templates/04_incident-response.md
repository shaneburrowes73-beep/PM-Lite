# [Project Name] — Incident Response

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Name]
**On-call:** [Name + contact, or "see 1Password rota"]

---

## What counts as an incident

Any of the following:

- Production service down or unreachable.
- Data loss or data corruption suspected.
- Credentials exposed (in code, in a log, in a screenshot, in a support ticket).
- Unauthorised access to tenant data.
- A critical security alert from CodeQL, Dependabot, or Supabase.
- Sustained performance degradation (>2× baseline) affecting users.

If unsure, treat it as an incident. The cost of running this checklist for a non-incident is low; the cost of NOT running it for a real incident is high.

---

## Severity scale

| Level | Definition | First-response target |
|---|---|---|
| **SEV-1 — Critical** | Total outage; data breach; credential leak with confirmed external access | Within 15 minutes |
| **SEV-2 — High** | Partial outage; suspected breach; critical security alert; tenant-facing data error | Within 1 hour |
| **SEV-3 — Medium** | Performance degradation; non-critical security alert; backup failure | Within 4 hours |
| **SEV-4 — Low** | Cosmetic issue, single-user impact, no security implication | Next business day |

---

## First-response checklist (any severity)

1. **Stop the bleeding.** Disable or pause the affected system. If unsure how, get someone who knows on the call.
2. **Capture evidence.** Screenshot errors, copy logs, note timestamps in UTC.
3. **Open an incident channel** (Slack `#incident-[date]` or equivalent). Pin the evidence.
4. **Assign roles:**
   - **Incident commander** — coordinates response, talks to stakeholders.
   - **Investigator** — looks at the technical evidence.
   - **Comms** — handles tenant communication (if tenant-facing).
5. **Confirm severity** based on the scale above.
6. **Start the timeline** in this document (see template below).

---

## Specific incident playbooks

### Playbook A — Exposed credential

**Symptom:** Credential appears in a GitHub commit, public log, screenshot, support ticket, etc.

1. **IMMEDIATELY** revoke the credential in the source system:
   - Supabase: Settings → API → Reset / rotate.
   - Vercel: delete the env var, save (which forces a fail), then re-add with a new value.
   - GitHub PAT: Settings → Tokens → Delete.
   - Gmail App Password: account.google.com → Security → App passwords → Revoke.
2. Generate a replacement credential.
3. Update every runtime location (Vercel envs, GitHub Secrets, local `.env.local`).
4. Redeploy affected services and verify they work with the new credential.
5. Check audit logs (Supabase auth log, GitHub audit log, Vercel logs) for usage of the old credential. If found, investigate the source.
6. **Notify** stakeholders within 2 hours.
7. **Log** in `03_decision-log.md` and as a RAIDD `issue` entry.
- **Target:** fix within 1 hour; notify within 2 hours.

### Playbook B — Critical CodeQL or Dependabot alert

**Symptom:** SQL injection, XSS, RCE, or critical CVE in a dependency.

1. Pause deployments of the affected branch.
2. Fix the issue or update the dependency.
3. Re-run CodeQL or tests to confirm.
4. Merge only after all checks pass.
5. If the alert indicates exploitation may already have occurred, escalate to Playbook A logic for any potentially-exposed credentials.
- **Target:** fix within 24 hours.

### Playbook C — Unauthorised tenant data access

**Symptom:** Audit log shows access to a tenant's data from an unexpected source.

1. Review Supabase Auth audit log for the time window.
2. Confirm RLS policy was active when the access occurred (Supabase → Database → Tables → RLS).
3. If RLS bypass: rotate service-role key, fix the policy, redeploy.
4. **Notify the affected tenant** with: what was accessed, when, what action you've taken.
5. **Document** for GDPR / regulatory reporting if required.
- **Target:** investigate within 2 hours; notify within 4 hours for SEV-1.

### Playbook D — Vercel deployment ERROR while home page shows green

**Symptom:** Tenant reports app broken; Vercel project home page shows green.

This is the recurring portfolio gotcha. The Vercel home page lies; the Deployments tab is truth.

1. Open Vercel → **Deployments** tab.
2. Find the latest production deployment. If `readyState=ERROR`, click in.
3. Read the build log to identify the cause.
4. Fix locally, push, verify.
5. If a previous deployment was good, you can roll back: Deployments → previous READY → Promote to Production.
- **Target:** fix within 1 business day for SEV-3; faster if tenant impact is severe.

### Playbook E — Failed-authentication burst

**Symptom:** Multiple failed auth attempts on `/api/raidd/append` or `/tracker/login` (>5/min from one source).

1. Check Supabase auth log for the source IP/email pattern.
2. If brute force: rotate `BETA_PASSWORD_HASH` if applicable; consider tightening Supabase rate-limit settings.
3. If misconfiguration on tenant side: notify the tenant and fix.
4. If suspicious but inconclusive: monitor for an hour, escalate to Playbook A if a credential ultimately leaks.
- **Target:** respond within 1 hour.

---

## Incident timeline template

For every SEV-1 or SEV-2, fill in:

```
## Incident: [short name]

- **Detected:** [YYYY-MM-DD HH:MM UTC] by [Name / system]
- **Severity:** SEV-N
- **Incident commander:** [Name]
- **Affected systems:** [list]
- **Affected tenants:** [list, or "internal only"]

### Timeline
- HH:MM — [event]
- HH:MM — [event]
- HH:MM — [event]
- HH:MM — Resolution achieved.

### Root cause
[One paragraph.]

### Fix applied
[One paragraph.]

### Prevention measures
[Bullet list — what we'll change so this doesn't happen again.]
```

---

## Post-incident (within 24 hours)

- [ ] Incident summary written (use the timeline template above).
- [ ] Root cause identified.
- [ ] Prevention measures documented.
- [ ] Lesson entered in the lessons-learned database (`08_lessons-learned.md` or the tracker's `lessons_entries` table).

## Post-incident (within 1 week)

- [ ] Audit logs reviewed for lateral movement or further compromise.
- [ ] Security procedures updated to reflect lessons.
- [ ] Team training scheduled if a knowledge gap was identified.
- [ ] Incident ticket closed.

## Post-incident (quarterly)

- [ ] Review incident history.
- [ ] Identify repeat patterns.
- [ ] Update playbooks based on new patterns.

---

## Emergency contacts

| Role | Name | Method | Backup |
|---|---|---|---|
| On-call engineer | [Name] | [phone / email / Slack] | [Name] |
| Security lead | [Name] | [contact] | [Name] |
| Tenant comms | [Name] | [contact] | [Name] |

Keep this list current. If anyone leaves the team, update within 24 hours.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document created | [Name] |

---

**End of incident response template.**
