# PM Lite — Version Control Best Practice and Guidelines

**Version:** 1.0
**Date:** 2026-05-19
**Status:** ACTIVE
**Owner:** AI Solutions

---

## Why this document exists

PM Lite is a living kit. Templates will be amended over time — to fix typos, clarify guidance, add new sections, retire obsolete content, or introduce new templates entirely.

Without an explicit versioning practice, three things tend to go wrong:

1. **Drift between buyer copies.** A buyer who downloaded v1.0 in May doesn't know that v1.1 in August fixed a critical clarification. Their project carries a known-bad template.
2. **No clear amendment path.** Contributors aren't sure whether to edit a template directly, open a PR, or open an issue. The result is either reckless changes or no changes at all.
3. **Per-template vs kit-level confusion.** Three different change-tracking mechanisms exist in PM Lite. Without explicit guidance, people misuse them.

This document defines:

- The **three-tier change-tracking system** PM Lite uses.
- **Semantic versioning** at the kit level.
- The **amendment workflow** for proposing and merging changes.
- **Compatibility guarantees** between kit versions.
- **Buyer guidance** on when and how to update existing projects to a new kit version.

For non-PM readers: this is the document that tells you "how does the PM Lite kit itself evolve, and what do I do if I want to suggest a change."

---

## 1. The three-tier change-tracking system

PM Lite uses three distinct change-tracking mechanisms. Each has a specific scope. Conflating them is the most common source of confusion.

### Tier 1 — Per-template `## Change log` section (project-level)

**Lives in:** the bottom of each template file (e.g., `templates/03_decision-log.md` ends with a `## Change log` section).

**Tracks:** amendments to **that specific document during a project's execution**. When the Project Lead amends the team's decision log, the change is recorded here.

**Owner:** the Project Lead of the project using the template.

**Format:**
```markdown
| Date | Version | Change | By |
|---|---|---|---|
| 2026-06-15 | 1.2 | Added scope tolerance amendment for fixed-deadline contract. | Shane |
```

**When to use it:** every time a team member edits a template during a live project. The change log is the audit trail of how this specific project's governance evolved.

### Tier 2 — Kit-level `templates/CHANGELOG.md` (release-level)

**Lives in:** `templates/CHANGELOG.md` at the repository root.

**Tracks:** changes to **the PM Lite kit itself** between releases. When v1.0 became v1.1, the changes are recorded here.

**Owner:** the PM Lite kit maintainer (currently AI Solutions).

**Format:** [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — sections for Added, Changed, Deprecated, Removed, Fixed, Security per release version.

**When to use it:** every time a new version of the kit is released. Not for individual template edits during a project.

### Tier 3 — This document (practice-level)

**Lives in:** `VERSION_CONTROL.md` at the repository root.

**Tracks:** the **policy** for how the kit is versioned and amended. Rarely changes — only when the policy itself changes.

**Owner:** the PM Lite kit maintainer.

**When to use it:** when the policy needs amending (e.g., switching from semantic versioning to date-based versioning, changing the PR workflow, etc.). Not for individual template edits.

### Quick reference

| If you're recording... | Use... |
|---|---|
| An amendment to a template in a live project | The template's own `## Change log` section (Tier 1) |
| A new release of the kit (v1.0 → v1.1) | `templates/CHANGELOG.md` (Tier 2) |
| A change to how the kit is versioned | This document (Tier 3) |

---

## 2. Semantic versioning

PM Lite uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) at the kit level. Version strings look like `vMAJOR.MINOR.PATCH` (e.g., `v1.0.0`, `v1.2.3`).

### Major (X.0.0)

A **major** version bump signals **breaking changes**. Specifically:

- A template is renamed (file path changes).
- A template's expected structure changes incompatibly (e.g., required sections removed or renamed in a way that breaks downstream references).
- The kit's conventions change (e.g., severity vocabulary, cross-reference format).
- A template is deleted.

