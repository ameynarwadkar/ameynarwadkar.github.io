# Scrollytelling Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, highly interactive 6-chapter scrollytelling portfolio for Amey Narwadkar with minimal text, rich visual assets, and dynamic micro-interactions inside `design-lab/scrolly-portfolio/`.

**Architecture:** A pinned viewport cinematic narrative engine driven by modern CSS sticky positioning and vanilla JavaScript scroll progress tracking. It features an interactive ambient canvas, 3D perspective mouse-tilt cards, an interactive WhatsApp tool-dispatcher simulator, animated SVG data flow graphs, and real repository visual assets.

**Tech Stack:** HTML5, Modern Vanilla CSS3 (3D transforms, CSS custom properties, grid/flexbox), Vanilla JavaScript (ES6+, Canvas API, IntersectionObserver, requestAnimationFrame).

## Global Constraints
- Target location: `design-lab/scrolly-portfolio/` (Never modify `/` or `/v2/`).
- Strictly adhere to the 6-stage narrative order:
  1. *Who am I?*
  2. *What I do?*
  3. *What I've done?*
  4. *Where I've worked?*
  5. *Where I've studied?*
  6. *Get in Touch.*
- Minimal text: Short punchy phrases (1–2 sentences max) + metric callouts (`81%`, `50+`, `<850ms`, `14.8M`).
- Real assets from repository: `me.jpg`, `tracxo.png`, `agenticrag_thumbnail.png`, `Heidelberg.jpg`, `Fergusson.jpg`, `fig_reliability.png`, `fig_tradeoff.png`.

---

### Task 1: Scaffolding, Base Layout & Persistent HUD

**Files:**
- Create: `design-lab/scrolly-portfolio/index.html`
- Create: `design-lab/scrolly-portfolio/style.css`
- Create: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Create index.html skeleton**
Set up HTML document with Google Fonts (`Plus Jakarta Sans`, `Space Grotesk`, `JetBrains Mono`), top switcher bar, ambient canvas element, persistent vertical HUD indicator track with 6 chapter indices, and 6 empty section containers with semantic IDs.

- [ ] **Step 2: Create base CSS stylesheet in style.css**
Implement CSS tokens for dark cinematic theme (`#08080a` canvas, `#ff4421` brand accent, `#51f2f1` cyan data accent, `#c4b5fd` purple accent), persistent HUD styling with active thumb indicator, responsive container boundaries, and 60 FPS hardware acceleration helpers.

- [ ] **Step 3: Implement scroll progress and HUD synchronization in main.js**
Initialize ambient background canvas particles, setup `IntersectionObserver` and scroll listener to update `#hud-scroll-progress` height and set `.active` state on corresponding HUD indices as chapters scroll into view.

- [ ] **Step 4: Verify scaffolding in dev server**
Verify `http://localhost:8085/design-lab/scrolly-portfolio/` loads without console errors and HUD indicator responds to scroll.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): scaffold index, style, and HUD tracker"
```

---

### Task 2: Chapter 01 — Who am I? (Cinematic Hero & 3D Tilt Card)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 01 structure in index.html**
Add monument headline `AMEY NARWADKAR`, discipline subtitle `AI / Machine Learning Engineer`, location badge `📍 Heidelberg & Munich, Germany`, and micro-bio statement. Add the 3D photo frame with `../../images/me.jpg` and personal engineering pill tags.

- [ ] **Step 2: Style Chapter 01 and 3D card in style.css**
Define monumental display typography (`clamp(3.5rem, 8vw, 7.5rem)`), glowing badge rings, and 3D perspective card container (`perspective: 1000px`, `transform-style: preserve-3d`).

- [ ] **Step 3: Implement 3D mouse-tilt interaction in main.js**
Add cursor tracking listener to the photo card calculating rotation (`rotateX`, `rotateY`) and moving a dynamic radial gradient specular sheen layer across the card on hover.

- [ ] **Step 4: Verify Chapter 01 visual fidelity**
Check card hover response and responsive layout on mobile/desktop.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 01 Who am I with 3D tilt photo"
```

