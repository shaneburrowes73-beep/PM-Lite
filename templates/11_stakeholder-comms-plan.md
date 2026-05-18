# [Project Name] — Stakeholder Communication Plan

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Project Lead]

---

## Why this document exists

Projects fail more often from communication breakdown than from technical failure. A sponsor who doesn't know the project is in trouble can't help. A team member who doesn't know about a scope change does the wrong work. An external stakeholder who doesn't get a promised update assumes the worst.

This document defines:

- Who needs to know what about this project.
- In what format they get it.
- How often they get it.
- Who produces it.

It is the project's communication contract. Set up at project initiation, reviewed monthly, updated whenever stakeholders change.

---

## Stakeholder inventory

Every stakeholder gets ONE row in this table. No exceptions, no "miscellaneous" entries.

| Stakeholder | Tier | Update format | Cadence | Owner | Last update |
|---|---|---|---|---|---|
| [Sponsor name] | Sponsor | Monthly status report + ad-hoc on critical issues | Monthly + as-needed | Project Lead | [YYYY-MM-DD] |
| [Client primary contact] | Client | Weekly email digest | Weekly Friday | Project Lead | [YYYY-MM-DD] |
| [Internal team] | Team | Slack #project channel | Continuous | Self-service | n/a |
| [Backup decider] | Sponsor (backup) | CC'd on monthly report | Monthly | Project Lead | [YYYY-MM-DD] |
| [Compliance / legal] | Informed | Quarterly summary | Quarterly | Project Lead | [YYYY-MM-DD] |
| [End users / pilot group] | Beneficiary | In-product changelog | On release | Product Lead | [YYYY-MM-DD] |
| [Investor / board] | Informed | Aggregated portfolio report | Monthly | Portfolio Lead | [YYYY-MM-DD] |

---

## Stakeholder tiers

Standardised tiers used in the table above:

### Tier 1 — Sponsor

Funds the project, owns success criteria, holds final decision authority. Typically 1 person.

- **Cadence:** Monthly structured report + ad-hoc on critical issues.
- **Format:** Written report (status template) + monthly call.
- **What they need:** RAG status, key risks, what they need to decide.
- **What they DON'T need:** Daily detail, team-internal discussions.

### Tier 2 — Client / Customer

External party paying for the work (if different from Sponsor). Typically 1–3 people.

- **Cadence:** Weekly email or call.
- **Format:** Brief digest with progress, blockers, asks.
- **What they need:** Visibility into delivery, early warning of issues.
- **What they DON'T need:** Internal arguments, technical detail unless they want it.

### Tier 3 — Team

Anyone doing the work. Continuous communication via working channels.

- **Cadence:** Continuous (Slack, daily standup, weekly sync).
- **Format:** Working channels, meetings, tracker.
- **What they need:** Context to do their work, awareness of others' work.

### Tier 4 — Consulted

People whose input is sought before significant decisions but who don't make decisions themselves.

- **Cadence:** Ad-hoc, triggered by need.
- **Format:** Specific consultation (meeting, review request).
- **What they need:** Enough context to give useful input.

### Tier 5 — Informed

People who need to know after the fact but don't need input opportunity.

- **Cadence:** Periodic summary (monthly or milestone-based).
- **Format:** Email digest or shared dashboard link.
- **What they need:** Enough to not be surprised.

---

## Update formats — when to use which

### Monthly status report

For Sponsors and Tier 5 Informed stakeholders. Uses `templates/12_status-report.md`.

- RAG status overall and by workstream.
- Achievements since last report.
- Issues / blockers.
- Next month focus.
- Help needed.

### Weekly digest email

For Clients (Tier 2). Shorter than monthly report.

- 3 bullet points on progress.
- 1 line on next week's focus.
- Any asks (decisions needed, info needed).
- Length: ≤200 words.

### Slack / working channel updates

For Team (Tier 3). Continuous, informal.

- Daily standups (if remote team).
- #project channel for async updates.
- Tracker for formal state.

### Ad-hoc consultation requests

For Consulted (Tier 4). Specific, time-bound.

- Subject line: "Consultation request — [topic] — by [date]".
- Context, options, decision needed, deadline.

