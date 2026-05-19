# Glossary and Concepts

**Document version:** 1.1
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Audience:** Read this FIRST if you are new to project management, OR if you want to confirm the kit uses terminology the way you'd expect.

---

## Why this document exists

Every PM Lite template uses words like *project*, *programme*, *workpackage*, *sponsor*, *deliverable*, *gate*. These words have specific meanings in project management — but they're often used loosely, and different methodologies (PRINCE2, PMBOK, Agile) define them differently.

This document defines what each term means **in PM Lite specifically**. If you've worked with PM tools before, this is your quick check that we use words the way you'd expect. If you haven't, this is your primer — read it before opening any other template.

For non-PM readers: the goal here is not to teach you project management. It's to give you just enough vocabulary to use the kit without misclassifying your work.

---

## 1. Work hierarchy — Portfolio, Programme, Project, Workpackage

These four terms describe how work is **organised**. They go from biggest to smallest.

### 1.1 Portfolio

A **portfolio** is everything your organisation is doing — all concurrent projects, programmes, and standing operational work — under one strategic view.

- **Scope:** Usually whole-organisation, or whole-department.
- **Time horizon:** Multi-year, ongoing.
- **Governance:** Portfolio Owner + Portfolio Lead (see `10b_portfolio-roles.md`).
- **PM Lite applicability:** Use `10b_portfolio-roles.md` if you run 3+ concurrent projects.

**Example:** AI Solutions' portfolio includes 13 active projects, each at different lifecycle stages. The portfolio view is "what's happening across all of them this quarter."

### 1.2 Programme

A **programme** is a coordinated set of related projects that together deliver a strategic outcome no single project could achieve alone.

- **Scope:** Multiple projects sharing a goal, customer, or transformation.
- **Time horizon:** Typically 6 months to multiple years.
- **Governance:** Programme Manager (over multiple Project Leads).
- **PM Lite applicability:** PM Lite v1.x does NOT include a programme template. If you're running a programme, use `10b_portfolio-roles.md` as a starting point and treat the programme as a "mini-portfolio."

**Example:** "Customer Service Modernisation" is a programme. It includes the *service-agent* project (build the agent), the *voice-transcript* project (deploy transcription), and the *recruitment-matching-tool* project (hire the right staff). Each is a project. Together they're a programme.

### 1.3 Project

A **project** is a time-bounded effort to deliver a specific outcome. It has a defined start, a defined end, and a defined "done" state.

- **Scope:** One clear deliverable or set of related deliverables.
- **Time horizon:** Typically weeks to months. PM Lite is calibrated for projects of 1 week to 12 months.
- **Governance:** Project Lead + Sponsor + (optional) Operations Lead. See `10_project-roles.md`.
- **PM Lite applicability:** The DEFAULT unit of work for the kit. Every template assumes "project" unless otherwise noted.

**Example:** "Build the PM Lite v1.2.0 kit" is a project. It has a defined start (May 11, 2026), a defined end (when v1.2.0 ships), a defined deliverable (20+ templates on GitHub), and a defined sponsor (the owner).

**Test for "is this a project?":**
- Does it have a defined end state? If no, it's probably BAU work, not a project.
- Will it take more than a day? If no, it's a task, not a project.
- Are multiple people involved (even indirectly)? If no, it might still be a project, but consider whether the overhead of the templates is worth it.

### 1.4 Workpackage (or workstream)

A **workpackage** is a discrete chunk of work within a project that can be assigned to one owner and tracked as a unit.

- **Scope:** Part of a project.
- **Time horizon:** Days to weeks.
- **Governance:** Workpackage Owner (reports to Project Lead).
- **PM Lite applicability:** Not formally tracked in v1.x templates, but referenced when a project has natural sub-divisions. Workpackages typically appear in `06_project-checklist.md` as sub-phase groupings.

**Example:** Within the "Build PM Lite v1.2.0 kit" project, "Draft template 19" is a workpackage. "Draft template 20" is another. Together with "Draft template 21" they form the v1.2.0 content workstream.

**Workpackage vs task:** A task is a single action (write a paragraph, send an email). A workpackage is a collection of tasks that produces a meaningful sub-deliverable.

### Diagram of the hierarchy

```
Portfolio
├── Programme (optional layer)
│   ├── Project A
│   │   ├── Workpackage 1
│   │   ├── Workpackage 2
│   │   └── Workpackage 3
│   └── Project B
│       └── ...
└── Project C (standalone — not in a programme)
    └── ...
```

