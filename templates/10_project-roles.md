# [Project Name] — Project Roles

**Version:** 1.1
**Date:** [YYYY-MM-DD]
**Owner:** [Name]

---

## Why this document exists

When an action surfaces — in a meeting, a RAIDD entry, an incident — it needs an owner. "Owner = free text" is fine until the project has 50 open items and three of them are owned by "Sarah" (which Sarah?). This document is the single source of truth for:

- Who's on the project
- What role each person plays
- Who escalates to whom
- Who substitutes when someone is unavailable

Every owner field in the tracker (RAIDD entries, lessons, actions, decisions, incidents) draws its valid values from this document. If a name doesn't appear here, it can't be assigned work on this project.

---

## Roles defined

### Project Sponsor

**Definition:** The senior stakeholder who funds the project and is accountable for its outcomes. Usually external to the delivery team.

**Responsibilities:**
- Funds the project (or holds the budget)
- Owns the success criteria
- Final decision-maker for scope changes > the thresholds in `03_decision-log.md`
- Receives monthly status reports
- Escalation point for critical risks
- Signs off project closure per `13_project-closure.md` and BAU handover per `15_warranty-and-bau-handover.md`

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title and organisation]
- **Availability:** [normal hours; out-of-office dates]
- **Backup:** [Name] (when Sponsor is unavailable, this person is the temporary decider)

### Project Lead

**Definition:** The single named person accountable for delivery. The buck stops here.

**Responsibilities:**
- Owns the project plan, RAIDD log, lessons
- Convenes meetings, ensures minutes are produced
- Owns final delivery quality
- Reports to the Sponsor
- Is the **triage manager** through Phase A–E and warranty (per `17_triage-guidance.md` §3.3)

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours; out-of-office dates]
- **Backup:** [Name] (also serves as **deputy triage manager** per `17_triage-guidance.md` §3.3)

### Technical Lead (if applicable)

**Definition:** The person owning architecture, technical decisions, and code quality.

**Responsibilities:**
- Owns the architecture
- Approves technical decisions in the decision log
- Code review authority
- Reports to Project Lead
- Required attendee at triage backlog review meetings per `17_triage-guidance.md` §3.4

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours; out-of-office dates]
- **Backup:** [Name]

### Operations Lead

**Definition:** The person who will receive the project at BAU handover. Brought in during the project to ensure operational readiness, not as a delivery contributor.

**Responsibilities:**
- Acknowledges warranty scope at closure (per `13_project-closure.md`)
- Validates BAU handover criteria (per `15_warranty-and-bau-handover.md` §5)
- Becomes **triage manager** at BAU handover (per `17_triage-guidance.md` §3.3)
- Required attendee at triage backlog meetings from Phase C onward
- Receives credentials, runbooks, and monitoring at BAU

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours; out-of-office dates]
- **Backup:** [Name]

### Core team

Named individuals doing the daily work. Each has a defined scope.

| Name | Email | Role | Scope | Hours / week | Backup |
|---|---|---|---|---|---|
| [Name] | [email] | [role] | [what they own] | [estimate] | [Name] |
| [Name] | [email] | [role] | [what they own] | [estimate] | [Name] |

### Extended stakeholders

People who are NOT on the core team but have an interest in the project. They don't get assigned work; they get informed.

| Name | Email | Role | Interest level | Update format | Cadence |
|---|---|---|---|---|---|
| [Name] | [email] | [role] | High / Med / Low | Email digest / Status report / Adhoc | Monthly / Milestone-based |

---

## Escalation path

The pattern: contributor → lead → sponsor. Each step has a clear trigger.

```
Core team member identifies issue
  ↓
Resolves within own scope → No escalation needed
  ↓ (cannot resolve)
Escalates to Project Lead
  ↓
Lead resolves within own authority → Logged in RAIDD as Issue
  ↓ (out of authority)
Escalates to Sponsor
  ↓
Sponsor decides → Logged in RAIDD as Decision (D-NNN)
```

### When to escalate to Project Lead

- An open Issue with severity ≥ `high`.
- A Risk newly identified with severity ≥ `high` or likelihood ≥ `high`.
- A Dependency that's slipping.
- A blocking action with no clear owner.
- A scope question that isn't covered by existing decisions.

### When to escalate to Sponsor

- Any escalation that Project Lead can't resolve within their authority.
- Scope changes that affect budget, timeline, or success criteria beyond the tolerances in `03_decision-log.md`.
- `critical` Risks (could cause project failure).
- A Decision with implications outside this project (affects portfolio).
- Sponsor signature required (contracts, partnerships, project closure, BAU handover).
- Disputed triage verdict per `17_triage-guidance.md` §7.

### Out-of-hours escalation

For incidents (security, data loss, sustained outage):

- Hours 0–4 after detection: Core team → Project Lead.
- Hours 4–24: Project Lead → Sponsor.
- Beyond 24 hours: full crisis protocol (see `04_incident-response.md`).

