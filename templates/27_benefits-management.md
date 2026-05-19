# [Project Name] — Benefits Management

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Sponsor + Operations Lead post-closure]

---

## Why this document exists

A project is "successful" by two different measures:

1. **Delivery success** — did we ship what we said we would, on time, on budget, at the right quality?
2. **Benefits success** — did the thing we shipped actually CREATE THE VALUE we said it would?

Most project frameworks focus on #1. PM Lite does too, mostly. But projects that hit #1 and fail #2 are still failed projects — they just fail more quietly, after the team has moved on.

This template addresses #2. It defines:

- **What benefits** we expect this project to produce (the benefits register).
- **When** we expect those benefits to materialise (most benefits accrue AFTER closure).
- **How** we'll measure whether they did.
- **Who's responsible** for chasing the benefits once the project team disbands.

For non-PM readers: read `19_glossary-and-concepts.md` §4 (Deliverable vs Outcome) first. Benefits = outcomes, not deliverables.

---

## 1. Benefits register

The headline list of benefits this project will produce. Treat this as a contract with the sponsor — these are the things that justify the investment.

| Benefit ID | Description | Type | Target value | Baseline (current state) | Measurement method | Expected realisation date | Owner |
|---|---|---|---|---|---|---|---|
| B-001 | [e.g., Reduce customer onboarding time from 14 days to 2 days] | Operational efficiency | [2 days] | [14 days] | [Internal time-tracking; sample 20 customers/month] | [G4 + 3 months] | [Ops Lead] |
| B-002 | [e.g., Increase customer satisfaction (CSAT) from 7.2 to 8.5] | Customer experience | [8.5] | [7.2] | [Quarterly CSAT survey, n=100+] | [G4 + 6 months] | [Sponsor] |
| B-003 | [e.g., Reduce support tickets by 30%] | Cost reduction | [-30%] | [N tickets/month] | [Support system reporting] | [G4 + 3 months] | [Ops Lead] |
| B-004 | [e.g., Compliance with GDPR Article X] | Compliance / risk reduction | [Pass audit] | [Currently non-compliant] | [External audit] | [G4 + 1 month] | [Sponsor + Legal] |

### 1.1 Benefit types

Categorise benefits by type — different types are measured differently and accrue on different timescales.

| Type | What it is | Measurement | Typical realisation timescale |
|---|---|---|---|
| **Operational efficiency** | Doing the same work faster / cheaper | Time, cost, throughput metrics | 1-3 months post-deploy |
| **Customer experience** | Customers happier with the service | CSAT, NPS, retention, support volume | 3-12 months post-deploy |
| **Revenue** | New revenue OR retained revenue | Sales reporting, churn metrics | 6-18 months post-deploy |
| **Cost reduction** | Spending less to achieve same result | Cost-per-X metrics | 3-6 months post-deploy |
| **Compliance / risk reduction** | Avoiding penalties or incidents | Audit pass; incident frequency | Immediate to 12 months |
| **Capability** | Now able to do things we couldn't before | Capability inventory; new product launches enabled | Variable |
| **Brand / strategic** | Hard to quantify but real | Press coverage; partnership signals; competitive positioning | 12+ months |

### 1.2 Quantification

Every benefit should be quantified where possible. "Improved customer experience" is not a benefit; "CSAT increase from 7.2 to 8.5" is.

For benefits that are genuinely hard to quantify (brand, strategic positioning):
- Define qualitative success indicators (e.g., "named as innovation leader by industry publication").
- Set a realistic timeframe for assessment.
- Be honest with the sponsor that benefit realisation is harder to confirm.

### 1.3 Disbenefits

Some changes have negative side-effects that should be tracked alongside benefits:

| Disbenefit ID | Description | Severity | Mitigation | Owner |
|---|---|---|---|---|
| DB-001 | [e.g., New process requires staff retraining; 2 weeks productivity loss] | Medium | [Schedule training during low-volume period] | [Ops Lead] |

Disbenefits should NOT be hidden. Sponsor needs the full picture to decide if benefits outweigh disbenefits.

---

## 2. Benefits realisation timeline

Most benefits don't materialise on the day the project closes. They accrue over weeks/months/years AFTER deployment. The realisation timeline is the schedule for checking.

### 2.1 Standard realisation checkpoints

