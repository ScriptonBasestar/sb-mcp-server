# schema.changelog.md

This schema defines the expected structure of `CHANGELOG.md`, following a conventional changelog format.

---

## 📘 Purpose

- Track all notable changes per version
- Help users and contributors understand progress and breaking changes
- Align with SemVer and changelog automation tools (e.g., `auto-changelog`, `semantic-release`)

---

## 🧱 Structure Specification

### 1. Title
```markdown
# Changelog
```

### 2. Unreleased Section (optional but recommended)
```markdown
## [Unreleased]
- Placeholder for ongoing changes before next release
```

### 3. Versioned Entries
Each version follows this pattern:

```markdown
## [1.2.0] - 2025-06-20
### Added
- New feature X for TUI rendering
- `sbyes settings --init` CLI command

### Changed
- Refactored Claude runner loop

### Fixed
- Crash when `.settings.local.json` is missing

### Removed
- Deprecated `--auto-confirm` flag
```

Supported sections:
- `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, `Security`

### 4. Links (Optional)
Link to GitHub releases, compare URLs, etc.

---
