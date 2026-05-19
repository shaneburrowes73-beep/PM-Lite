# [Project Name] — Change Control

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Project Lead]

---

## Why this document exists

Once a project is initiated (PID signed off at G1), the project's scope, schedule, budget, and quality criteria are AGREED. Any change to those agreements is a **change** — not just a task, not just a tweak. Changes that bypass the change control process are the primary cause of scope creep and budget overruns.

This template defines:
1. What counts as a change (and what doesn't).
2. The change request process from "someone proposes a change" to "decision made and implemented."
3. The Change Control Board (CCB) — who decides what.
4. The impact assessment across Time, Cost, Quality, Resources, Scope (TCQRS — the modern iron triangle expanded).
5. The change register — every change recorded for audit.

Two flavours of "change management" exist and are commonly confused:

- **Change control** (this document, §1-9) — process for changing project agreements (scope, schedule, budget).
- **Organisational change management** (this document, §10) — helping people adopt the deliverable in their work. Different discipline; covered briefly here, referenced in detail elsewhere.

For non-PM readers: a "change request" is a formal way of saying "we want to do something differently than the PID says." This document is how those requests get reviewed.

---

## 1. What counts as a change

A **change** is any modification to one or more of the project's agreements:

| Agreement | Source | Examples of changes |
|---|---|---|
| **Scope** | `14_project-initiation.md` §4 | Add feature; remove feature; defer a deliverable. |
| **Schedule** | `14_project-initiation.md` §6 | Move a milestone; extend a phase; accelerate delivery. |
| **Budget** | `24_budget-management.md` | Increase budget; reallocate between categories; draw on reserves. |
| **Quality** | `26_quality-management.md` | Change acceptance criteria; adjust quality thresholds. |
| **Resources** | `10_project-roles.md`, `16_raci-matrix.md` | Add or remove team members; change role assignments. |
| **Stakeholder agreement** | `11_stakeholder-comms-plan.md` | Change stakeholder tier; revise comms cadence. |

### 1.1 What is NOT a change

Some things look like changes but aren't:
- **Within-tolerance variance** — actual cost ±10% of baseline (per `03_decision-log.md` Approval thresholds) is normal noise, not a change.
- **Day-to-day prioritisation within agreed scope** — choosing which task to do first this week is execution, not a change.
- **Bug fixes within agreed quality criteria** — fixing a defect found in testing is execution, not a change.
- **Updates to internal documents** — clarifying language in a runbook doesn't need change control.

**Rule of thumb:** if it crosses the tolerances defined in `03_decision-log.md`, it's a change.

---

## 2. Change request process

```
[Someone proposes change]
       ↓
[CR raised in §6 register]
       ↓
[Impact assessment §3-5]
       ↓
[CCB review per §7]
       ↓
[Decision: Approve / Reject / Defer]
       ↓
[If approved: Implement + Update affected docs §8]
       ↓
[CR marked Closed in §6 register]
```

Steps in detail:

1. **Propose** — anyone can raise a change. Format: brief description + reason. Submitter records as a row in §6.
2. **Triage** — Project Lead reviews within 2 working days. Either accepts for impact assessment OR closes as "out of scope of change control" (e.g. within-tolerance) with rationale.
3. **Impact assessment** — Project Lead (or delegate) completes §3, §4, §5 below for the CR.
4. **CCB review** — per §7 below. Decision recorded in `03_decision-log.md` as a scope decision (extended format).
5. **Implementation** — if approved, the change is implemented. PID and other affected documents are updated per §8.
6. **Closure** — CR marked Closed in §6. Communications sent per `11_stakeholder-comms-plan.md`.

---

## 3. Impact assessment — TCQRS

The five dimensions of impact every change must be assessed against. The framework was historically TCQ (Time-Cost-Quality, the "iron triangle"). Modern practice adds R (Resources) and S (Scope) — both of which can be the dependent variable that absorbs the change.

For each CR, complete:

### 3.1 Time impact
- **Schedule delay (or acceleration):** [+/- N days]
- **Affected milestones:** [list]
- **Critical path impact:** [yes/no — if yes, which path]

### 3.2 Cost impact
- **Budget delta:** [+/- £X]
- **Affected categories:** [labour / vendor / licences / etc.]
- **Cash flow timing:** [when the spend lands]
- **Contingency / reserve draw:** [yes/no — which]

### 3.3 Quality impact
- **Acceptance criteria changes:** [list]
- **Definition of Done changes:** [list]
- **New quality risks introduced:** [list — reference `07_raidd-log.md`]

### 3.4 Resource impact
- **Effort change:** [+/- person-days]
- **New skills needed:** [list]
- **Team member additions / changes:** [list]
- **External resource (vendor / contractor) changes:** [list]

### 3.5 Scope impact
- **Items added to scope:** [list]
- **Items removed from scope:** [list]
- **In-scope/out-of-scope boundary changes:** [text]

---

## 4. Risk impact assessment

In addition to TCQRS, assess risk impact:

- **New risks introduced by this change:** [list — add to `07_raidd-log.md`]
- **Existing risks closed by this change:** [list]
- **Existing risks changed in severity/likelihood:** [list]

---

## 5. Stakeholder impact assessment

- **Stakeholders affected:** [list — cross-reference `11_stakeholder-comms-plan.md`]
- **Stakeholders whose approval is needed (in addition to CCB):** [list]
- **Communications required (if approved):** [list]

---

## 6. Change register

Every CR recorded here. Never delete a row — change status instead.

| CR # | Date raised | Title | Type | Submitter | Status | Decision | Decision date | Implementation date | Notes |
|---|---|---|---|---|---|---|---|---|---|
| CR-001 | [YYYY-MM-DD] | [Short title] | Scope / Schedule / Budget / Quality / Resource | [Name] | Proposed / Under review / Approved / Rejected / Deferred / Implemented / Closed | [Approve / Reject / Defer] | [YYYY-MM-DD] | [YYYY-MM-DD] | [Link to RAIDD if any] |
| CR-002 | ... | ... | ... | ... | ... | ... | ... | ... | ... |

### 6.1 CR status definitions

| Status | Meaning |
|---|---|
| **Proposed** | Submitted, not yet triaged. |
| **Under review** | Triaged, impact assessment in progress. |
| **Approved** | CCB approved. Implementation pending. |
| **Rejected** | CCB rejected. Rationale in `03_decision-log.md`. |
| **Deferred** | Decision deferred to a future gate/review. |
| **Implemented** | Approved change implemented. Affected docs updated. |
| **Closed** | Implementation verified; CR archived. |

---

## 7. Change Control Board (CCB)

The CCB is the body that approves or rejects changes. It's not always a formal "board" — for small projects, it's just the Sponsor.

### 7.1 CCB membership by project size

| Project size | CCB membership |
|---|---|
| Small (1-2 weeks, 1-3 people) | Sponsor only. CCB review = single email/Slack approval. |
| Medium (1-3 months, 3-10 people) | Sponsor + Project Lead. Optionally Operations Lead if change affects deliverables in BAU. |
| Large (3+ months, 10+ people) | Sponsor + Project Lead + Operations Lead + (sometimes) key stakeholder representative. |
| Programme | Programme Manager + relevant Project Sponsors + Portfolio Owner (for cross-project impacts). |

### 7.2 CCB authority by change type

Different change types may have different approval authorities. Define at G1 in `14_project-initiation.md`:

| Change type | Approval authority |
|---|---|
| Within-tolerance variance | Project Lead (logs as decision in `03_decision-log.md`, no CR needed) |
| Scope change <10% baseline impact | Project Lead + Sponsor (single sign-off) |
| Scope change >10% baseline impact | Full CCB |
| Schedule change <2 weeks | Project Lead (notify Sponsor) |
| Schedule change >2 weeks | Full CCB |
| Budget change within contingency | Project Lead (notify Sponsor) |
| Budget change requiring management reserve | Sponsor only |
| Budget change beyond reserves | Full CCB + escalation to Portfolio Owner |
| Quality criteria change | Sponsor + Operations Lead (if BAU-affecting) |
| Resource change | Sponsor (if cost-affecting) or Project Lead (if internal reallocation) |

### 7.3 CCB review cadence

- **Standing CCB meetings:** monthly (or as agreed). Open CRs reviewed and decided.
- **Out-of-cycle CCB:** for urgent changes that can't wait. Email/Slack approval acceptable for clear-cut cases.
- **Emergency CCB:** for changes needed within 24 hours. Sponsor decides; full CCB notified afterwards.

---

## 8. Implementation — updating affected documents

When a CR is approved, the change must propagate. Use this checklist:

- [ ] `14_project-initiation.md` — update scope, success criteria, baseline as applicable.
- [ ] `03_decision-log.md` — log scope decision with extended format. Reference CR number.
- [ ] `06_project-checklist.md` — add/remove tasks per the change.
- [ ] `24_budget-management.md` — update baseline and forecast if budget affected.
- [ ] `07_raidd-log.md` — add new risks/assumptions; update existing.
- [ ] `11_stakeholder-comms-plan.md` — notify stakeholders per the comms plan.
- [ ] `12_status-report.md` — next report reflects new baseline / scope.
- [ ] `16_raci-matrix.md` — update if roles changed.
- [ ] `26_quality-management.md` — update acceptance criteria if quality affected.
- [ ] `27_benefits-management.md` — re-assess benefits realisation if scope affected.

Tick each line when updated. Submit the completed checklist with the closed CR.

---

## 9. Anti-patterns (change control)

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **Silent changes** | Scope creep with no audit trail. | Every change → CR. Even small ones. |
| **CCB bypass for "urgent"** | "Urgent" becomes the default justification for skipping process. | Emergency CCB exists for genuine emergencies. If it's used more than rarely, fix the root cause. |
| **Impact assessment skipped** | CR approved without understanding consequences. | All five TCQRS dimensions assessed before CCB review. |
| **Approved but not implemented** | CR sits in "Approved" state forever. Documents drift. | Implementation has a deadline. Status moves to "Implemented" with date. |
| **Implementation without doc updates** | Project does the new thing but PID still says the old thing. | §8 checklist mandatory. |
| **Cumulative small changes never re-baseline** | 12 individually-approved 2% changes = 24% drift, but no one's noticed because each one was small. | Periodic baseline review (quarterly or at gates) catches cumulative drift. |
| **Vague rejection rationale** | "Not approved" with no explanation. Submitter (and future readers) can't learn. | Every rejection has documented rationale in `03_decision-log.md`. |

---

## 10. Organisational change management (different discipline — brief overview)

**This is the OTHER kind of change management** — helping people adopt what the project delivers.

A project can deliver a perfect product technically and still fail because:
- Users don't know it exists
- Users don't know how to use it
- Users resist adopting it
- The organisation's processes don't accommodate it

This is **organisational change management** (sometimes "OCM" or "change adoption"). It's a different discipline from change CONTROL. PM Lite v1.2 includes only a brief reference here; deep OCM is a Phase 2 candidate.

### 10.1 The basics

Three things drive successful organisational change:

1. **Awareness** — people know the change is coming and why.
2. **Capability** — people have the skills and tools to do it.
3. **Reinforcement** — people are supported and incentivised to keep doing it.

PM Lite templates that support OCM:
- `11_stakeholder-comms-plan.md` — awareness building.
- `15_warranty-and-bau-handover.md` — capability transfer to ops team.
- `08_lessons-learned.md` — reinforcement learning.

### 10.2 When to invest more in OCM

- **Internal-facing projects** (new tool/process for existing users) — OCM is often more important than the technical work. Plan to spend 20-30% of effort on it.
- **External-facing projects** (new product for new users) — OCM concepts apply but in marketing/onboarding form rather than internal training.
- **Compliance or regulatory changes** — OCM is mandatory; users must adopt the new approach by a deadline.

### 10.3 OCM activities checklist (light version)

For projects with meaningful OCM scope, add to the project plan:

- [ ] Affected users identified (per `11_stakeholder-comms-plan.md` Tier 3-4)
- [ ] Communications plan tailored for adoption (awareness messages, training notices, go-live)
- [ ] Training materials and sessions scheduled
- [ ] Champions / early adopters identified
- [ ] Support resources (helpdesk, FAQ, runbooks) ready before go-live
- [ ] Adoption metrics defined and tracked post-deployment (active users, support tickets, satisfaction)
- [ ] Reinforcement plan for 30/60/90 days post-deployment

For substantive OCM work, consider engaging an OCM specialist. PM Lite is not designed to replace formal OCM frameworks (PROSCI, Kotter's 8 steps, etc.).

---

## 11. Links and references

- `14_project-initiation.md` — establishes the baselines that changes are measured against.
- `03_decision-log.md` — all CR decisions logged here (with extended scope-decision format).
- `07_raidd-log.md` — risks introduced by changes recorded here.
- `11_stakeholder-comms-plan.md` — change communications routed here.
- `12_status-report.md` — change summary in monthly report.
- `14_project-initiation.md` §5 — defines CCB authority by change type (project-specific).
- `20_stage-gates.md` — gate sign-offs verify change control discipline.
- `24_budget-management.md` — budget impact assessment.
- `26_quality-management.md` — quality impact assessment.
- `27_benefits-management.md` — benefits impact if scope changed.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- Created at Initiation (Phase A).
- Active from G1 onward.
- Heavy use during Build/Test/Deploy (most CRs arise here).
- Reduced use during Warranty (small CRs only — major changes usually need a new project).
- Closed at G5.

**Default cadence:**
- Triage within 2 working days of CR submission.
- CCB review monthly (standing) or as needed.
- Implementation deadline set per CR.

**Why this default:**
- Triage SLA prevents CRs piling up. Even rejection is faster than no decision.
- Monthly CCB matches project status reporting cadence.

**When to amend:**
- **Tighten** (weekly CCB): high CR volume projects, contentious projects, fixed-deadline projects.
- **Loosen** (quarterly CCB): low-change-velocity projects, small projects with sole-sponsor authority.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of change control template.**
