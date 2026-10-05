# Multi-Model UI Redesign (Claude, Gemini, ChatGPT) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Portfolio V2 into a curated multi-model experience where the Hero adopts Anthropic Claude's warm editorial style, Focus Areas adopt Google Gemini's iridescent multi-modal aura, and Selected Work/Experience adopt OpenAI ChatGPT's Canvas workspace, while keeping "Ask AI" strictly at the bottom-right dock.

**Architecture:** Extend `v2/assets/css/v2.css` with scoped section theme tokens (`--claude-*`, `--gemini-*`, `--chatgpt-*`) atop the unified dark canvas (`#101011`). Enhance `v2/index.html` with Google Font `Newsreader` for Claude's serif display typography, ChatGPT Canvas tab components for Tracxo, and a tri-model telemetry footer.

**Tech Stack:** HTML5, CSS3 (Vanilla CSS Custom Properties, CSS Grid, Flexbox, Keyframes), Vanilla JavaScript (Canvas API, IntersectionObserver), Chrome Headless CDP verification.

## Global Constraints
- Target directory: strictly within `v2/` (`e:/Coding/ameynarwadkar.github.io/v2/`). Do NOT modify root `/index.html` or existing portfolio v1 assets.
- Ask AI constraint: The "Ask AI" button must ONLY exist at the bottom right corner (floating trigger + dock panel). Never place Ask AI buttons in the navbar or hero.
- Theme Continuity: Unified dark-mode continuum across all sections (Claude `#161514` → Gemini `#0d1117` → ChatGPT `#171717`) with smooth ambient transitions.
- Brand Accents: Claude Terracotta `#cc785c`, Gemini Iridescent `#4E82EE` → `#9B72CF`, ChatGPT Mint `#10a37f`.

---

### Task 1: Typography & Multi-Model Design Tokens Setup

**Files:**
- Modify: `v2/index.html:15-30`
- Modify: `v2/assets/css/v2.css:10-70`
- Test: Verification script `test-multi-model-setup.py`

**Interfaces:**
- Consumes: Google Fonts API for `Newsreader:ital,opsz,wght@1,6..72,400..700`
- Produces: CSS custom properties `--claude-*`, `--gemini-*`, `--chatgpt-*`, `--font-serif`

- [ ] **Step 1: Add Google Font Newsreader to v2/index.html**
Add the preconnect and stylesheet link for `Newsreader` (optical size 6-72, italic and normal weights 400-700) to the `<head>` of `v2/index.html`.

- [ ] **Step 2: Add theme variables to :root in v2/assets/css/v2.css**
Define scoped color tokens:
```css
/* Claude Design Tokens (Anthropic) */
--claude-bg: #161514;
--claude-bg-card: #1c1a19;
--claude-accent: #cc785c;
--claude-accent-light: #f5a98d;
--claude-tint: rgba(204, 120, 92, 0.12);
--claude-border: rgba(204, 120, 92, 0.28);
--font-serif: 'Newsreader', Georgia, serif;

/* Gemini Design Tokens (Google) */
--gemini-bg: #0d1117;
--gemini-bg-card: #131722;
--gemini-blue: #4E82EE;
--gemini-violet: #9B72CF;
--gemini-cyan: #1B72E8;
--gemini-gradient: linear-gradient(135deg, #4E82EE 0%, #9B72CF 50%, #1B72E8 100%);
--gemini-tint: rgba(78, 130, 238, 0.12);
--gemini-border: rgba(78, 130, 238, 0.32);

/* ChatGPT Design Tokens (OpenAI) */
--chatgpt-bg: #171717;
--chatgpt-bg-card: #212121;
--chatgpt-bg-code: #121212;
--chatgpt-accent: #10a37f;
--chatgpt-accent-hover: #1a7f64;
--chatgpt-tint: rgba(16, 163, 127, 0.12);
--chatgpt-border: rgba(16, 163, 127, 0.3);
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

- [ ] **Step 3: Commit Task 1 changes**
```bash
git add v2/index.html v2/assets/css/v2.css; git commit -m "feat(v2): configure multi-model design tokens and Newsreader font"
```

---

### Task 2: Claude-Themed Hero Section (Anthropic)

**Files:**
- Modify: `v2/index.html:70-135`
- Modify: `v2/assets/css/v2.css:240-500`

**Interfaces:**
- Consumes: `--claude-*` tokens, `--font-serif`
- Produces: Claude editorial headline, Claude terracotta badge, warm obsidian card framing

- [ ] **Step 1: Update Hero HTML in v2/index.html**
Update hero section elements:
1. Section class: `<header class="hero-section claude-theme" id="hero">`
2. Badge: `<div class="hero-badge claude-badge"><span class="claude-sparkle">✦</span> Claude 3.5 Editorial · AI/ML Engineer</div>`
3. Title:
```html
<h1 class="hero-title">
  Building <span class="claude-serif-highlight">reliable</span><br />
  AI systems
