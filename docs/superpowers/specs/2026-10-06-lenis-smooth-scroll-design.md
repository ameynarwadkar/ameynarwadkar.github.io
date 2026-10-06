# Lenis Inertial Smooth Scrolling and Chapter Magnetic Settling Design Spec

## Context & Objectives
Portfolio V3 currently implements native CSS scroll-snapping (`scroll-snap-type: y mandatory; scroll-snap-stop: always;`). While each chapter fills the viewport (100vh), browser-native snapping on desktop wheel mice (especially Windows notched mouse wheels) can feel abrupt, mechanical, and rigid.

The user requested:
> "Make the scorlling effect smoother ... Complete it and then let me know, use lenis ... Inertial smooth scroll: Fluid momentum scrolling (smooth wheel dampening) that gently settles into each chapter without abrupt snapping"

This specification outlines the integration of **Lenis** (v1.1.20) into Portfolio V3 to provide continuous, silky momentum scrolling with magnetic settling at chapter boundaries.

---

## Architecture & Design

### 1. Library Delivery (`v3/vendor/lenis.min.js`)
- Lenis v1.1.20 is hosted locally under `v3/vendor/lenis.min.js` (~14KB minified standalone UMD).
- Zero external CDN network latency; works reliably offline and across all environments.
- Loaded in `v3/index.html` before `main.js`.

### 2. Markup Updates (`v3/index.html`)
- Include `<script src="vendor/lenis.min.js"></script>` in `<head>` or before `main.js`.
- Add `data-lenis-prevent` attribute to `#projects-carousel` (Chapter 03 horizontal carousel container) so horizontal swipe/scroll events inside the carousel are isolated from vertical Lenis scroll hijacking.

### 3. CSS Configuration (`v3/style.css`)
- **Lenis Core Classes**:
  ```css
  html.lenis, html.lenis body {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  ```
- **Snap Interaction Tuning**:
  - Disable rigid `scroll-snap-type: y mandatory` when Lenis is running (`html.lenis, html.lenis body.scrolly-body { scroll-snap-type: none; }`).
  - Remove `scroll-snap-stop: always` from `.chapter-screen` to eliminate browser-level rigid resistance.
  - Retain `scroll-snap-type: y proximity` only as a graceful fallback when Lenis is disabled or unavailable.

### 4. Controller Logic (`v3/main.js`)
- **Initialization**:
  - Initialize Lenis instance:
    ```javascript
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false
    });
    window.__lenis = lenis;
    ```
  - Drive animation via `requestAnimationFrame`:
    ```javascript
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    ```
- **HUD Synchronization**:
  - Bind `lenis.on('scroll', (e) => { updateActiveChapterHUD(e.scroll); })`.
- **Magnetic Chapter Settling**:
  - Detect when user scrolling pauses (debounced ~120ms) and velocity is low (`Math.abs(lenis.velocity) < 0.15`).
  - Calculate nearest chapter top offset:
    `const targetY = Math.round(lenis.scroll / vh) * vh;`
  - If distance to snap point is within attraction threshold (`Math.abs(targetY - lenis.scroll) < vh * 0.45` and `> 3px`), trigger gentle glide:
    ```javascript
    lenis.scrollTo(targetY, {
      duration: 0.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    ```
- **HUD Anchor Clicks**:
  - Intercept chapter navigation links (`a[href^="#ch-"]`) to trigger smooth Lenis transitions:
    ```javascript
    lenis.scrollTo(targetSelector, {
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    ```

---

## Testing & Verification Plan

1. **Unit/Integration Test via CDP (`scratch/test_lenis.js`)**:
   - Verify `window.__lenis` exists and `document.documentElement` has `.lenis` class.
   - Dispatch wheel event deltas; verify `animatedScroll` smoothly interpolates across frames rather than jumping instantly.
   - Verify magnetic settling lands precisely on a chapter offset (`scrollY % vh === 0` within 1px).
   - Verify clicking HUD nav link triggers smooth scroll to target chapter.
   - Verify `#projects-carousel` maintains horizontal scrollability with `data-lenis-prevent`.

2. **Visual Inspection**:
   - Verify chapter alignment and spacing with screenshots.
