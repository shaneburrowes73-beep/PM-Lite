# [Project Name] — Project Initiation Document (PID)

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Status:** [DRAFT / SIGNED-OFF / SUPERSEDED]
**Project ID:** [slug, e.g. `pm-lite`]
**Authors:** [Names]

---

## Why this document exists

The Project Initiation Document (PID) captures the agreement at the start of the project. Everything downstream — scope decisions, status reports, the closure assessment, the warranty period — measures itself against what's written here.

If this document doesn't exist, three things break:
1. **Scope decisions have nothing to be scope decisions *against*.** "Did this change exceed scope?" requires a record of what scope was.
2. **Project closure can't declare "delivered".** Closure assesses delivery vs the success criteria defined here.
3. **Disagreements among sponsor / lead / team have no anchor.** When memory differs, the signed PID is the source of truth.

This template is produced ONCE at project start. Once signed by the sponsor, amendments require a Scope Decision per `03_decision-log.md`.

For non-PM readers: this is the document that says "we agreed to build X, costing Y, by Z." Treat it as a small contract.

---

## 1. Project overview

| Field | Value |
|---|---|
| **Project name** | [full name] |
| **Project ID** | [short slug — used in RAIDD entries, file naming, etc.] |
| **Sponsor** | [name + role + organisation] |
| **Project lead** | [name + role] |
| **Start date** | [YYYY-MM-DD] |
| **Target end date** | [YYYY-MM-DD — project work complete] |
| **Target BAU date** | [YYYY-MM-DD — warranty period ends, ops team takes over] |

### One-paragraph summary

[2-4 sentences. Plain English. What is this project, who is it for, and what does it produce? Avoid jargon. A non-PM reader should understand this paragraph.]

---

## 2. Business case

### Why this project exists

[1-2 paragraphs. What's the problem this project solves? What happens if we don't solve it?]

### Expected benefits

State each benefit with a measurable success criterion. Vague benefits ("better customer experience") are non-falsifiable and worth nothing at closure.

| Benefit | How we'll know we got it |
|---|---|
| [Benefit 1] | [Specific measurable indicator] |
| [Benefit 2] | [Specific measurable indicator] |
| [Benefit 3] | [Specific measurable indicator] |

### Cost of doing nothing

[What happens if we don't do this project? Quantify if possible. This is the "why now" question.]

---

## 3. Scope at initiation

### In scope

The agreed deliverables. Each item here must be specific enough that a closure assessment can say "yes, delivered" or "no, not delivered" without argument.

- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]
- [Add rows as needed]

### Out of scope

Things that are explicitly NOT part of this project. Listing these prevents scope creep arguments later.

- [Out-of-scope item 1] — *(why this is excluded)*
- [Out-of-scope item 2] — *(why this is excluded)*

### Assumptions made at initiation

Assumptions documented here are protected from "we forgot we assumed that" gotchas later.

- [Assumption 1] — *(what makes us comfortable with this assumption)*
- [Assumption 2] — *(what makes us comfortable with this assumption)*
- [Assumption 3] — *(what makes us comfortable with this assumption)*

If any assumption is broken during the project, raise an Issue in `07_raidd-log.md` and consider whether scope needs to change.

---

## 4. Approach

### Phases

This project follows the standard PM Lite phase model (see `01_apply-order.md`):

| Phase | Description | Target start | Target end |
|---|---|---|---|
| A. Setup | Project folder, repos, accounts, credentials | [date] | [date] |
| B. Core build | The deliverables in §3 In Scope | [date] | [date] |
| C. Testing | Unit, integration, UAT | [date] | [date] |
| D. Deploy | Production release | [date] | [date] |
| E. Handover | User docs, runbooks, project marked READY | [date] | [date] |
| Warranty | 30 days post-handover (see `15_warranty-and-bau-handover.md`) | [date] | [date] |
| BAU | Ops team owns; project team disengaged | [date] | — |

### Key milestones

| Milestone | Target date | Decision gate? |
|---|---|---|
| [Milestone 1] | [YYYY-MM-DD] | [Y/N — does this trigger a sponsor review?] |
| [Milestone 2] | [YYYY-MM-DD] | [Y/N] |

---

## 5. Budget at initiation

### Total budget

| Currency | Amount |
|---|---|
| Total | [currency] [amount] |

### Breakdown

| Category | Amount | Notes |
|---|---|---|
| Phase A — Setup | [amount] | |
| Phase B — Core build | [amount] | |
| Phase C — Testing | [amount] | |
| Phase D — Deploy | [amount] | |
| Phase E — Handover | [amount] | |
| Warranty period | [amount] | Estimate based on default 30 days |
| Contingency | [amount] | Typically 10-15% of total |

### Tolerance

This project uses the PM Lite default budget tolerance: **±10%** (see `03_decision-log.md` §"Why these defaults").

| | Threshold | Action |
|---|---|---|
| **Project lead can approve** | Up to ±10% variance | Logged in `03_decision-log.md` with `Scope impact: minor` |
| **Sponsor approval required** | Beyond ±10% variance | Scope Decision per `03_decision-log.md` with extended format |

### Absolute currency threshold (buyer-defined)

