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
  lastUpdated: string; // e.g. "12:42 UTC"
  updateCadence?: string; // e.g. "10m sync"
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
  lastUpdated: string; // e.g. "12:48 UTC"
  blockHeight?: string; // e.g. "#21049281"
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
    exactTime: string; // e.g. "10:24 UTC today"
    status: "active" | "validated";
  };
}

export interface SocialPlatformShare {
  platform: "X (Twitter)" | "Telegram" | "YouTube" | "Reddit" | "Farcaster" | "TikTok";
  share: number; // percentage
  volume: string;
  growth24h: string;
  dominantNarrative: string;
  lastUpdated: string; // e.g. "12:50 UTC"
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

export type ChainNetwork = "robinhood" | "solana" | "base" | "ethereum";
export type ScanVerdict = "SAFE" | "ELEVATED" | "DANGER";

export interface WalletClusterNode {
  address: string;
  sharePercent: number;
  firstFundedAt: string;
  fundingTx: string;
  isDevWallet?: boolean;
}

export interface WalletCluster {
  id: string;
  name: string; // e.g. "Cluster Alpha (Cabal Lead #1)"
  funderAddress: string; // e.g. "0x7a3...c91"
  walletCount: number;
  totalSupplyPercent: number;
  estimatedValue: string;
  riskTag: "CRITICAL_CONCENTRATION" | "SUSPICIOUS_FUNDING" | "ORGANIC_DISTRIBUTION" | "COORDINATED_SNIPER" | "LIQUIDITY_POOL";
  wallets: WalletClusterNode[];
}

export interface ClusterScanResult {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  chain: ChainNetwork;
  launchpad?: "Pons V2" | "Flap" | "pump.fun" | "Raydium" | "Aerodrome" | "Uniswap v3" | string;
  marketCap: string;
  liquidityUsd: string;
  priceUsd: string;
  totalHolders: number;
  scannedHoldersCount: number;
  realOperatorsCount: number;
  sybilRatio: number; // percentage of scanned wallets that belong to coordinated clusters
  verdict: ScanVerdict;
  riskScore: number; // 0 - 100
  verdictHeadline: string;
  verdictDescription: string;
  cabalConcentrationPercent: number; // sum of coordinated cluster holdings
  potentialRugDropPercent: number; // estimated price impact if clusters sell
  clusters: WalletCluster[];
  socialMindshareCorrelated?: {
    mindshareScore: number;
    divergenceStatus: string;
    warningNote: string;
  };
  scannedAt: string;
}
