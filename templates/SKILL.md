---
name: ai-solutions-project-bootstrap
description: Bootstrap a Cowork conversation for a specific AI Solutions project - establishes context (Vercel project, GitHub repo, local clone, live URL, Supabase table, framework, last known status) for any of the 16 active projects WITHOUT asking the user. Triggered by phrases like "bootstrap for X", "start project thread for X", "context for X project", "set up thread for X", "what's the state of X". The user only types the project name; this skill produces a one-line context-confirmed status and pulls live state from MCPs. Designed to STOP the "rebuild from scratch" pattern that occurs when Claude starts a new thread without project context.
version: 3.0
last_updated: 2026-05-18
revision_history:
  - "1.0 (2026-05-12): initial 13-project registry"
  - "2.0 (2026-05-14): added automated-test-tool-dashboard, service-agent, pm-lite. Registry now 16 projects."
  - "2.1 (2026-05-18): filled in pm-lite full registry entry (was a stub). Captures PR-based workflow, env var Preview scoping, n8n workflow companion, GitHub repo capitalisation. Registry still 16 projects (pm-lite was already counted)."
  - "3.0 (2026-05-18): added dual-mode framing for automated-test-tool (Role A internal + Role B commercial per D-028). Added Role B Supabase target uftvngfwctvxsuvnjxal. Supabase Pro plan now active (resolves D-20260516-020). Section 3 Supabase warnings rewritten as a 4-project inventory now that PI-20 is resolved. Cross-references updated to D-028 and v4 PROJECT-CONFIG for ATT."
---

# AI Solutions - Project Bootstrap

This skill is the one-message context loader for any project-specific Cowork thread. The user invokes it by mentioning a project name in any of these patterns:

- "bootstrap for ai-lead-generator"
- "set up this thread for voice-recording-transcription"
- "context for the police project"
- "what's the state of social-content-pipeline"

When invoked, follow this procedure exactly.

---

## Procedure

### Step 1 - Identify the target project

Match the user's input against the project registry in Section 2. Resolve common aliases:

- "police project" / "police app" -> `voice-transcript-police`
- "voice transcript" / "voice transcription" - AMBIGUOUS, ask: is this the police app (voice-transcript-police, Vite SPA) or the Track A feedback shell (voice-recording-transcription, Next.js)?
- "lead gen" -> could be `ai-lead-generator` OR `leadgen-pro` - ask if ambiguous
- "iceing" - could be one of 3 iceing projects; ask which
- "hub" / "hub site" / "main site" -> `ai-solutions`
- "test tool" / "automated test tool" / "test dashboard" / "ATT" -> `automated-test-tool-dashboard` (NOTE: dual-mode product; clarify Role A internal vs Role B commercial if context unclear - see entry in Section 2)
- "agent" / "service agent" / "realtime agent" -> `service-agent`
- "pm" / "pm-lite" / "project management lite" -> `pm-lite`

If still unclear after disambiguation, call the Vercel `list_projects` MCP and present the matches.

### Step 2 - Look up static facts in the registry

For the matched project, retrieve from Section 2:
- Vercel project name + id
- GitHub repo URL
- Local clone path (if any)
- Framework
- Supabase feedback table name (if any)
- Required env vars
- Last known status note

### Step 3 - Query live state via MCPs

Run in parallel where possible:
- Vercel MCP `get_project` with the project id -> confirm `latestDeployment.readyState` and `live` flag
- If a Supabase feedback table is named in registry, optionally `list_tables` to confirm it exists
- If a local clone exists, optionally `Read` PROJECT-CONFIG.md from that folder if it exists

### Step 4 - Respond with the confirmation

Reply with exactly this format (one paragraph, less than 5 lines):

```
Context confirmed for [PROJECT NAME].
- Vercel: [state] (e.g. "READY at https://X-suffix.vercel.app")
- GitHub: github.com/shaneburrowes73-beep/[repo]
- Local clone: [path or "none - clone via git first if needed"]
- Last known status: [pulled from registry, or "live" if Vercel confirms READY + live: true]
Ready for your question.
```

### Step 5 - Do not rebuild anything

Critical mandate: everything that exists, exists. Always verify current state via MCPs before suggesting code changes, deployments, or "rebuild" actions. If a file or asset appears missing, check Vercel/GitHub/Drive before assuming it's gone.

