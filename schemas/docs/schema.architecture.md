# schema.architecture.md

This document defines the standard structure and composition of `ARCHITECTURE.md` for this project.

It ensures consistency across documentation, improves readability for new contributors, and enables Claude or other tools to reason about system structure accurately.

---

## 📁 Location
```
/ARCHITECTURE.md
```

> The file should be located in the project root, alongside `README.md`, `TODO.md`, and other core documentation.  
> This allows easy discovery, onboarding, and version control consistency.

---

## 🔷 Purpose

- Summarize the overall architecture of the project
- Clarify how major modules interact
- Explain boundaries, responsibilities, and flow of data/control
- Support onboarding, automation, and structured understanding

---

## 🧱 Structure Specification

### 1. Overview

**Purpose**: A brief description of the system’s goal and architectural style.

**Contents**:
- Short project summary
- High-level architecture type (e.g., CLI tool, REST API, event-driven)
- Key technologies (e.g., Python, Claude, VSCode, tmux)

---

### 2. Core Components

**Purpose**: Describe the main modules or packages and their responsibility.

**Contents**:
- List of major components (e.g., `cli.py`, `claude_runner.py`)
- Each component’s role, scope, and interactions
- Mention reusable utilities or shared logic

---

### 3. Architectural Layers (optional)

**Purpose**: Define system layering, if applicable.

**Contents**:
- e.g., CLI → Core Logic → Adapter → External Tools
- Responsibilities and communication direction of each layer
- Module-to-layer mapping (can be diagrammed)

---

### 4. Execution Flow or Lifecycle

**Purpose**: Explain how user input or commands travel through the system.

**Contents**:
- From CLI invocation to subprocess → interaction parsing → settings write
- Include state transitions if relevant

---

### 5. External Integrations

**Purpose**: Document how the system interacts with external tools or APIs.

**Contents**:
- Claude binary usage
- Integration with Git, VSCode (`code .`), tmux, system subprocess
- Any environmental or system dependencies

---

### 6. File & Directory Layout (optional)

**Purpose**: Show the physical project structure and file organization.

**Contents**:
Formatted tree structure like:

```bash
sb-yesman-cli/
├── sbyes/
│   ├── cli.py              # CLI entrypoint
│   ├── claude_runner.py    # Claude subprocess automation
│   ├── ...
├── .claude/                # Local project settings
├── tests/                  # Unit and CLI tests
```

---

### 7. Design Principles

**Purpose**: Capture guiding architectural or design philosophies.

**Contents**:
- Modularity (separation of concerns)
- CLI-first design (atomic commands, small commits)
- Extensibility assumptions (e.g., future TUI, GitHub Copilot CLI, etc.)
- CLI tools chosen for UX/simplicity (e.g., `typer`, `textual`)

---

### 8. Future Architecture Directions (optional)

**Purpose**: Outline plans for architectural evolution or scaling.

**Contents**:
- Claude API (vs subprocess) abstraction
- Integration of LLM model choice config
- Server or agent mode for remote Claude execution
- Moving CLI state into a persistent project context

---

## ✅ Formatting Conventions

- Use Markdown `##` headings for each section
- Use bullet points for listing components
- Add Mermaid diagrams only if helpful
- Tag optional sections explicitly (e.g., “(optional)” in header)

---

## 💡 Claude Usage Notes

When Claude is writing/modifying logic:

```plaintext
Refer to ARCHITECTURE.md for system structure and modular boundaries.
Avoid breaking cross-layer boundaries or duplicating logic between components.
```

---

## 📁 Recommended Location

- Save this file as `.claude/schema.architecture.md`
- Link from `README.md` and `ARCHITECTURE.md` header for visibility