# [Project Name] — Triage Guidance

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Date:** [YYYY-MM-DD]
**Project ID:** [slug, e.g. `pm-lite`]
**Authors:** [Names]

---

## Why this document exists

Triage is the discipline of deciding, when something arrives at the project: **is this our problem, what kind, who handles it, and how urgent?**

Without explicit triage:
1. **Everything becomes "urgent."** Every issue, request, and question gets the same panicked response, which means none of them get the right one.
2. **The wrong people get pulled in.** A simple support request escalates to the project lead; a genuine production incident gets stuck in someone's inbox.
3. **"It's not our problem" becomes a fight.** Without a documented rule, the question "is this warranty or new work?" / "is this an incident or a feature request?" becomes adversarial.

PM Lite uses triage in four places:
- **Warranty issues** (per `15_warranty-and-bau-handover.md` §4) — is it covered by warranty or routed elsewhere?
- **Incidents** (per `04_incident-response.md`) — what severity, who's on call?
- **Scope decisions** (per `03_decision-log.md`) — is this within tolerance or does it need sponsor approval?
- **Lessons** (per `08_lessons-learned.md`) — is this a one-off or a pattern worth capturing?

Rather than each document defining triage independently (and risking inconsistency), this template defines the **general discipline** once and the four documents above point at it.

For non-PM readers: triage is the first 5 minutes after something lands. Get that 5 minutes right, and the next hour follows naturally.

---

## 1. The triage question hierarchy

When ANY new thing arrives — issue, request, alert, query — answer these questions in order. Stop at the first "no" or "yes" that gives you a routing decision.

```
1. Is it real? (Or is this a duplicate / known-and-accepted / out-of-scope-by-definition?)
   ├── No → close with reference to the existing record
   └── Yes → continue
       
2. Is it urgent? (Will the system / business / customer fail if we delay 24h?)
   ├── Yes → incident workflow (04_incident-response.md)
   └── No → continue
       
3. Is it covered? (By warranty, by an existing decision, by an existing scope agreement?)
   ├── Yes → handle in the covering document's process
   └── No → continue
       
4. Is it a new request? (Something not previously agreed?)
   ├── Yes → scope decision (03_decision-log.md)
   └── No → it's an ambient/edge case — log and review at next cadence
```

Each step has a named destination. No item should sit unrouted for more than the triage SLA defined in §4.

---

## 2. Triage categories

PM Lite uses five canonical triage categories. Every item that comes through triage gets exactly one of these.

| Category | Definition | Routes to | Owner during handling |
|---|---|---|---|
| **Incident** | Something is broken or imminently will be. Production-affecting. | `04_incident-response.md` | On-call per `10_project-roles.md` |
| **Warranty** | A defect in delivered work, raised during warranty period | `15_warranty-and-bau-handover.md` §4 | Project lead |
| **Scope decision** | A new request or change that wasn't previously agreed | `03_decision-log.md` | Sponsor (for major) or Project Lead (for minor) |
| **Known-and-accepted** | An issue / risk that was previously logged and consciously accepted | Existing RAIDD entry | Original owner |
| **Out of scope** | Falls outside the project's agreed scope per the PID | Escalation or polite decline | Project Lead |

A sixth implicit category exists: **Lesson** — a pattern noticed during triage that should be captured in `08_lessons-learned.md`. This isn't a routing destination; it's a side-effect of triage. Capture it without slowing down the primary routing.

---

## 3. Who runs triage and when

This section answers the four most common questions about triage operations: **who, when (lifecycle), when (cadence), and what kind of triage event are we talking about.**

### 3.1 Two distinct triage activities

PM Lite distinguishes two activities. They are NOT the same thing and should not be conflated:

| Activity | What it is | Who is involved | Frequency |
|---|---|---|---|
| **Per-item triage** | The 2-minute routing decision when something arrives — categorise, set severity, route | **Single person: the triage manager** (see §3.3). No attendees. No meeting. | On arrival, per item, within the SLA in §4 |
| **Triage backlog review meeting** | A short recurring meeting to walk the recent triage backlog, surface patterns, and reconcile disputes | Triage manager + ops representative + tech lead (see §3.4) | Weekly during high-activity phases; monthly during low-activity phases (see §3.5) |

