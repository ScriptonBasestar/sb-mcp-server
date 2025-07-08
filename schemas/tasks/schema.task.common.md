---
title: "시작 속도 최적화"
created: 2025-07-08
updated: 2025-07-08
tags: [performance, startup]
status: todo # todo / done / backlog / issue / alert / idea / test / report
priority: medium # low / medium / high / critical
---

# 📝 시작 속도 최적화

## 📌 설명
현재 CLI 앱의 초기 구동 속도가 2초 이상 소요됨.  
불필요한 모듈 로드 및 설정 검사 단계에서 병목 발생 추정됨.

## 🎯 목표
- 앱 구동 시간 1초 이하로 줄이기

## 🧩 작업 항목
- [ ] 의존성 모듈 동적 로딩으로 전환
- [ ] `config.validate()` 지연 실행 처리
- [ ] 최초 실행시 프리셋 캐시 추가

## 🔗 관련 문서
- [`backlogs/performance-strategy.md`](../backlogs/performance-strategy.md)

## 🧠 메모
추후 core 패키지 자체 성능 측정 도구 도입 고려
