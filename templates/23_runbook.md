# Runbook — [Service / System / Process Name]

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner (operational):** [Operations Lead name]
**Owner (technical):** [Service owner / lead engineer name]
**Project ID:** [slug]
**Service / System:** [what this runbook covers]

---

## Why this document exists

A **runbook** is the operational playbook for keeping a service or system running. It's the document the on-call engineer reaches for at 3am when something breaks, and the document a new team member reads to learn how to operate a system without breaking it.

Runbooks are deliberately practical: less narrative, more "if X then do Y." They're written for someone who needs to act, not someone who wants to learn theory.

**This template is a STRUCTURED SHELL — not a generic fill-in-the-blanks.** Runbooks are inherently project-specific. The structure below ensures you think about the right things; the content you write will be unique to your service.

**For non-PM readers:** if a project produces something that runs in production (an app, a website, a service, a process), it needs a runbook. The runbook lives with the operations team after handover; the project team writes it during Build/Test/Deploy stages.

---

## 1. When you'd use a runbook (and when you wouldn't)

### 1.1 Runbook scope

A runbook covers ONE operational unit. Examples:

- **A service or app** (e.g., "customer portal", "n8n meeting-minutes workflow")
- **A subsystem** (e.g., "Stripe webhook handler", "nightly backup job")
- **A business process** (e.g., "monthly invoice run", "quarterly RLS audit")
- **An integration** (e.g., "Gmail SMTP outbound email")

Each operational unit gets its own runbook. Don't try to write one runbook for everything — readers can't find what they need.

### 1.2 When you DON'T need a runbook

- A one-off task that won't recur.
- A development-only system (no production state).
- Something fully managed by a third party where you have no operational responsibility.
- A trivial system where "look at the dashboard" is the entire operational story.

### 1.3 Relationship to other templates

| Template | Connection |
|---|---|
| `04_incident-response.md` | Incidents triggered by runbook procedures may escalate to formal incident response. |
| `05_backup-restore.md` | If your system has data, backup/restore procedures may live here OR in 05. Choose one. |
| `15_warranty-and-bau-handover.md` | Runbook handover happens at G5. Runbook is REQUIRED for G5 sign-off. |
| `17_triage-guidance.md` | Runbook tells you what to DO; triage tells you what's URGENT. |
| `20_stage-gates.md` | Runbook reaches "Active" status at G4 (Deploy Complete) and is fully required by G5. |

---

## 2. Overview (the 60-second briefing)

The top of every runbook should answer: "If I have 60 seconds to understand this system before I have to operate it, what do I need to know?"

| Field | Content |
|---|---|
| **What this system does (1 sentence)** | [e.g., "Receives customer feedback via web form and posts to Slack + Supabase."] |
| **Who depends on it** | [e.g., "Sales team for lead routing; customers for ack emails."] |
| **Business criticality** | [Critical / High / Medium / Low — and why] |
| **Hours of operation** | [24/7 / business hours / on-demand] |
| **SLA target (if applicable)** | [e.g., "99.5% uptime, <500ms p95 response time"] |
| **Tech stack (1 line)** | [e.g., "Next.js on Vercel + Supabase (eu-west-2) + Gmail SMTP via app password"] |
| **Last reviewed** | [YYYY-MM-DD by Name] |

Keep this section tight. Detail goes below.

---

## 3. Architecture (the picture)

[Insert architecture diagram OR a text-based component list]

### 3.1 Components

| Component | Role | Where it lives | Who owns it |
|---|---|---|---|
| [e.g., Frontend] | [Customer-facing UI] | [Vercel project `prj_xxx`] | [Name] |
| [e.g., API] | [Receives form submissions] | [Same Vercel project, /api routes] | [Name] |
| [e.g., Database] | [Persistent storage] | [Supabase project `xxx`] | [Name] |
| [e.g., Email] | [Outbound notifications] | [Gmail SMTP via `ai-solutions` hub] | [Name] |

### 3.2 Data flow (1-2 sentences)

[e.g., "User submits form → frontend POSTs to /api/feedback → API inserts into `feedback_table` → trigger fires → Slack webhook called → confirmation email sent via Gmail SMTP."]

### 3.3 External dependencies

| Dependency | Vendor / service | What happens if it's down |
|---|---|---|
| [e.g., Stripe] | [Stripe Inc.] | [No new payments; existing subscriptions continue.] |
| [e.g., Gmail SMTP] | [Google] | [Outbound emails queue; retry every 5 min for 1 hour.] |

---

## 4. Access and credentials

**WARNING: never paste actual credentials in this document.** Reference where they live; don't include values.

| Resource | Where credentials live | Who has access |
|---|---|---|
| [e.g., Vercel project admin] | [1Password vault: AI Solutions / Vercel] | [Operations Lead + named admins] |
| [e.g., Supabase service-role key] | [1Password vault: AI Solutions / Supabase] | [Operations Lead only] |
| [e.g., Gmail App Password] | [1Password vault: AI Solutions / Gmail SMTP] | [Operations Lead + DevOps] |

See `02_credentials-manifest.md` for the full credentials register and rotation schedule.

