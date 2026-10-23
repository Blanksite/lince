"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveExplorer from "@/components/LiveExplorer";
import CopilotTerminal from "@/components/CopilotTerminal";
import McpModal from "@/components/McpModal";
import VeniceKeyModal from "@/components/VeniceKeyModal";
import LynxLogo from "@/components/LynxLogo";
import {
  NARRATIVES_DATA,
  ALPHA_DIVERGENCE_DATA,
  KOLS_DATA,
  SOCIAL_PLATFORMS_DATA,
} from "@/lib/data";
import {
  Radio,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";

export default function LinceHome() {
  const [activeTab, setActiveTab] = useState<"narratives" | "divergence" | "kols" | "socials">("narratives");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isVeniceModalOpen, setIsVeniceModalOpen] = useState<boolean>(false);
  const [veniceApiKey, setVeniceApiKey] = useState<string>("");
  const [copilotInitialQuery, setCopilotInitialQuery] = useState<string>("");

  const scrollToCopilot = () => {
    const el = document.getElementById("copilot-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectTokenForCopilot = (token: string) => {
    setCopilotInitialQuery(`Analyze the current mindshare and divergence profile for $${token}`);
    scrollToCopilot();
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#EDEDED] flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-emerald-950/40 border-b border-[#1E2332] px-4 py-2 text-center text-xs font-mono text-neutral-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>LINCE INTELLIGENCE — MULTI-PLATFORM SOCIAL MINDSHARE &amp; NARRATIVE RADAR</span>
        <span className="hidden sm:inline text-neutral-500">|</span>
        <button
          onClick={() => setIsMcpModalOpen(true)}
          className="underline text-cyan-400 hover:text-cyan-300 hidden sm:inline-flex items-center gap-1 font-semibold"
        >
          CONNECT MCP TO CURSOR &amp; CLAUDE <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation Header */}
      <Header
        onOpenMcp={() => setIsMcpModalOpen(true)}
        onOpenVenice={() => setIsVeniceModalOpen(true)}
        isVeniceConfigured={Boolean(veniceApiKey)}
        onScrollToCopilot={scrollToCopilot}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectNarrativeTab={() => setActiveTab("narratives")}
          onSelectDivergenceTab={() => setActiveTab("divergence")}
        />

        {/* Live Explorer Terminal (Zero Friction No-Login Preview) */}
        <LiveExplorer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          narratives={NARRATIVES_DATA}
          divergences={ALPHA_DIVERGENCE_DATA}
          kols={KOLS_DATA}
          socials={SOCIAL_PLATFORMS_DATA}
          searchQuery={searchQuery}
          onSelectTokenForCopilot={handleSelectTokenForCopilot}
        />

        {/* Lince AI Copilot Terminal */}
        <CopilotTerminal
          customApiKey={veniceApiKey}
          onOpenVeniceModal={() => setIsVeniceModalOpen(true)}
          initialQuery={copilotInitialQuery}
        />

        {/* Architecture & Five Lenses Showcase */}
        <section className="py-16 border-b border-[#1E2332] bg-[#0C0E17]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase block mb-2">
                Unified Analytical Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Five Lenses. One Comprehensive View.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Raw social chatter converted into quantifiable alpha signals across the top 1,000+ crypto assets and tokenless pre-TGE projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lens 1 */}
              <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2332]">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">1. Social Indexing Engine</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Continuous multi-platform ingestion across X (Crypto-Twitter), Telegram, YouTube, Reddit, Farcaster, and TikTok. Cleans noise, bots, and sybil campaigns to capture organic attention velocity.
                </p>
              </div>

              {/* Lens 2 */}
              <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2332]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">2. Mindshare Divergence (Alpha)</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Cross-checks social attention spikes against on-chain liquidity and DEX price action. When conversation explodes before price follows, Lince flags an early accumulation signal.
                </p>
              </div>

              {/* Lens 3 */}
              <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2332]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">3. Zero-Logging AI Inference</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Deep intelligence powered by Venice AI (Llama 3.3 70B &amp; DeepSeek R1). Zero prompt retention, zero censorship, and verifiable private computation for traders and researchers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2332] bg-[#07080D] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#11141E] border border-[#1E2332]">
              <LynxLogo size={18} />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight">LINCE</span>
              <p className="text-[11px] font-mono text-neutral-500">
                VISTA DE LINCE — CRYPTO MINDSHARE INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
            <button
              onClick={() => setIsMcpModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              MCP PROTOCOL
            </button>
            <button
              onClick={() => setIsVeniceModalOpen(true)}
              className="hover:text-purple-400 transition-colors"
            >
              VENICE AI
            </button>
            <a
              href="https://github.com/Blanksite"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              GITHUB <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-[11px] font-mono text-neutral-600">
            &copy; 2026 Lince. Open Source Portfolio Project.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <McpModal isOpen={isMcpModalOpen} onClose={() => setIsMcpModalOpen(false)} />
      <VeniceKeyModal
        isOpen={isVeniceModalOpen}
        onClose={() => setIsVeniceModalOpen(false)}
        customApiKey={veniceApiKey}
        onSaveApiKey={(key) => setVeniceApiKey(key)}
      />
    </div>
  );
}
