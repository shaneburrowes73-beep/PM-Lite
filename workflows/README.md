# PM Lite Workflows

Importable n8n workflow JSON files for PM Lite.

## meeting-minutes-to-raidd.json

Extracts structured RAIDD entries from meeting transcripts using Claude (Anthropic API), posts to Slack for human approval, then inserts approved entries into a Supabase raidd_entries table.

**Triggers:**
- POST webhook at /webhook/pm-lite/meeting-minutes (header auth: X-PMLite-Token)
- Manual trigger (for testing with embedded sample transcript)

**Required credentials when importing:**
1. PM Lite Webhook Token (Header Auth) - header name X-PMLite-Token, value is a per-tenant shared secret
2. Anthropic API Key (Header Auth) - header name x-api-key, value is an Anthropic API key
3. PM Lite Supabase (Supabase API) - service role key for the tenant's Supabase project
4. PM Lite Slack (OAuth2) - Slack workspace with chat:write scope, channel pm-lite-raidd-approvals

Full spec at docs/AI_WORKFLOW_MEETING_TO_RAIDD.md.

