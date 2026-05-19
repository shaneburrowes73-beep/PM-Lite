# [Project Name] — Warranty Period and BAU Handover

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Date:** [YYYY-MM-DD]
**Status:** [DRAFT / WARRANTY ACTIVE / BAU HANDED OVER / SUPERSEDED]
**Project ID:** [slug, e.g. `pm-lite`]
**Authors:** [Names]

---

## Why this document exists

The warranty period is the bridge between "project work is done" and "business-as-usual operations." It is the single biggest gap in most project governance kits — and the single most common cause of failed handovers.

Without a warranty document, three things tend to happen:
1. **The project team gets dragged back forever.** Every defect found by the ops team becomes an emergency for the project team, even months after closure. No one ever truly disengages.
2. **The ops team inherits something they can't actually run.** Credentials, runbooks, monitoring thresholds — half of it is in someone's head and the project team never wrote it down.
3. **Disagreements about "is this a warranty issue or a new request?" turn into invoicing fights.** Particularly damaging for paid engagements.

This template defines:
- What the warranty period IS and is NOT.
- The triage workflow when issues arise during warranty.
- The criteria the ops team must confirm before accepting BAU.
- The sign-off that formally transfers responsibility.

For non-PM readers: this is the document that gets you from "delivered" to "the right people are operating this in the long run." Treat warranty seriously — most "post-launch chaos" is the symptom of a skipped warranty period.

---

## 1. Warranty period definition

| Field | Value |
|---|---|
| **Start date** | [from `13_project-closure.md` §1 — date of latest sign-off] |
| **End date** | [start + warranty duration] |
| **Default duration** | **30 days** (see §"Lifecycle cadence" for when to amend) |
| **Releasing party (project team)** | [from `13_project-closure.md` — project lead] |
| **Receiving party (ops team)** | [from `13_project-closure.md` — operations lead] |

---

## 2. What's covered by warranty

The project team is on the hook for the following during the warranty period:

- **Defects discovered in delivered work.** Things that don't behave as the PID (`14_project-initiation.md`) said they would. The project team fixes these at no additional cost.
- **Operational instability traced to the delivered work.** If the system goes down because of how it was built (not because of an external factor), the project team helps stabilise.
- **Items explicitly listed in `13_project-closure.md` §6** "Open items transferred to warranty." These were known at closure and have a target resolution date.
- **Knowledge gaps** identified during warranty (e.g., "the runbook didn't cover scenario X"). Project team fills the gap.

---

## 3. What's NOT covered by warranty

The project team is NOT on the hook for the following. These route elsewhere:

| Type of issue | Where it routes |
|---|---|
| New feature requests | `03_decision-log.md` as a Scope Decision; if approved, becomes a new project or change request |
| Changes due to external factors (regulation, customer environment, supplier change) | Ops team's own change control, NOT the project team |
| Items that were out of scope at initiation (per PID §3 "Out of scope") | Out of scope — escalate to sponsor if pressure is being applied to absorb |
| "Things we wish we'd built differently" without a defect | Retrospective learning — log in `08_lessons-learned.md`; not actionable as warranty work |
| Improvements / optimisations | Backlog for a future project; not warranty |

**Rule of thumb for triage:** if it would have been valid as an Issue or a Defect *at the moment of closure*, it's warranty. If it's something the world has changed to require, it's not.

---

## 4. Warranty workflow

When something is raised during the warranty period, follow this triage:

1. **Issue raised** by buyer or ops team. Recorded in `07_raidd-log.md` as a new Issue with `project_id` = this project, status = `open`.
2. **Project team triages** within agreed SLA (default: 2 business days). Verdict is one of:
   - **Warranty** — proceed to step 3.
   - **New request** — route to `03_decision-log.md` as a Scope Decision; close the RAIDD entry with `superseded_by` reference.
   - **Known-and-accepted** — link to the original decision/risk that documented this; close the RAIDD entry.
3. **If warranty:** project team fixes in place. Log the fix in `04_incident-response.md` (timeline format). If the fix surfaces a pattern, also log in `08_lessons-learned.md`.
4. **Confirm with ops team** that the fix is acceptable.
5. **Close the RAIDD entry** with resolution date and `action_or_mitigation` populated.

If the triage verdict is disputed (project team says "new request" / ops team says "warranty"), escalate to sponsor (per `10_project-roles.md` escalation path). The sponsor's verdict is final.

---

## 5. BAU handover criteria

Before the operations team formally accepts BAU, confirm each of the following. Do NOT skip items just because the warranty period has elapsed — an unprepared ops team is worse than an extended warranty.

- [ ] **Credentials access:** Operations team has access to all credentials in `02_credentials-manifest.md`. Confirmed by ops lead reading the manifest and attempting access to each.
- [ ] **Runbook:** Operations team has the `04_incident-response.md` runbook AND has read it. Ideally, they have walked through at least one tabletop scenario.
- [ ] **Backup-restore tested:** The procedures in `05_backup-restore.md` have been tested IN THE OPS TEAM'S HANDS, not just the project team's. Backup created by ops, restore tested by ops, confirmed working.
- [ ] **Monitoring & alerting:** Monitoring is in place with documented thresholds. Alerts route to ops team's channels (not the project team's). Ops team has acknowledged at least one test alert.
- [ ] **Knowledge transfer sessions complete:** A documented set of knowledge transfer sessions has been delivered. Record dates, attendees, topics covered.
- [ ] **Warranty period elapsed OR explicitly extended:** Either the default warranty duration has passed, OR the sponsor and ops lead have agreed in writing to extend (with new end date).
- [ ] **Open warranty items closed OR explicitly accepted:** Every item in `13_project-closure.md` §6 is either resolved (status updated) OR formally accepted by the ops team (logged as a known issue they will manage post-BAU).

