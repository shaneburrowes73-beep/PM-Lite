# Template Decision Tree — Which template do I use when?

**Document version:** 1.2
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Audience:** Anyone trying to figure out where to start, or which template applies to their situation.

---

## Why this document exists

PM Lite has 30 templates. That's a lot. A new buyer (or a team member encountering the kit for the first time) often doesn't know where to start.

This document is the routing layer. Tell me what you're trying to do, and I'll tell you which templates apply and in what order.

If you read only one document in the kit, read this one.

---

## 1. Start here — three foundational questions

Answer these three questions first. Your answers determine which path you take through the rest of this document.

### Q1: Is the work you're describing actually a PROJECT?

Read `19_glossary-and-concepts.md` Section 1 if you're not sure.

**Quick test:**
- Does it have a defined end state? **NO** → it's probably BAU work, not a project. Skip to §6.
- Will it take more than a day? **NO** → it's a task. PM Lite is overkill. Skip to §7.
- Is one person doing everything start to finish, with no review or sign-off from anyone? **YES** → it's a personal task. Skip to §7.

Everything else IS a project (or a programme of projects).

### Q2: What stage is your project in?

The 8 PM Lite stages are: **Pipeline → Initiation → Build → Test → Deploy → Warranty → BAU → Retirement** (see `20_stage-gates.md`).

Pick the one that best matches where you are RIGHT NOW.

### Q3: How big is the project?

- **Tiny** (a few hours, one person): you probably don't need the kit. Use a notepad. Skip to §7.
- **Small** (1-2 weeks, 1-3 people): use the kit's CORE templates only. See §2.
- **Medium** (1-3 months, 3-10 people): use the kit's FULL set as designed. See §3.
- **Large** (3+ months, 10+ people OR multiple workpackages): use the kit's full set plus careful tailoring. See §4.
- **Programme** (multiple related projects): use `10b_portfolio-roles.md` as a starting point. See §5.

---

## 2. Path A — Small project (1-2 weeks, 1-3 people)

You don't need all 21 templates. Use these 6 core ones:

| # | Template | Purpose | When to fill in |
|---|---|---|---|
| 1 | `14_project-initiation.md` (light version) | Document scope, success criteria, who signs off | Start of project |
| 2 | `06_project-checklist.md` (light version) | Phase-by-phase checklist | Start of project, update through |
| 3 | `03_decision-log.md` | Significant decisions and their rationale | As decisions arise |
| 4 | `07_raidd-log.md` | Risks, issues, assumptions, dependencies | As they arise |
| 5 | `12_status-report.md` (light, weekly only) | Brief status to sponsor | Weekly |
| 6 | `13_project-closure.md` (light version) | Confirm delivered vs PID | End of project |

**Skip for small projects:**
- `09_meeting-protocol.md` — formal meeting structure is overkill. Just take notes.
- `11_stakeholder-comms-plan.md` — if you have 1-3 stakeholders, keep it in your head.
- `15_warranty-and-bau-handover.md` — for light projects, warranty + BAU can be a single email.
- `16_raci-matrix.md` — RACI for 3 people is overkill.
- `17_triage-guidance.md` — only relevant if you have ongoing operational concerns.
- `18_actions-log.md` — RAIDD log handles small action volumes fine.
- `20_stage-gates.md` — gates can be informal: a Slack message from the sponsor saying "yes, proceed."

**"Light version" means:** fill in only the required fields. Skip the explanatory text in the template. The template's example fields show you what's optional.

---

## 3. Path B — Medium project (1-3 months, 3-10 people)

Use the kit as designed. Specifically:

### Phase A — Initiation
| Template | Purpose |
|---|---|
| `01_apply-order.md` | High-level phase plan |
| `02_credentials-manifest.md` | Track credentials (if you handle any) |
| `10_project-roles.md` | Define team and roles |
| `11_stakeholder-comms-plan.md` | Map and tier stakeholders |
| `11b_message-templates.md` | Standard message templates for kickoff/status/incident/closure |
| `14_project-initiation.md` | The PID — the foundational document |
| `16_raci-matrix.md` | Detailed accountability per workstream |
| `20_stage-gates.md` | Reference for gate criteria |
| `24_budget-management.md` | Budget baseline + tracking |
| `26_quality-management.md` | Quality criteria + DoD agreed at G1 |
| `27_benefits-management.md` | Benefits register signed off at G1 |

