# Lenis Inertial Smooth Scrolling and Magnetic Settling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Lenis smooth scrolling into Portfolio V3 to provide fluid momentum dampening on mouse wheel/trackpad and gentle magnetic settling at 100vh chapter boundaries.

**Architecture:**
- Self-hosted Lenis library (`v3/vendor/lenis.min.js`) loaded in `v3/index.html`.
- CSS tuning in `v3/style.css` disabling rigid native scroll-snapping when Lenis is active while isolating Chapter 03 horizontal carousel with `[data-lenis-prevent]`.
- JavaScript engine in `v3/main.js` driving the RAF loop, syncing the left HUD chapter indicator, managing gentle magnetic chapter attraction, and animating HUD anchor links.

**Tech Stack:** Vanilla HTML5, Vanilla CSS3, Lenis v1.1.20 (standalone UMD), Vanilla JavaScript, Headless Edge CDP automated test scripts.

## Global Constraints
- Must maintain dark theme HUD aesthetic and glassmorphic styling.
- Zero network dependencies (Lenis is hosted locally in `v3/vendor/lenis.min.js`).
- Never interfere with Chapter 03 horizontal carousel swiping/scrolling (`data-lenis-prevent`).
- Automated headless browser CDP test verification before completing.

---

### Task 1: Markup Integration & Carousel Isolation

**Files:**
- Modify: `v3/index.html:15-35, 115-125`
- Test: `scratch/test_lenis_task1.js`

**Interfaces:**
- Produces: `<script src="vendor/lenis.min.js">` in DOM and `data-lenis-prevent` on `#projects-carousel`.

- [x] **Step 1: Write test script checking Lenis script presence and carousel isolation attribute**

```javascript
// scratch/test_lenis_task1.js
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

await new Promise(r => ws.onopen = r);
const evalRes = await send('Runtime.evaluate', {
  expression: `(() => {
    const hasLenis = typeof window.Lenis === 'function';
    const carousel = document.getElementById('projects-carousel');
    const hasPrevent = carousel && carousel.hasAttribute('data-lenis-prevent');
    return { hasLenis, hasPrevent };
  })()`,
  returnByValue: true
});

console.log('Task 1 Evaluation:', evalRes.result.value);
ws.close();
edgeProc.kill();
if (!evalRes.result.value.hasLenis || !evalRes.result.value.hasPrevent) {
  process.exit(1);
}
```

- [x] **Step 2: Run test script to verify it fails initially**
- [x] **Step 3: Update `v3/index.html` to load Lenis and add `data-lenis-prevent` to `#projects-carousel`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 1 changes**

---

### Task 2: Lenis CSS & Scroll Snap Tuning

**Files:**
- Modify: `v3/style.css:50-75, 350-365`
- Test: `scratch/test_lenis_task2.js`

**Interfaces:**
- Produces: CSS rules for Lenis smooth scrolling (`html.lenis`, `.lenis-smooth`, `[data-lenis-prevent]`) and replaces rigid snap locks with non-blocking momentum compatibility.

- [x] **Step 1: Write test script checking Lenis CSS rules and absence of conflicting snap locks**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Add Lenis styling rules to `v3/style.css`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 2 changes**

---

### Task 3: Controller Initialization, Momentum Easing & Magnetic Settling

**Files:**
- Modify: `v3/main.js`
- Test: `scratch/test_lenis_task3.js`

**Interfaces:**
- Produces: `window.__lenis` instance, continuous RAF loop, HUD scroll tracker, and magnetic snap settling when scrolling ends.

- [x] **Step 1: Write test script simulating wheel momentum and verifying animated scroll interpolation**
- [x] **Step 2: Run test script to verify it fails**
- [x] **Step 3: Implement Lenis initialization, HUD sync, and magnetic chapter settling in `v3/main.js`**
- [x] **Step 4: Run test script to verify it passes**
- [x] **Step 5: Commit Task 3 changes**

---

### Task 4: End-to-End Verification & Polish

**Files:**
- Test: `scratch/verify_lenis_e2e.js`

**Interfaces:**
- Validates: Full flow including wheel momentum, chapter settling, HUD active synchronization, anchor link smooth transition, and Chapter 03 carousel independence.

- [x] **Step 1: Write and run comprehensive E2E test script**
- [x] **Step 2: Capture visual verification screenshots**
- [x] **Step 3: Commit any final refinements and update plan**
