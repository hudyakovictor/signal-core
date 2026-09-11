# Telegram Mini App — технический чек-лист (Phase 2)

## Viewport и запуск
- Интеграция `window.Telegram.WebApp`: `ready()`, `expand()`.
- `verticalViewport` / `viewportStableHeight` события: пересчёт Phaser Scale при открытии клавиатуры и свайп-панелей.
- `isVerticalSwipesEnabled = false` — отключить системные свайпы, конфликтующие с игровыми свайпами.

## Аутентификация
- initData + HMAC-валидация подписи на game-server (Zero-Client-Trust).
- Guest-режим: device fingerprint из Telegram device model + hash.

## Платежи
- Telegram Stars — основной канал микротранзакций (Battle Pass, косметика).
- TON wallet (Tonkeeper) — только для GameFi 2.0 фазы, опционально.

## UX-интеграции
- `BackButton` — привязать к паузе боя.
- `HapticFeedback` — на парировании и Margin Call босса.
- Темы: `colorScheme` + `themeParams` — тёмная по умолчанию.
- `CloudStorage` — облачный бэкап сейвов поверх локального IndexedDB.

## Бюджет размера
- Цель: первый экран загружается < 2 МБ; полный бандл < 10 МБ.
- Ассеты боссов — по требованию (лениво), не в начальном чанке.

## Шеринг
- `shareMessage` после победы над боссом с meme-карточкой результата.
