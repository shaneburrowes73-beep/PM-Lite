# Portfolio Backlog

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Portfolio Owner name]
**Scope:** [whole organisation / specific department / specific programme]

---

## Why this document exists

The portfolio backlog is the **single list of ideas being considered for becoming projects**. Without it:

- Ideas live in people's heads and get lost
- The same idea gets proposed multiple times by different people
- No one can answer "what's coming up?"
- Capacity decisions happen reactively ("we have a slot — anyone got something we should do?") instead of strategically

The backlog is where Pipeline-stage items live (per `20_stage-gates.md` §1). When an item passes G0 (Approve to Start), it leaves the backlog and becomes a project. Items can also be parked or declined explicitly — both are recorded for future reference.

**Who owns this:** the **Portfolio Owner** (see `10b_portfolio-roles.md`). Items can be submitted by anyone; triage, prioritisation, and status changes are the Portfolio Owner's responsibility.

---

## 1. Backlog entries

Each row below is a Pipeline-stage item under consideration. Add rows as ideas arise. Never delete a row — change its status to `Declined` or `Parked` instead. The full history is part of the audit trail.

| ID | Title | Description | Submitted by | Submitted date | Size | Value | Candidate sponsor | Priority | Status | Decision date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B-001 | [Short title] | [1-3 sentences] | [Name] | [YYYY-MM-DD] | XS / S / M / L / XL | High / Medium / Low | [Name] | High / Medium / Low | New / Triaged / Approved / Parked / Declined | [YYYY-MM-DD] | [Optional notes] |
| B-002 | [Short title] | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

(continue numbering as B-NNN)

---

## 2. Field definitions

| Field | Meaning |
|---|---|
| **ID** | Unique identifier within the backlog. Format: `B-NNN`. |
| **Title** | One-line description of the idea. Keep it factual. |
| **Description** | 1-3 sentences expanding the idea. What problem does it solve? What's the rough shape of the solution? |
| **Submitted by** | Who proposed it. |
| **Submitted date** | When it entered the backlog. |
| **Size** | Rough order-of-magnitude estimate. 5-point scale: **XS** (<1 week), **S** (1-4 weeks), **M** (1-3 months), **L** (3-6 months), **XL** (>6 months). Items larger than L should be broken down OR treated as a programme (see `19_glossary-and-concepts.md` §1.2). |
| **Value** | High / Medium / Low estimated business value. Use a formal business case for L and XL items. |
| **Candidate sponsor** | Who would authorise this if approved. Not committed yet — just identified. |
| **Priority** | Computed from Size × Value × Strategic fit. High / Medium / Low. See §3 below for prioritisation method. |
| **Status** | Current lifecycle position in the backlog (see §4 below). |
| **Decision date** | When status was last changed. |
| **Notes** | Optional. Context, links to related discussions, strategic fit rationale, etc. |

---

## 3. Prioritisation method

Three options, pick one and stay consistent:

### 3.1 Simple — Value × Size

**Rule:** High value + small size = top priority. Sort by Value first, then by Size (smaller = higher).

Best for: small portfolios (under 20 items), single-person backlog owner.

**Example:**

| Title | Value | Size | Computed priority |
|---|---|---|---|
| Quick fix for paying customer | High | S | **High** |
| Major new feature | High | XL | Medium |
| Internal tooling improvement | Low | XS | Low (despite being quick) |

### 3.2 Moderate — WSJF (Weighted Shortest Job First)

**Rule:** Priority = Value / Size. Sort descending. Highest WSJF first.

Numeric scoring: Value = 1/3/9 (Low/Med/High); Size = 1/3/9/27/81 (XS/S/M/L/XL).

Best for: medium portfolios (20-50 items), multi-stakeholder prioritisation.

**Example:**

| Title | Value | Size | WSJF | Rank |
|---|---|---|---|---|
| Quick fix for paying customer | 9 | 3 | 3.0 | 1 |
| Major new feature | 9 | 81 | 0.11 | 4 |
| Internal tooling improvement | 1 | 1 | 1.0 | 2 |
| Compliance work | 9 | 9 | 1.0 | 3 |

### 3.3 Strategic — multi-factor

**Rule:** Score each item on multiple factors: Value, Size, Strategic fit, Risk reduction, Time sensitivity. Weight factors per portfolio strategy.

Best for: large portfolios (50+ items), strategic planning cycles.

This is more involved than v1.0 of the kit will cover — buyers using this approach typically have dedicated PMO tooling. PM Lite recommends starting with Simple or WSJF.

### 3.4 Strategic fit override

For any prioritisation method: a high-strategic-fit item can outrank a higher-priority item that doesn't fit strategy. The Portfolio Owner has discretion. Document the override in Notes.

---

## 4. Status lifecycle

| Status | Meaning | Next states |
|---|---|---|
| **New** | Just added to backlog. Not yet triaged. | Triaged / Declined |
| **Triaged** | Reviewed by Portfolio Owner. Size, value, candidate sponsor identified. Priority set. | Approved / Parked / Declined |
| **Approved** | G0 passed. Item becomes a project. | (leaves backlog — track as project from this point) |
| **Parked** | Worth doing eventually but not now. Awaiting capacity, budget, or strategic alignment. | Triaged (when re-evaluated) / Declined |
| **Declined** | Will not be done. Recorded for future reference. | (terminal) |

**Lifecycle rules:**
- Items default to `New` when added.
- Triage moves them to `Triaged` (with priority assigned) or directly to `Declined`.
- `Approved` items move out of this backlog — they become projects.
- `Parked` items get re-evaluated quarterly (or sooner on event triggers).
- `Declined` items stay in the table for audit. Never delete.

---

## 5. Review cadence

