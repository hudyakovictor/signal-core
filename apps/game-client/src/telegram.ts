// Telegram WebApp integration stub
// Will be expanded in Phase 2 with initData validation, BackButton, Haptics.

export function initTWA() {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg) {
    console.warn('Telegram WebApp not available (running outside TWA)');
    return null;
  }
  tg.ready();
  tg.expand();
  return tg;
}

export function getInitDataUnsafe(): string | null {
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initData || null;
}
