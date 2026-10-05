/**
 * Portfolio V2 - Interactive & Ambient Canvas Effects
 * Lightweight, restrained, high-performance
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. Ambient Constellation Canvas
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('v2-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 38000), 28);
    const particles = [];
    const MAX_DISTANCE = 110;

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random() * 0.2 + 0.08,
          isBlue: Math.random() > 0.75,
        });
      }
    }

    initParticles();

    let animationFrameId;
    let isVisible = true;

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) render();
    });

    function render() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const edgeAlpha = (1 - dist / MAX_DISTANCE) * 0.04;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(77, 124, 255, ${edgeAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isBlue
          ? `rgba(128, 164, 253, ${p.alpha * 1.2})`
          : `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();
  }

  /* --------------------------------------------------------------------------
     2. Navbar scroll state and active section highlighting
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.v2-navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.pageYOffset;

      // Subtle boundary on navbar
      if (scrollY > 30) {
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        navbar.style.background = 'rgba(16, 16, 17, 0.96)';
      } else {
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        navbar.style.background = 'rgba(16, 16, 17, 0.94)';
      }

      // Active link detection
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    },
    { passive: true }
  );

  /* --------------------------------------------------------------------------
     4. Focus Areas Dynamic Visual Animations
     Moving energy flows, laser scans, orbiting packets, and synaptic signals
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const focusSection = document.getElementById('focus-areas');
    const canvasProd = document.getElementById('canvas-production-ai');
    const canvasAgent = document.getElementById('canvas-multi-agent');
    const canvasNeuro = document.getElementById('canvas-neuro-symbolic');

    if (focusSection && canvasProd && canvasAgent && canvasNeuro) {
      let isFocusVisible = false;
      let animId = null;
      let startTime = performance.now();

      const ctxProd = canvasProd.getContext('2d');
      const ctxAgent = canvasAgent.getContext('2d');
      const ctxNeuro = canvasNeuro.getContext('2d');

      function resizeCanvases() {
        const update = (cvs) => {
          const rect = cvs.parentElement.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;
          cvs.width = rect.width * dpr;
          cvs.height = rect.height * dpr;
        };
        update(canvasProd);
        update(canvasAgent);
        update(canvasNeuro);
      }

      window.addEventListener('resize', resizeCanvases, { passive: true });
      resizeCanvases();

      // Observer to only animate when in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isFocusVisible = entry.isIntersecting;
            if (isFocusVisible && !animId) {
              startTime = performance.now();
              animId = requestAnimationFrame(animateFocusCanvases);
            } else if (!isFocusVisible && animId) {
              cancelAnimationFrame(animId);
              animId = null;
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(focusSection);

      /* ----------------------------------------------------------------------
         Card 1: Production AI Systems (Laser scan beam & rising data packets)
         ---------------------------------------------------------------------- */
      const prodPackets = [];
      for (let i = 0; i < 18; i++) {
        prodPackets.push({
          relX: (Math.random() - 0.5) * 0.75,
          yProgress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: Math.random() * 2 + 1.2,
          alpha: Math.random() * 0.6 + 0.4,
        });
      }

      function drawProductionAI(ctx, w, h, t) {
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.5;
        const cy = h * 0.52;
        const dW = w * 0.48;
        const dH = h * 0.22;
        const topY = cy - h * 0.26;
        const bottomY = cy + h * 0.24;

        // 1. Vertical Energy Scan Beam
        const scanNorm = (Math.sin(t * 1.6) + 1) / 2;
        const scanY = topY + scanNorm * (bottomY - topY);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, scanY - dH * 0.45);
        ctx.lineTo(cx + dW * 0.5, scanY);
        ctx.lineTo(cx, scanY + dH * 0.45);
        ctx.lineTo(cx - dW * 0.5, scanY);
        ctx.closePath();

        ctx.strokeStyle = 'rgba(128, 164, 255, 0.85)';
        ctx.lineWidth = 2 * (w / 350);
        ctx.shadowColor = '#003BFC';
        ctx.shadowBlur = 18;
        ctx.stroke();

        const grad = ctx.createRadialGradient(cx, scanY, 2, cx, scanY, dW * 0.5);
        grad.addColorStop(0, 'rgba(215, 230, 255, 0.45)');
        grad.addColorStop(0.5, 'rgba(78, 130, 238, 0.3)');
        grad.addColorStop(0.8, 'rgba(155, 114, 207, 0.15)');
        grad.addColorStop(1, 'rgba(78, 130, 238, 0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Central laser cross line
        ctx.beginPath();
        ctx.moveTo(cx - dW * 0.6, scanY);
        ctx.lineTo(cx + dW * 0.6, scanY);
        const lineGrad = ctx.createLinearGradient(cx - dW * 0.6, scanY, cx + dW * 0.6, scanY);
        lineGrad.addColorStop(0, 'transparent');
        lineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        lineGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // 2. Rising Data Packets
        ctx.save();
        prodPackets.forEach((p) => {
          p.yProgress -= p.speed;
          if (p.yProgress < 0) {
            p.yProgress = 1;
            p.relX = (Math.random() - 0.5) * 0.75;
          }

          const py = topY + p.yProgress * (bottomY - topY);
          const px = cx + p.relX * (dW * 0.85);
          const fade = Math.sin(p.yProgress * Math.PI);

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 230, 255, ${p.alpha * fade})`;
          ctx.shadowColor = '#4d7cff';
          ctx.shadowBlur = 10;
          ctx.fill();

          // Small upward motion tail
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + p.size * 4);
          ctx.strokeStyle = `rgba(0, 59, 252, ${p.alpha * fade * 0.6})`;
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        });
        ctx.restore();
      }

      /* ----------------------------------------------------------------------
         Card 2: Multi-Agent AI (Circulating message packets & sonar rings)
         ---------------------------------------------------------------------- */
      const agentPackets = [
        { progress: 0.1, speed: 0.0042, tail: [] },
        { progress: 1.1, speed: 0.0038, tail: [] },
        { progress: 2.1, speed: 0.0045, tail: [] },
      ];

      const sonarWaves = [
        { agentIdx: 0, radius: 10, maxRadius: 55, alpha: 0.8, birth: 0 },
        { agentIdx: 1, radius: 10, maxRadius: 55, alpha: 0.8, birth: 1.5 },
        { agentIdx: 2, radius: 10, maxRadius: 55, alpha: 0.8, birth: 3.0 },
      ];

      function getAgentCoords(idx, cx, cy, w, h) {
        if (idx === 0) return { x: cx, y: cy - h * 0.22 };
        if (idx === 1) return { x: cx - w * 0.24, y: cy + h * 0.13 };
        return { x: cx + w * 0.24, y: cy + h * 0.16 };
      }

      function getAgentPathPos(tNorm, cx, cy, w, h) {
        // tNorm ranges from 0 to 3
        const seg = Math.floor(tNorm) % 3;
        const subT = tNorm - Math.floor(tNorm);
        const p1 = getAgentCoords(seg, cx, cy, w, h);
        const p2 = getAgentCoords((seg + 1) % 3, cx, cy, w, h);

        // Curved control point bowed outward
        const midX = (p1.x + p2.x) * 0.5;
        const midY = (p1.y + p2.y) * 0.5;
        const dirX = midX - cx;
        const dirY = midY - cy;
        const cpX = midX + dirX * 0.35;
        const cpY = midY + dirY * 0.35;

        // Quadratic Bezier
        const invT = 1 - subT;
        const x = invT * invT * p1.x + 2 * invT * subT * cpX + subT * subT * p2.x;
        const y = invT * invT * p1.y + 2 * invT * subT * cpY + subT * subT * p2.y;
        return { x, y };
      }

      function drawMultiAgent(ctx, w, h, t) {
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.5;
        const cy = h * 0.52;

        // 1. Sonar / Ping Rings
        ctx.save();
        sonarWaves.forEach((wave) => {
          wave.radius += 0.45;
          const progress = wave.radius / wave.maxRadius;
          wave.alpha = Math.max(0, (1 - progress) * 0.7);

          if (wave.radius >= wave.maxRadius) {
            wave.radius = 10;
            wave.alpha = 0.7;
          }

          const node = getAgentCoords(wave.agentIdx, cx, cy, w, h);
          ctx.beginPath();
          ctx.arc(node.x, node.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(77, 124, 255, ${wave.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#003BFC';
          ctx.shadowBlur = 10;
          ctx.stroke();
        });
        ctx.restore();

        // 2. Circulating Message Packets
        ctx.save();
        agentPackets.forEach((pkt) => {
          pkt.progress = (pkt.progress + pkt.speed) % 3;
          const pos = getAgentPathPos(pkt.progress, cx, cy, w, h);

          pkt.tail.unshift({ x: pos.x, y: pos.y });
          if (pkt.tail.length > 8) pkt.tail.pop();

          // Tail
          for (let i = 1; i < pkt.tail.length; i++) {
            const pA = pkt.tail[i - 1];
            const pB = pkt.tail[i];
            const trailAlpha = (1 - i / pkt.tail.length) * 0.6;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = `rgba(77, 124, 255, ${trailAlpha})`;
            ctx.lineWidth = 2.5 * (1 - i / pkt.tail.length);
            ctx.stroke();
          }

          // Packet Head
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#4d7cff';
          ctx.shadowBlur = 14;
          ctx.fill();
        });

        // 3. Orbiting Micro-Satellites
        for (let idx = 0; idx < 3; idx++) {
          const center = getAgentCoords(idx, cx, cy, w, h);
          const orbitAngle = t * 1.8 + idx * 2.1;
          const rx = 32;
          const ry = 16;
          const satX = center.x + Math.cos(orbitAngle) * rx;
          const satY = center.y + Math.sin(orbitAngle) * ry;

          ctx.beginPath();
          ctx.arc(satX, satY, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(210, 230, 255, 0.85)';
          ctx.shadowColor = '#003BFC';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        ctx.restore();
      }

      /* ----------------------------------------------------------------------
         Card 3: Neuro-Symbolic ML (Synaptic firing action potentials & flares)
         ---------------------------------------------------------------------- */
      const rawNodes = [
        [-0.24, -0.22], [-0.02, -0.32], [0.22, -0.24], [0.34, -0.06],
        [0.28, 0.12], [0.18, 0.28], [0.08, 0.38], [-0.12, 0.22],
        [-0.28, 0.10], [-0.34, -0.06], [-0.12, -0.10], [0.08, -0.12],
        [-0.04, 0.04], [0.14, 0.02], [-0.18, 0.02], [0.02, 0.18],
        [-0.05, -0.20], [0.18, -0.10]
      ];

      const brainEdges = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
        [8, 9], [9, 0], [0, 10], [1, 16], [16, 11], [2, 17], [17, 3],
        [10, 12], [11, 13], [12, 13], [12, 14], [14, 8], [13, 4],
        [12, 15], [15, 7], [15, 5], [10, 14], [16, 10], [17, 13]
      ];

      const signals = [
        { edgeIdx: 0, progress: 0.1, speed: 0.016, dir: 1 },
        { edgeIdx: 5, progress: 0.5, speed: 0.019, dir: 1 },
        { edgeIdx: 12, progress: 0.2, speed: 0.014, dir: -1 },
        { edgeIdx: 17, progress: 0.8, speed: 0.018, dir: 1 },
        { edgeIdx: 21, progress: 0.4, speed: 0.017, dir: -1 },
      ];

      const nodeFlares = new Array(rawNodes.length).fill(0);

      function drawNeuroSymbolic(ctx, w, h, t) {
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.5;
        const cy = h * 0.52;
        const scaleX = w * 0.65;
        const scaleY = h * 0.65;

        const nodes = rawNodes.map((pt) => ({
          x: cx + pt[0] * scaleX,
          y: cy + pt[1] * scaleY,
        }));

        ctx.save();

        // 1. Action Potentials along brain edges
        signals.forEach((sig) => {
          sig.progress += sig.speed;
          if (sig.progress >= 1) {
            sig.progress = 0;
            // Pick next connected edge
            const edge = brainEdges[sig.edgeIdx];
            const targetNodeIdx = sig.dir === 1 ? edge[1] : edge[0];
            nodeFlares[targetNodeIdx] = 1.0; // Trigger neuron flare

            // Find edges connected to targetNodeIdx
            const nextCandidates = [];
            brainEdges.forEach((e, idx) => {
              if (idx !== sig.edgeIdx && (e[0] === targetNodeIdx || e[1] === targetNodeIdx)) {
                nextCandidates.push({
                  edgeIdx: idx,
                  dir: e[0] === targetNodeIdx ? 1 : -1,
                });
              }
            });

            if (nextCandidates.length > 0) {
              const choice = nextCandidates[Math.floor(Math.random() * nextCandidates.length)];
              sig.edgeIdx = choice.edgeIdx;
              sig.dir = choice.dir;
            } else {
              sig.edgeIdx = Math.floor(Math.random() * brainEdges.length);
              sig.dir = Math.random() > 0.5 ? 1 : -1;
            }
          }

          const edge = brainEdges[sig.edgeIdx];
          const nA = nodes[sig.dir === 1 ? edge[0] : edge[1]];
          const nB = nodes[sig.dir === 1 ? edge[1] : edge[0]];

          const curX = nA.x + (nB.x - nA.x) * sig.progress;
          const curY = nA.y + (nB.y - nA.y) * sig.progress;

          // Draw synaptic impulse head
          ctx.beginPath();
          ctx.arc(curX, curY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#4d7cff';
          ctx.shadowBlur = 14;
          ctx.fill();

          // Small trailing impulse segment
          const tailLen = Math.max(0, sig.progress - 0.25);
          const tailX = nA.x + (nB.x - nA.x) * tailLen;
          const tailY = nA.y + (nB.y - nA.y) * tailLen;
          ctx.beginPath();
          ctx.moveTo(curX, curY);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = 'rgba(128, 164, 255, 0.75)';
          ctx.lineWidth = 2.2;
          ctx.stroke();
        });

        // 2. Firing Neuron Flares
        for (let i = 0; i < nodes.length; i++) {
          if (nodeFlares[i] > 0.04) {
            const pt = nodes[i];
            const flare = nodeFlares[i];
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 16 * flare, 0, Math.PI * 2);
            const flareGrad = ctx.createRadialGradient(pt.x, pt.y, 1, pt.x, pt.y, 16 * flare);
            flareGrad.addColorStop(0, `rgba(255, 255, 255, ${flare})`);
            flareGrad.addColorStop(0.35, `rgba(78, 130, 238, ${flare * 0.9})`);
            flareGrad.addColorStop(0.7, `rgba(155, 114, 207, ${flare * 0.6})`);
            flareGrad.addColorStop(1, 'rgba(78, 130, 238, 0)');
            ctx.fillStyle = flareGrad;
            ctx.fill();

            nodeFlares[i] *= 0.94; // Decay
          }
        }

        // Spontaneous subtle firing
        if (Math.random() < 0.04) {
          const randIdx = Math.floor(Math.random() * nodes.length);
          nodeFlares[randIdx] = Math.max(nodeFlares[randIdx], 0.85);
        }

        ctx.restore();
      }

      function animateFocusCanvases(now) {
        if (!isFocusVisible) return;
        const t = (now - startTime) * 0.001;

        drawProductionAI(ctxProd, canvasProd.width, canvasProd.height, t);
        drawMultiAgent(ctxAgent, canvasAgent.width, canvasAgent.height, t);
        drawNeuroSymbolic(ctxNeuro, canvasNeuro.width, canvasNeuro.height, t);

        animId = requestAnimationFrame(animateFocusCanvases);
      }
    }
  }
})();
