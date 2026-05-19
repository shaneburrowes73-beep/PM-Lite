# [Project Name] — Decision Log

**Version:** 1.3
**Date started:** [YYYY-MM-DD]
**Owner:** [Name]

---

## Why this exists

A decision logged at the moment it's made includes rationale, alternatives, and the assumptions of that moment. A decision reconstructed 3 months later is incomplete and often wrong. This log is the 30-second-cost version of the half-day-cost reconstruction.

For projects on PM Lite or any AI Solutions tracker deployment, decisions are also captured as `raidd_entries` rows with `type='decision'`. This document is the human-readable narrative; the tracker is the queryable record.

---

## Decision entry format

For each decision, fill in:

```
### D-NNN: [short title]

- **Date:** [YYYY-MM-DD]
- **Owner:** [who decided]
- **Status:** active / superseded / withdrawn
- **Scope impact:** none / minor / major ← see "Scope decisions" section below
- **Context:** what was the situation that required a decision?
- **Options considered:** 2–4 alternatives with one-line description each.
- **Chosen option:** which one, and why this rather than the others.
- **Consequences:** what follows from this choice — both intended and side-effects.
- **Related entries:** [other decisions, RAIDD entries, lessons this links to]
```

Decisions don't get deleted. If a decision is reversed, add a new decision that supersedes the old one and update the old one's status to `superseded` with a `superseded_by` reference.

---

## Scope decisions

A specific class of decisions deserves extra care: those that change the project's agreed scope, budget, or timeline.

### What counts as a scope decision

A decision is a **scope decision** if it answers YES to any of:

- Does it add/remove a feature from the agreed scope?
- Does it move a milestone date by more than `2 weeks OR 10% of total duration (whichever is smaller)`?
- Does it increase or decrease budget by more than `10%`?
- Does it change the success criteria as defined in `14_project-initiation.md`?
- Does it change the agreed contract terms with a client or sponsor?

If yes to any — this is a scope decision and the extended format below applies.

### Why these defaults

PM Lite ships with PRINCE2 industry-standard defaults:
- **Budget tolerance: ±10%** — PRINCE2 cites typical cost tolerances of ±5% to ±10%. PM Lite ships at the more permissive end (10%) because PM Lite is targeted at non-PM buyers running smaller projects where tighter tolerances would generate unnecessary escalations.
- **Schedule tolerance: ±2 weeks OR ±10% of total duration, whichever is smaller** — PRINCE2 cites typical time tolerances of ±2 weeks. The "whichever is smaller" clause prevents the trap where a 4-week project has a 10% tolerance of only 2-3 days while a 12-month project has an unreasonable 1.2-month tolerance.

PMBOK's Integrated Change Control reminds us that scope, schedule, and budget interact: a small scope change can trigger a budget breach, so the scope-decision tests above check them independently.

### When to amend these defaults

**Tighten** if:
- Project is fixed-price or fixed-deadline (client/sponsor contractually bound)
- Project budget is under £20,000 / US$25,000 — even 10% slippage is material
- Team is new and inexperienced (tighter tolerances surface issues earlier)
- Regulated environment (finance, healthcare, public sector) where variance carries compliance risk

**Loosen** if:
- Long discovery / R&D phase where variance is expected
- Internal exploratory projects with no fixed budget
- Mature team with strong track record on similar projects

**Set an absolute currency amount** in addition to the percentage:
- The defaults above are percentages. For projects with fixed budgets, also set an absolute currency amount (e.g. "any decision affecting more than US$5,000 requires sponsor approval regardless of percentage"). Document the absolute value in `14_project-initiation.md` §5 "Absolute currency threshold."
- Useful where the percentage default could approve uncomfortably large amounts on a large project, or where the percentage default rejects acceptably small amounts on a small project.

Amendments are themselves scope decisions — log them in this document with the rationale.

### Extended format for scope decisions

In addition to the standard fields above, scope decisions require:

