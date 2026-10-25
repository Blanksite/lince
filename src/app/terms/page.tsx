"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileText,
  Lock,
  AlertTriangle,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import VeniceLogo from "@/components/VeniceLogo";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--nm-bg)] text-[var(--nm-text)] flex flex-col font-sans selection:bg-[var(--nm-action)] selection:text-[var(--nm-action-text)] transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--nm-line)] bg-[var(--nm-surface)]/95 backdrop-blur-md px-4 sm:px-6 h-14 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Lince Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-tech font-bold text-sm tracking-[0.2em] text-[var(--nm-text)]">
                LINCE
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[var(--nm-text-subtle)] hidden sm:inline">
                / LEGAL &amp; TERMS
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <Link href="/" className="hover:text-[var(--nm-text)] transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="hover:text-[var(--nm-text)] transition-colors">
            How it works
          </Link>
          <Link href="/docs" className="hover:text-[var(--nm-text)] transition-colors">
            Docs
          </Link>
          <Link href="/terms" className="text-[var(--nm-text)] font-semibold transition-colors">
            Terms
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans transition-all active:scale-95 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </Link>
        </div>
      </header>

      {/* Main Legal Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[var(--nm-line)] pb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)] animate-pulse" />
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
              [ LEGAL &amp; GOVERNANCE FRAMEWORK ]
            </span>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[var(--nm-text)] tracking-tight">
            Terms of Service &amp; Disclaimers
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-[var(--nm-text-subtle)] pt-1">
            <span>VERSION 1.4</span>
            <span>·</span>
            <span>EFFECTIVE DATE: OCTOBER 2026</span>
            <span>·</span>
            <span className="text-[var(--nm-accent-emerald)]">OPERATOR: LINCE LABS</span>
          </div>
        </div>

        {/* Warning Callout: Not Financial Advice */}
        <div className="p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--nm-accent-amber)] font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>IMPORTANT NOTICE: NOT FINANCIAL OR INVESTMENT ADVICE</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            All intelligence, mindshare metrics, alpha divergence scores, and KOL consensus data displayed on Lince (Vista de Lince) are provided strictly for informational, educational, and computational research purposes. Lince does not provide investment, financial, legal, or tax advice. Digital asset markets are highly volatile and carry substantial risk of loss.
          </p>
        </div>

        {/* Clause 1: Acceptance */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            1. Acceptance of Terms &amp; Scope of Service
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            By accessing or using the Lince platform, web terminal, Model Context Protocol (MCP) endpoints, or related APIs operated by Lince Labs (&ldquo;Lince&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to all terms, you must discontinue use immediately.
          </p>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Lince is an open informational intelligence infrastructure that indexes publicly available conversation velocity across third-party social platforms and cross-references it with public on-chain decentralized exchange (DEX) liquidity.
          </p>
        </section>

        {/* Clause 2: Non-Custodial Nature */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            2. Non-Custodial &amp; Zero-Asset Commitment
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Lince is strictly an informational data protocol. Lince does not hold custody of user funds, does not manage digital asset deposits, does not operate an exchange or brokerage, and never requests or stores private keys, recovery seed phrases, or wallet credentials. Any execution or trading conducted by users on external third-party protocols or decentralized exchanges is at the user&apos;s sole risk and discretion.
          </p>
        </section>

        {/* Clause 3: Zero-Logging & Privacy */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            3. Privacy Policy &amp; Zero User Data Retention
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            We adhere to a strict zero-retention philosophy:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm font-sans text-[var(--nm-text-muted)] pl-4">
            <li className="list-disc">
              <strong>Zero Prompt Retention:</strong> Queries submitted in the Copilot terminal are synthesized using verifiable private decentralized inference (via Venice AI) or client-side deterministic engines. Your prompts are not recorded, logged, or used to train corporate language models.
            </li>
            <li className="list-disc">
              <strong>BYOK Security:</strong> If you supply a custom Venice AI key, the key is stored solely in your local browser storage (<code className="font-mono-tech text-xs bg-[var(--nm-code-bg)] px-1 rounded">localStorage</code>) and is never transmitted to, inspected by, or persisted on Lince Labs servers.
            </li>
            <li className="list-disc">
              <strong>No Account Requirements:</strong> The core features of Lince operate at Rp 0 cost with zero mandatory email registrations, phone verifications, or tracking cookies.
            </li>
          </ul>
        </section>

        {/* Clause 4: MCP Fair Use */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            4. Model Context Protocol (MCP) Fair Use
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Lince provides an open JSON-RPC 2.0 endpoint at <code className="font-mono-tech text-xs bg-[var(--nm-code-bg)] px-1.5 py-0.5 rounded text-[var(--nm-text)]">/api/mcp</code> for autonomous agents, Cursor, Claude Desktop, and developer workflows. You agree to use the MCP server fairly and responsibly. You agree not to launch distributed denial-of-service (DDoS) attacks, flood the telemetry pipeline, or deploy automated bots designed to degrade server availability for other developers.
          </p>
        </section>

        {/* Clause 5: Third-Party Feeds */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            5. Third-Party Feeds &amp; On-Chain Data Disclaimers
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Lince ingests publicly accessible data from external services including X (Twitter), Telegram, YouTube, Farcaster, Reddit, TikTok, and blockchain RPC nodes across Base, Solana, Arbitrum, and Ethereum. We make no representations or warranties regarding the continuous availability, accuracy, or uninterrupted uptime of these third-party platforms.
          </p>
        </section>

        {/* Clause 6: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            6. Limitation of Liability
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            To the maximum extent permitted by applicable law, Lince Labs, its contributors, founders, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to loss of profits, digital assets, trading slippage, smart contract bugs, or data inaccuracies arising from the use or inability to use the platform.
          </p>
        </section>

        {/* Clause 7: Modifications */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-2xl text-[var(--nm-text)]">
            7. Modifications &amp; Governance
          </h2>
          <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Lince Labs reserves the right to modify these terms as the protocol evolves. Continued use of the platform after updates constitutes acceptance of the amended terms.
          </p>
        </section>

        {/* Contact Strip */}
        <div className="pt-6 border-t border-[var(--nm-line)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-[var(--nm-text-subtle)]">
          <span>QUESTIONS OR INQUIRIES: SUPPORT@LINCELABS.XYZ</span>
          <Link href="/docs" className="text-[var(--nm-text)] hover:underline">
            Read Documentation →
          </Link>
        </div>
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