A project does not need a programme above it. Most PM Lite projects sit directly in a portfolio.

---

## 2. People — Sponsor, Stakeholder, Team member

These three terms describe how people relate to a project. They differ in what they *do* and what *rights* they have.

### 2.1 Sponsor

The **sponsor** authorises the project, funds it (or commits resources), and signs off on completion.

- **Single individual,** not a group.
- **Authority:** Can cancel the project, change its budget, change its scope (in writing — see `03_decision-log.md`).
- **Accountability:** Owns the project's business case. If the project fails to deliver value, the sponsor explains why to the portfolio/programme.
- **Time commitment:** Typically light — sponsor reviews status reports (`12_status-report.md`), signs off PIDs (`14_project-initiation.md`) and closure reports (`13_project-closure.md`), and is escalated to for critical decisions.

**Common confusion:** the sponsor is not the most senior person in the room by default. The sponsor is the person whose budget or authority is being committed.

### 2.2 Stakeholder

A **stakeholder** is anyone who is affected by the project or who can affect the project — but is not on the working team.

- **Many people, many tiers** — see `11_stakeholder-comms-plan.md` for the tiered model.
- **Authority:** Varies by tier. Top-tier stakeholders (the sponsor, regulators) can stop the project. Bottom-tier (general staff, end users) get informed.
- **Accountability:** Receive communications; provide input when asked.
- **Time commitment:** Varies from monthly (general staff) to weekly (key client contact).

Every sponsor is a stakeholder. Not every stakeholder is the sponsor.

### 2.3 Team member

A **team member** is someone who does project work directly. They produce deliverables.

- **Defined in `10_project-roles.md`** with a named individual per role.
- **Authority:** Within their RACI assignment (see `16_raci-matrix.md`). A Responsible person does the work; an Accountable person signs off.
- **Time commitment:** Typically heavy — daily or near-daily during their active phases.

**Stakeholder vs team member:**
- A team member is INSIDE the project. They have work to do.
- A stakeholder is OUTSIDE the project. They have an interest in the project.

The sponsor is technically a stakeholder, but a special one with authority over the project itself.

---

## 3. Time and state — Phase, Stage, Gate, Milestone, Baseline

These five terms describe **where the project is in time** and **how it transitions**. They're often confused.

### 3.1 Phase

A **phase** is a time-bounded portion of a project with a defined focus.

- **Examples:** "Phase B — Build", "Phase C — Test"
- **Marked by:** A start and end date.
- **Captured in:** `01_apply-order.md` (high-level) and `06_project-checklist.md` (granular).

Phases describe **when**: "we are in Phase B."

### 3.2 Stage

A **stage** is a named state in the project lifecycle, regardless of how long it lasts.

- **The 8 canonical PM Lite stages** (per `20_stage-gates.md`): Pipeline → Initiation → Build → Test → Deploy → Warranty → BAU → Retirement.
- **Marked by:** The state of the work itself, not a date.

Stages describe **what state the work is in**: "we are at the Test stage."

**Phase vs stage:**
- **Phase** = time-named portion of the calendar. "Phase B was March."
- **Stage** = state-named position in the lifecycle. "We're at the Build stage."

In practice the two often align (Phase B is the Build stage), but they're separate concepts. A project can re-enter a stage (back to Build to fix something) without re-entering a phase.

### 3.3 Gate

A **gate** is a control point between two stages. It has explicit criteria that must be met to move from one stage to the next.

- **Defined in:** `20_stage-gates.md`.
- **Signed off by:** Sponsor (always), plus Project Lead and (where relevant) Operations Lead.
- **Outcome:** Pass (move to next stage), Fail (remediate or cancel), or Conditional Pass (proceed with documented caveats).

Gates are how the project's progress becomes auditable. Without gates, stages drift into each other.

### 3.4 Milestone

A **milestone** is a notable event during the project — usually a major deliverable completion, a contract signing, or a regulatory deadline.

- **Marked by:** A specific date.
- **Captured in:** `14_project-initiation.md` (planned) and `12_status-report.md` (progress).

**Milestone vs gate:**
- A **milestone** is a noteworthy point in time. "Beta release on May 15."
- A **gate** is a go/no-go decision. "Pass the Test gate before Deploy."

A gate is often (but not always) associated with a milestone. Not all milestones are gates.

### 3.5 Baseline

A **baseline** is the agreed-upon snapshot of scope, schedule, or budget at a specific point — usually at the end of Initiation.

