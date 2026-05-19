# [Project Name] — Project Closure Report

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Status:** [DRAFT / SIGNED-OFF / SUPERSEDED]
**Project ID:** [slug, e.g. `pm-lite`]
**Authors:** [Names]

---

## Why this document exists

The Project Closure Report is how the project formally declares "delivered" and hands responsibility to the warranty period that follows.

Without it, three things tend to happen:
1. **Projects drift into permanent low-grade activity.** No one ever says "this is done", so the team keeps tinkering and the budget keeps bleeding.
2. **Disagreements about what was delivered get re-litigated later.** Six months on, "did we agree feature X was in scope?" has no clean answer.
3. **The warranty period never starts.** Without a closure event, there's no clock starting on "the project team is responsible for fixes until [date]."

This template assesses what was actually delivered against what `14_project-initiation.md` agreed at the start. Every "Delivered as agreed / Modified / Not delivered" verdict has evidence attached. The sponsor signs the report. The warranty clock starts.

For non-PM readers: this is the document that says "the project work is done, here's what we got vs what we promised, and here's what happens next."

---

## 1. Closure overview

| Field | Value |
|---|---|
| **Project name** | [from PID §1] |
| **Project ID** | [from PID §1] |
| **Sponsor** | [from PID §1] |
| **Project lead** | [from PID §1] |
| **Operations lead (receiving BAU)** | [from PID §1] |
| **Original start date** | [from PID §1] |
| **Original target end date** | [from PID §1] |
| **Actual end date (today)** | [YYYY-MM-DD] |
| **Warranty period start** | [today] |
| **Warranty period end** | [today + warranty duration — default 30 days, see `15_warranty-and-bau-handover.md`] |

---

## 2. Status of agreed deliverables

For each deliverable listed in `14_project-initiation.md` §3 "Scope at initiation — In scope", record the closure verdict.

| Deliverable (from PID §3) | Verdict | Evidence / link | Notes |
|---|---|---|---|
| [Deliverable 1] | [Delivered as agreed / Modified / Not delivered] | [URL or doc ref] | [If Modified: link to `03_decision-log` entry that approved the change] |
| [Deliverable 2] | [Delivered as agreed / Modified / Not delivered] | [URL or doc ref] | |
| [Deliverable 3] | [Delivered as agreed / Modified / Not delivered] | [URL or doc ref] | |
| [Add rows from PID] | | | |

**Verdict definitions:**
- **Delivered as agreed:** what shipped matches what the PID said would ship.
- **Modified:** the deliverable shipped but with formally-approved changes (must link to the approving Scope Decision in `03_decision-log.md`).
- **Not delivered:** the deliverable did not ship. Explain why in the Notes column.

If any deliverable is "Not delivered" without an approving scope decision, the project is closing on terms different from those agreed at initiation. The sponsor sign-off in §8 captures whether that's acceptable.

---

## 3. Success criteria assessment

For each success criterion in `14_project-initiation.md` §8, record whether it was met.

| # | Criterion (from PID §8) | Verdict | Measurement | Measured by |
|---|---|---|---|---|
| 1 | [Criterion 1] | [Met / Partially met / Not met] | [Actual result vs target] | [Role] |
| 2 | [Criterion 2] | [Met / Partially met / Not met] | [Actual result vs target] | [Role] |
| 3 | [Criterion 3] | [Met / Partially met / Not met] | [Actual result vs target] | [Role] |
| [add rows from PID] | | | | |

**Verdict definitions:**
- **Met:** the measured result matches or exceeds the target in the PID.
- **Partially met:** progress toward the criterion, but the target was not fully achieved. Quantify in the Measurement column.
- **Not met:** the target was not achieved at all.

**Summary verdict:** Overall, the success criteria are: [All Met / Mostly Met / Partially Met / Not Met].

---

## 4. Final budget

| Item | Planned (from PID §5) | Actual | Variance | Within tolerance? |
|---|---|---|---|---|
| Phase A — Setup | [amount] | [amount] | [+/- amount, +/- %] | [Y / N] |
| Phase B — Core build | [amount] | [amount] | [+/- amount, +/- %] | [Y / N] |
| Phase C — Testing | [amount] | [amount] | [+/- amount, +/- %] | [Y / N] |
| Phase D — Deploy | [amount] | [amount] | [+/- amount, +/- %] | [Y / N] |
| Phase E — Handover | [amount] | [amount] | [+/- amount, +/- %] | [Y / N] |
| Contingency used | [amount] | [amount used] | [%] | — |
| **Total** | **[total planned]** | **[total actual]** | **[+/- amount, +/- %]** | **[Y / N]** |

**Tolerance per PID §5:** ±10% by default, OR the buyer-defined absolute amount, whichever is hit first.

**If outside tolerance:** link to the approving Scope Decision in `03_decision-log.md` here: [link]