---

## Section 2 - Project Registry (16 active projects)

### Track A feedback projects (Next.js feedback shells)

#### ai-lead-generator
- Vercel project id: `prj_MdQWDbNl7uxxTnietB83cSYXAn33`
- GitHub: `https://github.com/shaneburrowes73-beep/ai-lead-generator`
- Local clone: none - no local repo found (verified 2026-05-12). Clone if needed: `git clone https://github.com/shaneburrowes73-beep/ai-lead-generator`
- Framework: Next.js 14 App Router (pages router also present for / route)
- Supabase feedback table: `ai_lead_generator_feedback`
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_DASHBOARD_API_URL`
- Live URL: `https://ai-lead-generator-indol.vercel.app` (auto-suffix `-indol` because short name was taken)
- Last known status (as of 2026-05-11 sessions): all 3 historical blockers resolved (TypeScript devDeps in package.json, valid tsconfig.json, public/.gitkeep). Deployed and READY. Smoke test still pending.

#### service-business-website
- Vercel project id: `prj_mbtpE2Ar6F3IvoQToBfH3jUXKZ9D`
- GitHub: `https://github.com/shaneburrowes73-beep/service-business-website`
- Local clone: none - no local repo found (verified 2026-05-12). Clone if needed: `git clone https://github.com/shaneburrowes73-beep/service-business-website`
- Framework: Next.js 14 App Router
- Supabase feedback table: `service_business_website_feedback`
- Live URL: `https://service-business-website-sable.vercel.app`
- Last known status: deployed and READY. Smoke test pending.

#### social-content-pipeline
- Vercel project id: `prj_frj9Cz6ClOoNlZCZEWLqxydz6dVs`
- GitHub: `https://github.com/shaneburrowes73-beep/social-content-pipeline`
- Local clone: none - no local repo found (verified 2026-05-12). Clone if needed: `git clone https://github.com/shaneburrowes73-beep/social-content-pipeline`
- Framework: Next.js 14 App Router
- Supabase feedback table: `social_content_pipeline_feedback`
- Live URL: `https://social-content-pipeline-roan.vercel.app`
- Supabase project (for app data, distinct from feedback table): `xhsnjgsyuwthunyvtcke` (Social content pipeline). Identified 2026-05-18 via Supabase list_projects API.
- Last known status: deployed and READY. Smoke test pending.

#### voice-recording-transcription
- Vercel project id: `prj_Xt1GsiS1bom8psomeIAU8OQrk8Xw`
- GitHub: `https://github.com/shaneburrowes73-beep/voice-recording-transcription`
- Local clone: none - no local repo found (verified 2026-05-12). Clone if needed: `git clone https://github.com/shaneburrowes73-beep/voice-recording-transcription`
- Framework: Next.js 14 App Router (DISTINCT from voice-transcript-police which is Vite/React)
- Supabase feedback table: `voice_recording_transcription_feedback`
- Live URL: pull from Vercel MCP; was showing `live: false` despite READY deployment as of 2026-05-11 - may need Promote to Production from Deployments tab.
- Last known status: redeployed by user after toggling off Deployment Protection. State should now be live; verify via MCP.

### Hub project

#### ai-solutions
- Vercel project id: `prj_wAUgWw95D9BlmRNXGZDp0jvHMK16`
- GitHub: `https://github.com/shaneburrowes73-beep/ai-solutions`
- Local clone: `C:\Users\barba\OneDrive\Desktop\Claude playground\ai-solutions`
- Framework: Next.js
- Role: hosts the shared `/api/feedback-notifications` (Gmail SMTP) and `/api/feedback-status` (service-role Supabase) endpoints used by all 4 Track A feedback projects.
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- Live URL: `https://ai-solutions.vercel.app` (also bound to aisolutionsnet.net)
- Repo also hosts portfolio-wide `/skills/` and `/security/phase-1/`, `/security/phase-2/` folders (verified on main 2026-05-18). Skills sync via git pull; do not edit locally without committing.
- Last known status: deployed and serving.

### Customer-specific app (police)

