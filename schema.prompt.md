# schema.prompt.md

Defines the format of Claude prompt documents in `.claude/*.md`.

---

## 📘 Purpose

- Ensure consistent format for all prompt templates
- Enable automated tooling to list, search, version, and inject prompts

---

## 🧱 Structure Specification

### 1. Title (as comment or heading)
```markdown
# prompt.name.md
```

### 2. Role Description (1–2 lines at top)
```markdown
You are resolving git merge conflicts...
```

### 3. 📂 Input Context
Describe input files or assumptions.

### 4. 🎯 Responsibilities / Goals
Bullet-point goals of the prompt

### 5. 💡 Tips or Constraints (Optional)

### 6. 📘 Schema Reference (Optional but recommended)
```markdown
This prompt aligns with:
- schema.todo.md
- schema.features.md
```

---

## 📦 File naming

- `prompt.todo-executor.md`
- `prompt.backlog-to-todo.md`
- `prompt.final-refactor.md`

---
