---
name: sop-builder
description: >
  Generate structured, professional Standard Operating Procedure (SOP) documents from plain language process descriptions.
  Use this skill whenever a user mentions "SOP", "standard operating procedure", "process doc", "runbook", "how we do X",
  or asks to "document a process", "write up our workflow", "create a procedure", or "formalize how we handle Y".
  Trigger even if the user just pastes a rough description of steps they follow — if it looks like an internal process,
  offer to turn it into a proper SOP. Always produce output with all required sections: Title, Version/Date, Purpose,
  Scope, Roles & Responsibilities, Numbered Steps with ownership, Common Issues/Exceptions, and Completion Criteria.
license: MIT
---

# SOP Builder

## Overview

Transform plain-language process descriptions into polished, consistently structured Standard Operating Procedure documents. SOPs produced by this skill are professional, unambiguous, and ready for immediate use in onboarding, compliance, or operations contexts.

## When to Use

Use this skill when:

- A user describes an internal process in conversational language and wants it documented
- Someone asks to "write an SOP", "document our process", or "create a runbook"
- A user pastes rough bullet points or a wall of text about how something is done
- A team needs a repeatable, ownable procedure for a recurring workflow
- The user wants to standardize how something is done across a team or organization

---

## Operational Workflow

### Phase 1: Intake & Clarification

Read the user's process description carefully. Before drafting, identify any critical gaps:

