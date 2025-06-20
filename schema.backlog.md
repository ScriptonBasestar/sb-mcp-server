This document defines the structure and purpose of the `BACKLOG.md` file in a project.

---

## 📁 Location
```
/BACKLOG.md
```

> The file should be located in the project root, alongside `README.md`, `TODO.md`, and other core documentation.  
> This allows easy discovery, onboarding, and version control consistency.

---

## 🧭 Purpose

- To document features and ideas that are **not yet implemented**, typically scheduled for **post-MVP** phases
- To serve as a structured list of **future ideas**, **technical proposals**, and **deferred tasks**
- To clearly separate “planned but not committed” features from those in `TODO.md`
- To organize items by phase, category, or strategic importance

---

## 🧱 Recommended Structure

```markdown
# BACKLOG.md

## 🚧 [Stage or Category Name] (e.g., Post-MVP, v1.1+, Stretch Goals, Future Enhancements)

### Feature Title or Idea Name
- Brief description of what the feature is or aims to do
- Expected value or user-facing benefit
- (Optional) Known technical challenges or constraints
- (Optional) Connections to existing features or dependencies
```

---

## ✨ Example

## 🚧 Post-MVP Features

### Internationalization (i18n)
- Add support for UI translations and locale-based content
- Detect browser language and allow switching between languages

### Claude TUI Monitoring
- Use the `Textual` library to build a dashboard for monitoring active Claude sessions and logs

---

## 📈 Technical Extensions

### Claude API Mode
- Support for Claude via direct API calls instead of CLI
- May require session and authentication redesign

### Multi-Model Support
- Extend CLI tool to support GPT, Gemini, or other models in addition to Claude
- Abstract model-specific behaviors into a pluggable architecture

---

## 📌 Management Guidelines

- Do not include tasks here that are already in `TODO.md`
- Once a backlog item is ready for implementation, move it to `TODO.md`
- Avoid duplicating existing features — explain how this is **different or additive**
- If needed, label priorities or tag categories for large lists

---

## 📁 Suggested Filenames

| Filename         | Description                                 |
|------------------|---------------------------------------------|
| `BACKLOG.md`     | Standard filename used across most projects |
| `roadmap/ideas.md` | Use this for early-stage or R&D-style ideas |
| `futures.md`     | Suitable for informal, speculative ideas     |

---

## ✅ When to Use

- **Planning**: Early-stage brainstorming and exploration
- **Design Review**: To assess feasibility before committing
- **AI-driven Refactoring**: Claude or other LLMs can analyze and filter future work
- **Sprint Grooming**: Move prioritized backlog items to `TODO.md`