```
- **Scope impact:** major
- **Originally agreed:** [what was in scope per 14_project-initiation.md or contract]
- **New scope:** [what is in scope after this decision]
- **Budget impact:** [£X increase / decrease, or "none"]
- **Timeline impact:** [N days slip / acceleration, or "none"]
- **Sponsor approval:** [date received, link to email/sign-off]
- **Stakeholder notification:** [date sent, distribution list per stakeholder comms plan]
- **Update propagated to:**
  - [ ] 14_project-initiation.md success criteria updated
  - [ ] Status report next month reflects new scope
  - [ ] Contract / SoW amended (if applicable)
  - [ ] 16_raci-matrix.md updated if roles changed
```

### Scope decision approval requirements

Per `10_project-roles.md` and the thresholds above, scope decisions require Sponsor approval if:

- Budget impact > the tolerance defined above
- Timeline impact > the tolerance defined above
- Change affects success criteria in `14_project-initiation.md` §8

Smaller scope changes (within thresholds) can be approved by Project Lead but must still be logged with `Scope impact: minor`.

### Anti-patterns

- ❌ Quietly absorbing scope creep without logging it. (3 months later: "how did we end up doing all this?")
- ❌ Logging scope decisions only after they're done. (Sponsor reads the report and disagrees retrospectively.)
- ❌ Treating informal "let's just add X" as not requiring a decision entry.
- ❌ Cumulative minor changes that add up to a major change without being recognised. (Track running budget/timeline impact across all minor scope changes.)
- ❌ Setting tolerances that no one ever uses. If every change is "within tolerance", the tolerance is too loose.

---

## Decisions

### D-001: [example title — replace]

- **Date:** [YYYY-MM-DD]
- **Owner:** [Name]
- **Status:** active
- **Scope impact:** none
- **Context:** [Why was this decision required? What forced the choice?]
- **Options considered:**
  - Option A: [one line]
  - Option B: [one line]
  - Option C: [one line]
- **Chosen option:** [Which one. Why this one.]
- **Consequences:** [What changed as a result. What new risks or dependencies this introduces.]
- **Related entries:** [D-NNN, I-NNN, L-NNN]

---

### D-002: [next decision]

(use the same format)

---

### D-040 (example — real decision from PM Lite kit's own build): Bypass strict v1.0 → v1.1 phase-gating; combine into single v1.1.0 release

- **Date:** 2026-05-19
- **Owner:** Shane Burrowes (PM Lite kit owner)
- **Status:** active
- **Scope impact:** minor (process exception, not scope change to the kit itself)
- **Context:** PM Lite v1.0 templates were drafted and approved but not yet committed to GitHub. The actions log template (planned for v1.1) was identified as urgently needed for portfolio operations. Strict governance would say: commit v1.0 to GitHub first, tag v1.0.0, then start v1.1 work as a separate release.
- **Options considered:**
  - Option A: Ship v1.0.0 today, then v1.1.0 as a follow-up release with the actions log.
  - Option B: Hold the v1.0.0 commit, add the actions log template to scope, ship combined as v1.1.0.
  - Option C: Stop v1.0 entirely, restart from a clean baseline including actions.
- **Chosen option:** Option B — combined v1.1.0 release.
- **Consequences:**
  - The kit ships as v1.1.0, not v1.0.0. CHANGELOG.md and README.md reference v1.1.0.
  - Single PR contains all 20 templates rather than 19 + 1 follow-up.
  - End-to-end review of the combined kit is possible before any external publication.
  - Audit trail risk is negligible because the kit has no in-flight projects using it yet (single user, all internal).
- **Rationale for bypassing strict governance:**
  - The v1.0 outputs are documents only — no code or schema change is gated by the commit.
  - Only the owner is currently using the templates.
  - End-to-end review of the final structure has higher value than strict phase-gating in this context.
  - Per `VERSION_CONTROL.md` §2, the SemVer rules still apply: 19 → 20 templates is a non-breaking addition, so the version bump from 0 → 1.1.0 is legitimate.