| Checkpoint | Timing | Activity |
|---|---|---|
| **Baseline confirmed** | Before G1 | Current-state measurements captured for every benefit. |
| **Quick-win check** | G4 + 30 days | Any benefits with realisation date within 30 days assessed. Most are operational efficiency. |
| **Post-Implementation Review (PIR)** | G4 + 3 months | First major benefits assessment. Most efficiency/cost benefits measurable. |
| **Mid-cycle review** | G4 + 6 months | Customer experience and revenue benefits start being measurable. |
| **Annual review** | G4 + 12 months | Strategic and brand benefits assessment. Full benefits realisation reported.  |
| **Long-tail review** | G4 + 24 months (if relevant) | For benefits expected to compound over time. |

### 2.2 PIR — Post-Implementation Review

The most important checkpoint. PIR is a structured review, typically 3 months post-deployment, attended by:

- Sponsor (chair)
- Operations Lead
- Former Project Lead (if still available)
- Key stakeholders

PIR agenda:
1. **Delivery recap** — what was delivered (reference `13_project-closure.md`).
2. **Benefits assessment** — for each benefit in §1, status: Realised / On Track / At Risk / Not Realised.
3. **Disbenefits assessment** — same for disbenefits.
4. **Lessons** — feed back into `08_lessons-learned.md`.
5. **Actions** — for benefits at risk or not realised: what's the plan?

PIR outcomes recorded in §4 (Realisation log) below.

---

## 3. Benefits ownership after project closure

The project team disbands at G5. Benefits accrue AFTER that. Who's responsible?

### 3.1 Ownership transition

| Stage | Benefits owner |
|---|---|
| Pre-G1 | Project Lead (drafts benefits register with Sponsor input) |
| G1-G4 | Sponsor (commits to benefits as part of business case) |
| G4-G5 | Sponsor + Operations Lead (operational benefits start materialising during warranty) |
| Post-G5 | Operations Lead (operational benefits) + Sponsor (strategic benefits) |
| Annual review | Sponsor reports to portfolio (formal benefits realisation) |

The Sponsor remains accountable for benefits realisation EVEN AFTER the project team has moved on. This is one of the most under-enforced disciplines in project management.

### 3.2 If the Sponsor moves on before benefits are realised

Common situation. Handle as:

1. **Document the original commitment** — original Sponsor's benefits expectations recorded in §1.
2. **Identify successor** — new Sponsor (often a successor in role) inherits responsibility.
3. **Reconfirm or revise** — successor reviews benefits register and either reconfirms commitment OR re-baselines (this is itself a change — `25_change-control.md`).

---

## 4. Realisation log

Append entries here at each realisation checkpoint. Never delete entries — the trail of realisation over time is the audit record.

| Date | Checkpoint | Benefit ID | Status | Measured value | Variance vs target | Notes |
|---|---|---|---|---|---|---|
| [YYYY-MM-DD] | Baseline confirmed | B-001 | — | 14 days | — | Baseline measurement |
| [YYYY-MM-DD] | G4 + 30 days | B-001 | On track | 4 days | -10 days (target -12) | Better than expected at 30 days |
| [YYYY-MM-DD] | PIR (G4 + 3 months) | B-001 | Realised | 2 days | On target | Benefit realised; ongoing measurement quarterly |
| [YYYY-MM-DD] | PIR (G4 + 3 months) | B-002 | At risk | 7.4 | +0.2 vs baseline; target 8.5 needs 1.1 more | Needs marketing investment per action A-001 |
| [YYYY-MM-DD] | PIR (G4 + 3 months) | B-003 | Realised | -32% tickets | -2% vs target | Exceeded target |
| ... | ... | ... | ... | ... | ... | ... |

### 4.1 Status definitions

| Status | Meaning |
|---|---|
| **Realised** | Benefit achieved at or above target. |
| **On track** | Trending toward target by expected realisation date. |
| **At risk** | Not currently trending toward target; action needed. |
| **Not realised** | Realisation date passed; target not met. |
| **Re-baselined** | Target revised via `25_change-control.md`; new entry under new baseline. |
| **Abandoned** | Sponsor formally accepts the benefit will not be realised. Recorded for audit. |

### 4.2 Actions on "At risk" or "Not realised"

When a benefit is At risk or Not realised at a checkpoint, document the response:

