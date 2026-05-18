# Portfolio Roles

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Portfolio Lead Name]

---

## Why this document exists

A studio or agency running multiple projects needs governance at TWO levels:

1. **Per-project** — captured in each project's `10_project-roles.md` (sponsor, lead, team, escalation).
2. **Portfolio-wide** — captured here. The roles that span all projects and ensure consistency, prioritisation, and resource allocation.

This document is the portfolio-level analogue of the project-roles template. It answers:

- Who decides which projects get funded / pursued / killed?
- Who arbitrates when two projects need the same person?
- Who ensures projects don't drift from portfolio standards?
- Who's accountable for the portfolio's overall performance?

If your portfolio has only 1–2 projects, you probably don't need this document yet. Use it once you have 3+ concurrent projects with shared resources.

---

## Portfolio scope

This document covers the portfolio of:

- **Organisation:** [Organisation name]
- **Portfolio name:** [e.g. AI Solutions, [Client] Engagement Portfolio]
- **Number of active projects:** [count]
- **Total annual budget:** [if applicable]
- **Portfolio start date:** [YYYY-MM-DD]

### Projects in scope

| ID | Project name | Stage | Project Lead | Sponsor | Status |
|---|---|---|---|---|---|
| 01 | [Project name] | Active / Paused / Closed | [Name] | [Name] | GREEN / AMBER / RED |
| 02 | [Project name] | | | | |

This table reflects the current state. Detailed per-project information lives in each project's folder.

---

## Portfolio-level roles

### Portfolio Owner

**Definition:** Ultimate accountability for the portfolio. Usually the studio owner or agency principal.

**Responsibilities:**
- Owns the portfolio's strategic direction
- Final say on new project intake
- Resource allocation arbiter
- Reports to: external board, investors, or self if owner-operated

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours; out-of-office]
- **Backup:** [Name]

### Portfolio Lead (operational)

**Definition:** The person running portfolio operations day-to-day. May be the same person as Portfolio Owner in small studios.

**Responsibilities:**
- Runs the portfolio review cadence
- Maintains this document and the portfolio dashboard
- Aggregates project status into portfolio status
- Triages cross-project conflicts
- Reports to Portfolio Owner

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]
- **Role / title:** [job title]
- **Availability:** [normal hours]
- **Backup:** [Name]

### Technical Authority (if applicable)

**Definition:** Owner of cross-project technical standards. Ensures projects don't drift into incompatible tech stacks or violate security/quality standards.

**Responsibilities:**
- Owns shared infrastructure (hub services, shared databases, etc.)
- Approves new tech stack additions to the portfolio
- Maintains skill/template library
- Cross-project technical reviews

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]

### Security / Compliance Lead

**Definition:** Owns portfolio-wide security baseline. Ensures every project meets minimum standards (RLS, credentials management, deployment protection, etc.).

**Responsibilities:**
- Owns the security checklist (`SECURITY_CHECKLIST.md`)
- Quarterly security review across all projects
- Incident-response coordination for breaches affecting multiple projects
- Compliance reporting (GDPR, sectoral requirements)

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]

### Operations / Finance Lead (if applicable)

**Definition:** Tracks portfolio-level cost, revenue, and operational health.

**Responsibilities:**
- Tracks monthly cloud spend across all projects
- Owns the portfolio P&L
- Vendor contract renewals
- Annual budget for portfolio infrastructure

**Filled in by:**

- **Name:** [Name]
- **Email:** [email]

---

## Cross-project resource allocation

When two projects need the same person at the same time, this document defines arbitration.

### Allocation principles

1. **Stated priorities win** — if Portfolio Owner has set priority order (e.g. "Project X is P0, all others P1"), that overrides individual project urgency.
2. **Sponsor-facing work beats internal** — when an external sponsor or paying client is waiting, that work takes priority over internal projects.
3. **In doubt, escalate to Portfolio Lead** — not to the contributor. Don't put the squeezed individual in the position of choosing between project leads.

### Allocation matrix

For shared roles, document the default split:

| Person | Project A allocation | Project B allocation | Notes |
|---|---|---|---|
| [Name] | 60% | 40% | Can flex ±20% in any week with notice |
| [Name] | | | |

### Conflict log

When allocation conflicts arise, log them. Patterns surface.

| Date | Conflict | Resolution | Resolved by |
|---|---|---|---|
| [YYYY-MM-DD] | [What happened] | [What was decided] | [Name] |

---

## Portfolio review cadence

### Weekly portfolio sync (≤30 minutes)

Portfolio Lead reviews the dashboard alone or with the leads:

