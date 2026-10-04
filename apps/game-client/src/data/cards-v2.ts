// Signal Arena — Card Design Spec v2.0 (машиночитаемый слой)
// Источник истины по дизайну: docs/CARD_DESIGN_V2.md
// Замещает старую монохромную систему цветов («Монохромный атлас»).

// ---------------------------------------------------------------------------
// §1 Цветовая система: 4 типа → 4 цвета
// ---------------------------------------------------------------------------

export type CardType = 'read' | 'decide' | 'protocol' | 'protect';

/** Фон карты — всегда тёмный «космос» (§1). */
export const CARD_BG_COLOR = '#0D1117';

/** Цвет рамки по типу карты (§1). */
export const CARD_TYPE_COLORS: Readonly<Record<CardType, string>> = {
  read: '#38BDF8', // Ice Blue — чтение рынка, сбор данных
  decide: '#4ADE80', // Neon Green — торговое действие / решение
  protocol: '#A78BFA', // Violet — правило системы, ментальный протокол
  protect: '#FBBF24', // Amber — защита от ошибки, стоп-правило
} as const;

/** Glow-эффект рамки по типу: box-shadow 0 0 12px <hex>aa (§3). */
export const CARD_TYPE_GLOW_SHADOWS: Readonly<Record<CardType, string>> = {
  read: '0 0 12px #38BDF8aa',
  decide: '0 0 12px #4ADE80aa',
  protocol: '0 0 12px #A78BFAaa',
  protect: '0 0 12px #FBBF24aa',
} as const;

/** Подпись бейджа типа в правом нижнем углу карты (§3). */
export const CARD_TYPE_LABELS: Readonly<Record<CardType, string>> = {
  read: 'READ',
  decide: 'DECIDE',
  protocol: 'PROTOCOL',
  protect: 'PROTECT',
} as const;

/** Размер иконки внутри карты, px (§8). */
export const CARD_ICON_SIZE = 48;

// ---------------------------------------------------------------------------
// §2/§6 Колода из 40 skill-карт
// ---------------------------------------------------------------------------

/** Статус иконки относительно старой монохромной SVG-базы (§4). */
export type IconRenewalStatus = 'keep' | 'replace-medium' | 'replace-high';

export interface SkillCard {
  /** Номер карты 1–40 (печатается в левом верхнем углу, §3). */
  readonly number: number;
  /** Стабильный slug-идентификатор для сейвов/аналитики. */
  readonly id: string;
  /** Название карты (EN, печатается белым под иконкой). */
  readonly name: string;
  /** Тип карты → цвет рамки/glow (§1). */
  readonly type: CardType;
  /** Основной референс иконки (Lucide/Tabler, §6). */
  readonly iconRef: string;
  /** Требует минимальной доработки базового Lucide SVG (§8). */
  readonly iconCustom: boolean;
  /** Альтернативный образ на случай замены иконки (§2). */
  readonly iconAlt: string;
  /** Приоритет замены старой SVG (§4). */
  readonly iconRenewal: IconRenewalStatus;
  /** Родительский узел в Skill Tree v2 внутри своей ветки; null у корня (§5). */
  readonly parent: number | null;
  /** Гейт разблокировки ветки/карты (§5: PROTECT — только после Stage F+). */
  readonly unlockGate?: 'stage-f-plus';
}

