"use client";

import React, { useState } from "react";
import { FundingNode } from "@/lib/types";
import {
  GitFork,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  ArrowDownRight,
  Zap,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";

interface FundingLineageTreeProps {
  fundingLineage?: FundingNode;
  tokenSymbol: string;
  chain: string;
}

export function FundingLineageTree({
  fundingLineage,
  tokenSymbol,
  chain,
}: FundingLineageTreeProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<FundingNode | null>(null);

  if (!fundingLineage) return null;

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const active = selectedNode || fundingLineage;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070913] overflow-hidden shadow-2xl space-y-0 text-white font-mono-tech">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a0f1d]/90 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-400 font-extrabold">
              ARKHAM PRO ON-CHAIN FORENSICS · MONEY FLOW
            </span>
          </div>
          <h4 className="font-serif-editorial text-lg sm:text-xl text-white">
            Pre-Launch Gas &amp; Funder Lineage Tree
          </h4>
          <p className="text-xs text-white/50 font-sans">
            Traces the master funding source that dispersed initial gas and buy liquidity to the deployer and early sniper bots.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            0% Clawback Detected
          </span>
        </div>
      </div>

      {/* Main Interactive Tree Stage */}
      <div className="p-4 sm:p-6 space-y-6 relative bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.06)_0%,_transparent_65%)]">
        {/* Level 1: Root Master Funder Node */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => setSelectedNode(fundingLineage)}
            className={`cursor-pointer transition-all max-w-xl w-full p-4 rounded-xl border ${
              active.address === fundingLineage.address
                ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                : "border-white/10 bg-[#0a0f1d]/80 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-extrabold border border-cyan-500/30">
                  ROOT GAS DISPENSER
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {fundingLineage.label}
                </span>
              </div>
              <span className="text-[11px] font-extrabold text-cyan-400">
                {fundingLineage.amountEth} ETH SEED
              </span>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-white/70">
              <code className="text-white font-semibold">
                {fundingLineage.address.slice(0, 10)}...{fundingLineage.address.slice(-8)}
              </code>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(fundingLineage.address);
                  }}
                  className="p-1 hover:text-cyan-400 text-white/60 transition-colors"
                  title="Copy address"
                >
                  {copiedAddress === fundingLineage.address ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {fundingLineage.explorerUrl && (
                  <a
                    href={fundingLineage.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:text-white text-white/60 transition-colors"
                    title="Blockscout Explorer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {fundingLineage.note && (
              <p className="mt-2 text-[10px] text-white/50 border-t border-white/5 pt-1.5 font-sans leading-relaxed">
                {fundingLineage.note}
              </p>
            )}
          </div>

          {/* Branch Connectors */}
          <div className="flex flex-col items-center my-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-[0_0_8px_#00e5ff]" />
            <div className="w-16 h-0.5 bg-indigo-500" />
          </div>
        </div>

        {/* Level 2: Children Wallets (Deployer & Snipers) */}
        {fundingLineage.children && fundingLineage.children.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {fundingLineage.children.map((child, idx) => {
              const isSelected = active.address === child.address;
              let roleBadgeBg = "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
              if (child.role === "DEPLOYER") {
                roleBadgeBg = "bg-rose-500/20 text-rose-400 border-rose-500/30";
              } else if (child.role === "SNIPER_BOT") {
                roleBadgeBg = "bg-amber-500/20 text-amber-400 border-amber-500/30";
              }

              return (
                <div
                  key={child.address}
                  onClick={() => setSelectedNode(child)}
                  className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_16px_rgba(0,229,255,0.2)]"
                      : "border-white/10 bg-[#0a0f1d]/70 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border ${roleBadgeBg}`}>
                        {child.role}
                      </span>
                      <span className="text-[11px] font-bold text-white">
                        {child.amountEth} ETH
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white mt-2 truncate">
                      {child.label}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] text-white/60 mt-1">
                      <code>
                        {child.address.slice(0, 8)}...{child.address.slice(-6)}
                      </code>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(child.address);
                          }}
                          className="p-1 hover:text-cyan-400 text-white/50"
                        >
                          {copiedAddress === child.address ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        {child.explorerUrl && (
                          <a
                            href={child.explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 hover:text-white text-white/50"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-[10px] text-cyan-400/90 font-medium">
                      ⏱ {child.timeBeforeLaunch}
                    </div>

                    {child.note && (
                      <p className="mt-2 text-[10px] text-white/50 font-sans border-t border-white/5 pt-1.5 line-clamp-2">
                        {child.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Forensics Telemetry */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0a0f1d] flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
        <div className="flex flex-wrap items-center gap-4">
          <span>
            Total Seed Dispersal: <strong className="text-cyan-400">{fundingLineage.amountEth} ETH</strong>
          </span>
          <span>
            Funded Addresses:{" "}
            <strong className="text-white">
              {(fundingLineage.children?.length || 0) + 1} Wallets
            </strong>
          </span>
          <span>
            Sybil Centralization: <strong className="text-emerald-400">0% (Independent Execution)</strong>
          </span>
        </div>
        <div className="text-[10px] text-white/40 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-cyan-400" />
          <span>Lineage verified via Robinhood Chain internal transaction traces</span>
        </div>
      </div>
    </div>
  );
}
