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

export interface HolderDetail {
  rank: number;
  wallet: string;
  floatSharePercent: number; // e.g. 5.7% of circulating float
  supplySharePercent: number; // e.g. 3.1% of total supply
  entryRank?: number;
  entryTimeDelta?: string; // e.g. "+168s after launch"
  buyEth?: number;
  tokensHeld?: string;
  multiple?: number; // e.g. 2.39
  signals?: {
    holdingAll?: boolean;
    sold?: boolean;
    sniper?: boolean;
    virgin?: boolean;
    isDeployer?: boolean;
  };
  explorerUrl?: string;
}

export interface LaunchAudit {
  curveAddress?: string;
  deployerAddress?: string;
  launchTx?: string;
  launchBlock?: number;
  ageHours?: number;
}

export interface SocialMindshareCorrelation {
  mindshareScore: number; // 0 - 100 score
  momentumSpike24h: number; // e.g. +142.5%
  sentimentPolarityPercent: number; // e.g. 84% Bullish
  divergenceStatus: string;
  divergenceGrade: "HIGH_DIVERGENCE" | "ORGANIC_ACCUMULATION" | "BALANCED_FLOW" | "ASTROTURFING_ALERT";
  warningNote: string;
  catalystNarrative?: string;
  platforms: {
    platform: string;
    sharePercent: number;
    volume: string;
  }[];
  smartFollowersCount?: number;
  kolConsensusCount?: number;
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
  volume24hUsd?: string;
  totalHolders: number;
  scannedHoldersCount: number;
  realOperatorsCount: number;
  sybilRatio: number; // percentage of scanned wallets that belong to coordinated clusters
  verdict: ScanVerdict;
  riskScore: number; // 0 - 100
  band?: "CLEAN" | "SUSPICIOUS" | "DANGER" | "ELEVATED" | "SAFE";
  score?: number;
  headline?: string;
  reason?: string;
  maxSingleImpactPercent?: number;
  circulatingFloatPercent?: number;
  curveReservePercent?: number;
  tokenImage?: string;
  verdictHeadline: string;
  verdictDescription: string;
  cabalConcentrationPercent: number; // sum of coordinated cluster holdings
  potentialRugDropPercent: number; // estimated price impact if clusters sell
  clusters: WalletCluster[];
  holdersTable?: HolderDetail[];
  launchAudit?: LaunchAudit;
  socialMindshareCorrelated?: SocialMindshareCorrelation;
  scannedAt: string;
}
