# [Project Name] — Meeting Protocol

**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Owner:** [Name]

---

## Why this document exists

A meeting that doesn't produce a documented output is a meeting that may as well not have happened. Within 48 hours, recall degrades; within 2 weeks, the meeting is reconstructed differently by every person who was there.

This protocol describes:

- How a meeting is run (agenda, attendees, time-boxing)
- What output a meeting produces (minutes + RAIDD entries)
- How meeting output feeds the tracker
- The review cadence to keep open actions from going stale

It is deliberately small. ~30 minutes per meeting to follow fully. Most of that is automated when AI tools (Fireflies, Otter, Granola, Read.ai) are used.

This template is tool-agnostic. Whether a human takes notes or an AI assistant attends and produces them, the OUTPUTS must meet the standard below.

---

## The pipeline

```
Meeting → Minutes doc (lightweight) → RAIDD entries (formal) → Tracker → Review → Close
```

Every meeting feeds the tracker. The tracker is the system of record; minutes are the source document.

---

## Phase 1 — Pre-meeting (≥24 hours before)

### Agenda

- [ ] Agenda written and circulated ≥24 hours before the meeting.
- [ ] Each agenda item has a target outcome (decision / risk surfaced / status update / brainstorm).
- [ ] Each agenda item has an estimated time.
- [ ] Total estimated time ≤ scheduled duration (with 10% slack).

### Attendees

- [ ] Attendee list confirmed.
- [ ] Each attendee has a clear reason to be there (decider, contributor, informed-of-outcome).
- [ ] If anyone is informed-only, consider sending a summary instead of inviting them.

### Pre-reading

- [ ] Any materials needed for informed discussion are attached or linked.
- [ ] Long documents have a TL;DR (≤200 words) at the top.

### AI assistant configuration

If using Fireflies/Otter/Granola/Read.ai:

- [ ] Calendar event includes the AI assistant's join address (or the AI is configured to auto-join).
- [ ] Recording disclosure is added to the meeting invite ("This meeting will be recorded and transcribed by [tool]").
- [ ] Sensitive meetings (HR, legal, M&A, individual performance) — DISABLE the AI assistant. See "Privacy considerations" at the bottom.

---

## Phase 2 — During the meeting

### Note-taking pattern

Whether human or AI is taking notes, capture these categories:

