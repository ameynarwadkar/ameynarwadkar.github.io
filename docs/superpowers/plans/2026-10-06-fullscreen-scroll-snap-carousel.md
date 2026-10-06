# Full-Screen Scroll Snapping and Chapter 03 Project Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Portfolio V3 into a full-screen, scroll-snapping narrative where each chapter fits the screen (100vh) upon scrolling, and Chapter 03 features a horizontal carousel for its three project dossiers.

**Architecture:**
- Native CSS vertical scroll snapping (`scroll-snap-type: y mandatory`) on `html, body`.
- Each `.chapter-screen` sized to `100vh` / `100dvh` with `scroll-snap-align: start; scroll-snap-stop: always;` and scaled padding.
- Chapter 03 features a horizontal scroll-snap container (`.projects-carousel`) with HUD-styled interactive controls (Prev/Next buttons, slide counter pill, dots) and keyboard navigation.
- Left HUD navigation synchronized with snap points.

**Tech Stack:** Vanilla HTML5, CSS3 (Native Scroll Snap, Flexbox/Grid, CSS variables), Vanilla JavaScript (CDP-based headless automated test verification).

## Global Constraints
- Must preserve existing dark theme, cyber-minimalist HUD aesthetic, and glassmorphic styling.
- Zero dependencies added (Vanilla CSS & JS).
- Smooth responsive behavior: small heights (<650px) or mobile (<960px) fall back gracefully without cutting off content.
- Automated verification with CDP headless browser script before completing.

---

### Task 1: Viewport & Chapter Vertical Snapping Styles

**Files:**
- Modify: `v3/style.css:325-420`
- Test: `scratch/verify_scroll_snap.js`

**Interfaces:**
- Produces: CSS rules for `html, body` scroll snapping, `.chapter-screen` 100vh sizing and scaled vertical padding.

- [x] **Step 1: Write test script checking scroll-snap CSS rules and chapter bounding heights**
- [x] **Step 2: Add vertical scroll snap rules to `v3/style.css`**
- [x] **Step 3: Run Task 1 verification test**
- [x] **Step 4: Commit Task 1 changes**

```javascript
// scratch/test_task1.js
import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edgeProc = spawn(edgePath, [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--window-size=1600,1000',
  'http://localhost:8085/v3/'
]);
await new Promise(r => setTimeout(r, 2000));

const listRes = await fetch('http://127.0.0.1:9222/json/list');
const targets = await listRes.json();
const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:8085'));
const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

let id = 1;
function send(method, params = {}) {
  return new Promise((resolve) => {
    const msgId = id++;
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

ws.addEventListener('open', async () => {
  await send('Runtime.enable');
  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const bodyStyle = getComputedStyle(document.body);
        const htmlStyle = getComputedStyle(document.documentElement);
        const screens = Array.from(document.querySelectorAll('.chapter-screen')).map(s => {
          const style = getComputedStyle(s);
          return {
            id: s.id,
            snapAlign: style.scrollSnapAlign,
            height: s.getBoundingClientRect().height,
            vh: window.innerHeight
          };
        });
        return {
          htmlSnap: htmlStyle.scrollSnapType,
          bodySnap: bodyStyle.scrollSnapType,
          screens
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Result:', JSON.stringify(res.result.value, null, 2));
  edgeProc.kill();
  process.exit(0);
});
```

- [x] **Step 2: Run test script to verify it fails (no scroll-snap currently)**

Run: `node scratch/test_task1.js`
Expected: `htmlSnap` and `bodySnap` are `"none"` and `snapAlign` is `"none"`.

- [x] **Step 3: Modify `v3/style.css` to enable mandatory vertical snap and 100vh chapter sizing**

In `v3/style.css`:
- Add to `html, body`:
  ```css
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  body.scrolly-body {
    scroll-snap-type: y mandatory;
  }
  ```
