# [Project Name] — Lessons Learned

**Version:** 1.0
**Date started:** [YYYY-MM-DD]
**Owner:** [Name]
**Live tracker:** [URL of the deployed tracker for this project, if any]

---

## What a lesson is — and isn't

A **lesson** is a durable pattern that survives the project ending. Something you'd tell yourself if you were starting the project fresh, or something you'd want every team member on every future project to know.

A lesson is **not** a moment-in-time RAIDD entry. The difference:

| RAIDD | Lesson |
|---|---|
| "On 14 May the password-reset email went to the homepage" | "Always configure Supabase Auth Redirect URLs before the first user is invited" |
| "Vercel build failed today because typescript was in dependencies" | "Always put TypeScript types in devDependencies, not dependencies" |
| "The customer asked for a kanban view and we said no" | "Define and document scope refusal categories at v1.0, not at the first customer ask" |

If you find yourself capturing the same RAIDD-style observation repeatedly across projects, the underlying pattern is a Lesson.

---

## Entry format

For each lesson:

```
### L-NNN: [short, declarative title — written as the rule, not the story]

- **Date logged:** [YYYY-MM-DD]
- **Project:** [project_id, or 'portfolio-wide']
- **Owner:** [Name]
- **Severity if ignored:** [low / medium / high / critical]
- **Status:** [active / superseded]
- **What happened:** the specific incident or pattern that produced the lesson.
- **Root cause:** the underlying reason, beyond the surface symptom.
- **What to do differently:** the new rule or behaviour. Be specific.
- **Related RAIDD entry:** [entry_id, if applicable]
- **Standing docs changed:** [paths to docs/SOPs that were updated to encode this lesson]
```

Title the lesson as the rule, not the story. "L-001: Always configure Supabase Auth Redirect URLs before the first user is invited" — not "L-001: We had trouble with password reset emails".

---

## Lessons

### L-001: [example — replace]

- **Date logged:** [YYYY-MM-DD]
- **Project:** portfolio-wide
- **Owner:** [Name]
- **Severity if ignored:** high
- **Status:** active
- **What happened:** [The specific incident.]
- **Root cause:** [The underlying reason.]
- **What to do differently:** [The new rule. Specific. Testable.]
- **Related RAIDD entry:** [I-NNN]
- **Standing docs changed:** [list of doc paths updated]

---

### L-002: [next lesson]

(use the same format)

---

## Quick reference — active lessons

| ID | Title | Severity | Project | Logged |
|---|---|---|---|---|
| L-001 | [title] | high | portfolio-wide | [YYYY-MM-DD] |
| L-002 | [title] | medium | [project] | [YYYY-MM-DD] |

(superseded lessons can be hidden from this table — they remain in the body above)

---

## Propagation rules

A lesson is only useful if it's encoded somewhere a future project will encounter it.

For each new lesson logged:

1. **Decide where it should live as a standing rule** — typically one of:
   - This project's `01_apply-order.md` pre-flight checks.
   - This project's `06_project-checklist.md` line items.
   - The portfolio-wide `ai-solutions-cloud-first-practices` skill (for cross-project lessons).
   - A specific SOP or runbook.
2. **Update that document** to include the new rule.
3. **Record the update** in this lesson's `Standing docs changed` field.
4. **Mark the lesson status** as `propagated` (in the tracker) once the document update is committed.

A lesson without a `standing_docs_changed` entry is half-done.

---

## Quarterly review

Once per quarter:

- [ ] Skim every `active` lesson.
- [ ] Confirm it's still relevant.
- [ ] Confirm the `standing_docs_changed` references still exist (links rot).
- [ ] If a lesson has been overtaken by tooling or process changes, mark it `superseded` with a pointer to the replacement.

---

## Hard rules

1. **A lesson is written as a rule, not a story.** If it's a story, it belongs in `04_incident-response.md` as part of a post-mortem.
2. **A lesson must change at least one standing document.** Otherwise it's not propagated.
3. **Lessons survive projects ending.** Even when a project is archived, its lessons stay in the portfolio-wide lessons database.
4. **Lessons are not deleted.** They get superseded.

---

## Sync with the tracker

After every batch of edits here:

1. Confirm each lesson also exists in the tracker's `lessons_entries` table with the same `lesson_id`.
2. Confirm `standing_docs_changed` is populated.
3. Confirm `status='active'` rows are the ones still in force.

---

## Change log

| Date | Change | By |
|------|--------|-----|
| [YYYY-MM-DD] | Document started | [Name] |

---

**End of lessons-learned template.**
