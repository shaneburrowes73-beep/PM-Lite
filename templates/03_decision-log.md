# [Project Name] — Decision Log

**Version:** 1.1
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
- **Scope impact:** none / minor / major   ← see "Scope decisions" section below
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
- Does it move a milestone date by more than [project's tolerance, e.g. 1 week]?
- Does it increase or decrease budget by more than [project's tolerance, e.g. 10%]?
- Does it change the success criteria as defined in PROJECT_MANIFEST.md?
- Does it change the agreed contract terms with a client or sponsor?

If yes to any — this is a scope decision and the extended format below applies.

### Extended format for scope decisions

In addition to the standard fields above, scope decisions require:

```
- **Scope impact:** major
- **Originally agreed:** [what was in scope per the original PROJECT_MANIFEST or contract]
- **New scope:** [what is in scope after this decision]
- **Budget impact:** [£X increase / decrease, or "none"]
- **Timeline impact:** [N days slip / acceleration, or "none"]
- **Sponsor approval:** [date received, link to email/sign-off]
- **Stakeholder notification:** [date sent, distribution list per stakeholder comms plan]
- **Update propagated to:**
  - [ ] PROJECT_MANIFEST.md success criteria updated
  - [ ] Status report next month reflects new scope
  - [ ] Contract / SoW amended (if applicable)
```

### Scope decision approval requirements

Per `templates/10_project-roles.md`, scope decisions require Sponsor approval if:

- Budget impact > [threshold]
- Timeline impact > [threshold]
- Change affects success criteria

Smaller scope changes (within thresholds) can be approved by Project Lead but must still be logged with `Scope impact: minor`.

### Anti-patterns

- ❌ Quietly absorbing scope creep without logging it. (3 months later: "how did we end up doing all this?")
- ❌ Logging scope decisions only after they're done. (Sponsor reads the report and disagrees retrospectively.)
- ❌ Treating informal "let's just add X" as not requiring a decision entry.
- ❌ Cumulative minor changes that add up to a major change without being recognised. (Track running budget/timeline impact across all minor scope changes.)

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

## Quick reference — open decisions

| ID | Title | Date | Status | Scope impact | Owner |
|---|---|---|---|---|---|
| D-001 | [title] | [YYYY-MM-DD] | active | none | [Name] |
| D-002 | [title] | [YYYY-MM-DD] | active | minor | [Name] |

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

Specifically for scope decisions: review cumulative scope impact across the project. If the sum of minor scope changes is now material, consider whether to formally re-baseline (a new PROJECT_MANIFEST version) rather than continue accumulating.

---

## Linked documents

- `templates/07_raidd-log.md` — tracker entries for decisions.
- `templates/09_meeting-protocol.md` — meetings as a source of decisions.
- `templates/10_project-roles.md` — who has authority to make which decisions.
- `templates/11_stakeholder-comms-plan.md` — who gets notified of scope changes.
- `templates/12_status-report.md` — scope changes reflected in monthly reports.

---

## Change log

| Date | Change | By |
|---|---|---|
| [YYYY-MM-DD] | Document started. | [Name] |
| 2026-05-15 | v1.1: added Scope Decisions section per PM Lite template gap analysis. | Claude (Cowork) |

---

**End of decision log template.**
