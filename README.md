# PM Lite

A lightweight project governance kit for teams that don't have a dedicated project manager.

PM Lite is a set of 20 markdown templates covering the full project lifecycle — from project initiation through closure, warranty, and BAU handover. It encodes the disciplines that prevent projects from drifting: scope decisions, RAIDD logs, actions logs, lessons learned, incident response, triage, stakeholder communications, and more.

The kit is opinionated about what to do at each stage but pragmatic about how much overhead it imposes. Every template has guidance on when to tighten, loosen, or skip its cadence to match the project's reality.

---

## Who PM Lite is for

- **Non-PM-led delivery teams** — engineering teams, agencies, studios, and solo founders who deliver projects without a dedicated project manager.
- **Small project portfolios** — anywhere from 1 to ~20 active projects.
- **AI-assisted delivery** — every template is designed to work with AI assistants (Cowork, Claude Code, Cursor, etc.) so that lifecycle artefacts can be drafted, reviewed, and committed without breaking the audit trail.

PM Lite is **not** a replacement for full PMI/PRINCE2 governance on large enterprise programmes. It is the minimum viable governance kit that keeps a small-to-medium project on the rails.

---

## What's in the kit

20 templates in `templates/`, grouped by lifecycle stage:

### Foundation (Phase A — Setup)
- `01_apply-order.md` — the phase sequence the project follows.
- `02_credentials-manifest.md` — credentials inventory and rotation log.
- `14_project-initiation.md` — Project Initiation Document (PID). The agreement signed at project start.
- `10_project-roles.md` — named roles, escalation path, backups.
- `10b_portfolio-roles.md` — portfolio-level governance (use when running 3+ projects concurrently).
- `11_stakeholder-comms-plan.md` — who needs to know what, how often.
- `16_raci-matrix.md` — Responsible / Accountable / Consulted / Informed by workstream.

### Execution (Phases B–D — Build, Test, Deploy)
- `03_decision-log.md` — every meaningful decision with rationale.
- `06_project-checklist.md` — granular phase-by-phase checklist.
- `07_raidd-log.md` — Risks, Assumptions, Issues, Dependencies, Decisions.
- `09_meeting-protocol.md` — meeting agenda, minutes, and routing to RAIDD.
- `12_status-report.md` — monthly status report to sponsor.
- `18_actions-log.md` — discrete actions with owners, dates, and status (three design models — see template for which fits your project).

### Operations (across all phases)
- `04_incident-response.md` — incident playbooks (exposed credential, breach, deployment ERROR, etc.).
- `05_backup-restore.md` — backup verification cadence and restore procedures.
- `17_triage-guidance.md` — cross-cutting triage discipline (severity vocabulary, categories, SLAs).

### Closure (Phase E and beyond)
- `13_project-closure.md` — closure report assessing delivery vs PID.
- `15_warranty-and-bau-handover.md` — warranty period definition and BAU handover checklist.
- `08_lessons-learned.md` — durable patterns to carry forward.

---

## How the kit fits together

```
Phase A          Phase B–D         Phase E          Warranty         BAU
Setup            Execution         Handover         Period           Operations
                                                                    
14 (PID) ───────┬───────────────────► 13 (Closure) ──► 15 (Warranty+BAU)
                │                                                  │
01 (Apply) ─────┼─► 03 (Decisions) ────────────────────────────────┤
02 (Creds) ─────┤   07 (RAIDD) ───────────────────────────────────►│
10 (Roles) ─────┤   06 (Checklist) ───────────────────────────────►│
16 (RACI) ──────┤   09 (Meetings)  ◄──────────────────────────────►│
11 (Comms) ─────┤   12 (Status) ───────────────► (final report)    │
                │                                                  │
                └─► 17 (Triage) ◄────────────────────────────────►─┘
                    04 (Incident)
                    05 (Backup)
                    08 (Lessons)
```

The PID (`14`) is the foundational agreement. Everything downstream measures itself against it. The closure report (`13`) assesses delivery against the PID and triggers the warranty period (`15`). At BAU handover, governance ownership transfers from project team to operations team.

---

## Quick start