#### voice-transcript-police
- Vercel project id: `prj_27rygx9MfPBefSB7Eoi0yEUjnJeQ` (RENAMED from `voice-transcript` on 2026-05-11)
- GitHub: `https://github.com/shaneburrowes73-beep/voice-transcript` (GitHub repo name may still be voice-transcript - rename separately if desired)
- Local clone: NOT present. Clone via `git clone https://github.com/shaneburrowes73-beep/voice-transcript.git voice-transcript-police` if local work needed.
- Framework: Vite + React SPA (NOT Next.js - this is critical when applying Next.js patterns)
- Live URL: `https://voice-transcript-pi.vercel.app`
- Last known status: live and serving 200 OK since 2026-05-09. Does NOT have a Next.js `/feedback` route - feedback integration with this app is TBD.
- Note: this is the customer-specific police deployment, separate from the Track A feedback shells. The Track A shells wrap testers' input on apps like this one.

### Other apps

#### leadgen-pro
- Vercel project id: `prj_R5HsrgSNU8MrAMdHu3InjIpUpdUG`
- GitHub: `https://github.com/shaneburrowes73-beep/leadgen-pro`
- Local clone: none - cloud-only.
- Backend: Google Sheets ("LeadGen Pro - Leads Database") + Google Apps Script ("Leadgen")
- Live URL: pull from Vercel MCP
- Future Supabase: dedicated project planned (not yet provisioned as of 2026-05-18)
- Last known status: live; n8n automation pending.

#### recruitment-matching-tool
- Vercel project id: `prj_RVRRI0dAruNc5ZVyG2oxtFN28lAa`
- GitHub: `https://github.com/shaneburrowes73-beep/Recruitment-matching-tool`
- Local clone: none - cloud-only.
- Live URL: pull from Vercel MCP
- Last known status: live; basic setup only - feature roadmap unclear.

#### bookshelfiq
- Vercel project id: `prj_hAc2gLh2PwjlLSjYvUhlASvcyRfd`
- GitHub: `https://github.com/shaneburrowes73-beep/bookshelfiq` (verify repo name on GitHub)
- Local clone: `C:\Users\barba\OneDrive\Desktop\Claude playground\bookshelfiq`
- Live URL: pull from Vercel MCP
- Last known status: unknown - needs audit (per older session notes).

#### oyster (Journi)
- Vercel project id: `prj_21A0Wp6NG2cI1eSdNp203z1iM4Se`
- GitHub: `https://github.com/shaneburrowes73-beep/oyster`
- Local clone: `C:\Users\barba\OneDrive\Desktop\Claude playground\oyster`
- Role: Travel planner - rebranded to Journi (Journey Begins Here). Single-file React 18 + Babel + Tailwind SPA, Vercel serverless API proxies in `/api/*.js`.
- Live URL: `https://oyster-smoky.vercel.app` (custom domain: journi.vip - DNS configured 2026-05-12, propagation may be pending)
- Last known status (2026-05-12): Journi rebrand complete, 6 live API proxies built (weather, currency, flights, hotels, photos, places). Push to GitHub pending - user to double-click `push-to-github.bat`. API keys being added to Vercel env vars per API-SETUP.md.

#### iceing-solutions
- Vercel project id: `prj_z3dTBUKdqp5MKE0dVZVmINxztSV0`
- GitHub: `https://github.com/shaneburrowes73-beep/Iceing-solutions`
- Local clone: `C:\Users\barba\OneDrive\Desktop\Claude playground\Iceing-solutions`
- Role: Main Iceing project / backend API.
- Live URL: pull from Vercel MCP

#### iceing-solutions-website
- Vercel project id: `prj_RKYIwWVYMvVrMxfBzoFDkocwV94t`
- Local clone: none - cloud-only.
- Role: Iceing marketing website.
- Live URL: pull from Vercel MCP

#### iceing-solutions-prospecting-tool
- Vercel project id: `prj_oUDyPVGHByep3o97pxWIbZlpBOxM`
- Local clone: none - cloud-only.
- Role: Lead prospecting & outreach for Iceing Solutions (Caribbean restaurants/bars).
- Detailed spec exists in Drive: `SPEC_PROSPECTING_TOOL_2026-05-06.md`
- Live URL: pull from Vercel MCP
- Last known status: live; web scraper + n8n automation pending implementation.

### Internal portfolio tooling (added 2026-05-14; dual-mode framing 2026-05-18 per D-028)

