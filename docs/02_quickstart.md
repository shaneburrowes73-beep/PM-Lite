# PM Lite — Quickstart

A 30-minute guide to going from "I have the PM Lite kit" to "my project is running with governance in place."

This document assumes you've already cloned the repo. If you haven't, see the main [README](../README.md).

---

## What you'll have at the end of this quickstart

- A new project folder with the PM Lite templates copied in.
- A **signed-off Project Initiation Document** (PID) — the foundational agreement.
- Named **roles** with primary and backup contacts.
- A **stakeholder communications plan** with named cadences.
- A **RACI matrix** mapping roles to project workstreams.
- An empty but ready **RAIDD log** and **decision log** to capture work-in-progress.
- A **triage rhythm** established with a named triage manager and first backlog review meeting scheduled.

That's about 80% of the discipline needed to keep a project on track.

---

## Step 1 — Copy the templates

```bash
# In your project workspace:
cp -r path/to/PM-Lite/templates path/to/your-project/governance
cd path/to/your-project/governance
```

Or download the templates folder directly from GitHub if you don't have a local clone.

The templates folder lands as 19 markdown files plus `CHANGELOG.md`. The `CHANGELOG.md` is the kit's release history — you don't fill it in for your project.

---

## Step 2 — Fill in the PID first (≈10 minutes)

Open `14_project-initiation.md` and fill in every `[bracketed placeholder]`:

- Project name, ID, sponsor, lead, dates.
- Business case — why this project exists.
- Scope — in, out, and assumptions.
- Approach — phases and milestones.
- Budget and schedule with tolerances.
- Roles (cross-references `10_project-roles.md`).
- Success criteria — 3-5 measurable items.

**Get the sponsor's sign-off before any other work begins.** A PID without sponsor sign-off is wishful thinking.

If the sponsor can't sign off on the PID, that's a signal the project isn't ready to start. Don't paper over disagreement at initiation — it surfaces later, more expensively.

---

## Step 3 — Populate the roles document (≈5 minutes)

Open `10_project-roles.md`. Fill in:

- **Project Sponsor** — name, contact, backup.
- **Project Lead** — name, contact, backup (who is also the deputy triage manager per `17_triage-guidance.md` §3.3).
- **Operations Lead** — the person who will receive the project at BAU handover. Even if BAU is months away, name them now.
- **Technical Lead** if applicable.
- **Core team** rows.

Every role needs a backup. Single-person dependencies are themselves a risk worth logging.

---

## Step 4 — Set up the RACI matrix (≈5 minutes)

Open `16_raci-matrix.md`. The template comes pre-populated with 12 standard rows for typical PM Lite governance tasks. For each row, fill in the R / A / C / I cells using the roles named in step 3.

Add project-specific rows at the bottom of the matrix table — one row per workstream or deliverable that doesn't fit the standard rows.

Hard rule: every row has **exactly one A**. If you can't decide who's accountable, the row isn't well-defined yet.

---

## Step 5 — Stakeholder communications plan (≈5 minutes)

Open `11_stakeholder-comms-plan.md`. Fill in the stakeholder inventory table:

- Sponsor → monthly status report + ad-hoc on critical issues.
- Client (if external) → weekly digest.
- Team → continuous (Slack / standup).
- Plus any informed stakeholders (board, investors, compliance).

Establish the rhythm now. Late communication is harder to recover from than over-communication.

---

## Step 6 — Initialise the decision log (≈2 minutes)

Open `03_decision-log.md`. The template comes with PRINCE2 default tolerances (±10% budget, ±2 weeks OR ±10% duration for schedule). If you want to amend those for this project, do it now and log the amendment as the first decision in the log.

Common amendments at this stage:
- Set an absolute currency threshold for scope decisions (e.g., "any decision affecting more than US$5,000 requires sponsor approval regardless of percentage"). Document this in `14_project-initiation.md` §5.

---

## Step 7 — Establish triage rhythm (≈3 minutes)

Open `17_triage-guidance.md`. Confirm:

- **Triage manager** = Project Lead (per §3.3 default).
- **Deputy triage manager** = the Project Lead's backup from `10_project-roles.md`.
- **Triage backlog review meeting** = scheduled per the phase you're in (see §3.5 — typically monthly in Phase A, weekly from Phase C onward).

Get the first triage backlog review meeting on the calendar before you start any other project work.

---

## Step 8 — Start working

Phase A is now ready to execute. Open `01_apply-order.md` and `06_project-checklist.md` and start checking off items.

As work proceeds:

- **Every decision** → entry in `03_decision-log.md`.
- **Every risk, assumption, issue, dependency** → entry in `07_raidd-log.md`.
- **Every meeting** → minutes + RAIDD entries per `09_meeting-protocol.md`.
- **Every incoming item (issue, request, alert)** → triage per `17_triage-guidance.md` §1.
- **Every credential created** → `02_credentials-manifest.md` entry.
- **Every status update to sponsor** → `12_status-report.md` (monthly default).

---

## What to do at each phase transition

The discipline that prevents drift is **gate-keeping at phase transitions**. Before moving from Phase A to Phase B, from B to C, etc., the project lead confirms every checkbox in the previous phase of `06_project-checklist.md` is ticked OR has a strike-through with rationale.

A phase transition without gate review is a phase transition that hides problems.

---

## When the project ends

- **End of Phase E:** Draft `13_project-closure.md`. Get sponsor sign-off.
- **Closure sign-off triggers warranty period.** Default 30 days per `15_warranty-and-bau-handover.md`.
- **End of warranty:** Walk the BAU handover checklist in `15_warranty-and-bau-handover.md` §5. Get sign-off from Project Lead (releasing) + Operations Lead (receiving) + Sponsor (witnessing).
- **At BAU handover:** Triage manager role transfers from Project Lead to Operations Lead.

After BAU handover, the project lifecycle is complete. The templates remain as the historical record.

---

## Common pitfalls

These come up enough that they're worth flagging up front:

- **Starting Phase B without sponsor PID sign-off.** Don't. The agreement has to be in writing.
- **"We'll write up the decision log after."** No, you won't. Capture decisions at the moment they're made.
- **One-person-does-everything RACI.** If the Project Lead is A and R on every row, the team is under-used and the lead will burn out.
- **Warranty as an afterthought.** The warranty period is when most "post-launch chaos" happens. Plan it at initiation, not at closure.
- **Triage as a meeting.** Per-item triage is a 2-minute solo decision. The recurring backlog review meeting is separate.
- **Stale roles document.** A wrong roles doc is worse than no roles doc. Update within 24 hours of any team change.

---

## When NOT to use PM Lite

Be honest with yourself if any of these apply — PM Lite is the wrong tool:

- **Enterprise programme with regulatory obligations** — use PRINCE2 or PMI processes.
- **Highly variable scope with rapid iteration** — agile/scrum, not phase-gate.
- **Single tiny task taking <1 day** — overkill. Just do the work.

---

## Where to go next

- Read individual templates as you need them — each has a "Why this document exists" section at the top.
- The kit-level change history is in [`templates/CHANGELOG.md`](../templates/CHANGELOG.md).
- Versioning practice and amendment workflow are in [`VERSION_CONTROL.md`](../VERSION_CONTROL.md).
- The full template reference is in `01_what-is-pm-lite.md`.

---

**End of quickstart.**
