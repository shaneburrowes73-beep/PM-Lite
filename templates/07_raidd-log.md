# [Project Name] — RAIDD Log

**Version:** 1.0
**Date started:** [YYYY-MM-DD]
**Owner:** [Name]
**Live tracker:** [URL of the deployed tracker for this project]

---

## What RAIDD is

RAIDD = **R**isks, **A**ssumptions, **I**ssues, **D**ependencies, **D**ecisions. One log per project. Every meaningful uncertainty, choice, or open problem is captured here at the moment it surfaces.

This document is the **human-readable** version, useful for offline reading or printing for a stakeholder meeting. The **canonical** record is in the tracker's `raidd_entries` table — every entry below should also exist there, with the same `entry_id` and `project_id`.

---

## Entry types

| Type | When to use | Example |
|---|---|---|
| **Risk** | Something that might go wrong | "Buyer might fork the code to avoid hosting fees" |
| **Assumption** | A belief the project depends on | "Tenant has their own domain" |
| **Issue** | Something that has gone wrong (or is currently wrong) | "Password reset link goes to homepage" |
| **Dependency** | An external thing the project needs | "Supabase Pro required for PITR" |
| **Decision** | A choice made with rationale | "Use per-tenant Supabase project, not shared-DB-with-RLS" |

A "Lesson" is captured separately in `08_lessons-learned.md` — Lessons are durable patterns; RAIDD is moment-in-time.

---

## Entry format

For each entry:

```
### [TYPE]-NNN: [short title]

- **Project:** [project_id, e.g. 'pm-lite']
- **Type:** [risk / assumption / issue / decision / dependency]
- **Status:** [open / active / mitigated / resolved / closed / superseded]
- **Severity:** [low / medium / high / critical] — for risks and issues
- **Likelihood:** [low / medium / high / critical] — for risks
- **Owner:** [Name]
- **Opened:** [YYYY-MM-DD]
- **Description:** what this is, in one paragraph.
- **Rationale:** (decisions only) — why this rather than the alternatives.
- **Consequences:** (decisions only) — what follows from this.
- **Action / mitigation:** (risks, issues, dependencies) — what we're doing about it.
- **Resolution:** (if resolved/closed) — what fixed it.
- **Related entries:** [other entry IDs]
- **Source doc / URL:** [where this came from]
```

Use entry_id prefixes:

- `R-001`, `R-002` … for Risks
- `A-001`, `A-002` … for Assumptions
- `I-001`, `I-002` … for Issues
- `D-001`, `D-002` … for Decisions
- `Dep-001`, `Dep-002` … for Dependencies

Numbers are sequential per type within a project. The composite uniqueness in the live tracker is `(project_id, entry_id, type)` — so `R-001` can exist in both `pm-lite` and `service-agent`.

---

## Active entries

### R-001: [example — replace]

- **Project:** [project_id]
- **Type:** risk
- **Status:** mitigated
- **Severity:** medium
- **Likelihood:** low
- **Owner:** [Name]
- **Opened:** [YYYY-MM-DD]
- **Description:** [What is the risk?]
- **Action / mitigation:** [What we're doing.]
- **Related entries:** —
- **Source doc / URL:** —

### A-001: [next assumption]

(use the same format)

### I-001: [next issue]

(use the same format)

### D-001: [next decision]

- **Project:** [project_id]
- **Type:** decision
- **Status:** active
- **Owner:** [Name]
- **Opened:** [YYYY-MM-DD]
- **Description:** [What was decided?]
- **Rationale:** [Why this option, not the others?]
- **Consequences:** [What follows from this?]
- **Related entries:** —
- **Source doc / URL:** —

### Dep-001: [next dependency]

(use the same format)

---

## Quick reference — open entries

| ID | Type | Title | Severity | Status | Owner |
|---|---|---|---|---|---|
| R-001 | risk | [title] | medium | mitigated | [Name] |
| A-001 | assumption | [title] | — | open | [Name] |
| I-001 | issue | [title] | high | open | [Name] |
| D-001 | decision | [title] | — | active | [Name] |

(resolved / closed / superseded entries can be hidden from this table — they remain in the body above)

---

## Review cadence

- **Weekly:** owner skims the open entries; updates statuses; closes anything done.
- **Monthly:** open issues older than 30 days appear in `v_raidd_overdue` — these get a forced review.
- **Quarterly:** all active risks and decisions revisited; any no-longer-applicable ones marked `superseded`.

---

## Hard rules

1. **Every entry has an owner.** Blank owner = entry is not real.
2. **Every entry has a status.** No NULL status.
3. **Severity is mandatory on risks and issues.** Don't leave a critical issue with `severity=null`.
4. **Resolved entries don't get deleted.** They are kept as a record. Mark `resolved` with a `resolved_date`.
5. **A decision that's wrong gets superseded, not edited.** Add a new decision that supersedes the old one.

---

## Sync with the tracker

After every batch of edits here:

1. Confirm the entries also exist in the tracker (manual sync — or use the `/api/raidd/append` endpoint with a project-scoped token if you've set one up).
2. Confirm the tracker's `v_raidd_project_summary` view reflects the current state.
3. Update `PROJECT-CONFIG.md` "Last Updated" if anything significant changed.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document started | [Name] |

---

**End of RAIDD log template.**
