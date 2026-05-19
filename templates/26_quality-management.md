# [Project Name] — Quality Management

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Project Lead]

---

## Why this document exists

Most projects measure "is it done?" — far fewer measure "is it good?" A project that ships on time and on budget but produces something below the agreed quality bar is a failed project, even if the dashboard says green.

This template separates three quality concepts that are often confused:

1. **Quality criteria** — the agreed STANDARDS the project's deliverables must meet (per `19_glossary-and-concepts.md` §6 — these are typically the acceptance criteria from the PID).
2. **Quality assurance (QA)** — the PROCESS by which we build quality in (reviews, standards, methodology).
3. **Quality control (QC)** — the PROCESS by which we verify quality is present (testing, inspection, audit).

QA = "are we building it right?" QC = "did we build it right?" Both are needed.

For non-PM readers: read `19_glossary-and-concepts.md` §6 (Acceptance criteria) and §6 (Done vs Done-Done) first.

---

## 1. Quality criteria

The agreed standards. Source of truth is `14_project-initiation.md` §8 (Success criteria). This document references and operationalises them.

### 1.1 Project-level quality criteria

Copy from `14_project-initiation.md` §8. Reference, don't duplicate:

| ID | Criterion | Measurement method | Threshold | Owner |
|---|---|---|---|---|
| QC-001 | [e.g., Page loads under 2 seconds on 4G mobile] | [Lighthouse test, p95 across 10 runs] | [<2000ms] | [Project Lead] |
| QC-002 | [e.g., WCAG 2.1 AA compliance] | [Automated scan + manual review] | [Zero AA violations] | [Project Lead] |
| QC-003 | [e.g., 99.5% uptime in production] | [Monitoring dashboard] | [≥99.5% in any 30-day window] | [Operations Lead] |
| ... | ... | ... | ... | ... |

### 1.2 Per-deliverable quality criteria

For each major deliverable, define specific criteria:

| Deliverable | Quality criteria | Method | Owner |
|---|---|---|---|
| [Customer portal] | [List of acceptance criteria] | [UAT, automated tests] | [Project Lead] |
| [Admin interface] | [Different acceptance criteria] | [UAT] | [Project Lead] |
| [Documentation] | [Completeness checklist, readability score] | [Editorial review] | [Project Lead] |

### 1.3 Out-of-scope quality criteria

Be explicit about what we're NOT testing or guaranteeing. Failure to do this leads to "but I thought you'd also handle..." conversations after go-live.

