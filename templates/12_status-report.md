# [Project Name] — Status Report — [Period: YYYY-MM]

**Reporting period:** [start date] — [end date]
**Reporting cadence:** Monthly (default) / Weekly / Milestone-based
**Prepared by:** [Name]
**Distribution:** [list per stakeholder comms plan]
**Date issued:** [YYYY-MM-DD]

---

## RAG status

### Overall

**🟢 GREEN** / **🟡 AMBER** / **🔴 RED** — [delete two]

[2–3 sentences justifying the status. Specific, not generic.]

### By workstream (if multi-workstream project)

| Workstream | RAG | Trend | One-line summary |
|---|---|---|---|
| [Workstream 1] | 🟢 GREEN | → stable / ↑ improving / ↓ worsening | [Short summary] |
| [Workstream 2] | 🟡 AMBER | ↓ worsening | [Short summary] |
| [Workstream 3] | 🟢 GREEN | ↑ improving | [Short summary] |

---

## RAG criteria — reference

For consistency across reports, the project uses these RAG definitions:

| Status | Definition |
|---|---|
| 🟢 **GREEN** | On track. No critical issues. Risks are managed. Scope, time, and budget all within tolerance. |
| 🟡 **AMBER** | At risk. One or more issues need attention. Recovery is possible with current resources. Stakeholder awareness recommended. |
| 🔴 **RED** | Off track. Significant issues. Recovery requires additional resources, scope change, or sponsor decision. Stakeholder action required. |

A move from GREEN to AMBER or AMBER to RED should never be a surprise — the report that announces it should describe what changed, when, and what's being done.

---

## Headline (what the Sponsor needs to know if they read nothing else)

[1 paragraph. The single most important thing about this project right now. Could be progress, could be a problem, could be a request. Lead with what the Sponsor needs to act on or be aware of.]

---

## Achievements since last report

What the project has actually completed in this period. Be concrete — link to evidence where possible.

- ✅ [Achievement 1] — [evidence: link to demo, document, deployment]
- ✅ [Achievement 2] — [evidence]
- ✅ [Achievement 3] — [evidence]

Aim for 3–5 bullets. If you have 10+, you're including too much detail. If you have 0, the report says so honestly.

---

## Issues / blockers

Active issues affecting delivery. Each links to the corresponding RAIDD entry in the tracker.

