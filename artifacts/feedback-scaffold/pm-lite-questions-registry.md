# PM Lite — SMART Feedback Questions Registry

**Artefact:** PM Lite
**Feedback table:** `pm_lite_feedback`
**Scoring formula:** Compliance 40% + Usability 40% + Value Add 20%
**RAG bands:** GREEN ≥ 75 · AMBER 50–74 · RED < 50

---

## How this file is used

The PM Lite tracker application reads this registry at build time (or
serves it from a static asset) to render the `/feedback` form. The
answers chosen by the tester are converted to scores via the
`scoring_map` for each question, written into `pm_lite_feedback`
(columns `q1_score`..`q10_score`), and the section sub-scores and
composite are computed by the application before the row is inserted.

The questions are **not seeded into a live table**. Keeping them in this
file means changing wording is a code change (reviewed, versioned)
rather than an INSERT that someone runs against a production database.

---

## Compliance section (40% weight)

Goal: confirm PM Lite delivers what it promises and is safe to depend on.

### C1 — Coverage (`q1_score`)

- **Question:** Does PM Lite let you log every type of governance artefact you currently track (RAIDD, Lessons, Decisions, SOPs)?
- **Type:** Multiple choice
- **Options + scores:**
  - Yes → 100
  - Partially → 50
  - No → 0

### C2 — Data integrity (`q2_score`)

- **Question:** Within the last 7 days, did PM Lite store every RAIDD entry without data loss or duplication?
- **Type:** Multiple choice
- **Options + scores:**
  - Yes → 100
  - Mostly → 75
  - Some issues → 40
  - No → 0

### C3 — Security / isolation (`q3_score`)

- **Question:** Is the auth + RLS isolation strong enough that another tenant could not see your data?
- **Type:** Multiple choice
- **Options + scores:**
  - Verified → 100
  - Trusted but unverified → 60
  - Concern → 0

**Compliance sub-score:** `(q1_score + q2_score + q3_score) / 3` → `compliance_score`

---

## Usability section (40% weight)

Goal: confirm the tool is fast enough and clear enough that real users actually use it.

### U1 — Trainability (`q4_score`)

- **Question:** Could you train a non-technical team member to log a RAIDD entry without your help, in under 10 minutes?
- **Type:** Multiple choice
- **Options + scores:**
  - Yes → 100
  - With one walkthrough → 60
  - No → 0

### U2 — Missing features (`q5_score`)

- **Question:** In the last 7 days, how often did you wish PM Lite had a feature it doesn't have?
- **Type:** Multiple choice
- **Options + scores:**
  - Never → 100
  - 1–2 times → 60
  - 3+ times → 20

### U3 — Speed (`q6_score`)

- **Question:** Rate the speed of the most common workflow (opening tracker → adding RAIDD entry → saving) on a 1–5 scale.
- **Type:** scale_1_5
- **Options + scores:** 1 → 0 · 2 → 25 · 3 → 50 · 4 → 75 · 5 → 100

### U4 — Template fit (`q7_score`)

- **Question:** Do the templates match how your team actually works, or do you find yourself rewriting them every time?
- **Type:** Multiple choice
- **Options + scores:**
  - Match → 100
  - Light edits → 60
  - Major rewrites → 20

**Usability sub-score:** `(q4_score + q5_score + q6_score + q7_score) / 4` → `usability_score`

---

## Value Add section (20% weight)

Goal: confirm the tool returns more than it costs.

### V1 — Time saved (`q8_score`)

- **Question:** How much time per week did PM Lite save you vs. your previous setup?
- **Type:** Multiple choice
- **Options + scores:**
  - < 30 min → 25
  - 30–90 min → 50
  - 90 min – 3 hrs → 75
  - 3+ hrs → 100

### V2 — Cross-project lesson reuse (`q9_score`)

- **Question:** Has a lesson from one project demonstrably prevented a problem on another project since you adopted PM Lite?
- **Type:** Multiple choice
- **Options + scores:**
  - Yes — give example → 100
  - Maybe → 50
  - Not yet → 0

### V3 — Would re-buy (`q10_score`)

- **Question:** Would you pay the listed price again, knowing what you know now?
- **Type:** Multiple choice
- **Options + scores:**
  - Yes → 100
  - At a lower price → 50
  - No → 0

**Value Add sub-score:** `(q8_score + q9_score + q10_score) / 3` → `value_add_score`

---

## Composite score and RAG band

```
composite_score = (compliance_score * 0.40)
                + (usability_score  * 0.40)
                + (value_add_score  * 0.20)
```

| Composite | RAG band |
|---|---|
| ≥ 75 | GREEN |
| 50–74 | AMBER |
| < 50 | RED |

The dashboard widget reads `pm_lite_feedback_summary` (see
`supabase/004_feedback_scaffold.sql`) and renders the `rag_band` column.

---

## When to rev these questions

These 10 questions are v1.0 — locked at PM Lite v1.0 release. Change
only when:

1. A question consistently scores 100 across all testers → it has lost
   diagnostic value, replace with something stricter.
2. A question consistently scores 0 → either the product is failing
   that dimension (fix it) or the question is wrong (replace).
3. A new product capability ships that warrants its own dimension.

Any change is logged as a Decision (entry_type `decision`) in the
`raidd_entries` table with rationale + previous version reference.

---

**Last reviewed:** 2026-05-14. v1.0.
