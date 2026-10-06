# Spec: Interactive Scrollytelling Portfolio

**Date:** 2026-10-06  
**Target Directory:** `design-lab/scrolly-portfolio/`  
**Author:** Amey Narwadkar & Antigravity  

---

## 1. Objective & Design Philosophy

Build a premier, interactive, cinematic scrollytelling portfolio for an elite **AI / Machine Learning Engineer**. The experience is inspired by high-end Awwwards portfolio architectures (specifically building upon the 60 FPS pinned cinematic viewport engine of `design-lab/concept-01/`).

### Core Tenets
1. **Strict 6-Stage Narrative Order**:
   - `01. Who am I?`
   - `02. What I do?`
   - `03. What I've done?`
   - `04. Where I've worked?`
   - `05. Where I've studied?`
   - `06. Get in Touch.`
2. **Minimal Text**: Zero dense paragraphs. Micro-copy only (1–2 sentences max), coupled with high-impact data callouts (`81%`, `50+`, `<850ms`, `14.8M`).
3. **Maximum Interactivity**:
   - 3D cursor-tracking perspective tilt on cards.
   - Pinned scrollytelling scenes with smooth chapter progression.
   - Interactive tool dispatchers (click queries to watch real-time multi-agent execution pipelines).
   - Animated SVG data flow graphs and dynamic hover highlights.
   - Authentic visual assets (`me.jpg`, `tracxo.png`, `AnyRAG.png`, `Heidelberg.jpg`, `Fergusson.jpg`, `fig_reliability.png`).

---

## 2. Narrative Breakdown & Mechanics

### Chapter 01: Who am I?
- **Identity**:
  - Name: `AMEY NARWADKAR`
  - Discipline: `AI / Machine Learning Engineer`
  - Location: `📍 Heidelberg & Munich, Germany`
  - Ethos Statement: *"Bridging theoretical research into resilient production reality."*
- **Visuals & Interactivity**:
  - Authentic photo `images/me.jpg` framed in an interactive 3D perspective mouse-tilt card with dynamic specular highlight and ambient glow.
  - Interactive pill tags with hover micro-reveals: `Autonomous Multi-Agent`, `Graph ML & Horn Rules`, `Production RAG Infrastructure`.
  - Ambient particle background canvas (`ambient-canvas`) responding to cursor proximity.
  - Scroll cue prompt guiding user to scroll down.

### Chapter 02: What I do?
- **Core Engineering Pillars** (4 concise modules):
  1. `Multi-Agent Orchestration`: Cyclical state machines, human-in-the-loop review, verified tool routing (`LangGraph`, `Python`, `AsyncIO`).
  2. `High-Throughput LLM Infrastructure`: Streaming inference, token budgeting, PagedAttention, JSON schema guarantees (`vLLM`, `Azure OpenAI`, `Pydantic`).
  3. `Knowledge Graphs & Hybrid RAG`: Neuro-symbolic link prediction, RotatE embeddings, reciprocal rank fusion (`pgvector`, `PyKEEN`, `AnyBURL`).
  4. `Production Reliability & Evaluation`: Synthetic data validation pipelines, automated regression suites (`FastAPI`, `PostgreSQL`, `Docker`).
- **Visuals & Interactivity**:
  - Interactive 4-node architectural flow canvas. Hovering over each pillar pulses animated data packets along connected SVG paths.
  - Minimal metric badges with animated hover glow (`<850ms P95`, `100% Schema Valid`, `14.8M Triples`).

