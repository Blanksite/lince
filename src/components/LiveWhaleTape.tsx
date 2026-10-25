"use client";

import React, { useState, useMemo } from "react";
import { LiveTransactionItem } from "@/lib/types";
import {
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Activity,
  Filter,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

interface LiveWhaleTapeProps {
  transactions?: LiveTransactionItem[];
  tokenSymbol: string;
  chain: string;
}

export function LiveWhaleTape({
  transactions = [],
  tokenSymbol = "NOUMEN",
  chain = "robinhood",
}: LiveWhaleTapeProps) {
  const [filterMode, setFilterMode] = useState<"ALL" | "WHALES" | "SELLS">("ALL");
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  const filteredTxs = useMemo(() => {
    if (filterMode === "WHALES") {
      return transactions.filter((t) => t.ethAmount >= 0.03);
    }
    if (filterMode === "SELLS") {
      return transactions.filter((t) => t.type === "SELL");
    }
    return transactions;
  }, [transactions, filterMode]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(text);
    setTimeout(() => setCopiedTx(null), 1800);
  };

  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070913] overflow-hidden shadow-2xl space-y-0 text-white font-mono-tech">
      {/* Tape Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a0f1d]/90 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-400 font-extrabold flex items-center gap-1.5">
              <span>LIVE RPC RADAR</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">PONS V2 MEMPOOL</span>
            </span>
          </div>
          <h4 className="font-serif-editorial text-lg sm:text-xl text-white">
            Recent On-Chain Trades &amp; Whale Stream
          </h4>
          <p className="text-xs text-white/50 font-sans">
            Real-time trade executions, sniper liquidations, and organic buys parsed directly from the blockchain.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 p-1">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "ALL"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            All Trades ({transactions.length})
          </button>
          <button
            onClick={() => setFilterMode("WHALES")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "WHALES"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Whale Buys (&gt;0.03 ETH)
          </button>
          <button
            onClick={() => setFilterMode("SELLS")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "SELLS"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Sells Only
          </button>
        </div>
      </div>

      {/* Transaction Feed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase text-white/40 border-b border-white/10 bg-white/[0.02]">
            <tr>
              <th className="py-3 px-4">TYPE</th>
              <th className="py-3 px-4">OPERATOR / WALLET</th>
              <th className="py-3 px-4">AMOUNT (${tokenSymbol})</th>
              <th className="py-3 px-4">ETH VALUE</th>
              <th className="py-3 px-4">USD VALUE</th>
              <th className="py-3 px-4">TIMING</th>
              <th className="py-3 px-4 text-right">TX PROOF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {filteredTxs.map((tx) => {
              const isBuy = tx.type === "BUY";
              return (
                <tr
                  key={tx.id}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  {/* Type */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black border ${
                        isBuy
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : "bg-rose-500/15 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {isBuy ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{tx.type}</span>
                    </span>
                  </td>

                  {/* Wallet */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">
                        {tx.walletLabel || "Community"}
                      </span>
                      <code className="text-white/50 text-[11px]">
                        {tx.wallet.slice(0, 6)}...{tx.wallet.slice(-4)}
                      </code>
                      <button
                        onClick={() => handleCopy(tx.wallet)}
                        className="text-white/40 hover:text-cyan-400 p-0.5 transition-colors"
                        title="Copy Address"
                      >
                        {copiedTx === tx.wallet ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Token Amount */}
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-white">
                    {tx.tokenAmount}
                  </td>

                  {/* ETH Amount */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={
                        isBuy ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"
                      }
                    >
                      {isBuy ? "+" : "-"}
                      {tx.ethAmount} ETH
                    </span>
                  </td>

                  {/* USD Value */}
                  <td className="py-3 px-4 whitespace-nowrap font-semibold text-white/80">
                    {tx.usdAmount}
                  </td>

                  {/* Timing */}
                  <td className="py-3 px-4 whitespace-nowrap text-white/50 text-[11px]">
                    {tx.timestamp}
                  </td>

                  {/* Tx Hash */}
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    {tx.explorerUrl && (
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                      >
                        <span>{tx.txHash.slice(0, 8)}...</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0a0f1d] flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
        <div className="flex items-center gap-4">
          <span>
            Streaming RPC: <strong className="text-cyan-400">Robinhood Arbitrum Orbit L3</strong>
          </span>
          <span>
            Active Pool: <strong className="text-white">Pons V2 Router</strong>
          </span>
        </div>
        <div className="text-[10px] text-white/40 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>Trades update dynamically with on-chain confirmation</span>
        </div>
      </div>
    </div>
  );
}
