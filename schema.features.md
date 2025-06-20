This document defines the structure and purpose of the `FEATURES.md` file in a project.

---

## 📁 Location
```
/FEATURES.md
```

> The file should be located in the project root, alongside `README.md`, `TODO.md`, and other core documentation.  
> This allows easy discovery, onboarding, and version control consistency.

---

## 🧭 Purpose

- `FEATURES.md` is a **feature-focused document** that describes what the software offers from a user's perspective.
- It is **not a task log or change history** — rather, it summarizes complete and usable features.
- It consolidates completed `TODO.md` tasks into coherent feature groups.
- It should be understandable by external contributors, project stakeholders, and end users.

---

## 🧱 Recommended Structure

```markdown
# FEATURES.md

## Major Feature Group (e.g., Authentication, Payments, Git Integration)

### Feature Name or Sub-item
- Concise description (1–2 lines) explaining what the user can do
- Summary of the implementation status (fully, partially implemented)
- Example flow or scenario if needed
- Mention relevant commands, endpoints, or CLI options
- (Optional) Related files, PR numbers, issue links, or tags
```

---

## ✨ Example

## 🔐 Authentication

### Email/Password Login
- Users can log in using their email and password.
- Credentials are verified server-side, and session or token-based auth is applied.

### Password Policy
- Passwords must be at least 8 characters and include upper/lowercase letters and numbers.

---

## 💳 Payment Features

### Toss Payments Integration
- Payment requests and confirmations are handled via the Toss API.
- Simulated test transactions are implemented for safe testing.

### Refund System
- Users can request partial or full refunds by amount (KRW).
- Refund outcomes are communicated through webhook notifications.

---

## 🧩 Optional Enhancements (Optional Sections)

- Functional **tags** or **responsible modules** (e.g., `#module:payment`)
- Feature **version metadata** or **completion dates**
- Visual flowcharts or diagrams (e.g., Mermaid)

---

## 📂 File Naming

| Filename               | Recommendation |
|------------------------|----------------|
| `schema.features.md`   | ✅ Most descriptive |
| `features.schema.md`   | ✅ Also acceptable, especially in schema/ folder |
| `features-guide.md`    | 🟡 OK for a less formal usage |

---

## 📌 Summary

- This schema helps ensure `FEATURES.md` stays focused on value, not implementation detail.
- Emphasizes structure, clarity, and grouping by **real-world functionality**.
- Improves usability for AI agents (like Claude) and for human collaborators.