### Quarterly summary

For low-priority Informed (Tier 5). Aggregates 3 months of monthly reports.

### In-product changelog / release notes

For Beneficiaries (end users). On each release.

### Crisis communication

For all stakeholders when something breaks. Pre-templated. See `templates/04_incident-response.md`.

---

## Cadence calendar

Visualise the rhythm:

| Week | Monday | Tuesday | Wednesday | Thursday | Friday |
|---|---|---|---|---|---|
| Wk 1 | Team standup | | | | Client digest |
| Wk 2 | Team standup | | | | Client digest + monthly sponsor report (1st Friday) |
| Wk 3 | Team standup | | | | Client digest |
| Wk 4 | Team standup | | | | Client digest |
| Wk 13 | | | | | Quarterly summary (end of quarter) |

Adjust this table to match your project's actual cadence.

---

## Communication discipline rules

1. **Promised cadence is non-negotiable.** If Sponsor is promised monthly reports, they get monthly reports — even if the report is "nothing significant changed this month".

2. **Silence implies bad news.** If a stakeholder doesn't hear from you, they assume the worst. Continuous low-effort updates beat sporadic high-effort ones.

3. **Bad news travels faster.** When something goes wrong, the stakeholder hears within 24 hours — not in next month's report.

4. **Right channel for right information.** A critical risk to delivery is not a Slack message. A status update is not a phone call.

5. **One-way vs two-way.** Status reports are one-way (we tell you). Consultations are two-way (we ask). Be clear which you're sending.

6. **Don't surprise the Sponsor.** Anything the Sponsor would want to hear from you, they should hear from you first — not from gossip, competitors, or news.

---

## Anti-patterns

### Anti-pattern: The disappearing update

Promised weekly digest doesn't go out for 3 weeks. Recovery takes 4 weeks of over-communication to rebuild trust.

### Anti-pattern: The crisis-only update

Stakeholders only hear from you when something is wrong. They learn to dread your name in their inbox.

### Anti-pattern: The fire-hose

Every Sponsor gets every Slack message. Within 2 weeks they mute the channel. Now you have no channel.

### Anti-pattern: The bcc surprise

Critical news communicated via a quietly-bcc'd email. Recipients feel ambushed. Use direct, owned communication.

### Anti-pattern: The verbal commitment

Decision communicated verbally in a meeting, never written down. 3 months later, 3 different recollections.

### Anti-pattern: The wall of email

200-word digest balloons into 2000 words because "let's include everything to be safe". Nobody reads it.

---

## How to handle change

### Adding a stakeholder

1. Add row to the inventory.
2. Determine their tier.
3. Set cadence and format.
4. Notify them of inclusion and what to expect.
5. Send first update to onboard them.

### Removing a stakeholder

1. Send final update acknowledging the change.
2. Mark row as "as of [date], no longer receiving updates".
3. Don't delete the row — preserves history for audit.

### Promoting / demoting tier

1. Capture rationale (often tied to project status change).
2. Communicate the change explicitly to the stakeholder ("We're moving to weekly updates given the recent escalation").
3. Update table.

---

## Linked documents

- `templates/09_meeting-protocol.md` — meeting outputs feed into stakeholder updates.
- `templates/10_project-roles.md` — most stakeholders are also defined as roles.
- `templates/12_status-report.md` — the monthly report format.
- `templates/04_incident-response.md` — crisis communication.

---

## Minimum viable for solo founders

Solo founders often think this template doesn't apply. It does — the stakeholders are just different:

- Sponsor = your investors, advisors, or yourself with a "future self" lens.
- Client = your paying customers (or yourself if pre-revenue).
- Team = future hires, contractors, or yourself.
- Informed = your accountability partner, mentor, or audience (if you build in public).

The discipline of writing structured updates — even just to yourself — externalises your thinking. Solo founders who skip stakeholder comms lose the ability to look back and understand "what was I thinking 6 months ago?".

---

## Change log

| Date | Change | By |
|---|---|---|
| [YYYY-MM-DD] | Document created. | [Name] |

---

**End of stakeholder communication plan template.**
