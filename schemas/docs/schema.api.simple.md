# schema.api.simple.md

This schema defines the expected structure of each `docs/api/*.md` file documenting code interfaces.

---

## 📘 Purpose

- Provide human-readable documentation for public functions, classes, CLI commands
- Serve as a sync target from source code docstrings

---

## 🧱 Structure Specification

Each API document should follow:

### 1. Title (filename or module name)
```markdown
# claude_runner.py
```

### 2. Overview
- Purpose of the module or command
- Any global behavior/side-effects

### 3. Function/Class Documentation
For each function or class:

```markdown
### def run_claude(...)
- **Description**: Executes the Claude command with automated input selection
- **Parameters**:
  - `command`: str – full CLI command
  - `auto_select`: bool – whether to auto-confirm prompts
- **Returns**: `int` – exit code
```

### 4. Examples (Optional)
- CLI usage or Python usage examples

---