1. **Clone this repo** to your project workspace.
2. **Copy `templates/` to a new folder** named after your project.
3. **Start with `14_project-initiation.md`** — fill it in and get sponsor sign-off before any other work begins.
4. **Pick the templates you'll use** based on project size:
   - **Small project (<2 weeks, solo or pair):** `14`, `03`, `07`, `08`, `13` minimum.
   - **Medium project (2 weeks – 3 months, small team):** add `01`, `02`, `06`, `09`, `10`, `11`, `12`, `15`, `16`, `17`.
   - **Larger project or portfolio (3+ months, 3+ people):** the full 19-template set, plus `10b_portfolio-roles.md` if you're running 3+ projects.
5. **Establish the triage rhythm** — see `17_triage-guidance.md` §3 for who runs triage and when.
6. **Run the project.**

Detailed quickstart in [`docs/02_quickstart.md`](docs/02_quickstart.md).

---

## Versioning

PM Lite uses Semantic Versioning at the kit level. The current version is **v1.1.0** (released 2026-05-19).

- **Major** version bumps signal breaking changes to template structure or naming.
- **Minor** version bumps add new templates or non-breaking section additions.
- **Patch** version bumps are typo fixes, clarifications, or non-substantive edits.

Per-template change history lives in each template's `## Change log` section. Kit-level changes are in [`templates/CHANGELOG.md`](templates/CHANGELOG.md). Versioning practice and amendment workflow are documented in [`VERSION_CONTROL.md`](VERSION_CONTROL.md).

---

## Conventions

- **Cross-references** between templates use filenames (e.g., `14_project-initiation.md`), not section numbers or URLs.
- **Severity vocabulary** is canonical lowercase (`low / medium / high / critical`). `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` are aliases for incident-pager convenience only — defined in `17_triage-guidance.md` §5.
- **Action status vocabulary** is canonical 5-value (`open / in_progress / blocked / resolved / cancelled`) — defined in `18_actions-log.md` §4. Legacy status values have a documented migration mapping table.
- **Approval thresholds** default to PRINCE2 industry standard: ±10% budget, ±2 weeks OR ±10% of duration (whichever smaller) for schedule. Defined and amendable in `03_decision-log.md`.
- **Warranty period** defaults to 30 days from closure sign-off. Amendable in `15_warranty-and-bau-handover.md`.

---

## What PM Lite is NOT

- **Not a substitute for actual project management** on large, complex, or high-risk programmes. PRINCE2 / PMP exist for a reason.
- **Not a software tool.** It's markdown templates. Pair with a tracker (the AI Solutions tracker, Jira, Linear, Notion, plain GitHub issues, or even a spreadsheet) for queryable state.
- **Not auto-enforcing.** The templates encode discipline; the team has to actually apply it.

---

## Repository structure

```
PM-Lite/
├── README.md                 ← you are here
├── VERSION_CONTROL.md        ← how the kit itself is versioned
├── templates/                ← the 19 markdown templates
│   ├── CHANGELOG.md          ← kit-level release history
│   ├── 01_apply-order.md
│   ├── 02_credentials-manifest.md
│   ├── 03_decision-log.md
│   ├── 04_incident-response.md
│   ├── 05_backup-restore.md
│   ├── 06_project-checklist.md
│   ├── 07_raidd-log.md
│   ├── 08_lessons-learned.md
│   ├── 09_meeting-protocol.md
│   ├── 10_project-roles.md
│   ├── 10b_portfolio-roles.md
│   ├── 11_stakeholder-comms-plan.md
│   ├── 12_status-report.md
│   ├── 13_project-closure.md
│   ├── 14_project-initiation.md
│   ├── 15_warranty-and-bau-handover.md
│   ├── 16_raci-matrix.md
│   ├── 17_triage-guidance.md
│   └── 18_actions-log.md
└── docs/
    ├── 01_what-is-pm-lite.md
    └── 02_quickstart.md
```

---

## Contributing

PM Lite is currently owned by AI Solutions and managed via GitHub. Issues, suggestions, and forks welcome. Substantive contributions follow the workflow in [`VERSION_CONTROL.md`](VERSION_CONTROL.md).

---

## Licence

See `LICENCE.md` at the repo root for licensing terms.

---

**End of README.**