| Out of scope | Why | Where this lives instead |
|---|---|---|
| [e.g., Penetration testing] | [Buyer's security team does this separately] | [Buyer responsibility] |
| [e.g., Internationalisation] | [Single locale agreed at G1] | [Phase 2 candidate] |

---

## 2. Definition of Done (DoD)

A team-level standard for what counts as "done." Separate from acceptance criteria — DoD is the BAR, acceptance criteria are the SPECIFICS.

### 2.1 DoD for code deliverables

For any code/system deliverable, "done" means ALL of:

- [ ] Code written and committed to main branch
- [ ] Peer-reviewed (at least one reviewer approval, or self-review documented if solo)
- [ ] Automated tests pass (unit + integration as applicable)
- [ ] Manual smoke test passed
- [ ] Documentation updated (README, runbook, API docs as applicable)
- [ ] Deployment to test environment successful
- [ ] Acceptance criteria for this deliverable verified
- [ ] No P1/P2 defects open against this deliverable
- [ ] Stakeholder sign-off captured if required by the deliverable

### 2.2 DoD for document deliverables

For any document/report deliverable, "done" means ALL of:

- [ ] Drafted in agreed format/template
- [ ] Spell-checked and grammar-checked
- [ ] Cross-references valid (links work, file references exist)
- [ ] Reviewed by intended reader's tier (or proxy)
- [ ] Feedback incorporated or rationale documented for rejection
- [ ] Stored in agreed location (Drive folder, repo, etc.)
- [ ] Listed in PID deliverables register as Complete

### 2.3 DoD for process deliverables

For any process/training/handover deliverable, "done" means ALL of:

- [ ] Process steps documented in agreed format (often runbook per `23_runbook.md`)
- [ ] Dry run completed with intended operator(s)
- [ ] Feedback from dry run incorporated
- [ ] First real-world execution observed (or evidence collected)
- [ ] Owner formally accepted ownership

### 2.4 Customising DoD

These are starting points. At G1, the project team can:
- Add criteria (e.g., specific security scans, specific accessibility audits)
- Remove criteria (with rationale)
- Tighten criteria (e.g., "two reviewers" instead of "at least one")

Customisations recorded in `14_project-initiation.md` §8 with rationale.

---

## 3. Quality Assurance (QA) — building quality in

QA is the discipline of HOW we work. It catches quality problems at their source, not at the end.

### 3.1 QA practices for code-heavy projects

- **Code review** — every change reviewed by at least one other person (or documented self-review if solo project).
- **Coding standards** — agreed style guide; linter configured; standards enforced via CI.
- **Branching strategy** — agreed approach (e.g., trunk-based with short-lived feature branches; protected main; PR required for merge).
- **CI/CD** — automated tests run on every commit; deployment automated where possible.
- **Pair programming** — for high-risk or unfamiliar work, two people work together rather than reviewing afterwards.
- **Test-driven development** — for high-confidence requirements, tests written before code.
- **Refactoring discipline** — code quality maintained continuously, not as "tech debt" deferred indefinitely.

### 3.2 QA practices for document-heavy projects

- **Template-driven authoring** — start from approved templates (PM Lite kit, organisational style guides).
- **Peer review** — every significant document reviewed by at least one other person before sign-off.
- **Editorial pass** — for external/customer-facing documents, dedicated editorial review.
- **Source of truth** — every piece of content has ONE canonical location; everything else is a copy or reference.

### 3.3 QA practices for process-heavy projects

- **Process documentation** — every recurring process has a runbook (`23_runbook.md`).
- **Dry runs** — new processes tested before relied upon.
- **Cross-training** — at least two people understand every critical process (no single point of failure).
- **Process review cycle** — processes reviewed at agreed cadence (typically quarterly for operational processes).

### 3.4 Tailoring QA to project size

| Project size | QA practices |
|---|---|
| Small | Self-review documented; basic linting; smoke testing. |
| Medium | Peer code review; CI tests; UAT; editorial pass on customer-facing content. |
| Large | Full QA program: pair programming for high-risk work; multiple review tiers; automated quality gates; security/accessibility audits. |

---

## 4. Quality Control (QC) — verifying quality after the fact

QC is the discipline of CHECKING. Even with perfect QA, things slip through; QC catches them.

### 4.1 QC activities

| Activity | When | Who | Output |
|---|---|---|---|
| **Unit testing** | During build (continuous) | Developer | Test pass/fail; coverage % |
| **Integration testing** | During build/test | Developer/QA | Test pass/fail across components |
| **User Acceptance Testing (UAT)** | Test stage (Stage 4) | Intended end-users | UAT pass/fail per acceptance criteria |
| **Performance testing** | Test stage | Developer/QA | Latency, throughput, resource use metrics |
| **Security testing** | Test stage | Developer/security specialist | Vulnerabilities identified |
| **Accessibility testing** | Test stage | Developer/QA | WCAG compliance report |
| **Documentation review** | Test/Deploy stage | Subject-matter expert | Review feedback + sign-off |
| **Process audit** | Warranty stage | Operations Lead | Audit findings |

### 4.2 Defect handling

When QC finds a defect:

1. **Log** — in `07_raidd-log.md` as an Issue (severity per `17_triage-guidance.md` §5).
2. **Triage** — Project Lead assesses severity, assigns owner, sets target resolution.
3. **Fix** — owner addresses; fix is itself a deliverable that must pass DoD before being marked resolved.
4. **Re-test** — QC verifies fix; updates Issue status in RAIDD.
5. **Close** — Issue closed when verified; lesson captured in `08_lessons-learned.md` if pattern emerging.

### 4.3 Defect severity decisions at gate review

At G3 (Test Complete) gate review, defect status reviewed:

| Severity | Allowable at G3 pass |
|---|---|
| **Critical** | NONE. Must be resolved. |
| **High** | NONE — OR documented workaround accepted by Sponsor (Conditional Pass). |
| **Medium** | Acceptable with documented workaround OR fix planned in Warranty period. |
| **Low** | Acceptable — fix planned but not blocking. |

---

## 5. Quality register

Track quality events: criteria changes, audits, reviews, defects of note, sign-offs.

| Event ID | Date | Type | Description | Outcome | Reference |
|---|---|---|---|---|---|
| Q-001 | [YYYY-MM-DD] | Criterion added | [e.g., Added "must work on Safari iOS 14+"] | Approved by Sponsor | `25_change-control.md` CR-002 |
| Q-002 | [YYYY-MM-DD] | Review | [e.g., Code review of authentication module] | 3 issues found, 2 fixed, 1 deferred (acceptable risk) | `07_raidd-log.md` I-007 |
| Q-003 | [YYYY-MM-DD] | UAT | [e.g., UAT of customer portal with 5 users] | 4/5 acceptance criteria passed; 1 deferred to v1.1 | `13_project-closure.md` |
| ... | ... | ... | ... | ... | ... |

---

## 6. Quality gates within project gates

Per `20_stage-gates.md`, quality criteria are part of every gate's sign-off requirements. Add these to each gate:

| Gate | Quality criteria |
|---|---|
| **G1 (Initiation Complete)** | Quality criteria defined; DoD agreed; QA practices specified. |
| **G2 (Build Complete)** | Internal code review complete; CI tests passing; no critical defects open. |
| **G3 (Test Complete)** | UAT complete; acceptance criteria verified; defect levels within tolerance per §4.3. |
| **G4 (Deploy Complete)** | Smoke tests passed in production; no regression of previously-verified criteria. |
| **G5 (Warranty Complete)** | Quality criteria sustained through warranty period; lessons captured. |

---

## 7. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **No DoD — every deliverable defines "done" individually** | Inconsistent quality bar; some shipped under-baked. | Team agrees DoD at G1; every deliverable measured against it. |
| **Acceptance criteria invented at UAT time** | Users invent criteria that suit them in the moment; team scrambles to meet undefined targets. | Criteria locked at G1 in PID. Changes after that go through `25_change-control.md`. |
| **QA = "we'll catch it in testing"** | All quality burden shifted to QC. Defects compound. | QA practices (§3) prevent defects; QC catches what slips through. |
| **No re-test after fix** | Bug fixed, but unrelated regression introduced. Goes unnoticed. | Every fix is itself a deliverable; passes DoD including re-test. |
| **Quality criteria only for visible features** | Performance/security/accessibility forgotten because they're not visible in the demo. | Quality criteria include non-functional requirements (§1.1 includes performance, accessibility, uptime). |
| **"Critical defect" used too freely** | Everything becomes "critical"; nothing actually is. | Severity definitions per `17_triage-guidance.md` §5. P1/Critical is rare. |
| **No quality criteria for documents/processes** | Documents pass DoD but are actually poor quality (typos, broken links, etc.). | DoD covers documents (§2.2) and processes (§2.3) as well as code. |
| **Quality vs scope tension resolved silently** | Faced with deadline pressure, team quietly lowers the quality bar. | Quality reductions are changes — go through `25_change-control.md`. |

---

## 8. Links and references

- `14_project-initiation.md` §8 — source of project-level success criteria.
- `17_triage-guidance.md` — severity vocabulary used here.
- `07_raidd-log.md` — defects logged as issues.
- `08_lessons-learned.md` — quality lessons captured.
- `13_project-closure.md` — final quality assessment.
- `19_glossary-and-concepts.md` §6 — Acceptance criteria, Done vs Done-Done.
- `20_stage-gates.md` — gate-level quality criteria per §6 above.
- `25_change-control.md` — quality criteria changes go through CCB.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- DRAFTED at Initiation (Phase A). Quality criteria + DoD agreed at G1.
- ACTIVE throughout — QA practices applied during Build; QC during Test.
- REFERENCED at every gate review.
- FINAL ASSESSMENT at G5 (Warranty Complete) — quality criteria reviewed for sustained performance.

**Default cadence:**
- QA practices: continuous during execution.
- QC activities: per the activity schedule in §4.1 (typically Test stage heavy).
- Quality register updated: as events occur.
- Quality gate review: at every project gate.

**Why this default:**
- QA is "always on" — it's how the team works, not a scheduled activity.
- QC is scheduled because it's deliberate verification work.
- Register-as-you-go ensures the audit trail is complete.

**When to amend:**
- **Tighten:** safety-critical, compliance-bound, or high-visibility projects. Add audits, independent verification, formal sign-offs.
- **Loosen:** very small or internal-only projects. Self-review may replace peer review; informal UAT may replace structured testing.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of quality management template.**