**Access principle:** least privilege. Operational tasks should use credentials with the minimum scope needed. Service-role keys are emergency-only.

---

## 5. Routine operational tasks

These are the things someone has to do on a schedule (or in response to specific events).

### 5.1 Daily

| Task | Why | How (steps or link) | Time required | Who |
|---|---|---|---|---|
| [e.g., Check overnight backup ran] | [Data loss protection] | [Look at Supabase Backups page; confirm last backup <24h old] | [2 min] | [Ops Lead] |
| [e.g., Review error log] | [Catch issues early] | [Vercel dashboard → Logs → filter `level:error`] | [5 min] | [Ops Lead] |

### 5.2 Weekly

| Task | Why | How | Time | Who |
|---|---|---|---|---|
| [e.g., Triage backlog review] | [Per `17_triage-guidance.md` §3.5] | [Walk open RAIDD entries; close stale] | [30 min] | [Ops Lead + project team] |

### 5.3 Monthly

| Task | Why | How | Time | Who |
|---|---|---|---|---|
| [e.g., Restore drill] | [Verify backups work] | [Per `05_backup-restore.md` monthly drill procedure] | [1 hour] | [Ops Lead] |
| [e.g., Cost review] | [Catch unexpected charges] | [Review Vercel + Supabase + Gmail billing] | [15 min] | [Sponsor + Ops Lead] |

### 5.4 Quarterly

| Task | Why | How | Time | Who |
|---|---|---|---|---|
| [e.g., Credential rotation] | [Security hygiene] | [Per `02_credentials-manifest.md` rotation schedule] | [2 hours] | [Ops Lead] |
| [e.g., Full restore drill] | [Verify full app recovery] | [Restore database + deploy app + boot test] | [3 hours] | [Ops Lead + DevOps] |
| [e.g., RLS audit] | [Security baseline] | [Re-run audit script; review changes] | [1 hour] | [Ops Lead] |

### 5.5 Event-triggered (not on a schedule)

| Trigger | Task | Procedure |
|---|---|---|
| [e.g., New team member joins] | [Provision access] | [Add to 1Password vault; create Vercel team membership; add to Slack channel] |
| [e.g., Team member leaves] | [Revoke access within 24h] | [Remove from 1Password; remove Vercel access; rotate any shared credentials they touched] |
| [e.g., Dependency security advisory (Dependabot)] | [Triage + patch] | [Review severity; patch within 7 days for high/critical; deploy and verify] |

---

## 6. Common issues and remediation

This is the section the on-call engineer will reach for at 3am. Write it for someone who is tired, stressed, and needs to act now.

### 6.1 [Issue category 1 — e.g., "Service is down"]

