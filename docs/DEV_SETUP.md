# Dev Setup — от клона до запуска

## Требования
- Node.js 20+ (проверь `.nvmrc`)
- npm 10+
- Git

## Быстрый старт (клиент)

```bash
git clone https://github.com/hudyakovictor/signal-core.git
cd signal-core
npm install
npm run dev:game
```

Открой http://localhost:5173 — увидишь заглушку до Phase 0 merge.

## Backend (локально)

```bash
# game-server
cd services/game-server
npm install
npm run dev

# admin-core (отдельный терминал)
cd services/admin-core
npm install
npm run dev
```

- Game server: http://localhost:8080/health
- Admin core: http://localhost:8081/health

## Проверки

```bash
npm run typecheck
npm run test
npm run build:game
```

## Docker (опционально)

```bash
docker run -d --name redis -p 6379:6379 redis:7
docker run -d --name postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres:16
```

После — обнови `.env` по образцу `.env.example`.
