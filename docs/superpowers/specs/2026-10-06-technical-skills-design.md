# Technical Skills Integration Design Spec (Version 3)

## 1. Overview
Integrate a dedicated "Engineered Stack & Capabilities" matrix into Chapter 02 ("WHAT I DO?") of the Version 3 portfolio dossier (`v3/index.html`). This section showcases Amey's technical competencies across AI systems, machine learning, backend engineering, and cloud infrastructure, directly beneath the 4-stage systems engineering pipeline (Discover → Build → Validate → Deploy).

---

## 2. Goals & Success Criteria
- **Narrative Alignment**: Pairs the "How I build systems" pipeline directly with the tools, libraries, and frameworks used in production.
- **Recruiter Scannability**: Presents key skills in high-contrast, structured pill chips that are immediately legible.
- **Visual Consistency**: Adheres to the Claude-inspired warm dark aesthetic with terracotta orange (`#ff694d`) accents, glassmorphic card surfaces, and subtle interactive glows.
- **Preserved Architecture**: Keeps the 6-chapter HUD scrollytelling structure intact without adding unnecessary navigation bloat.
- **Responsive Layout**: Adapts seamlessly from a 4-column desktop display to a 2x2 tablet grid and a clean 1-column mobile stack.

---

## 3. Structure & Content

### 3.1 Sub-section Header (within Chapter 02)
- **Badge**: `✦ PRODUCTION TOOLKIT`
- **Title**: `Engineered Stack & Capabilities`
- **Description**: *Technologies, frameworks, and infrastructure used to take systems from research into resilient production.*

### 3.2 Four Categorized Glass Cards
1. **01 // AI & LLM Systems**
   - Agentic Workflows
   - Hybrid RAG (BM25 + Dense)
   - LangGraph
   - Google ADK
   - LLM Evaluation
   - Pydantic Schema Validation

2. **02 // Machine Learning & Reasoning**
   - PyTorch
   - Graph Embeddings (RotatE)
   - Knowledge Graphs
   - FlashRank & Reranking
   - ONNX Runtime
   - Transformers

3. **03 // Backend & Data Architecture**
   - Python
   - FastAPI
   - PostgreSQL
   - Supabase
   - Redis
   - Pinecone & Qdrant
   - SQL

4. **04 // Infrastructure & Cloud**
   - Docker
   - Linux / Bash
   - Git & GitHub
   - CI/CD
   - Azure OpenAI & AWS S3

---

## 4. UI & Interaction Design

### 4.1 Card Container (`.skills-matrix-grid`)
- `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;`
- Margin top: `clamp(2.5rem, 4vh, 3.5rem)` following `.sys-architecture-card`.

### 4.2 Individual Card (`.skill-category-card`)
- `background: var(--bg-elevated);`
- `border: 1px solid var(--border-subtle);`
- `border-radius: 14px;`
- `padding: 1.4rem;`
- Transition on hover: border color transitions to `rgba(255, 105, 77, 0.35)`, subtle box-shadow glow `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 16px rgba(255, 105, 77, 0.08)`.

### 4.3 Pill Chips (`.skill-chip`)
- `display: inline-flex; align-items: center;`
- `font-family: var(--font-mono); font-size: 0.74rem;`
- `padding: 0.35rem 0.65rem;`
- `background: rgba(245, 240, 232, 0.04);`
- `border: 1px solid rgba(255, 255, 255, 0.07);`
- `border-radius: 6px;`
- `color: var(--text-secondary);`
- Micro-interaction: On hover, transforms `translateY(-1.5px)`, border illuminates to `rgba(255, 105, 77, 0.45)`, color brightens to `#ffffff`, and subtle terracotta drop shadow.

---

## 5. Responsive Behavior
- **Desktop (>1100px)**: 4 columns in 1 row.
- **Tablet (641px–1100px)**: 2 columns in 2 rows.
- **Mobile (≤640px)**: 1 column stacked.

---

## 6. Implementation Checklist
1. **Markup** (`v3/index.html`):
   - Add `.skills-sub-lead` and `.skills-matrix-grid` inside `#ch-what .chapter-content` directly below `.sys-architecture-card`.
2. **Styling** (`v3/style.css`):
   - Add styling rules for `.skills-sub-lead`, `.skills-lead-badge`, `.skills-sub-title`, `.skills-sub-desc`, `.skills-matrix-grid`, `.skill-category-card`, `.skill-cat-header`, `.skill-chips-wrap`, and `.skill-chip`.
   - Add responsive breakpoints for 2-column and 1-column layouts.
3. **Verification**:
   - Inspect visually in browser at desktop, tablet, and mobile viewport sizes.
   - Confirm hover micro-interactions and contrast.
