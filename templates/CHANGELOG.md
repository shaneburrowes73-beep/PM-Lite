# PM Lite Kit — Changelog

Version history for the PM Lite governance kit at the **kit-release** level. Per-template changes are recorded in each template's own `## Change log` section.

PM Lite uses [Semantic Versioning](https://semver.org/) at the kit level: MAJOR.MINOR.PATCH. See `VERSION_CONTROL.md` for the versioning policy.

---

## [v1.2.0] — 2026-05-19

**Foundation expansion + finance/change/quality/benefits + hybrid versioning policy — 10 new templates and a new versioning policy doc closing structural gaps and adding mainstream PM framework coverage.**

Per decisions logged on 2026-05-19, twelve foundational gaps were identified in v1.1.0:
1. The kit used terminology (project, programme, workpackage, sponsor, stakeholder, etc.) without defining it.
2. The kit had no explicit lifecycle stage-gate model — phases existed but transitions were silent.
3. The kit had no routing layer to help a new buyer choose which templates apply.
4. The Pipeline stage was defined but had no operational guidance for tracking pipeline items.
5. The kit had no MVP / MUP / MMP concept — the most common failure mode for first-time users is "build forever" with no defined stopping point.
6. Scope creep recognition was not made explicit anywhere — the templates assumed users would self-police.
7. The kit had no runbook template — projects could deliver something to production with no operational playbook.
8. The kit talked about budget but had no finance management discipline (baseline tracking, EAC, vendor invoicing, cashflow).
9. The kit handled scope decisions but had no broader change control discipline (CR process, CCB, TCQRS impact assessment).
10. The kit referenced quality criteria but had no quality management discipline (QA vs QC, Definition of Done, defect handling).
11. The kit had no benefits management discipline — projects could "deliver" without producing the value that justified the investment.
12. The kit had no versioning policy — templates carried inconsistent `**Version:**` lines with no clear distinction between kit-level and document-level versions; buyers had no clear answer to "what version do I have?"

v1.2.0 ships ten new templates, a new policy document, and updates three existing templates to close all twelve gaps. Additionally, all 30 templates were refactored to the new hybrid versioning header format. No existing template content was removed.

### Added — new templates

- `19_glossary-and-concepts.md` v1.1 — Foundational terminology. Defines 14 concepts the kit uses across all templates: Portfolio, Programme, Project, Workpackage, Sponsor, Stakeholder, Team member, Stage, Phase, Gate, Milestone, Baseline, Deliverable, Outcome, Scope, Requirements, Acceptance criteria, Done vs Done-Done, BAU, RAIDD, plus MVP / MUP / MMP and the "build forever" failure mode (added in v1.1 of this template).
- `20_stage-gates.md` v1.1 — 8 canonical lifecycle stages (Pipeline → Initiation → Build → Test → Deploy → Warranty → BAU → Retirement) with 7 gates (G0 through G6). Per-gate criteria, sign-off roles, outcomes, tailoring patterns, anti-patterns. Includes detailed portfolio backlog tracking for Pipeline stage with fields, cadence, sizing (XS/S/M/L/XL), and prioritisation (Value × Size, WSJF).
- `21_decision-tree.md` v1.1 — Template routing layer. Four paths (A: small project, B: medium, C: large, D: programme) plus guidance for BAU, tiny tasks, and special situations. Includes worked example for Path A. Added §5b Pipeline / portfolio backlog routing.
- `22_portfolio-backlog.md` — Standalone template for tracking Pipeline-stage items. Markdown table format with full field definitions, three prioritisation methods (Simple Value × Size / WSJF / Strategic), 5-state status lifecycle (New / Triaged / Approved / Parked / Declined), review cadence, sizing calibration anchors, and 9 anti-patterns.
- `23_runbook.md` — Operational runbook template for services/systems/processes produced by a project. Structured shell covering: 60-second overview, architecture, access/credentials, routine operational tasks (daily / weekly / monthly / quarterly / event-triggered), common issues + remediation, deploy rollback, monitoring + alerting, escalation paths, known limitations, retirement checklist, anti-patterns. Required at Stage 6 (Warranty) for G5 sign-off.
- `24_budget-management.md` — Project finance discipline: budget baseline, breakdown structure (labour, vendor, licences, infrastructure, etc.), contingency vs management reserve, CapEx/OpEx distinction, monthly forecast-vs-actual tracking with EAC (Estimate at Completion) computation, vendor and invoice management, cashflow planning for phased-funding projects, sponsor financial reporting, gate criteria, 8 anti-patterns.
- `25_change-control.md` — Change request and CCB discipline: what counts as a change, full CR process (propose → triage → impact assessment → CCB review → implement → close), TCQRS impact assessment (Time, Cost, Quality, Resources, Scope), CCB membership by project size, CCB authority by change type, CR register, implementation propagation checklist (which other documents to update), 7 anti-patterns. Plus §10 brief introduction to organisational change management (OCM) as a distinct discipline.
- `26_quality-management.md` — Quality discipline: project-level + per-deliverable quality criteria, Definition of Done (DoD) for code/document/process deliverables, Quality Assurance practices (how we build quality in) vs Quality Control activities (how we verify), defect handling, defect severity decisions at G3 review, quality register, gate-level quality criteria, 8 anti-patterns.
- `27_benefits-management.md` — Benefits realisation discipline: benefits register with 7 benefit types and quantification guidance, disbenefits register, realisation timeline with Post-Implementation Review (PIR) at G4+3 months, benefits ownership through project lifecycle and after (Sponsor + Operations Lead accountability), realisation log, sponsor handover for benefits when sponsor moves on before realisation, 8 anti-patterns.
- `11b_message-templates.md` — Standard message templates companion to `11_stakeholder-comms-plan.md`. Templates for: kickoff, milestone reached, monthly status, incident notification (initial + resolution), change announcement, escalation, closure, cancellation. Customisation guidance and 7 anti-patterns.

### Added — new policy documents (not templates)

- `VERSION_CONTROL.md` — Defines the hybrid versioning policy (kit version + document version) adopted at v1.2.0. Covers when to bump each, the baseline pass at release time, header format mandatory for all templates, change log conventions, and the rationale for the approach. Lives in the repository root.

### Refactored — header format (all 30 templates)

In support of the hybrid versioning convention, ALL 30 templates were refactored to use the new three-line header block:

```
**Document version:** X.Y
**Kit version:** v1.2.0
**Document status:** ACTIVE | DRAFT | RETIRED
```

This replaces the previous single-line `**Version:** X.Y` header. The change is purely structural — no content was removed. Templates that previously used `**Status:**` for content-status (e.g., PID `DRAFT / SIGNED-OFF`) were updated to use a distinct field name to avoid collision with `Document status`.

### Updated — existing templates

- `03_decision-log.md` v1.4 — Added "Recognising scope creep" subsection with 7 warning signs and 4-step response. Anti-pattern alert about uncontrolled re-baselining.
- `README.md` — 20 → 23 templates; added the three new templates to the Reference section; current version → v1.2.0.

### Kit-level conventions established

- **The 8 canonical lifecycle stages** (`20_stage-gates.md` Section 1) are now the kit's authoritative stage model.
- **The 7 canonical gates** (G0 through G6) are recorded in `03_decision-log.md` per `20_stage-gates.md` Section 4.
- **MVP / MUP / MMP** distinction is the kit's stance on "minimum" definitions. Specify which at PID time.
- **Scope creep recognition** has explicit warning signs and response protocol per `03_decision-log.md` Scope Decisions section.
- **Pipeline backlog tracking** is required for portfolio governance per `20_stage-gates.md` §1.
- **TCQRS impact assessment** (Time, Cost, Quality, Resources, Scope) is the canonical change-impact framework per `25_change-control.md` §3.
- **CapEx vs OpEx** distinction confirmed at G1 per `24_budget-management.md` §2.
- **EAC (Estimate at Completion)** is the canonical budget forecasting concept per `24_budget-management.md` §4.
- **Definition of Done** is project-team-level standard; **acceptance criteria** are per-deliverable specifics per `26_quality-management.md` §2.
- **PIR (Post-Implementation Review)** at G4+3 months is the canonical benefits checkpoint per `27_benefits-management.md` §2.
- **Hybrid versioning convention** introduced — see new `VERSION_CONTROL.md`. Every template now carries TWO version stamps: `Document version` (per-template revision history) and `Kit version` (release-level version, currently `v1.2.0`). All template headers refactored to new format. Baseline pass mandatory at every kit release.

### Framework alignment

v1.2.0 brings the kit into substantive alignment with mainstream PM frameworks:

- **PRINCE2** — covers stage gates, budget tolerances, scope decisions, quality theme, benefits theme, change theme.
- **PMBOK** — covers cost management, scope management, quality management, integrated change control, stakeholder engagement.
- **Agile / SAFe** — covers WSJF prioritisation, MVP/MUP/MMP, iterative gate cycles, retrospectives via lessons learned.
- **ITIL** — covers incident response, runbook, triage, severity vocabulary, BAU handover.

The kit is deliberately LIGHTER than any of these — calibrated for solo founders, small studios, and small agencies running individual projects or small portfolios. It is NOT a replacement for any of those frameworks for organisations that need the heavier discipline.

### Out of scope for v1.2.0 (deferred to v1.3 or later)

- **v1.3 — Resource / Capacity management** — Resource plans, skills inventory, capacity planning across multiple projects. Solo founders can manage in spreadsheets; small studios with 3-10 people will benefit from a dedicated template.
- **v1.3 — Quantitative risk analysis** — Probability × impact scoring, Monte Carlo simulation, risk appetite definition. Current `07_raidd-log.md` covers qualitative risk; quantitative is heavier discipline.
- **v1.3 — Master schedule / Gantt** — Visual schedule template. Most buyers will use external tools (MS Project, Asana, Linear) for this; PM Lite may add a simple Markdown-table-based timeline.
- **v1.3 (logged in AI Solutions tracker as D-045, status `pending`)** — Test plan template(s). To be drafted in the automated-test-tool Cowork session (which has deeper test-tooling context), then handed back to PM Lite for packaging. Expected as `28_test-plan.md` and possibly companion templates.
- **v1.3 or v2.0 — Programme template** — Currently `10b_portfolio-roles.md` is adapted for programme governance. A dedicated programme template would help.
- **v1.3 or v2.0 (logged in AI Solutions tracker as D-043, status `pending`)** — Third-party / SLA / RFI / RFP templates. Substantive content estimated at 4-6 new templates (SoW, contract checklist, vendor onboarding, SLA tracker, RFI template, RFP template, vendor selection matrix).
- **v1.3+** — Tracker schema implementation of the actions log (Supabase `actions` table per the model chosen via `18_actions-log.md` Section 9 testing).
- **v1.3+** — Deep AI-tool integrations (Fireflies / Otter / Granola first-class).
- **v1.3+** — PIR report template (currently covered narratively in `27_benefits-management.md` §2.2; would benefit from a standalone template).
- **Phase 2 (logged in AI Solutions tracker as D-044, status `pending`)** — Supabase `portfolio_backlog` table for AI Solutions' internal use. v1.2.0 ships the buyer-facing markdown template (`22_portfolio-backlog.md`); the internal database table is companion infrastructure deferred to Phase 2.
- **Phase 2 marketing (logged in AI Solutions tracker as D-042, status `pending`)** — Cross-sell integration between PM Lite landing page and automated-test-tool product.
- **Future** — CI checks for cross-reference integrity; automated CHANGELOG generation; organisational change management (OCM) deeper templates beyond the brief introduction in `25_change-control.md` §10.

### Total templates in v1.2.0

**30 files** (20 from v1.1.0 + 10 new templates added in v1.2.0).

### Decisions captured

Four decisions shaped v1.2.0:

- D-041: Identify and close three structural gaps in v1.1.0 (terminology, stage gates, routing). Ship as v1.2.0 same day to preserve momentum and complete the kit's foundational layer.
- D-042 (kit context): Expand v1.2.0 scope to also address Pipeline tracking, MVP definitions, and scope creep recognition — three additional gaps surfaced during v1.2.0 drafting. Ship all six closures together rather than waiting for v1.3.
  - Note: tracker D-042 is a different decision (the automated test tool cross-sell backlog item, logged separately in the AI Solutions tracker `raidd_entries` table).
- D-043 (kit context): Final expansion of v1.2.0 scope based on competitive review of PRINCE2/PMBOK/Agile/ITIL frameworks. Owner decision to add: budget management, change control, quality management, benefits management, and the 11_stakeholder-comms-plan companion message templates. Ship at 30 templates total. Resource management, quantitative risk, and master schedule deferred to v1.3.
- D-047 (kit context): Adopt hybrid versioning policy (Approach C). Every template carries TWO version stamps: `Document version` and `Kit version`. Per-template revision history preserved (not reset to v1.0); kit-level baseline enforced at every release via the "baseline pass" defined in `VERSION_CONTROL.md` §1.4. All 30 templates refactored to new header format as part of v1.2.0 baseline pass.

---

## [v1.1.0] — 2026-05-19

**First general-release version of the PM Lite kit.** Buyer-facing governance kit for non-PM-led project teams running through the full project lifecycle: initiation → execution → closure → warranty → BAU.

This release combines what was originally planned as v1.0 (foundational lifecycle templates) with v1.1 (actions log template) per decision D-040 on 2026-05-19. The kit ships as v1.1.0 rather than as sequential v1.0.0 then v1.1.0 releases because the owner determined v1.0's audit-trail risk was negligible (single-user kit, no in-flight projects yet using it) and end-to-end review of the combined kit was more valuable than strict phase-gating.

### Added — new templates

- `13_project-closure.md` — Project Closure Report
- `14_project-initiation.md` — Project Initiation Document (PID)
- `15_warranty-and-bau-handover.md` — Warranty + BAU Handover
- `16_raci-matrix.md` — Standalone RACI matrix
- `17_triage-guidance.md` — Cross-cutting triage discipline + canonical severity vocabulary
- `18_actions-log.md` — Actions log (three design models)

### Updated — existing templates

- `03_decision-log.md` v1.3 — PRINCE2 default tolerances + D-040 example
- `04_incident-response.md` v1.1 — severity vocabulary aliases
- `06_project-checklist.md` v1.1 — added Phases E.4 / E.5 / E.6
- `10_project-roles.md` v1.1 — added Operations Lead role; redirect to RACI matrix

### Kit-level conventions established

- **Canonical severity vocabulary:** `low / medium / high / critical` (lowercase)
- **Canonical action status vocabulary:** `open / in_progress / blocked / resolved / cancelled`
- **Per-template change log convention:** every template ends with a `## Change log` section
- **Lifecycle cadence convention:** every template has a `## Lifecycle cadence` section
- **Cross-reference convention:** templates reference each other by filename

### Decisions captured

Seven strategic decisions on 2026-05-19 shaped v1.1.0: D-034 through D-040. See decisions detail in earlier revisions of this changelog and in `03_decision-log.md`.

### Total templates in v1.1.0

**20 files** (14 existing + 4 new lifecycle templates + 1 cross-cutting triage template + 1 actions log template).

---

## Pre-v1.1.0 history

Before v1.1.0, the kit existed as a 14-template draft set in Drive `Projects/16-pm-lite/templates/` (Drive folder ID `19xBH2rE8ZiIy7YDV1hunHQIZkWZwvSbR`). Per D-035, that folder is archived as `Projects/16-pm-lite/_archive_2026-05-19_drive-as-source/` and GitHub becomes authoritative.

Pre-v1.1.0 templates evolved organically and did not have formal version numbers. Individual template-level change logs preserve the per-document history.

---

**End of kit-level changelog.**
