# [Project Name] — Decision Log

**Version:** 1.0
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
- **Context:** what was the situation that required a decision?
- **Options considered:** 2–4 alternatives with one-line description each.
- **Chosen option:** which one, and why this rather than the others.
- **Consequences:** what follows from this choice — both intended and side-effects.
- **Related entries:** [other decisions, RAIDD entries, lessons this links to]
```

Decisions don't get deleted. If a decision is reversed, add a new decision that supersedes the old one and update the old one's status to `superseded` with a `superseded_by` reference.

---

## Decisions

### D-001: [example title — replace]

- **Date:** [YYYY-MM-DD]
- **Owner:** [Name]
- **Status:** active
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

| ID | Title | Date | Status | Owner |
|---|---|---|---|---|
| D-001 | [title] | [YYYY-MM-DD] | active | [Name] |
| D-002 | [title] | [YYYY-MM-DD] | active | [Name] |

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

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document started | [Name] |

---

**End of decision log template.**
