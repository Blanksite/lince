import { NextRequest, NextResponse } from "next/server";
import { scanContractAddressAsync, detectChainFromAddress } from "@/lib/scanner";
import { ChainNetwork } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const address = (body.address || "").trim();
    const requestedChain = body.chain as ChainNetwork | undefined;

    if (!address) {
      return NextResponse.json(
        { error: "Token Contract Address (CA) is required." },
        { status: 400 }
      );
    }

    const chain = detectChainFromAddress(address, requestedChain);
    const scanResult = await scanContractAddressAsync(address, chain);

    return NextResponse.json(scanResult);
  } catch (error) {
    console.error("Cluster scan error:", error);
    return NextResponse.json(
      { error: "Failed to perform on-chain wallet cluster crawl." },
      { status: 500 }
    );
  }
}
