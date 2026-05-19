# [Project Name] — Budget Management

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** [Sponsor + Project Lead]

---

## Why this document exists

Most small-team projects fail financially in one of three ways:

1. **No baseline** — the project starts spending without an agreed total, and "is this OK?" has no answer.
2. **No tracking** — money is spent, invoices arrive, but no one is comparing actual to plan until it's too late.
3. **No forecast** — actuals are tracked but no one is asking "at this rate, what will we have spent by closure?"

This template addresses all three. It's not accounting (the books still need keeping). It's project finance discipline: planning what we'll spend, tracking what we ARE spending, and forecasting where we'll END UP.

For non-PM readers: read `19_glossary-and-concepts.md` Section 3.5 (Baseline) first. Then read this.

---

## 1. Budget baseline

The baseline is the agreed total. Once set at G1 (Initiation Complete), it's the number every actual is measured against.

### 1.1 Total approved baseline

| Item | Amount | Approved by | Approved date | Reference |
|---|---|---|---|---|
| **Total project budget** | [£/$/€ X] | [Sponsor name] | [YYYY-MM-DD] | `14_project-initiation.md` §5 |
| **Contingency reserve** | [£/$/€ Y (typically 10-20%)] | [Sponsor] | [YYYY-MM-DD] | This document §1.4 |
| **Management reserve** | [£/$/€ Z (typically 5-10%, sponsor-controlled)] | [Sponsor] | [YYYY-MM-DD] | This document §1.4 |
| **Total commitment** | [£/$/€ X+Y+Z] | — | — | — |

### 1.2 Currency and conversion

- **Primary currency:** [e.g. GBP / USD / EUR]
- **Conversion policy:** [e.g. "Vendor invoices in USD; converted to GBP at month-end exchange rate. Rate locked at G1: 1 GBP = 1.27 USD."]
- **Tax handling:** [e.g. "All amounts EXCLUDE VAT. VAT recorded separately."]

### 1.3 Budget breakdown structure

Plan budget by category. Different categories behave differently (labour is hourly, licences are subscription, vendors are project-based). Use whichever categories fit the project:

| Category | Description | Baseline amount | % of total |
|---|---|---|---|
| **Labour (internal)** | Team member time × cost rate | [£X] | [%] |
| **Labour (contract / freelance)** | External individuals | [£X] | [%] |
| **Vendor / agency** | Third-party companies | [£X] | [%] |
| **Software licences** | One-time + recurring | [£X] | [%] |
| **Infrastructure** | Vercel, Supabase, AWS, hosting, domains | [£X] | [%] |
| **Tools & equipment** | Laptops, software purchases | [£X] | [%] |
| **Travel & expenses** | If applicable | [£X] | [%] |
| **Training** | Skills acquisition required for delivery | [£X] | [%] |
| **Other** | Catch-all (use sparingly) | [£X] | [%] |
| **Subtotal** | | [£X] | 100% |
| **Contingency reserve** | See §1.4 | [£Y] | +N% |
| **Management reserve** | See §1.4 | [£Z] | +N% |
| **TOTAL COMMITMENT** | | [£X+Y+Z] | — |

### 1.4 Contingency vs management reserve

Two distinct concepts often confused:

- **Contingency reserve** — money set aside for KNOWN risks (per `07_raidd-log.md`). The Project Lead can draw against this without escalating, within the per-decision tolerances in `03_decision-log.md`. Typical: 10-20% of subtotal.
- **Management reserve** — money set aside for UNKNOWN UNKNOWNS. Only the Sponsor can authorise drawing against this. Typical: 5-10% of subtotal.

**Rule of thumb for new projects:** 15% contingency + 5% management reserve = 20% buffer over the subtotal. Tighten for well-understood projects, loosen for high-uncertainty ones.

---

## 2. Spending model — CapEx vs OpEx

Two financial categorisations affect accounting and tax. Get this right at G1; it's painful to fix later.

### 2.1 CapEx (Capital Expenditure)

One-time spending that creates a durable asset.

- **Examples:** Buying a laptop, custom software development that becomes an intangible asset, equipment purchases.
- **Accounting treatment:** Capitalised on balance sheet; depreciated over useful life.
- **Tax treatment:** Spread over multiple years.

### 2.2 OpEx (Operating Expenditure)

Recurring or short-life spending consumed in the period.

- **Examples:** Monthly Vercel subscription, freelancer day rates, training courses, travel.
- **Accounting treatment:** Expensed in the period incurred.
- **Tax treatment:** Deductible in current year.

### 2.3 Why this matters for the project

- **Sponsor approvals** may differ — CapEx often needs a higher-level sign-off than OpEx.
- **Cashflow** — large CapEx is a one-time hit; OpEx spreads out.
- **Reporting** — finance may want CapEx and OpEx broken out in status reports.

Confirm at G1 which categorisation applies per budget category. Note it in §1.3.

---

## 3. Tracking — forecast vs actual

