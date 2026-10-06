# Chapter 02: "What I Do?" Integrated System Architecture Pipeline Design Spec

## Context & Objectives
The user requested replacing the current 4-pillar grid in Chapter 02 (**What I Do?**) with the provided **Integrated System Architecture (System View)** diagram.
Key constraints:
1. Clean, minimal, cyber-minimalist HUD aesthetics matching Portfolio V3.
2. Subtle, continuous animations: data packet pulse along connectors, breathing knowledge graph nodes, glowing inference stacks, and interactive hover states.
3. Perfect 100vh viewport centering without vertical overflow.

---

## Architecture & Layout

### 1. Typography & Header (`v3/index.html`)
- **System View Tag:** `<div class="sys-badge"><span class="sys-badge-num">3</span><span class="sys-badge-label">Integrated Architecture (System View)</span></div>`
- **Main Headline:** `I take <span class="accent-orange">ideas</span> to <span class="accent-purple">production</span>.`
- **Subtitle:** `End-to-end AI systems: agents, knowledge, infrastructure, and reliability.`

### 2. Architecture Canvas (`.sys-architecture-canvas`)
A unified glassmorphic card (`max-width: 1140px`, height ~460–500px):
- **Horizontal Pipeline Layout**:
  1. **Users (Input):**
     - Pill inputs: `Chat` (SVG chat icon), `API` (SVG terminal icon), `Batch` (SVG stack icon).
  2. **Connector Arrow** with animated traveling light pulse (`.pulse-arrow`).
  3. **Agent Orchestration (Stage 1 — Orange):**
     - Title: `Agent Orchestration`
     - Clean SVG isometric 3-layer neural agent stack with subtle breathing amber glow.
  4. **Connector Arrow** (`.pulse-arrow`).
  5. **Tools & Integrations (Stage 2 — Indigo):**
     - Title: `Tools & Integrations`
     - 2×2 micro-grid: Web Search (`🔍`), Vector Query (`🔎`), Code Sandbox (`</>`), Database (`🗄️`).
  6. **Connector Arrow** (`.pulse-arrow`).
  7. **Knowledge Graphs & RAG (Stage 3 — Purple):**
     - Title: `Knowledge Graphs & RAG`
     - SVG constellation of interconnected nodes with floating link pulses.
  8. **Connector Arrow** (`.pulse-arrow`).
  9. **LLM Infrastructure (Stage 4 — Cyan):**
     - Title: `LLM Infrastructure`
     - Layered high-throughput inference server stack icon with cyan glow.
  10. **Connector Arrow** (`.pulse-arrow`).
  11. **Evaluation & Guardrails (Stage 5 — Green):**
      - Title: `Evaluation & Guardrails`
      - 3 glowing checklist items with animated green ticks (`✓`).
  12. **Connector Arrow** (`.pulse-arrow`).
  13. **Production (Outputs):**
      - Output targets: `API` (terminal), `Database` (db), `Monitoring` (pulse chart).

### 3. Four-Phase System Taxonomy (Bottom Bracket Rail)
Four styled bracket zones below the nodes:
- **`I DESIGN`** (Orange) — *problem and solution* (under Users & Agent Orchestration)
- **`I BUILD`** (Purple) — *intelligence and systems* (under Tools, KG & RAG, LLM Infra)
- **`I VERIFY`** (Green) — *reliability and quality* (under Evaluation & Guardrails)
- **`I DEPLOY`** (Cyan) — *to real users* (under Production)

### 4. Animations & Micro-Interactions (`v3/style.css`, `v3/main.js`)
- **Data Flow Pulse (`@keyframes packet-travel`):** Glowing energy particles continuously travel across the connector arrows from left to right.
- **Node Breathing:** The Knowledge Graph nodes and Agent Orchestration server layers have gentle out-of-sync breathing animations.
- **Interactive State:** Hovering over any pipeline block highlights that block, intensifies its glowing border and shadow, and illuminates its corresponding bottom phase bracket.

---

## Verification Plan
1. Automated CDP test verifying markup rendering of all 7 pipeline blocks and 4 phase brackets.
2. Automated CDP test verifying 100vh height fit and centering in Chapter 02.
3. Visual screenshot capture of Chapter 02 verifying minimal design, clean alignment, and running animations.