### Phase B-D — Execution (Build, Test, Deploy)
| Template | Purpose |
|---|---|
| `03_decision-log.md` | All meaningful decisions |
| `06_project-checklist.md` | Granular phase checklist |
| `07_raidd-log.md` | Risks, issues, assumptions, dependencies |
| `09_meeting-protocol.md` | All meetings follow this |
| `12_status-report.md` | Monthly to sponsor, weekly to team |
| `18_actions-log.md` | Track discrete actions |
| `24_budget-management.md` | Weekly actuals; monthly forecast |
| `25_change-control.md` | Change requests as they arise |
| `26_quality-management.md` | QA practices applied; QC at Test stage |

### Phase E — Closure + Warranty + BAU
| Template | Purpose |
|---|---|
| `13_project-closure.md` | Closure report |
| `15_warranty-and-bau-handover.md` | Warranty + BAU handover |
| `17_triage-guidance.md` | Triage discipline during warranty and BAU |
| `08_lessons-learned.md` | Lessons captured at closure |
| `04_incident-response.md` | If anything goes wrong post-deploy |
| `23_runbook.md` | Operational runbook for what was built (required for G5) |
| `27_benefits-management.md` | Benefits realisation tracking — heavy use at PIR (G4+3 months) |

### Reference (used throughout)
| Template | Purpose |
|---|---|
| `19_glossary-and-concepts.md` | Term definitions |
| `21_decision-tree.md` | This document |
| `05_backup-restore.md` | If your project produces data worth backing up |

---

## 4. Path C — Large project (3+ months, 10+ people)

Everything in Path B applies. Plus these extras:

- **Multiple workstreams:** Use `16_raci-matrix.md` to map RACI per workstream. Consider sub-RACI matrices for each major workstream.
- **Iterative releases:** See `20_stage-gates.md` Section 5.4 for handling multiple G3/G4 cycles per release.
- **Heavy stakeholder management:** Use full `11_stakeholder-comms-plan.md` with tier-based cadences. Consider sub-plans per stakeholder group.
- **Cross-project dependencies:** Use `10b_portfolio-roles.md` to coordinate with related projects even if you're not technically a programme.
- **Distinct workpackage owners:** Set up sub-checklists per workpackage (multiple copies of `06_project-checklist.md`, one per workstream).

**Watch for:** scope creep. Large projects fail more often than small ones, usually because the original PID becomes outdated and people stop measuring against it. Re-baseline explicitly (decision in `03_decision-log.md` Scope Decisions) rather than letting drift accumulate.

---

## 5. Path D — Programme (multiple related projects)

PM Lite v1.2 does NOT include a programme template. Workarounds:

- Use `10b_portfolio-roles.md` adapted for programme governance.
- Each constituent project uses the full Path B or C set independently.
- Cross-project communication uses `11_stakeholder-comms-plan.md` at the programme level.
- Cross-project risks live in a programme-level `07_raidd-log.md`.

**If your programme has more than 4-5 projects, you've outgrown PM Lite.** Consider a heavier tool (Jira Premium, MS Project, Asana Enterprise, etc.). PM Lite is calibrated for individual projects and small portfolios; programme management at scale is a different problem.

---

## 5b. Pipeline / portfolio backlog — pre-project work

If you have an idea that MIGHT become a project but isn't yet, it belongs in the portfolio backlog, not in any of the paths above.

Use: `22_portfolio-backlog.md`

This is where Pipeline-stage items live (per `20_stage-gates.md` §1). Add the idea as a backlog row. The Portfolio Owner triages it at the next monthly review. If approved (G0 passed), it becomes a project and you proceed to Path A/B/C/D above.

