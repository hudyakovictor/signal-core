# Таксономия аналитических событий (v1)

Формат: `signal_arena.<category>.<event>` — snake_case.

## Сессия
- `session.start`, `session.end` — payload: duration_sec, phase

## Бой
- `battle.start` — boss_id, player_level
- `battle.hit_taken` — damage, source_signal
- `battle.parried` — timing_ms (для античита: флаг если < 120)
- `battle.card_played` — card_id, fuel_left
- `battle.boss_defeated` / `battle.player_down` — boss_id, duration_sec

## Монетизация
- `monetization.pass_view`, `monetization.purchase_start`, `monetization.purchase_complete` — sku, currency

## Наставник
- `mentor.dialog_shown` — dialog_id
- `mentor.ability_used` — ability_id

## Telegram
- `tgwa.share_clicked`, `tgwa.invite_sent`

Все события проходят через `src/game/telemetry.ts`; сервер обогащает session_id и timestamp.
