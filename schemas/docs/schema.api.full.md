# schema.api.full.md

📘 이 문서는 `docs/api/*.md` 파일을 자동 생성하거나 해석하기 위한 스키마 정의입니다.  
LLM 기반 코드 문서화 도구 및 static site generator에서 사용할 수 있습니다.

---

## 🧱 Document Structure Specification

모든 API 문서는 다음 구조를 따라야 합니다:

---

## 1. 📛 Title

문서의 제목은 보통 파일 이름 또는 모듈 이름입니다.

```markdown
# claude_runner.py
```

---

## 2. 📦 Metadata

모듈 또는 스크립트 수준의 메타 정보입니다.

```markdown
## 📦 Metadata
- **Module**: `claude_runner`
- **Path**: `src/runner/claude_runner.py`
- **Since**: `v0.1.0`
- **Updated**: `2025-07-08`
- **Tags**: `llm`, `cli`, `automation`
```

---

## 3. 🔍 Overview

해당 모듈/스크립트/CLI 툴의 전반적인 역할을 설명합니다.

```markdown
## 🔍 Overview

Claude CLI 실행을 자동화하고, 명령어 프롬프트 입력을 자동 선택하는 기능을 제공합니다.  
모듈 내부에는 CLI wrapper와 auto-select 전략이 포함되어 있습니다.
```

---

## 4. 🧪 API Reference

모든 공개 함수, 클래스, 메서드는 아래 구조를 따릅니다.

```markdown
### def run_claude(command: str, auto_select: bool = True) -> int
- **Description**: Claude 명령어를 실행하고 입력 선택을 자동화합니다.
- **Parameters**:
  - `command`: `str` – 실행할 전체 CLI 명령어
  - `auto_select`: `bool` – 선택 프롬프트를 자동 응답할지 여부
- **Returns**: `int` – 종료 코드 (`0`: 성공, `1~`: 실패)
- **Raises**:
  - `ValueError`: 명령어가 빈 문자열일 경우
  - `RuntimeError`: 실행 실패 시
- **Tags**: `cli`, `llm`, `interactive`
- **See Also**:
  - `parse_claude_output()`
  - `claude_config.py`
```

> ✅ 클래스인 경우:

```markdown
### class ClaudeRunner
- **Description**: Claude 명령어 실행기. 자동 선택 옵션 및 로그 기록 기능 제공.
- **Constructor Parameters**:
  - `config`: `ClaudeConfig` – 실행 환경 설정
- **Methods**:
  - `run() -> int`
  - `log_result() -> None`
```

---

## 5. ⚙️ CLI Options (선택 사항)

CLI 명령어를 문서화할 경우, 지원되는 옵션/플래그를 명시합니다.

```markdown
## ⚙️ CLI Options
- `--auto`: 자동 입력 활성화
- `--dry-run`: 실행 없이 시뮬레이션
- `--model=<name>`: 사용할 모델명 지정
```

---

## 6. 📚 Examples (선택 사항)

실제 사용 예시를 포함합니다. CLI 또는 Python 코드 형식 모두 가능.

```markdown
## 📚 Examples

```bash
$ run_claude --auto "claude code start"
```

```python
from claude_runner import run_claude
run_claude("claude code run --auto")
```

---

## 🔄 문법 규칙

- 함수/클래스마다 **하나의 `###` 제목**을 갖습니다.
- `- **Parameters**:` 등은 반드시 bold 형식으로 시작해야 합니다.
- 각 항목은 **항상 마크다운 리스트(`-`) 형식**으로 구성합니다.
- 설명 끝에 마침표(`.`)는 선택이지만, **일관성 유지**가 권장됩니다.

---

## 🧠 사용 예

### 파일: `docs/api/claude_runner.md`

```markdown
# claude_runner.py

## 📦 Metadata
- **Module**: `claude_runner`
- **Path**: `src/runner/claude_runner.py`
- **Since**: `v0.2.0`
- **Updated**: `2025-07-08`
- **Tags**: `llm`, `cli`, `automation`

## 🔍 Overview
Claude 명령어 실행 자동화를 위한 wrapper 모듈입니다. LLM 기반 CLI 프롬프트 자동 응답을 지원합니다.

## 🧪 API Reference

### def run_claude(command: str, auto_select: bool = True) -> int
- **Description**: Claude 명령어를 실행하고 입력 선택을 자동화합니다.
- **Parameters**:
  - `command`: `str` – 실행할 전체 CLI 명령어
  - `auto_select`: `bool` – 자동 선택 여부
- **Returns**: `int` – 종료 코드
- **Raises**:
  - `RuntimeError`: 실행 실패 시
- **Tags**: `cli`, `automation`
- **See Also**:
  - `claude_config.load_config()`

## 📚 Examples

```bash
$ run_claude --auto "claude code run"
```

---

## 🏁 참고 사항

- AI가 이 스키마를 기반으로 문서를 생성하거나 수정할 때는 이 구조를 엄격히 따라야 하며,
- 문서 작성자는 사람이 읽기 쉬운 자연어를 사용하여 상세한 설명을 제공해야 합니다.

---