#### automated-test-tool-dashboard
- Vercel project id: `prj_ztzf8k9AKIPp4D9sOR2vPcPW9qLy`
- GitHub: `https://github.com/shaneburrowes73-beep/automated-test-tool`
- Local clone: `C:\Users\barba\OneDrive\Desktop\Claude playground\Customer service agent\code\automated-test-tool`
- Framework: Vite + React + TypeScript (SPA) + Vercel serverless functions at `/api/*` (Twist A1 architecture - see RAIDD ATT-D-002)
- **Architecture: DUAL-MODE (per D-028, 2026-05-18).** Same codebase serves two distinct roles:
  - **Role A (active, deployed 2026-05-14):** Internal AI Solutions portfolio testing. Single-tenant. AI Solutions runs tests against its own 16 portfolio projects; results owned internally. Tables cohabit with ai-solutions/tracker governance data.
  - **Role B (planned, scaffolded, not deployed):** External commercial product sold to clients. Multi-tenant with client_id partition + RLS. Marketing pages, PRD, and 9 SQL migrations drafted 2026-05-17.
- Supabase (Role A): `izxsbtpepvjcmwjagvgz` (AI-solutions-tracker) - tables `automated_test_tool_executions`, `automated_test_tool_evidence_links` (renamed from `test_*` on 2026-05-14)
- Supabase (Role B): `uftvngfwctvxsuvnjxal` (ai-solutions-automated-test-tool-prod, created 2026-05-17 by parallel session). Empty. Migrations from `supabase/migrations/` in Drive folder ready to deploy when Role B launches.
- Required Vercel env vars (Role A): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Production only), `DASHBOARD_API_SECRET`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Required GitHub Actions secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ATT_DASHBOARD_API_URL`, `ATT_DASHBOARD_API_SECRET` (4 of 5; `SERVICE_AGENT_API_TOKEN` intentionally skipped - service-agent uses ephemeral keys not API tokens)
- Live URL (Role A): `https://automated-test-tool-dashboard.vercel.app`
- Live URL (Role B): not yet deployed
- Last known status (2026-05-18): Role A MVP deployed end-to-end and proven via manual curl test (2026-05-14). Phase 2 (real Playwright `.spec.ts` files) pending - test infrastructure wired but no test files yet. Role B scaffolding (marketing, PRD, schema, components) created 2026-05-17 in `15-Automated-test-tool` Drive folder. Workflow fails at `Run smoke tests` step because there's no `test:smoke` npm script defined.
- RAIDD entries: ATT-D-001 (external client tracker per D-020), ATT-D-002 (Twist A1), ATT-I-001 (3-working-day archive safety window, target delete 2026-05-21), I-007 through I-011, L-006. Portfolio-level: D-020 (refined by D-028), D-028 (dual-mode), D-029 (.env credential acceptance), PI-33 (deferred redaction), PI-34 (.env content/credential mismatch). All logged in `public.raidd_entries` Supabase table.
- Auth: webhook `/api/test-complete` uses 64-char hex `DASHBOARD_API_SECRET` shared between Vercel env var and GitHub Actions secret. Rotate by 2026-08-12 (90-day policy).
- Project folder in Drive: `15 - Automated-test-tool` (id `1mcSiKVKd5wcXox8zXz3DUPFGGuaBzqLl`)
- PROJECT-CONFIG.md: v4 `19dIefSaGO02Yz0wFzR0u8xtGk_6xd5__` (2026-05-18 canonical reconciliation of v2/v3/UPDATED; supersedes earlier IDs `1jpkygbl9mTewL6DFaSUvQtvoWtBKQ9vQ`, `10jOnHEPc4soSqKMR_t7c_MI0nMhhRkT5`, `17w2g2YtiT0a8yOs4VnKNywE3PsdsZwqp` which are queued for archive/delete per ATT-I-001)

