/* ==========================================================================
   INTERACTIVE SCROLLYTELLING PORTFOLIO — MAIN ENGINE
   High-performance ambient canvas, 3D card tilt, HUD syncing, and simulators
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initHudSync();
  init3DCardTilt();
  initPillarInteractions();
  initTracxoSimulator();
  initExperienceCounters();
  initLightboxModal();
  initContactActions();
});

/* ==========================================================================
   1. AMBIENT PARTICLE CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 22000), 65);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.65 ? '#ff4421' : '#51f2f1'
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse proximity repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        p.x += (dx / dist) * force * 1.5;
        p.y += (dy / dist) * force * 1.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. HUD SCROLL PROGRESS & ACTIVE CHAPTER SYNC
   ========================================================================== */
function initHudSync() {
  const thumb = document.getElementById('hud-scroll-progress');
  const indices = document.querySelectorAll('.hud-idx');
  const chapters = document.querySelectorAll('.chapter-screen');

  function updateScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);

    if (thumb) {
      thumb.style.height = `${progress}%`;
    }

    // Determine active chapter
    let activeId = 'ch-who';
    const viewCenter = scrollTop + window.innerHeight * 0.4;

    chapters.forEach(ch => {
      const top = ch.offsetTop;
      const bottom = top + ch.offsetHeight;
      if (viewCenter >= top && viewCenter < bottom) {
        activeId = ch.id;
      }
    });

    indices.forEach(idx => {
      if (idx.dataset.chapter === activeId) {
        idx.classList.add('active');
      } else {
        idx.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
}

/* ==========================================================================
   3. 3D CURSOR-TRACKING CARD TILT (CHAPTER 01)
   ========================================================================== */
function init3DCardTilt() {
  const wrap = document.getElementById('hero-card-wrap');
  const card = document.getElementById('hero-card-3d');
  const sheen = document.getElementById('card-sheen');
  if (!wrap || !card) return;

  let bounds;

  function updateBounds() {
    bounds = wrap.getBoundingClientRect();
  }

  wrap.addEventListener('mouseenter', updateBounds);
  window.addEventListener('resize', updateBounds);

  wrap.addEventListener('mousemove', (e) => {
    if (!bounds) updateBounds();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

    const rotateY = xPct * 12; // deg
    const rotateX = -yPct * 12; // deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    if (sheen) {
      sheen.style.opacity = '1';
      sheen.style.background = `radial-gradient(circle at ${(mouseX / bounds.width) * 100}% ${(mouseY / bounds.height) * 100}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`;
    }
  });

  wrap.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (sheen) {
      sheen.style.opacity = '0';
    }
  });
}

/* ==========================================================================
   4. PILLAR INTERACTIONS & FLOW PULSE (CHAPTER 02)
   ========================================================================== */
function initPillarInteractions() {
  const pillars = document.querySelectorAll('.pillar-card');
  const pulsePath = document.getElementById('flow-pulse-path');
  const dots = document.querySelectorAll('.flow-node-dot');

  const pillarColors = ['#ff4421', '#51f2f1', '#c4b5fd', '#6bcf8a'];

  pillars.forEach((pillar, idx) => {
    pillar.addEventListener('mouseenter', () => {
      pillars.forEach(p => p.classList.remove('active-node'));
      pillar.classList.add('active-node');

      if (pulsePath) {
        pulsePath.style.stroke = pillarColors[idx] || '#ff4421';
        pulsePath.style.animationDuration = '1.2s';
      }

      dots.forEach((dot, dotIdx) => {
        if (dotIdx === idx) {
          dot.setAttribute('r', '9');
          dot.style.fill = pillarColors[idx];
        } else {
          dot.setAttribute('r', '6');
          dot.style.fill = '#111116';
        }
      });
    });

    pillar.addEventListener('mouseleave', () => {
      pillar.classList.remove('active-node');
      if (pulsePath) {
        pulsePath.style.stroke = '#ff4421';
        pulsePath.style.animationDuration = '3s';
      }
      dots.forEach(dot => {
        dot.setAttribute('r', '6');
        dot.style.fill = '#111116';
      });
    });
  });
}