**When NOT to use the portfolio backlog:**
- You're a solo founder with only 1-2 ideas in your head at any time. The overhead exceeds the value.
- The idea is already a project (sponsor authorised, work underway) — skip backlog, go straight to Initiation.

**When the portfolio backlog matters most:**
- 3+ ideas at any one time
- Multiple stakeholders proposing ideas (without a backlog, the same idea gets proposed multiple times)
- Portfolio capacity is constrained — you need explicit prioritisation

---

## 6. BAU work — what to use

If the work is operational (no end state, ongoing), PM Lite is mostly NOT the right kit. Use:

- **For incident response:** `04_incident-response.md` (standalone — does not require a project to be running).
- **For ongoing triage discipline:** `17_triage-guidance.md` (Section 3.5 covers BAU cadence).
- **For backup/restore discipline:** `05_backup-restore.md` (continues into BAU).
- **For credentials hygiene:** `02_credentials-manifest.md` (continues into BAU).
- **For BAU role definition:** `15_warranty-and-bau-handover.md` Section 7.

Other PM Lite templates are project-focused and don't apply to pure BAU.

**When BAU work becomes a project:** see `19_glossary-and-concepts.md` Section 7. The trigger is usually: it needs a sponsor's authorisation rather than the operations lead's.

---

## 7. Tiny tasks and personal work

PM Lite is overkill for:

- A task someone can do in less than half a day.
- Personal projects with no review or sign-off needed.
- Internal experiments that aren't intended to ship.

For these, use a notebook, a Notion page, or a simple todo list. The discipline of a full PID + RAIDD log + decision log adds more friction than value at this scale.

---

## 8. Special situations

### "I need to make a single decision — which template?"

`03_decision-log.md`. Even outside a formal project, the decision log is useful for "I want to remember why I chose this." A standalone decision log doesn't require the rest of the kit.

### "I had an incident and I want to handle it well — which template?"

`04_incident-response.md`. Standalone — does not require a project. Captures the incident, response, and prevention.

### "I want to track lessons across multiple unrelated projects — which template?"

`08_lessons-learned.md` at a personal or organisational level. Lessons from individual projects bubble up to this longer-running document.

### "I have a stakeholder who keeps escalating — which template?"