- **Purpose:** Subsequent changes are measured against the baseline, not against the latest version.
- **Captured in:** `14_project-initiation.md` (initial baseline) and `03_decision-log.md` (changes to the baseline).

**Example:** The initial budget baseline is $50,000. Six weeks in, scope creep adds $8,000 of work. The decision log records "+$8K, sponsor approved." The current cost ($58K) is measured against the baseline ($50K), and the variance is +16%.

Without a baseline, "are we on track?" has no answer.

---

## 4. Deliverables and outcomes

These two terms are frequently conflated. The distinction matters because they're measured differently and signed off by different people.

### 4.1 Deliverable

A **deliverable** is something the project produces. Tangible. You can point at it.

- **Examples:** A document. A working web page. A database table with rows in it. A signed contract. A trained employee.
- **Sign-off:** Typically by the Project Lead (the thing was built) and the recipient (the thing meets specs).

### 4.2 Outcome

An **outcome** is the change that the deliverable produces. Often less tangible.

- **Examples:** Customers can self-serve, reducing support load. Compliance audit passed. Time-to-onboarding reduced from 14 days to 2.
- **Sign-off:** Typically by the Sponsor (the change happened) and (sometimes) the Operations Lead (the change is sustained in BAU).

**Deliverable vs outcome:**
- Building a self-service portal is a **deliverable**.
- Customers actually using the portal and support volume dropping is the **outcome**.

A project can deliver everything it promised (all deliverables shipped) and still fail to produce the outcome. Conversely, a project can fall short on deliverables but still produce the outcome via some other means.

**Implication for PM Lite:** `14_project-initiation.md` should describe both. `13_project-closure.md` should assess both.

---

## 5. Scope vs requirements

### 5.1 Scope

**Scope** is the boundary of what the project will and will not do. It defines what's IN and what's OUT.

- **Examples (in scope):** "Build the customer portal", "Migrate user accounts from legacy system."
- **Examples (out of scope):** "Build the admin portal" (separate project), "Train end users" (BAU activity, not a project deliverable).
- **Captured in:** `14_project-initiation.md` Section 4.

### 5.2 Requirements

**Requirements** are the specifics within scope — what the deliverables must DO.

- **Examples:** "The portal must support single sign-on with Google and Microsoft accounts", "The portal must respond within 2 seconds on mobile", "The portal must comply with WCAG 2.1 AA."
- **Captured in:** A requirements document, or as detailed acceptance criteria (see §6).

**Scope vs requirements:**
- **Scope** = the line around the work. ("Build the portal — yes. Build the mobile app — no.")
- **Requirements** = the details inside the line. ("Portal must do X, Y, and Z.")

A project can have well-defined scope but vague requirements (common in early-stage projects). The opposite — vague scope but detailed requirements — is usually a sign of scope creep waiting to happen.

---

## 6. Acceptance criteria

**Acceptance criteria** are the specific, testable conditions a deliverable must meet to be considered "done."

- **Format:** Usually a checklist, written before the work starts.
- **Owner:** The person who will sign off the deliverable (often Sponsor or Operations Lead).
- **Captured in:** `14_project-initiation.md` Section 8 (success criteria for the whole project), and per-deliverable in workpackage descriptions.

**Example acceptance criteria for "build the customer portal":**
- [ ] Users can register with email + password
- [ ] Users can sign in with Google SSO
- [ ] Page loads under 2 seconds on 4G mobile
- [ ] WCAG 2.1 AA compliance verified by automated scan
- [ ] Lighthouse score ≥90 on Performance, Accessibility, and Best Practices
- [ ] Sponsor + Operations Lead have completed user acceptance testing

Without acceptance criteria, "done" becomes a debate. With them, it becomes a checklist.

### Done vs Done-Done

A common pattern:

- **Done** = the developer has finished their part. Code committed, document written.
- **Done-Done** = Done, AND tested, AND reviewed, AND signed off by the recipient, AND deployed (or filed, or distributed) to wherever it needs to be.

A status update of "I'm done with the portal" can mean very different things. PM Lite's recommendation: use "Done-Done" or "Accepted" for the fully-complete state, and reserve "Done" for "developer-finished but not yet accepted."

This matters most at gate sign-offs (`20_stage-gates.md`). A stage isn't passed when work is "Done" — it's passed when work is "Done-Done" against the acceptance criteria.

---

## 7. BAU — Business as Usual

**BAU** is the operational, post-project state where the deliverable is in steady use and the project team has handed it over to the operations team.