The discipline of finance management is updating this section regularly. Without it, "are we on budget?" cannot be answered.

### 3.1 Tracking cadence

| Cadence | Activity |
|---|---|
| **Weekly** | Project Lead updates actuals from invoices, timesheets, subscriptions. |
| **Monthly** | Sponsor reviews forecast vs actual. Re-forecast if variance >5%. |
| **At each gate** | Full budget review; scope decisions trigger budget review (see `03_decision-log.md`). |
| **At closure (G5)** | Final actual vs baseline recorded in `13_project-closure.md`. |

### 3.2 The tracking table

Update monthly. Add a new row each month.

| Month | Planned spend (this month) | Actual spend (this month) | Cumulative planned | Cumulative actual | Variance | % variance | Burn rate (£/week) | Forecast at completion (EAC) | Variance at completion |
|---|---|---|---|---|---|---|---|---|---|
| [YYYY-MM] | [£X] | [£Y] | [£X] | [£Y] | [£Y-X] | [%] | [£/wk] | [£EAC] | [£EAC - baseline] |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

### 3.3 Field definitions

- **Planned spend (this month)** — what the budget said this month would cost.
- **Actual spend (this month)** — what was actually spent this month.
- **Cumulative planned** — running total of planned spend through this month.
- **Cumulative actual** — running total of actual spend through this month.
- **Variance** — actual minus planned. Positive = over budget. Negative = under budget.
- **% variance** — variance ÷ cumulative planned. Easier to interpret than absolute.
- **Burn rate** — actual cumulative spend ÷ weeks elapsed. Useful for "are we running out of money?"
- **Forecast at completion (EAC)** — see §4 below.
- **Variance at completion** — EAC minus baseline. The number the sponsor cares about most.

### 3.4 Variance thresholds (when to escalate)

Per `03_decision-log.md` Section "Approval thresholds":

- **Variance <5%:** track; no action.
- **Variance 5-10%:** Project Lead notes in next status report; investigates cause.
- **Variance >10%:** Scope decision per `03_decision-log.md`. Sponsor escalation. Re-baseline OR scope reduction OR cancellation discussion.
- **Variance >20%:** Sponsor + Operations Lead emergency review. Project may need formal re-initiation.

These thresholds are PRINCE2 defaults and can be tightened/loosened in `14_project-initiation.md` per project.

---

## 4. Forecasting — Estimate at Completion (EAC)

EAC answers: "based on what we're spending and what we have left to do, what will the total project cost?"

### 4.1 EAC formulas (pick one method and stick with it)

**Method 1 — Simple linear (best for steady-state spending):**

```
EAC = (cumulative actual ÷ % work complete) × 100
```

Example: spent £30k, work is 50% done → EAC = £60k.

Pros: simple. Cons: assumes burn rate stays constant. Fails if remaining work has different cost profile.

**Method 2 — Bottoms-up (best when scope of remaining work is well-defined):**

```
EAC = cumulative actual + estimate to complete (ETC)
```

ETC is a fresh estimate of remaining work, NOT remaining baseline. If the remaining work is now better understood than at baseline time, ETC is more accurate than the original plan.

Pros: most accurate when re-estimating is feasible. Cons: takes time.

**Method 3 — Performance-adjusted (best for partial slippage signals):**

```
EAC = baseline ÷ Cost Performance Index (CPI)
where CPI = earned value ÷ actual cost
```

Pros: applies observed efficiency to remaining work. Cons: needs earned-value tracking, which is heavier than PM Lite normally requires.

**PM Lite recommendation:** start with Method 1. Switch to Method 2 if Method 1 produces obviously wrong answers.

### 4.2 EAC recording

Record EAC at every monthly tracking update (§3.2). The trend matters more than any single number — if EAC is climbing month over month, you have a budget problem regardless of current variance.

---

## 5. Vendor and invoice management

For projects with third-party vendors:

### 5.1 Vendor register

| Vendor | Service | Contract value | Invoicing schedule | Payment terms | Status |
|---|---|---|---|---|---|
| [Vendor name] | [What they do] | [£X total] | [Monthly / per milestone / end] | [Net 30 / on receipt / etc.] | [Active / Complete / Disputed] |

### 5.2 Invoice tracking

| Invoice # | Vendor | Date received | Amount | Period covered | PO ref | Approved by | Approved date | Paid date |
|---|---|---|---|---|---|---|---|---|
| [INV-001] | [Vendor] | [YYYY-MM-DD] | [£X] | [Month] | [PO ref] | [Name] | [YYYY-MM-DD] | [YYYY-MM-DD] |

### 5.3 Invoice approval rule

Standard: invoices over [threshold, e.g. £500] require Sponsor approval; under, Project Lead can approve. Confirm in `14_project-initiation.md` §5.

**Anti-pattern:** approving invoices without checking they match the contract. Every invoice should be reconciled to a contract line or purchase order BEFORE approval.

---

## 6. Cashflow