---

### Task 3: Chapter 02 — What I do? (Interactive Systems Flow & Capabilities)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 02 in index.html**
Add the 4 core engineering pillars:
1. `Multi-Agent Orchestration` (LangGraph, Cyclical State Machines)
2. `High-Throughput LLM Infrastructure` (vLLM, Streaming, JSON Schemas)
3. `Knowledge Graphs & Hybrid RAG` (Neuro-Symbolic, pgvector, RotatE)
4. `Production Reliability & Evaluation` (Synthetic Data Pipelines, Evals)
Include interactive SVG flow connector canvas and minimal metric callouts (`<850ms`, `100% Valid`, `14.8M Triples`).

- [ ] **Step 2: Style engineering pillar cards in style.css**
Implement grid layout with glassmorphic cards, accent borders on hover, tech tag pills, and SVG stroke dash animations.

- [ ] **Step 3: Implement interactive node pulse in main.js**
When the user hovers over any pillar card, light up the corresponding SVG connector path and emit animated traveling light pulses between connected system nodes.

- [ ] **Step 4: Verify Chapter 02 interactivity**
Verify hover pulses, SVG connector rendering, and metric badge styling.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 02 What I do with interactive node flows"
```

---

### Task 4: Chapter 03 — What I've done? (Flagship Showcase & Interactive Tool Dispatcher)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 03 in index.html**
Add 3 flagship build sections:
1. **Tracxo Intelligence**: Image `../../images/tracxo.png`, metrics (`50+ Restos`, `16 Atomic Agents`, `WhatsApp → SQL`), and interactive tool dispatcher simulator with query pill buttons.
2. **9-Node Agentic RAG**: Image `../../images/agenticrag_thumbnail.png`, metrics (`BM25 + Dense`, `Self-Critique`, `Zero Hallucinations`), and hoverable architecture inspector nodes.
3. **Multi-Agent Deep RL**: Competitive game environment with Deep Q-Networks and mini interactive canvas.

- [ ] **Step 2: Style project cards and simulator in style.css**
Implement split preview layout, terminal output box for Tracxo dispatcher, and glowing interactive pills.

- [ ] **Step 3: Implement interactive Tracxo simulator and RL canvas in main.js**
Add click listener on query pills (`"Reconcile yesterday's seafood invoices"`, `"Audit bar inventory variance"`) that animates terminal output through the 3-step pipeline (*01. Parse* → *02. Dispatch* → *03. Decision*). Initialize lightweight 2D agent path animation on the RL canvas.

- [ ] **Step 4: Verify simulator and project cards**
Click simulator pills, verify sequential step animations and responsive media sizing.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 03 What I've done with Tracxo simulator"
```

---

### Task 5: Chapter 04 — Where I've worked? (Industry Experience & Animated Metrics)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 04 in index.html**
Add experience timeline:
1. **NEC Laboratories Europe** (`Software Developer AI/ML — Working Student · May 2025 – Present`) with metrics `+81%`, `2.4×`, `100%`, and expandable pipeline modal link.
2. **Tracxo** (`Co-Founder & AI Systems Lead · 2024 – Present`) with production architecture tags and metrics.
Include expandable lightbox modal with research plot `../../images/fig_reliability.png`.

- [ ] **Step 2: Style timeline cards and metrics in style.css**
Style company headers, role badges, high-contrast metric callouts, and clean lightbox modal for the verification chart.

- [ ] **Step 3: Implement count-up animation and lightbox in main.js**
Use `IntersectionObserver` to trigger smooth number count-up animations for `81%` and `2.4×` when the section scrolls into view. Add modal open/close handlers for the research plot.