---

## Role assignment rules

These rules prevent role drift over a project's life.

1. **Every role has ONE named individual.** Joint ownership = no ownership.
2. **Every role has a named backup.** Single-person dependencies are themselves a Risk that should be logged.
3. **Roles can change but must be re-documented within 24 hours.** A role swap mid-project requires updating this doc and announcing to attendees of the next meeting.
4. **A person can hold multiple roles** (common for small studios — Sponsor and Project Lead can be the same person, for example) but each role must still be explicitly listed.
5. **Backups are not "in case of holiday" only.** They are valid substitutes during meetings the primary can't attend. The backup decides as if they were the primary.

---

## RACI matrix

The full RACI matrix for this project lives in `16_raci-matrix.md` — a standalone template that maps each role above to specific workstreams and deliverables (Responsible / Accountable / Consulted / Informed).

The role definitions in this document provide the column headings for that matrix. Any role named here can appear as a column in the RACI matrix; any RACI cell must reference a role defined here.

If the RACI matrix is missing or stale, the role definitions in this document are still authoritative — but the team will have to interpret RACI on a case-by-case basis. Maintaining `16_raci-matrix.md` saves that interpretation cost.

---

## When to update this document

- A new person joins the project → add them within 24 hours.
- A person leaves the project → mark their row "as of [date], no longer on project" and reassign their scope within 24 hours.
- A role changes hands → update the role's primary + backup within 24 hours, announce at the next meeting.
- The backup chain shifts (e.g. someone goes on extended leave) → update.
- Stakeholder interest level changes → update (e.g. Sponsor goes from "Informed monthly" to "Consulted weekly" because the project is in trouble).
- At BAU handover → confirm triage manager role transfer per `17_triage-guidance.md` §3.3.
- After every quarterly portfolio review.

Every update to this document should be matched by an update to `16_raci-matrix.md` if RACI assignments are affected.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE from Phase A onward (per `01_apply-order.md`).
- Foundational — populated at project initiation alongside `14_project-initiation.md`.
- Maintained throughout project, warranty, and BAU.

**Default cadence:**
- **Created** once at project initiation.
- **Amended** within 24 hours of any team change (joiner, leaver, role swap, backup change).
- **Reviewed** quarterly to confirm contact details, availability, and backup chains are current.

**Why this default:**
- Roles are static-by-default. A stale roles doc is worse than no roles doc because it creates false confidence about who owns what.
- The 24-hour amendment rule catches the failure mode of "we updated everyone in Slack but never updated the doc."

**When to amend the cadence:**
- **Tighten** (continuous review) if: team is unstable / staff turnover high / contractors rotating frequently.
- **Loosen** (annual review) if: team is stable AND project is long-running (>6 months) with no team changes.
- **Skip entirely** if: solo founder project with no team. Even then, document Sponsor / Project Lead / Ops Lead as the same single person — it's useful for explaining accountability to external stakeholders.

---

## Minimum viable for solo founders

Solo founders fill in the same template, but most roles compress to one name:

- Sponsor = Solo founder
- Project Lead = Solo founder
- Technical Lead = Solo founder (or "external — contracted for specific advisory")
- Operations Lead = Solo founder (or future hire)
- Core team = Solo founder (+ any contractors with named scope)
- Extended stakeholders = often present (investor, advisor, accountability partner)
- Escalation path = "If I'm stuck, I escalate to [advisor / mentor / board]"
- Backup = critical even for solo founders. If you're hit by a bus, who has the credentials and the context?

The solo founder version is essentially a "personal kill switch" document — what someone else needs to know to pick up your project if you're suddenly unavailable.

---

## Linked documents

- `09_meeting-protocol.md` — meeting outputs reference roles defined here.
- `07_raidd-log.md` — RAIDD entry owners drawn from this doc.
- `04_incident-response.md` — on-call rota and emergency contacts.
- `11_stakeholder-comms-plan.md` — stakeholder communication mapping.
- `10b_portfolio-roles.md` — portfolio-level governance (cross-project roles).
- `14_project-initiation.md` — PID signed off by Sponsor + Project Lead + Ops Lead (this doc provides the named individuals).
- `13_project-closure.md` — closure signed off by Sponsor + Project Lead + Ops Lead.
- `15_warranty-and-bau-handover.md` — triage manager transfer rule at BAU.
- `16_raci-matrix.md` — RACI matrix using the roles defined here.
- `17_triage-guidance.md` — triage manager role and escalation path for disputes.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |
| 2026-05-19 | 1.1 | Removed "RACI matrix (optional)" section; replaced with reference to standalone `16_raci-matrix.md`. Added Operations Lead role definition. Added cross-references to new templates 13, 14, 15, 16, 17. Added Lifecycle cadence section per D-039. | Claude (Cowork) |

---

**End of project roles template.**
