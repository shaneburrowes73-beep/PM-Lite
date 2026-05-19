# Service Agent Platform — Master Integration Specification

**Date:** May 12, 2026  
**Project:** Customer Service Agent (AI Solutions)  
**Version:** 1.0 — Design Phase  
**Status:** Design Review (Awaiting Approval)

---

## EXECUTIVE SUMMARY

A secure, scalable, omnichannel service agent platform for small businesses. Customers can intake information from calls, SMS, web forms, and social media; schedule/manage appointments; validate customer information; reference business documentation; and provide draft/complete responses.

**Key Differentiators:**
- True omnichannel (phone + SMS + web + social equally robust)
- Market-specific customization via data-driven configuration (not code changes)
- Lead qualification + ROI tracking built into Phase 1
- Modular, reusable components (payment, pricing, discovery, contract generation)
- Built on AI Solutions cloud-first stack (Vercel, Supabase, n8n)

**Target Markets (Phase 1):** Barbados, UK, US  
**Business Model:** SaaS subscription ($49-119/month) + pay-per-use overage  
**Pricing Strategy:** Stripe for international; Stripe + manual payment option for Barbados (USD/GBP invoicing)

---

## ARCHITECTURE OVERVIEW

**Approach 3: Core + Market Layers**

Single codebase deployed to Vercel. All market-specific data (landing page, discovery questions, pricing, agent prompts, compliance rules) stored in Supabase as configuration. Core logic is market-agnostic; behavior is driven by config at runtime.

**Tech Stack:**
- **Frontend/API:** Vercel (Next.js) — landing page, discovery UI, admin/customer portals, webhook handlers
- **Database:** Supabase (PostgreSQL) — customers, subscriptions, market config, conversations, audit logs
- **Automation:** n8n — orchestrates incoming calls/SMS/web/social, routes to agent, manages integrations
- **Optional:** Neon database for Phase 2 analytics queries (high-volume read operations)

**Deployment:**
- Production: aisolutionsnet.net/service-agent (market detection via subdomain or geo-IP)
- Branding: Full AI Solutions brand, navigation, layout consistency
- Governance: Standard AI Solutions protocol (cloud-first, folder structure, artifact scaffold, security hardening)

---

## COMPONENT BREAKDOWN

### **FOUNDATION (Build First — Everything Depends On This)**

**1. Supabase Schema & RLS Spec**
   - Central single source of truth for all data
   - Tables: `customers`, `subscriptions`, `conversations`, `market_config`, `agent_prompts`, `pricing_rules`, `payment_transactions`, `audit_logs`
   - Row-Level Security (RLS) policies for data isolation
   - Encryption at rest, audit trails for compliance
   - **Dependency:** None (foundation)
   - **Blocks:** All other components

---

### **HIGHLY INDEPENDENT (Can Be Built in Parallel)**

**2. Payment Model Spec**
   - Stripe integration (Stripe Managed Payments)
   - Manual payment option for Barbados (bank transfer tracking)
   - Supabase payment status tracking (`payment_status`: pending → verified → active)
   - USD invoicing for Barbados, GBP for UK, etc.
   - Webhook handlers for Stripe events
   - **Dependency:** Supabase schema (payment_transactions table)
   - **Blocks:** Pricing calculator, contract generator
   - **Reusable:** Yes — other AI Solutions projects can use this

**3. Pricing Calculator Spec**
   - Tier definitions (Starter $49-59, Pro $99-119, Enterprise custom)
   - Complexity factor calculations (channels, integrations, volume)
   - Market-specific pricing from Supabase `pricing_rules` table
   - Quote generation logic
   - **Dependency:** Supabase schema (pricing_rules, market_config tables)
   - **Blocks:** Contract generator, discovery session (for final quote)
   - **Reusable:** Yes

**4. Contract Generator Spec**
   - Auto-generates PDF from discovery session data + pricing
   - Includes: customer details, requirements, SLA terms, pricing, data privacy clauses
   - Uses market-specific contract templates from Supabase
   - **Dependency:** Pricing calculator, customer profile data
   - **Blocks:** Payment initiation
   - **Reusable:** Yes

**5. Discovery Session Engine Spec**
   - Conversational UI (Vercel React component)
   - Market-aware contextual questions from Supabase `discovery_questions` table
   - SMART format: Specific, Measurable, Achievable, Relevant, Time-bound
   - ~5-7 questions, ~5 minutes to complete
   - Captures: business type, pain points, integration needs, customization priorities
   - Outputs: requirements summary (becomes contract)
   - **Dependency:** Supabase schema (discovery_questions, market_config tables)
   - **Blocks:** Pricing calculator, contract generator
   - **Reusable:** Yes

