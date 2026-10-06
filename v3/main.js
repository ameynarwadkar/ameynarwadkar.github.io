/* ==========================================================================
   AMEY NARWADKAR — PORTFOLIO VERSION 3.0 (PROD EDITION)
   Main Interaction & Scrollytelling Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initSlideshowDeck();
  initAmbientCanvas();
  initHudSync();
  init3DCardTilt();
  initArchitecturePipeline();
  initTracxoSimulator();
  initProjectCarousel();
  initExperienceCounters();
  initLightboxModal();
  initContactActions();
});

/* ==========================================================================
   0. SLIDESHOW DECK TRANSITIONS & SMOOTH SCROLL CONTROLLER
   ========================================================================== */
function initSlideshowDeck() {
  const chapters = ['ch-who', 'ch-what', 'ch-done', 'ch-worked', 'ch-studied', 'ch-contact'];
  let currentIdx = 0;
  let isLocked = false;
  let lockTimer = null;

  window.__chapters = chapters;
  window.__currentChapterIdx = 0;

  function updateCurrentFromScroll() {
    if (isLocked) return;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const idx = Math.round(scrollY / vh);
    currentIdx = Math.max(0, Math.min(idx, chapters.length - 1));
    window.__currentChapterIdx = currentIdx;
  }

  window.addEventListener('scroll', updateCurrentFromScroll, { passive: true });

  function goToChapter(index) {
    const targetIdx = Math.max(0, Math.min(index, chapters.length - 1));
    if (targetIdx === currentIdx) {
      isLocked = false;
      return;
    }

    currentIdx = targetIdx;
    window.__currentChapterIdx = currentIdx;
    isLocked = true;
    clearTimeout(lockTimer);

    const targetEl = document.getElementById(chapters[targetIdx]);
    if (targetEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, {
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            isLocked = false;
          }
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isLocked = false;
        }, 600);
      }
    } else {
      isLocked = false;
    }

    lockTimer = setTimeout(() => {
      isLocked = false;
    }, 750);
  }

  window.__goToChapter = goToChapter;

  // 1. Wheel Gesture Interceptor for Slideshow Deck Transition
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth < 960 || window.innerHeight < 650) return;

    // Allow horizontal trackpad swiping inside projects-carousel
    const carousel = document.getElementById('projects-carousel');
    if (carousel && carousel.contains(e.target)) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    }

    if (Math.abs(e.deltaY) < 18) return; // ignore micro-jitters

    e.preventDefault();

    if (isLocked) return;

    if (e.deltaY > 0) {
      if (currentIdx < chapters.length - 1) {
        goToChapter(currentIdx + 1);
      }
    } else if (e.deltaY < 0) {
      if (currentIdx > 0) {
        goToChapter(currentIdx - 1);
      }
    }
  }, { passive: false });

  // 2. Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (window.innerWidth < 960 || window.innerHeight < 650) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      if (currentIdx < chapters.length - 1) {
        e.preventDefault();
        goToChapter(currentIdx + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      if (currentIdx > 0) {
        e.preventDefault();
        goToChapter(currentIdx - 1);
      }
    }
  });

  // 3. Touch Swipes on Mobile / Touchscreens
  let touchStartY = null;
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (touchStartY === null || window.innerWidth < 960 || window.innerHeight < 650) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    touchStartY = null;

    if (Math.abs(deltaY) > 55 && !isLocked) {
      if (deltaY > 0 && currentIdx < chapters.length - 1) {
        goToChapter(currentIdx + 1);
      } else if (deltaY < 0 && currentIdx > 0) {
        goToChapter(currentIdx - 1);
      }
    }
  }, { passive: true });

  // 4. Intercept HUD Chapter Navigation Links
  document.querySelectorAll('a[href^="#ch-"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').replace('#', '');
      const idx = chapters.indexOf(targetId);
      if (idx !== -1) {
        e.preventDefault();
        goToChapter(idx);
      }
    });
  });

  // 5. Return to Top in footer
  const returnBtn = document.getElementById('btn-return-top');
  if (returnBtn) {
    returnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToChapter(0);
    });
  }
}

/* ==========================================================================
   0. LENIS INERTIAL SMOOTH SCROLL ENGINE & MAGNETIC SETTLING
   ========================================================================== */