export const SKILL_CARDS_V2: readonly SkillCard[] = [
  // --- READ · Синяя ветка (#38BDF8) · корень: 01 Market Structure ---
  { number: 1, id: 'market-structure', name: 'Market Structure', type: 'read', iconRef: 'trending-up', iconCustom: true, iconAlt: 'Восходящие блоки', iconRenewal: 'keep', parent: null },
  { number: 2, id: 'higher-timeframe', name: 'Higher Timeframe', type: 'read', iconRef: 'telescope', iconCustom: false, iconAlt: 'Слои таймфреймов (3 графика разного размера)', iconRenewal: 'keep', parent: 1 },
  { number: 3, id: 'volume-confirmation', name: 'Volume Confirmation', type: 'read', iconRef: 'hammer', iconCustom: true, iconAlt: 'Гистограмма + галочка', iconRenewal: 'keep', parent: 1 },
  { number: 4, id: 'liquidity-map', name: 'Liquidity Map', type: 'read', iconRef: 'map-pin', iconCustom: false, iconAlt: 'Тепловая карта 3×3', iconRenewal: 'keep', parent: 1 },
  { number: 5, id: 'volatility-context', name: 'Volatility Context', type: 'read', iconRef: 'waves', iconCustom: false, iconAlt: 'Воронка / ATR-диапазон', iconRenewal: 'keep', parent: 1 },
  { number: 6, id: 'correlation-check', name: 'Correlation Check', type: 'read', iconRef: 'link', iconCustom: true, iconAlt: 'Scatter-plot точек', iconRenewal: 'keep', parent: 1 },
  { number: 7, id: 'derivatives-pulse', name: 'Derivatives Pulse', type: 'read', iconRef: 'activity+coin', iconCustom: true, iconAlt: 'Сигнал EKG + OI-бар', iconRenewal: 'replace-high', parent: 1 },
  { number: 8, id: 'news-context', name: 'News Context', type: 'read', iconRef: 'newspaper', iconCustom: false, iconAlt: 'Мегафон с ценовой стрелкой', iconRenewal: 'keep', parent: 1 },
  { number: 9, id: 'social-sentiment', name: 'Social Sentiment', type: 'read', iconRef: 'message-circle+arrow', iconCustom: true, iconAlt: 'Сердечко + график', iconRenewal: 'keep', parent: 8 },
  { number: 10, id: 'macro-context', name: 'Macro Context', type: 'read', iconRef: 'globe', iconCustom: false, iconAlt: 'Здание ЦБ + стрелка', iconRenewal: 'keep', parent: 1 },
  { number: 11, id: 'onchain-flow', name: 'Onchain Flow', type: 'read', iconRef: 'link-2+arrow', iconCustom: true, iconAlt: 'Кит + волна', iconRenewal: 'replace-medium', parent: 1 },
  { number: 12, id: 'tokenomics-review', name: 'Tokenomics Review', type: 'read', iconRef: 'coin+pie-chart', iconCustom: true, iconAlt: 'Пирог-чарт + ETH', iconRenewal: 'keep', parent: 1 },
  { number: 13, id: 'unlock-calendar', name: 'Unlock Calendar', type: 'read', iconRef: 'calendar+unlock', iconCustom: true, iconAlt: 'Таймер + монеты', iconRenewal: 'keep', parent: 12 },
  { number: 14, id: 'infrastructure-risk', name: 'Infrastructure Risk', type: 'read', iconRef: 'alert-triangle+server', iconCustom: true, iconAlt: 'Молния + сеть', iconRenewal: 'keep', parent: 1 },

  // --- PROTOCOL · Фиолетовая ветка (#A78BFA) · корень: 24 No Trade Is a Decision ---
  { number: 15, id: 'source-quality', name: 'Source Quality', type: 'protocol', iconRef: 'search+file-check', iconCustom: true, iconAlt: 'Фильтр + верификация', iconRenewal: 'keep', parent: 24 },
  { number: 24, id: 'no-trade-is-a-decision', name: 'No Trade Is a Decision', type: 'protocol', iconRef: 'door-closed', iconCustom: false, iconAlt: 'Стоп-рука + замок', iconRenewal: 'keep', parent: null },
  { number: 25, id: 'evidence-only', name: 'Evidence Only', type: 'protocol', iconRef: 'scale', iconCustom: false, iconAlt: 'Документ + лупа', iconRenewal: 'keep', parent: 24 },
  { number: 27, id: 'risk-first-mode', name: 'Risk First Mode', type: 'protocol', iconRef: 'shield', iconCustom: true, iconAlt: 'Пирамида с щитом наверху', iconRenewal: 'keep', parent: 24 },
  { number: 28, id: 'no-confirmation-no-trade', name: 'No Confirmation No Trade', type: 'protocol', iconRef: 'lock', iconCustom: true, iconAlt: 'Светофор на красном', iconRenewal: 'keep', parent: 24 },
  { number: 29, id: 'higher-timeframe-check', name: 'Higher Timeframe Check', type: 'protocol', iconRef: 'binoculars+check', iconCustom: true, iconAlt: 'Бинокль + галочка', iconRenewal: 'keep', parent: 24 },
  { number: 31, id: 'discipline-over-profit', name: 'Discipline Over Profit', type: 'protocol', iconRef: 'shield>coins', iconCustom: true, iconAlt: 'Шлем + монета', iconRenewal: 'keep', parent: 24 },
  { number: 32, id: 'out-of-market-is-normal', name: 'Out of Market Is Normal', type: 'protocol', iconRef: 'coffee', iconCustom: false, iconAlt: 'Пустой стакан / отдых', iconRenewal: 'replace-medium', parent: 24 },
  { number: 39, id: 'confidence-check', name: 'Confidence Check', type: 'protocol', iconRef: 'brain+sliders', iconCustom: true, iconAlt: 'Слайдер + голова', iconRenewal: 'replace-medium', parent: 24 },
  { number: 40, id: 'preserve-the-system', name: 'Preserve the System', type: 'protocol', iconRef: 'settings+shield', iconCustom: true, iconAlt: 'Замок + шестерня', iconRenewal: 'keep', parent: 24 },

  // --- DECIDE · Зелёная ветка (#4ADE80) · корень: 18 Define Entry Zone ---
  { number: 16, id: 'enter-now', name: 'Enter Now', type: 'decide', iconRef: 'log-in', iconCustom: false, iconAlt: 'Play-кнопка + свеча', iconRenewal: 'keep', parent: 18 },
  { number: 17, id: 'wait-for-retest', name: 'Wait for Retest', type: 'decide', iconRef: 'refresh-cw', iconCustom: false, iconAlt: 'Часы + откат-стрелка', iconRenewal: 'keep', parent: 18 },
  { number: 18, id: 'define-entry-zone', name: 'Define Entry Zone', type: 'decide', iconRef: 'map-pin+zone', iconCustom: true, iconAlt: 'Прицел + горизонтальная зона', iconRenewal: 'keep', parent: null },
  { number: 19, id: 'define-invalidation', name: 'Define Invalidation', type: 'decide', iconRef: 'shield-x', iconCustom: false, iconAlt: 'Крест + ценовая линия', iconRenewal: 'keep', parent: 18 },
  { number: 20, id: 'set-structural-stop', name: 'Set Structural Stop', type: 'decide', iconRef: 'octagon', iconCustom: true, iconAlt: 'Замок + линия', iconRenewal: 'keep', parent: 18 },
  { number: 21, id: 'target-liquidity', name: 'Target Liquidity', type: 'decide', iconRef: 'target', iconCustom: false, iconAlt: 'Стрела в зону', iconRenewal: 'keep', parent: 18 },
  { number: 22, id: 'minimum-r-multiple', name: 'Minimum R Multiple', type: 'decide', iconRef: 'scale', iconCustom: true, iconAlt: 'Весы + 1:3', iconRenewal: 'replace-high', parent: 18 },
  { number: 23, id: 'scale-out', name: 'Scale Out', type: 'decide', iconRef: 'arrow-up-right', iconCustom: true, iconAlt: 'Три стрелки убывающие', iconRenewal: 'keep', parent: 18 },
  { number: 38, id: 'risk-cap', name: 'Risk Cap', type: 'decide', iconRef: 'lock+percent', iconCustom: true, iconAlt: 'Щит + %', iconRenewal: 'keep', parent: 18 },

  // --- PROTECT · Золотая ветка (#FBBF24) · корень: 26 Noise Quarantine · гейт: Stage F+ ---
  { number: 26, id: 'noise-quarantine', name: 'Noise Quarantine', type: 'protect', iconRef: 'volume-x', iconCustom: false, iconAlt: 'Наушники с зачёркнутым сигналом', iconRenewal: 'keep', parent: null, unlockGate: 'stage-f-plus' },
  { number: 30, id: 'after-a-loss', name: 'After a Loss', type: 'protect', iconRef: 'candle-broken+pause', iconCustom: true, iconAlt: 'Сломанная свеча + таймер', iconRenewal: 'replace-high', parent: 26, unlockGate: 'stage-f-plus' },
  { number: 33, id: 'news-is-not-a-signal', name: 'News Is Not a Signal', type: 'protect', iconRef: 'newspaper+x', iconCustom: true, iconAlt: 'Мегафон + стоп', iconRenewal: 'keep', parent: 26, unlockGate: 'stage-f-plus' },
  { number: 34, id: 'wait-for-stabilization', name: 'Wait for Stabilization', type: 'protect', iconRef: 'snowflake', iconCustom: false, iconAlt: 'Часы в льду', iconRenewal: 'keep', parent: 26, unlockGate: 'stage-f-plus' },
  { number: 35, id: 'do-not-chase', name: 'Do Not Chase', type: 'protect', iconRef: 'run+ban', iconCustom: true, iconAlt: 'Стрелка убегает + рука-стоп', iconRenewal: 'keep', parent: 26, unlockGate: 'stage-f-plus' },
  { number: 36, id: 'avoid-revenge-trading', name: 'Avoid Revenge Trading', type: 'protect', iconRef: 'angry+slash', iconCustom: true, iconAlt: 'Молния + красный крест', iconRenewal: 'keep', parent: 26, unlockGate: 'stage-f-plus' },
  { number: 37, id: 'no-averaging-without-a-plan', name: 'No Averaging Without a Plan', type: 'protect', iconRef: 'trending-down+x', iconCustom: true, iconAlt: 'Лесенка вниз + запрет', iconRenewal: 'keep', parent: 26, unlockGate: 'stage-f-plus' },
] as const;

