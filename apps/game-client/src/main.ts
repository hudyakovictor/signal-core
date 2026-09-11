// Точка входа-заглушка. Будет заменена при слиянии phase0/patch-merge.
// Не добавлять игровую логику сюда до мержа Phase 0.
const el = document.getElementById('game');
if (el) {
  el.textContent = 'Signal Arena — awaiting Phase 0 patch merge';
}