**Symptoms:** [What you'd observe]
- [e.g., Health endpoint returns 5xx]
- [e.g., User reports]

**Diagnosis steps:**
1. [Check status of dependency X]
2. [Look at recent deployments — was there a deploy in the last hour?]
3. [Check error logs for stack traces]

**Remediation:**
- **If recent deploy:** rollback via Vercel dashboard (see §6.5 below)
- **If dependency outage:** [specific steps]
- **If unknown:** escalate per §8 escalation path

**Prevention:**
- [What we'll do differently next time — feed lessons back to `08_lessons-learned.md`]

---

### 6.2 [Issue category 2 — e.g., "High error rate but service stays up"]

**Symptoms:**
- [List observable signals]

**Diagnosis steps:**
1. [Step 1]
2. [Step 2]

**Remediation:**
- [Specific actions]

---

### 6.3 [Issue category 3 — e.g., "Performance degradation"]

[Same structure]

### 6.4 [Issue category 4 — e.g., "Data inconsistency"]

[Same structure]

### 6.5 Deploy rollback procedure

(Common enough to deserve a dedicated section.)

**When to roll back:**
- Production deployment caused a regression detected within 1 hour.
- The fix-forward time would exceed 30 minutes.

**How to roll back (Vercel):**
1. Go to project's Deployments tab.
2. Find the last `READY` deployment BEFORE the broken one.
3. Click `⋯` → **Promote to Production**.
4. Confirm. Vercel routes production traffic to that deployment within seconds.
5. **Then** investigate the broken deployment offline.

**Rollback for non-Vercel systems:**
[Add specific procedures]

---

## 7. Monitoring and alerting

| What we monitor | Tool | Threshold | Who gets alerted | How |
|---|---|---|---|---|
| [e.g., Uptime] | [Vercel] | [Down >2 min] | [Ops Lead] | [Slack #alerts] |
| [e.g., Error rate] | [Vercel logs] | [>5% in 10 min] | [On-call] | [PagerDuty / Slack] |
| [e.g., Database connections] | [Supabase] | [>80% of pool] | [Ops Lead] | [Email] |

**Alert hygiene rules:**
- Every alert must be actionable. If you can't act on it, don't alert on it.
- Test alerts at least quarterly — silent monitors are worse than no monitors.
- Tune thresholds when you find yourself ignoring alerts. Ignored alerts train the team to ignore real ones.

---

## 8. Escalation path

When the on-call engineer can't resolve an issue alone, who do they escalate to?

| Severity (per `17_triage-guidance.md` §5) | First responder | Escalation 1 (after X mins) | Escalation 2 (after Y mins) | Sponsor notification |
|---|---|---|---|---|
| **Critical** | [On-call engineer] | [Ops Lead — 15 min] | [Sponsor — 30 min] | Immediate |
| **High** | [On-call engineer] | [Ops Lead — 1 hour] | [Sponsor — 4 hours] | Within 4 hours |
| **Medium** | [On-call engineer] | [Ops Lead — same day] | — | In next status report |
| **Low** | [On-call engineer] | — | — | None |

**Out-of-hours escalation:**
- Critical / High: phone call (provide numbers stored in 1Password, not here).
- Medium / Low: hold to next business day.

---

## 9. Known limitations and caveats

What this system DOESN'T do well, or limitations operators should know about.

- [e.g., "Database in eu-west-2; users in Asia experience higher latency. Acceptable for current scale."]
- [e.g., "Free Vercel tier has 100GB bandwidth/month. We're at ~30GB. Plan to upgrade by 80%."]
- [e.g., "No automated multi-region failover. Recovery requires manual DNS update."]

Honesty here saves the operator from discovering these the hard way.

---

## 10. Retirement / decommissioning

When this system is no longer in active use:

**Pre-retirement checklist:**
- [ ] Confirm no users / dependent systems
- [ ] Final data export (per data retention policy)
- [ ] Notify all stakeholders per `11_stakeholder-comms-plan.md`
- [ ] Archive code repository
- [ ] Cancel third-party subscriptions (Vercel project, Supabase, etc.)
- [ ] Remove secrets from 1Password (after grace period)
- [ ] Archive this runbook (mark Status: RETIRED, keep the file)

See `20_stage-gates.md` §Stage 9 (Retirement) for the full retirement gate.

---

## 11. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **"Living in someone's head"** | When that person leaves or is unavailable, operations fail. | Write it down here. Every recurring task. |
| **Outdated runbook** | Operators follow steps that no longer work; situation gets worse. | Review runbook at least quarterly. Update IMMEDIATELY when a procedure changes. |
| **Generic "google it" steps** | At 3am the operator can't synthesise a fix from scratch. | Spell out the specific steps for THIS system. |
| **Credentials in runbook** | Anyone with access to the runbook can exfiltrate. Compliance violation. | Always reference credential storage, never paste values. |
| **One mega-runbook for everything** | Operators can't find what they need. | One runbook per operational unit. Cross-reference rather than combine. |
| **Untested procedures** | Steps look right on paper but don't work in practice. | Test new procedures with a dry run before they're needed for real. |
| **No "last reviewed" date** | Stale runbooks look authoritative but are wrong. | Date-stamp every section that changes. Force a review cadence. |
| **Aspirational SLAs / monitoring** | Document promises capabilities that don't exist. | Only document what's actually in place. Note gaps as known limitations (§9). |

---

## 12. Links and references

- `04_incident-response.md` — when an issue escalates to a formal incident
- `05_backup-restore.md` — backup/restore procedures
- `08_lessons-learned.md` — log what we learn from incidents
- `15_warranty-and-bau-handover.md` — runbook is REQUIRED for G5 sign-off
- `17_triage-guidance.md` — severity definitions and triage discipline
- `20_stage-gates.md` — lifecycle context (G4 onward)
- `02_credentials-manifest.md` — credential storage register

External:
- [Vercel dashboard URL]
- [Supabase project URL]
- [GitHub repo URL]
- [Monitoring dashboard URL]
- [Status page URL]

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- DRAFTED during Stage 3 (Build) — early version captures architecture and major operational tasks.
- COMPLETED during Stage 4-5 (Test, Deploy) — issue patterns and remediation steps are added as they emerge during testing.
- ACTIVE from Stage 5 (Deploy) onward.
- HEAVILY USED during Warranty (Stage 6) and BAU (Stage 7).
- ARCHIVED at Stage 9 (Retirement) with `Status: RETIRED` but never deleted.

**Default cadence for runbook MAINTENANCE:**
- **Updated immediately** when any procedure changes. Stale procedures cause more harm than missing ones.
- **Reviewed quarterly** at minimum, even if no changes were made. Confirm contact details, alert thresholds, and links are still valid.
- **Incident-triggered review** — every incident should produce an update (new issue category, refined remediation, lesson learned).
- **Annual deep review** — full read-through, refresh "Last reviewed" date, validate all links and references.

**Why these defaults:**
- Runbooks are operational documents — they age fast. Quarterly minimum keeps them honest.
- Incident-triggered updates feed real-world experience back into the document. This is how runbooks improve.
- Annual deep review catches the slow drift that quarterly skims miss.

**When to amend the cadence:**
- **Tighten** (monthly review) if: high-change-velocity system (frequent deploys, evolving architecture) OR recent incident pattern.
- **Loosen** (semi-annual review) if: stable, low-change system AND no incidents in 6+ months.
- **Skip entirely** is not an option for any system in active production use.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of runbook template.**
