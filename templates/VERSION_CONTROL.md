# PM Lite — Version Control Policy

**Document version:** 1.0
**Kit version:** v1.2.0
**Document status:** ACTIVE
**Owner:** PM Lite kit maintainer (AI Solutions)

---

## Why this document exists

PM Lite operates two distinct version numbers:

1. **Kit version** — the version of the published PM Lite release (e.g., `v1.2.0`).
2. **Document version** — the version of an individual template within the kit (e.g., `1.4`).

These are deliberately separate. This document defines how each is managed, why the distinction matters, and how baselines are maintained at every kit release.

---

## 1. Kit version (release-level)

### 1.1 Definition

The kit version applies to **the published release of PM Lite** as a whole. Format: `vMAJOR.MINOR.PATCH` ([Semantic Versioning](https://semver.org/)).

Current kit version: **v1.2.0**.

### 1.2 When to bump the kit version

| Bump | Trigger |
|---|---|
| **MAJOR** (v2.0.0) | Backwards-incompatible changes. A buyer with filled-in v1.x templates would need to migrate to use the new version. Rare. |
| **MINOR** (v1.3.0) | New templates added; new sections added to existing templates; new conventions established. Backwards-compatible — v1.2 documents continue to work. |
| **PATCH** (v1.2.1) | Typo fixes, clarifications, link corrections. No structural changes. No new content. |

### 1.3 Where the kit version appears

- `README.md` — top of file
- `CHANGELOG.md` — section header for each release
- **Every template** — in the `Kit version:` line of the header (per §3 below)
- GitHub release tag (e.g., `v1.2.0`)

### 1.4 Kit version stamping at release (the baseline pass)

At every kit release, the maintainer performs a **baseline pass**:

1. Update `Kit version: vX.Y.Z` in the header of EVERY template — including templates that did not change in this release.
2. Bump the document version of any template that DID change (per §2 below).
3. Update `README.md` and `CHANGELOG.md` with the new release.
4. Tag the GitHub release with `vX.Y.Z`.

The baseline pass ensures **a buyer who downloads v1.2.0 sees `Kit version: v1.2.0` on every single template**, regardless of whether the document itself was modified in that release.

---

## 2. Document version (template-level)

### 2.1 Definition

The document version applies to **an individual template** within the kit. Format: `MAJOR.MINOR` (PATCH unused — typo fixes are batched into the next MINOR).

The document version tracks the evolution of THAT DOCUMENT over time. It is independent of the kit version.

Example: `03_decision-log.md` is at document version 1.4 in kit v1.2.0 because it has been amended four times since its original draft. Each amendment is recorded in the template's own `Change log` section.

### 2.2 When to bump the document version

| Bump | Trigger |
|---|---|
| **MAJOR** (2.0) | Substantial restructure of the template — sections renamed/reorganised in a way that previously-filled-in copies wouldn't cleanly merge. Rare. |
| **MINOR** (1.1, 1.2, 1.3...) | New section added; existing section materially expanded; new fields added; field semantics changed. |
| **No bump** | Typo fixes, link updates, clarifying wording without semantic change. |

### 2.3 Where the document version appears

- **Top of file** — in the `Document version:` line of the header
- **Per-template `Change log` section** — every version bump recorded with date, change description, and who made it

### 2.4 Document version vs kit version — examples

| Scenario | Kit version | Document version | Why |
|---|---|---|---|
| Template freshly created in v1.2.0 | v1.2.0 | 1.0 | First version of the document |
| Template existed in v1.1.0, unchanged in v1.2.0 | v1.2.0 | (whatever it was) | Kit stamp updated; document version preserved |
| Template existed in v1.1.0, gained new section in v1.2.0 | v1.2.0 | bumped to next minor | Both kit and document advance |
| Typo fix in v1.2.1 patch | v1.2.1 | (unchanged) | Kit stamp updated; document version unchanged (typo isn't material) |

---

## 3. Header format (mandatory for all templates)

Every template must include this header block, immediately after the title:

```markdown
# [Template Title]

**Document version:** X.Y
**Kit version:** vMAJOR.MINOR.PATCH
**Document status:** ACTIVE | DRAFT | RETIRED
[other template-specific header fields]

---
```

### 3.1 Field definitions

- **Document version** — current document version per §2.
- **Kit version** — the kit release this document ships as part of (e.g., `v1.2.0`).
- **Document status** — `ACTIVE` (current and in use), `DRAFT` (proposed but not yet active), `RETIRED` (no longer used; kept for historical reference).
- **Other fields** — per template (e.g., `Owner`, `Companion to`, `Project ID` placeholders for templates buyers fill in).

### 3.2 What's NOT in the header

- `Date:` — date fields go in template body where buyers fill them in, not in the kit-shipping header.
- `Project ID:` — same reason; this is filled in by buyers.

---

## 4. Change logs

### 4.1 Per-template change log

Every template must include a `## Change log` section at the end of the document. Format:

```markdown
## Change log

| Date | Document version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created. | Claude (Cowork) |
| 2026-05-19 | 1.1 | Added §9b MVP/MUP/MMP. | Claude (Cowork) |
```

This is the per-document audit trail. It tells the story of how THIS document evolved.

### 4.2 Kit-level CHANGELOG

`CHANGELOG.md` in the `templates/` folder is the kit-level change record. Format follows [Keep a Changelog](https://keepachangelog.com/).

Each release section includes:
- New templates added
- Existing templates modified (with document version bumps)
- New conventions established
- Out-of-scope deferrals
- Decisions captured

---

## 5. The release process

A release (MINOR or MAJOR) follows these steps:

1. **Draft** — new templates drafted; existing templates updated.
2. **Document version bumps** — every changed template gets its `Document version:` line bumped.
3. **Document change logs updated** — each changed template's `Change log` section gets a new row.
4. **Baseline pass** — every template (changed or not) gets its `Kit version:` stamp updated to the new release.
5. **CHANGELOG updated** — kit-level CHANGELOG gets a new section for the release.
6. **README updated** — template count, version, and any new sections.
7. **Commit + PR** — branch `release/vX.Y.Z`; PR to main.
8. **Merge + tag** — merge PR; tag GitHub release `vX.Y.Z`.

For PATCH releases (typo fixes only), steps 2 and 3 are skipped; steps 4-8 proceed normally.

---

## 6. What buyers see

A buyer downloading PM Lite v1.2.0 sees:

- **One kit version** — `v1.2.0`, consistent across the entire kit.
- **Varying document versions** — some templates at 1.0 (fresh), some at 1.4 (mature). This is normal and honest.
- **Consistent header format** — every template has the same `Document version / Kit version / Document status` block at the top.
- **Per-template history** — each template's `Change log` section tells the story of that document.

If a buyer asks "what version do I have?" the answer is always: **"PM Lite v1.2.0."** That's the canonical version of the kit. Document versions are internal to the kit's structure.

---

## 7. Why this approach (rationale)

### Why not "reset every document to v1.0 at each kit release"?

That would lose genuine document history. `03_decision-log.md` v1.4 reflects four real revisions across kit versions. Pretending otherwise hides legitimate evolution from anyone reading the change log.

### Why not "use only kit version, no document version"?

That would obscure which individual templates changed in a given release. With document versions, a buyer can scan headers and see "ah, the decision-log has been updated more recently than the apply-order document." Useful signal.

### Why not "use only document version, no kit version"?

That would make it hard to refer to "the kit" as a coherent product. Buyers would have to track 30 separate version numbers to know if they have a coherent set. The kit version is the single answer to "what do I have?"

### Conclusion

The hybrid approach — kit version + document version, both visible in every template header — is the professional standard. It's what serious open-source packages do (Linux kernel files, Boost C++ libraries, PostgreSQL contrib modules). It preserves history, provides consistency, and gives clear answers to common questions.

---

## 8. Anti-patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| **Stamping `Kit version: v1.0` on a v1.2 release** | Buyers think they have an old kit. Trust erodes. | Baseline pass at every release — all templates carry current kit version. |
| **Forgetting to bump document version when content changes** | Change log entry says "added new section" but document version unchanged. Confusing. | Material content change = document version bump. |
| **Bumping document version for typo fixes** | Version inflation; bumps lose meaning. | Typos fixed but document version unchanged. Track in commit history. |
| **No per-template change log** | Document evolution is invisible. | Every template has `## Change log` section at end. |
| **No `Document status` field** | Hard to tell active vs retired templates. | Always include status. RETIRED templates kept for audit but flagged. |
| **Inconsistent header format across templates** | Looks unprofessional; hard to scan. | This document is the canonical format. Every template follows it. |
| **Branching kit and document versions go out of sync** | Buyers see a v1.2.0 kit with templates claiming `Kit version: v1.1.0`. Trust erodes. | Baseline pass is part of release checklist. Never skip. |

---

## 9. Migration note — pre-v1.2.0 templates

PM Lite v1.0 and v1.1.0 templates did not consistently include `Kit version:` headers. v1.2.0 introduces this convention as part of the baseline policy.

Existing templates (those shipped in v1.1.0 and earlier) are updated at the v1.2.0 baseline pass to:
1. Replace `**Version:** X.Y` (single-line) with the new three-line header (`Document version`, `Kit version`, `Document status`).
2. Preserve their existing document version (no reset).
3. Note the convention introduction in their change log.

This is one-time work. Future releases just need the baseline pass per §5 step 4.

---

## 10. Links and references

- `README.md` — kit overview, current version
- `templates/CHANGELOG.md` — kit-level change history
- Every template's own `Change log` section — per-document history
- Semantic Versioning specification: https://semver.org/
- Keep a Changelog specification: https://keepachangelog.com/

---

## Change log

| Date | Document version | Change | By |
|---|---|---|---|
| 2026-05-19 | 1.0 | Document created. Defines the kit + document hybrid versioning policy adopted at v1.2.0 release. | Claude (Cowork) |

---

**End of version control policy.**
