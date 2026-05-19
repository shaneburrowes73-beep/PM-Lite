# [Project Name] — Standard Message Templates

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Project Lead]
**Companion to:** `11_stakeholder-comms-plan.md`

---

## Why this document exists

`11_stakeholder-comms-plan.md` defines WHO communicates with WHOM and WHEN. This document defines WHAT to say in the most common situations.

Most projects send the same handful of messages over and over: kickoff, milestone hits, status updates, incidents, change announcements, closure. Writing each from scratch wastes time and produces inconsistent quality. These templates are starting points — copy, customise the bracketed fields, send.

For non-PM readers: don't write project comms from a blank page. Use the matching template below.

---

## 1. Project kickoff announcement

**When to use:** at G1 (Initiation Complete), once the PID is signed off.

**Audience:** all stakeholders (per tier in `11_stakeholder-comms-plan.md`).

**Channel:** email + project channel (Slack / Teams).

**Template:**

```
Subject: [Project Name] kicking off — [date range]

Hi all,

[Project Name] has been formally approved and we're starting today.

WHAT WE'RE DOING
[1-2 sentence summary of project scope and intended outcome]

WHY
[1-2 sentence business reason — link to benefits]

WHO
- Sponsor: [Name]
- Project Lead: [Name]
- Operations Lead: [Name] (if applicable)
- Core team: [Names]

KEY DATES
- Project start: [Date]
- Expected go-live: [Date]
- Expected project closure: [Date]

WHAT TO EXPECT FROM US
- Monthly status updates (next: [Date])
- Direct outreach if we need input from you
- A heads-up before anything visible changes

WHAT WE NEED FROM YOU
[Specific asks, if any. If none, say "Nothing right now."]

QUESTIONS?
Reach out to [Project Lead] at [contact].

Thanks,
[Project Lead name]
```

---

## 2. Milestone reached / phase complete

**When to use:** at each major gate (G2, G3, G4) or significant milestone.

**Audience:** Tier 1-2 stakeholders (project-affecting); Tier 3 for major milestones (e.g., go-live).

**Channel:** email + project channel.

**Template:**

```
Subject: [Project Name] — [Milestone Name] complete

Hi all,

We've completed [milestone] on [date].

WHAT THIS MEANS
[1-2 sentences explaining what changed]

WHAT'S NEXT
[Brief description of next phase + key dates]

ANY ACTION REQUIRED?
[Specific asks or "none"]

DELIVERABLES PRODUCED
- [Deliverable 1] — [where to find / how to access]
- [Deliverable 2] — [where to find / how to access]

THANK YOU
[Brief credits to team members if appropriate]

Next update: [Date]

[Project Lead name]
```

---

## 3. Monthly status update

**When to use:** monthly during execution (Build/Test/Deploy stages).

**Audience:** all stakeholders per cadence in `11_stakeholder-comms-plan.md`.

**Channel:** email + project channel.

**Template** (mirrors `12_status-report.md`):

```
Subject: [Project Name] — Status [Month YYYY]

Hi all,

Here's where we are at end of [Month].

OVERALL STATUS: 🟢 GREEN / 🟡 AMBER / 🔴 RED
[1-2 sentences justifying the colour]

PROGRESS THIS MONTH
- [Achievement 1]
- [Achievement 2]
- [Achievement 3]

NEXT MONTH
- [Plan 1]
- [Plan 2]

KEY METRICS
- Schedule: [On track / N days slip / N days ahead]
- Budget: [N% of baseline spent; forecast at completion: £X]
- Quality: [N defects open; gate readiness assessment]
[Benefits section if post-G4 — see 27_benefits-management.md]

BLOCKERS
[List anything actually blocking, or "none."]

DECISIONS NEEDED
[Specific decisions needed from stakeholders, or "none."]

UPCOMING MILESTONES
- [Milestone] by [Date]

[Project Lead name]
```

---

## 4. Incident notification

**When to use:** when an incident occurs in production (post-G4) or in test (pre-G4) that affects stakeholders.

**Audience:** depends on severity — see `04_incident-response.md` and `17_triage-guidance.md`.

**Channel:** immediate channel for the severity (phone for critical, Slack/Teams for high, email for medium).

### 4.1 Initial incident notification (within 30 min of detection for Critical/High)

**Template:**

```
Subject: [URGENT] [Project Name] — Incident notification [Date Time TZ]

[Project Name] has experienced an incident.

WHAT HAPPENED
[1-2 sentences describing the symptom — what users are seeing]

IMPACT
- Affected users: [number / scope]
- Affected services: [list]
- Severity: [Critical / High / Medium]

WHAT WE'RE DOING
[Brief description of response in progress]

NEXT UPDATE
[Specific time, typically 30-60 min from now for Critical, hourly for High]

INCIDENT COMMANDER
[Name + direct contact]
```