**Per-item triage is a solo decision.** Triage by committee is one of the anti-patterns flagged in §8 — it wastes 5 people's time to make a 2-minute decision.

**The backlog review meeting is where the team aligns**, not where individual items get routed.

### 3.2 When in the project lifecycle does triage start?

**Triage runs from Phase A onward** (per `01_apply-order.md`) — as soon as the project starts producing artefacts that can have issues raised against them. The volume, formality, and stakes scale up through the lifecycle:

| Phase | Triage formality | Typical volume | Typical issues triaged |
|---|---|---|---|
| **Phase A — Setup** | Light, informal | Low (<2/week) | Credential issues, repo permissions, account access |
| **Phase B — Core build** | Medium | Medium (2-10/week) | Internal bugs, scope questions, dependency blockers |
| **Phase C — Testing** | **High — formal triage essential here** | Medium-high | UAT defects, external feedback, regression bugs |
| **Phase D — Deploy** | **High — severity discipline critical** | Spike then drop | Deployment incidents, production issues |
| **Phase E — Handover** | Medium | Low | Knowledge gaps, runbook errors |
| **Warranty** | **High — triage IS the central discipline** | Variable | Per `15_warranty-and-bau-handover.md` §4 |
| **BAU** | High — but ops team owns | Variable | Standard ops triage |

The discipline starts at Phase A. The formality scales. Buyers should not wait until Phase C to start triaging — the habit takes time to bed in, and waiting until external feedback arrives means the team is learning triage under pressure.

### 3.3 Who manages triage (the triage manager role)

There is ONE named person responsible for triage at any given time. This is the **triage manager**. The role passes between people through the lifecycle:

| Phase | Triage manager | Why |
|---|---|---|
| Phases A–E | **Project lead** | Owns delivery; can route work to the team |
| Warranty period | **Project lead** | Still owns warranty obligations |
| BAU | **Operations lead** | Project team has disengaged; ops owns operational issues |

**Transition rule:** At BAU handover sign-off (per `15_warranty-and-bau-handover.md` §6), triage manager transfers from project lead to operations lead. This transfer is part of the BAU handover checklist:

- [ ] Triage manager role transferred from project lead to operations lead (date recorded)

If the project lead is unavailable for an extended period (vacation, sickness, departure), a **deputy triage manager** must be named explicitly. Default deputy: the person at row 2 of `10_project-roles.md`'s core team list. Document the deputy assignment in the project's status report; don't leave it implicit.

### 3.4 Triage backlog review meeting — attendees and roles

The recurring meeting (see §3.1) has explicit roles:

| Role | Who | Purpose |
|---|---|---|
| **Chair** | Triage manager (per §3.3) | Runs the meeting; final say on disputed items |
| **Required attendee** | Tech lead (or senior engineer on the project) | Brings the technical view: "can we actually do this?" |
| **Required attendee** | Ops representative (where applicable) | Brings the operational view: "can we actually run this?"; required from Phase C onward |
| **Optional attendee** | Sponsor delegate | Required only if a backlog item needs sponsor input that day |
| **Notetaker** | Triage manager OR delegate | Per `09_meeting-protocol.md` post-meeting routing rules |

**Hard rules for the meeting:**
1. **Time-boxed: 30 minutes maximum.** Triage isn't strategy; it's housekeeping.
2. **No items routed in the meeting** that haven't already had per-item triage. The meeting reviews the backlog of already-triaged items, not raw inbox.
3. **The meeting can override per-item triage decisions** (i.e., re-categorise something) but the override is documented in the triage record.
4. **The meeting produces RAIDD entries** for any patterns spotted, per `07_raidd-log.md`. Lessons surfaced go to `08_lessons-learned.md`.
5. **Recurring no-shows from required attendees** are themselves a triage backlog item — surface to sponsor if it persists more than 2 cycles.

### 3.5 Meeting cadence

| Phase | Meeting frequency | Duration | Rationale |
|---|---|---|---|
| Phase A | Monthly | 15 min | Low volume; meeting is more about discipline-building than backlog |
| Phase B | Bi-weekly | 30 min | Volume grows; weekly is overkill |
| Phase C — Testing | **Weekly** | 30 min | External feedback arrives; weekly cadence essential |
| Phase D — Deploy | **Weekly** (or daily during active deployment week) | 30 min | High-stakes; tighter is better |
| Phase E — Handover | Weekly | 30 min | Handover items surface fast |
| Warranty period | **Weekly** | 30 min | Triage is the central activity |
| BAU | Ops team's own cadence (typically weekly) | Per ops process | No longer a project meeting |