</h1>
```
4. Verify CTAs contain ONLY:
```html
<div class="hero-ctas">
  <a href="#selected-work" class="btn-primary claude-primary-btn">
    View my work <span class="btn-arrow">→</span>
  </a>
  <a href="mailto:amey.narwadkar1729@gmail.com" class="btn-secondary">
    Let's talk
  </a>
</div>
```
*(No Ask AI button in hero!)*

- [ ] **Step 2: Add Claude Hero styles to v2/assets/css/v2.css**
Style `.hero-section.claude-theme`:
- Background: `background: radial-gradient(circle at 65% 30%, rgba(204, 120, 92, 0.07) 0%, transparent 60%), var(--claude-bg);`
- Badge `.claude-badge`: border with `--claude-border`, text `--claude-accent-light`, background `--claude-tint`.
- Highlight `.claude-serif-highlight`:
```css
.claude-serif-highlight {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.01em;
  background: linear-gradient(180deg, #fce7df 10%, #cc785c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  padding-right: 0.1em;
}
```
- Portrait card floating pill: terracotta status dot and border hover.

- [ ] **Step 3: Commit Task 2 changes**
```bash
git add v2/index.html v2/assets/css/v2.css; git commit -m "feat(v2): implement Claude-themed editorial hero section"
```

---

### Task 3: Gemini-Themed Focus Areas & AI Navigator (Google)

**Files:**
- Modify: `v2/index.html:130-205`
- Modify: `v2/assets/css/v2.css:505-710`
- Modify: `v2/assets/js/v2.js:230-535`

**Interfaces:**
- Consumes: `--gemini-*` tokens, Canvas API
- Produces: Gemini iridescent focus section, aurora light canvas trails

- [ ] **Step 1: Update Focus Section HTML in v2/index.html**
Update section:
`<section class="focus-section gemini-theme" id="focus-areas">`
Badge:
`<span class="section-label gemini-label"><span class="gemini-star">✦</span> GEMINI MULTI-MODAL CAPABILITIES</span>`
Title:
`<h2 class="section-title gemini-title">Where I work</h2>`

- [ ] **Step 2: Style Gemini Focus Areas in v2/assets/css/v2.css**
- Background: `var(--gemini-bg)` (`#0d1117`) with a subtle cosmic top gradient fade from `#161514`.
- Section label: iridescent gradient text (`linear-gradient(135deg, #4E82EE, #9B72CF)`).
- Focus cards: background `var(--gemini-bg-card)`, hover border `rgba(78, 130, 238, 0.45)`.
- Focus visual container: radial gradient aura `radial-gradient(circle at 50% 50%, rgba(78, 130, 238, 0.12) 0%, rgba(155, 114, 207, 0.06) 50%, transparent 70%)`.

- [ ] **Step 3: Update canvas colors in v2/assets/js/v2.js to Gemini spectrum**
Tune canvas pulses to use Gemini's electric blue `#4E82EE` and orchid violet `#9B72CF`:
- Laser scan in `drawProductionAI`: `rgba(78, 130, 238, 0.85)` with shadow `#4E82EE`.
- Orbits in `drawMultiAgent`: `rgba(155, 114, 207, 0.7)` trails with `#4E82EE` head.
- Synaptic brain in `drawNeuroSymbolic`: action potential signals with `#4E82EE` and flares with `#9B72CF`.

- [ ] **Step 4: Commit Task 3 changes**
```bash
git add v2/index.html v2/assets/css/v2.css v2/assets/js/v2.js; git commit -m "feat(v2): implement Gemini-themed focus areas and canvas aurora"
```

---

### Task 4: ChatGPT-Themed Selected Work & Experience (OpenAI)

**Files:**
- Modify: `v2/index.html:205-380`
- Modify: `v2/assets/css/v2.css:715-1150`

**Interfaces:**
- Consumes: `--chatgpt-*` tokens, `--font-mono`
- Produces: ChatGPT Canvas window chrome, OpenAI mint badges, conversation-style experience flow

- [ ] **Step 1: Update Selected Work & Tracxo Flagship in v2/index.html**
Update section:
`<section class="projects-v2-section chatgpt-theme" id="selected-work">`
Header badge:
`<span class="section-label chatgpt-label"><span class="chatgpt-icon">⛶</span> GPT-4o CANVAS & CODE ARTIFACTS</span>`

Wrap Tracxo lead card in an authentic ChatGPT Canvas window chrome:
- Top bar: window buttons (dots), active tab `Tracxo.arch.py`, second tab `Spec.md`.
- Body: OpenAI mint tags (`Multi-Agent`, `FastAPI`, `PostgreSQL`, `Production AI`).
- Code snippet tab view with "Copy" button.

- [ ] **Step 2: Update Experience Section in v2/index.html**
Update section:
`<section class="experience-v2-section chatgpt-theme" id="experience">`
Add subtle ChatGPT user prompt callout:
`<div class="chatgpt-prompt-bubble">"Summarize Amey's technical roles and enterprise impact"</div>`
Followed by the structured timeline as the verified model response.

- [ ] **Step 3: Style ChatGPT elements in v2/assets/css/v2.css**
- Background: `var(--chatgpt-bg)` (`#171717`).
- Card surfaces: `var(--chatgpt-bg-card)` (`#212121`).
- Accent colors: OpenAI mint green `#10a37f`, active border `rgba(16, 163, 127, 0.4)`.
- Code artifact block: background `#111111`, font `--font-mono`, border `1px solid rgba(255, 255, 255, 0.08)`.

- [ ] **Step 4: Commit Task 4 changes**
```bash
git add v2/index.html v2/assets/css/v2.css; git commit -m "feat(v2): implement ChatGPT-themed Canvas projects and experience flow"
```

---

### Task 5: Tri-Model Synthesis Footer & Comprehensive Verification

**Files:**
- Modify: `v2/index.html:500-605`
- Modify: `v2/assets/css/v2.css:1270-1420`
- Create: `test-multi-model-verify.py`

**Interfaces:**
- Consumes: All 3 theme tokens
- Produces: Tri-model synthesis footer, automated screenshot capture

- [ ] **Step 1: Add Tri-Model Telemetry Footer in v2/index.html**
Add a sleek model indicator bar in `.v2-footer-inner`:
```html
<div class="tri-model-telemetry">
  <span class="telemetry-item"><span class="telemetry-dot claude"></span> Claude 3.5 Sonnet</span>
  <span class="telemetry-separator">/</span>
  <span class="telemetry-item"><span class="telemetry-dot gemini"></span> Gemini 1.5 Pro</span>
  <span class="telemetry-separator">/</span>
  <span class="telemetry-item"><span class="telemetry-dot chatgpt"></span> GPT-4o</span>
</div>
```

- [ ] **Step 2: Style Tri-Model Footer & Separator in v2/assets/css/v2.css**
- Top separator: `height: 2px; background: linear-gradient(90deg, #cc785c 0%, #4E82EE 50%, #10a37f 100%);`
- Telemetry dots: `.claude { background: #cc785c; }`, `.gemini { background: #4E82EE; }`, `.chatgpt { background: #10a37f; }`.

- [ ] **Step 3: Run comprehensive verification script**
Write and run `test-multi-model-verify.py` using Chrome Headless CDP to capture:
1. `multi_model_hero_claude.png`
2. `multi_model_focus_gemini.png`
3. `multi_model_work_chatgpt.png`
4. `multi_model_footer_synthesis.png`
5. `multi_model_ai_dock.png` (verifying Ask AI remains strictly bottom-right)

- [ ] **Step 4: Commit Task 5 changes**
```bash
git add v2/index.html v2/assets/css/v2.css; git commit -m "feat(v2): implement tri-model telemetry footer and visual verification"
```