- [ ] **Step 4: Verify count-up animations and modal trigger**
Scroll into view and verify numbers count up smoothly. Open and close modal.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 04 Where I've worked with metric counters"
```

---

### Task 6: Chapter 05 — Where I've studied? (Academic Grounding & Research Widget)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 05 in index.html**
Add two education cards:
1. **Heidelberg University**: Image `../../images/Heidelberg.jpg`, `M.Sc. Scientific Computing`, Master's Thesis (*Neuro-Symbolic Knowledge Graph Link Prediction* over 14.8M triples), and interactive Horn-rule formula widget with research plot `../../images/fig_tradeoff.png`.
2. **Fergusson College / SPPU**: Image `../../images/Fergusson.jpg`, `B.Sc. Computer Science`.

- [ ] **Step 2: Style university cards and formula widget in style.css**
Design side-by-side or stacked visual cards with university image banners, thesis rule cards with syntax highlighting, and hover glow effects.

- [ ] **Step 3: Implement Horn-rule interactive hover logic in main.js**
Hovering the rule formula highlights corresponding node triples and reveals confidence scores.

- [ ] **Step 4: Verify education cards and thesis widget**
Verify images render cleanly and hover formulas interact smoothly.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 05 Where I've studied with campus cards"
```

---

### Task 7: Chapter 06 — Get in Touch. (Terminal Console & Quick Actions)

**Files:**
- Modify: `design-lab/scrolly-portfolio/index.html`
- Modify: `design-lab/scrolly-portfolio/style.css`
- Modify: `design-lab/scrolly-portfolio/main.js`

- [ ] **Step 1: Markup Chapter 06 in index.html**
Add connection console:
- Live status badge: `● OPEN FOR AI/ML SYSTEMS ROLES · HEIDELBERG [CET]`
- Direct email action with one-click copy button (`ameynarwadkar@gmail.com`)
- Social action chips: `GitHub`, `LinkedIn`, `Google Scholar`
- Direct CV PDF download button
- Smooth "Return to Top" button

- [ ] **Step 2: Style terminal console and buttons in style.css**
Style sleek cyber-minimalist console with glowing status dot, copy feedback toast message, and magnetic hover transitions.

- [ ] **Step 3: Implement clipboard copy and smooth scroll in main.js**
Add `navigator.clipboard.writeText` copy handler with transient "COPIED TO CLIPBOARD" toast notification. Wire "Return to Top" button to `window.scrollTo({top: 0, behavior: 'smooth'})`.

- [ ] **Step 4: Verify copy interaction and return-to-top**
Click copy button and confirm clipboard toast. Click return to top and verify smooth scroll.

- [ ] **Step 5: Commit**
```bash
git add design-lab/scrolly-portfolio/
git commit -m "feat(scrolly): implement Chapter 06 Get in Touch with clipboard actions"
```

---

### Task 8: Verification, Hub Integration & Visual Capture

**Files:**
- Modify: `design-lab/index.html`
- Create: `C:\Users\Amey\.gemini\antigravity-ide\brain\a63a49fc-43e4-41c8-b756-45fde396608f\scratch\snap_scrolly_portfolio.py`

- [ ] **Step 1: Add scrolly-portfolio showcase card in design-lab/index.html**
Add a featured card in the Design Lab hub linking to `scrolly-portfolio/`.

- [ ] **Step 2: Capture screenshots of all 6 chapters**
Run headless Chrome capture script across each section (`scrolly_ch1_who.png`, `scrolly_ch2_what.png`, `scrolly_ch3_done.png`, `scrolly_ch4_worked.png`, `scrolly_ch5_studied.png`, `scrolly_ch6_contact.png`).

- [ ] **Step 3: Inspect visual artifacts for quality check**
Confirm high-contrast typography, image rendering, interactive simulator styling, and layout fidelity.

- [ ] **Step 4: Commit**
```bash
git add design-lab/index.html
git commit -m "feat(hub): link scrolly-portfolio in design-lab hub"
```