| ID | Title | Severity | Status | Owner | Notes |
|---|---|---|---|---|---|
| I-NNN | [title] | high | open | [Name] | [What's being done] |
| I-NNN | [title] | medium | mitigated | [Name] | [What was done] |

If no open issues, write "None this period". Don't pad.

---

## Risks (top 3 — full list in tracker)

The most material risks to delivery, NOT a full risk register dump.

| ID | Title | Severity | Likelihood | Mitigation | Owner |
|---|---|---|---|---|---|
| R-NNN | [title] | high | medium | [What we're doing] | [Name] |
| R-NNN | [title] | medium | low | [What we're doing] | [Name] |
| R-NNN | [title] | medium | medium | [What we're doing] | [Name] |

---

## Decisions made this period

Significant decisions captured in the tracker.

| ID | Decision | Date | Owner |
|---|---|---|---|
| D-NNN | [Decision] | [date] | [Name] |

---

## Help needed from Sponsor

The single most actionable section. What does the Sponsor need to do, decide, or unblock?

- [ ] **[Action / decision needed]** — by [date] — [why it matters]
- [ ] **[Action / decision needed]** — by [date]

If no help is needed, write "Nothing this period". This is rare — usually there's at least one thing.

---

## Next period focus

Top 3 priorities for the next period. Not a full work plan — the headline focus areas.

1. **[Focus area 1]** — [what success looks like]
2. **[Focus area 2]** — [what success looks like]
3. **[Focus area 3]** — [what success looks like]

---

## Metrics dashboard

Quantitative measures. Specific to the project. Examples below — replace with your project's actual metrics.

| Metric | Last period | This period | Target | Trend |
|---|---|---|---|---|
| [e.g. Active users] | 24 | 31 | 50 by Q3 | ↑ |
| [e.g. Open issues] | 8 | 5 | <10 | ↓ |
| [e.g. Test coverage] | 67% | 72% | 80% | ↑ |
| [e.g. Monthly spend] | £42 | £45 | <£100 | → |

If your project doesn't yet have meaningful metrics, write "Metrics not yet defined — to be agreed by [date]". Don't fabricate metrics to fill the section.

---

## Budget and burn (if applicable)

| Item | Budgeted | Spent to date | Remaining | % consumed |
|---|---|---|---|---|
| [Workstream 1] | £X | £Y | £Z | N% |
| [Workstream 2] | £X | £Y | £Z | N% |
| **Total** | **£X** | **£Y** | **£Z** | **N%** |

Note any variance >10% explicitly.

---

## Timeline status (if applicable)

| Milestone | Planned date | Forecast date | Status |
|---|---|---|---|
| [Milestone 1] | [date] | [date] | On track / Slipped X days |
| [Milestone 2] | [date] | [date] | On track / At risk |
| [Milestone 3] | [date] | [date] | On track |

---

## Stakeholder changes

If the stakeholder set has changed this period (someone joined, left, changed tier), note it here. Otherwise omit this section.

| Change | Who | When | Impact |
|---|---|---|---|
| [Change description] | [Name] | [date] | [What it means for the project] |

---

## Appendices (optional, link don't embed)

- [Link to recent demo / screencast]
- [Link to detailed RAIDD entries in the tracker]
- [Link to recent meeting minutes]
- [Link to budget detail]

Keep the main report ≤2 pages. Detail lives in linked documents.

---

## Notes on this template

### Cadence

- **Default:** Monthly, first business day of each month, covering the previous month.
- **Weekly:** For high-intensity projects (typically <3 months total duration, or in crisis recovery).
- **Milestone-based:** For projects with infrequent but significant milestones (e.g. quarterly product releases).

### Length

Two pages maximum. If it's longer, you're including detail that belongs in linked documents or in the tracker itself.

### Tone

Direct. Honest. Specific. Avoid "good progress" if you mean "we missed two deadlines but still believe we'll catch up". The point of the report is to convey actual state, not to manage Sponsor's feelings.

### Anti-patterns

- ❌ "Good progress" without specifics
- ❌ Hiding bad news in appendix B
- ❌ Status that doesn't change month-on-month (means the project is dead and nobody is admitting it)
- ❌ 5-page reports nobody reads
- ❌ Reports that go out 2 weeks after the period closes
- ❌ Marking everything GREEN when you know things are AMBER
- ❌ Listing every minor issue (use the tracker; report headlines only)

### Automated population

For projects using the AI Solutions tracker, the following sections can auto-populate from RAIDD entries:

- "Issues / blockers" — query: `raidd_entries where type='issue' and status='open'`
- "Risks (top 3)" — query: `raidd_entries where type='risk' and status in ('open','active') order by severity desc, likelihood desc limit 3`
- "Decisions made this period" — query: `raidd_entries where type='decision' and opened_date between [start] and [end]`

Future n8n workflow `tracker-to-status-report` can generate a first-draft report from tracker data on the 1st of each month. Spec in `docs/AI_WORKFLOW_TRACKER_TO_STATUS_REPORT.md` (when written).

---

## Linked documents

- `templates/11_stakeholder-comms-plan.md` — who receives this report.
- `templates/07_raidd-log.md` — RAIDD entries this report references.
- `templates/09_meeting-protocol.md` — meeting outputs feed this report.

---

**End of status report template.**

---

# Example — first month status report (fictional)

This is what a completed status report looks like. Delete this section before using the template for a real project.

---

## RAG status

### Overall

**🟡 AMBER**

The product alpha was delivered on time, but onboarding completion is at 45% vs the 70% target. Two specific UX issues have been identified and are being addressed. Recovery confidence is high — expected back to GREEN within 30 days.

### By workstream

| Workstream | RAG | Trend | One-line summary |
|---|---|---|---|
| Engineering | 🟢 GREEN | → stable | Alpha deployed, no critical bugs |
| Onboarding UX | 🟡 AMBER | ↓ worsening | Completion rate below target — investigating |
| Support docs | 🟢 GREEN | ↑ improving | All v1.0 docs published |

## Headline

The alpha launched on schedule, but onboarding drop-off is higher than expected. Two specific friction points identified (signup confirmation email delay, ambiguous "next step" CTA). Fix ETA: 14 days. Sponsor decision needed: whether to extend the alpha period by 2 weeks to validate fixes before beta launch.

## Achievements since last report

- ✅ Alpha v1.0 deployed to 30 pilot users — [link to release notes]
- ✅ Tracker UI live with full RAIDD + Lessons functionality
- ✅ First batch of feedback collected (12 responses, avg score 7.8/10)
- ✅ Documentation set complete and on GitHub

## Issues / blockers

| ID | Title | Severity | Status | Owner | Notes |
|---|---|---|---|---|---|
| I-007 | Onboarding completion 45% vs 70% target | high | open | Product Lead | Two friction points identified; fix ETA 14 days |
| I-008 | Email confirmation delay (avg 4 min) | medium | open | Tech Lead | Likely SMTP rate limit; investigating |

## Help needed from Sponsor

- [ ] **Decision: extend alpha period by 2 weeks?** — by 2026-05-25 — depends on accepting the AMBER status of onboarding metrics
- [ ] **Approval to onboard 20 additional pilot users** — by 2026-05-30 — depends on fix landing

## Next period focus

1. **Resolve onboarding friction** — completion rate to ≥65% within 30 days
2. **Fix email confirmation delay** — sub-60-second target
3. **Begin beta planning** — beta entry criteria + first beta cohort identified

---

**End of example.**
