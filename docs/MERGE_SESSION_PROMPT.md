# PROMPT: Arena Agent Mode — Phase 0 Merge Session

Вставить целиком в новую сессию Agent Mode с подключенным GitHub signal-core.

---

Действуй как senior full-stack game engineer, специализирующийся на Phaser 4, TypeScript и Vite.

ЗАДАЧА: Phase 0 — перенести и слить код из 4 патчей архивного репозитория в монорепозиторий signal-core.

ИСТОЧНИК: репозиторий hudyakovictor/arenarel, папка patches/:
1. patches/01a08e29-292c-7439-91a5-cef04a041ae6.patch (+15 637 строк) — БАЗИС
2. patches/01a08e1c-7941-7e05-a38f-0c152621fc86.patch (+8 340 строк)
3. patches/01a08e14-6efe-7e5c-a24a-0616a21028dc.patch (+4 538 строк)
4. patches/01a08e0b-540f-7c3f-b500-fc5dc41fd23a.patch (+4 340 строк)

ПЛАН ДЕЙСТВИЙ:

ШАГ 0. Создай рабочую ветку phase0/patch-merge от main в signal-core.

ШАГ 1. Перенеси игровую логику из базиса 01a08e29 в apps/game-client/src/ (структура сцен: BootScene, MentorDialogScene, ArenaBattleScene). Закоммить: "feat(game-client): import battle core from session 01a08e29".

ШАГ 2. Поверх накати 01a08e1c (UI/RexUI-слой, диалоги Скрепки). Конфликтующие общие файлы (SignalArenaScene.ts, data.ts, main.ts) разрешай с приоритетом базиса 01a08e29. Закоммить: "feat(game-client): merge RexUI layer from session 01a08e1c".

ШАГ 3. Накати 01a08e14 (save-модули, ассеты боссов в apps/game-client/public/). Закоммить: "feat(game-client): merge save system and boss assets from 01a08e14".

ШАГ 4. Накати 01a08e0b (телеметрия, PWA-обвязка). Закоммить: "feat(game-client): merge telemetry and PWA shell from 01a08e0b".

ШАГ 5. Рефакторинг контрактов: дублирующиеся типы сведи в packages/shared-types/index.d.ts (IBossEntity, ISignalPacket, ICardAction, IPlayerSession уже объявлены — расширь их).

ВОРОТА КАЧЕСТВА (обязательно после КАЖДОГО шага):
- npm run typecheck — ноль ошибок TypeScript
- npm run build — успешная сборка Vite
- если сборка падает — исправляй до зеленого, не переходи к следующему шагу

ЖЕСТКИЕ ОГРАНИЧЕНИЯ (ТЗ 99-уровня, менять нельзя):
- Phaser 4 + TypeScript + Vite + RexUI, портретный формат 9:16 (540x960, Phaser.Scale.FIT)
- Интерфейс НЕ должен быть похож на торговый терминал: никаких свечей, стаканов, Buy/Sell
- Персонаж-наставник «Скрепка» (скрепка в джедайской робе): образ не менять, фраза «Я пришёл из прошлого, чтобы помочь тебе в будущем» — сохранить дословно
- MASTER_ARCHITECTURE_SPEC.md и docs/ не изменять

ПОРЯДОК КОММУТНИКАЦИИ: работай автономно до полной готовности. В конце открой PR phase0/patch-merge -> main с описанием: какие модули из какого патча вошли, какие конфликты разрешены и какими правилами.

Если какой-то патч не применяется целиком (битые контексты строк), выдели из него неприменимые блоки в отчет, а рабочий код перенеси вручную файл за файлом.