| Category | What to capture | What to ignore |
|---|---|---|
| **Decisions** | The decision, alternatives considered, rationale, dissenting views | Discussion that led nowhere |
| **Risks** | Anything that could derail delivery, with severity assessment | Hypothetical worries with no impact path |
| **Issues** | Something currently broken or wrong | Issues someone else already owns |
| **Dependencies** | External thing the project needs | Internal team activity (that's an action) |
| **Actions** | Delivery-critical follow-ups, with named owner and date | Ambient tasks ("book the room") |
| **Lessons** | Patterns worth carrying to future projects | One-off observations |
| **Parking lot** | Important but off-topic items for a later meeting | Tangential debates |

### Discipline

- Time-box each agenda item. If discussion runs over, add to parking lot or schedule a follow-up.
- Decisions get captured verbatim where rationale matters (e.g. "decided X over Y because of Z").
- Actions get an owner BEFORE the meeting moves on. "TBD owner" is not acceptable.
- Risks/issues raised but not assessed get a temporary severity of "to assess" with a 24-hour close-out.

### Roles

- **Chair / facilitator** — runs the agenda, keeps time, prompts for decisions.
- **Note-taker** (or AI assistant) — captures the categories above. The chair is rarely the right person for this.
- **Decider(s)** — named in advance for any decision on the agenda.

---

## Phase 3 — Post-meeting (within 24 hours)

This is the most important phase. The discipline of consistent post-meeting work is what separates "meetings that improve delivery" from "meetings that consume time".

### Step 1 — Minutes finalised (within 4 hours)

The minutes doc gets cleaned up from raw notes (or AI transcript) into the format below. Filter ruthlessly:

- Verbatim transcripts ARE NOT minutes. They are evidence; minutes are the summary.
- Side conversations don't make minutes unless they affected delivery.
- Identifiable individual feedback (about a person, not the work) does NOT go in minutes.

### Step 2 — RAIDD entries created (within 24 hours)

For each item identified in the meeting:

| Item type | Goes to tracker as |
|---|---|
| Decision made | `raidd_entries` row, `type='decision'` |
| Risk surfaced | `raidd_entries` row, `type='risk'` |
| Issue raised | `raidd_entries` row, `type='issue'` |
| Dependency identified | `raidd_entries` row, `type='dependency'` |
| Assumption made | `raidd_entries` row, `type='assumption'` |
| Action (delivery-critical) | `action_or_mitigation` field on the relevant Risk or Issue entry |
| Lesson identified | `lessons_entries` row |
| Ambient action (book a room, etc.) | Minutes only — does NOT enter the tracker |
| Parking lot item | Re-added to the next meeting's agenda |

Source attribution: each new RAIDD entry should reference the meeting in its `source_doc` field (e.g. "Project meeting 2026-05-15 minutes — [Drive URL]").

### Step 3 — Minutes circulated (within 24 hours)

Sent to all attendees PLUS any stakeholders in the "informed" tier per the stakeholder comms plan.

Format: link to the Drive doc (don't email the full text — leads to versioning chaos).

### Step 4 — Open actions visible

Every action created in the meeting appears in the tracker's open-items view by end of day. If you can't see it there, the meeting didn't actually update the tracker.

---

## Phase 4 — Review cadence

### Weekly (≤15 minutes)

- [ ] Open the tracker's "Open items" view filtered by `owner = me`.
- [ ] For each item: still active? Still mine? Still the right priority?
- [ ] Update statuses for anything that's moved.

### Monthly (≤45 minutes)

- [ ] Open the tracker's "Open items" view filtered by project.
- [ ] Identify items older than 30 days with no status change. Force close-out:
  - Resolve (the action is done).
  - Re-scope (the action is partly done; what's the next step?).
  - Withdraw (the action no longer makes sense).
- [ ] Any items still open after this review get explicit re-validation.

### Quarterly (≤90 minutes)

- [ ] Review all `active` decisions. Still active?
- [ ] Review all `active` lessons. Still propagated to standing docs?
- [ ] Review parking-lot items. Anything to retire?

---

## Minutes format

Use this exact structure. The agenda items match minutes section headings.

```markdown
# [Project] meeting — [date]

**Attendees:** [list with roles]
**Duration:** [actual time, not scheduled]
**Recording:** [link if any]
**AI assistant:** [tool name + agent ID if any]
**Minutes prepared by:** [name or AI tool]
**Minutes finalised:** [date — must be within 24 hours of meeting]

## Summary

[2–3 sentences. What was the meeting actually about? What was the most significant output?]

## Decisions

| ID | Decision | Owner | Date |
|---|---|---|---|
| D-NNN | [decided X over Y because Z — link to fuller entry in tracker] | [name] | [date] |

## Risks / Issues / Dependencies / Assumptions raised

| ID | Type | Title | Severity | Owner |
|---|---|---|---|---|
| R-NNN | risk | [title] | medium | [name] |

## Actions (delivery-critical only)

Actions are NOT standalone items — they attach to a Risk or Issue in the tracker.

| Action | Linked RAIDD entry | Owner | Due | Status |
|---|---|---|---|---|
| [action] | I-NNN | [name] | [YYYY-MM-DD] | open |

## Lessons identified

[Bullet list — see lessons-learned.md for full entry format]

## Parking lot

[Items raised but not addressed. Each will be re-added to the next meeting agenda or explicitly retired.]

## Distribution

[Attendees + Informed stakeholders per the stakeholder comms plan]
```

---

## Hard rules

1. **Every action has a named owner.** No "TBD". If unknown at meeting end, the chair owns it provisionally.
2. **Every action has a due date.** "When possible" is not a date.
3. **Minutes circulated within 24 hours.** Beyond that, recall degrades and the meeting may as well not have happened.
4. **No parking-lot creep.** Items in the parking lot get addressed within 2 meetings or are explicitly retired.
5. **No orphan actions.** Every delivery-critical action belongs to a RAIDD entry. If you can't find one to attach it to, you may have missed creating one.
6. **The agenda IS the minutes structure.** Section headings in minutes match agenda items.
7. **Actions assigned to individuals, not teams.** "The team will look at it" is not an action.
8. **No re-litigating closed decisions.** A wrong decision gets superseded with a new decision entry, not argued with again.

---

## Anti-patterns

These are common failure modes. Watch for them.

### Anti-pattern: The verbatim transcript

A 12-page transcript of who said what is not minutes. It is unreadable and nobody references it. Minutes should be ≤1 page for a typical 60-minute meeting.

### Anti-pattern: The standing action

"Shane to follow up with sponsor" — no due date, no acceptance criteria. After 3 months it's still open. Either give it a date and acceptance criteria, or it's not really an action.

### Anti-pattern: The vanishing decision

A choice gets made in the room but no decision entry is created. 6 weeks later, nobody can remember the rationale and the team re-debates it.

### Anti-pattern: The team-owned action

"The team will look at it" — nobody actually owns it. Always an individual, even if that individual then delegates internally.

### Anti-pattern: The parking-lot graveyard

Items added to parking lot every meeting, never addressed. Within 6 meetings the parking lot has 47 items. Solution: address within 2 meetings or explicitly retire.

### Anti-pattern: The minutes lag

Meeting on Monday, minutes circulated the following Monday. By then everyone has re-imagined what was decided. 24-hour rule is non-negotiable for high-stakes meetings.

### Anti-pattern: Re-litigating closed decisions

The team "decided" X, but at every subsequent meeting someone re-raises it. Either supersede with a new decision (formally), or move on. Don't drift back to the old debate.

### Anti-pattern: AI-generated minutes pasted without editing

The AI assistant produced 4 pages of transcript-style notes. Nobody reads them, nobody filters them, the RAIDD entries are never created. AI saves time on capture but humans still own filtering and routing.

---

## AI assistant guidance

### Recommended tools

| Need | Tool | Notes |
|---|---|---|
| Auto-join + transcribe Zoom/Meet/Teams | Fireflies.ai or Otter.ai | Both have free tiers; Fireflies has better Zoom integration |
| On-device note-taking (no bot in call) | Granola (Mac only) or Read.ai | Better for confidential meetings |
| Action item extraction | All of the above | Modern LLMs handle this well |

### Configuring AI assistance properly

For each AI tool used:

- [ ] Disclosure added to meeting invite.
- [ ] Recording retention policy understood (where does the transcript live, for how long).
- [ ] Compliance checked against your data residency / GDPR / sectoral requirements.
- [ ] Sensitive meetings DISABLED from AI capture.

### Workflow integration

For projects using this template alongside the AI Solutions tracker, an n8n workflow (`meeting-minutes-to-raidd`) auto-extracts RAIDD candidates from minutes. See `docs/AI_WORKFLOW_MEETING_TO_RAIDD.md` for the full spec and configuration.

The workflow:

1. Receives a webhook from Fireflies/Otter/manual trigger.
2. Fetches the minutes/transcript.
3. Uses an LLM to extract RAIDD candidates per the routing rules above.
4. Posts to a Slack channel for human approval.
5. On approval, inserts into `raidd_entries`.

Human-in-the-loop is mandatory. The AI proposes; humans approve.

---

## Privacy considerations

### When to disable AI recording entirely

- HR conversations (performance, hiring, firing, salary)
- Legal discussions covered by privilege
- Therapeutic / coaching conversations
- M&A or other strategically sensitive material
- Anything where attendees can't all consent

### Disclosure requirements

In many jurisdictions, recording a meeting requires consent. Always:

- [ ] Add a recording disclosure to the meeting invite.
- [ ] At the start of the meeting, the chair confirms recording is active.
- [ ] Any attendee can request the recording be stopped.

### Data residency

- Fireflies and Otter store transcripts on their cloud (US-based by default). Check against your data residency obligations.
- Granola/Read.ai are local-first (better for confidential meetings) but limited to specific operating systems.
- For sensitive meetings, prefer human-only minutes.

---

## Minimum viable for solo founders

This template is designed for studio/agency teams with multiple stakeholders. For solo founders, the protocol simplifies but doesn't disappear:

- "Meetings" become "decision sessions" — 30 minutes where you make a deliberate choice rather than reactively.
- Minutes are abbreviated — 1 paragraph instead of full sections.
- RAIDD entries are still mandatory — the discipline of capturing rationale matters more when you're alone (no team memory).
- Review cadence reduces — monthly only.
- AI assistance is optional — Granola or Read.ai work well for "meetings with yourself" if you record your own thinking aloud.

The point is to externalise your reasoning so it's queryable later. Solo founders who skip this step lose hours every month re-deriving conclusions they already reached.

---

## Linked documents

- `templates/03_decision-log.md` — decision entry format.
- `templates/07_raidd-log.md` — RAIDD entry format.
- `templates/08_lessons-learned.md` — lessons format.
- `templates/10_project-roles.md` — owner hierarchy and escalation.
- `templates/10b_portfolio-roles.md` — portfolio-level roles (if applicable).
- `templates/11_stakeholder-comms-plan.md` — distribution lists.
- `docs/AI_WORKFLOW_MEETING_TO_RAIDD.md` — n8n workflow spec.

---

## Change log

| Date | Change | By |
|---|---|---|
| [YYYY-MM-DD] | Document created. | [Name] |

---

**End of meeting protocol template.**
