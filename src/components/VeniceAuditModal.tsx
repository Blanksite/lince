"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";
import VeniceLogo from "@/components/VeniceLogo";
import { ClusterScanResult } from "@/lib/types";
import Link from "next/link";

interface VeniceAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanResult: ClusterScanResult;
  customApiKey?: string;
}

export function VeniceAuditModal({
  isOpen,
  onClose,
  scanResult,
  customApiKey = "",
}: VeniceAuditModalProps) {
  const [memo, setMemo] = useState<string>("");
  const [modelUsed, setModelUsed] = useState<string>("Venice AI (llama-3.3-70b) · Zero-Logging");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<"llama-3.3-70b" | "deepseek-r1">("llama-3.3-70b");

  const runVeniceAudit = async (modelToUse = selectedModel) => {
    setIsLoading(true);
    setMemo("");

    try {
      const prompt = `Perform an institutional forensic audit on ${scanResult.tokenSymbol} (${scanResult.tokenAddress}) on ${scanResult.chain}. Assess cabal sybil clusters, Pons V2 bonding reserve liquidity, and provide an actionable hedge fund recommendation.`;

      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: prompt,
          contractContext: scanResult,
          customApiKey: customApiKey || undefined,
          model: modelToUse,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMemo(data.content);
        if (data.modelUsed) setModelUsed(data.modelUsed);
      } else {
        setMemo("Failed to retrieve forensic memo from Venice AI pipeline. Please retry.");
      }
    } catch (err) {
      console.error("Venice audit error:", err);
      setMemo("Connection to Venice AI private inference gateway interrupted.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && scanResult) {
      runVeniceAudit();
    }
  }, [isOpen, scanResult?.tokenAddress]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModelChange = (model: "llama-3.3-70b" | "deepseek-r1") => {
    setSelectedModel(model);
    runVeniceAudit(model);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090812] border border-purple-500/30 rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(168,85,247,0.25)] text-white font-mono-tech flex flex-col max-h-[90vh] overflow-hidden">
        {/* Subtle Purple Glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-500/20 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <VeniceLogo className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-extrabold">
                [ VENICE AI · PRIVATE FORENSIC BRIEF ]
              </span>
            </div>

            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal tracking-tight">
              Institutional Forensic Memo
            </h3>

            <p className="text-xs text-white/50 font-sans">
              Zero-logging private decentralized intelligence for ${scanResult.tokenSymbol} ({scanResult.chain.toUpperCase()}).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Row: Model Selector & Verification Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-white/10 text-xs shrink-0">
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
            <span className="text-[10px] text-white/40 uppercase px-2 font-bold">MODEL:</span>
            <button
              onClick={() => handleModelChange("llama-3.3-70b")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                selectedModel === "llama-3.3-70b"
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] font-extrabold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Llama 3.3 70B
            </button>
            <button
              onClick={() => handleModelChange("deepseek-r1")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                selectedModel === "deepseek-r1"
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] font-extrabold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              DeepSeek R1
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              Zero-Logging Verified
            </span>
            <button
              onClick={() => runVeniceAudit()}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-50"
              title="Re-run Venice Audit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-purple-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 font-sans text-xs text-white/90 leading-relaxed pr-1 select-text">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                  <VeniceLogo className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-mono-tech font-bold text-white text-xs block tracking-widest uppercase">
                  SYNTHESIZING ON-CHAIN GROUND TRUTH VIA VENICE AI...
                </span>
                <span className="font-mono-tech text-[10px] text-white/50 block">
                  Processing sybil graph, Pons V2 reserve depth, and X cashtag sentiment
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-white/[0.02] p-4 sm:p-5 rounded-xl border border-white/5 font-mono-tech text-xs whitespace-pre-wrap leading-relaxed">
              {memo}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="text-[10px] text-white/50 flex items-center gap-1.5 font-mono-tech">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Engine: {modelUsed}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={isLoading || !memo}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Memo</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Memo</span>
                </>
              )}
            </button>

            <Link
              href={`/terminal`}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_14px_rgba(168,85,247,0.4)]"
            >
              <span>Ask in Terminal</span>
              <Terminal className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
