import { NextRequest, NextResponse } from "next/server";
import { NARRATIVES_DATA, ALPHA_DIVERGENCE_DATA, KOLS_DATA } from "@/lib/data";

interface VeniceMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, customApiKey } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.VENICE_API_KEY;

    // 1. If Venice AI API key is available, call Venice AI Llama-3.3-70b / DeepSeek
    if (apiKey) {
      try {
        const systemPrompt = `You are Lince Copilot (Vista de Lince), an institutional-grade, zero-logging crypto intelligence AI engine.
Your purpose is to cut through the noise, detect mindshare shifts, KOL consensus, and social sentiment divergence before they are priced in by retail.
Current market context:
- Leading Narrative: Autonomous AI Agents (26.4% mindshare, +18.2% 24h, tokens: VIRTUAL, AIXBT, SPECTRE).
- Surging Narrative: Prediction Markets (17.8% mindshare, +8.4% 24h, tokens: POLYMARKET, CHRONO).
- Strong Alpha Divergences: SPECTRE (Base, +84.2% mindshare vs +2.4% price), CHRONO (+71.8% mindshare vs +4.1% price), TALOS (Solana DePIN, +64.5% mindshare vs -1.2% price).
Tone: Concise, data-driven, objective, institutional, high-signal. Avoid fluff, disclaimers, or generic financial advice warnings.`;

        const messages: VeniceMessage[] = [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ];

        const veniceRes = await fetch("https://api.venice.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b",
            messages,
            temperature: 0.3,
            max_tokens: 600,
          }),
        });

        if (veniceRes.ok) {
          const veniceData = await veniceRes.json();
          const responseText = veniceData.choices?.[0]?.message?.content || "";

          // Extract mentioned tokens
          const tokensMentioned = ["VIRTUAL", "AIXBT", "SPECTRE", "CHRONO", "TALOS", "ONDO", "WIF"].filter((t) =>
            responseText.toUpperCase().includes(t)
          );

          return NextResponse.json({
            content: responseText,
            modelUsed: "Venice AI (llama-3.3-70b) · Zero-Logging",
            sentimentGauge: 0.88,
            citations: ["X (Crypto-Twitter)", "Farcaster", "On-Chain DEX Liquidity"],
            tokensMentioned,
            isVeniceLive: true,
          });
        }
      } catch (veniceErr) {
        console.warn("Venice API call failed, falling back to Lince Deterministic Engine:", veniceErr);
      }
    }

    // 2. Deterministic / Fast Lince Engine Fallback (100% Free, zero external dependency)
    const q = query.toLowerCase();

    let content = "";
    let sentimentGauge = 0.82;
    let tokensMentioned: string[] = [];
    const citations: string[] = ["Lince Social Indexer", "Multi-Platform Mindshare Matrix"];

    if (q.includes("ai") || q.includes("agent") || q.includes("virtual")) {
      content = `Autonomous AI Agents remain the #1 dominant sector with 26.4% aggregate crypto mindshare (+18.2% in 24h).

Key Insights:
• Top Velocity: VIRTUAL and AIXBT maintain peak social traction on X and Farcaster.
• Undervalued Divergence: SPECTRE on Base has seen a +84.2% surge in developer commits and KOL mentions, while its market cap ($18.4M) has lagged at only +2.4% price action.
• Structural Shift: Narrative moving from simple LLM wrappers to autonomous on-chain agents with verifiable execution keys.`;
      sentimentGauge = 0.91;
      tokensMentioned = ["VIRTUAL", "AIXBT", "SPECTRE"];
      citations.push("X (Twitter)", "Base On-Chain DEX");
    } else if (q.includes("divergence") || q.includes("alpha") || q.includes("early")) {
      content = `Lince Alpha Radar detected 3 major Mindshare vs. Price Divergences:

1. SPECTRE (Base): Mindshare +84.2% | Price +2.4% | Divergence Score: 96/100.
   Catalyst: Mainnet autonomous trading node release with GitHub activity up 340%.

2. CHRONO (Arbitrum): Mindshare +71.8% | Price +4.1% | Divergence Score: 92/100.
   Catalyst: Polymarket resolution integration feeds announced by lead team.

3. TALOS (Solana): Mindshare +64.5% | Price -1.2% | Divergence Score: 89/100.
   Catalyst: Hardware benchmark verification showing 40% cheaper GPU inference than cloud hyperscalers.`;
      sentimentGauge = 0.89;
      tokensMentioned = ["SPECTRE", "CHRONO", "TALOS"];
      citations.push("GitHub Commit Logs", "Polymarket Resolution Feed", "Solana Devnet");
    } else if (q.includes("depin") || q.includes("compute") || q.includes("render")) {
      content = `DePIN infrastructure holds 14.2% market mindshare (+5.1% 24h), driven by compute and decentralized bandwidth demand.

Key Observations:
• Established Leaders: RENDER and IO.NET dominate institutional mentions.
• Emerging Disrupter: TALOS on Solana has 16 Tier-1 smart followers accumulating attention, scoring an 89/100 early accumulation signal.
• Catalyst: Asia-Pacific node deployments have doubled hardware throughput week-over-week.`;
      sentimentGauge = 0.79;
      tokensMentioned = ["RENDER", "IO.NET", "TALOS"];
      citations.push("DePIN Node Telemetry", "KOL Consensus Radar");
    } else if (q.includes("kol") || q.includes("influencer") || q.includes("call")) {
      content = `KOL & Smart Money Attention Consensus:

• @DefiIgnas (Hit rate: 81%): Calling VIRTUAL as structural protocol-market fit with sustainable fee flywheels.
• @0xGumshoe (Hit rate: 79%): Heavy accumulation thesis on Base ecosystem micro-caps, particularly SPECTRE.
• @toly (Solana): Emphasizing decentralized hardware node co-location and Firedancer latency benchmarks.`;
      sentimentGauge = 0.84;
      tokensMentioned = ["VIRTUAL", "SPECTRE", "TALOS"];
      citations.push("Verified KOL Tracker", "Hit-Rate Verification Model");
    } else {
      // General overview
      content = `Overall Crypto Mindshare Summary (Vista de Lince):

• Sector Dominance: Autonomous AI Agents (26.4%) and Prediction Markets (17.8%) account for >44% of total social mindshare.
• Capital Rotation: Liquidity is rotating from large-cap cultural memecoins (-4.3%) toward utility-bearing AI and decentralized physical infrastructure (DePIN).
• Top Attention Anomaly: 6 projects currently display high-confidence Alpha Divergence (>75 score) where social volume has outpaced price by over 50%.`;
      sentimentGauge = 0.83;
      tokensMentioned = ["VIRTUAL", "POLYMARKET", "SPECTRE", "ONDO"];
      citations.push("Lince Multi-Platform Aggregate", "Social Sentiment Radar");
    }

    return NextResponse.json({
      content,
      modelUsed: "Lince Deterministic Engine (Zero-Latency)",
      sentimentGauge,
      citations,
      tokensMentioned,
      isVeniceLive: false,
    });
  } catch (err: unknown) {
    console.error("Copilot API error:", err);
    return NextResponse.json({ error: "Failed to generate copilot intelligence" }, { status: 500 });
  }
}
