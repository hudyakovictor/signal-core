// Signal Arena entry — stub until Phase 0 patch merge.
// Imports Phaser + TWA SDK to validate build chain.

import { initTWA } from './telegram';

const tg = initTWA();
if (tg) {
  tg.setHeaderColor('#05070d');
}

const el = document.getElementById('game');
if (el) {
  el.textContent = 'Signal Arena — awaiting Phase 0 patch merge (TWA ready: ' + (tg ? 'yes' : 'no') + ')';
}

// Placeholder for Phaser 4 game instance:
// import Phaser from 'phaser';
// const game = new Phaser.Game({ ... });