- **Related entries:** D-033 (parked actions-table PRD — this decision implicitly unparks the PRD and supersedes the parked status); D-034 through D-039 (the six v1.0 design decisions).

*This entry is included as a worked example of a scope-decision-style entry in a real PM Lite kit-development context. Buyers can delete this row before using the template for their own project.*

---

## Quick reference — open decisions

| ID | Title | Date | Status | Scope impact | Owner |
|---|---|---|---|---|---|
| D-001 | [title] | [YYYY-MM-DD] | active | none | [Name] |
| D-002 | [title] | [YYYY-MM-DD] | active | minor | [Name] |
| D-040 | Bypass strict v1.0→v1.1 phase-gating; combine into v1.1.0 (example) | 2026-05-19 | active | minor | Shane Burrowes |

(superseded decisions can be hidden from this table, but they remain in the body above)

---

## When NOT to log a decision

Not every choice needs a log entry. Use these tests:

- **Does it affect anyone besides the decider?** If no, skip the log.
- **Is it reversible in under 10 minutes?** If yes, skip the log.
- **Will I have to explain it to someone 3 months from now?** If yes, log it.

Logging trivial decisions buries important ones.

---

## Audit

Quarterly: skim every `active` decision. Confirm it's still active and the consequences are still valid. If anything has changed, add a follow-up decision or mark the old one `superseded`.

Specifically for scope decisions: review cumulative scope impact across the project. If the sum of minor scope changes is now material, consider whether to formally re-baseline (a new `14_project-initiation.md` version) rather than continue accumulating.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE from Phase A onward (per `01_apply-order.md`).
- Append-only log throughout project, warranty, and any BAU period where the project team still owns governance.
- At BAU handover, ownership transfers to ops team's own change control (per `15_warranty-and-bau-handover.md` §7).

**Default cadence:**
- **Appended** as decisions arise. No fixed frequency — driven by events, not schedule.
- **Reviewed** quarterly to confirm `active` decisions are still active and consequences still hold.
- **Re-baselined** if cumulative minor scope changes have materially shifted the project (see §"Audit").

**Why this default:**
- Decisions don't expire on a schedule but they do become less relevant over time. Quarterly review is enough to catch staleness without becoming overhead.
- Append-only preserves the audit trail. Edits would let history be rewritten.

**When to amend the cadence:**
- **Tighten** (monthly review) if: project is high-velocity (many decisions per month) OR contractually requires regular re-baselining.
- **Loosen** (annual review) if: project is in a slow phase (e.g., long warranty period with few decisions).
- **Skip review entirely** if: project is in BAU and decisions have transferred to ops team's change control — at that point this log is historical record, not active.

---

## Linked documents

- `07_raidd-log.md` — tracker entries for decisions.
- `09_meeting-protocol.md` — meetings as a source of decisions.
- `10_project-roles.md` — who has authority to make which decisions.
- `11_stakeholder-comms-plan.md` — who gets notified of scope changes.
- `12_status-report.md` — scope changes reflected in monthly reports.
- `14_project-initiation.md` — the success criteria and scope baseline scope decisions are measured against.
- `15_warranty-and-bau-handover.md` — change-control transfer point.
- `16_raci-matrix.md` — defines who has Accountable role for scope decisions.
- `17_triage-guidance.md` — receives "Scope decision" category items from triage.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document started. | [Name] |
| 2026-05-15 | 1.1 | Added Scope Decisions section per PM Lite template gap analysis. | Claude (Cowork) |
| 2026-05-19 | 1.2 | Replaced placeholder tolerances with PRINCE2 defaults (10% budget, 2 weeks OR 10% duration). Added "Why these defaults" and "When to amend" sections. Added Lifecycle cadence section per D-039. Updated linked documents to reference new templates 14, 15, 16, 17. | Claude (Cowork) |
| 2026-05-19 | 1.3 | Added D-040 as worked example of a process-exception decision (kit-development context). | Claude (Cowork) |

---

**End of decision log template.**