- Update `.chapter-screen`:
  ```css
  .chapter-screen {
    height: 100vh;
    height: 100dvh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(1rem, 3vh, 2.5rem) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    box-sizing: border-box;
    position: relative;
  }
  ```
- Scale `.section-lead` and `.hero-grid`:
  ```css
  .section-lead {
    margin-bottom: clamp(1rem, 2.5vh, 2rem);
  }
  ```
- Scale Chapter 02 pillar padding:
  ```css
  .pillar-card {
    padding: clamp(1.2rem, 2vh, 1.8rem);
  }
  ```
- Add responsive fallback for short viewports:
  ```css
  @media (max-height: 650px), (max-width: 960px) {
    html, body.scrolly-body {
      scroll-snap-type: none;
    }
    .chapter-screen {
      height: auto;
      min-height: 100vh;
      scroll-snap-align: none;
    }
  }
  ```

- [x] **Step 4: Run test script to verify it passes**

Run: `node scratch/test_task1.js`
Expected: `htmlSnap` has `"y mandatory"`, `snapAlign` is `"start"`, screen heights equal viewport height.

- [x] **Step 5: Commit changes**

```bash
git add v3/style.css
git commit -m "feat(v3): enable full-screen vertical scroll snapping"
```

---

### Task 2: Chapter 03 Project Carousel HTML & Controls

**Files:**
- Modify: `v3/index.html:290-415`
- Test: `scratch/test_task2.js`

**Interfaces:**
- Produces: Horizontal `.projects-carousel` container with IDs `#projects-carousel`, `#project-prev-btn`, `#project-next-btn`, `#project-carousel-counter`, and `.carousel-dots`.

- [x] **Step 1: Write test to verify presence of carousel container and controls**

```javascript
// scratch/test_task2.js
import { spawn } from 'child_process';
const edgeProc = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--window-size=1600,1000',
  'http://localhost:8085/v3/'
]);
await new Promise(r => setTimeout(r, 2000));
const listRes = await fetch('http://127.0.0.1:9222/json/list');
const targets = await listRes.json();
const ws = new WebSocket(targets.find(t => t.type === 'page' && t.url.includes('localhost:8085')).webSocketDebuggerUrl);

ws.addEventListener('open', async () => {
  const send = (method, params = {}) => new Promise(res => {
    const id = Math.random();
    const h = e => { const d = JSON.parse(e.data); if (d.id === id) { ws.removeEventListener('message', h); res(d.result); } };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const carousel = document.getElementById('projects-carousel');
        const prev = document.getElementById('project-prev-btn');
        const next = document.getElementById('project-next-btn');
        const counter = document.getElementById('project-carousel-counter');
        const cards = carousel ? carousel.querySelectorAll('.project-card') : [];
        return {
          hasCarousel: !!carousel,
          hasPrev: !!prev,
          hasNext: !!next,
          hasCounter: !!counter,
          cardCount: cards.length
        };
      })()
    `,
    returnByValue: true
  });
  console.log(JSON.stringify(res.result.value, null, 2));
  edgeProc.kill();
  process.exit(0);
});
```

- [x] **Step 2: Run test script to verify it fails**

Run: `node scratch/test_task2.js`
Expected: `hasCarousel: false`.

- [x] **Step 3: Update `v3/index.html` with carousel wrapper and HUD control bar**

In `v3/index.html` at Chapter 03:
- Add carousel header controls beside the section lead:
  ```html
  <div class="projects-header-row">
    <div class="section-lead">
      <div class="section-tag">
        <span class="tag-num">03</span>
        <span class="tag-label">SELECTED PRODUCTION &amp; RESEARCH INITIATIVES</span>
      </div>
      <h2 class="section-title">What I've Done.</h2>
    </div>

    <!-- Carousel Controls HUD -->
    <div class="carousel-hud-controls">
      <span class="carousel-counter-pill" id="project-carousel-counter">PROJECT 01 / 03</span>
      <div class="carousel-nav-btns">
        <button class="carousel-btn" id="project-prev-btn" aria-label="Previous project">←</button>
        <button class="carousel-btn" id="project-next-btn" aria-label="Next project">→</button>
      </div>
    </div>
  </div>
  ```
- Wrap the 3 `.project-card` elements in `<div class="projects-carousel" id="projects-carousel">`.
- Add dot indicators below the carousel:
  ```html
  <div class="carousel-dots" id="project-carousel-dots">
    <button class="carousel-dot active" data-index="0" aria-label="Project 1"></button>
    <button class="carousel-dot" data-index="1" aria-label="Project 2"></button>
    <button class="carousel-dot" data-index="2" aria-label="Project 3"></button>
  </div>
  ```

- [x] **Step 4: Run test script to verify it passes**

Run: `node scratch/test_task2.js`
Expected: `hasCarousel: true`, `hasPrev: true`, `hasNext: true`, `hasCounter: true`, `cardCount: 3`.

- [x] **Step 5: Commit changes**

```bash
git add v3/index.html
git commit -m "feat(v3): add Chapter 03 horizontal carousel markup and controls"
```

---

### Task 3: Chapter 03 Carousel Styling

**Files:**
- Modify: `v3/style.css:800-980`
- Test: `scratch/test_task3.js`

**Interfaces:**
- Produces: CSS rules for `.projects-carousel`, `.projects-header-row`, `.carousel-hud-controls`, `.carousel-counter-pill`, `.carousel-btn`, `.carousel-dots`, and project card horizontal snap styling.

- [x] **Step 1: Write test for carousel horizontal snap styling**

```javascript
// scratch/test_task3.js
import { spawn } from 'child_process';
const edgeProc = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--window-size=1600,1000',
  'http://localhost:8085/v3/'
]);
await new Promise(r => setTimeout(r, 2000));
const listRes = await fetch('http://127.0.0.1:9222/json/list');
const targets = await listRes.json();
const ws = new WebSocket(targets.find(t => t.type === 'page' && t.url.includes('localhost:8085')).webSocketDebuggerUrl);

