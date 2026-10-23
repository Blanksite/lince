# 🐆 Lince — Crypto Mindshare, Narrative & KOL Intelligence

> **Vista de Lince para el mercado crypto.**  
> *The sharpest eyes on crypto mindshare, narrative velocity, and early alpha divergence signals.*

---

## 🌟 Overview

**Lince** is an institutional-grade, zero-logging crypto intelligence platform designed to cut through market noise. Inspired by modern narrative intelligence terminals like Dexu and Kaito, Lince monitors, quantifies, and indexes cross-platform social mindshare to spot **alpha divergence**—where organic community and developer attention explodes before token prices catch up.

---

## 🚀 Key Features

### 1. 🔭 Five Analytical Lenses
- **Top Narratives Matrix:** Tracks sector-by-sector mindshare % (Autonomous AI Agents, Prediction Markets, DePIN, RWA, SocialFi) with 24h velocity and sentiment polarity gauges.
- **Alpha Divergence Radar:** The core edge—identifies tokens where social volume spiked (+50% to +85%) while market capitalization remains stagnant (early accumulation signal).
- **KOL & Smart Money Attention:** Tracks prominent crypto researchers, their verified historical hit-rates, and high-conviction theses.
- **Cross-Platform Social Indexing:** Real-time conversation share across X (Twitter), Telegram, YouTube, Farcaster, Reddit, and TikTok.

### 2. 🤖 Lince AI Copilot (Powered by Venice AI)
- Conversational market intelligence grounded in multi-platform social data and on-chain metrics.
- Integrated with **Venice AI** (`llama-3.3-70b` & `deepseek-r1`) for **zero-data logging, private, uncensored Web3 inference**.
- Includes a built-in high-speed deterministic intelligence engine as a fallback for 100% free operation with zero external dependencies.

### 3. ⚡ Native Model Context Protocol (MCP) Server
- Lince runs an active MCP server at `/api/mcp` complying with the official JSON-RPC 2.0 Model Context Protocol specification.
- Exposes tools to AI IDEs and agents (**Cursor**, **Claude Desktop**, **Windsurf**):
  - `lince_get_narratives`: Sector rankings by mindshare % and 24h velocity.
  - `lince_get_alpha_divergence`: High-conviction divergence signals where social buzz disconnected from price.
  - `lince_get_kols`: Verified KOL theses, track records, and sector focus.
  - `lince_get_social_platforms`: Platform breakdown of crypto discussion volume.

---

## 🔌 MCP Integration Config

### For Cursor (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "lince": {
      "url": "https://lince-crypto.vercel.app/api/mcp",
      "transport": "http"
    }
  }
}
```

### For Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "lince": {
      "command": "npx",
      "args": ["-y", "mcp-proxy-http", "https://lince-crypto.vercel.app/api/mcp"]
    }
  }
}
```

---

## 🛠️ Tech Stack & Design Standards

- **Framework:** Next.js 16 (App Router with Turbopack), React 19, TypeScript
- **Styling & Theme:** Tailwind CSS v4, Precision Carbon Dark Theme (`#090A0F`, `#11141E`, `#1E2332`)
- **Icons & UI:** Lucide Icons (Strictly 1.5px stroke SVGs, **zero raw emojis in UI buttons** per `ui-ux-pro-max` standards)
- **AI Integration:** Venice AI API (`https://api.venice.ai/api/v1`) with zero-logging inference
- **Deployment:** Vercel (Edge-ready, Rp 0 serverless deployment)

---

## 💻 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Blanksite/lince.git
   cd lince
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📜 License

MIT License. Open source personal portfolio project.
