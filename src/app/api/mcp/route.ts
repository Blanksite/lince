import { NextRequest, NextResponse } from "next/server";
import { NARRATIVES_DATA, ALPHA_DIVERGENCE_DATA, KOLS_DATA, SOCIAL_PLATFORMS_DATA } from "@/lib/data";
import { scanContractAddress, detectChainFromAddress } from "@/lib/scanner";
import { ChainNetwork } from "@/lib/types";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JsonRpcRequest;
    const { id, method, params } = body;

    // 1. MCP Initialization
    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "lince-mcp",
            version: "1.0.0",
            description: "Lince Model Context Protocol - Crypto Mindshare, Narrative & KOL Intelligence",
          },
          capabilities: {
            tools: {},
          },
        },
      });
    }

    // 2. Tools List
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "lince_get_narratives",
              description: "Fetch ranking of crypto market sectors by share of social mindshare, 24h growth velocity, and sentiment.",
              inputSchema: {
                type: "object",
                properties: {
                  limit: { type: "number", description: "Number of top narratives to return (default 8)" },
                },
              },
            },
            {
              name: "lince_get_alpha_divergence",
              description: "Detect tokens with high social mindshare spikes where market price or market cap has not yet reacted (early alpha signals).",
              inputSchema: {
                type: "object",
                properties: {
                  minScore: { type: "number", description: "Minimum divergence score (0-100, default 75)" },
                },
              },
            },
            {
              name: "lince_get_kols",
              description: "Query top Key Opinion Leaders (KOLs), their verified hit-rates, and recent alpha calls.",
              inputSchema: {
                type: "object",
                properties: {
                  tier: { type: "string", description: "Filter by tier (ALPHA_HUNTER, RESEARCH_ANALYST, MACRO_STRATEGIST)" },
                },
              },
            },
            {
              name: "lince_get_social_platforms",
              description: "Breakdown of total crypto conversation share across platforms (X/Twitter, Telegram, YouTube, Farcaster, Reddit).",
              inputSchema: {
                type: "object",
                properties: {},
              },
            },
            {
              name: "lince_scan_wallet_cluster",
              description: "Perform on-chain sybil and cabal wallet clustering on a token contract address (Robinhood Chain, Solana, Base, Ethereum). Detects true operator count, concentration %, and rug risk verdict.",
              inputSchema: {
                type: "object",
                properties: {
                  address: { type: "string", description: "Contract Address (CA) of the token" },
                  chain: { type: "string", enum: ["robinhood", "solana", "base", "ethereum"], description: "Optional chain hint" },
                },
                required: ["address"],
              },
            },
          ],
        },
      });
    }

    // 3. Tools Call
    if (method === "tools/call") {
      const toolName = params?.name as string;
      const args = (params?.arguments as Record<string, unknown>) || {};

      if (toolName === "lince_scan_wallet_cluster") {
        const addr = (args.address as string) || "";
        const requestedChain = args.chain as ChainNetwork | undefined;
        if (!addr) {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Missing address argument" },
          });
        }
        const chain = detectChainFromAddress(addr, requestedChain);
        const result = scanContractAddress(addr, chain);
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          },
        });
      }

      if (toolName === "lince_get_narratives") {
        const limit = typeof args.limit === "number" ? args.limit : 8;
        const result = NARRATIVES_DATA.slice(0, limit);
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          },
        });
      }

      if (toolName === "lince_get_alpha_divergence") {
        const minScore = typeof args.minScore === "number" ? args.minScore : 75;
        const result = ALPHA_DIVERGENCE_DATA.filter((x) => x.divergenceScore >= minScore);
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          },
        });
      }

      if (toolName === "lince_get_kols") {
        const result = KOLS_DATA;
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          },
        });
      }

      if (toolName === "lince_get_social_platforms") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(SOCIAL_PLATFORMS_DATA, null, 2) }],
          },
        });
      }

      return NextResponse.json(
        { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${toolName}` } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } },
      { status: 404 }
    );
  } catch (err: unknown) {
    console.error("MCP route error:", err);
    return NextResponse.json(
      { jsonrpc: "2.0", error: { code: -32603, message: "Internal MCP server error" } },
      { status: 500 }
    );
  }
}

// Allow GET for simple health check
export async function GET() {
  return NextResponse.json({
    name: "Lince Model Context Protocol (MCP) Server",
    status: "active",
    endpoints: {
      jsonrpc: "POST /api/mcp",
    },
    toolsAvailable: ["lince_get_narratives", "lince_get_alpha_divergence", "lince_get_kols", "lince_get_social_platforms", "lince_scan_wallet_cluster"],
  });
}
