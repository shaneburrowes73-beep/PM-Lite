# Stage Gates and Lifecycle

**Document version:** 1.1
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Project ID:** [slug, e.g. `pm-lite`]

---

## Why this document exists

Without explicit stages and gates, projects drift forward without explicit decisions. Activity continues, status reports go out, weeks pass — and one day someone realises the project is in a state nobody authorised.

Stage gates are the discipline that prevents drift. They define:

1. **The named stages** a project moves through (Pipeline, Initiation, Build, Test, Deploy, Warranty, BAU, Retirement).
2. **What must be true** to leave each stage.
3. **Who signs off** that the criteria are met.
4. **What happens** if a gate cannot be passed.
5. **How the gate decision is recorded** so the project's progress is auditable.

For non-PM readers: a "stage" is where the project is in its life. A "gate" is the explicit moment when someone says "yes, we can move to the next stage." Without gates, the move happens silently and the project loses traceability.

Read `19_glossary-and-concepts.md` Section 3 first if "phase", "stage", "gate" are unfamiliar terms.

---

## 1. The 8 canonical stages

Every PM Lite project moves through these 8 stages in order. Some projects skip stages (rare); most spend different durations in each.

```
[Pipeline] → [Initiation] → [Build] → [Test] → [Deploy] → [Warranty] → [BAU] → [Retirement]
     ↓             ↓            ↓        ↓          ↓            ↓         ↓
   G0:           G1:          G2:      G3:        G4:          G5:       G6:
  Approve     Initiation     Build    Test       Deploy      Warranty   BAU
   to start                Complete  Complete  Complete     Complete   Retired
```

Each transition between stages has a gate (G0 through G6). A gate is not a date — it's a decision point.

### Stage 1: Pipeline

**Definition:** The idea exists. It's been recognised as worth considering but not yet authorised.

**Activities:**
- Initial discussion of the need
- Rough sizing (days vs weeks vs months)
- Identification of a candidate sponsor
- Optional: high-level business case sketch

**Duration:** Anywhere from minutes to months. Pipeline items often sit waiting for capacity, budget, or strategic alignment.

**Exit gate:** **G0 — Approve to start.**

**Templates active:** None directly. Pipeline tracking happens in a portfolio-level backlog (see below).

#### Pipeline tracking — the portfolio backlog

Every project starts as a Pipeline item. Without an explicit place to track Pipeline items, ideas get lost, double-counted, or quietly forgotten.

**The portfolio backlog** is a single list of all Pipeline items being considered. It's owned at the **portfolio level** (Portfolio Owner / Portfolio Lead per `10b_portfolio-roles.md`) — not at the project level, because Pipeline items aren't yet projects.

**Minimum required fields per backlog item:**

| Field | Purpose |
|---|---|
| **Title** | One-line description of the idea |
| **Description** | 1-3 sentences expanding the idea |
| **Submitted by** | Who proposed it |
| **Submitted date** | When |
| **Estimated size** | Days / Weeks / Months / Quarters (rough — order of magnitude only) |
| **Estimated value** | High / Medium / Low (or business case if formal) |
| **Candidate sponsor** | Who would authorise it if approved |
| **Priority** | High / Medium / Low (computed from size × value × strategic fit) |
| **Status** | New / Triaged / Approved (becomes a project) / Parked / Declined |
| **Decision date** | When status last changed |

**Backlog review cadence:**
- **Monthly minimum** — Portfolio Owner reviews the full backlog. New items get triaged. Stale items (>90 days no movement) get explicitly parked or declined.
- **Quarterly strategic review** — Backlog is re-prioritised against current strategic goals. Items that no longer fit get declined.
- **Ad-hoc when capacity opens** — When a project closes (G5), the backlog gets reviewed to pick the next item.

**Sizing best practice:**
- Use **rough order of magnitude** sizing, not detailed estimates. Pipeline isn't the place for precision.
- A 5-point scale works: XS (<1 week), S (1-4 weeks), M (1-3 months), L (3-6 months), XL (>6 months).
- Items larger than L should be broken down before they can move to G0 — large items become programmes, not single projects.

**Prioritisation best practice:**
- **Value × Size** is the simplest model: high value + small size = top priority.
- More sophisticated: **WSJF (Weighted Shortest Job First)** — Value / Size, ranked. Highest WSJF first.
- Strategic fit override: an XL item that perfectly fits strategy can outrank an XS item with no strategic value.

