import { describe, it, expect } from 'vitest';

import {
  CARD_TYPE_COLORS,
  CARD_TYPE_GLOW_SHADOWS,
  ENTITY_FRAME_COLOR,
  PRIORITY_ENTITIES,
  SKILL_CARDS_V2,
  SKILL_TREE_CROSS_LINKS,
  SKILL_TREE_ROOTS,
  getCardFrameColor,
  getSkillCard,
  isCardUnlocked,
  type CardType,
} from '../src/data/cards-v2';

// Регрессионные инварианты CARD_DESIGN_V2 (docs/CARD_DESIGN_V2.md).

const EXPECTED_COLORS: Record<CardType, string> = {
  read: '#38BDF8',
  decide: '#4ADE80',
  protocol: '#A78BFA',
  protect: '#FBBF24',
};

describe('CARD_DESIGN_V2 · §1 цветовая система', () => {
  it('фиксирует 4 типа → 4 hex-цвета', () => {
    expect(CARD_TYPE_COLORS).toEqual(EXPECTED_COLORS);
  });

  it('glow-тень соответствует цвету типа (0 0 12px <hex>aa)', () => {
    for (const [type, hex] of Object.entries(EXPECTED_COLORS) as [CardType, string][]) {
      expect(CARD_TYPE_GLOW_SHADOWS[type]).toBe(`0 0 12px ${hex}aa`);
      expect(getCardFrameColor(type)).toBe(hex);
    }
  });
});

describe('CARD_DESIGN_V2 · §2 колода 40 карт', () => {
  it('содержит ровно 40 карт с уникальными номерами 1–40', () => {
    expect(SKILL_CARDS_V2).toHaveLength(40);
    const numbers = SKILL_CARDS_V2.map((c) => c.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
  });

  it('id карт уникальны', () => {
    const ids = SKILL_CARDS_V2.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('split по типам: READ 14 / DECIDE 9 / PROTOCOL 10 / PROTECT 7', () => {
    const count = (t: CardType) => SKILL_CARDS_V2.filter((c) => c.type === t).length;
    expect(count('read')).toBe(14);
    expect(count('decide')).toBe(9);
    expect(count('protocol')).toBe(10);
    expect(count('protect')).toBe(7);
  });

  it('номера карт соответствуют спеке по типам', () => {
    const byType = (t: CardType) =>
      SKILL_CARDS_V2.filter((c) => c.type === t)
        .map((c) => c.number)
        .sort((a, b) => a - b);
    expect(byType('read')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    expect(byType('decide')).toEqual([16, 17, 18, 19, 20, 21, 22, 23, 38]);
    expect(byType('protocol')).toEqual([15, 24, 25, 27, 28, 29, 31, 32, 39, 40]);
    expect(byType('protect')).toEqual([26, 30, 33, 34, 35, 36, 37]);
  });
});

describe('CARD_DESIGN_V2 · §4 приоритеты замены иконок', () => {
  it('высокий приоритет: 07, 22, 30', () => {
    const high = SKILL_CARDS_V2.filter((c) => c.iconRenewal === 'replace-high').map((c) => c.number);
    expect(high.sort((a, b) => a - b)).toEqual([7, 22, 30]);
  });

  it('средний приоритет: 11, 32, 39', () => {
    const medium = SKILL_CARDS_V2.filter((c) => c.iconRenewal === 'replace-medium').map(
      (c) => c.number,
    );
    expect(medium.sort((a, b) => a - b)).toEqual([11, 32, 39]);
  });
});

describe('CARD_DESIGN_V2 · §5 Skill Tree v2', () => {
  it('корни веток: READ 01 / DECIDE 18 / PROTOCOL 24 / PROTECT 26', () => {
    expect(SKILL_TREE_ROOTS).toEqual({ read: 1, decide: 18, protocol: 24, protect: 26 });
    for (const [type, rootNumber] of Object.entries(SKILL_TREE_ROOTS) as [CardType, number][]) {
      const root = getSkillCard(rootNumber);
      expect(root?.type).toBe(type);
      expect(root?.parent).toBeNull();
    }
  });

  it('родительская ссылка каждой некорневой карты существует и ведёт в свою ветку', () => {
    for (const card of SKILL_CARDS_V2) {
      if (card.parent === null) continue;
      const parent = getSkillCard(card.parent);
      expect(parent, `родитель ${card.parent} для карты ${card.number}`).toBeDefined();
      expect(parent?.type).toBe(card.type);
    }
  });

  it('перекрёстная связь: Liquidity Map (04) → Target Liquidity (21) READ→DECIDE', () => {
    expect(SKILL_TREE_CROSS_LINKS).toEqual([{ from: 4, to: 21, crossBranch: true }]);
  });

  it('вся золотая ветка PROTECT за гейтом Stage F+', () => {
    const protect = SKILL_CARDS_V2.filter((c) => c.type === 'protect');
    expect(protect).toHaveLength(7);
    for (const card of protect) {
      expect(card.unlockGate).toBe('stage-f-plus');
      expect(isCardUnlocked(card, { stageFPlusCleared: false })).toBe(false);
      expect(isCardUnlocked(card, { stageFPlusCleared: true })).toBe(true);
    }
  });

  it('остальные ветки без гейта', () => {
    for (const card of SKILL_CARDS_V2.filter((c) => c.type !== 'protect')) {
      expect(card.unlockGate).toBeUndefined();
      expect(isCardUnlocked(card, { stageFPlusCleared: false })).toBe(true);
    }
  });
});

describe('CARD_DESIGN_V2 · §7 Entity-карты', () => {
  it('цвет рамки врага — единый красный', () => {
    expect(ENTITY_FRAME_COLOR).toBe('#EF4444');
  });

  it('приоритетные Entity: 7 штук, боссы глав помечены', () => {
    expect(PRIORITY_ENTITIES).toHaveLength(7);
    expect(PRIORITY_ENTITIES[0].id).toBe('dopamine-imp'); // первый бой, A7
    const chapterBosses = PRIORITY_ENTITIES.filter((e) => e.chapterBoss).map((e) => e.id);
    expect(chapterBosses.sort()).toEqual([
      'fake-breakout-phantom',
      'indicator-cult',
      'liquidity-hydra',
    ]);
  });
});