#### service-agent
- Vercel project id: `prj_qOryzlaWFqK8n0BnIcf5lD0P1FL6`
- GitHub: pull from Vercel MCP if needed
- Local clone: pull from Vercel MCP if needed
- Framework: Next.js (uses OpenAI Realtime API with ephemeral keys, not long-lived API tokens)
- Supabase: `udlmytuetqmfctpwqjmv` (service-agent-prod, created 2026-05-12)
- Live URL: `https://service-agent.vercel.app`
- Last known status (2026-05-14): live but throwing `error.no_ephemeral_key` in browser console. Backend `/api/session` (or equivalent) is failing to issue Realtime API ephemeral key. Likely cause: OpenAI API key env var missing or expired on the Vercel project. Not investigated in detail this session - flagged for separate triage.
- Auth model: client fetches ephemeral key from backend, then opens WebSocket to OpenAI with that key. There is NO long-lived API token to issue to test runners (this is why `SERVICE_AGENT_API_TOKEN` was correctly skipped from the automated-test-tool GitHub Actions secrets).

#### pm-lite
- Vercel project id: `prj_pa6uUmrE1eQVQ46YCxMBPSnkLWKv`
- GitHub: `https://github.com/shaneburrowes73-beep/PM-Lite` (note capitalisation; older Supabase row had lowercase)
- Local clone: `C:\PM-Lite-fresh` (clean working clone; OLDER `C:\Users\barba\OneDrive\Desktop\Projects\PM-Lite\` is BROKEN and should be ignored/renamed)
- Framework: Next.js 14 App Router (verified via Vercel MCP)
- Supabase tables: uses portfolio-wide tables `applications`, `raidd_entries`, `project_metrics_history`, `blocker_history`, `opportunity_history`, `audit_logs` (in `izxsbtpepvjcmwjagvgz`). PM-Lite is the dashboard for the portfolio tracker, not a project with its own feedback table.
- Required Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL` (All Environments), `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production + Preview as of 2026-05-18), `SUPABASE_SERVICE_ROLE_KEY` (Production + Preview as of 2026-05-18). See L-010 in `ai-solutions-cloud-first-practices` skill.
- Live URL: `https://pm-lite-peach.vercel.app` (canonical) + `pm-lite-aisolutions-9934s-projects.vercel.app` (team alias) + `pm-lite-git-main-aisolutions-9934s-projects.vercel.app` (main-branch alias)
- Branch protection: Yes, PR-based workflow enforced. Use feature branches and PRs, not direct push to main.
- n8n companion workflow: `workflows/meeting-minutes-to-raidd.json` in the GitHub repo. Importable into n8n; takes a meeting transcript, calls Claude to extract RAIDD entries, Slack-approves, inserts to `raidd_entries`. Workflow ID in n8n: `CtoMkvgZ2l1Z3DcQ`.
- Last known status (2026-05-18): Phase 2-6 complete. 13 governance templates in `Projects/16-pm-lite/templates/`. Production build healthy after PI-36 fix (TrackerShell merge conflict). Main branch unblocked. PR #2 (n8n workflow) and PR #3 (PI-36 fix) both merged 2026-05-18 ~17:54 UTC. Open follow-ups: PI-35 (17 Dependabot vulnerabilities), PI-37 (unintended Vercel auto-deploy timing), PI-39 (Navigation 'Dashboard' button mislabel - should be 'Login').
- RAIDD entries: own project_id is `pm-lite` with D-027 (Phase 1 launch); most session work logged at `portfolio` level (D-030, D-031, PI-35 through PI-39, L-008 through L-010).
- Sell page: `https://aisolutionsnet.net/tools/pm-lite` renders from `public.tool_sell_pages` row with `slug='pm-lite'`. Investigation note (PI-38): direct navigation works; only the "Dashboard" nav button is mislabelled.

---

## Section 3 - Portfolio-wide constants (always true)

These never change, embed them in every project context:

- Vercel team: `aisolutions-9934s-projects` (team id `team_Y9NBSFAQPIAiAumytBDDqxxW`)

### Supabase project inventory (4 active + 1 planned as of 2026-05-18)

PI-20 RESOLVED 2026-05-18: all known Supabase URLs identified via list_projects API.

| Project ref | Name | Used by | Plan |
|---|---|---|---|
| `izxsbtpepvjcmwjagvgz` | AI-solutions-tracker | Portfolio governance (raidd_entries, applications, etc.) + automated-test-tool Role A test data (cohabiting). Used by ai-solutions hub, pm-lite, ATT Role A. | Pro (upgraded 2026-05-18, resolves D-20260516-020) |
| `udlmytuetqmfctpwqjmv` | service-agent-prod | service-agent only | (verify in Supabase dashboard) |
| `uftvngfwctvxsuvnjxal` | ai-solutions-automated-test-tool-prod | automated-test-tool Role B (commercial). Empty - migrations ready to deploy when Role B launches. | (verify in Supabase dashboard) |
| `xhsnjgsyuwthunyvtcke` | Social content pipeline | social-content-pipeline app data | (verify in Supabase dashboard) |
| (planned) | (TBD) | leadgen-pro | (planned, not yet provisioned) |

DEPRECATED reference: older docs mention `kakcffjknzncfcydlsnt.supabase.co`. Not in current Supabase inventory; treat as obsolete unless evidence surfaces otherwise.

### Other constants

- GitHub org: `shaneburrowes73-beep` (handles `shaneburrowes73-beep` and `clarenceburrows6-sys`)
- n8n: `https://aisolutionsglobal.app.n8n.cloud`. Active workflows include `W4qvzy9DnINH6Rn4` (Project Tracker Daily Refresh) and `CtoMkvgZ2l1Z3DcQ` (pm-lite meeting-minutes-to-raidd).
- Canonical email account: `AISolutions@aisolutionsnet.net` (recovery only: `clarenceburrows6@gmail.com` - exception: Cowork license)
- Gmail SMTP From: `alerts@aisolutionsnet.net`
- Email service: Gmail SMTP only (Resend is deprecated)
- Skills + security policies canonical location: `https://github.com/shaneburrowes73-beep/ai-solutions` on `main` under `/skills/` and `/security/phase-1/`, `/security/phase-2/`. Skills sync via git pull; do not edit local installs without committing back.

---

## Section 4 - How to extend this skill

When a new project is added, or a project's static facts change:

1. Add or update its entry in Section 2 above.
2. Bump the `version` and `last_updated` fields in the frontmatter.
3. Append a one-line entry to `revision_history` in the frontmatter describing what changed.
4. Update the "Last reviewed" date at the bottom AND the project count in both the description (frontmatter line 3) AND the Section 2 header.
5. If the user adds a brand-new project mid-conversation, use Vercel MCP `list_projects` to discover its id, then add to Section 2 inline before responding.

**CRITICAL - LIVING DOCUMENT DISCIPLINE:** Before editing this skill, ALWAYS pull the latest version from GitHub main (`git pull origin main` in your local ai-solutions clone, then `Get-Content skills/ai-solutions-project-bootstrap/SKILL.md`). Edit FROM the current version, not from your Cowork mount (which may be stale by days or hours). Merge your changes INTO the latest content, do not overwrite. Commit via PR per the standard PR workflow. Source for this rule: 2026-05-18 session where v1.0 mount nearly overwrote v2.1 pm-lite content.

When a project is renamed, retired, or replaced:

1. Mark the old name as deprecated in Section 2 with a forward pointer to the new name.
2. Keep the old name searchable so old references still resolve.

---

## Section 5 - Edge cases

- **Project not in registry:** call Vercel MCP `list_projects`, find the matching project, add a brief entry to Section 2 for this session's use (and recommend the user permanently update the skill).
- **User mentions a project name that doesn't exist:** ask for clarification. Do NOT invent. Do NOT assume it's a typo of something close.
- **User wants to bootstrap multiple projects at once:** run Step 2-4 for each project in sequence. Don't try to merge contexts.
- **User starts with a vague intent ("I want to work on the feedback stuff"):** ask which of the 4 Track A projects, OR offer the portfolio-wide thread bootstrap.
- **User says "automated test tool" without specifying role:** confirm Role A (internal portfolio testing) or Role B (commercial product). They share a codebase but have different Supabase targets, env vars, and deployment shapes per D-028.

---

## Section 6 - Companion skills

After bootstrapping, the conversation typically also needs:

- `portfolio-quick-reference` (or `ai-solutions-quick-reference`) - facts and IDs you may need mid-conversation
- `ai-solutions-cloud-first-practices` - rules and procedures (see L-010 for env var Preview scoping)
- `ai-solutions-vercel-deployment-defensive` - troubleshooting if anything is failing

Invoke them as needed based on what the user is asking.

---

**Last reviewed:** 2026-05-18. Registry contains 16 active projects. v3.0 adds dual-mode framing for automated-test-tool (D-028), 4-project Supabase inventory (PI-20 resolved), Supabase Pro plan note, and living-document discipline rule in Section 4.