**If any checkbox is unticked, BAU handover does NOT proceed.** Either the gap is closed, or the warranty period is extended.

### Knowledge transfer log

| Session # | Date | Topic | Attendees (ops side) | Materials | Sign-off (ops attendee) |
|---|---|---|---|---|---|
| 1 | [date] | [topic] | [names] | [link to slides / recording] | [name + date] |
| 2 | [date] | [topic] | [names] | [link] | [name + date] |
| [add rows as needed] | | | | | |

---

## 6. BAU handover sign-off

When all checkboxes in §5 are ticked, the formal handover occurs.

| Role | Name | Verdict | Signature / approval | Date |
|---|---|---|---|---|
| **Project lead (releasing)** | [name] | Project team disengaging; warranty obligations met or formally extended | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| **Operations lead (receiving)** | [name] | Acknowledging BAU criteria met; ops team takes over from this date | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| **Sponsor (witnessing)** | [name] | Confirming clean handover; project formally complete | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |

**Effective date of BAU:** [latest sign-off date above]

Once signed:
- The project team is no longer responsible for operational issues.
- All open warranty items are now ops team's responsibility (closed or accepted).
- The project lifecycle is **complete**.

---

## 7. What changes at BAU

The transition from warranty to BAU changes the role of several governance documents:

| Document | Behaviour during project + warranty | Behaviour at BAU |
|---|---|---|
| `03_decision-log.md` | Project team logs scope/technical decisions | Future change requests go to ops team's change control, NOT project team |
| `04_incident-response.md` | Project team is on-call for production issues | Ops team's on-call rota takes over |
| `07_raidd-log.md` | Project team owns RAIDD entries | Ops team owns operational RAIDD entries; project-team-owned entries are closed or transferred |
| `11_stakeholder-comms-plan.md` | Status reports to sponsor on project rhythm | Status reports stop; ops dashboards / SLA reports take over |
| `12_status-report.md` | Final status report sent (closure summary) | Cadence ends; ops team uses their own reporting templates |
| `16_raci-matrix.md` | Project team is A on most rows | Ops team is A on operational rows; sponsor remains A on strategic rows |
| `02_credentials-manifest.md` | Project team owns credentials | Ops team owns credentials; project team access revoked unless explicitly retained |

If any of the above does NOT happen at BAU, the handover is incomplete and someone (typically project lead or ops lead) should flag it.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ONCE per project, at the end of project work (after `13_project-closure.md` is signed off).
- Active throughout the warranty period.
- Concluded at BAU handover sign-off.

**Default cadence:**
- **Warranty period: 30 days** from the date of the latest closure sign-off in `13_project-closure.md`.
- **Triage SLA during warranty: 2 business days** from issue raised to verdict.
- **BAU handover review meeting: 1 week before warranty end date** to walk the §5 checklist.

**Why this default:**
- 30 days is short enough to keep the project team's context fresh — they can still answer questions without re-learning the system. It's long enough for the buyer to surface real defects in operational use rather than just acceptance-testing artefacts.
- 2-day triage SLA is fast enough to be useful but slow enough that project team isn't drowning in reactive work.

**When to amend the cadence:**

- **Extend to 60-90 days** if:
  - Project includes seasonal or cyclical processes that won't be exercised in 30 days (e.g., a monthly billing cycle that needs to run successfully twice).
  - Customer environment is high-risk regulated (finance, healthcare, public sector) where surface-area validation takes longer.
  - The project team is geographically distributed and the ops team is new — knowledge transfer needs more iteration.
- **Shorten to 14 days** if:
  - Project is small (<2 weeks of work) — long warranty disproportionate to project size.
  - Customer is highly experienced and absorbing quickly — the project lead can see ops team operating confidently within 2 weeks.
  - The deliverable is a tool the ops team already knows the patterns of (e.g., a new microservice in a portfolio of similar microservices).
- **Skip entirely (immediate BAU)** if:
  - Project is internal AND the ops team was embedded throughout the project (knowledge transfer was continuous, not a handover event).
  - The project is a small change to an existing system that the ops team already runs.

**Cadence amendment must be agreed in writing** (email is fine) between project lead, ops lead, and sponsor BEFORE the warranty period would otherwise end. Verbal "we'll just extend" agreements lead to disputes about whether handover ever happened.

---

## Linked documents

- `13_project-closure.md` — the closure report that triggers this warranty period
- `14_project-initiation.md` — the original PID that defines what was in scope (used to triage "warranty vs new request")
- `02_credentials-manifest.md` — credentials list ops team must have access to
- `04_incident-response.md` — runbook that ops team must have AND have read
- `05_backup-restore.md` — backup/restore procedure that must be tested in ops team's hands
- `07_raidd-log.md` — where warranty-period issues are logged
- `08_lessons-learned.md` — patterns surfaced during warranty get captured here
- `11_stakeholder-comms-plan.md` — stops at BAU
- `12_status-report.md` — final report sent at warranty end; cadence stops at BAU
- `03_decision-log.md` — new requests during warranty get routed here as Scope Decisions
- `10_project-roles.md` — defines escalation path for disputed warranty triage
- `16_raci-matrix.md` — sign-off accountability for BAU handover

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Warranty and BAU handover document drafted | [Name] |

---

**End of Warranty Period and BAU Handover template.**