**6. Landing Page Spec**
   - Market-specific content (Barbados, UK, US versions)
   - Market research-backed ROI messaging ($126K lost revenue statistic)
   - Call-to-action: "Get Started" → discovery session
   - AI Solutions branding, navigation consistency
   - Static/semi-dynamic (content from Supabase `markets` table)
   - **Dependency:** Market research data, Supabase schema (markets table)
   - **Blocks:** None (can launch independently as marketing page)
   - **Reusable:** Template can be used for other products

---

### **MODERATELY DEPENDENT (Build After Foundation)**

**7. Admin Dashboard Spec**
   - For AI Solutions team to manage all customers
   - Real-time metrics: calls handled, bookings made, leads captured, revenue
   - Customer list with filtration (market, tier, payment status, activity)
   - Agent performance monitoring (response time, quality)
   - Ability to adjust market configs without code changes
   - **Dependency:** Supabase schema (all tables)
   - **Blocks:** None (informational tool)

**8. Customer Portal Spec**
   - For customers to view/manage their agent
   - View activity logs (calls, messages, bookings)
   - Upload/update business documents (FAQs, policies, pricing)
   - Manage escalation rules, hours of operation
   - Real-time metrics (ROI, lead conversion, revenue saved)
   - **Dependency:** Supabase schema (customers, conversations tables)
   - **Blocks:** None (customer-facing tool)

---

### **TIGHTLY INTEGRATED (Build Last — Orchestrates All Pieces)**

**9. Agent Engine & n8n Orchestration Spec**
   - n8n workflows for: incoming call handler, booking workflow, information lookup, lead capture, calendar integration, reply generator
   - Market config + customer profile merged at runtime to customize agent behavior
   - Handles: phone (Twilio), SMS (Twilio), web forms (Vercel API), social (Meta/Google APIs)
   - Integrations: Google Calendar, Outlook, Acuity Scheduling, CRMs
   - Logs all conversations to Supabase for audit + future learning
   - **Dependency:** All components above
   - **Blocks:** Nothing (final integration point)

---

## DEPENDENCY GRAPH

```
Supabase Schema (FOUNDATION)
    ↓
    ├─→ Payment Model
    ├─→ Pricing Calculator
    ├─→ Discovery Session
    ├─→ Landing Page
    ├─→ Admin Dashboard
    ├─→ Customer Portal
    │
    └─→ All Above Feed Into:
        Agent Engine & n8n Orchestration (FINAL)
```

---

## BUILD ORDER (Sequential with Parallelization)

**Phase 0 (Foundation):**
1. Supabase schema + RLS policies

**Phase 1a (Parallel — can happen simultaneously):**
2. Payment Model Spec
3. Pricing Calculator Spec
4. Discovery Session Engine Spec
5. Landing Page Spec

**Phase 1b (Depends on Phase 1a + Phase 0):**
6. Contract Generator Spec (depends on pricing + discovery output)
7. Admin Dashboard Spec
8. Customer Portal Spec

**Phase 1c (Depends on all above):**
9. Agent Engine & n8n Orchestration (wires everything together)

**Integration & Testing:**
10. End-to-end testing (discovery → quote → payment → agent provisioning)
11. Market testing (Barbados, UK, US)
12. Launch Phase 1

---

## CUSTOMIZATION & MODULARITY

**Data-Driven Configuration:**
All customer-specific behavior is stored in Supabase, not hardcoded:
- Agent personality (tone, formality)
- Business hours
- Escalation rules
- Document references
- Integration destinations
- Channels enabled

No code changes required per customer. Configuration updates trigger n8n workflow restart.

**Extensibility Hooks:**
- Pluggable workflow system (agents built from reusable blocks)
- Event-driven architecture (webhooks for config changes, agent actions)
- API versioning strategy
- Conversation versioning for A/B testing agent behavior
- RBAC for admin dashboard

---

## PHASE 1 vs PHASE 2

### **PHASE 1 (MVP — Ships All 9 Components)**
- ✅ Agent engine (phone, SMS, web, social)
- ✅ Discovery + customization
- ✅ Pricing calculator + contract generator
- ✅ Landing page (market research-backed)
- ✅ Payment integration (Stripe + manual for Barbados)
- ✅ Admin dashboard (basic metrics)
- ✅ Customer portal
- ✅ Extensibility hooks + audit trails
- ✅ Security (GDPR, data residency, RLS)