function initLenisSmoothScroll() {
  if (typeof window.Lenis !== 'function') return;

  const lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    touchMultiplier: 1.2,
    infinite: false,
    autoRaf: false
  });

  window.__lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

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
  const navLinks = document.querySelectorAll('.v3-nav .nav-link');
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

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.style.color = '#fff';
      } else {
        link.style.color = '';
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
  const glow = document.getElementById('hero-card-glow');
  const sheen = document.getElementById('card-sheen');
  if (!wrap || !card) return;

  let bounds;

  function updateBounds() {
    bounds = wrap.getBoundingClientRect();
  }

  wrap.addEventListener('mouseenter', () => {
    updateBounds();
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.35s ease';
    if (glow) glow.style.transition = 'opacity 0.35s ease, filter 0.35s ease';
  });
  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, { passive: true });

  wrap.addEventListener('mousemove', (e) => {
    if (!bounds) updateBounds();
    const mouseX = Math.max(0, Math.min(e.clientX - bounds.left, bounds.width));
    const mouseY = Math.max(0, Math.min(e.clientY - bounds.top, bounds.height));

    const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

    const rotateY = xPct * 12; // deg
    const rotateX = -yPct * 12; // deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    // Behind-the-scenes card glow parallax & coordinate sync
    if (glow) {
      const glowShiftX = (xPct * 20).toFixed(1);
      const glowShiftY = (yPct * 20).toFixed(1);
      const glowRotX = (-yPct * 8).toFixed(1);
      const glowRotY = (xPct * 8).toFixed(1);
      glow.style.transform = `perspective(1000px) rotateX(${glowRotX}deg) rotateY(${glowRotY}deg) translate3d(${glowShiftX}px, ${glowShiftY}px, -20px) scale(1.06)`;

      const pctX = ((mouseX / bounds.width) * 100).toFixed(1);
      const pctY = ((mouseY / bounds.height) * 100).toFixed(1);
      wrap.style.setProperty('--glow-x', `${pctX}%`);
      wrap.style.setProperty('--glow-y', `${pctY}%`);
    }

    if (sheen) {
      sheen.style.opacity = '1';
      sheen.style.background = `radial-gradient(circle at ${(mouseX / bounds.width) * 100}% ${(mouseY / bounds.height) * 100}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`;
    }
  });

  wrap.addEventListener('mouseleave', () => {
    bounds = null;
    card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.35s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glow) {
      glow.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease, filter 0.35s ease';
      glow.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)';
      wrap.style.setProperty('--glow-x', '50%');
      wrap.style.setProperty('--glow-y', '50%');
    }
    if (sheen) {
      sheen.style.opacity = '0';
    }
  });
}

/* ==========================================================================
   4. SYSTEM ARCHITECTURE PIPELINE INTERACTIONS (CHAPTER 02)
   ========================================================================== */
function initArchitecturePipeline() {
  const nodes = document.querySelectorAll('.pipe-card, .pipe-node, .pipe-col');
  const brackets = document.querySelectorAll('.phase-bracket');
  const arrows = document.querySelectorAll('.arrow-pulse');

  // Stage hover highlights corresponding bracket and speeds up pulse
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      nodes.forEach(n => n.classList.remove('active-stage'));
      node.classList.add('active-stage');

      const phaseId = node.dataset.phase;
      brackets.forEach(b => {
        if (b.id === phaseId) {
          b.classList.add('active-bracket');
        } else {
          b.classList.remove('active-bracket');
        }
      });

      arrows.forEach(a => {
        a.style.animationDuration = '0.9s';
      });
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('active-stage');
      brackets.forEach(b => b.classList.remove('active-bracket'));
      arrows.forEach(a => {
        a.style.animationDuration = '1.8s';
      });
    });
  });

  // Bracket hover highlights all matching stages
  brackets.forEach(bracket => {
    bracket.addEventListener('mouseenter', () => {
      bracket.classList.add('active-bracket');
      nodes.forEach(n => {
        if (n.dataset.phase === bracket.id) {
          n.classList.add('active-stage');
        }
      });
    });

    bracket.addEventListener('mouseleave', () => {
      bracket.classList.remove('active-bracket');
      nodes.forEach(n => n.classList.remove('active-stage'));
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
   5b. CHAPTER 03 HORIZONTAL PROJECT CAROUSEL CONTROLLER
   ========================================================================== */
function initProjectCarousel() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('project-prev-btn');
  const nextBtn = document.getElementById('project-next-btn');
  const counter = document.getElementById('project-carousel-counter');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.showcase-card, .project-card');
  const total = cards.length;
  if (!total) return;

  function getActiveIndex() {
    const scrollLeft = carousel.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const distance = Math.abs(card.offsetLeft - carousel.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    return closestIndex;
  }

  function updateState(idx) {
    if (counter) counter.innerText = `PROJECT 0${idx + 1} / 0${total}`;
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === total - 1;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function scrollToCard(idx) {
    if (idx >= 0 && idx < total) {
      const targetLeft = cards[idx].offsetLeft - carousel.offsetLeft;
      carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
      updateState(idx);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = getActiveIndex();
      if (idx > 0) scrollToCard(idx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = getActiveIndex();
      if (idx < total - 1) scrollToCard(idx + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      scrollToCard(idx);
    });
  });

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateState(getActiveIndex());
    }, 40);
  }, { passive: true });

  // Keyboard navigation when Chapter 03 is in view
  window.addEventListener('keydown', (e) => {
    const chDone = document.getElementById('ch-done');
    if (!chDone) return;
    const r = chDone.getBoundingClientRect();
    const inView = r.top <= window.innerHeight * 0.6 && r.bottom >= window.innerHeight * 0.4;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      const idx = getActiveIndex();
      if (idx < total - 1) {
        e.preventDefault();
        scrollToCard(idx + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      const idx = getActiveIndex();
      if (idx > 0) {
        e.preventDefault();
        scrollToCard(idx - 1);
      }
    }
  });

  updateState(0);
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
      if (window.__lenis) {
        window.__lenis.scrollTo(0, {
          duration: 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
