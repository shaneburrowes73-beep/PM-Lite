# PM Lite Templates — Changelog

All notable changes to the PM Lite templates kit are recorded here. The kit lives at `templates/` in the [PM-Lite GitHub repository](https://github.com/shaneburrowes73-beep/PM-Lite).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the kit adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For per-template change history, see the `## Change log` section at the bottom of each individual template file. This document records changes at the **kit level** — releases, breaking changes, and additions that affect multiple templates at once.

For guidance on how the kit is versioned and amended, see `VERSION_CONTROL.md` at the repository root.

---

## [v1.1.0] — 2026-05-19

**First general-release version of the PM Lite kit.** Buyer-facing governance kit for non-PM-led project teams running through the full project lifecycle: initiation → execution → closure → warranty → BAU.

This release combines what was originally planned as v1.0 (foundational lifecycle templates) with v1.1 (actions log template) per decision D-040 on 2026-05-19. The kit ships as v1.1.0 rather than as sequential v1.0.0 then v1.1.0 releases because the owner determined v1.0's audit-trail risk was negligible (single-user kit, no in-flight projects yet using it) and end-to-end review of the combined kit was more valuable than strict phase-gating.

### Added — new templates

- `13_project-closure.md` — Project Closure Report. Declares "delivered" against the Project Initiation Document; assesses success criteria, final budget, and final schedule; sign-off triggers warranty period.
- `14_project-initiation.md` — Project Initiation Document (PID). Captures the agreement at project start that everything downstream measures against. Sign-off by Sponsor + Project Lead + Operations Lead before Phase A.
- `15_warranty-and-bau-handover.md` — Warranty Period and BAU Handover. Bridges "project work done" to "operations team owns it." Defines the 30-day default warranty, triage SLA, BAU handover checklist, and transition rules.
- `16_raci-matrix.md` — Standalone RACI matrix template. Promotes RACI from "optional mention" in `10_project-roles.md` to a first-class governance artefact.
- `17_triage-guidance.md` — Cross-cutting triage discipline. Defines the canonical severity vocabulary, triage categories, per-item SLAs, triage backlog review meeting attendees and cadence by phase, and the triage manager role transition rule (Project Lead → Operations Lead at BAU).
- `18_actions-log.md` — Actions log template. Presents three design models (A: actions as RAIDD attributes; B: actions as peer to RAIDD; C: actions as fully first-class) so buyers can pick the model that fits their project profile. Defines canonical 5-value status vocabulary (`open / in_progress / blocked / resolved / cancelled`) and a test plan (§9) for validating the template by extracting from real project data.

### Changed — substantive edits

- `03_decision-log.md` v1.1 → v1.2: Replaced placeholder tolerances with **PRINCE2 industry-standard defaults** (budget ±10%, schedule ±2 weeks OR ±10% of duration whichever is smaller). Added "Why these defaults" rationale and "When to amend these defaults" guidance (tighten / loosen / absolute currency threshold). Added Lifecycle cadence section.
- `04_incident-response.md` v1.0 → v1.1: Reconciled severity scale with the kit-canonical lowercase vocabulary (`critical / high / medium / low`). The `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` codes are now documented as **aliases** for incident-pager and runbook convenience; the canonical form is what goes in tracker fields. Added Lifecycle cadence section.
- `06_project-checklist.md` v1.0 → v1.1: Added new sub-sections to Phase A (A.6 Governance baseline) and Phase C (C.5 Triage rhythm established). Expanded Phase E with E.4 Closure (formal sign-off), E.5 Warranty period, and E.6 BAU handover. Added Hard Rules 4 and 5 covering closure and BAU completeness. Added Lifecycle cadence section.
- `10_project-roles.md` v1.0 → v1.1: Removed "RACI matrix (optional)" section; replaced with reference to standalone `16_raci-matrix.md`. Added explicit **Operations Lead** role definition (separate from Technical Lead) covering BAU receipt. Added triage manager assignment to Project Lead role and triage manager transition rule at BAU. Added Lifecycle cadence section.

### Changed — Lifecycle cadence sections added (per D-039)

Every existing template now includes a `## Lifecycle cadence` section with four sub-sections: when the template is used in the project lifecycle, default cadence, why this default, and when to amend the cadence (tighten / loosen / skip entirely).

The following templates received a Lifecycle cadence section as their primary v1.0 change (no other substantive edits):

- `01_apply-order.md`
- `02_credentials-manifest.md`
- `05_backup-restore.md`
- `07_raidd-log.md`
- `08_lessons-learned.md`
- `09_meeting-protocol.md` (with explicit distinction from in-template Phase 4 review cadence and from `17_triage-guidance.md` §3.5 meeting cadence)
- `11_stakeholder-comms-plan.md`
- `12_status-report.md`

### Changed — minor corrections

- `10b_portfolio-roles.md`: Removed "when available" disclaimer for `13_project-closure.md` (now available as of this release). Added Lifecycle cadence section.

### Kit-level conventions established

- **Canonical severity vocabulary:** `low / medium / high / critical` (lowercase) for all tracker fields and template-level severity references. `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` are aliases used only for incident-pager and runbook convenience.
- **Canonical action status vocabulary:** `open / in_progress / blocked / resolved / cancelled` — the five values defined in `18_actions-log.md` §4. Legacy values (`pending`, `wip`, `done`, `wontfix`, etc.) have a documented mapping table for migration.
- **Per-template change log convention:** every template ends with a `## Change log` section recording amendments to that specific document during the project. The kit-level `CHANGELOG.md` (this document) records changes at the kit-release level.
- **Lifecycle cadence convention:** every template has a `## Lifecycle cadence` section defining how often it's used, why, and when to amend.
- **Cross-reference convention:** templates reference each other by filename (e.g., `14_project-initiation.md`), not by section number or URL. This makes the kit portable across filesystems.

### Decisions captured

Seven strategic decisions made on 2026-05-19 by the kit owner shaped v1.1.0:

- D-034: Buyer-completion definition — "ready to sell" = non-PM can navigate concept → handover → BAU. Initiation, closure, and warranty/BAU templates are **required**, not optional.
- D-035: GitHub is the single source of truth for PM Lite the product. Drive is reserved for filled-in copies of the templates used in internal AI Solutions portfolio governance.
- D-036: AI tool integration (Fireflies / Otter / Granola native) deferred to Phase 2. v1.1 buyers can use the existing n8n meeting-minutes-to-raidd workflow.
- D-037: Approval thresholds use PRINCE2 defaults (±10% / ±2 weeks). Buyer-defined absolute currency threshold supplements the percentage.
- D-038: RACI promoted from optional mention to standalone template `16_raci-matrix.md`.
- D-039: Lifecycle cadence documented as a section inside each existing template, not as separate files.
- D-040: Combine planned v1.0 and v1.1 releases into a single v1.1.0 release. Governance bypass authorised given no in-flight projects using the kit and minimal audit-trail risk; end-to-end review of the combined kit deemed more valuable than strict phase-gating.

### Out of scope for v1.1.0 (deferred to future releases)

- **v1.2:** Phase 2 deep AI-tool integrations (Fireflies / Otter / Granola first-class integration).
- **v1.2+:** Tracker schema implementation of the actions log (i.e., adding an `actions` table to the AI Solutions Supabase tracker per the model chosen via §9 testing of `18_actions-log.md`).
- **Future:** CI checks for cross-reference integrity; automated CHANGELOG generation; per-template severity vocabulary lint.

### Total templates in v1.1.0

**20 files** (14 existing + 4 new lifecycle templates + 1 cross-cutting triage template + 1 actions log template).

---

## Pre-v1.1.0 history

Before v1.1.0, the kit existed as a 14-template draft set in Drive `Projects/16-pm-lite/templates/` (Drive folder ID `19xBH2rE8ZiIy7YDV1hunHQIZkWZwvSbR`). Per D-035, that folder is archived as `Projects/16-pm-lite/_archive_2026-05-19_drive-as-source/` and GitHub becomes authoritative.

Pre-v1.1.0 templates evolved organically and did not have formal version numbers. Individual template-level change logs preserve the per-document history.

---

**End of changelog.**