ws.addEventListener('open', async () => {
  const send = (method, params = {}) => new Promise(res => {
    const id = Math.random();
    const h = e => { const d = JSON.parse(e.data); if (d.id === id) { ws.removeEventListener('message', h); res(d.result); } };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const carousel = document.getElementById('projects-carousel');
        const card = carousel.querySelector('.project-card');
        const cStyle = getComputedStyle(carousel);
        const cardStyle = getComputedStyle(card);
        return {
          display: cStyle.display,
          overflowX: cStyle.overflowX,
          scrollSnapType: cStyle.scrollSnapType,
          cardSnapAlign: cardStyle.scrollSnapAlign
        };
      })()
    `,
    returnByValue: true
  });
  console.log(JSON.stringify(res.result.value, null, 2));
  edgeProc.kill();
  process.exit(0);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node scratch/test_task3.js`
Expected: `scrollSnapType` is `"none"` or fails.

- [x] **Step 3: Add CSS for carousel and project card layout**

In `v3/style.css`:
```css
/* Chapter 03 Header Controls */
.projects-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: clamp(1rem, 2vh, 1.75rem);
}

.carousel-hud-controls {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.carousel-counter-pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--brand-orange);
  background: rgba(255, 68, 33, 0.08);
  border: 1px solid rgba(255, 68, 33, 0.25);
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
}

.carousel-nav-btns {
  display: inline-flex;
  gap: 0.5rem;
}

.carousel-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  background: rgba(17, 17, 22, 0.8);
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.carousel-btn:hover:not(:disabled) {
  border-color: var(--brand-orange);
  color: #fff;
  background: rgba(255, 68, 33, 0.15);
  box-shadow: 0 0 12px var(--brand-orange-glow);
}

.carousel-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Horizontal Projects Carousel */
.projects-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 2rem;
  padding: 0.5rem 0 1rem 0;
  scrollbar-width: none; /* Hide scrollbar Firefox */
  -ms-overflow-style: none; /* Hide scrollbar IE */
}
.projects-carousel::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome/Safari */
}

.projects-carousel .project-card {
  flex: 0 0 100%;
  max-width: 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  margin-bottom: 0;
  box-sizing: border-box;
}

/* Carousel Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;
}

.carousel-dot {
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.carousel-dot.active {
  width: 48px;
  background: var(--brand-orange);
  box-shadow: 0 0 8px var(--brand-orange-glow);
}
```

- [x] **Step 4: Run test to verify it passes**

Run: `node scratch/test_task3.js`
Expected: `display: "flex"`, `overflowX: "auto"`, `scrollSnapType: "x mandatory"`, `cardSnapAlign: "center"`.

- [x] **Step 5: Commit changes**

```bash
git add v3/style.css
git commit -m "feat(v3): add carousel styling and horizontal card snapping"
```

---

### Task 4: Chapter 03 Carousel JavaScript Logic & HUD Sync

**Files:**
- Modify: `v3/main.js:250-320`
- Test: `scratch/test_task4.js`

**Interfaces:**
- Produces: `initProjectCarousel()` in `v3/main.js` connected to prev/next buttons, scroll events, counter updates, and keyboard arrows.

- [x] **Step 1: Write test for carousel interaction (button click advancing slide)**

```javascript
// scratch/test_task4.js
import { spawn } from 'child_process';
const edgeProc = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--window-size=1600,1000',
  'http://localhost:8085/v3/'
]);
await new Promise(r => setTimeout(r, 2000));
const listRes = await fetch('http://127.0.0.1:9222/json/list');
const targets = await listRes.json();
const ws = new WebSocket(targets.find(t => t.type === 'page' && t.url.includes('localhost:8085')).webSocketDebuggerUrl);

ws.addEventListener('open', async () => {
  const send = (method, params = {}) => new Promise(res => {
    const id = Math.random();
    const h = e => { const d = JSON.parse(e.data); if (d.id === id) { ws.removeEventListener('message', h); res(d.result); } };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 1200));

  // Click next button
  const nextRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const nextBtn = document.getElementById('project-next-btn');
        if (nextBtn) nextBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const check = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const carousel = document.getElementById('projects-carousel');
        const counter = document.getElementById('project-carousel-counter');
        return {
          scrollLeft: carousel.scrollLeft,
          counterText: counter ? counter.innerText : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log(JSON.stringify(check.result.value, null, 2));
  edgeProc.kill();
  process.exit(0);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node scratch/test_task4.js`
Expected: `scrollLeft: 0` (no logic implemented yet).

- [x] **Step 3: Implement `initProjectCarousel()` in `v3/main.js`**

```javascript
function initProjectCarousel() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('project-prev-btn');
  const nextBtn = document.getElementById('project-next-btn');
  const counter = document.getElementById('project-carousel-counter');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.project-card');
  const total = cards.length;

  function updateState(idx) {
    if (counter) counter.innerText = `PROJECT 0${idx + 1} / 0${total}`;
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === total - 1;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function getActiveIndex() {
    const cardWidth = cards[0].offsetWidth + 32; // gap
    const idx = Math.round(carousel.scrollLeft / cardWidth);
    return Math.max(0, Math.min(idx, total - 1));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = getActiveIndex();
      if (idx > 0) {
        cards[idx - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = getActiveIndex();
      if (idx < total - 1) {
        cards[idx + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  });

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateState(getActiveIndex());
    }, 50);
  }, { passive: true });

  // Keyboard navigation when Chapter 03 is in view
  window.addEventListener('keydown', (e) => {
    const chDone = document.getElementById('ch-done');
    if (!chDone) return;
    const r = chDone.getBoundingClientRect();
    const inView = r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      const idx = getActiveIndex();
      if (idx < total - 1) {
        cards[idx + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } else if (e.key === 'ArrowLeft') {
      const idx = getActiveIndex();
      if (idx > 0) {
        cards[idx - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  });

  updateState(0);
}
```
Invoke `initProjectCarousel()` in DOMContentLoaded initialization in `v3/main.js`.

- [x] **Step 4: Run test to verify it passes**

Run: `node scratch/test_task4.js`
Expected: `scrollLeft > 0`, `counterText: "PROJECT 02 / 03"`.

- [x] **Step 5: Commit changes**

```bash
git add v3/main.js
git commit -m "feat(v3): implement carousel navigation controller and keyboard support"
```

---

### Task 5: End-to-End System Verification

**Files:**
- Test: `scratch/verify_all_screens.js`

- [x] **Step 1: Write complete end-to-end verification script testing all 6 chapter snap points and carousel navigation**

```javascript
// scratch/verify_all_screens.js
import { spawn } from 'child_process';
import fs from 'fs';

const edgeProc = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--window-size=1600,1000',
  'http://localhost:8085/v3/'
]);
await new Promise(r => setTimeout(r, 2000));
const listRes = await fetch('http://127.0.0.1:9222/json/list');
const targets = await listRes.json();
const ws = new WebSocket(targets.find(t => t.type === 'page' && t.url.includes('localhost:8085')).webSocketDebuggerUrl);

ws.addEventListener('open', async () => {
  const send = (method, params = {}) => new Promise(res => {
    const id = Math.random();
    const h = e => { const d = JSON.parse(e.data); if (d.id === id) { ws.removeEventListener('message', h); res(d.result); } };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });
  await send('Runtime.enable');
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Check all 6 chapters heights and snap alignment
  const screenCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return Array.from(document.querySelectorAll('.chapter-screen')).map(s => {
          const r = s.getBoundingClientRect();
          return { id: s.id, height: r.height, vh: window.innerHeight, snap: getComputedStyle(s).scrollSnapAlign };
        });
      })()
    `,
    returnByValue: true
  });
  console.log('Chapter screen metrics:', JSON.stringify(screenCheck.result.value, null, 2));

  // 2. Programmatically scroll to each chapter and verify HUD active state
  const chapters = ['ch-who', 'ch-what', 'ch-done', 'ch-worked', 'ch-studied', 'ch-contact'];
  for (const ch of chapters) {
    await send('Runtime.evaluate', {
      expression: `document.getElementById('${ch}').scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await new Promise(r => setTimeout(r, 250));
    const activeHud = await send('Runtime.evaluate', {
      expression: `document.querySelector('.hud-idx.active')?.getAttribute('data-chapter')`,
      returnByValue: true
    });
    console.log(`Scrolled to ${ch} -> Active HUD: ${activeHud.result.value}`);
  }

  // 3. Capture screenshot of Chapter 03 Carousel
  await send('Runtime.evaluate', {
    expression: `document.getElementById('ch-done').scrollIntoView({ behavior: 'instant', block: 'start' });`
  });
  await new Promise(r => setTimeout(r, 300));
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Amey\\.gemini\\antigravity-ide\\brain\\8eec1057-3205-4f0f-aaeb-143930158c98\\scratch\\carousel_screen.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved carousel_screen.png');

  edgeProc.kill();
  process.exit(0);
});
```

- [x] **Step 2: Run verification script**

Run: `node scratch/verify_all_screens.js`
Expected: All chapters equal viewport height (1000px), active HUD matches each chapter on scroll, and carousel renders cleanly.

- [x] **Step 3: Commit final plan verification and cleanup**

```bash
git add docs/superpowers/plans/2026-10-06-fullscreen-scroll-snap-carousel.md
git commit -m "docs: complete implementation plan for full-screen scroll snapping"
```