- **Not a project.** BAU runs indefinitely (or until the deliverable is retired).
- **Governance:** Operations Lead (see `15_warranty-and-bau-handover.md` Section 7).
- **PM Lite applicability:** `15_warranty-and-bau-handover.md` and (lightly) `17_triage-guidance.md` cover the transition. After BAU, the kit's involvement ends — BAU operates on its own runbooks and SLAs.

**Examples of BAU work that is NOT a project:**
- Daily backup verification
- Monthly user account audit
- Quarterly security review
- Handling support tickets

**When BAU work becomes a project:**
- A significant change (>10% effort uplift) that needs planning, sign-off, and a deliverable. ("Migrate database to new region" might start as a maintenance task and become a project.)
- A defined improvement initiative with a clear end state.
- Anything that requires the Sponsor's authorisation rather than the Operations Lead's.

The line between BAU and project work is sometimes blurred. The test: **does this need a sponsor's authorisation, an initiation document, and a closure report?** If yes, it's a project. If no, it's BAU.

---

## 8. RAIDD — Risks, Assumptions, Issues, Dependencies, Decisions

Defined in detail in `07_raidd-log.md`. Brief reference here:

| Type | Definition | Example |
|---|---|---|
| **Risk** | Something that might happen and would harm the project if it did. Probabilistic. | "The vendor might slip the delivery date by 2 weeks." |
| **Assumption** | Something we're treating as true without confirmation. If it's wrong, the project plan changes. | "Assumed: the new server room will be ready by April 1." |
| **Issue** | Something that HAS happened (or is happening) and is harming the project. Active. | "The build is failing on production deploys." |
| **Dependency** | Something this project needs from outside it (another team, vendor, system). | "Need procurement to release the budget by March 30." |
| **Decision** | A choice made that affects the project, recorded with rationale. | "Decided to use Postgres over MySQL because of JSON support." |

**Common mistake:** treating risks and issues as the same thing. A risk is a maybe. An issue is a now. The handling is different: risks are mitigated; issues are resolved.

---

## 9. Initiative vs project — when in doubt

"Initiative" is a loose word. In PM Lite, treat it as a synonym for whichever of these fits best:

- If the initiative is multi-year and contains multiple projects → it's a **programme**.
- If the initiative is time-bounded with a clear deliverable → it's a **project**.
- If the initiative is a continuous improvement effort with no defined end → it's **BAU work**.
- If the initiative is a single significant task within a project → it's a **workpackage**.

If someone says "I have an initiative to improve customer onboarding", your first question should be: *is there a defined end state, or is this ongoing work?* That tells you which PM Lite templates apply.

---

## 9b. MVP, MUP, MMP — the "minimum" family

These three terms describe progressively expanded versions of a deliverable. They matter because **the most common failure mode for first-time PM Lite users is not knowing when to stop building**.

### 9b.1 MVP — Minimum Viable Product

**MVP** is the smallest version of the deliverable that demonstrates the core value AND can be put in front of real users to learn from their behaviour.

- **Goal:** Validate that the idea works.
- **Not aimed at:** Selling. Profitability. Polish.
- **Acceptance test:** Can real users use it to do the thing it's supposed to do, even if rough?

**Common mistake:** treating MVP as "minimum lovable product" or "minimum sellable product." It is neither. An MVP is allowed to be ugly, narrow, and missing nice-to-haves. Its job is to learn, not to sell.

### 9b.2 MUP — Minimum Usable Product

**MUP** is the next step up: the deliverable is now genuinely usable for its primary purpose, without major workarounds.

- **Goal:** Used routinely by intended users.
- **Acceptance test:** A user can complete the primary task without needing help, without crashing, and without losing data.

### 9b.3 MMP — Minimum Marketable Product

**MMP** is the version that's ready to be sold (or formally released) and presented as a finished product.

- **Goal:** Generate revenue or formal adoption.
- **Acceptance test:** A reasonable buyer would pay for it (or a reasonable user would recommend it).

### 9b.4 Which one is your scope?

This matters because **G2 (Build Complete) is passed against your AGREED scope, not against everything possible.**

- If the PID specifies MVP, then G2 is passed when the MVP scope is built. Period. Anything else is v1.1+.
- If the PID specifies MUP, the bar is higher — but still bounded.
- If the PID specifies MMP, the bar is highest — and the project is correspondingly larger.

