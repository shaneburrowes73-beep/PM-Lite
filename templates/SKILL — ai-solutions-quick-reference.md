\---  
name: ai-solutions-quick-reference  
description: Quick-reference card for the AI Solutions portfolio — canonical account, key URLs, GitHub org, Vercel team, Supabase URL, n8n instance, active workflow IDs, and Drive document IDs. Use whenever working on any AI Solutions project to avoid re-asking the user "what account / what URL?" questions. Pair with the ai-solutions-cloud-first-practices skill (rules) and the ai-solutions-vercel-deployment-defensive skill (troubleshooting).  
\---

\# AI Solutions — Quick Reference Card

The facts you need to know before doing any work on this portfolio. Updated 2026-05-11.

If anything in this file is wrong or out of date, fix it inline — this skill ships with the user's project and is the single source of truth for the "constants" of the system.

\---

\#\# 1\. Canonical account

\*\*Use \`AISolutions@aisolutionsnet.net\` for every business action.\*\*

\`clarenceburrows6@gmail.com\` is recovery-only AND the Cowork (Claude) license holder. Don't use it for ops, owners, From addresses, or service logins — EXCEPT for Cowork itself (license is bound).

Full policy: Drive doc \`1apytLHWGsAo3O2LZxlr\_T5QqRyxUPYpLItTEkGWEHJ4\` (Account Use Standard CANONICAL) \+ addendum \`1GABJnQPRsflw3Xsqq0FkgMCVDqGVrTf1UWICcu6ZfJ4\` (Exceptions).

\---

\#\# 2\. Live deployment URLs (4 feedback projects)

Vercel auto-suffixed three of these because the short name was globally taken. Use the actual URLs below, NOT the obvious \`\<projectname\>.vercel.app\` pattern (which 404s for 3 of 4):

| Project | Live URL |  
| \--- | \--- |  
| ai-lead-generator | https://ai-lead-generator-indol.vercel.app |  
| service-business-website | https://service-business-website-sable.vercel.app |  
| social-content-pipeline | https://social-content-pipeline-roan.vercel.app |  
| voice-transcript (generic template) | https://voice-transcript.vercel.app (or appropriate per project state) |  
| voice-transcript-police (police-specific instance) | \[URL pending rename from voice-recording-transcription\] |  
| ai-solutions (hub) | https://ai-solutions.vercel.app (also bound to aisolutionsnet.net) |

Always verify against Vercel API rather than assuming — names change, and Vercel's \`live: false\` flag can mean a project is built-but-not-serving.

\---

\#\# 3\. Platforms and accounts

| Platform | URL | Account / handle |  
| \--- | \--- | \--- |  
| Vercel | https://vercel.com/aisolutions-9934s-projects | Team id \`team\_Y9NBSFAQPIAiAumytBDDqxxW\`, account \`aisolutions@aisolutionsnet.net\`, plan Pro Trial as of May 2026 |  
| GitHub | https://github.com/shaneburrowes73-beep/ | Handle \`shaneburrowes73-beep\` (older commits) and \`clarenceburrows6-sys\` (newer commits) — both legitimate |  
| Supabase | https://kakcffjknzncfcydlsnt.supabase.co | AISolutions@aisolutionsnet.net |  
| Google Drive (My Drive root) | https://drive.google.com/drive/folders/0ACp0\_jAb7yS2Uk9PVA | AISolutions@aisolutionsnet.net |  
| n8n | https://aisolutionsglobal.app.n8n.cloud | AISolutions@aisolutionsnet.net |  
| Active n8n workflow | https://aisolutionsglobal.app.n8n.cloud/workflow/W4qvzy9DnINH6Rn4 | "Project Tracker Daily Refresh" — id \`W4qvzy9DnINH6Rn4\`. (The other ID \`KQ0tM99QodgTdQ7h\` mentioned in older docs is obsolete.) |  
| Cronlytic | (URL in credentials manifest) | External cron for n8n free tier |  
| Gmail SMTP | smtp.gmail.com:587 | \`alerts@aisolutionsnet.net\` (or other @aisolutionsnet.net) with App Password |  
| Cowork (Claude) | Desktop app | \`clarenceburrows6@gmail.com\` — exception, license-bound |

\---

\#\# 4\. Critical update policies (override anything older)

\- \*\*Email service:\*\* Gmail SMTP only. Resend is deprecated. (Doc id: \`CRITICAL\_UPDATE\_EMAIL\_SERVICE\_GMAIL\_ONLY\` in Drive.)  
\- \*\*Domain:\*\* aisolutionsnet.net for all business. (Doc id \`1EIg\_UFxrfpGAclNtl-7j0\_jyrC75TvQBtc2DRy38yDs\`.)  
\- \*\*Account:\*\* AISolutions@aisolutionsnet.net (Doc id \`1apytLHWGsAo3O2LZxlr\_T5QqRyxUPYpLItTEkGWEHJ4\`).

\---

\#\# 5\. Key Drive document IDs

If the user mentions any of these by name, you should jump straight to the file id:

| Doc name | File ID |  
| \--- | \--- |  
| AI Solutions — Where to Find What, and What It's For | \`1McpwuUU2-tlpLycJQD8ZkV\_IIsUmCPVqVDTVxdfuIuM\` |  
| PROJECT PORTFOLIO MASTER INDEX (v1, on Drive — paste v2 over it when ready) | \`1h-HTLf1evuuWtY31Dd3tVOG4me440tnyW1GJ3fEthY4\` |  
| BEST\_PRACTICES\_GUIDE | \`1NX\_1NYd9V6DxPJk55vuzxzTKwIrrh\_wFHvFthK59\_Mk\` |  
| BEST\_PRACTICES\_CLOUD\_FIRST\_SETUP\_GUIDE | \`12FI\_TabyDkN3pHKvVi5ZKcUMSFhPMQhL-cpMi7SSZg8\` |  
| CONSOLIDATED\_CREDENTIALS\_MANIFEST | \`1JfR\_QPhj-Q3oGkWvnXzaIhl9WBHvjKt0Nl\_XmDTeSP0\` |  
| CRITICAL\_UPDATE\_ACCOUNT\_DOMAIN\_REQUIREMENTS | \`1EIg\_UFxrfpGAclNtl-7j0\_jyrC75TvQBtc2DRy38yDs\` |  
| Account Use Standard CANONICAL | \`1apytLHWGsAo3O2LZxlr\_T5QqRyxUPYpLItTEkGWEHJ4\` |  
| Account Use Standard EXCEPTIONS Addendum | \`1GABJnQPRsflw3Xsqq0FkgMCVDqGVrTf1UWICcu6ZfJ4\` |  
| 07\_PRD-TEMPLATE | \`1JuaoS6WI-7Gp-fkgaoidCSCgIVHfcpcF5EpYzTpFSgI\` |  
| 08\_API\_INTEGRATIONS-TEMPLATE | \`1TwufdBY7vktSMehJybDXPOUIJ3Ji9XqnCsK5IplDQNk\` |  
| 09\_SUPABASE\_CONFIG-TEMPLATE | \`1753Gi3MHmSfyPOnQT\_JnDO2a0C1gmnlucZdqR9uJIxY\` |  
| 10\_VERCEL\_ENV\_VARS-TEMPLATE | \`1oq7DXj6Ka94Df28-GLjUR3jmdysjwQOqGuTJkBfBIFc\` |  
| 11\_EMAIL\_CONFIG-TEMPLATE | \`1gBaNMxEtVEnoixA7cXQCgYgc0Y61dunuj0PpFW34tmw\` |  
| 12\_N8N\_WORKFLOW-TEMPLATE | \`1X7YohNAEkzmgAnPOT3c\_fMzWBhP5MlbFILENrz-pQsc\` |  
| 13\_DEPLOYMENT\_CHECKLIST-TEMPLATE | \`1\_uTnBTPQddLCL6TxTXLY\_12S27-GmlghOpcnLc-r5q8\` |  
| 14\_GITHUB\_README-TEMPLATE | \`1ZMVL4y4Ja\_PEQo87-U38Cu6hNJTe7BhGUCE2zlvhnFM\` |

(Templates 01–06 live in the user's handoff folder on Desktop at \`C:\\Users\\barba\\OneDrive\\Desktop\\Projects\\HANDOFF-2026-05-11\\portfolio\_shared\\templates\\\`.)

\---

\#\# 6\. Common questions and the answer

| Question Claude tends to re-ask | Answer (don't re-ask) |  
| \--- | \--- |  
| "What account should I use?" | \`AISolutions@aisolutionsnet.net\` (recovery: \`clarenceburrows6@gmail.com\`) |  
| "What's the email From address?" | \`alerts@aisolutionsnet.net\` |  
| "Where is n8n?" | https://aisolutionsglobal.app.n8n.cloud |  
| "Which n8n workflow?" | id \`W4qvzy9DnINH6Rn4\` ("Project Tracker Daily Refresh") |  
| "What's the Supabase URL?" | https://kakcffjknzncfcydlsnt.supabase.co |  
| "Where do credentials live?" | Drive doc id \`1JfR\_QPhj-Q3oGkWvnXzaIhl9WBHvjKt0Nl\_XmDTeSP0\` |  
| "Which Vercel team?" | id \`team\_Y9NBSFAQPIAiAumytBDDqxxW\`, slug \`aisolutions-9934s-projects\` |  
| "Where do project folders go?" | \`Projects/\[NN\]-projectname/\` with subfolders \`specs/\`, \`code/\`, \`docs/\`, \`artifacts/\`, \`documentation/\` |  
| "Where are templates?" | Drive root (07–14) and Handoff folder (01–06). Both will end up in \`\_portfolio-shared/templates/\` once the user consolidates. |  
| "Is Resend OK?" | NO — deprecated. Gmail SMTP only. |  
| "What's the recovery email?" | \`clarenceburrows6@gmail.com\` — recovery only, never operations. |

\---

\#\# 7\. Related skills

\- \*\*\`ai-solutions-cloud-first-practices\`\*\* — the rules and 10-step setup process for any new project.  
\- \*\*\`ai-solutions-vercel-deployment-defensive\`\*\* — troubleshooting patterns for Vercel/OneDrive/Next.js deployment failures.

When in doubt about a procedure, defer to those skills' content. This file is for \*\*facts and constants\*\* only.

\---

\#\# 8\. How to keep this file current

Whenever a fact in here changes (new URL, new workflow ID, new key doc):

1\. Update the relevant line above.  
2\. Update the version date in this file's frontmatter.  
3\. Add a one-line note to \`\_portfolio-shared/lessons-learned/\` so the next session sees it.  
4\. If the change is policy-level (account, domain, email service), also update CLAUDE.md.

\*\*Last reviewed:\*\* 2026-05-11  
