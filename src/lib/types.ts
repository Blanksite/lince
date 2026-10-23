export type NarrativeMomentum = "surging" | "steady" | "cooling";

export interface Narrative {
  id: string;
  name: string;
  tickerTag: string;
  mindshare: number; // percentage of total crypto conversation
  change24h: number; // percentage change in 24h
  socialVolume: string;
  topProjects: string[];
  sentimentScore: number; // 0.00 to 1.00 (e.g. 0.84 = Bullish)
  momentum: NarrativeMomentum;
  description: string;
}

export type SignalType = "EARLY_ACCUMULATION" | "NARRATIVE_BREAKOUT" | "KOL_CONSENSUS";

export interface AlphaDivergence {
  id: string;
  ticker: string;
  name: string;
  chain: string;
  category: string;
  mindshareSpike24h: number; // e.g. +72.4%
  priceChange24h: number; // e.g. +3.1%
  divergenceScore: number; // 0-100 score (higher = greater disconnect between attention & price)
  marketCap: string;
  smartFollowers: number;
  catalyst: string;
  signalType: SignalType;
}

export interface KOLProfile {
  id: string;
  handle: string;
  name: string;
  tier: "ALPHA_HUNTER" | "RESEARCH_ANALYST" | "MACRO_STRATEGIST";
  followers: string;
  hitRate: string;
  currentFocus: string[];
  recentCall: {
    ticker: string;
    thesis: string;
    timestamp: string;
    status: "active" | "validated";
  };
}

export interface SocialPlatformShare {
  platform: "X (Twitter)" | "Telegram" | "YouTube" | "Reddit" | "Farcaster" | "TikTok";
  share: number; // percentage
  volume: string;
  growth24h: string;
  dominantNarrative: string;
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
  citations?: string[];
  sentimentGauge?: number;
  tokensMentioned?: string[];
}
