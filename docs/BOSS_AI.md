# Boss AI — state machine

## Ростр врагов (CARD DESIGN SPEC v2.0, §7)

Библиотека entity-карт: **42 JPG** из `old-version/assets/entities/` — арт без изменений,
рамка единая красная `#EF4444`, ранг I/II/III в правом верхнем углу. Приоритетные бои
по unlock_map: **Dopamine Imp** (A7, первый бой), **Volatility Chimera** (C27),
**Indicator Cult** (C29, босс главы), **Fake Breakout Phantom** (D39, босс главы),
**FOMO Wraith** (D36), **Liquidity Hydra** (E49, босс главы), **Drawdown Leviathan** (апекс).

> State-машины ниже описывают 4 архетипа vertical slice (Phase 1). Машины для расширенного
> ростра (Dopamine Imp, Hydra, Chimera и др.) вводятся по мере глав — каждая переиспользует
> transition rules из этого файла. Датасет приоритетных entity: `apps/game-client/src/data/cards-v2.ts`.

## FOMO Wraith
- **State 1 (Idle):** патрулирование арены, спавн иллюзорных ракет (каждые 2 сек).
- **State 2 (Charge):** телеграф атаки (1.6 сек окно), игрок должен удержать парирование.
- **State 3 (Enraged):** если игрок тапает без сигнала — урон растёт на 10% за каждый ложный тап.

## Leverage Goblin
- **State 1 (Bait):** предлагает множитель x50, сужает зону парирования на 70%.
- **State 2 (Trap):** если игрок берёт множитель — следующая атака бьёт на 18 урона (вместо 12).

## Headline Titan
- **State 1 (Spam):** фейковые заголовки (каждые 1.5 сек), инверсия управления на 2 сек.
- **State 2 (Panic):** при 50% HP — удваивает частоту заголовков.

## Hubris Dragon
- **State 1 (Scale):** +10% HP за каждый винстрик игрока (макс +50%).
- **State 2 (Breath):** атака по всей арене, требует карты "Хедж-купол".

## Transition rules
- Idle → Charge: каждые 5 сек или после парирования.
- Charge → Enraged: если игрок тапает без сигнала.
- Enraged → Idle: после 3 сек без действий игрока.