**Specify which one in `14_project-initiation.md` Section 4 (Scope).** Otherwise the project drifts toward "everything we can think of" and Build never completes.

### 9b.5 The "build forever" failure mode

**This is the most common reason small-team projects fail.**

Pattern: the team keeps thinking of "one more thing" to add. Build phase stretches from 4 weeks to 8 to 16. Each addition feels small. The project's actual scope quietly triples. Eventually it stalls, gets cancelled, or ships exhausted.

**The fix is discipline at G2:**
- Define scope explicitly at G1 (PID time). Specify MVP / MUP / MMP.
- List what's NOT in scope (just as important as what is).
- At G2, ask: "Have we built the agreed scope?" — not "is there anything else we want to add?"
- Additions found during build become **decisions** in `03_decision-log.md` (Scope Decisions section), to be approved by the Sponsor with explicit baseline impact recorded.

**Signs you're falling into "build forever":**
- Build stage has lasted >2x the original estimate
- The team is excited about a feature that wasn't in the PID
- The phrase "while we're at it" appears in meetings
- The project hasn't faced a G2 review at the originally planned date

See `20_stage-gates.md` Section 8 (Anti-patterns) for the kit's stance.

---

## 10. Putting it together — minimal vocabulary for the kit

If you've read this far, here's the cheat sheet. These 12 terms are enough to use any template in the kit:

| Term | One-line definition |
|---|---|
| **Portfolio** | All the projects an organisation is running. |
| **Project** | A time-bounded effort to produce a specific deliverable. The default unit of work in PM Lite. |
| **Workpackage** | A chunk of work within a project, assigned to one owner. |
| **Sponsor** | The single individual who authorises and funds the project. |
| **Stakeholder** | Anyone affected by or affecting the project (sponsor is one; team members are not). |
| **Team member** | Someone who does project work. Defined in `10_project-roles.md`. |
| **Stage** | A named state in the project lifecycle (Pipeline, Initiation, Build, etc.). |
| **Gate** | A control point between stages with sign-off criteria. |
| **Deliverable** | Something the project produces (tangible). |
| **Outcome** | The change the deliverable creates (often less tangible). |
| **Acceptance criteria** | The testable conditions a deliverable must meet to be considered done. |
| **MVP / MUP / MMP** | Three "minimum" versions of a deliverable: viable (learn from), usable (real use), marketable (sellable). Pick one at PID time. |
| **BAU** | Operational post-project work. Not a project. |

If a buyer (or team member) is confused about which template applies to their situation, the answer is almost always in this glossary — they have a piece of work that doesn't fit one of these definitions, and clarifying which one it actually is resolves the ambiguity.

---

## Linked documents

- `02_quickstart.md` — 30-minute onboarding; uses these definitions throughout.
- `10_project-roles.md` — defines Sponsor, Project Lead, Operations Lead, team member roles.
- `10b_portfolio-roles.md` — defines Portfolio Owner, Portfolio Lead.
- `11_stakeholder-comms-plan.md` — defines the stakeholder tier model.
- `14_project-initiation.md` — captures scope, baseline, success criteria.
- `15_warranty-and-bau-handover.md` — defines the project → BAU transition.
- `16_raci-matrix.md` — uses team member and accountability concepts.
- `17_triage-guidance.md` — applies during Warranty and BAU.
- `20_stage-gates.md` — defines the 8 canonical stages and gate criteria.
- `21_decision-tree.md` — routes a buyer to the right template based on what they're working on.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- READ before any other template if you're new to PM, or new to the kit.
- REFERENCED throughout the project as terminology questions arise.

**Default cadence:**
- Read once during onboarding (typically before Phase A).
- Re-read sections as needed when terminology ambiguity arises during the project.
- Reviewed for the kit itself annually — terminology in this glossary should match how the rest of the kit's templates use these terms.

**Why this default:**
- This document doesn't change project-by-project. It's a kit-level reference.
- Annual review catches definitional drift if other templates evolve.

**When to amend:**
- Add a term whenever a new template introduces a concept this glossary doesn't define.
- Update a definition if a template refines or extends a concept defined here.
- Never remove a term that other templates still reference.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created. Defines the 14 foundational concepts the kit uses across all templates. | Claude (Cowork) |
| 2026-05-19 | 1.1 | Added §9b MVP / MUP / MMP — the "minimum" family. Includes "build forever" failure mode and how to avoid it. Added MVP/MUP/MMP row to §10 cheat sheet. | Claude (Cowork) |

---

**End of glossary and concepts template.**
