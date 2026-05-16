# What is PM Lite?

PM Lite is a lightweight portfolio management toolkit for small AI/digital studios, solo founders, and agencies running 5–15 concurrent projects.

It replaces a mix of Jira, Asana, Monday, Notion, and Google Sheets with a single Supabase-backed database and a small Next.js tracker UI. No swimlanes. No Gantt charts. No 12-seat minimums.

---

## The core idea

Most small portfolios fail not because the team can't write code, but because nobody can remember:

- What risks were flagged on Project B that you should have applied to Project F.
- Which assumption blew up last time and shouldn't be repeated.
- Why you picked Stripe over PayPal on Project C — was that ever written down?
- The lessons from a project that's now over.

PM Lite gives you one structured place per project (and one rolled-up portfolio view) to capture:

- **R**isks
- **A**ssumptions
- **I**ssues
- **D**ependencies
- **D**ecisions

Plus a separate **Lessons-Learned database** that survives projects ending. Plus a **Decision register** (a filtered view over the RAIDD `D` entries). Plus **8 reusable templates** so a new project doesn't start with a blank page.

That's it. The product is deliberately small.

---

## Who it's for

- Solo founders running multiple side-projects.
- Small AI / digital studios (1–10 people) building 5–15 things at once.
- Agencies running client portfolios where each client is a separate tenant.
- Consultancies who want to give every engagement a structured paper trail without setting up enterprise PM tools.

## Who it's NOT for

- Teams of 50+ — outgrown PM Lite before day one.
- Anyone who needs Gantt charts, kanban boards, or burndown charts — use Linear or Jira.
- Anyone whose work doesn't lend itself to discrete projects — use whatever you use today.

---

## What it looks like in practice

A typical day for a solo founder running 10 projects on PM Lite:

| Time | What happens |
|---|---|
| 09:00 | Open `/tracker`. RAG widget shows 1 RED (an overdue Issue on Project F). |
| 09:05 | Click into the RAIDD log, resolve the Issue (add resolution text, change status to `resolved`). |
| 11:00 | A new Risk surfaces during a client call. Add it via the `/tracker/raidd` New Entry form. |
| 14:00 | Close a Decision on Project C (chose Stripe over PayPal — log the rationale). |
| 17:00 | Reviewed three projects. Write one new Lesson: "Always confirm timezone before scheduling a Calendly link". |
| Weekly | Run a saved query — "Open Risks across portfolio". 30 seconds to skim. |

Total time managing the portfolio: ~15–30 minutes a day.

---

## What you get out of it

1. **Traceability** — every decision has rationale, date, and project context.
2. **Pattern recognition** — lessons compound across projects.
3. **Audit trail** — when a client asks "why did you do X?", you have the receipt.
4. **Onboarding** — handing a project to someone new takes 30 minutes, not 3 days.
5. **Investor-readiness** — a clean portfolio register beats a Notion mess any day.

---

## How it differs from other tools

| Tool | Strength | Why PM Lite is different |
|---|---|---|
| Jira | Enterprise issue tracking | Too heavy for portfolios under 20 people. |
| Asana | Task management | Doesn't structure decisions or lessons. |
| Notion | Flexible docs | Free-form, drifts, nobody can find anything in 6 months. |
| Linear | Modern issue tracking | Per-seat priced, no portfolio view, no lessons DB. |
| Google Sheets | Cheap | Loses structure as soon as more than one project lives in it. |
| **PM Lite** | Lightweight portfolio governance | Built for 5–15 small projects, $0–$45/month per tenant. |

---

## What's NOT in PM Lite v1.0 (and why)

- **No Gantt charts.** Small portfolios don't need them. If you need one, you've outgrown PM Lite.
- **No kanban board.** RAIDD is a structured log, not a workflow tool. Use Linear or Trello alongside if you want kanban.
- **No time tracking.** Use Toggl or Harvest.
- **No invoicing.** Use Xero or QuickBooks.
- **No native mobile app.** The web UI is mobile-responsive — that's enough for v1.0.
- **No auto-publish integrations (LinkedIn, X).** Out of scope.

This is intentional. The product earns its keep by being small enough to actually use, every day, on a busy schedule.

---

**Next:** `02_quickstart.md` for how to deploy PM Lite for yourself or a client.
