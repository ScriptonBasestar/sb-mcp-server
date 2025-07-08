# 🗂️ 작업 전체 개요 (Tasks Index)

> 📌 모든 작업 항목은 **1파일 = 1작업 단위**로 구성됩니다.  
> 각 파일은 Markdown으로 작성되며, 칸반에서 한 포스트잇 수준의 크기입니다.

---

## 디렉토리 구조

```
tasks/
├── 💡 ideas/         # 초기 아이디어, 제안
├── 🐛 issues/         # 버그, 잘못된 동작, 이슈사항
├── ✅ todos/          # 당장 처리할 일 (개발/운영)
├── 🔭 backlogs/       # 나중에 할 일 (미정 or 보류)
├── 🚨 alerts/         # 긴급 알림, 장애 보고서
├── 🧪 tests/          # QA, 재현 시나리오 등
├── 📊 reports/        # 분석 결과, 회고, 메트릭 등
├── 🧭 roadmap.md      # 상위 계획 및 마일스톤 정리
└── 🗂️ index.md         # 전체 작업 문서 인덱스 및 링크 모음
```

---

## 항목별 예시

### ✅ 할 일 (todos)
- [ ] [refactor-session-cache.md](todos/refactor-session-cache.md) - 세션 캐시 구조 개선
- [ ] [optimize-startup.md](todos/optimize-startup.md) - 시작 속도 최적화

### 🐛 이슈 (issues)
- [ ] [image-upload-crash.md](issues/image-upload-crash.md) - 이미지 업로드 시 500 오류
- [ ] [session-desync.md](issues/session-desync.md) - 세션 정보 불일치

### 🚨 장애 보고 (alerts)
- [x] [2025-07-08-s3-timeout.md](alerts/2025-07-08-s3-timeout.md) - S3 타임아웃 이슈
- [ ] [2025-07-04-auth-fail.md](alerts/2025-07-04-auth-fail.md) - 인증 서버 다운

### 🔭 보류 항목 (backlogs)
- [ ] [plugin-market.md](backlogs/plugin-market.md) - 플러그인 마켓 기획
- [ ] [data-retention-policy.md](backlogs/data-retention-policy.md) - 데이터 보존 정책 설계

### 💡 아이디어 (ideas)
- [ ] [auto-translate.md](ideas/auto-translate.md) - 문서 자동 번역 기능
- [ ] [community-badge-system.md](ideas/community-badge-system.md) - 커뮤니티 배지 시스템

### 🧪 테스트/재현 (tests)
- [ ] [image-upload-repro.md](tests/image-upload-repro.md) - 이미지 업로드 재현

### 📊 리포트 (reports)
- [x] [q2-system-review.md](reports/q2-system-review.md) - Q2 시스템 성능 회고

---

## 기타

🧭 [📅 로드맵 보기](roadmap.md)