// ---------------------------------------------------------------------------
// §5 Skill Tree v2 — корни веток и перекрёстные связи
// ---------------------------------------------------------------------------

/** Корни четырёх веток дерева навыков (§5). */
export const SKILL_TREE_ROOTS: Readonly<Record<CardType, number>> = {
  read: 1,
  decide: 18,
  protocol: 24,
  protect: 26,
} as const;

export interface SkillTreeCrossLink {
  readonly from: number;
  readonly to: number;
  /** Связь уводит в другую ветку (другой тип карты). */
  readonly crossBranch: true;
}

/** Перекрёстные связи между ветками (§5: Liquidity Map → Target Liquidity). */
export const SKILL_TREE_CROSS_LINKS: readonly SkillTreeCrossLink[] = [
  { from: 4, to: 21, crossBranch: true }, // READ → DECIDE
] as const;

// ---------------------------------------------------------------------------
// §7 Entity-карты (враги) — визу из старой версии сохраняется
// ---------------------------------------------------------------------------

export type EntityRank = 'I' | 'II' | 'III';

/** Рамка всех вражеских карт (§7). */
export const ENTITY_FRAME_COLOR = '#EF4444';

/** Glow вражеской карты. */
export const ENTITY_GLOW_SHADOW = '0 0 12px #EF4444aa';

