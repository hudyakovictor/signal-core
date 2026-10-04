// Signal Core — shared contracts between game-client, game-server, admin-core

export interface IBossEntity {
  id: string;
  archetype: 'fomo_wraith' | 'leverage_goblin' | 'headline_titan' | 'hubris_dragon';
  mindHP: number;
  panicGreedLevel: number;
}

export interface ISignalPacket {
  id: string;
  type: 'liquidity_sweep' | 'fake_pump' | 'news_spike' | 'liquidation_cascade';
  timingWindowMs: number;
}

// ---------------------------------------------------------------------------
// Card Design Spec v2.0 (docs/CARD_DESIGN_V2.md)
// Замещает старую монохромную систему цветов («Монохромный атлас»).
// Runtime-константы цветов/glow и полный датасет 40 карт:
// apps/game-client/src/data/cards-v2.ts (CARD_TYPE_COLORS, SKILL_CARDS_V2).
// ---------------------------------------------------------------------------

/** Тип карты = функциональная роль в решении трейдера; определяет цвет рамки. */
export type CardType = 'read' | 'decide' | 'protocol' | 'protect';

/** Hex-цвета рамок по типам (значения фиксированы спекой v2.0). */
export type CardFrameColorHex = '#38BDF8' | '#4ADE80' | '#A78BFA' | '#FBBF24';

/** Гейт разблокировки карты/ветки (§5: PROTECT — только после Stage F+). */
export type CardUnlockGate = 'stage-f-plus';

/** Skill-карта из колоды 40 карт (CARD_DESIGN_V2 §2/§6). */
export interface ISkillCard {
  /** Номер карты 1–40 (печатается в левом верхнем углу). */
  number: number;
  /** Стабильный slug-идентификатор для сейвов/аналитики. */
  id: string;
  name: string;
  type: CardType;
  /** Родительский узел в Skill Tree v2 внутри своей ветки; null у корня. */
  parent: number | null;
  unlockGate?: CardUnlockGate;
}

export type EntityRank = 'I' | 'II' | 'III';

/** Entity-карта врага (CARD_DESIGN_V2 §7): арт JPG не меняется, рамка красная. */
export interface IEntityCard {
  id: string;
  name: string;
  rank?: EntityRank;
  /** Единый цвет рамки всех врагов: #EF4444. */
  frameColor: '#EF4444';
  /** Точка разблокировки по unlock_map (A7, C27, ..., 'apex'). */
  unlockPoint: string;
  chapterBoss: boolean;
}

/** Состояние прогресса открытия карт игрока (Skill Tree v2). */
export interface ICardUnlockState {
  unlockedCardIds: string[];
  stageFPlusCleared: boolean;
}

/**
 * Боевое действие картой из Action Deck (legacy Phase-1 пул).
 * Визуально рендерится в шаблоне v2.0: цвет рамки берётся по `frameType`.
 */
export interface ICardAction {
  id: string;
  name: string;
  liquidityCost: number;
  /** Тип рамки по CARD_DESIGN_V2 для рендера; не влияет на баланс. */
  frameType?: CardType;
}

export interface IPlayerSession {
  sessionId: string;
  guestFingerprint?: string;
  walletAddress?: string;
  createdAt: string;
}
