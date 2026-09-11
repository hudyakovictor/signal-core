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

export interface ICardAction {
  id: string;
  name: string;
  liquidityCost: number;
}

export interface IPlayerSession {
  sessionId: string;
  guestFingerprint?: string;
  walletAddress?: string;
  createdAt: string;
}
