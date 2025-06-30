# schema.tech_stack.md

This schema defines the format of `TECH_STACK.md`.

---

## 📘 Purpose
Clarify all tools, frameworks, and libraries used in the project, with their roles and key configuration decisions.

---

## 🧱 Structure Specification

### 1. Overview
- One-paragraph summary of tech philosophy or goals (e.g. minimal dependencies, performance-first, etc.)

### 2. Language & Runtime
- Main programming language(s) used
- Interpreters or runtimes (e.g. Python 3.12, Node.js LTS, etc.)

### 3. CLI Framework
- CLI parser library (e.g., `typer`, `click`)
- Reason for choice if applicable

### 4. TUI / Dashboard (Optional)
- If present, which libraries (e.g., `textual`, `urwid`)

### 5. Configuration Management
- Settings file formats (`yaml`, `.json`)
- Tools used to validate config (e.g., `pydantic`)

### 6. Logging & Debugging
- Logger used (`loguru`, `rich`, etc.)
- Debugging tools or flags

### 7. Testing Stack
- Testing tools (e.g., `pytest`, `coverage`, `hypothesis`)

### 8. Build & Packaging
- How the project is packaged or deployed (e.g., `pyproject.toml`, `setuptools`, etc.)

### 9. Prompt/AI Tooling (If used)
- Claude Code, local LLMs, automation strategies
- Reference to prompt standards

### 10. Project Structure
- Brief module outline (e.g., `sbyes/`, `tests/`, `docs/`, etc.)

---