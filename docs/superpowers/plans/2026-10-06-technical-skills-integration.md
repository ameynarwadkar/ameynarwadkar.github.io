# Technical Skills Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a categorized 4-column "Engineered Stack & Capabilities" matrix into Chapter 02 ("WHAT I DO?") of Version 3 portfolio dossier (`v3/index.html`), directly following the 4-stage architecture pipeline.

**Architecture:** Add a dedicated sub-section lead and a 4-card CSS grid in `v3/index.html` inside `#ch-what .chapter-content`. Style with elevated glass surfaces, subtle terracotta borders, and interactive monospace pill chips in `v3/style.css`.

**Tech Stack:** HTML5, Vanilla CSS3 (Custom Properties, CSS Grid, Flexbox), Vanilla JavaScript.

## Global Constraints
- Target Document: `v3/index.html` and `v3/style.css`.
- Preserve the 6-chapter HUD scrollytelling architecture and navigation IDs.
- Follow the Claude-inspired warm dark aesthetic with terracotta orange (`#ff694d`, `rgba(255, 105, 77, ...)`) accents.
- Responsive breakpoints: 4 columns (>1100px), 2 columns (641px–1100px), 1 column (≤640px).

---

### Task 1: Add Technical Skills Matrix Markup to Chapter 02

**Files:**
- Modify: `v3/index.html:465-475`

**Interfaces:**
- Produces: `.skills-sub-lead`, `.skills-matrix-grid`, `.skill-category-card`, `.skill-chip` elements in `#ch-what`.

- [ ] **Step 1: Locate the insertion point in `v3/index.html`**
Directly after line 469 (`</div></div>` closing `.sys-architecture-card` and `.pipeline-track`) and before line 470 (`</div></section>` closing `.chapter-content` and `#ch-what`).

- [ ] **Step 2: Add the markup for the sub-lead and the 4 categorized cards**
Add:
```html
        <!-- Chapter 02 Sub-section: Engineered Stack & Capabilities -->
        <div class="skills-sub-lead">
          <div class="skills-lead-badge">
            <span class="skills-badge-dot"></span>
            <span>PRODUCTION TOOLKIT</span>
          </div>
          <h3 class="skills-sub-title">Engineered Stack &amp; Capabilities</h3>
          <p class="skills-sub-desc">
            Technologies, frameworks, and infrastructure used to take systems from research into resilient production.
          </p>
        </div>

        <div class="skills-matrix-grid">
          <!-- Card 1: AI & LLM Systems -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <span class="skill-cat-idx">01 // AI &amp; LLM SYSTEMS</span>
              <h4 class="skill-cat-title">Agentic &amp; Reasoning</h4>
            </div>
            <div class="skill-chips-wrap">
              <span class="skill-chip">Agentic Workflows</span>
              <span class="skill-chip">Hybrid RAG (BM25 + Dense)</span>
              <span class="skill-chip">LangGraph</span>
              <span class="skill-chip">Google ADK</span>
              <span class="skill-chip">LLM Evaluation</span>
              <span class="skill-chip">Pydantic Schema Validation</span>
            </div>
          </div>

          <!-- Card 2: Machine Learning & Reasoning -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <span class="skill-cat-idx">02 // MACHINE LEARNING</span>
              <h4 class="skill-cat-title">Models &amp; Representations</h4>
            </div>
            <div class="skill-chips-wrap">
              <span class="skill-chip">PyTorch</span>
              <span class="skill-chip">Graph Embeddings (RotatE)</span>
              <span class="skill-chip">Knowledge Graphs</span>
              <span class="skill-chip">FlashRank &amp; Reranking</span>
              <span class="skill-chip">ONNX Runtime</span>
              <span class="skill-chip">Transformers</span>
            </div>
          </div>

          <!-- Card 3: Backend & Data Architecture -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <span class="skill-cat-idx">03 // BACKEND &amp; DATA</span>
              <h4 class="skill-cat-title">Services &amp; Storage</h4>
            </div>
            <div class="skill-chips-wrap">
              <span class="skill-chip">Python</span>
              <span class="skill-chip">FastAPI</span>
              <span class="skill-chip">PostgreSQL</span>
              <span class="skill-chip">Supabase</span>
              <span class="skill-chip">Redis</span>
              <span class="skill-chip">Pinecone &amp; Qdrant</span>
              <span class="skill-chip">SQL</span>
            </div>
          </div>

          <!-- Card 4: Infrastructure & Cloud -->
          <div class="skill-category-card">
            <div class="skill-cat-header">
              <span class="skill-cat-idx">04 // INFRASTRUCTURE</span>
              <h4 class="skill-cat-title">Platform &amp; Delivery</h4>
            </div>
            <div class="skill-chips-wrap">
              <span class="skill-chip">Docker</span>
              <span class="skill-chip">Linux / Bash</span>
              <span class="skill-chip">Git &amp; GitHub</span>
              <span class="skill-chip">CI/CD</span>
              <span class="skill-chip">Azure OpenAI &amp; AWS S3</span>
            </div>
          </div>
        </div>
```

