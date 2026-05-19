# [Project Name] — RACI Matrix

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Status:** [DRAFT / ACTIVE / SUPERSEDED]
**Project ID:** [slug]

---

## Why this document exists

A RACI matrix answers a question every project hits sooner or later: *"who is supposed to do what, and who has the last word?"*

When this is undocumented, three things happen:
1. **Two people do the same task** (because both thought they were responsible).
2. **No one does a task** (because both thought the other was responsible).
3. **A disagreement has no resolution path** (no one is clearly accountable).

This matrix prevents all three.

For non-PM readers: this is a one-page chart that maps tasks to people, using four roles defined below. Fill it in at project initiation; review when team changes.

---

## What RACI is

Each task in the project gets exactly four roles assigned:

| Letter | Role | Meaning | Plain-English example |
|---|---|---|---|
| **R** | **Responsible** | The person who **does** the work. | "Maria writes the code." |
| **A** | **Accountable** | The single person who **owns the outcome**. The buck stops here. | "Tom decides whether the code ships." |
| **C** | **Consulted** | People whose input is **gathered before** the work is done. Two-way communication. | "We talk to Priya in legal before publishing." |
| **I** | **Informed** | People who are **told after** the work is done. One-way communication. | "We tell the sales team once the feature is live." |

R does the work. A says yes/no. C is asked. I is told.

---

## Hard rules

These are non-negotiable for a RACI matrix to be useful:

1. **Every row must have exactly one A.** Not zero. Not two. Exactly one. Multiple A's = no accountability. Zero A's = no one owns it.
2. **Every row should have at least one R.** The work has to be done by someone. R can be the same person as A (the accountable person does the work themselves), but the role must be marked.
3. **Avoid "everyone is C".** If 8 people are Consulted on every decision, you've created a committee, not a project. Be specific about who genuinely needs to weigh in.
4. **Avoid "everyone is I".** If 12 people get an "FYI" on every task, the FYIs become noise and people stop reading them. Limit I to actual need-to-knows.
5. **A and R can be the same person, but it's a smell if they always are.** If the project lead is A+R on everything, the lead is overloaded and the team is under-utilised.

---

## The matrix

Fill in the cells with `R`, `A`, `C`, `I`, or leave blank if the role has no involvement in that task. A cell can have more than one letter (e.g., `A/R` means the same person is both Accountable and Responsible).

### Roles (columns)

Match these columns to the named people in `10_project-roles.md` and `10b_portfolio-roles.md`. Add or remove columns as the project requires.

### Tasks (rows)

The rows below are the standard PM Lite governance tasks. Add project-specific rows below the standard block.

| Workstream / Deliverable | Sponsor | Project Lead | Operations Lead | [Team Member 1] | [Team Member 2] | [Stakeholder 1] |
|---|---|---|---|---|---|---|
| **Initiation** | | | | | | |
| PID sign-off (per `14_project-initiation`) | A | R | C | I | I | I |
| Set approval thresholds in `03_decision-log` | A | R | C | I | I | I |
| RACI matrix sign-off (this document) | A | R | C | I | I | I |
| **Execution** | | | | | | |
| Scope decisions (per `03_decision-log`) | A | R | C | I | I | I |
| Weekly status reports to team (per `12_status-report`) | I | A/R | I | C | C | |
| Monthly status reports to sponsor (per `12_status-report`) | I | A/R | I | I | I | I |
| Incident response (per `04_incident-response`) | I | A | C | R | R | I |
| Backup verification (per `05_backup-restore`) | I | A | R | R | | |
| RAIDD log maintenance (per `07_raidd-log`) | I | A | I | R | R | |
| **Closure** | | | | | | |
| Project closure sign-off (per `13_project-closure`) | A | R | C | I | I | I |
| Warranty period management (per `15_warranty-and-bau-handover`) | I | A/R | C | R | | |
| BAU handover sign-off (per `15_warranty-and-bau-handover`) | A | R | A | I | I | I |
| **Project-specific (add rows below)** | | | | | | |
| [Workstream / Deliverable] | | | | | | |
| [Workstream / Deliverable] | | | | | | |

**Note on the BAU handover row:** The sponsor and operations lead are BOTH marked `A`. This is a deliberate exception to the "one A per row" rule because the handover is a transfer of accountability — the sponsor signs the project as released; the operations lead signs as receiving. Two A's here represents the handover itself.

---

## Anti-patterns

What NOT to do. Each of these has been observed in real projects and each causes specific harm.

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **Every cell is filled in** | Creates RACI sprawl. People stop reading. | Leave blank where the role genuinely has no involvement. |
| **Multiple A's on the same row** | No accountability — everyone can point at someone else. | Pick one A. If you can't, the task is not well-defined. |
| **Project lead is A and R for everything** | Single point of failure. Lead burns out. Team is under-used. | Delegate R to team members; lead stays A on most things but not all R. |
| **Sponsor is only ever I** | Sponsor loses oversight. By project closure, they're surprised by what was delivered. | Sponsor should be A on milestone-level items (sign-offs, scope changes). |
| **A and C are the same person** | Self-consultation is meaningless. | If you find yourself doing this, you don't need a C on that row. |
| **Marking "the team" as R** | "The team" is not a person. Specific accountability evaporates. | Always name an individual, even if multiple people contribute. |

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ONCE at project initiation (alongside `14_project-initiation.md`).
- Reviewed and amended whenever the team or stakeholder set changes.

**Default cadence:**
- **Created:** at project initiation, before Phase A of `01_apply-order` begins.
- **Reviewed:** quarterly OR at every milestone gate (whichever is more frequent for this project's length).
- **Amended:** whenever a named person leaves / joins / changes role.

**Why this default:**
- RACI is a static-by-default artefact: the roles in a project don't churn weekly. But every team change invalidates some rows, and stale RACI matrices are worse than no RACI because they create false confidence about who owns what.

**When to amend the cadence:**
- **Tighten** (monthly review) if: team is unstable / staff turnover high / contractors rotating frequently.
- **Loosen** (per-milestone review) if: team is stable AND project is long-running (>6 months).
- **Skip entirely** if: project is genuinely a solo project (single person doing all work AND making all decisions). Even then, the document is useful for explaining accountability to external stakeholders.

---

## Linked documents

- `10_project-roles.md` — full named-person role definitions (provides the columns of this matrix)
- `10b_portfolio-roles.md` — portfolio-level roles (provides additional columns for portfolio-level rows)
- `14_project-initiation.md` — Project Initiation Document; signed-off PID precedes this matrix
- `03_decision-log.md` — scope decisions; the A column for scope-change rows
- `04_incident-response.md` — incident handling; the A column for incident rows
- `13_project-closure.md` — project closure sign-off
- `15_warranty-and-bau-handover.md` — BAU handover sign-off

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | RACI matrix created | [Name] |

---

**End of RACI matrix template.**