**Where to put the backlog:**
- **Spreadsheet** (Google Sheets, Excel) — simplest, works for any team size.
- **Tracker tool** (Notion, Linear, Jira) — better for teams already using these.
- **Database table** (Supabase, Airtable) — for teams running 10+ Pipeline items.

PM Lite does NOT ship a backlog template at v1.2 — most buyers will use their existing tools (Sheets, Notion). If a buyer needs a structured template, see the AI Solutions tracker's `pipeline_backlog` table pattern (Phase 2 candidate).

**Anti-patterns in Pipeline tracking:**
- **"It's in my head"** — Pipeline items not written down get lost. Always log in writing, even if 1-line.
- **Backlog hoarding** — Items piling up indefinitely with no review. The backlog should churn: items either move to G0 or get parked/declined.
- **No declining** — Saying "maybe later" forever. Some items should be explicitly declined. Decline = recorded for future reference but no longer in active rotation.
- **G0 by ambush** — A Pipeline item gets fast-tracked to project status with no review. Skipping G0 review means the project starts without sponsor commitment.

### Stage 2: Initiation

**Definition:** The project has been authorised. Setup work begins to define what will be done.

**Activities:**
- Draft and sign off the Project Initiation Document (`14_project-initiation.md`)
- Identify team members and assign roles (`10_project-roles.md`)
- Map stakeholders (`11_stakeholder-comms-plan.md`)
- Define scope, success criteria, and baseline
- Set up project tooling (RAIDD log, decision log, checklist)
- Pick design models (e.g. actions-log model A/B/C per `18_actions-log.md` Section 2)

**Duration:** Typically 1-2 weeks. Longer for large projects; shorter (a day) for very small ones.

**Exit gate:** **G1 — Initiation Complete.**

**Templates active:** 01, 02, 03, 07, 09, 10, 10b (if portfolio context), 11, 14, 16.

### Stage 3: Build

**Definition:** The deliverables are being constructed. Most of the project's work happens here.

**Activities:**
- Workpackages executed per the checklist (`06_project-checklist.md`)
- Decisions logged as they arise (`03_decision-log.md`)
- RAIDD entries created and reviewed (`07_raidd-log.md`)
- Meetings held per protocol (`09_meeting-protocol.md`)
- Actions tracked (`18_actions-log.md`)
- Status reports issued (`12_status-report.md`)

**Duration:** The largest portion of most projects. Days to many months.

**Exit gate:** **G2 — Build Complete.**

**Templates active:** All execution templates (03, 06, 07, 09, 12, 18) plus the foundational ones from Initiation.

### Stage 4: Test

**Definition:** What was built is being verified. Acceptance criteria are checked. Defects are surfaced and fixed.

**Activities:**
- Functional testing of deliverables
- User acceptance testing (UAT) with intended recipients
- Performance, security, accessibility testing as relevant
- Defect logging and resolution (typically routed through `07_raidd-log.md` as Issues)
- Re-test after fix

**Duration:** Varies wildly. Days for small projects; weeks to months for complex deliverables.

**Exit gate:** **G3 — Test Complete.**

**Templates active:** All Build-stage templates remain active. `17_triage-guidance.md` starts to apply for defect triage.

### Stage 5: Deploy

**Definition:** The deliverable is being moved from a test environment into production use (or otherwise made available to the intended recipients).

**Activities:**
- Production deployment / cutover / go-live
- Data migration if applicable
- User training / change communications
- Final stakeholder notifications (`11_stakeholder-comms-plan.md`)
- Initial production monitoring

**Duration:** Hours to weeks depending on complexity. Often shorter than expected if Test stage was thorough.

**Exit gate:** **G4 — Deploy Complete.**

**Templates active:** Status report (`12`), comms plan (`11`), triage (`17`) for any deployment issues.

### Stage 6: Warranty

**Definition:** The deliverable is in production use, but the project team retains responsibility for defects and stabilisation. This is the "buyer's protection period."

**Activities:**
- Production monitoring
- Triage of any defects or incidents (`17_triage-guidance.md`, `04_incident-response.md`)
- Final operational documentation
- Lessons learned captured (`08_lessons-learned.md`)
- BAU handover preparation (`15_warranty-and-bau-handover.md`)

**Default duration:** 30 days from G4 sign-off (per `15_warranty-and-bau-handover.md`).

**Exit gate:** **G5 — Warranty Complete.**

**Templates active:** 04, 07, 08, 12, 15, 17.

### Stage 7: BAU (Business as Usual)