`11_stakeholder-comms-plan.md`. Identify their tier and the right cadence. Recurring escalations often signal a tier mismatch (they're a tier-1 stakeholder getting tier-3 communication frequency).

### "We had a deployment that broke something — what now?"

Triple-template situation:
1. `04_incident-response.md` for the incident itself.
2. `17_triage-guidance.md` for triaging the inflow of related issues.
3. `07_raidd-log.md` to record the issue (and any new risks revealed) for the still-active project.
4. `08_lessons-learned.md` once stable, capture what we'll do differently next time.

### "I need to choose between models in the actions log — which one applies to me?"

See `18_actions-log.md` Section 3 for the buyer-profile guidance. Quick answer:
- Solo or very small team, low action volume → Model A (actions as RAIDD attributes).
- Small studio with cross-project queries → Model B (actions as peer to RAIDD).
- Regulated environment or high-velocity portfolio → Model C (actions as fully first-class).

### "We're past project end and now in BAU — but a new feature is needed. Project or BAU?"

If the feature is small (< 1 week, doesn't need a new sponsor sign-off) → BAU enhancement, not a project.

If the feature is large enough to need a sponsor's authorisation, a budget allocation, or formal stakeholder communication → it's a new project. Start at G0 in `20_stage-gates.md`.

### "We have a project that's been running 6+ months with no clear sponsor — what now?"

Stop. This is usually a sign the project has drifted out of governance. Three options:

1. **Re-baseline:** identify the current sponsor (or appoint one), draft a current-state PID (`14_project-initiation.md`), formally re-initiate. Treat this as G1 against current reality.
2. **Cancel:** if no one will own the sponsorship, the project is not actually authorised. Close it (`13_project-closure.md`) and explicitly state "unfunded — no sponsor."
3. **Convert to BAU:** if the work is ongoing but doesn't have a defined end state, accept that it's BAU and move it out of the project tracking.

---

## 9. A worked example

**Scenario:** A solo founder wants to build a small customer portal for their startup. 2 weeks of work, just them and a freelance designer.

**Path:** A (Small project).

**Templates used:**

| When | Template | What goes in |
|---|---|---|
| Day 1 | `14_project-initiation.md` (light) | "Build customer portal. Done = users can register, sign in, and update their profile. Sponsor: me. Done by: 14 days from now." |
| Day 1 | `06_project-checklist.md` (light) | 8-10 line checklist: design wireframes, build pages, set up auth, test, deploy. |
| Day 1 | `07_raidd-log.md` | One assumption ("designer available throughout"), one risk ("no plan if auth provider fails"). |
| Day 3 | `03_decision-log.md` | First decision: "Chose Auth0 over Supabase Auth because of [reason]." |
| Day 7 | `12_status-report.md` | Two-paragraph email: progress, blockers, next week. (To self if no separate sponsor; useful for the founder's own clarity.) |
| Day 14 | `13_project-closure.md` (light) | "Closed. Delivered: register, sign-in, profile. Skipped: password reset (deferred to v1.1). Lessons: Auth0 setup took 2x expected." |
| Day 15+ | `08_lessons-learned.md` (continued) | "Lesson: budget 2x for any auth integration." |

**Templates NOT used:**
- `10_project-roles.md` — overkill for 2 people.
- `11_stakeholder-comms-plan.md` — overkill for solo work.
- `09_meeting-protocol.md` — no meetings.
- `16_raci-matrix.md` — overkill.
- `20_stage-gates.md` — informal gates: "is the build done? OK, test it. Tests passed? Deploy."

Total time spent on the kit: maybe 2-3 hours across the 2 weeks. That's the right ratio.

---

## 10. When NOT to use PM Lite at all

- You already have a heavier PM tool that works well for you (Jira, Asana, Monday). Don't add this on top.
- Your team is fully embedded in an Agile methodology that has its own ceremonies and artefacts. PM Lite would conflict.
- You're in a regulated environment that mandates a specific PM methodology (PRINCE2 formal, PMP for government work). PM Lite is "PRINCE2-flavoured lite", not the certified thing.
- Your project is genuinely tiny (< 1 day) and adding any template would slow you down.

PM Lite's sweet spot is: a small-to-medium team running medium-complexity work without wanting to pay for or operate enterprise PM tooling.

---

## Linked documents

- `19_glossary-and-concepts.md` — for any term ambiguity
- `20_stage-gates.md` — for the lifecycle and gate criteria
- All other templates — see §2-§5 above for which apply when

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- READ BEFORE starting any project — to pick the right path through the kit.
- REFERENCED when the project's context changes (e.g. project grew from "small" to "medium" — different template set applies).

**Default cadence:**
- Read once at project consideration (pre-Phase A).
- Re-read if the project's size or complexity changes materially.
- Annual kit-level review.

**Why this default:**
- The routing logic doesn't change project-by-project. Once read, it's internalised.
- Re-reading on context change catches the "we've outgrown Path A" moment.

**When to amend:**
- Add a path if a new project type (not covered by A/B/C/D) recurs.
- Refine an example if real-world usage reveals confusion.
- Don't add complexity unless it's earning its keep — this template's job is to SIMPLIFY routing, not to add another layer.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created. Routes buyers to the right templates based on project type, stage, and size. Four paths: A (small), B (medium), C (large), D (programme). Worked example for Path A. | Claude (Cowork) |
| 2026-05-19 | 1.1 | Added §5b for pre-project Pipeline / portfolio backlog routing (references new template 22). Updated intro template count 21 → 24. | Claude (Cowork) |
| 2026-05-19 | 1.2 | Updated intro template count → 30. Added 11b, 24, 25, 26, 27 to Path B template lists. Added 23 and 27 to Closure/Warranty/BAU section. | Claude (Cowork) |

---

**End of decision tree template.**