If outside tolerance AND no approving decision exists, this is flagged for sponsor review at sign-off.

---

## 5. Final schedule

| Item | Planned (from PID §6) | Actual | Variance |
|---|---|---|---|
| Project start | [date] | [date] | [days] |
| Project end | [date] | [date] | [days] |
| **Total duration** | **[N weeks]** | **[M weeks]** | **[+/- days]** |

**Tolerance per PID §6:** [final tolerance from PID §6, e.g. "2 weeks"]

**Within tolerance?** [Y / N]

**If outside tolerance:** link to the approving Scope Decision in `03_decision-log.md` here: [link]

---

## 6. Open items transferred to warranty

Things that are NOT fully delivered today but are accepted as warranty items per `15_warranty-and-bau-handover.md`. These do NOT block closure — they ARE the start of the warranty period's scope.

| Item | Description | Severity | Owner during warranty | Target resolution |
|---|---|---|---|---|
| [Item 1] | [Brief description] | [low/med/high] | [Project lead OR named person] | [date OR "before BAU handover"] |
| [Item 2] | | | | |

**If this table is empty:** the project closes cleanly into a near-zero-touch warranty period.
**If this table is long (>5 items):** consider whether the project is genuinely "delivered" or whether closure is premature. Discuss with sponsor at sign-off.

---

## 7. Lessons captured

The top 3 lessons from this project. These are summary entries; full lesson records live in `08_lessons-learned.md`.

| # | Lesson | Why this matters for future projects | Link to full entry |
|---|---|---|---|
| 1 | [Lesson 1 — one sentence] | [Why other projects should know this] | `08_lessons-learned.md` entry L-NNN |
| 2 | [Lesson 2 — one sentence] | [Why other projects should know this] | `08_lessons-learned.md` entry L-NNN |
| 3 | [Lesson 3 — one sentence] | [Why other projects should know this] | `08_lessons-learned.md` entry L-NNN |

**Closure rule:** before sign-off, confirm that all lessons identified during the project are captured in `08_lessons-learned.md`. The 3 above are the headline lessons; the full record may have more.

---

## 8. Sign-off

The project is not closed until signed by both the sponsor (releasing) and project lead (handing over). The operations lead acknowledges receipt of the warranty-period scope.

| Role | Name | Verdict | Signature / approval | Date |
|---|---|---|---|---|
| **Sponsor** | [name] | [Closing as agreed / Closing with scope variance — see §2, §4, §5 / Not closing — escalation required] | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| **Project lead** | [name] | Project work complete; ready for warranty | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |
| **Operations lead** | [name] | Acknowledging warranty period scope and timeline | [signature OR "approved via email YYYY-MM-DD"] | [YYYY-MM-DD] |

**Once all three sign-offs are recorded:**
- Warranty period begins at the date of the latest sign-off.
- `15_warranty-and-bau-handover.md` becomes the active governance doc.
- `12_status-report.md` cadence to sponsor stops (final closure summary is the last report).
- `07_raidd-log.md` remains open for warranty-period RAIDD entries.
- This document is locked. Subsequent changes are captured in `03_decision-log.md`, not by editing this report.

**If sponsor refuses sign-off:** the project is not closed. The project lead must resolve sponsor concerns (typically via Scope Decision in `03_decision-log.md`) before closure can proceed.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ONCE, at the end of project work (after Phase E of `01_apply-order.md`).
- Triggers entry into the warranty period defined in `15_warranty-and-bau-handover.md`.

**Default cadence:**
- Drafted by the project lead in the final week of Phase E.
- Reviewed by sponsor before sign-off.
- Sign-off is a discrete event — typically a meeting (per `09_meeting-protocol.md`) where verdicts are confirmed and signatures captured.
- Locked thereafter — amendments would invalidate the audit trail of what was delivered.

**Why this default:**
- Closure is a transition, not a continuous activity. A discrete sign-off event creates a clean before/after boundary for the warranty period to start from.

**When to amend the cadence:**
- **Not applicable.** This is a one-time discrete event. The cadence does not change.
- If circumstances force a re-closure (e.g., critical defect discovered during warranty that materially changes the closure verdict), the correct action is to **supersede** this report with a v2.0 sign-off, NOT edit v1.0.

---

## Linked documents

- `14_project-initiation.md` — the PID this closure assesses against
- `01_apply-order.md` — the phase model that defines Phase E completion
- `03_decision-log.md` — any scope decisions that explain variance from PID
- `07_raidd-log.md` — open issues / risks at closure
- `08_lessons-learned.md` — full lessons captured (this report summarises top 3)
- `12_status-report.md` — the final status report references this closure verdict
- `15_warranty-and-bau-handover.md` — the next lifecycle stage; begins on sponsor sign-off
- `16_raci-matrix.md` — defines who signs what at closure

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Closure report drafted | [Name] |

---

**End of Project Closure Report template.**
