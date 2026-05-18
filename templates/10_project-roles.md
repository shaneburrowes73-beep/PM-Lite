# [Project Name] — Project Roles

**Version:** 1.0
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
- Final decision-maker for scope changes >£X / 10% of budget
- Receives monthly status reports
- Escalation point for critical risks

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

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours; out-of-office dates]
- **Backup:** [Name]

### Technical Lead (if applicable)

**Definition:** The person owning architecture, technical decisions, and code quality.

**Responsibilities:**
- Owns the architecture
- Approves technical decisions in the decision log
- Code review authority
- Reports to Project Lead

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
Resolves within own scope         →  No escalation needed
        ↓ (cannot resolve)
Escalates to Project Lead
        ↓
Lead resolves within own authority →  Logged in RAIDD as Issue
        ↓ (out of authority)
Escalates to Sponsor
        ↓
Sponsor decides                    →  Logged in RAIDD as Decision (D-NNN)
```

### When to escalate to Project Lead

- An open Issue with severity ≥ high.
- A Risk newly identified with severity ≥ high or likelihood ≥ high.
- A Dependency that's slipping.
- A blocking action with no clear owner.
- A scope question that isn't covered by existing decisions.

### When to escalate to Sponsor

- Any escalation that Project Lead can't resolve within their authority.
- Scope changes that affect budget, timeline, or success criteria.
- Critical Risks (could cause project failure).
- A Decision with implications outside this project (affects portfolio).
- Sponsor signature required (contracts, partnerships, etc.).

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

## RACI matrix (optional)

For projects with multiple workstreams, a RACI matrix clarifies who does what at the workstream level.

| Workstream | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
|---|---|---|---|---|
| [Workstream] | [Name] | [Name] | [Name(s)] | [Name(s)] |
| [Workstream] | [Name] | [Name] | [Name(s)] | [Name(s)] |

**Definitions:**

- **R (Responsible):** does the work.
- **A (Accountable):** owns the outcome. Only ONE person per workstream.
- **C (Consulted):** input sought before decisions.
- **I (Informed):** kept in the loop after decisions.

RACI is a powerful tool when used minimally (1 line per workstream). It becomes a bureaucratic nightmare if extended to every task.

---

## When to update this document

- A new person joins the project → add them within 24 hours.
- A person leaves the project → mark their row "as of [date], no longer on project" and reassign their scope within 24 hours.
- A role changes hands → update the role's primary + backup within 24 hours, announce at the next meeting.
- The backup chain shifts (e.g. someone goes on extended leave) → update.
- Stakeholder interest level changes → update (e.g. Sponsor goes from "Informed monthly" to "Consulted weekly" because the project is in trouble).
- After every quarterly portfolio review.

---

## Minimum viable for solo founders

Solo founders fill in the same template, but most roles compress to one name:

- Sponsor = Solo founder
- Project Lead = Solo founder
- Technical Lead = Solo founder (or "external — contracted for specific advisory")
- Core team = Solo founder (+ any contractors with named scope)
- Extended stakeholders = often present (investor, advisor, accountability partner)
- Escalation path = "If I'm stuck, I escalate to [advisor / mentor / board]"
- Backup = critical even for solo founders. If you're hit by a bus, who has the credentials and the context?

The solo founder version is essentially a "personal kill switch" document — what someone else needs to know to pick up your project if you're suddenly unavailable.

---

## Linked documents

- `templates/09_meeting-protocol.md` — meeting outputs reference roles defined here.
- `templates/07_raidd-log.md` — RAIDD entry owners drawn from this doc.
- `templates/04_incident-response.md` — on-call rota and emergency contacts.
- `templates/11_stakeholder-comms-plan.md` — stakeholder communication mapping.
- `templates/10b_portfolio-roles.md` — portfolio-level governance (cross-project roles).

---

## Change log

| Date | Change | By |
|---|---|---|
| [YYYY-MM-DD] | Document created. | [Name] |
| [YYYY-MM-DD] | [What changed]. | [Name] |

---

**End of project roles template.**