Buyers updating from one major version to the next should expect to manually update their project's templates. The kit-level `CHANGELOG.md` will document the migration path.

### Minor (1.X.0)

A **minor** version bump signals **non-breaking additions** or substantive non-breaking changes:

- A new template is added.
- A new section is added to an existing template.
- An existing section gains new content that's additive (more guidance, new sub-section).
- A new convention is introduced that doesn't conflict with existing usage.

Buyers can adopt a minor update by replacing their templates folder; their existing project documents continue to work.

### Patch (1.0.X)

A **patch** version bump signals **non-substantive fixes**:

- Typo fixes.
- Clarifications of existing guidance.
- Reformatting (markdown table fixes, etc.).
- Updated links to current Drive doc IDs or external URLs.

Buyers can ignore patch updates if their current copy is working. Patches are forward-compatible.

### Example

| Change | Version impact |
|---|---|
| Fix a typo in `04_incident-response.md` | Patch |
| Add a new "what to do during an active breach" sub-section to `04_incident-response.md` | Minor |
| Rename `04_incident-response.md` to `04_incidents-and-breaches.md` | Major |
| Add a new template `18_security-baseline.md` | Minor |
| Remove `10b_portfolio-roles.md` from the kit | Major |
| Change the canonical severity vocabulary from lowercase to SEV-N | Major |

---

## 3. Amendment workflow

How a proposed change to the kit becomes part of a release.

### Step 1 — Identify the change

Anyone can identify a needed change. Common sources:

- A buyer reports an issue or asks a question that reveals a gap.
- A live project encounters a template that doesn't fit — and the gap is general, not just project-specific.
- A lesson learned in one project should become standing kit guidance.
- A technical/regulatory change affects existing guidance (e.g., new compliance requirement, deprecated tool).
- Cumulative minor refinements warrant a cleanup release.

### Step 2 — Open an issue (GitHub)

For non-trivial changes, open a GitHub issue in the PM-Lite repo before making the change. The issue should describe:

- The problem the change solves.
- The proposed change.
- Which template(s) are affected.
- Whether the change is breaking (major), additive (minor), or fix (patch).

For trivial typo fixes, skip directly to the PR.

### Step 3 — Open a Pull Request