### **PHASE 2 (Expansion)**
- 📊 Advanced analytics (ROI calculations, lead quality scoring)
- 🧠 Real-time agent learning (agents improve from conversations)
- 👥 Multi-agent hierarchies (specialist agents, escalation)
- 🔐 Voice biometrics (caller verification, fraud detection)
- 📱 Additional channels (WhatsApp, TikTok Shop, marketplaces)
- 🌍 Local payment processors (WiPay, Powertranz) as volume justifies

*Note: Phase 1 architecture is designed to support Phase 2 without redesign.*

---

## SUBSCRIPTION TIERS

| **Tier** | **Starter** | **Pro** | **Enterprise** |
|---|---|---|---|
| **Price/mo** | $49-59 | $99-119 | Custom |
| **Calls/mo** | 100 | 500 | Unlimited |
| **Channels** | Phone + Web | Phone + SMS + Web + Social | All + Custom |
| **Integrations** | 1 | 3 | Unlimited |
| **Customization** | Standard | Market-specific | Full behavior control |
| **Analytics** | Basic | Advanced | Real-time + predictive |
| **Support** | Email | Priority | Dedicated account mgr |
| **Overage** | $0.50/call | $0.25/call | Included |

**Market-Specific Pricing:**
- Barbados: $39/$79/Custom (local affordability)
- UK: $49/$99/Custom (GBP)
- US: $59/$119/Custom (USD)

---

## SECURITY & COMPLIANCE

**Data Isolation:**
- Row-Level Security (RLS) in Supabase — customers see only their own data
- Encryption at rest (Supabase default)
- TLS 1.3 in transit
- Audit trail for every config change + agent decision

**Market-Specific Compliance:**
- **Barbados:** Data residency options, local business registration
- **UK:** GDPR (data processing agreements, right to deletion, consent tracking), VAT handling via Stripe
- **US:** CCPA compliance for California

**Agent Safety:**
- Conversation logging (audit trail for disputes)
- Agent reasoning capture (why each decision was made)
- Escalation rules prevent out-of-scope commitments
- Rate limiting on responses

**Deployment Security:**
- Vercel Deployment Protection (sign-in required for non-prod)
- GitHub branch protection (code review required)
- CodeQL + Dependabot automated scanning
- Secrets in Vercel env vars + 1Password (never in code)

---

## REUSABLE COMPONENTS

The following components are **explicitly designed for reuse** across AI Solutions projects:

1. **Payment Model** — Any SaaS product needing multi-market payments
2. **Pricing Calculator** — Any product with tiered pricing
3. **Discovery Session Engine** — Any onboarding flow needing customer research
4. **Contract Generator** — Any product needing automated contracts
5. **Landing Page template** — Any product needing market-specific messaging

Each spec documents the reuse boundaries and integration points.

---

## SUCCESS CRITERIA

**MVP Success (Phase 1):**
- ✅ Discovery session: <5 min, <10% abandonment
- ✅ Agent handles 80%+ of inbound calls without human escalation
- ✅ Omnichannel equally robust (phone, SMS, web, social)
- ✅ Payment processing works for Barbados (Stripe + manual) and UK (GBP)
- ✅ Contract generation automated (zero manual work per customer)
- ✅ Zero security incidents (audit trail intact)

**Phase 2 Success (Analytics):**
- ✅ Customers can see ROI metrics (revenue saved vs. agent cost)
- ✅ Lead conversion tracking integrated with CRMs
- ✅ Real-time learning improves agent response quality over time

---

## IMPLEMENTATION NOTES

- **All code in Claude:** Build and integrate all components in Cowork
- **Modular delivery:** Each component spec includes implementation notes (what to build first, dependencies)
- **Integration testing:** End-to-end flow tested after each component
- **Documentation:** Each component ships with API docs, configuration guide, testing notes

---

## NEXT STEPS

1. ✅ **Design approval** — Get sign-off on this master spec and all component specs
2. **Component specs** — Create detailed specs for each of 9 components (separate documents)
3. **Implementation plan** — Map each component to tasks with dependency tracking
4. **Execution** — Build components in dependency order, integrate as you go
5. **Testing & launch** — End-to-end testing, market validation, Phase 1 launch

---

**Document Status:** Ready for component spec creation and user approval.
