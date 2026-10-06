# Slideshow Transitions & Section Centering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all `.section-tag` badge elements from chapter sections, center all chapters vertically and horizontally in the 100vh viewport, and implement slideshow-style smooth scrolling transitions between chapters.

**Architecture:**
- Cleaned markup in `v3/index.html` removing redundant tag elements.
- CSS layout tuning in `v3/style.css` making all `.chapter-screen` elements vertically and horizontally centered with compacted metrics.
- Controller in `v3/main.js` capturing wheel, touch swipe, and keyboard navigation to transition between chapters like slides with a 750ms gesture cooldown lock.

**Tech Stack:** Vanilla HTML5, CSS3, Lenis v1.1.20, Vanilla JavaScript, Headless Edge CDP automated test scripts.

## Global Constraints
- Preserve existing dark theme and cyber-minimalist HUD aesthetics.
- Ensure all chapters fit 100vh without cutting off content or colliding with the fixed navbar.
- Ensure Chapter 03 horizontal carousel swiping remains completely functional.
- Automated CDP test verification before completing.

---

### Task 1: Remove Section Tags Across All Chapters

**Files:**
- Modify: `v3/index.html`
- Test: `scratch/test_slideshow_task1.js`

**Interfaces:**
- Produces: Cleaned DOM with zero `.section-tag` elements.

- [x] **Step 1: Write test script checking for zero `.section-tag` elements in DOM**
- [x] **Step 2: Run test script to verify it fails (currently 5 instances exist)**
- [x] **Step 3: Remove all `<div class="section-tag">...</div>` elements from `v3/index.html`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 1 changes**

---

### Task 2: Center All Chapter Screens & Compact Content Metrics

**Files:**
- Modify: `v3/style.css`
- Test: `scratch/test_slideshow_task2.js`

**Interfaces:**
- Produces: All `.chapter-screen` elements with `justify-content: center; align-items: center;` and content heights <= 750px.

- [x] **Step 1: Write test script checking centering styles and content heights across all 6 chapters**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Apply universal chapter centering and metric compaction in `v3/style.css`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 2 changes**

---

### Task 3: Slideshow Transitions Controller with Gesture Cooldown

**Files:**
- Modify: `v3/main.js`
- Test: `scratch/test_slideshow_task3.js`

**Interfaces:**
- Produces: `initSlideshowDeck()` capturing wheel/swipe/keyboard events, driving Lenis slide transitions, and enforcing a 750ms cooldown lock.

- [x] **Step 1: Write test script simulating wheel events and verifying slide-by-slide progression with lock**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Implement `initSlideshowDeck()` in `v3/main.js`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 3 changes**

---

### Task 4: End-to-End Verification & Visual Screenshots

**Files:**
- Test: `scratch/verify_slideshow_e2e.js`

**Interfaces:**
- Validates: Zero section tags, centered layout on all 6 chapters, smooth slide transitions, HUD synchronization, and captured screenshots.

- [x] **Step 1: Write and run comprehensive E2E test script**
- [x] **Step 2: Review captured visual screenshots for all chapters**
- [x] **Step 3: Commit any final refinements and update plan**
