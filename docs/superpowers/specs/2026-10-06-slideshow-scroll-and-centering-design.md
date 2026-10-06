# Slideshow Section Transitions and Centered Chapters Design Spec

## Context & Objectives
The user requested:
1. Remove all section tags (`.section-tag`) from each section.
2. Ensure every chapter section is vertically and horizontally centered in the 100vh viewport.
3. Transition between sections like a slideshow with smooth scrolling (one scroll gesture = one smooth slide to next/prev section with gesture cooldown).

---

## Architecture & Implementation Details

### 1. Section Tag Removal (`v3/index.html`)
Remove all instances of `<div class="section-tag">...</div>` across all chapters:
- Chapter 02: `ch-what`
- Chapter 03: `ch-done`
- Chapter 04: `ch-worked`
- Chapter 05: `ch-studied`
- Chapter 06: `ch-contact`

### 2. Viewport Centering & Metrics Compaction (`v3/style.css`)
- **Universal Section Centering**:
  ```css
  .chapter-screen {
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3.5rem 0 1rem 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  ```
- **Content Metrics Compaction**:
  - Chapter 04 (`.experience-timeline`): Reduce gap to `1rem` and padding on `.exp-card` to `1rem 1.25rem` so total content height remains ~650–700px.
  - Chapter 05 (`.education-grid`): Maintain compact cards so total content height remains ~650px.
  - Chapter 06 (`.contact-console`): Reduce margins on `.action-grid` and `.email-action-box` so total console height drops from ~920px to ~680–720px.

### 3. Slideshow Transitions Controller (`v3/main.js`)
- Implement `initSlideshowDeck()`:
  - Tracks current chapter index (0 to 5) corresponding to `['ch-who', 'ch-what', 'ch-done', 'ch-worked', 'ch-studied', 'ch-contact']`.
  - Wheel Event Interceptor:
    - Listen to `wheel` event on `window` (`{ passive: false }`).
    - When `Math.abs(e.deltaY) > 20` and navigation is not locked:
      - If `e.deltaY > 0` and `currentIndex < chapters.length - 1`: go to `currentIndex + 1`.
      - If `e.deltaY < 0` and `currentIndex > 0`: go to `currentIndex - 1`.
      - Trigger `lenis.scrollTo(targetChapter, { duration: 0.85, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })`.
      - Lock navigation for `750ms` cooldown to prevent erratic multiple-slide jumps.
  - Keyboard Navigation:
    - `ArrowDown`, `PageDown`, `Space` -> advance slide.
    - `ArrowUp`, `PageUp` -> previous slide.
  - Mobile Touch Gestures:
    - `touchstart` and `touchend` delta threshold (> 45px) advances or reverses slides.
  - Left HUD Clicks:
    - Directly navigate to clicked chapter index and synchronize state.

---

## Verification Plan
1. Automated CDP test verifying removal of all `.section-tag` elements.
2. Automated CDP test verifying each `.chapter-screen` is `justify-content: center; align-items: center;`.
3. Automated CDP test verifying simulated wheel events trigger smooth slideshow transition between chapters with gesture cooldown.
4. Visual inspection screenshots of all chapters in centered presentation.
