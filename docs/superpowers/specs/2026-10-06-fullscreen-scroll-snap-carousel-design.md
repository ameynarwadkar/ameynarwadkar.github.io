# Design Specification: Full-Screen Section Snapping with Chapter 03 Carousel

- **Date:** 2026-10-06
- **Status:** Approved
- **Scope:** Portfolio V3 (`v3/index.html`, `v3/style.css`, `v3/main.js`)

---

## 1. Problem Statement
The Portfolio V3 interface features six sequential chapters intended as an immersive, narrative scrollytelling experience. Currently, sections have unconstrained variable heights and vertical scrolling does not snap or fit to the screen, allowing users to stop in awkward mid-section offsets. Furthermore, Chapter 03 ("What I've Done") contains three extensive project dossiers totaling ~1,500px in vertical height, which spans nearly two viewports and prevents straightforward full-screen presentation.

---

## 2. Goals & Success Criteria
1. **Full-Screen Section Fit:** Every chapter (01 to 06) fits neatly within `100vh` / `100dvh` without unwanted overflow or clipping on standard desktop screens (>=768px height).
2. **Mandatory Native Scroll Snapping:** Scrolling vertically advances the page chapter-by-chapter with crisp `scroll-snap-type: y mandatory`, eliminating awkward partial-scroll positions.
3. **Chapter 03 Project Carousel:** Chapter 03 converts the vertical stack of three project dossiers into a horizontal, trackpad- and button-navigable slide carousel (`overflow-x: auto; scroll-snap-type: x mandatory`).
4. **HUD Synchronization:** The left fixed navigation HUD (`01` through `06`) transitions immediately and accurately upon snapping to each chapter, and clicking any HUD link smoothly snaps directly to that section.
5. **Mobile & Low-Height Resilience:** Gracefully falls back on mobile viewports (<960px width) or constrained heights (<650px) to allow natural internal scrolling without clipping.

---

## 3. Architecture & Component Design

### 3.1 Vertical Snap Container (`html, body, .scrolly-main`)
- `html, body`:
  - `scroll-snap-type: y mandatory;`
  - `scroll-behavior: smooth;`
- `.chapter-screen`:
  - `height: 100vh;`
  - `height: 100dvh;`
  - `scroll-snap-align: start;`
  - `scroll-snap-stop: always;`
  - `display: flex; flex-direction: column; justify-content: center;`
  - Reduced padding: `padding: clamp(1.2rem, 3.5vh, 2.5rem) 0;` (replacing the previous static `6rem 0` padding).
  - Compact header leads: `margin-bottom: clamp(1rem, 2.5vh, 2rem);`

### 3.2 Chapter Content Scaling
- **Chapter 01 (`ch-who`):** Already ~480px content height; centers cleanly in the viewport.
- **Chapter 02 (`ch-what`):** 4 pillar cards in a 2x2 grid. Adjust pillar card padding from `2.25rem` to `clamp(1.2rem, 2vh, 1.8rem)` so the 2x2 grid + interactive SVG flow fits inside `100vh` without squishing.
- **Chapter 03 (`ch-done`):**
  - Container `.projects-carousel`: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; gap: 2rem;`
  - Project Cards `.project-card`: `flex: 0 0 100%; max-width: 100%; scroll-snap-align: center;`
  - Carousel Controls in Chapter Header:
    - Counter pill: `PROJECT [ 01 / 03 ]`
    - Prev / Next arrow buttons (`←` / `→`) styled with HUD dark-glass aesthetics (`var(--border-subtle)` and hover glow).
  - Dot indicators below or next to the carousel navigation.
- **Chapter 04 (`ch-worked`):** Timeline items. Use compact vertical margins so the 3 experience nodes sit comfortably within `100vh`.
- **Chapter 05 (`ch-studied`):** 2 degrees + certifications grid fits within ~580px; perfectly fits `100vh`.
- **Chapter 06 (`ch-contact`):** Console container fits within ~620px; perfectly fits `100vh`.

### 3.3 Carousel JavaScript Controller
- Handles Prev/Next button clicks by scrolling `#projects-carousel` by `+clientWidth` or `-clientWidth`.
- Tracks scroll position on the carousel to update the counter pill (`01 / 03`, `02 / 03`, `03 / 03`) and dot states.
- Enables left/right keyboard arrow navigation when Chapter 03 is in view.

---

## 4. Responsive & Accessibility Considerations
- On small screens (`@media (max-width: 960px)` or `@media (max-height: 650px)`):
  - `.chapter-screen` allows `min-height: 100vh; height: auto;` or `overflow-y: auto;` to avoid content cutoff on smaller screens.
  - Carousel retains touch swipe functionality natively via `overflow-x: auto; -webkit-overflow-scrolling: touch;`.
- Respects `prefers-reduced-motion` by disabling smooth snap transitions for users with motion sensitivity.

---

## 5. Verification Plan
1. **Layout & Snap Verification:** Automated and visual test verifying that scrolling vertically snaps to each of the 6 chapter coordinates.
2. **Carousel Interaction:** Verify that clicking next/prev advances project slides, updates the counter (`01 / 03`), and updates active states.
3. **HUD Sync:** Verify that clicking HUD items 01–06 navigates directly to the target snap point and highlights the corresponding index item.