**Definition:** The deliverable is in steady-state operation, owned by the operations team. The project itself is closed.

**Activities:**
- Ongoing operations per BAU runbooks
- Periodic reviews
- Routine maintenance
- Support and incident response (now owned by Ops, not project team)

**Duration:** Indefinite, until the deliverable is retired.

**Exit gate:** **G6 — BAU Retired.**

**Templates active:** From the kit's perspective, the project is closed. BAU operates on its own runbooks. The kit's templates remain referenced for historical audit only.

### Stage 8: Retirement

**Definition:** The deliverable is no longer in active use. It's been decommissioned, replaced, or archived.

**Activities:**
- Decommissioning of systems
- Data archival or deletion (per retention policy)
- Final stakeholder communications
- Closure of any remaining accounts, contracts, or licences
- Archival of the project's documents for historical reference

**Duration:** Days to weeks.

**Exit gate:** None (terminal stage). Retirement marks the end of the deliverable's life.

**Templates active:** Final closure if not already done; document archival.

---

## 2. Gate criteria and sign-offs

Each gate has explicit criteria. A gate is PASSED when all criteria are met AND the required sign-offs are recorded.

### Sign-off notation

| Symbol | Meaning |
|---|---|
| **S** | Sponsor — required for all major gates |
| **PL** | Project Lead |
| **OL** | Operations Lead — required from G4 onward |
| **(opt)** | Optional sign-off if role exists |

### Gate 0 — Approve to Start (Pipeline → Initiation)

**Criteria:**
- [ ] A named sponsor has committed (verbally or in writing) to authorising the project.
- [ ] Rough sizing is agreed (project duration order-of-magnitude: days / weeks / months).
- [ ] No blocking constraints identified (budget, capacity, regulatory).

**Sign-off:** S
**Recorded in:** A decision in `03_decision-log.md` once Initiation begins. Pre-decision-log record can be a Slack message, email, or meeting note.

**If G0 fails:** Project stays in Pipeline indefinitely OR is formally declined. A declined project is recorded as a parked decision (so future reviewers can see "this was considered and chosen not to do").

### Gate 1 — Initiation Complete (Initiation → Build)

**Criteria:**
- [ ] Project Initiation Document (PID) drafted (`14_project-initiation.md`).
- [ ] Scope, success criteria, and baseline agreed and documented in PID.
- [ ] Sponsor + Project Lead + (where relevant) Operations Lead have signed off the PID.
- [ ] Project tooling set up: RAIDD log started, decision log open, roles defined.
- [ ] Initial stakeholder map drafted (`11_stakeholder-comms-plan.md`).
- [ ] Initial budget and schedule estimates agreed within tolerances per `03_decision-log.md` Section "Approval thresholds."

**Sign-off:** S + PL + OL (opt)
**Recorded in:** `14_project-initiation.md` sign-off section, AND a decision in `03_decision-log.md` referencing "G1 PASSED."

**If G1 fails:**
- **Common reason:** Scope or baseline can't be agreed. Project returns to Pipeline until clarified.
- **Less common:** Sponsor withdraws. Project is cancelled at G1.

### Gate 2 — Build Complete (Build → Test)

**Criteria:**
- [ ] All deliverables in the PID's scope are produced (or scope changes are documented and approved).
- [ ] Internal review of deliverables done (developer/builder confirms work is "Done" per Section "Done vs Done-Done" in `19_glossary-and-concepts.md`).
- [ ] Test environment set up and ready to receive the build.
- [ ] No P1 (critical) defects known.
- [ ] Open RAIDD items reviewed: any blocker risks have mitigation plans; issues are documented.

**Sign-off:** PL
**Recorded in:** A decision in `03_decision-log.md` referencing "G2 PASSED — entering Test."

**If G2 fails:**
- Project stays in Build to complete missing work.
- If scope was over-ambitious, scope decision is logged (`03_decision-log.md` Scope Decisions) deferring some items to a later release.

### Gate 3 — Test Complete (Test → Deploy)

**Criteria:**
- [ ] All deliverables have been tested against their acceptance criteria.
- [ ] No P1 or P2 defects remain unresolved (or P2 defects are accepted with a documented workaround).
- [ ] User acceptance testing (UAT) completed by intended recipients where applicable.
- [ ] Performance, security, accessibility testing passed (where relevant).
- [ ] Sponsor has reviewed UAT results.

**Sign-off:** S + PL
**Recorded in:** Decision in `03_decision-log.md` referencing "G3 PASSED — proceeding to Deploy."