| Cadence | Activity | Attendees |
|---|---|---|
| **As items arise** | New items added with status `New`. | Submitter |
| **Monthly minimum** | Portfolio Owner triages all `New` items: assigns size, value, priority. Items >90 days `Parked` get re-evaluated or formally declined. | Portfolio Owner + (optional) Portfolio Lead |
| **Quarterly strategic review** | Full backlog re-prioritised against current strategic goals. Items that no longer fit get declined. Top priorities confirmed for next quarter's capacity. | Portfolio Owner + Portfolio Lead + key stakeholders |
| **Ad-hoc on capacity opening** | When a project closes (G5) freeing capacity, backlog is reviewed to pick the next `Approved` item. | Portfolio Owner |
| **Annual review of this template** | Confirm fields and process still fit current portfolio scale. Adjust if grown beyond Simple → WSJF, or WSJF → Strategic. | Portfolio Owner |

---

## 6. Sizing best practice

**Use rough order of magnitude.** Pipeline isn't the place for precision — that comes at Initiation.

Calibration anchors (adjust to your context):

| Size | Effort | Examples |
|---|---|---|
| **XS** | <1 week | Small content update; minor config change; one-page document |
| **S** | 1-4 weeks | Single component build; small migration; one feature |
| **M** | 1-3 months | Multi-component delivery; significant integration; product release |
| **L** | 3-6 months | New product line; major platform change; complex migration |
| **XL** | >6 months | Large new product; multi-team transformation; usually a programme |

**XL items are flags, not approvals.** XL almost always means the item should be:
- Broken into smaller pieces (each Pipeline-able), OR
- Treated as a programme (see `19_glossary-and-concepts.md` §1.2)

Logging XL items raw in the backlog without breaking them down leads to "we'll get to it someday" indefinitely.

---

## 7. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **"It's in my head"** | Pipeline items not written down get lost. | Always log in writing, even if 1-line. The act of writing forces clarity. |
| **Backlog hoarding** | Items piling up indefinitely with no review. | Monthly triage; 90-day stale rule for `Parked`; quarterly hard cull. |
| **No declining** | Saying "maybe later" forever for items that should be killed. | Some items should be explicitly `Declined`. Decline = recorded but no longer in active rotation. |
| **G0 by ambush** | A Pipeline item gets fast-tracked to project status with no review. | G0 needs an explicit yes, even if informal. Pipeline → Approved is a status change, not a silent jump. |
| **Inventing priorities at triage** | Priority assigned without consistent method. Different items scored differently. | Pick ONE prioritisation method (§3) and stick with it across all items. |
| **XL items left as XL** | Large items accumulate at the bottom of the backlog and never move. | Break XL into smaller items OR convert to programme. Don't leave XL as a single backlog entry. |
| **Submitter sets the priority** | Conflicts of interest; everyone thinks their idea is High. | Submitter proposes the item; Portfolio Owner assigns priority during triage. |
| **No candidate sponsor field** | "Whose budget would this come from?" gets asked at G0 instead of triage. | Identify a candidate sponsor at triage. If no sponsor candidate exists, the item is probably not feasible. |
| **Backlog used as ideas dumping ground** | Everything ever mentioned gets logged. Noise drowns signal. | Light filter at intake: "is this a real candidate for a project?" Notes-app ideas stay in notes apps. |

---

## 8. Where to put the backlog

PM Lite v1.2.0 ships this template as **a markdown document** — fill in §1 as a Markdown table and it's a working backlog.

**Other places it can live:**
- **Spreadsheet** (Google Sheets, Excel) — easier to sort, filter, and share with non-technical stakeholders.
- **Tracker tool** (Notion, Linear, Jira) — better if your team already uses these.
- **Database table** (Supabase, Airtable) — best for portfolios with 50+ items.

**Whichever you choose, the FIELDS in §2 are the canonical set.** Mapping to a different tool is straightforward — preserve the field names.

**Migration note:** if you outgrow the markdown table (>30 active items, multiple Portfolio Owners), migrate to a spreadsheet or tracker. The Supabase implementation is on the PM Lite Phase 2 roadmap (logged in AI Solutions tracker as D-044).

---

## 9. Linked documents

- `10b_portfolio-roles.md` — defines Portfolio Owner / Portfolio Lead responsibilities.
- `19_glossary-and-concepts.md` — defines Portfolio, Programme, Project, Workpackage hierarchy.
- `20_stage-gates.md` §1 — defines Pipeline stage and G0 (the gate that moves items out of this backlog).
- `21_decision-tree.md` — routes buyers from "I have an idea" to "use this backlog."
- `14_project-initiation.md` — what happens to an item after it passes G0 (becomes a project).

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- ACTIVE at portfolio level, continuously. This is not a per-project template — it's portfolio-level governance.
- READ at portfolio setup (or when first establishing a backlog process).
- UPDATED whenever items are added, triaged, approved, parked, or declined.

**Default cadence:**
- Items added as they arise (no schedule).
- Monthly minimum triage (Portfolio Owner).
- Quarterly strategic review (Portfolio Owner + Portfolio Lead + stakeholders).
- Annual review of the template itself (does the format still fit the portfolio scale?).

**Why this default:**
- Backlog items are perishable in priority (a "high" item from 6 months ago may no longer be relevant) and durable in record (everything stays in the audit trail).
- Monthly triage catches new items before they go stale. Quarterly review prevents priority drift.

**When to amend the cadence:**
- **Tighten** (weekly triage) if: high volume of new items (>5 per week) OR fast-changing strategic priorities.
- **Loosen** (quarterly triage only) if: stable, slow-changing portfolio with <2 new items per month.
- **Skip entirely** is not an option for any organisation running 3+ concurrent projects.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of portfolio backlog template.**
