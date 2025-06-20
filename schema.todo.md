# schema.todo.md

This document defines the structure and intent of the `TODO.md` file in this project.

It standardizes how active tasks, technical notes, and temporary completions are organized and how they transition into longer-term documentation or product features.

---

## 📁 Location
```
/TODO.md
```

> The `TODO.md` file resides in the project root.  
> It serves as the **working development tracker** and is referenced by Claude, automation scripts, and team contributors.

---

## 📋 Tasks TODO

> 🔧 The primary checklist of actionable development items.

- Tasks are grouped by domain or feature area (e.g., `Authentication`, `Payments`)
- Each task uses a GitHub-style checklist syntax:
  ```markdown
  - [ ] Build feature
  - [ ] Fix bug
  ```
- Each task should be atomic and independently committable
- May include brief notes, file paths, or commands as sub-bullets (optionally)
- This section is read by Claude to execute development in order

---

## 🧠 Docs & API Notes

> 💡 Technical design fragments or documentation drafts tied to the tasks above.

- Used to keep inline notes for development or future documentation
- Typically moved into `docs/api/*.md` after the related feature is implemented
- Should not be preserved long-term inside `TODO.md`

---

## ✅ Recently Completed

> 🏁 Short-term staging area for finished work.

- Checklist items marked `[x]` are moved here temporarily
- Used by automation or Claude to detect which tasks are ready for archiving
- Items here will be **migrated to `FEATURES.md`**, **`BACKLOG.md`**, or **API docs** depending on outcome:
  - ✅ Feature complete → `FEATURES.md`
  - ❌ Failed, postponed, or invalid → `BACKLOG.md`
  - 🧾 API/structure relevant → `docs/api/`

---

## 🔄 Usage Lifecycle

1. Write new tasks in `📋 Tasks TODO`
2. Work on them using Claude or manual dev
3. Move `[x]` completed items to `✅ Recently Completed`
4. Periodically run `prompt.todo-finalize.md` to:
   - Merge into `FEATURES.md` (if done)
   - Move to `BACKLOG.md` (if skipped or abandoned)
   - Extract notes to `docs/api/*`

---

✅ This schema ensures TODO remains clean, actionable, and automatically processable by LLM agents.