**If G3 fails:**
- **Common reason:** Defects above the agreed tolerance. Project returns to Build to fix.
- **Less common:** UAT reveals the deliverable doesn't meet the actual need. This is a scope crisis — escalate to Sponsor; project may need re-baselining or cancellation.

### Gate 4 — Deploy Complete (Deploy → Warranty)

**Criteria:**
- [ ] Production deployment / cutover completed successfully.
- [ ] Smoke tests in production passed.
- [ ] Initial user notification sent per `11_stakeholder-comms-plan.md`.
- [ ] Rollback plan tested OR documented as not feasible (rare).
- [ ] Operations Lead has accepted the deliverable into the warranty period.

**Sign-off:** S + PL + OL
**Recorded in:** `15_warranty-and-bau-handover.md` warranty start record, AND a decision in `03_decision-log.md` referencing "G4 PASSED — warranty period commences."

**If G4 fails:**
- **Most common:** Deployment fails. Roll back, fix, redeploy. Project remains in Deploy stage.
- **Less common:** Operations Lead refuses to accept. This is an escalation — sponsor decides whether to proceed against Ops objection (rare and risky) OR remediate first.

### Gate 5 — Warranty Complete (Warranty → BAU)

**Criteria:**
- [ ] Warranty period (default 30 days) has elapsed.
- [ ] No P1 incidents remain unresolved.
- [ ] BAU handover checklist complete (per `15_warranty-and-bau-handover.md` Section 5).
- [ ] Operational documentation handed over to Ops team.
- [ ] Lessons learned documented (`08_lessons-learned.md`).
- [ ] Closure report drafted (`13_project-closure.md`) and signed off.

**Sign-off:** S + PL + OL
**Recorded in:** `13_project-closure.md` sign-off, AND a final decision in `03_decision-log.md` referencing "G5 PASSED — project closed, transitioning to BAU."

**If G5 fails:**
- **Most common:** Open defects above tolerance. Warranty period extended (record as a decision).
- **Less common:** Ops refuses to accept BAU ownership. Sponsor escalation required.

### Gate 6 — BAU Retired (BAU → Retirement)

**Criteria:**
- [ ] Deliverable is no longer in active use.
- [ ] Replacement (if any) is operational and stakeholders have transitioned.
- [ ] Data retention requirements satisfied (archival or deletion per policy).
- [ ] Contracts, licences, and accounts associated with the deliverable closed.
- [ ] Final notification to stakeholders sent.

**Sign-off:** S (or successor) + OL
**Recorded in:** A retirement decision in `03_decision-log.md` AND, if the project's documents are still active, a final entry in `13_project-closure.md` (or a separate retirement note).

**If G6 cannot be passed:** Rare. Usually means contractual or regulatory issues prevent retirement. Resolve those first.

---

## 3. Gate outcomes — Pass, Conditional Pass, Fail

A gate review has three possible outcomes:

### 3.1 Pass

All criteria met. All required sign-offs recorded. Project moves to the next stage.

**Action:** Record in `03_decision-log.md`. Update project status. Inform stakeholders per the comms plan.

### 3.2 Conditional Pass

Criteria substantially met but specific items deferred or accepted as known risks. Project moves to the next stage with documented caveats.

**Examples of conditional passes:**
- G3 with two P3 (minor) defects accepted as known issues, to be fixed in warranty.
- G4 with a non-critical feature deferred to a v1.1 patch.

**Action:** Record the conditions explicitly in `03_decision-log.md`. Add the deferred items to the actions log (`18_actions-log.md`). Sponsor explicitly accepts the conditions in the sign-off record.

**Anti-pattern:** Conditional Pass should NOT be used to paper over significant unresolved issues. If you find yourself listing more than 3-4 conditions, you're probably failing the gate — not passing conditionally.

### 3.3 Fail

Criteria not met. Project does not move to the next stage.

**Options after a fail:**

1. **Remediate** — fix the gap and re-attempt the gate. Most common outcome.
2. **Re-baseline** — accept that scope/budget/schedule have changed; record a scope decision (`03_decision-log.md` Scope Decisions); update the PID; re-attempt the gate against the new baseline.
3. **Park** — pause the project. Common at G0 (waiting for capacity) or G1 (waiting for sponsor decision).
4. **Cancel** — the project will not proceed. Record as a cancellation decision; do a brief closure write-up so future readers understand why.

**Action:** Record the fail and the chosen response in `03_decision-log.md`. Notify stakeholders per the comms plan.