In addition to the percentage above, any decision affecting more than the absolute amount below requires sponsor approval regardless of percentage:

> **Absolute threshold: [currency] [amount]**

*Suggested values: For projects under [currency] 50,000 total budget, set absolute threshold at ~10% of total. For larger projects, set at the level where the sponsor genuinely wants to be involved.*

[Delete the suggestion line above once the value is set.]

---

## 6. Schedule at initiation

### Tolerance

This project uses the PM Lite default schedule tolerance: **±2 weeks OR ±10% of total duration, whichever is smaller** (see `03_decision-log.md` §"Why these defaults").

For this project:
- Total duration: [N] weeks
- 10% of duration: [N × 0.1] weeks
- Smaller of {2 weeks, [N × 0.1] weeks}: **[final tolerance] weeks**

### Schedule

| Phase | Target start | Target end | Internal float |
|---|---|---|---|
| Phase A | [date] | [date] | [days] |
| Phase B | [date] | [date] | [days] |
| Phase C | [date] | [date] | [days] |
| Phase D | [date] | [date] | [days] |
| Phase E | [date] | [date] | [days] |
| Warranty | [date] | [date] | — |

### Critical dependencies

External things this project schedule depends on. If any of these slip, the project schedule slips with them.

| Dependency | Owner (external) | Target date | Risk if slipped |
|---|---|---|---|
| [Dep 1] | [external party] | [date] | [impact] |
| [Dep 2] | [external party] | [date] | [impact] |

Also logged as `Dep-NNN` entries in `07_raidd-log.md`.

---

## 7. Roles and stakeholders

This section is the headline. Full role definitions live in `10_project-roles.md`; the RACI matrix lives in `16_raci-matrix.md`.

### Core roles

| Role | Named person | Contact |
|---|---|---|
| **Sponsor** (accountable for whole project) | [name] | [email] |
| **Project lead** (runs the project day-to-day) | [name] | [email] |
| **Operations lead** (receives BAU handover) | [name] | [email] |

### Extended team

See `10_project-roles.md` for the full list.

### Escalation path

Issues above the project lead's authority escalate to the sponsor. Issues above the sponsor's authority escalate to [next level — e.g., a steering committee, the board]. Full escalation rules: `10_project-roles.md`.

---

## 8. Success criteria

The criteria that define "delivered". The project closure report (`13_project-closure.md`) will assess each of these as Met / Partially met / Not met.

**These must be measurable.** "Improved user experience" is not measurable. "85% of users complete the onboarding flow without contacting support" is measurable.

| # | Criterion | How it will be measured | Measured by (who) |
|---|---|---|---|
| 1 | [Criterion 1] | [Specific measurement method] | [Role] |
| 2 | [Criterion 2] | [Specific measurement method] | [Role] |
| 3 | [Criterion 3] | [Specific measurement method] | [Role] |
| 4 | [Criterion 4 — optional] | [Specific measurement method] | [Role] |
| 5 | [Criterion 5 — optional] | [Specific measurement method] | [Role] |

**Recommended:** 3-5 criteria. Fewer than 3 risks under-specifying delivery; more than 5 risks dilution.

---

## 9. Sign-off

The PID is not active until signed by the sponsor.

| Role | Name | Signature / approval | Date |
|---|---|---|---|
| Sponsor | [name] | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| Project lead | [name] | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| Operations lead (acknowledging future BAU handover) | [name] | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |

Once signed, this document is locked. Amendments are made via Scope Decisions in `03_decision-log.md`, NOT by editing this document.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ONCE, at project initiation (before Phase A of `01_apply-order.md` begins).

**Default cadence:**
- Drafted before any project work starts.
- Signed off by sponsor before Phase A.
- Locked thereafter — amendments are tracked as Scope Decisions in `03_decision-log.md`, not as edits to this document.

**Why this default:**
- This is the foundational agreement. Editing it after sign-off would invalidate the audit trail of what was agreed at the start. Scope decisions provide the proper mechanism for change while preserving the original record.

**When to amend the cadence:**
- **Not applicable.** This is a one-time foundational document. The cadence does not change.
- If circumstances force a fundamental re-baseline (e.g., the project doubles in scope, or the team changes entirely), the correct action is to **supersede** this PID with a new one (PID v2.0), with a clear superseded-by reference. Do not edit v1.0.

---

## Linked documents

- `01_apply-order.md` — the phase sequence this project follows
- `02_credentials-manifest.md` — secrets inventory (populated during Phase A)
- `03_decision-log.md` — every decision after initiation, including any scope amendments to this PID
- `06_project-checklist.md` — line-by-line phase checklist
- `07_raidd-log.md` — risks, assumptions, issues, dependencies, decisions
- `10_project-roles.md` — full role definitions
- `11_stakeholder-comms-plan.md` — stakeholder communications
- `12_status-report.md` — reporting cadence to sponsor
- `13_project-closure.md` — assessed against the success criteria in §8
- `15_warranty-and-bau-handover.md` — the post-Phase-E lifecycle stage
- `16_raci-matrix.md` — who is Responsible / Accountable / Consulted / Informed for what

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | PID created | [Name] |

---

**End of Project Initiation Document template.**