Buyers can amend per project (see §"Lifecycle cadence" guidance below).

---

## 4. Triage SLAs (per-item)

Default SLAs for per-item triage by category. These apply to the per-item activity in §3.1, NOT the backlog meeting.

| Category | First triage verdict | First action |
|---|---|---|
| **Incident — critical** | 30 minutes | Immediate; on-call paged |
| **Incident — high** | 2 business hours | Same day |
| **Incident — medium / low** | 1 business day | Within 3 business days |
| **Warranty** | 2 business days | Per warranty doc §4 |
| **Scope decision** | 5 business days | Per decision log §"Scope decisions" |
| **Known-and-accepted** | Same day | Link to existing entry; close |
| **Out of scope** | 2 business days | Polite decline OR escalate to sponsor |

**"First triage verdict"** = the time from item arrival to a documented categorisation. NOT the time to fix the underlying problem.

**"First action"** = the time from triage verdict to the first substantive action (page on-call, draft response, open scope decision, etc.).

---

## 5. Severity definitions (kit canonical)

This is the **canonical severity vocabulary** for the entire PM Lite kit. Every template that records severity (`07_raidd-log.md`, `08_lessons-learned.md`, `12_status-report.md`, `04_incident-response.md`, this document) uses these four lowercase values.

| Severity | What it means | Examples |
|---|---|---|
| **critical** | Production is down OR customer data is at risk OR active security breach | Site is 500-ing; database leak; auth bypass discovered |
| **high** | Major function broken OR a workaround exists but is unsustainable | Payments failing for a subset of users; key integration offline |
| **medium** | Function impaired but workable | Slow performance; one feature broken; cosmetic issues in critical flows |
| **low** | Minor impact OR cosmetic | Typos; non-critical UI issues; logging gaps |

**Incident-specific aliases:** `04_incident-response.md` uses `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` as shorthand for `critical` / `high` / `medium` / `low` respectively. These aliases are convenience-only for incident pagers and runbooks; the underlying values are the canonical lowercase form above.

Severity is decided at triage and may be revised. Revisions are logged in the incident timeline per `04_incident-response.md`.

---

## 6. The triage record