---

## 4. Gate passage log

Every gate decision is recorded in `03_decision-log.md` with the following structure:

```
### D-NNN: G[N] [PASSED / CONDITIONAL / FAILED] — [Stage] → [Next Stage]

- Date: YYYY-MM-DD
- Sign-offs: [Sponsor name], [Project Lead name], [Ops Lead name if applicable]
- Criteria status: [all met / N of M met with conditions / failed criteria listed]
- Conditions (if conditional): [list]
- Failure reason and response (if failed): [text + chosen response from §3.3]
- Notes: [any relevant context]
- Related: [PID section, RAIDD entries, lessons]
```

This makes every stage transition auditable. A future reviewer can read the decision log and reconstruct exactly how the project moved through its lifecycle.

---

## 5. Tailoring — when to skip stages

Some projects don't fit the 8-stage model cleanly. Tailoring is allowed but should be documented.

**Common tailoring patterns:**

### 5.1 Small projects — collapsed gates

For very small projects (under 1 week effort), G1, G2, and G3 may collapse into a single review. Sponsor sign-off happens once at start and once at end.

**Recommendation:** Even for small projects, write a brief PID (`14_project-initiation.md` in light form) and a brief closure report (`13_project-closure.md`). The discipline is cheap; the audit trail is valuable.

### 5.2 Operational projects — no Build stage

For projects that are pure procurement or pure data migration (no "Build" in the construction sense), the Build stage may be replaced by an "Execute" stage with the same gate criteria.

**Recommendation:** Keep the stage names. Replace what happens inside them. Don't invent new stages — it breaks reporting across the portfolio.

### 5.3 Long-running projects — phased gates

For projects that span multiple deliverables, each deliverable can have its own G2-G3-G4 sequence. The overall project has one G1 (initiation) and one G5 (closure).

**Recommendation:** Reference each deliverable's gate set as G2.1, G2.2, etc. — preserves the canonical lifecycle while accommodating reality.

### 5.4 Iterative / Agile projects — multiple G3/G4 cycles

For projects shipping iteratively (releases every 2 weeks), each release passes G3 and G4 individually. G5 happens at end-of-project, not end-of-release.

**Recommendation:** Track "release N passed G4" in the status report. The gate criteria are the same per release; just the cadence is faster.

### 5.5 Anti-pattern: skipping G2 or G3

Skipping the Build-Complete or Test-Complete gates is the most common reason projects fail. The pressure to "just deploy already" is real, but the cost of deploying untested work is usually 5-10x the cost of testing it.

**If you find yourself wanting to skip G2 or G3:**
- Document the decision in `03_decision-log.md` Scope Decisions section.
- Sponsor explicitly accepts the risk.
- Increase the warranty period to absorb the resulting defect inflow.

---

## 6. Gate review meetings

A gate is not just a checkbox — it's a decision. Most gates benefit from a brief, focused meeting.

**Default cadence and format:**

| Gate | Meeting attendees | Default duration |
|---|---|---|
| G0 | Sponsor + (optional) Project Lead candidate | 15-30 min |
| G1 | Sponsor + Project Lead + (where applicable) Ops Lead + key team | 30-60 min |
| G2 | Project Lead + key team | 30 min |
| G3 | Sponsor + Project Lead + UAT participants | 30-60 min |
| G4 | Sponsor + Project Lead + Ops Lead | 30 min |
| G5 | Sponsor + Project Lead + Ops Lead | 30-60 min |
| G6 | Sponsor (or successor) + Ops Lead | 15-30 min |

**Format:**
1. Project Lead presents the criteria status: which are met, which aren't.
2. Open discussion: any concerns the criteria might miss.
3. Decision: Pass / Conditional / Fail (plus conditions or remediation plan).
4. Sign-offs recorded (in the meeting or shortly after).
5. Decision logged in `03_decision-log.md`.

Meetings follow `09_meeting-protocol.md`.

---

## 7. The gate-aware status report

`12_status-report.md` should mention the current stage and the next gate at every reporting cycle:

```
Current stage: Build
Next gate: G2 — Build Complete
Target G2 date: 2026-06-15
Confidence: HIGH / MEDIUM / LOW
Blockers to G2: [list]
```

This makes it obvious to the sponsor whether the project is making gate progress or just generating activity.

---

