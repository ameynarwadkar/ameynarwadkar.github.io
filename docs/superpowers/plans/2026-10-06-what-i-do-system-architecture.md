# Chapter 02 System Architecture Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Chapter 02 (**What I Do?**) into the sleek, minimal, and animated **Integrated System Architecture (System View)** pipeline card with 4-phase taxonomy brackets.

**Architecture:**
- Clean semantic HTML in `v3/index.html` featuring the 7 pipeline stages (`Users`, `Agent Orchestration`, `Tools & Integrations`, `Knowledge Graphs & RAG`, `LLM Infrastructure`, `Evaluation & Guardrails`, `Production`) and the 4 bottom phase brackets (`I DESIGN`, `I BUILD`, `I VERIFY`, `I DEPLOY`).
- Vanilla CSS in `v3/style.css` using modern flexbox/grid, CSS custom properties, animated SVG data packets, and glowing hover transitions.
- Vanilla JS controller in `v3/main.js` (`initArchitecturePipeline()`) syncing stage interactions with phase brackets.

**Tech Stack:** Vanilla HTML5, Vanilla CSS3 (Keyframe animations, CSS variables, glassmorphism), Vanilla JavaScript, Headless Edge CDP automated test scripts.

## Global Constraints
- Clean, minimal, cyber-minimalist dark aesthetics with high contrast and refined typography.
- Continuous, silky animations (traveling data pulses, breathing neural nodes, subtle glow).
- Perfect 100vh viewport centering without vertical scrolling.

---

### Task 1: Markup Integration for System Architecture Pipeline

**Files:**
- Modify: `v3/index.html:175-290`
- Test: `scratch/test_arch_task1.js`

**Interfaces:**
- Produces: `.sys-architecture-card`, `.pipeline-track`, 7 stage nodes with connector arrows, and 4 phase brackets.

- [x] **Step 1: Write test script checking for existence of all 7 pipeline stages and 4 phase brackets**
- [x] **Step 2: Run test script to verify it fails initially**
- [x] **Step 3: Update `v3/index.html` Chapter 02 markup with the integrated architecture pipeline**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 1 changes**

---

### Task 2: Architecture Pipeline Styling & Animations

**Files:**
- Modify: `v3/style.css`
- Test: `scratch/test_arch_task2.js`

**Interfaces:**
- Produces: Minimal glassmorphic container styles, stage cards with custom theme colors, animated connector packet flows, and bracket rails.

- [x] **Step 1: Write test script verifying card height <= 580px, layout alignment, and packet-travel animation**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Add CSS for architecture card, nodes, connectors, and keyframe animations in `v3/style.css`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 2 changes**

---

### Task 3: Interactive Stage & Bracket Controller

**Files:**
- Modify: `v3/main.js`
- Test: `scratch/test_arch_task3.js`

**Interfaces:**
- Produces: `initArchitecturePipeline()` handling hover states that light up corresponding phase brackets and stage highlights.

- [x] **Step 1: Write test script simulating hover on pipeline stages and verifying active classes**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Implement `initArchitecturePipeline()` in `v3/main.js` and register in `DOMContentLoaded`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 3 changes**

---

### Task 4: End-to-End Verification & Visual Screenshot Confirmation

**Files:**
- Test: `scratch/verify_arch_e2e.js`

**Interfaces:**
- Validates: Full flow, animations, 100vh centering, and captures visual screenshots.

- [x] **Step 1: Write and run comprehensive E2E test script**
- [x] **Step 2: Review captured visual screenshot of Chapter 02**
- [x] **Step 3: Commit final plan verification and cleanup**
