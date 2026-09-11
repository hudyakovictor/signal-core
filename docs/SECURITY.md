# Security Policy

## Контур защиты

- **Admin-контур** (admin-core, CRM) доступен только из приватного VPN. Никаких публичных endpoints.
- **Game-server** — единственная публичная точка входа: REST + WSS, rate-limiting, валидация initData Telegram.

## Секреты
- Все секреты — только через переменные окружения (см. `.env.example`).
- Коммит секретов блокирует gitleaks в CI (`.github/workflows/security.yml`).

## Anti-cheat (Zero-Client-Trust)
- Клиент отправляет только тайминги нажатий и векторы свайпов.
- Урон, награды и прогресс считает сервер.
- Аномальные тайминги реакции (< человеческого минимума) — флаг в Anti-Fraud Vault.

## Ответственное раскрытие

Нашли уязвимость — откройте private security advisory на GitHub, не публикуйте issue.