All changes — including from the maintainer — go through a PR. Direct pushes to `main` are not allowed (per lesson L-008 from the PM-Lite repo's own history).

The PR should:

- Make ONE coherent change (don't bundle unrelated edits).
- Update the per-template `## Change log` section in every template touched.
- Update `templates/CHANGELOG.md` with the entry for the upcoming release.
- Reference the GitHub issue if one was opened.
- Include a brief description of why the change is needed.

### Step 4 — Review

The maintainer reviews the PR. Review criteria:

- Does the change solve a real problem (vs. preference)?
- Is it the right version bump (major / minor / patch)?
- Does it break compatibility with existing buyers?
- Is the cross-reference web intact (no broken filename references)?
- Are the per-template and kit-level change logs both updated?

### Step 5 — Merge and tag

On merge:

- The PR is squash-merged or rebase-merged (no merge commits on `main`).
- A new version tag is created (e.g., `v1.1.0`).
- A GitHub release is published with the relevant `CHANGELOG.md` excerpt as the release notes.

### Step 6 — Notify

For major and minor releases, notify known buyers via the channel(s) they consented to during the buyer engagement.

For patch releases, no notification is required; buyers pull updates at their own cadence.

---

## 4. Compatibility guarantees

What buyers can expect across versions.

### Within a major version (e.g., v1.0.0 → v1.x.y)

- **Template filenames are stable.** A cross-reference like `14_project-initiation.md` will resolve in every v1.x release.
- **Required sections are stable.** If a template has a `## Lifecycle cadence` section in v1.0, it will have one in every v1.x release.
- **Cross-reference conventions are stable.** Templates will continue to reference each other by filename.
- **Severity vocabulary is stable.** The canonical form remains `low / medium / high / critical` lowercase, with SEV-N aliases.

### Across major versions (e.g., v1.x.y → v2.0.0)

- **No automatic compatibility guarantee.** Buyers should expect to manually migrate.
- **The kit-level `CHANGELOG.md` will document the migration path** — what changed, what to update in your project's templates, and any breaking semantic changes.
- **At least 6 months of overlap support.** v1.x will continue to receive critical patches for 6 months after v2.0.0 releases, so buyers have time to migrate.

### Out of scope of compatibility guarantees

- **Templates buyers have heavily customised** — at some point your local copy diverges enough that "updating" doesn't apply. The kit assumes light customisation only.
- **Templates the kit retires** — if a template is removed in a future major version, buyers can keep using their existing copy but won't receive updates to it.

---

## 5. Buyer guidance on updating

When a new kit version releases, buyers face the question: should I update my project's templates?

### Don't update mid-project

Once a project is in flight, **stay on the kit version you started with** unless the new version contains a critical security fix or correctness fix that materially affects your project.

Reasons:

- Mid-project template changes invalidate the audit trail of decisions taken under the old version.
- The disruption cost usually exceeds the value of the update.
- Per-template change logs let you record local amendments without needing the latest kit.

### Update between projects

When starting a new project, **always use the latest kit version**. Each project starts clean.

### Critical-fix exception

If a kit release contains a critical fix (security-relevant correction, severe correctness bug in a template), it may be worth updating mid-project. The kit-level `CHANGELOG.md` will flag such fixes explicitly.

### Recording the update

If you do update mid-project:

- Note the update in the per-template `## Change log` section of each template touched.
- Reference the kit-level version (e.g., "Updated from PM Lite v1.0.0 to v1.1.0 to incorporate triage SLA fix").
- Verify all cross-references in your project's templates still resolve.

---

## 6. Anti-patterns

Common mistakes to avoid.

### Anti-pattern: Editing a template directly on `main`

Even the maintainer doesn't push directly to `main`. PRs only. Direct pushes break the review discipline that catches mistakes.

### Anti-pattern: Bundling unrelated changes in one PR

A PR that fixes a typo AND adds a new section AND renames a template is impossible to review properly. One PR = one coherent change.

### Anti-pattern: Forgetting to update both change logs

A template edit updates the template's own `## Change log` section. A kit release also updates `templates/CHANGELOG.md`. Forgetting either leaves the audit trail incomplete.

### Anti-pattern: Major version bump without migration guidance

If a release is a major bump (breaking changes), buyers need explicit migration guidance in `templates/CHANGELOG.md`. "Just update your stuff" is not migration guidance.

### Anti-pattern: Versioning per-template

Each template has its own internal version field (e.g., `**Version:** 1.2`) in its frontmatter. **These are local to the template** — they reflect amendments within a project, not kit releases. Don't try to synchronise per-template versions with kit releases. The kit-level version is the canonical release number; per-template versions are the project-local audit trail.

### Anti-pattern: Skipping the issue before a substantive PR

For trivial fixes (typos, link rot), open a PR directly. For substantive changes, open an issue first. The issue prevents two people independently working on the same problem in incompatible ways.

---

## 7. Future considerations

These are not policy yet but may become so:

- **Automated CHANGELOG generation** from PR labels (Conventional Commits or similar).
- **Branch protection** on `main` enforced via GitHub repo settings.
- **CI checks** for cross-reference integrity (every `XX_filename.md` mentioned in a template exists in `templates/`).
- **Per-template severity vocabulary lint** (catch accidental SEV-N usage in tracker fields).

These are tracked as open issues; consult the GitHub issues list for current status.

---

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created alongside PM Lite kit v1.0.0 release. | Claude (Cowork) |

---

**End of Version Control Best Practice and Guidelines.**