- **Action plan** — what will we do to get back on track?
- **Owner** — who's doing it?
- **Target date** — when do we re-assess?
- **Escalation** — if action plan fails, what happens? (Re-baseline? Abandon? New project?)

These actions go in `18_actions-log.md` with reference to the benefit ID.

---

## 5. Benefits in project sign-off documents

### 5.1 Project Initiation (G1)

`14_project-initiation.md` §8 (Success criteria) references the benefits register here. Sponsor signs off the benefits register as part of PID approval.

### 5.2 Status reports

`12_status-report.md` includes a brief benefits section once benefits begin to materialise (typically after G4):

```
## Benefits realisation
- B-001 (onboarding time): Realised — currently 2 days vs 14-day baseline
- B-002 (CSAT): On track — currently 7.6 vs 8.5 target; PIR in 30 days
- B-003 (support tickets): Realised — currently -32% vs -30% target
```

### 5.3 Project closure (G5)

`13_project-closure.md` includes initial benefits assessment for early-realisation benefits AND a forward-looking commitment for not-yet-realised ones, including realisation dates and ownership.

### 5.4 PIR report (separate)

The PIR produces a separate report not currently templated in PM Lite v1.2 — typically a 1-2 page document covering the agenda items from §2.2. Future template candidate (v1.3+).

---

## 6. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **No benefits register** | "Why are we doing this project?" has no auditable answer. | Define benefits at G1. Sponsor commits to them. |
| **Vague benefits** | "Improve customer experience" — anyone can claim it after the fact. | Quantify every benefit (§1.2). |
| **No baseline measurement** | Benefits look great because no one knows the starting point. | Baseline measured before G1. Without it, benefits can't be assessed. |
| **PIR skipped** | Project closed at G5, then forgotten. Benefits never assessed. | PIR is a calendar commitment, scheduled at G5. Sponsor's responsibility to chair. |
| **Benefits owned by the project team** | Team disbands at G5; benefits go unrealised. | Sponsor and Operations Lead own benefits FOREVER (or until handed over). |
| **Benefits never reassessed after first checkpoint** | First report says "on track"; never revisited. Actual end state unknown. | Multiple checkpoints per §2.1. Annual review minimum until benefits realised. |
| **Disbenefits ignored** | Project looks like a clear win when it's actually a wash. | Disbenefits register (§1.3). Net benefit = benefits minus disbenefits. |
| **Quietly re-baselined benefits** | Target was 30% reduction; turned out to be 5%; "we re-baselined to 5%." | Re-baselining benefits is a change request (`25_change-control.md`). Sponsor and stakeholders sign off explicitly. |

---

## 7. Links and references

- `13_project-closure.md` — closure report references benefits status at G5.
- `14_project-initiation.md` §8 — success criteria align to benefits.
- `08_lessons-learned.md` — benefits-related lessons captured here.
- `12_status-report.md` — benefits section once benefits begin materialising.
- `19_glossary-and-concepts.md` §4 — Deliverable vs Outcome.
- `25_change-control.md` — changes to benefits register go through CCB.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- DRAFTED at Initiation (Phase A). Benefits register signed off at G1.
- BASELINE measured before G1.
- DORMANT during Build/Test/Deploy (benefits don't accrue yet, but the document is updated if scope changes affect benefits).
- ACTIVE from G4 onward — quick-win check 30 days post-deploy.
- HIGH USE at PIR (G4 + 3 months) and subsequent realisation checkpoints.
- MAINTAINED indefinitely — annual review until all benefits realised or abandoned.

**Default cadence:**
- Baseline measurement: before G1.
- Realisation checkpoints: G4 + 30 days, G4 + 3 months (PIR), G4 + 6 months, G4 + 12 months, then annually.
- Status updates: at each checkpoint.

**Why this default:**
- Most benefits don't fully realise for 3-12 months. Aggressive early measurement gives false signals.
- Annual review is the minimum sustainable cadence — quarterly is better for high-value benefits.
- The PIR specifically is the most critical checkpoint; if you only do one, do this one.

**When to amend:**
- **Tighten** (monthly tracking) for: high-stakes benefits, contractually-bound outcomes, regulator-monitored benefits.
- **Loosen** (annual only) for: small projects with modest benefit claims and proportional measurement cost.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of benefits management template.**