Distinct from budget tracking. Cashflow is "do we have the money to pay invoices when they arrive?"

For projects funded upfront from a single budget: not relevant (skip this section).

For projects funded incrementally or invoicing a client: track:

| Month | Cash needed (outgoing) | Cash available (incoming) | Net position | Action if negative |
|---|---|---|---|---|
| [YYYY-MM] | [£X] | [£Y] | [Y-X] | [Bridge funding / invoice earlier / delay payment] |

### 6.1 Common cashflow gotchas

- **Vendor net-30 terms** — you commit to spend in March, pay in April. Budget shows March; cash flows April.
- **Milestone invoicing client** — you incur cost throughout; you invoice client at milestone. Cash gap.
- **Annual licences paid upfront** — entire annual fee hits month 1 of project.

---

## 7. Financial reporting to sponsor

Update `12_status-report.md` with the following financial summary every status cycle:

```
## Finance
- Baseline: £X
- Cumulative actual: £Y (Z% of baseline)
- Variance this period: £A (B%)
- EAC: £C (variance at completion: £D / E%)
- Burn rate: £F / week
- Outstanding invoices pending payment: £G
- Forecast confidence: HIGH / MEDIUM / LOW
- Issues: [if any]
```

Sponsor reads this. If you don't update it, the sponsor assumes the project is fine. By the time they discover it isn't, escalation is harder.

---

## 8. Gate criteria — finance

Add these to the standard gate criteria in `20_stage-gates.md`:

- **G1 (Initiation Complete):** Baseline approved; budget breakdown structure agreed; contingency + management reserve set; CapEx/OpEx categorisation confirmed.
- **G2 (Build Complete):** Spend against baseline within tolerance; no unresolved invoices >30 days old; EAC within tolerance of baseline.
- **G3 (Test Complete):** Same as G2.
- **G4 (Deploy Complete):** All vendor obligations met (or remaining obligations documented); production cost (BAU run rate) estimated.
- **G5 (Warranty Complete):** Final actuals reconciled; closure report `13_project-closure.md` includes financial summary.

---

## 9. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **No baseline** | Spending happens but "are we OK?" has no answer. | Set baseline at G1. Sponsor signs off. |
| **Tracking actual without forecast** | You know you've spent £30k but don't know if you'll end at £40k or £80k. | Always compute EAC monthly. |
| **Re-baselining to hide overspend** | Updating the baseline to match actuals = pretending the variance never happened. | Re-baselines are scope decisions. Log them. Sponsor signs off. |
| **Contingency used as default budget** | Contingency is consumed week 1 because "we'll need it anyway." Now there's no contingency. | Contingency draws need rationale per `07_raidd-log.md`. |
| **Vendor invoices approved without reconciliation** | Vendor over-charges or double-bills, gets paid. | Every invoice reconciled to contract line before approval. |
| **Hidden costs** | Things like AWS overages, domain renewals, licence auto-renewals not in budget. | Budget breakdown explicitly includes infrastructure subscriptions (§1.3 Infrastructure row). |
| **No cashflow planning** | Budget shows spend on plan but no cash to pay invoices when due. | For phased-funding projects, always track §6. |
| **EAC ignored** | Variance this month looks fine; EAC predicts catastrophe. No one notices. | Sponsor reviews EAC monthly. EAC trend matters more than monthly variance. |

---

## 10. Links and references

- `14_project-initiation.md` — sets the baseline.
- `03_decision-log.md` — scope decisions trigger budget impact analysis. Approval thresholds defined here.
- `07_raidd-log.md` — financial risks logged here. Contingency draws referenced here.
- `12_status-report.md` — monthly financial summary lives here per §7.
- `13_project-closure.md` — final financial reconciliation.
- `20_stage-gates.md` — gate sign-offs include financial criteria per §8 above.
- `25_change-control.md` — change requests include budget impact assessment.

---

## Lifecycle cadence

**When this template is used in the project lifecycle:**
- DRAFTED at Initiation (Phase A). Baseline approved at G1.
- UPDATED weekly (actuals) and monthly (forecast) throughout Build / Test / Deploy.
- REFERENCED at every gate review.
- CLOSED at G5 (Warranty Complete) — final actuals reconciled.

**Default cadence:**
- Weekly: actuals update (Project Lead).
- Monthly: forecast update and sponsor review.
- At each scope decision: budget impact assessment.
- At each gate: full budget review.

**Why this default:**
- Weekly catches transactional errors (wrong amount, wrong vendor) before they compound.
- Monthly is the right cadence for sponsor-level forecast review — frequent enough to catch trends, not so frequent it generates noise.
- Gate reviews catch the bigger picture.

**When to amend:**
- **Tighten** (daily actuals): high burn-rate projects, fixed-deadline contracts, or post-overspend recovery mode.
- **Loosen** (monthly actuals): very small projects (<£10k) where weekly tracking exceeds the value.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | 1.0 | Document created. | [Name] |

---

**End of budget management template.**
