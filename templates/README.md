# PM Lite

**Lightweight governance kit for non-PM-led project teams.**

Version: **v1.2.0**
Released: 2026-05-19
Status: ACTIVE — production-ready, sold via aisolutionsnet.net

---

## What is PM Lite?

PM Lite is a set of 30 markdown templates covering the full project lifecycle — from pipeline through initiation, build, test, deploy, warranty, BAU, and retirement. It encodes the disciplines that prevent projects from drifting: scope decisions, RAIDD logs, actions logs, lessons learned, incident response, triage, stakeholder communications, stage gates, portfolio backlog, operational runbooks, budget management, change control, quality management, benefits realisation, and more.

PM Lite aligns with mainstream PM frameworks (PRINCE2, PMBOK, Agile/SAFe, ITIL) but is deliberately LIGHTER — calibrated for solo founders, small studios, and small agencies running individual projects or small portfolios.

**Read first if you're new:**

- `21_decision-tree.md` — answers "which templates do I actually need?"
- `19_glossary-and-concepts.md` — defines project, programme, workpackage, sponsor, stakeholder, etc.
- `docs/02_quickstart.md` — 30-minute onboarding

---

## What's in the kit

30 templates in `templates/`, grouped by lifecycle stage:

### Pre-project / orientation
- `19_glossary-and-concepts.md` — foundational terminology (read this FIRST if new to PM)
- `21_decision-tree.md` — which templates apply to your situation
- `20_stage-gates.md` — the 8 canonical stages and 7 gates
- `22_portfolio-backlog.md` — track Pipeline-stage items (the portfolio backlog)

### Initiation (Phase A)
- `01_apply-order.md` — high-level phase plan
- `02_credentials-manifest.md` — credential tracking
- `10_project-roles.md` — define team and roles
- `10b_portfolio-roles.md` — portfolio-level roles (if 3+ projects)
- `11_stakeholder-comms-plan.md` — stakeholder map and communication plan
- `11b_message-templates.md` — standard message templates (companion to 11)
- `14_project-initiation.md` — the Project Initiation Document (PID)
- `16_raci-matrix.md` — detailed RACI per workstream
- `24_budget-management.md` — budget baseline, EAC tracking, vendor & invoice management
- `27_benefits-management.md` — benefits register and realisation tracking

### Execution (Phases B–D — Build, Test, Deploy)
- `03_decision-log.md` — every meaningful decision with rationale
- `06_project-checklist.md` — granular phase-by-phase checklist
- `07_raidd-log.md` — Risks, Assumptions, Issues, Dependencies, Decisions
- `09_meeting-protocol.md` — meeting agenda, minutes, and routing to RAIDD
- `12_status-report.md` — monthly status report to sponsor
- `18_actions-log.md` — discrete actions with owners, dates, and status (three design models)
- `25_change-control.md` — change requests, CCB, TCQRS impact assessment
- `26_quality-management.md` — quality criteria, Definition of Done, QA vs QC

### Closure, Warranty, BAU (Phase E and beyond)
- `13_project-closure.md` — closure report
- `15_warranty-and-bau-handover.md` — warranty period and BAU handover
- `08_lessons-learned.md` — lessons captured at closure
- `17_triage-guidance.md` — triage discipline during warranty and BAU
- `04_incident-response.md` — incident playbook (standalone, no project required)
- `05_backup-restore.md` — backup/restore discipline
- `23_runbook.md` — operational runbook for services produced by the project (required for G5 sign-off)

---

## Conventions