### 4.2 Incident resolution notification

**Template:**

```
Subject: [RESOLVED] [Project Name] — Incident [Date Time TZ]

The incident reported at [original time] is resolved as of [resolution time].

DURATION: [time elapsed]

WHAT HAPPENED (brief)
[1-2 sentences]

ROOT CAUSE (preliminary)
[1-2 sentences — full RCA to follow]

IMPACT
- Total affected users: [number]
- Data loss: [yes/no — describe if yes]
- Duration of degraded service: [time]

PREVENTION
[Brief description of what we're doing to prevent recurrence — full incident report to follow per 04_incident-response.md]

RCA REPORT
Full RCA will be published by [date, typically within 5 business days].

[Project Lead / Incident Commander name]
```

---

## 5. Change announcement

**When to use:** when an approved change (per `25_change-control.md`) significantly affects stakeholders.

**Audience:** all stakeholders whose work / experience is affected.

**Channel:** email + project channel (for medium-impact); email + announcement meeting (for high-impact).

**Template:**

```
Subject: [Project Name] — Change announcement: [Change title]

Hi all,

A change has been approved that affects [project / deliverable / process].

WHAT'S CHANGING
[1-2 sentence summary]

WHY
[Business rationale — link to scope decision in 03_decision-log.md]

WHO'S AFFECTED
[Specific stakeholder groups]

WHEN IT TAKES EFFECT
[Specific date]

WHAT YOU NEED TO DO
[Specific actions, or "nothing"]

WHAT'S NOT CHANGING
[Reassurance: list what stays the same — often more important than what changes]

QUESTIONS
[Project Lead] is available at [contact]. A briefing session is scheduled for [date/time if applicable].

[Project Lead name]
```

---

## 6. Escalation message

**When to use:** when an issue requires Sponsor or Portfolio Owner intervention.

**Audience:** Sponsor (always); Portfolio Owner (if Sponsor cannot resolve).

**Channel:** email + direct conversation (Slack DM, call). Do NOT escalate through public channels.

**Template:**

```
Subject: [Project Name] — Escalation: [issue title]

[Sponsor name],

I need your decision on the following:

THE ISSUE
[1-2 sentence statement of the problem]

WHY THIS NEEDS YOUR INPUT
[Specific reason — exceeds my authority / requires cross-functional approval / etc.]

OPTIONS
1. [Option 1] — pros: [...]; cons: [...]
2. [Option 2] — pros: [...]; cons: [...]
3. [Option 3] — pros: [...]; cons: [...]

MY RECOMMENDATION
[Specific option with rationale]

WHAT WOULD HELP ME
[Specific decision needed — not just "thoughts"]

DEADLINE
I need a decision by [specific date/time] because [reason — typically tied to project critical path or stakeholder commitment].

I'm available for a 15-min call at [proposed times]. Otherwise reply with your decision.

[Project Lead name]
```

---

## 7. Project closure announcement

**When to use:** at G5 (Warranty Complete), when the project is formally closed.

**Audience:** all stakeholders.

**Channel:** email + project channel + (often) a closure meeting.

**Template:**

```
Subject: [Project Name] — Closure

Hi all,

[Project Name] is formally closed as of [date].

DELIVERY SUMMARY
- Scope delivered: [Brief summary — link to 13_project-closure.md for full detail]
- Schedule: [On time / N days late / N days early]
- Budget: [Final actual: £X — N% of baseline]
- Quality: [Acceptance criteria status — link to 26_quality-management.md]

WHAT'S NOW IN PRODUCTION
[Brief description of what's live; how to access; who supports]

ONGOING SUPPORT
- Operational owner: [Operations Lead]
- Support channel: [How to raise issues — per 23_runbook.md]
- BAU status: [Active in BAU as of date]

BENEFITS REALISATION
- Baseline measurements: captured
- First benefits assessment: [Date — typically G4+3 months]
- Reference: 27_benefits-management.md

LESSONS CAPTURED
[Brief reference — full lessons in 08_lessons-learned.md]

THANK YOU
[Acknowledgements — sponsors, team, key stakeholders]

WHAT HAPPENS NEXT
- BAU support active immediately
- Post-Implementation Review scheduled for [date]
- Final closure report: [link]

It's been a [adjective] project. Thank you all.

[Sponsor name + Project Lead name]
```

---

## 8. Project cancellation announcement

**When to use:** when a project is formally cancelled (rare but happens).

**Audience:** all stakeholders.