### Chapter 03: What I've done?
- **Flagship Projects**:
  1. **Tracxo Operational Intelligence** (`images/tracxo.png`):
     - Headline: `TRACXO INTELLIGENCE`
     - Subtitle: Autonomous restaurant operations platform.
     - Key Metrics: `50+ Restaurant Groups` · `16 Atomic Agents` · `WhatsApp → SQL`
     - **Interactive Tool Dispatcher**: Clickable WhatsApp query pills (e.g. *"Reconcile yesterday's seafood invoices"*) that trigger an animated 3-tier execution flow (*01. Parse* → *02. Audit* → *03. Decision*).
  2. **9-Node Agentic RAG Engine** (`images/agenticrag_thumbnail.png`):
     - Headline: `SELF-CORRECTIVE RAG`
     - Subtitle: Reciprocal rank fusion and hallucination verification.
     - Key Metrics: `BM25 + Dense Vectors` · `Automated Self-Critique` · `Zero False Citations`
     - **Interactive Diagram**: Hoverable architecture nodes revealing latency budgets and query rewrite states.
  3. **Multi-Agent Deep Reinforcement Learning**:
     - Headline: `COMPETITIVE REINFORCEMENT LEARNING`
     - Subtitle: Spatial Deep Q-Networks for multi-agent game environments.
     - Key Metrics: `Deep Q-Networks` · `Spatial State Representation` · `Multi-Agent`
     - **Interactive Mini-Canvas**: Live visual path simulation of competing agents.

### Chapter 04: Where I've worked?
- **Industry Experience**:
  1. **NEC Laboratories Europe** (`Software Developer AI/ML — Working Student · May 2025 – Present`):
     - Focus: Synthetic data generation pipeline for clinical/scientific data.
     - Key Metrics: `+81% Quality Loss Reduction` · `2.4× Lower Error` · `100% Structured Output Parse`
     - **Interactive Pipeline Modal**: Click to expand the 6-stage verification architecture with research chart (`images/fig_reliability.png`).
  2. **Tracxo** (`Co-Founder & AI Systems Lead · 2024 – Present`):
     - Focus: Multi-tenant production agent runtime, PostgreSQL schema, restaurant operational analytics.
- **Visuals & Interactivity**:
  - Horizontal timeline track with scroll-triggered counter animations for numbers and percentages.

### Chapter 05: Where I've studied?
- **Academic Foundation & Research**:
  1. **Heidelberg University** (`images/Heidelberg.jpg`):
     - Degree: `M.Sc. Scientific Computing`
     - Master's Thesis: *Neuro-Symbolic Knowledge Graph Link Prediction* (RotatE + AnyBURL Horn rules across 14.8M+ triples, `images/fig_tradeoff.png`).
     - **Interactive Formula Widget**: Hover card that visualizes inductive Horn-rule logical paths (`r1(X, Y) ∧ r2(Y, Z) ⇒ r3(X, Z)`).
  2. **Fergusson College / SPPU** (`images/Fergusson.jpg`):
     - Degree: `B.Sc. Computer Science` (Algorithms, Distributed Systems, Mathematics).

### Chapter 06: Get in Touch.
- **Transmission Console**:
  - Live availability indicator: `● AVAILABLE FOR AI/ML SYSTEMS ROLES · HEIDELBERG [CET]`
  - One-click copy email button with feedback toast (`ameynarwadkar@gmail.com`).
  - Interactive magnetic social buttons: `GitHub`, `LinkedIn`, `Google Scholar`.
  - Direct PDF CV download link: `CV_Amey-Narwadkar.pdf`.
  - Smooth "Return to Top" scroll launcher.

---

## 3. Technology Stack & Assets

- **Framework**: HTML5, Vanilla CSS3 (Custom design system with CSS custom properties, flex/grid, 3D transform perspectives), Vanilla Modern JavaScript (ES6+).
- **Typography**: `Plus Jakarta Sans` (Display/Headings), `Space Grotesk` (Sub-headlines), `JetBrains Mono` (Technical labels/metrics).
- **Visual Assets**:
  - Photos: `../../images/me.jpg`, `../../images/Heidelberg.jpg`, `../../images/Fergusson.jpg`
  - Diagrams & Thumbnails: `../../images/tracxo.png`, `../../images/agenticrag_thumbnail.png`, `../../images/fig_reliability.png`, `../../images/fig_tradeoff.png`
- **Location**: Standalone inside `design-lab/scrolly-portfolio/` (leaving root `/` and `/v2/` 100% untouched).
