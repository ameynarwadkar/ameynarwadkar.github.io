# Technical Skills Integration Design Spec (Version 3) — Option 3: Layered Architecture

## 1. Overview
Integrate the high-visual-impact "Option 3 — Layered Architecture Style" (Production Toolkit: Engineering Stack & Capabilities) into Chapter 02 ("WHAT I DO?") of the Version 3 portfolio dossier (`v3/index.html`).

This component frames Amey's technical competencies as an end-to-end engineered lifecycle:
1. **01 AI & LLM Systems** (Agentic workflows, LLM integration and evaluation)
2. **02 Models & Representations** (Model training, embeddings, knowledge graphs and search)
3. **03 Services & Data** (APIs, datastores, and data infrastructure)
4. **04 Infrastructure & Delivery** (Deployment, monitoring and iteration)

---

## 2. Visual Architecture & Layout
- **Unified Outer Card Container (`.eng-stack-card`)**:
  - Deep dark elevated surface (`background: rgba(12, 11, 17, 0.88)` with `backdrop-filter: blur(20px)`).
  - Subtle terracotta border (`border: 1px solid rgba(255, 105, 77, 0.16)`).
  - Rounded corners (`border-radius: 24px`).
  - Outer ambient shadow with top subtle orange rim highlight.

- **Header Section (`.eng-stack-header`)**:
  - Badge: `● PRODUCTION TOOLKIT` in terracotta orange monospace tracking.
  - Title: `Engineering Stack & Capabilities` (large, bold display typography).
  - Subtitle: `The tools and infrastructure that power my work — from research to real-world systems.`

- **4 Pipeline Columns (`.eng-stack-pipeline`)**:
  - Horizontal 4-stage pipeline layout with connecting directional flow arrows (`--->`).
  - Each stage features:
    - Stage Number & Title (`01 AI & LLM Systems`, etc.)
    - Concise scope descriptor
    - Architectural 3D isometric wireframe SVG diagram glowing in terracotta orange
    - Elevated dark pill card container holding 5 stack items with authentic colored brand logos

---

## 3. Technology Stack Breakdown (20 Technologies)
1. **AI & LLM Systems**:
   - LangGraph
   - Google ADK
   - Pydantic
   - OpenAI
   - Anthropic
2. **Models & Representations**:
   - PyTorch
   - Transformers
   - Knowledge Graphs
   - FlashRank
   - ONNX
3. **Services & Data**:
   - Python
   - FastAPI
   - PostgreSQL
   - Supabase
   - Redis
4. **Infrastructure & Delivery**:
   - Docker
   - Linux
   - Git & GitHub
   - CI/CD
   - AWS S3

---

## 4. Responsive Behavior
- **Desktop (>1150px)**: 4 columns in 1 unified pipeline row with connecting flow arrows.
- **Tablet (720px–1150px)**: 2x2 grid with adaptive flow.
- **Mobile (≤720px)**: 1 column vertical stack with centered cards.