- [ ] Any project moved to RED status this week?
- [ ] Any new RAIDD entries with severity ≥ high across the portfolio?
- [ ] Any open allocation conflicts?
- [ ] Anything coming up next week that needs portfolio-level decision?

Output: a one-paragraph weekly portfolio summary, distributed per the stakeholder comms plan.

### Monthly portfolio review (≤90 minutes)

Portfolio Owner + Portfolio Lead + (optionally) Project Leads:

- [ ] Status of every project (RAG, key metrics, headline risks).
- [ ] New projects proposed for intake.
- [ ] Projects proposed for pause or closure.
- [ ] Resource allocation review.
- [ ] Cross-project lessons (anything one project learned that should propagate).

Output: monthly portfolio status report, distributed per the stakeholder comms plan.

### Quarterly portfolio strategy review (≤4 hours)

Portfolio Owner-led:

- [ ] Are we doing the right projects? (Strategic fit.)
- [ ] Are we doing them well? (Execution quality.)
- [ ] What's the financial trajectory? (Sustainability.)
- [ ] What's our capacity for the next quarter?
- [ ] Any structural changes needed (new roles, new processes)?

Output: quarterly strategic direction memo.

---

## New project intake

When a new project is proposed for the portfolio, it follows an intake process:

### Intake checklist

- [ ] **Proposal document** — 1–2 pages describing the project, its sponsor, its success criteria, and its required resources.
- [ ] **Fit assessment** — Portfolio Lead reviews against current portfolio strategy. Is this aligned?
- [ ] **Resource assessment** — Portfolio Lead checks if the required resources are available (people, infrastructure, budget).
- [ ] **Risk assessment** — Are there portfolio-level risks this introduces (e.g. tech stack conflict, compliance burden, single-person dependency)?
- [ ] **Decision** — Portfolio Owner approves, modifies, or declines.

### Decision artefacts

For every intake decision:

- Recorded as a decision in the portfolio's RAIDD log (project_id = 'portfolio').
- Rationale captured even for declines (so future similar proposals can reference).
- Linked to the proposal document.

---

## Project retirement / closure / pause

A project leaves the active portfolio via one of three paths:

### Closure

The project is complete. Successful or otherwise.

- [ ] Closure report written (`templates/13_project-closure.md` when available, or freeform).
- [ ] Lessons propagated to the portfolio lessons database.
- [ ] Deployment continues (if applicable) under maintenance only.
- [ ] Documentation archived in Drive.
- [ ] Status changed to CLOSED in this document.

### Pause

The project is dormant but may resume.

- [ ] Pause rationale captured (decision entry).
- [ ] Pause review date set (typically 1–3 months out).
- [ ] Infrastructure either continues running (if cheap) or is suspended with restoration documented.
- [ ] Status changed to PAUSED in this document.

### Sunset

The project is being deliberately retired.

- [ ] Sunset plan written (data export, deployment shutdown, infrastructure deletion).
- [ ] Stakeholders notified.
- [ ] Final lessons captured.
- [ ] Infrastructure decommissioned.
- [ ] Status changed to SUNSET in this document.

---

## Linked documents

- Per-project roles: each project's `10_project-roles.md`
- Portfolio RAIDD log: tracker entries with `project_id = 'portfolio'`
- Portfolio dashboard: [link to live dashboard]
- Skills library: `https://github.com/[org]/ai-solutions-skills` (or equivalent)
- Templates library: this folder
- Stakeholder comms plan: `templates/11_stakeholder-comms-plan.md`

---

## Hard rules

1. **The portfolio has ONE owner.** Multiple owners = no owner.
2. **Every project in the portfolio has a known status.** No "unclear" entries. Update or close.
3. **No project is silently parked.** Pauses are decisions, captured as such.
4. **Resource conflicts are logged.** Patterns over time matter more than individual disputes.
5. **Lessons propagate to standing docs.** A lesson logged but not encoded in a skill, template, or SOP is a lesson that won't be applied next time.

---

## When NOT to use this document

If your portfolio has 1–2 projects, this document is overkill. Run the projects with per-project roles only. Adopt portfolio-level governance when:

- You have 3+ concurrent active projects.
- You have shared people across projects.
- You have shared infrastructure across projects.
- You have external stakeholders asking "how's the overall portfolio doing?"
- You're hiring or scaling.

Premature portfolio governance is bureaucracy. Late portfolio governance is chaos.

---

## Change log

| Date | Change | By |
|---|---|---|
| [YYYY-MM-DD] | Document created. | [Name] |

---

**End of portfolio roles template.**