/* ==========================================================================
   5. TRACXO MULTI-AGENT DISPATCHER SIMULATOR (CHAPTER 03)
   ========================================================================== */
function initTracxoSimulator() {
  const pills = document.querySelectorAll('.sim-pill');
  const terminal = document.getElementById('sim-terminal');
  if (!pills.length || !terminal) return;

  const scenarios = [
    {
      step1: "01. ORCHESTRATOR: Extracted query intent -> [Reconcile seafood invoices vs wastage]",
      step2: "02. TOOL DISPATCH: Dispatched [InvoiceAuditAgent] & [WastageReconciler] via LangGraph",
      step3: "03. EXECUTIVE DECISION: Seafood batch #902 variance $142.80 flagged; draft supplier credit request generated."
    },
    {
      step1: "01. ORCHESTRATOR: Extracted query intent -> [Detect beef unit price SLA spike]",
      step2: "02. TOOL DISPATCH: Querying PostgreSQL price history & supplier SLA contract embeddings",
      step3: "03. EXECUTIVE DECISION: Alert: Prime Ribeye unit price surged +18.4% above agreed SLA. Negotiation note drafted."
    },
    {
      step1: "01. ORCHESTRATOR: Extracted query intent -> [Forecast weekend bar prep pars]",
      step2: "02. TOOL DISPATCH: Correlating POS sales stream with historical Friday/Saturday weather & booking data",
      step3: "03. EXECUTIVE DECISION: Recommended bar inventory prep: 24 bottles Mezcal, 18kg citrus fruit. Pars committed."
    }
  ];

  pills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const data = scenarios[idx];
      terminal.innerHTML = `
        <div class="term-line step-1" style="opacity: 0; transform: translateY(4px); transition: all 0.25s ease;"><span class="term-dim">${data.step1.split(':')[0]}:</span>${data.step1.split(':')[1]}</div>
        <div class="term-line step-2" style="opacity: 0; transform: translateY(4px); transition: all 0.25s ease;"><span class="term-dim">${data.step2.split(':')[0]}:</span>${data.step2.split(':')[1]}</div>
        <div class="term-line step-3 highlight-green" style="opacity: 0; transform: translateY(4px); transition: all 0.25s ease;"><span class="term-dim">${data.step3.split(':')[0]}:</span>${data.step3.split(':')[1]}</div>
      `;

      const lines = terminal.querySelectorAll('.term-line');
      lines.forEach((line, lineIdx) => {
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, lineIdx * 160);
      });
    });
  });
}

/* ==========================================================================
   6. ANIMATED EXPERIENCE COUNTERS (CHAPTER 04)
   ========================================================================== */
function initExperienceCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const rawTarget = el.dataset.target;
    if (!rawTarget) return;

    const isFloat = rawTarget.includes('.');
    const targetVal = parseFloat(rawTarget);
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = targetVal * ease;

      if (isFloat) {
        el.textContent = `${current.toFixed(1)}×`;
      } else if (rawTarget === '81') {
        el.textContent = `+${Math.floor(current)}%`;
      } else if (rawTarget === '50') {
        el.textContent = `${Math.floor(current)}+`;
      } else {
        el.textContent = `${Math.floor(current)}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   7. RESEARCH LIGHTBOX MODAL
   ========================================================================== */
function initLightboxModal() {
  const openBtn = document.getElementById('open-nec-modal');
  const modal = document.getElementById('nec-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  function open() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      close();
    }
  });
}

/* ==========================================================================
   8. CONTACT ACTIONS (COPY EMAIL & RETURN TO TOP)
   ========================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('btn-copy-email');
  const toast = document.getElementById('copy-toast');
  const copyLabel = document.getElementById('copy-btn-label');
  const returnBtn = document.getElementById('btn-return-top');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'ameynarwadkar@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyLabel) copyLabel.textContent = 'COPIED!';
        if (toast) toast.classList.add('show');

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'COPY EMAIL';
          if (toast) toast.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  }

  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
