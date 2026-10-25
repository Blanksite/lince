"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Terminal, Cpu, ShieldCheck } from "lucide-react";
import LiveClock from "@/components/LiveClock";
import VeniceLogo from "@/components/VeniceLogo";

interface FooterProps {
  onOpenMcp?: () => void;
  onOpenVenice?: () => void;
}

export default function Footer({ onOpenMcp, onOpenVenice }: FooterProps) {
  return (
    <footer className="border-t border-[var(--nm-line)] bg-[var(--nm-surface)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        {/* Main 4-Column Grid (Modeled after AntSeed & Palantir) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[var(--nm-line)]">
          {/* Column 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="Lince Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-tech font-bold text-base tracking-[0.24em] text-[var(--nm-text)]">
                  LINCE
                </span>
                <span className="text-[10px] font-mono-tech tracking-[0.12em] text-[var(--nm-text-subtle)]">
                  / LABS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed font-sans max-w-sm">
              Institutional crypto mindshare &amp; narrative velocity intelligence. We index social divergence against on-chain liquidity to spot asymmetric accumulation early.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
              <span className="px-2 py-0.5 rounded bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                BASE · SOLANA · ETH
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--nm-code-bg)] border border-[var(--nm-line)] flex items-center gap-1">
                <VeniceLogo className="w-2.5 h-2.5 text-purple-500" />
                VENICE ZERO-LOGGING
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                MCP OPEN SPEC
              </span>
            </div>
          </div>

          {/* Column 3: Product */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono-tech font-bold uppercase tracking-[0.16em] text-[var(--nm-text)] block">
              Product
            </span>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[var(--nm-text-muted)]">
              <li>
                <Link
                  href="/terminal"
                  className="hover:text-[var(--nm-accent-cyan)] transition-colors flex items-center gap-1.5 font-semibold text-[var(--nm-text)]"
                >
                  <Terminal className="w-3 h-3 text-[var(--nm-accent-cyan)]" />
                  <span>Terminal App</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/scanner"
                  className="hover:text-[var(--nm-accent-cyan)] transition-colors flex items-center gap-1.5 text-[var(--nm-accent-cyan)] font-medium"
                >
                  <span>ClusterGuard Scanner</span>
                </Link>
              </li>
              <li>
                <Link href="/#narratives-section" className="hover:text-[var(--nm-text)] transition-colors">
                  Narratives Catalog
                </Link>
              </li>
              <li>
                <Link href="/#divergence-section" className="hover:text-[var(--nm-text)] transition-colors">
                  Alpha Divergence Radar
                </Link>
              </li>
              <li>
                <Link href="/#kols-section" className="hover:text-[var(--nm-text)] transition-colors">
                  KOL Consensus Radar
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[var(--nm-text)] transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Network & Architecture */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono-tech font-bold uppercase tracking-[0.16em] text-[var(--nm-text)] block">
              Network
            </span>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[var(--nm-text-muted)]">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-[var(--nm-text)] transition-colors font-medium text-[var(--nm-text)]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#methodology" className="hover:text-[var(--nm-text)] transition-colors">
                  Divergence Formula
                </Link>
              </li>
              <li>
                <Link href="/docs#mcp-server" className="hover:text-[var(--nm-text)] transition-colors flex items-center gap-1">
                  <span>MCP JSON-RPC Spec</span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#data-pipeline" className="hover:text-[var(--nm-text)] transition-colors">
                  6-Feed Social Ingestion
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Blanksite/lince"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--nm-text)] transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[var(--nm-text-subtle)]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: More & Legal */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono-tech font-bold uppercase tracking-[0.16em] text-[var(--nm-text)] block">
              More
            </span>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[var(--nm-text-muted)]">
              <li>
                <Link href="/terms" className="hover:text-[var(--nm-text)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms#privacy" className="hover:text-[var(--nm-text)] transition-colors">
                  Zero-Retention Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms#disclaimers" className="hover:text-[var(--nm-text)] transition-colors">
                  Risk Disclaimers
                </Link>
              </li>
              <li>
                <a
                  href="/logo.jpg"
                  target="_blank"
                  className="hover:text-[var(--nm-text)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Brand Assets</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[var(--nm-text-subtle)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://venice.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                >
                  <VeniceLogo className="w-2.5 h-2.5 text-purple-500" />
                  <span>Venice AI Partner</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[var(--nm-text-subtle)]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Bar: Status, Clock & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[var(--nm-text-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)] animate-pulse" />
              <span className="text-[var(--nm-text-muted)]">PIPELINE: 6/6 ONLINE</span>
            </div>
            <span>·</span>
            <span>CADENCE: 10M REFRESH</span>
          </div>

          <div className="flex items-center gap-4">
            <LiveClock prefix="NETWORK UTC:" />
            <span className="text-[var(--nm-text-muted)]">&copy; 2026 Lince Labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
