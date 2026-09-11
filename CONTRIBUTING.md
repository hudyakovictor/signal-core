# Contributing

1. Одна задача — одна ветка — один PR. Имя ветки: `phaseN/task-slug` (например, `phase1/fomo-wraith-ai`).
2. Перед стартом: `git pull origin main`.
3. Коммиты: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
4. Ворота качества: `npm run typecheck`, `npm run build`, `npm test` — все зелёные.
5. Не изменять: `MASTER_ARCHITECTURE_SPEC.md`, `docs/` (кроме явного PR type-sync), образ Скрепки, формат 9:16.
6. Размер диффа на PR: до ~8000 строк. Больше — разбивай на несколько PR.
7. Шаблон PR-описания обязателен (.github/PULL_REQUEST_TEMPLATE.md).
