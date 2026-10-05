# Multi-Model AI UI Redesign Specification (Claude, Gemini, ChatGPT)

## 1. Overview & Conceptual Vision
The goal of this redesign is to transform **Portfolio V2** (`/v2/`) into an authentic homage to the world's leading frontier AI interfaces:
- **Hero & Identity:** **Claude by Anthropic** (warm, literary, intellectual, editorial, terracotta `#cc785c` accents)
- **Where I Work (Focus Areas) & AI Navigator:** **Gemini by Google** (cosmic midnight `#0e121a`, fluid iridescent gradients `#4E82EE` → `#9B72CF`, dynamic multi-modal visuals)
- **Selected Work & Experience:** **ChatGPT by OpenAI** (modernist slate charcoal `#171717` / `#212121`, Canvas window layout, syntax-highlighted code tabs, mint green `#10a37f` badges)
- **Unified Backbone:** Seamless dark-mode continuity across all sections so that the interface transitions feel intentional, polished, and cohesive rather than chaotic.
- **AI Navigator Constraint:** **Only keep the "Ask AI" trigger on the bottom-right of the screen** (fixed floating launcher + docked panel). It must not appear in the navbar or the hero section.

---

## 2. Design System & Thematic Tokens

### Global Foundation
- **Font Stack:**
  - Body & UI: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Editorial Claude Display: Google Font `'Newsreader', serif` (optical sizes for headlines)
  - Code & Monospace: `'JetBrains Mono', 'Fira Code', monospace`
- **Dark Mode Continuity:**
  - Base Body: `#101011`
  - Claude Hero Zone: `#161514` (warm dark obsidian)
  - Gemini Focus Zone: `#0d1117` (deep cosmic indigo)
  - ChatGPT Work Zone: `#171717` (slate modernist charcoal)
  - Smooth Section Blending: Gradient masks and soft separator borders (`rgba(255, 255, 255, 0.06)`) between zones.

---

## 3. Detailed Section Implementations

### Section 1: Hero (The Claude Design Language — Anthropic)
- **Aesthetic:** Editorial, literary, calm reasoning, human-centered intelligence.
- **Background:** Warm obsidian `#161514` with faint warm amber radial warmth.
- **Key Brand Colors:**
  - Primary Accent: Terracotta Coral (`#cc785c` / `#d97757`)
  - Accent Tint: `rgba(204, 120, 92, 0.12)`
  - Border Active: `rgba(204, 120, 92, 0.35)`
- **Typography:**
  - Badge: `✦ Claude 3.5 Editorial Mode · AI/ML Engineer`
  - Headline: "Building *reliable* AI systems" where *"reliable"* is styled in italic editorial serif (`Newsreader`) with a warm terracotta glow gradient (`linear-gradient(180deg, #f5a98d 0%, #cc785c 100%)`).
- **Claude Artifact Framing:**
  - The portrait composition adopts Claude's card geometry: rounded corners (`24px`), warm border tone, and a pill stating degree credentials with Claude's signature terracotta dot.
- **CTAs:**
  - Clean primary button ("View my work →") in warm ivory and secondary ("Let's talk").
  - *No "Ask AI" button in the hero* (kept strictly at bottom-right per user requirement).

---

### Section 2: Where I Work (The Gemini Design Language — Google)
- **Aesthetic:** Fluid multi-modal intelligence, cosmic aura, iridescent blue-to-violet light.
- **Background:** Deep cosmic midnight indigo `#0d1117`.
- **Key Brand Colors:**
  - Gemini Gradient: `linear-gradient(135deg, #4E82EE 0%, #9B72CF 50%, #1B72E8 100%)`
  - Sparkle Blue: `#4E82EE`
  - Orchid Violet: `#9B72CF`
  - Cyan Ice: `#8bb2ff`
- **Section Header:**
  - Gemini four-point star badge: `✦ GEMINI MULTI-MODAL CAPABILITIES`
  - Section Title: "Where I work" with subtle blue-violet gradient sheen.
- **Three Focus Cards:**
  - Card 1: Production AI Systems
  - Card 2: Multi-Agent AI
  - Card 3: Neuro-Symbolic ML
  - Visual Container: 335px height, radial aura backdrop.
  - Active Movement: Animated canvas overlays (laser scan, circulating agent packets, synaptic firing) pulsating in Gemini's iconic blue-and-violet light trails.
  - Pill badges: Rounded Gemini chip styling with sparkling micro-indicators.

---

### Section 3: Selected Work & Experience (The ChatGPT Design Language — OpenAI)
- **Aesthetic:** Utilitarian, modular, modernist engineering tool, OpenAI Canvas workspace.
- **Background:** Slate charcoal `#171717` with elevated `#212121` card surfaces.
- **Key Brand Colors:**
  - OpenAI Mint Green: `#10a37f`
  - Mint Tint: `rgba(16, 163, 127, 0.12)`
  - Mint Border: `rgba(16, 163, 127, 0.32)`
- **ChatGPT Canvas for Tracxo (Lead Project):**
  - Styled as an authentic ChatGPT Canvas window:
    - Top window chrome with traffic light dots or tab switcher: `Architecture.py`, `CaseStudy.md`, `Metrics.json`.
    - Interactive code/spec snippet pane with syntax highlighting and a "Copy" icon.
    - System tags (`Multi-Agent`, `FastAPI`, `PostgreSQL`) styled in OpenAI status badge format (`#10a37f`).
- **Experience Section as ChatGPT Thread:**
  - Styled as a clean, structured conversation thread:
    - User message prompt box: `"Summarize Amey's technical roles and enterprise impact"`
    - Assistant response: The structured editorial timeline entries with date pills, verified company badges, and expandable impact bullet points.

---

### Section 4: Let's Connect & Footer (Tri-Model Synthesis)
- **Panoramic Finale:**
  - Mountain backdrop with a unifying tri-color bottom accent line:
    `linear-gradient(90deg, #cc785c 0%, #4E82EE 50%, #10a37f 100%)`.
- **Model Status Indicator Footer:**
  - Interactive status bar displaying telemetry:
    - `Claude 3.5 Sonnet` · `Gemini 1.5 Pro` · `GPT-4o`
    - Live latency indicator, grounded portfolio badge, and direct contact links.

---

### Section 5: AI Portfolio Navigator (Bottom-Right Dock Only)
- **Launcher:**
  - Persistent, fixed floating trigger at the bottom-right corner:
    `<button class="ai-floating-trigger" id="floating-ask-ai-btn">✦ Ask AI <kbd>⌘K</kbd></button>`.
  - Removed from Navbar and Hero.
- **Docked Panel:**
  - Opens in the bottom-right dock without blurring the page.
  - Styled in the Gemini Studio design language (cosmic dark panel, gradient input border, quick suggestion chips).

---

## 4. Verification & Testing Strategy
1. **Visual Balance & Contrast:**
   - Verify smooth background transitions between `#161514` (Claude) → `#0d1117` (Gemini) → `#171717` (ChatGPT) using browser screenshots.
2. **Typography Loading:**
   - Ensure Google Font `Newsreader` loads cleanly for Claude editorial serif display titles without layout shift.
3. **Interactive Validation:**
   - Test floating AI trigger at bottom-right on both Desktop (1440px) and Mobile (390px).
   - Confirm that no duplicate "Ask AI" buttons exist in navbar or hero.
4. **Motion & Canvas Performance:**
   - Confirm that the Gemini focus canvas animations and ChatGPT canvas tabs render at 60fps without lag.