- [ ] **Step 3: Verify served HTML**
Run: `curl.exe -s http://localhost:8085/v3/ | Select-String -Pattern "skills-matrix-grid"`
Expected: match found.

- [ ] **Step 4: Commit**
```bash
git add v3/index.html
git commit -m "feat(v3): add technical skills matrix markup to chapter 02"
```

---

### Task 2: Implement Technical Skills Styles and Responsive Rules

**Files:**
- Modify: `v3/style.css`

**Interfaces:**
- Consumes: Markup classes from Task 1.

- [ ] **Step 1: Add CSS rules for the skills matrix in `v3/style.css`**
Add styles:
```css
/* ==========================================================================
   CHAPTER 02 SUB-SECTION: ENGINEERED STACK & CAPABILITIES
   ========================================================================== */
.skills-sub-lead {
  margin-top: clamp(3.5rem, 6vh, 5rem);
  margin-bottom: 1.75rem;
}

.skills-lead-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--accent-primary);
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}

.skills-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 6px var(--accent-glow);
}

.skills-sub-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 1.85rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0;
}

.skills-sub-desc {
  font-family: var(--font-sub);
  font-size: clamp(0.88rem, 1.1vw, 0.96rem);
  color: var(--text-secondary);
  max-width: 620px;
  margin-top: 0.35rem;
  line-height: 1.45;
}

.skills-matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.skill-category-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.skill-category-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 105, 77, 0.35);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 105, 77, 0.1);
}

.skill-cat-header {
  margin-bottom: 1.15rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(255, 105, 77, 0.18);
}

.skill-cat-idx {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--accent-primary);
  margin-bottom: 0.25rem;
}

.skill-cat-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.skill-chips-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: rgba(245, 240, 232, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 0.32rem 0.6rem;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.skill-chip:hover {
  transform: translateY(-1.5px);
  color: #ffffff;
  background: rgba(255, 105, 77, 0.1);
  border-color: rgba(255, 105, 77, 0.45);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 105, 77, 0.15);
}

@media (max-width: 1100px) {
  .skills-matrix-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.1rem;
  }
}

@media (max-width: 640px) {
  .skills-matrix-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add v3/style.css
git commit -m "style(v3): style technical skills matrix in chapter 02"
```

---

### Task 3: Verification & Visual Inspection

**Files:**
- Inspect: `http://localhost:8085/v3/#ch-what`

- [ ] **Step 1: Check browser rendering via automated inspection**
Navigate to `http://localhost:8085/v3/#ch-what` and capture full section screenshot.

- [ ] **Step 2: Confirm alignment and transitions**
Confirm:
1. 4 cards are aligned in 1 row on desktop.
2. Hovering chips highlights them with terracotta glow and lift.
3. Smooth transition to Chapter 03 Selected Works below.

- [ ] **Step 3: Final Git status check**
Verify all working files clean and committed.
