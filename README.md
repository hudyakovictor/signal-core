# Signal Arena Core

**High-Stakes Anti-Trading Roguelite** — Phaser 4 + TypeScript + Vite + RexUI, вертикальный формат 9:16, Telegram Mini Apps first, перспектива GameFi 2.0.

> **Origin & R&D Archive:** все начальные multi-agent исследовательские сессии, сырые патчи и концепт-эксплорации сохранены в архивном репозитории: [hudyakovictor/arenarel](https://github.com/hudyakovictor/arenarel) (папка `patches/`).

## Продукт

Signal Arena — не торговый терминал и не симулятор биржи. Это boss-rush игра о психологии рынка: игрок сражается с боссами-архетипами (FOMO Wraith, Leverage Goblin, Headline Titan, Hubris Dragon), парируя рыночные манипуляции ритмическими свайпами и картами стратегий.

Наставник — **Скрепка** (Clippy x Йода): аналоговый «ИИ» из прошлого, который скрывает, что он не ИИ.

## Монорепо-структура

```
signal-core/
├── apps/
│   ├── game-client/   # Phaser 4 + TS + Vite + RexUI (игра, 9:16)
│   └── admin-crm/     # Панель управления (React / Tailwind)
├── services/
│   ├── game-server/   # Клиентский шлюз (Fastify + Redis, Zero-Client-Trust)
│   └── admin-core/   # Сервер операций (NestJS + PostgreSQL)
└── packages/
    └── shared-types/  # Общие интерфейсы (боссы, карты, телеметрия)
```

## Документация

- [MASTER_ARCHITECTURE_SPEC.md](./MASTER_ARCHITECTURE_SPEC.md) — мастер-ТЗ (AAA Web3, 99 уровень)
- [docs/PATCH_MERGE_PLAN.md](./docs/PATCH_MERGE_PLAN.md) — план слияния патчей из архива arenarel

## Roadmap

- Phase 0: слияние 4 патчей из arenarel в монорепо
- Phase 1: vertical slice — 3 босса + диалоги Скрепки
- Phase 2: Telegram Mini App интеграция + TWA auth
- Phase 3: admin CRM MVP (Remote Config + телеметрия)
- Phase 4: закрытая бета → soft launch RU/CIS → глобальный запуск → GameFi 2.0