For traceability, every triaged item should produce a brief record. For projects on a PM Lite tracker, this lives as an entry in `07_raidd-log.md`. For projects without a tracker, this lives in a triage log (markdown, spreadsheet, ticket system — buyer's choice).

Minimum fields for a triage record:

| Field | Purpose |
|---|---|
| **Date/time raised** | When the item arrived |
| **Source** | Who/what raised it (customer email, alert, internal observation) |
| **Title** | One-line description |
| **Category** | One of the five from §2 |
| **Severity** (if incident) | One of critical/high/medium/low from §5 |
| **Triage verdict** | The reasoning — why this category, why this severity |
| **Triaged by** | Name of the person who did the triage (the triage manager or deputy) |
| **Routed to** | Person or document that owns it next |
| **Linked items** | Any related decisions, incidents, or prior records |

The triage record is **the audit trail**. Even if the underlying issue is closed quickly, the record persists for retrospective review.

---

## 7. Disputed triage

Sometimes the triage verdict is contested. "I think this is warranty, not a new request." "I don't think this is an incident, it's just slow."

Rules:

1. **The triage manager's first verdict stands** until formally challenged. We don't relitigate every routing decision.
2. **Challenge via the triage backlog review meeting** (§3.4) where possible — that's the right forum.
3. **For urgent disputes** (where waiting for the next meeting would cause harm), challenge via the escalation path defined in `10_project-roles.md`.
4. **Sponsor's verdict is final** (or whoever is at the top of the escalation chain for that domain).
5. **Document the dispute and resolution.** Both the original verdict and the override go in the triage record. This builds the muscle for future triage to be more accurate.

If the same kind of dispute recurs, that's a signal the triage categories or SLAs need to be amended. Log a `08_lessons-learned.md` entry.

---

## 8. Triage anti-patterns

What NOT to do, with the failure mode each enables:

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **"Everything is high severity."** | Severity loses meaning; nothing gets prioritised. | Use the severity definitions in §5 ruthlessly. If everything is `high`, something is wrong with the system, not with severity. |
| **Per-item triage as a meeting** | Wastes 5 people's time to make a 2-minute decision. | Per-item triage is a single-person decision (the triage manager). Disputes go to the backlog review meeting or escalation. |
| **"Let's just fix it" without categorising** | You can't measure what you don't categorise. You also can't notice patterns. | Always categorise, even if you're about to fix immediately. The record is fast (1 minute). |
| **Triage SLA missed silently** | Backlog grows invisibly until it's a crisis. | Triage SLA breaches should themselves trigger an alert. The triage manager is responsible for flagging if SLA is at risk. |
| **No triage during warranty** | Warranty work becomes "whatever someone shouts loudest about." | Apply this triage even when items feel small. Warranty without triage = chaos. |
| **Re-litigating closed triage** | Same dispute, same verdict, every time, wasting energy. | Once a verdict is final (per §7), it's final. New facts can re-open; argument cannot. |
| **No deputy triage manager named** | When the triage manager is unavailable, items pile up unrouted. | Always name a deputy explicitly (§3.3). Document the assignment in status reports. |
| **Backlog review meeting becomes a 90-minute talkfest** | Time-box violated; team starts skipping the meeting. | Hard 30-minute time-box (§3.4 rule 1). Items not covered roll to next week. |

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE from Phase A onward (per §3.2). Discipline starts immediately; formality scales through the lifecycle.
- Most heavily used during Phase C–E and warranty.
- Transfers to ops team at BAU handover.

**Default cadence (two activities — see §3.1):**

*Per-item triage:*
- Applied to every new item, on arrival, within the SLA per §4.
- No meeting; single-person decision by the triage manager.

*Triage backlog review meeting:*
- Frequency varies by phase per §3.5 (monthly Phase A → weekly Phase C onward).
- Time-boxed: 30 minutes maximum.
- Attendees: triage manager + tech lead + ops representative (Phase C onward).

*Backlog hygiene:*
- "Out of scope" or "Known-and-accepted" items reviewed monthly to confirm they should still be deferred.

**Why these defaults:**
- Per-item triage is fast because the cost of slow triage is bigger than the cost of imperfect triage.
- The backlog meeting catches what per-item triage misses — patterns across items, disputes, the "we've categorised 4 things as 'out of scope' this week, is that signalling something?" question.
- Phase-varying cadence prevents the failure mode of "weekly meeting in Phase A when there are no items" (meeting decays) or "monthly meeting in Phase C when there are 50 items" (backlog explodes).

**When to amend the cadence:**

- **Tighten the SLAs / meeting frequency** if:
  - Customer-facing project with a contractual response-time obligation
  - Regulated environment where slow triage carries compliance risk
  - High-volume project (>10 items per day) where slow triage causes pileups
- **Loosen the SLAs / meeting frequency** if:
  - Internal project with no external stakeholders
  - Low-volume project (<2 items per week) where the SLAs are theatre
  - Project is in a quiet phase (e.g., post-deploy stabilisation) where Medium/Low items can wait
- **Amend the categories** if:
  - The five canonical categories don't fit the project's domain (e.g., a project that has compliance findings as a distinct category)
  - Amend, document the change in the change log, and update the documents that reference triage so they use the same category set
- **Amend the attendee list** if:
  - The project has a Customer Success lead who needs to be in the meeting from Phase D
  - A regulatory representative is required for compliance-sensitive projects
  - Document the amendment in the meeting's first instance after the change

---

## Linked documents

- `01_apply-order.md` — defines the phases referenced in §3.2 and §3.5
- `04_incident-response.md` — receives "Incident" category items from triage
- `15_warranty-and-bau-handover.md` — receives "Warranty" category items from triage
- `03_decision-log.md` — receives "Scope decision" category items from triage
- `07_raidd-log.md` — where triage records live (when project has a tracker)
- `08_lessons-learned.md` — where triage patterns get captured
- `09_meeting-protocol.md` — governs the triage backlog review meeting format
- `10_project-roles.md` — defines triage manager, deputy, and escalation path
- `16_raci-matrix.md` — defines who triages what (per project)

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Triage guidance created | [Name] |

---

**End of Triage Guidance template.**