/** Арт entity-карт: 42 JPG из old-version/assets/entities/ — без изменений (§7). */
export const ENTITY_ASSET_COUNT = 42;
export const ENTITY_ASSETS_DIR = 'assets/entities/';

export interface PriorityEntity {
  readonly id: string;
  readonly name: string;
  /** Точка разблокировки по unlock_map (§7). */
  readonly unlockPoint: string;
  readonly chapterBoss: boolean;
  /** Ранг печатается в правом верхнем углу (§7); для части entity уточняется. */
  readonly rank?: EntityRank;
  readonly note?: string;
}

/** Приоритетные Entity для боёв (§7). */
export const PRIORITY_ENTITIES: readonly PriorityEntity[] = [
  { id: 'dopamine-imp', name: 'Dopamine Imp', unlockPoint: 'A7', chapterBoss: false, note: 'Первый бой игрока' },
  { id: 'volatility-chimera', name: 'Volatility Chimera', unlockPoint: 'C27', chapterBoss: false },
  { id: 'indicator-cult', name: 'Indicator Cult', unlockPoint: 'C29', chapterBoss: true },
  { id: 'fake-breakout-phantom', name: 'Fake Breakout Phantom', unlockPoint: 'D39', chapterBoss: true },
  { id: 'fomo-wraith', name: 'FOMO Wraith', unlockPoint: 'D36', chapterBoss: false },
  { id: 'liquidity-hydra', name: 'Liquidity Hydra', unlockPoint: 'E49', chapterBoss: true },
  { id: 'drawdown-leviathan', name: 'Drawdown Leviathan', unlockPoint: 'apex', chapterBoss: false, note: 'Апекс-кампании (финальный босс)' },
] as const;

// ---------------------------------------------------------------------------
// Хелперы (§8: карточный компонент берёт цвет только отсюда)
// ---------------------------------------------------------------------------

const BY_NUMBER: ReadonlyMap<number, SkillCard> = new Map(
  SKILL_CARDS_V2.map((card) => [card.number, card]),
);

export function getSkillCard(cardNumber: number): SkillCard | undefined {
  return BY_NUMBER.get(cardNumber);
}

/** Цвет рамки карты по её типу (замена старого borderColor, §8). */
export function getCardFrameColor(type: CardType): string {
  return CARD_TYPE_COLORS[type];
}

/** Glow-тень карты по её типу (§3). */
export function getCardGlowShadow(type: CardType): string {
  return CARD_TYPE_GLOW_SHADOWS[type];
}

/** Доступна ли карта с учётом гейта ветки (§5: PROTECT — после Stage F+). */
export function isCardUnlocked(card: SkillCard, progress: { stageFPlusCleared: boolean }): boolean {
  if (card.unlockGate === 'stage-f-plus' && !progress.stageFPlusCleared) {
    return false;
  }
  return true;
}