## 8. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **No explicit gate sign-off** | Stages drift into each other. No audit trail. | Always record gate decisions in `03_decision-log.md`, even informally. |
| **Sponsor "signed off" verbally with no record** | Can't reconstruct who approved what. | Confirm in writing (email, Slack message screenshot, or formal sign-off in the PID/closure doc). |
| **Conditional Pass used to ship anyway** | When conditions become numerous, you've effectively failed the gate but pretended to pass. | More than 3-4 conditions = treat as a Fail. Remediate or re-baseline. |
| **Build → Deploy with no Test stage** | Untested work goes to production. Warranty period overwhelmed. | Always pass through Test, even if it's brief. |
| **Gate criteria invented at the gate meeting** | No one prepared for what was being measured. Sign-off is reactive, not informed. | Criteria for each gate are agreed at PID time (`14_project-initiation.md` Section 9 references this template). |
| **Skipping G5 — "just transition to BAU"** | Closure report never written. Lessons not captured. Project's final status is ambiguous. | Always do G5, even if the closure report is short. |
| **Treating G0 as automatic** | Pipeline items become "active projects" without sponsor commitment. | G0 needs an explicit yes, even if informal. |
| **Build that never completes ("MVP build-forever")** | Team keeps adding "one more thing" to scope. Build phase stretches indefinitely. Project stalls or gets cancelled before reaching G2. Most common failure mode for first-time PM Lite users. | At G1, specify which "minimum" you're targeting (MVP / MUP / MMP per `19_glossary-and-concepts.md` §9b). At G2, ask "have we built the agreed scope?" — not "is there anything else we want to add?" Additions found during build become scope decisions in `03_decision-log.md`, not silent scope creep. |
| **Re-baseline used to legitimise scope creep** | "Updating the baseline" becomes a way to retroactively make scope creep look authorised. Each re-baseline drifts further from the original intent. | Re-baselines are scope DECISIONS — they must go through `03_decision-log.md` Scope Decisions with explicit Sponsor sign-off. Multiple re-baselines on the same project (>2) is a red flag — the original PID was likely too vague. |
| **No portfolio backlog — Pipeline items "in someone's head"** | Pipeline items get lost, double-counted, or quietly forgotten. Ideas never surface for triage. | Maintain a written portfolio backlog (spreadsheet, Notion, tracker — your choice). Review monthly. See §1 Pipeline stage for backlog format. |

---

## 9. How this template connects to the rest of the kit

| Other template | Connection |
|---|---|
| `01_apply-order.md` | High-level phase view. Stages here = phases there, with explicit gates added. |
| `03_decision-log.md` | Records every gate decision. Single source of truth for gate audit. |
| `06_project-checklist.md` | Granular task list. Should reference which gate each phase ends at. |
| `13_project-closure.md` | The G5 deliverable. Closure can only happen after G5 sign-off. |
| `14_project-initiation.md` | The G1 deliverable. Initiation can only complete after G1 sign-off. |
| `15_warranty-and-bau-handover.md` | Covers G4 → G5 → BAU transition. |
| `19_glossary-and-concepts.md` | Defines "stage", "gate", "phase", "milestone." |
| `21_decision-tree.md` | Helps buyers identify which stage they're in, hence which gate is next. |

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- READ at project initiation (Phase A) so the team understands what gates they'll face.
- REFERENCED at every gate review.
- NOT modified per-project — this is a kit-level reference document. Project-specific gate sign-offs go in `03_decision-log.md`.

**Default cadence:**
- One reading at Initiation.
- Re-read at each gate review (~6-7 times per project, depending on stages).
- Annual kit-level review.

**Why this default:**
- Gates are infrequent but high-stakes events. Brief re-reading before each gate refreshes the criteria.
- Annual review catches drift between this template and the gate criteria as projects evolve.

**When to amend:**
- Add criteria to a gate if recurring failures suggest the current criteria miss something.
- Never remove criteria without sponsor approval — gates exist to catch the things people would otherwise skip.
- Don't add new stages without good reason — stage proliferation makes portfolio reporting harder.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created. Defines 8 canonical stages (Pipeline → Retirement), 7 gates (G0 through G6), criteria + sign-offs per gate, outcomes (Pass / Conditional / Fail), and tailoring patterns. | Claude (Cowork) |
| 2026-05-19 | 1.1 | Expanded §1 Pipeline with formal portfolio backlog tracking (fields, cadence, sizing, prioritisation, anti-patterns). Added 3 new anti-patterns to §8: "Build that never completes (MVP build-forever)", "Re-baseline used to legitimise scope creep", "No portfolio backlog". | Claude (Cowork) |

---

**End of stage gates template.**
