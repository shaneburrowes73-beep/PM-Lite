# [Project Name] — Actions Log

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Date:** [YYYY-MM-DD]
**Project ID:** [slug, e.g. `pm-lite`]
**Authors:** [Names]

---

## Why this document exists

An **action** is a discrete piece of work with a named owner, a target date, and a clear "done" state.

Actions arise from many sources — meetings, decisions, risks needing mitigation, triage routing, status reviews, incident response, scope changes. Without a single log, actions live in the place they were created (meeting minutes, RAIDD entries, Slack threads, someone's notebook) and get lost.

Three failure modes triage-without-actions produces:

1. **Orphan actions.** "Someone needs to follow up on X." Three weeks later nobody did, because nobody owned it.
2. **Untraceable progress.** "Did we ever fix that thing?" — searching back through minutes is expensive and unreliable.
3. **No accountability rhythm.** Actions without due dates drift indefinitely. Actions without a review cadence aren't actions; they're aspirations.

This template defines the actions log: what an action IS, where actions live, how they link to other governance artefacts, and how the team works through them.

For non-PM readers: this is the document that turns "we should do X" into a tracked, owned, dated commitment.

---

## 1. What an action is — and isn't

An **action** in PM Lite is:

- A **discrete unit of work** — not a goal, not a status, not a sentiment.
- **Owned by exactly one named individual** — not "the team", not "engineering".
- **Has a target date** — even if approximate. "When possible" is not a date.
- **Has a clear done state** — someone can look at it and say yes/no, complete or not.
- **Has a source** — what meeting, decision, risk, incident, or triage record produced it.

An action is NOT:

| Not an action | Is instead a... |
|---|---|
| "We should think about X" | Note / parking lot item |
| "Engineering will look at it" | Not an action — no individual owner |
| "Eventually we want to migrate to Y" | Goal / strategic objective |
| "The system is slow" | Issue (RAIDD `type='issue'`) |
| "We might run out of budget" | Risk (RAIDD `type='risk'`) |
| "The vendor must deliver Z by 1 May" | Dependency (RAIDD `type='dependency'`) |
| "I decided to use Postgres over MySQL" | Decision (RAIDD `type='decision'`) |
| "Always remember to rotate keys quarterly" | Lesson (`08_lessons-learned.md`) |

The distinction matters because each of the artefacts above has its own log, format, and review cadence. Misclassifying an action as an issue (or vice versa) means it gets the wrong process.

---

## 2. Three design models — pick one at project initiation

PM Lite v1.1 ships with three explicit models for how actions relate to other governance artefacts. **You pick one model at project initiation and stick with it for the project's life.** Switching mid-project breaks the audit trail.

This is intentional flexibility. Different buyer profiles need different models:

- A solo founder running one project doesn't want a 200-row actions log with formal sources.
- A studio running 10 projects with shared resources needs first-class actions to query "everything owned by Maria across all projects."
- A regulated environment needs every action traceable back to the decision or risk that produced it.

The three models below are mutually exclusive choices. **No model is universally "best."** §3 below offers guidance on which fits which context.

### Model A — Actions as attributes of RAIDD entries

In this model, **most actions live inside RAIDD entries** as the `action_or_mitigation` field. The actions log itself only captures **standalone actions** — work that doesn't attach to an existing Risk, Issue, Decision, or Dependency.

**Example:**
- Risk R-005 "Vendor may slip delivery date" has `action_or_mitigation = "Confirm vendor commitment by 2026-06-15 with written sign-off (owner: Sarah)"`. That's where the action lives. No separate row in the actions log.
- Standalone action: "Set up monthly cost review meeting" has no underlying RAIDD entry — it's a standing operational task. This gets its own row in the actions log.

**Pros:**
- Lightest overhead. Most actions don't need a separate row.
- Preserves the 2026-05-15 PM Lite proposal §2 stance.
- Lower risk of orphan actions floating disconnected from their context.

**Cons:**
- Actions are not first-class objects. Filtering "all actions owned by Maria across all projects" requires parsing free-text fields.
- A single RAIDD entry with many sub-actions squashes them into one text field — readable but not queryable.
- Status tracking on actions-inside-fields is hard (you can't easily say "this Risk's mitigation is 60% done").

### Model B — Actions as peer to RAIDD

In this model, **every action gets its own row in the actions log.** Some actions link to a RAIDD entry (the source); others are standalone. The actions log and the RAIDD log are peers — neither is subordinate.

**Example:**
- Risk R-005 "Vendor may slip delivery date" → produces action A-014 "Confirm vendor commitment by 2026-06-15" (owner: Sarah, due 2026-06-15, source: R-005).
- Action A-015 "Set up monthly cost review meeting" — no source RAIDD entry, no link. Standalone.
- Both A-014 and A-015 appear in the actions log with full fields (owner, date, status, source link if applicable).

**Pros:**
- Actions are first-class objects. Queryable, filterable, dashboard-able.
- Cross-project queries are clean: "show me everything Maria owns, across all projects."
- Status of individual actions is explicit, not buried in mitigation text.

**Cons:**
- Higher overhead. Every action requires a row.
- Risk of duplication — the RAIDD entry's `action_or_mitigation` field and the actions log row can drift if not kept in sync.
- Easier to log trivial actions ("send the email") that bloat the log.

### Model C — Actions as fully first-class (RAIDD `action_or_mitigation` becomes denormalised summary)

In this model, **every action gets a row in the actions log,** even if it's also referenced from a RAIDD entry. The RAIDD entry's `action_or_mitigation` field becomes a **denormalised summary** pointing to the canonical action row.

**Example:**
- Action A-014 is the canonical record: "Confirm vendor commitment by 2026-06-15" (owner: Sarah, due 2026-06-15, source: R-005, status: in_progress).
- Risk R-005's `action_or_mitigation` field reads: "See action A-014 — last updated 2026-05-19, status: in_progress."
- The two are kept in sync by treating the actions log as the source of truth.

**Pros:**
- Strongest auditability. Every action has exactly one canonical record.
- Easiest reporting — actions dashboard never has to read RAIDD entries.
- Lessons-learned `standing_docs_changed` references resolve cleanly because actions never move.

**Cons:**
- Highest overhead. Requires discipline to keep RAIDD entries' `action_or_mitigation` field updated as actions progress.
- Most overhead for trivial actions — even one-step actions need a row.
- Risk of sync drift if the team doesn't have tooling support.

---

## 3. Which model fits which buyer profile

Guidance — not rules.

| Buyer profile | Recommended model | Why |
|---|---|---|
| Solo founder, 1 project, <3 months | **Model A** | Overhead matters; most actions naturally attach to a Risk/Issue |
| Small team (2-5 people), 1-3 projects, action volume <10/week | **Model A** or **Model B** | Either works; pick A if discipline is the constraint, B if reporting is the constraint |
| Studio (5-15 people), 3-10 concurrent projects | **Model B** | Cross-project queries become valuable; first-class actions enable them |
| Agency or consultancy with paying clients tracking commitments | **Model B** | Clients want to see "the action you owed me" as a discrete trackable item |
| Regulated environment (finance, healthcare, public sector) | **Model C** | Auditors want a single source-of-truth for every committed action |
| High-velocity project (>20 actions/week) | **Model C** | Sync overhead is justified by reporting clarity at this scale |
| Project using the AI Solutions tracker or a similar database-backed system | **Model B** or **Model C** | The tracker's `actions` table becomes the natural home — Model B if you want lightweight, Model C if auditability matters |

**Hybrid approach is NOT supported.** Picking "Model A for most things but Model B for important actions" creates two parallel systems and inevitable drift. If you find yourself wanting that, you actually want Model B.

**Mid-project model changes** are scope decisions per `03_decision-log.md` and should be rare. The typical reason: project grew beyond expectations and Model A no longer scales.

---

## 4. Action entry — fields (shared across all three models)

Every action, in any model, has the same fields. The difference between models is WHERE these fields live, not what they are.

### Required fields

| Field | Purpose | Example |
|---|---|---|
| **action_id** | Unique identifier within the project | `A-001` |
| **title** | Short, declarative summary | "Confirm vendor commitment by 2026-06-15" |
| **description** | One-paragraph clarification (optional but recommended) | "Vendor Sarah is point of contact; we need written confirmation of delivery date in the contract amendment." |
| **owner** | Single named individual from `10_project-roles.md` | "Sarah" |
| **due_date** | Target completion date (YYYY-MM-DD) | `2026-06-15` |
| **status** | One of: `open`, `in_progress`, `blocked`, `resolved`, `cancelled` | `in_progress` |
| **created_date** | When the action was logged | `2026-05-19` |
| **source** | What produced this action — RAIDD entry, meeting, decision, triage, standalone | `R-005` or `Meeting 2026-05-19` or `standalone` |
| **priority** | One of: `low`, `medium`, `high`, `critical` (matches PM Lite canonical severity) | `medium` |

### Optional fields

| Field | Purpose |
|---|---|
| **resolved_date** | When the action was marked complete |
| **resolution_notes** | What was done (1-2 sentences) — useful for audit and for closure reporting |
| **blocked_by** | If status = `blocked`, what's blocking. Often a Dependency or another Action. |
| **escalation_history** | Free text — what's been done to chase the action |
| **linked_artefacts** | Links to commits, PRs, documents, etc. produced by the action |
| **stakeholders_informed** | Who else needs to know when this completes (per `11_stakeholder-comms-plan.md`) |

### Status vocabulary — canonical (5 values)

These five values are the canonical action statuses. **Do not invent additional values.** If you need finer granularity, use `description` and `escalation_history`.

| Status | Meaning |
|---|---|
| `open` | Logged but no work started yet |
| `in_progress` | Active work happening |
| `blocked` | Cannot proceed; `blocked_by` field populated |
| `resolved` | Done; `resolved_date` and `resolution_notes` populated |
| `cancelled` | Will not be done; reason recorded in `resolution_notes` |

**Resolved is not the same as cancelled.** A resolved action achieved its outcome. A cancelled action was withdrawn (no longer needed, superseded by a different action, scope decision, etc.). Reporting and lessons-learned should distinguish them.

**Note on legacy projects:** if a project currently uses status values like `pending`, `done`, `wontfix`, `wip`, etc., map them as follows on migration:

| Legacy | Canonical |
|---|---|
| `pending` | `open` |
| `wip`, `doing`, `started` | `in_progress` |
| `done`, `complete`, `closed` | `resolved` |
| `wontfix`, `dropped`, `superseded` | `cancelled` |

---

## 5. Action lifecycle

Regardless of model, every action moves through this lifecycle:

```
created (status=open)
    ↓
work starts (status=in_progress)
    ↓ (if blocker)
    blocked (status=blocked, blocked_by populated)
    ↓ (blocker cleared)
    work resumes (status=in_progress)
    ↓
done OR cancelled (status=resolved or cancelled, resolution_notes populated)
```

Once resolved or cancelled, the action is **closed**. Closed actions stay in the log forever (they're the audit trail). They can be hidden from default views but not deleted.

**Anti-pattern: re-opening closed actions.** If an action was resolved but the outcome failed, log a NEW action that references the old one. Don't edit the old action's status back to `open` — that breaks the audit trail.

---

## 6. Action sources — who creates actions

Actions can originate from any of the following:

| Source | When | Format reference |
|---|---|---|
| **Meeting** | A discussion produces a follow-up. | `09_meeting-protocol.md` §"Phase 3 — Post-meeting" |
| **Decision** | A scope decision in `03_decision-log.md` requires implementation work. | The decision's `Consequences` field references the action. |
| **Risk mitigation** | A Risk in `07_raidd-log.md` requires action to mitigate. | The Risk's `action_or_mitigation` field. |
| **Issue resolution** | An Issue in `07_raidd-log.md` requires action to resolve. | The Issue's `action_or_mitigation` field. |
| **Triage routing** | An item in `17_triage-guidance.md` is categorised and requires action. | The triage record's `routed_to` field. |
| **Incident response** | An incident in `04_incident-response.md` produces follow-up actions. | The incident timeline's `Prevention measures` section. |
| **Lesson propagation** | A lesson in `08_lessons-learned.md` requires updating a standing document. | The lesson's `standing_docs_changed` field. |
| **Standalone** | Routine operational work not triggered by any of the above. | No source link; `source = "standalone"` |

Each source has its own log; the actions log is a unifying view across all of them.

---

## 7. Review cadence — actions

The action log's review cadence aligns with the triage backlog meeting cadence in `17_triage-guidance.md` §3.5. Specifically:

- **Per-item triage on creation.** Every action created gets categorised at the moment it's logged: priority assigned, owner confirmed, due date sanity-checked.
- **Weekly review** (Phase C onward, warranty): the triage backlog review meeting walks the actions log. Focus on: anything `blocked`, anything past due, anything `open` >30 days with no work.
- **Monthly review**: project lead skims the full log for overdue items and forces close-out (resolve / re-scope / cancel).
- **Quarterly review** (at minimum): close out anything still `open` after 90 days with no progress. Either re-energise or cancel.

A 30-day-old `open` action is a smell. A 90-day-old `open` action is dead — close it.

---

## 8. Anti-patterns

What NOT to do, with the failure mode each enables:

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **"TBD" owner** | An action without an owner isn't an action. | Always assign at creation, even if provisional. The provisional owner can hand off later. |
| **"When possible" due date** | Without a date, the action can't be tracked for overdue. | Use a date even if approximate. "End of June 2026" → `2026-06-30`. |
| **Re-opening closed actions** | Breaks the audit trail. | Log a new action that references the old one. |
| **Single action with 6 sub-tasks in description** | Sub-tasks are unowned and untracked. | Break into separate actions, each with its own owner and date. |
| **Cancelled actions without resolution notes** | Future readers can't tell why the action was dropped. | Always populate `resolution_notes` on cancellation. |
| **Picking different models for different parts of the project** | Creates two parallel systems and inevitable drift. | Pick one model at initiation and stick with it. |
| **Logging trivial actions ("send the email")** | Buries important actions in operational noise. | Apply the same "would I have to explain this to someone 3 months from now?" test as `03_decision-log.md`. |
| **Action escalation invisible** | Owner is silently failing for weeks; nobody knows. | The triage backlog meeting surfaces stuck actions; the owner OR project lead is responsible for raising. |

---

## 9. Test plan — extract and populate from real data

This template's first real test is: take the project's current action backlog (wherever it lives now — meeting minutes, Slack threads, email follow-ups, RAIDD `action_or_mitigation` fields) and populate this log with it.

The test surfaces three categories of finding:

### 9.1 Coverage gaps

Actions in your head, in old emails, in Slack threads, that have NO record in any current governance artefact. These are the highest-risk findings — actions you're carrying without trackability.

**Treatment:** add them as standalone actions with `source = "discovery — [date]"`. Log a lesson if the gap reveals a process weakness.

### 9.2 Field gaps

Actions that don't fit the template fields above because reality has something the template missed. Examples:

- The action has multiple owners (need to split, or define a "primary owner" and "secondary owners")
- The action has a hard deadline AND a soft target date (need both)
- The action's "done" state depends on a separate approval

**Treatment:** for each field gap, decide:
- **Add an optional field** to the template (if it's likely to recur across projects)
- **Use existing fields differently** (if it's a one-off)
- **Note as a known limitation** of v1.1 to address in v1.2

### 9.3 Vocabulary gaps

Status values, priority values, or source types you use that the template doesn't list.

**Treatment:** check the canonical mapping table in §4. If a legacy value maps cleanly, use the canonical. If it doesn't map (e.g., "deferred" → not the same as cancelled or blocked), it's a finding — either the template needs a new status value (rare) or your usage was non-standard (more common).

### 9.4 Relationship gaps

Actions linked to entities the template doesn't reference. E.g., an action that's tied to a JIRA ticket, an external vendor's project ID, a third-party API contract.

**Treatment:** use the `linked_artefacts` field for external links. If a SPECIFIC external system is used heavily, consider whether v1.2 should add a typed link.

### 9.5 Reporting on findings

After the extract, produce a brief findings summary:

```
| Finding category | Count | Examples | Action |
|---|---|---|---|
| Coverage gaps | N | "Vendor follow-up", "Hire backup ops lead" | Logged as standalone actions |
| Field gaps | N | "Multiple owners on X" | Note for v1.2 |
| Vocabulary gaps | N | "Status 'deferred'" | Mapped to `cancelled` with note |
| Relationship gaps | N | "JIRA ticket links" | Use linked_artefacts |
```

If you find more than ~20% of actions need template amendments, the template was wrong for your project profile. Re-read §3 and consider whether a different model fits better.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE from Phase A onward (per `01_apply-order.md`).
- Most heavily used during Phases B-D and warranty.
- Continues into BAU under operations team ownership per `15_warranty-and-bau-handover.md` §7.

**Default cadence:**
- **Created** at project initiation.
- **Appended** as actions arise — driven by sources in §6.
- **Reviewed** at every triage backlog meeting (cadence per `17_triage-guidance.md` §3.5).
- **Monthly forced close-out** of any action >30 days `open` with no progress.
- **Quarterly archive** — closed actions older than 1 quarter can be hidden from default views (but never deleted).

**Why these defaults:**
- Triage cadence drives action review because actions are the output of triage.
- 30-day open-no-progress threshold catches the "we logged it and forgot" failure mode.
- Quarterly archive prevents the log becoming visually overwhelming while preserving the audit trail.

**When to amend the cadence:**
- **Tighten** (daily review) if: high-volume project (>20 new actions/week) OR many overdue actions.
- **Loosen** (monthly review only) if: low-volume project (<5 actions/week) AND most actions resolve in <14 days.
- **Skip entirely** is not an option — even solo projects benefit from a discrete actions log.

---

## Linked documents

- `03_decision-log.md` — decisions produce actions (see §6)
- `04_incident-response.md` — incidents produce actions (see §6)
- `07_raidd-log.md` — Risks, Issues, Dependencies produce actions; action linkage depends on model chosen (see §2)
- `08_lessons-learned.md` — lessons produce actions for `standing_docs_changed` (see §6)
- `09_meeting-protocol.md` — meetings produce actions (see §6)
- `10_project-roles.md` — action owners drawn from this doc
- `11_stakeholder-comms-plan.md` — `stakeholders_informed` field references this
- `12_status-report.md` — status reports reference open and overdue action counts
- `13_project-closure.md` — closure assesses outstanding actions
- `14_project-initiation.md` — model choice (A/B/C) recorded as an initiation decision
- `15_warranty-and-bau-handover.md` — actions transferred to ops at BAU
- `16_raci-matrix.md` — defines Accountable role for action assignment
- `17_triage-guidance.md` — triage routing produces actions

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created — PM Lite v1.1 actions log template. Presents three design models (A: attribute of RAIDD; B: peer to RAIDD; C: fully first-class). Buyer picks at initiation. | [Name] |

---

**End of actions log template.**