**Channel:** email + project channel + closure meeting (especially important for cancellations — people need to process).

**Template:**

```
Subject: [Project Name] — Closing the project

Hi all,

After review, [Project Name] is being formally closed. This is not a Phase E closure — we are stopping the project before reaching its planned end.

WHY
[Honest explanation — strategic priorities changed / unable to meet scope or quality bar / business case no longer holds / etc. Avoid blame and avoid spin.]

WHAT WAS DELIVERED
[List anything that was produced and is being retained]

WHAT WAS NOT DELIVERED
[Honest list]

WHAT HAPPENS TO THE TEAM
[Team members' future commitments — be specific. If layoffs or redeployment, communicate carefully.]

WHAT HAPPENS TO ANYTHING DELIVERED
[Specifically: maintained, archived, or retired]

LESSONS
A formal lessons-learned session will happen on [date]. Findings will inform future project planning.

QUESTIONS
[Sponsor name] is available at [contact]. We will also be holding a closing meeting on [date/time].

This isn't the outcome we wanted. Thank you for your work and your patience.

[Sponsor name + Project Lead name]
```

---

## 9. Customisation guidance

Each template above is a starting point, NOT a script. Always customise:

- **Tone** — match the organisation's communication style. Some are formal; some are casual. PM Lite's templates lean professionally-conversational.
- **Length** — these templates lean medium-length. For mass audiences with low engagement, shorten. For high-stakes communications, expand with appendix-style detail.
- **Format** — email vs Slack vs Teams have different conventions. Adapt formatting (bullet points vs prose; emoji vs no emoji).
- **Language** — use the language(s) your audience uses. Translate where needed.

### 9.1 What NOT to customise away

Some elements should stay regardless of style:
- **Specific dates and numbers** — concrete commitments beat vague ones.
- **Named owners** — every "we will do X" needs a person.
- **Action requests** — be explicit about what stakeholders need to do.
- **Escalation paths** — always say who to contact.

---

## 10. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **No subject line discipline** | Recipients can't triage. Important messages buried. | Subject line includes project name + message type. |
| **Comms-as-status-theatre** | Messages exist to look busy, not to inform. | Every message has a specific audience and specific action/info. |
| **Burying bad news** | Stakeholders learn problems from other channels (gossip, dashboards). Trust erodes. | Bad news direct, in the appropriate template (incident / change / escalation). |
| **Sponsor learns from CEO meeting** | Project Lead hasn't told Sponsor; Sponsor hears from elsewhere. Career-limiting. | Sponsor always gets news first. Other stakeholders follow per comms plan tier. |
| **Generic apologies** | "We apologise for any inconvenience" — no action, no commitment. | Apology + specific corrective action + date. |
| **No closing acknowledgement** | Project ends in silence. Team and stakeholders feel unappreciated. | Always close with §7 (or §8 for cancellations). Acknowledgements matter. |
| **Channel mismatched to urgency** | Critical incident emailed; non-urgent matter Slack-pinged at 2am. | Match channel to urgency. §4 uses immediate channels; §3 uses periodic channels. |

---

## 11. Links and references

- `11_stakeholder-comms-plan.md` — defines audience, tier, cadence for each message.
- `12_status-report.md` — formal status report (more detailed than §3 above).
- `04_incident-response.md` — formal incident response process (templates here are the comms layer).
- `25_change-control.md` — change requests (template §5 announces approved changes).
- `13_project-closure.md` — formal closure report (template §7 announces it).
- `17_triage-guidance.md` — severity definitions that drive §4 incident comms channels.
- `27_benefits-management.md` — benefits reporting included in §3 (status) and §7 (closure).

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- READ at Initiation (during comms plan drafting in `11_stakeholder-comms-plan.md`).
- USED throughout — templates triggered by events (milestone, incident, change, closure).
- Not modified per-project unless organisational style requires it — these are starting points.

**Default cadence:**
- Kickoff: once, at G1.
- Status: monthly during execution.
- Milestone: each gate (~6-7 per project).
- Incident: as needed.
- Change: as needed.
- Escalation: as needed (ideally rare).
- Closure: once, at G5.

**Why this default:**
- These templates cover ~95% of routine project communications. Custom-written messages should be the exception.
- Calendar-driven (status, kickoff, closure) ensures consistency; event-driven (incident, change, escalation) responds to need.

**When to amend:**
- **Customise** for organisational voice/style at first use. Stylistic edits don't require change control.
- **Add new templates** if a project regularly needs a comms type not covered here (e.g., recurring client demos, vendor coordination updates).

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. Companion to `11_stakeholder-comms-plan.md`. | [Name] |

---

**End of standard message templates.**