- **Cross-references** between templates use filenames (e.g., `14_project-initiation.md`), not section numbers or URLs.
- **Severity vocabulary** is canonical lowercase (`low / medium / high / critical`). `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` are aliases for incident-pager convenience only — defined in `17_triage-guidance.md` §5.
- **Action status vocabulary** is canonical 5-value (`open / in_progress / blocked / resolved / cancelled`) — defined in `18_actions-log.md` §4. Legacy status values have a documented migration mapping table.
- **Lifecycle stages:** the 8 canonical stages (Pipeline → Initiation → Build → Test → Deploy → Warranty → BAU → Retirement) are defined in `20_stage-gates.md`.
- **Approval thresholds** default to PRINCE2 industry standard: ±10% budget, ±2 weeks OR ±10% of duration (whichever smaller) for schedule. Defined and amendable in `03_decision-log.md`.
- **Warranty period** defaults to 30 days from closure sign-off. Amendable in `15_warranty-and-bau-handover.md`.

---

## How to use the kit — quick paths

`21_decision-tree.md` covers this in detail. Quick summary:

| Project size | Templates to use |
|---|---|
| **Tiny** (< 1 day) | None — use a notebook. |
| **Small** (1-2 weeks, 1-3 people) | 6 core templates: 14 (light), 06 (light), 03, 07, 12, 13 (light). |
| **Medium** (1-3 months, 3-10 people) | Full kit as designed. ~16 templates active. |
| **Large** (3+ months, 10+ people) | Full kit + tailoring per `20_stage-gates.md` Section 5. |
| **Programme** (multiple related projects) | Adapted use of `10b_portfolio-roles.md` plus per-project full kits. |

---

## Versioning

PM Lite uses a **hybrid versioning policy**:

- **Kit version** — `v1.2.0` — the version of the kit you have. One number, consistent across all templates.
- **Document version** — varies per template (1.0 / 1.1 / 1.4 / etc.) — the per-template revision history.

Every template header shows BOTH versions. The kit version is the same on every template; the document version varies. See `VERSION_CONTROL.md` in the repo root for the full policy.

PM Lite uses Semantic Versioning at the kit level. The current version is **v1.2.0** (released 2026-05-19).

- **MAJOR** version changes are backwards-incompatible (a buyer would need to migrate filled-in templates).
- **MINOR** version changes add new templates or new sections to existing ones, preserving backwards compatibility.
- **PATCH** version changes are clarifications, typo fixes, or non-breaking refinements.

See `VERSION_CONTROL.md` for the full versioning policy.

See `templates/CHANGELOG.md` for the kit's release history.

---

## File structure

```
PM-Lite/
├── README.md (this file)
├── LICENCE.md
├── PROJECT-CONFIG.md
├── VERSION_CONTROL.md
├── docs/
│   └── 02_quickstart.md
└── templates/
    ├── CHANGELOG.md
    ├── 01_apply-order.md
    ├── 02_credentials-manifest.md
    ├── 03_decision-log.md
    ├── 04_incident-response.md
    ├── 05_backup-restore.md
    ├── 06_project-checklist.md
    ├── 07_raidd-log.md
    ├── 08_lessons-learned.md
    ├── 09_meeting-protocol.md
    ├── 10_project-roles.md
    ├── 10b_portfolio-roles.md
    ├── 11_stakeholder-comms-plan.md
    ├── 11b_message-templates.md
    ├── 12_status-report.md
    ├── 13_project-closure.md
    ├── 14_project-initiation.md
    ├── 15_warranty-and-bau-handover.md
    ├── 16_raci-matrix.md
    ├── 17_triage-guidance.md
    ├── 18_actions-log.md
    ├── 19_glossary-and-concepts.md
    ├── 20_stage-gates.md
    ├── 21_decision-tree.md
    ├── 22_portfolio-backlog.md
    ├── 23_runbook.md
    ├── 24_budget-management.md
    ├── 25_change-control.md
    ├── 26_quality-management.md
    └── 27_benefits-management.md
```

---

## Licence

See `LICENCE.md`.

---

## Contact

PM Lite is built and maintained by [AI Solutions](https://aisolutionsnet.net). For questions, contact `support@aisolutionsnet.net`.

For feature requests or bug reports, open an issue on this repository.