**Always clarify if missing:**
- **Who** performs the steps (roles/job titles, not personal names)
- **When** or how often this process runs (trigger/cadence)
- **What the end state looks like** (how do you know it's done?)
- **What can go wrong** (exceptions, escalations)

**Do not ask more than 3 clarifying questions at once.** If the description is detailed enough, proceed directly to drafting and note any assumptions inline using `[Assumed: ...]`.

### Phase 2: Draft the SOP

Use the **Strict SOP Schema** below. Do not skip or rename sections — consistency across all SOPs is a core goal of this skill.

### Phase 3: Review Prompt

After delivering the draft, always close with:

> "Does this look right? I can adjust the level of detail, add sub-steps, rename roles, or expand the Common Issues section."

---

## Strict SOP Schema

You **MUST** produce all of the following sections in this exact order:

---

### `[TITLE]`
**Standard Operating Procedure: [Process Name]**

Use a clear, action-oriented title that describes *what* the process accomplishes.
✅ "Employee Offboarding Process"
❌ "Offboarding SOP v2 FINAL"

---

### `Version & Date`

| Field        | Value              |
|--------------|--------------------|
| Version      | 1.0                |
| Date         | [Today's date]     |
| Authored By  | [Role or TBD]      |
| Reviewed By  | [Role or TBD]      |
| Next Review  | [Date + 6 months]  |

---

### `1. Purpose`

1–3 sentences. Answer: *Why does this process exist? What problem does it solve?*

Write in plain English. Avoid jargon. A new team member should understand the "why" immediately.

---

### `2. Scope`

State clearly:
- **In scope**: What this SOP covers
- **Out of scope**: What this SOP does NOT cover (be explicit)
- **Applies to**: Which teams, roles, or conditions trigger this process

---

### `3. Roles & Responsibilities`

Use a table. List every role involved. Do not use personal names — use job titles or team names.

| Role             | Responsibility                                      |
|------------------|-----------------------------------------------------|
| [Role A]         | [Primary action or ownership area]                  |
| [Role B]         | [Supporting action]                                 |
| [Role C]         | [Approver / Reviewer / Notified Party]              |

---

### `4. Process Steps`

Number every step. Each step must include:
- **What** to do
- **Who** does it (owner in bold)
- **How** to do it (tool, system, or method if relevant)
- **Output** of the step if it produces something

**Format:**

```
1. [Action verb] [what is being done]
   Owner: **[Role]**
   How: [Tool, system, or method]
   Output: [Document, status change, notification, etc.]
```

Group into logical phases using sub-headers if the process has more than ~7 steps.

**Quality bar:** Steps must be specific enough that someone performing this process for the first time could follow them without asking a question. If a step is vague, break it into sub-steps.

---

### `5. Common Issues & Exceptions`

Use a table. Cover the most likely failure modes, edge cases, and escalation paths.

| Scenario                          | What to Do                                      | Owner           |
|-----------------------------------|-------------------------------------------------|-----------------|
| [Common problem or edge case]     | [Specific action to take]                       | [Role]          |
| [Missing information / blocker]   | [Who to contact / what to escalate]             | [Role]          |
| [Exception to standard flow]      | [How to handle differently]                     | [Role]          |

Include at least 3 rows. If the user hasn't specified, infer plausible issues from the process type.

---

### `6. Completion Criteria`

Define what "done" looks like. Use a checklist format:

- [ ] [Verifiable condition 1 — e.g., "Form submitted and confirmation email received"]
- [ ] [Verifiable condition 2 — e.g., "Manager notified via Slack #ops-alerts"]
- [ ] [Verifiable condition 3 — e.g., "Record updated in [System Name]"]

Every item must be **binary and verifiable** — either done or not done. No ambiguity.

---

## Quality Standards

### DO
- Use **active voice** and **imperative verbs** ("Send the email", not "The email should be sent")
- Assign **clear ownership** to every step — no orphaned actions
- Be **specific about tools and systems** ("Update in Salesforce", not "update the CRM")
- Use `[TBD]` rather than guessing when information is genuinely missing
- Keep steps **atomic** — one action per step

### DON'T
- Use personal names — always use roles
- Write vague steps like "review the document" without specifying what to look for
- Skip the Scope section — it prevents misuse and scope creep
- Omit exceptions — every real process has them

---

## Example Output Skeleton

```
Standard Operating Procedure: New Vendor Onboarding

Version: 1.0 | Date: 2026-05-04 | Next Review: 2026-11-04

1. PURPOSE
   To ensure all new vendors are evaluated, approved, and set up in company systems
   before any payments or services are initiated.

2. SCOPE
   In scope: All new external vendors requiring payment or system access.
   Out of scope: Internal contractors already in HR systems.
   Applies to: Procurement Team, Finance, IT, and requesting department managers.

3. ROLES & RESPONSIBILITIES
   | Role                  | Responsibility                        |
   |-----------------------|---------------------------------------|
   | Requesting Manager    | Initiates request, provides business case |
   | Procurement Officer   | Reviews vendor, runs due diligence    |
   | Finance Approver      | Approves budget and payment terms     |
   | IT Admin              | Sets up system access if needed       |

4. PROCESS STEPS
   Phase 1: Request
   1. Submit vendor request via the Vendor Intake Form in [System].
      Owner: **Requesting Manager**
      How: Navigate to [URL] → Complete all required fields → Submit
      Output: Auto-generated ticket in Procurement queue

   Phase 2: Review
   2. Review vendor for compliance and risk.
      Owner: **Procurement Officer**
      How: Run vendor name through [Compliance Tool]; review W-9 or equivalent
      Output: Compliance check logged in vendor record

   ...

5. COMMON ISSUES & EXCEPTIONS
   | Scenario                         | What to Do                         | Owner                |
   |----------------------------------|------------------------------------|----------------------|
   | Vendor fails compliance check    | Escalate to Legal; do not proceed  | Procurement Officer  |
   | Urgent vendor needed <24hrs      | Follow Emergency Vendor process    | Finance Approver     |

6. COMPLETION CRITERIA
   - [ ] Vendor record created in [System] with status = Active
   - [ ] Finance Approver confirmation email received
   - [ ] Requesting Manager notified of completion
```

---

## Notes for Edge Cases

- **Highly technical processes**: Add a "Prerequisites" section before Step 1 listing required access, tools, or knowledge
- **Regulated industries**: Add a "Compliance & Regulatory References" section after Completion Criteria
- **Very short processes (<5 steps)**: Still include all sections — brevity in steps is fine; sections ensure completeness
- **Recurring processes with variations**: Document the standard path first, then note variations in Common Issues
