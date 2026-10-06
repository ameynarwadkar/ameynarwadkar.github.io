/* ==========================================================================
   AMEY NARWADKAR — PORTFOLIO VERSION 3.0 (PROD EDITION)
   Main Interaction & Scrollytelling Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initAnchorNav();
  initAmbientCanvas();
  initHudSync();
  init3DCardTilt();
  initArchitecturePipeline();
  initProjectCarousel();
  initExperienceCounters();
  initLightboxModal();
  initContactActions();
});

/* ==========================================================================
   0. LENIS INERTIAL SMOOTH SCROLL ENGINE
   ========================================================================== */
function initLenisSmoothScroll() {
  if (typeof window.Lenis !== 'function') return;

  const lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1.0,
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
   0. SMOOTH ANCHOR NAVIGATION & LENIS BRIDGE
   ========================================================================== */
function initAnchorNav() {
  const chapters = ['ch-who', 'ch-what', 'ch-done', 'ch-worked', 'ch-studied', 'ch-contact'];
  window.__chapters = chapters;

  function scrollToTarget(target) {
    let targetEl = null;
    if (typeof target === 'string') {
      const cleanId = target.replace('#', '');
      targetEl = document.getElementById(cleanId);
    } else if (typeof target === 'number') {
      const id = chapters[Math.max(0, Math.min(target, chapters.length - 1))];
      targetEl = document.getElementById(id);
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    }

    if (!targetEl) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetEl, {
        offset: 0,
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.__goToChapter = scrollToTarget;

  // Intercept all hash anchor clicks for buttery-smooth Lenis glides
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#' || hash.length < 2) return;
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        scrollToTarget(targetEl);
      }
    });
  });
}

/* ==========================================================================
   1. DEEP OUTER SPACE AMBIENT CANVAS (STARFIELD, NEBULAE & METEORS)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = 1;
  let stars = [];
  let shootingStars = [];
  let lastShootingStarTime = performance.now();
  let nextShootingStarDelay = 3500 + Math.random() * 3000;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = window.scrollY || 0;
  let lerpedScrollY = scrollY;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Real astronomical spectral star colors
  const STAR_PALETTES = [
    { r: 255, g: 255, b: 255 }, // Pure White
    { r: 224, g: 242, b: 254 }, // Blue-White (Type O/B)
    { r: 219, g: 234, b: 254 }, // Ice Diamond (Type A)
    { r: 254, g: 243, b: 199 }, // Pale Gold (Type G)
    { r: 255, g: 237, b: 213 }, // Warm Amber (Type K)
    { r: 255, g: 105, b: 77 },  // Cosmic Sunset Coral (#ff694d)
    { r: 255, g: 133, b: 108 }, // Soft Stardust (#ff856c)
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createStarfield();
  }

  function createStarfield() {
    stars = [];
    // Responsive star count scaled by viewport area
    const totalStars = Math.min(Math.max(Math.floor((width * height) / 4600), 180), 340);

    for (let i = 0; i < totalStars; i++) {
      const rand = Math.random();
      let tier, radius, baseAlpha, twinkleSpeed, twinkleAmp, parallax, hasSpikes = false;
      const palette = STAR_PALETTES[Math.floor(Math.random() * STAR_PALETTES.length)];

      if (rand < 0.72) {
        // Tier 1: Distant Deep-Space Field (72%)
        tier = 1;
        radius = Math.random() * 0.55 + 0.35; // 0.35 - 0.90px
        baseAlpha = Math.random() * 0.45 + 0.20;
        twinkleSpeed = Math.random() * 0.0018 + 0.0006;
        twinkleAmp = Math.random() * 0.20 + 0.08;
        parallax = 0.008;
      } else if (rand < 0.95) {
        // Tier 2: Mid-ground Scintillating Stars (23%)
        tier = 2;
        radius = Math.random() * 0.75 + 0.95; // 0.95 - 1.70px
        baseAlpha = Math.random() * 0.35 + 0.55;
        twinkleSpeed = Math.random() * 0.0035 + 0.0015;
        twinkleAmp = Math.random() * 0.30 + 0.15;
        parallax = 0.022;
      } else {
        // Tier 3: Major Anchor Stars with Diffraction Spikes (5%)
        tier = 3;
        radius = Math.random() * 0.7 + 1.8; // 1.8 - 2.5px
        baseAlpha = Math.random() * 0.2 + 0.78;
        twinkleSpeed = Math.random() * 0.0025 + 0.0012;
        twinkleAmp = Math.random() * 0.18 + 0.10;
        parallax = 0.040;
        hasSpikes = true;
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.035,
        vy: (Math.random() - 0.5) * 0.035,
        tier,
        radius,
        baseAlpha,
        twinkleSpeed,
        twinkleAmp,
        phase: Math.random() * Math.PI * 2,
        parallax,
        hasSpikes,
        spikeLength: Math.random() * 7 + 8, // 8 - 15px
        color: palette
      });
    }
  }

  // Meteor / Shooting Star generator
  function spawnShootingStar() {
    if (prefersReducedMotion || shootingStars.length >= 2) return;
    
    // Start anywhere along the top 45% or upper corners
    const startX = Math.random() * (width * 1.1) - width * 0.05;
    const startY = Math.random() * (height * 0.4);
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.32; // ~40° - 50° downward streak
    const speed = Math.random() * 7 + 13; // 13 - 20 px/frame
    const length = Math.random() * 70 + 90; // 90 - 160px tail
    const isOrange = Math.random() > 0.45; // 55% tint to warm stardust #ff694d

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length,
      angle,
      speed,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.018, // ~45-55 frames duration
      isOrange
    });
  }

  // Draw 4-point space diffraction spikes on bright major stars
  function drawSpikes(x, y, len, alpha, color) {
    ctx.save();
    ctx.lineWidth = 0.75;

    // Horizontal ray with soft linear fade
    const hGrad = ctx.createLinearGradient(x - len, y, x + len, y);
    hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    hGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.85})`);
    hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = hGrad;
    ctx.beginPath();
    ctx.moveTo(x - len, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();

    // Vertical ray with soft linear fade
    const vGrad = ctx.createLinearGradient(x, y - len, x, y + len);
    vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    vGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.85})`);
    vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = vGrad;
    ctx.beginPath();
    ctx.moveTo(x, y - len);
    ctx.lineTo(x, y + len);
    ctx.stroke();

    ctx.restore();
  }

  // Draw deep space cosmic dust nebulae clouds
  function drawNebulae(time) {
    // Nebula 1: Deep cosmic violet (top-right)
    const n1x = width * 0.75 + Math.sin(time * 0.0003) * 35;
    const n1y = height * 0.22 + Math.cos(time * 0.00025) * 25;
    const n1r = Math.min(width, height) * 0.52;
    const g1 = ctx.createRadialGradient(n1x, n1y, 0, n1x, n1y, n1r);
    g1.addColorStop(0, 'rgba(76, 29, 149, 0.055)');
    g1.addColorStop(0.5, 'rgba(49, 46, 129, 0.025)');
    g1.addColorStop(1, 'rgba(6, 5, 10, 0)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.arc(n1x, n1y, n1r, 0, Math.PI * 2);
    ctx.fill();

    // Nebula 2: Warm stardust amber / #ff694d (mid-left)
    const n2x = width * 0.18 + Math.cos(time * 0.00028) * 30;
    const n2y = height * 0.55 + Math.sin(time * 0.00032) * 25;
    const n2r = Math.min(width, height) * 0.46;
    const g2 = ctx.createRadialGradient(n2x, n2y, 0, n2x, n2y, n2r);
    g2.addColorStop(0, 'rgba(255, 105, 77, 0.040)');
    g2.addColorStop(0.5, 'rgba(184, 58, 34, 0.015)');
    g2.addColorStop(1, 'rgba(6, 5, 10, 0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(n2x, n2y, n2r, 0, Math.PI * 2);
    ctx.fill();

    // Nebula 3: Midnight nebula indigo (bottom-right)
    const n3x = width * 0.68 + Math.sin(time * 0.0002) * 25;
    const n3y = height * 0.85 + Math.cos(time * 0.00022) * 20;
    const n3r = Math.min(width, height) * 0.50;
    const g3 = ctx.createRadialGradient(n3x, n3y, 0, n3x, n3y, n3r);
    g3.addColorStop(0, 'rgba(30, 27, 75, 0.065)');
    g3.addColorStop(0.6, 'rgba(15, 23, 42, 0.02)');
    g3.addColorStop(1, 'rgba(6, 5, 10, 0)');
    ctx.fillStyle = g3;
    ctx.beginPath();
    ctx.arc(n3x, n3y, n3r, 0, Math.PI * 2);
    ctx.fill();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX - width / 2;
    mouse.targetY = e.clientY - height / 2;
  });
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || 0;
  }, { passive: true });

  resize();

  function animate(now) {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse & scroll lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;
    lerpedScrollY += (scrollY - lerpedScrollY) * 0.06;

    // 1. Draw atmospheric cosmic nebulae
    drawNebulae(now);

    // 2. Render Starfield
    for (let i = 0; i < stars.length; i++) {
      const p = stars[i];

      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;
      }

      // Parallax calculations (mouse + subtle vertical scroll travel)
      const renderX = p.x + (mouse.x * p.parallax);
      const renderY = ((p.y - (lerpedScrollY * p.parallax * 0.4)) % height + height) % height;

      // Realistic twinkle calculation with individual period & amplitude
      const twinkle = Math.sin(now * p.twinkleSpeed + p.phase) * p.twinkleAmp;
      const alpha = Math.min(Math.max(p.baseAlpha + twinkle, 0.05), 1);
      const { r, g, b } = p.color;

      // Tier 3: Anchor stars with soft halo & diffraction spikes
      if (p.hasSpikes) {
        // Soft outer corona glow
        const glowRad = p.radius * 4.5;
        const corona = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, glowRad);
        corona.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
        corona.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = corona;
        ctx.beginPath();
        ctx.arc(renderX, renderY, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // 4-point space diffraction spikes
        drawSpikes(renderX, renderY, p.spikeLength, alpha, p.color);
      } else if (p.tier === 2 && alpha > 0.65) {
        // Mid-ground star subtle corona when twinkling bright
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.12})`;
        ctx.fill();
      }

      // Star core pinpoint
      ctx.beginPath();
      ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }

    // 3. Render Shooting Stars / Meteors
    if (!prefersReducedMotion) {
      if (now - lastShootingStarTime > nextShootingStarDelay) {
        spawnShootingStar();
        lastShootingStarTime = now;
        nextShootingStarDelay = 3800 + Math.random() * 4200; // Next in 3.8 - 8s
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const star = shootingStars[s];
        star.x += star.vx;
        star.y += star.vy;
        star.life -= star.decay;

        if (star.life <= 0 || star.x < -100 || star.x > width + 100 || star.y > height + 100) {
          shootingStars.splice(s, 1);
          continue;
        }

        // Tail endpoint
        const tailX = star.x - Math.cos(star.angle) * (star.length * star.life);
        const tailY = star.y - Math.sin(star.angle) * (star.length * star.life);

        // Meteor trail gradient
        const trail = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        if (star.isOrange) {
          trail.addColorStop(0, `rgba(255, 255, 255, ${0.95 * star.life})`);
          trail.addColorStop(0.15, `rgba(255, 105, 77, ${0.85 * star.life})`);
          trail.addColorStop(0.6, `rgba(255, 133, 108, ${0.35 * star.life})`);
          trail.addColorStop(1, 'rgba(255, 105, 77, 0)');
        } else {
          trail.addColorStop(0, `rgba(255, 255, 255, ${0.95 * star.life})`);
          trail.addColorStop(0.2, `rgba(186, 230, 253, ${0.80 * star.life})`);
          trail.addColorStop(0.7, `rgba(147, 197, 253, ${0.30 * star.life})`);
          trail.addColorStop(1, 'rgba(147, 197, 253, 0)');
        }

        ctx.save();
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.4 * star.life;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Meteor glowing head pinpoint
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.shadowColor = star.isOrange ? '#ff694d' : '#bae6fd';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
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
        link.style.color = '#ff694d';
      } else {
        link.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  if (window.__lenis) {
    window.__lenis.on('scroll', updateScroll);
  }
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
      sheen.style.background = `radial-gradient(circle at ${(mouseX / bounds.width) * 100}% ${(mouseY / bounds.height) * 100}%, rgba(245, 240, 232, 0.18) 0%, transparent 60%)`;
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
   5. CHAPTER 03 SCROLL-DRIVEN HORIZONTAL SHOWCASE CONTROLLER
   ========================================================================== */
function initProjectCarousel() {
  const section = document.getElementById('ch-done');
  const track = document.getElementById('horizontal-projects-track');
  const trackWindow = document.getElementById('horizontal-track-window');
  const cards = document.querySelectorAll('.horizontal-projects-track .project-card');
  const counter = document.getElementById('project-carousel-counter');
  const prevBtn = document.getElementById('project-prev-btn');
  const nextBtn = document.getElementById('project-next-btn');
  const dots = document.querySelectorAll('#project-carousel-dots .carousel-dot');

  if (!section || !track || !cards.length) return;

  const total = cards.length;
  let activeIndex = 0;

  function updateHorizontalScroll() {
    if (window.innerWidth <= 960) {
      track.style.transform = '';
      return;
    }

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollDistance = sectionHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    const scrollTop = window.scrollY;
    const relScroll = scrollTop - sectionTop;
    const progress = Math.max(0, Math.min(1, relScroll / scrollDistance));

    // Calculate maximum horizontal travel distance
    const maxTranslate = Math.max(0, track.scrollWidth - trackWindow.clientWidth);
    const currentTranslate = progress * maxTranslate;

    track.style.transform = `translate3d(-${currentTranslate.toFixed(2)}px, 0, 0)`;

    // Determine active index based on progress
    let newIdx = 0;
    if (progress >= 0.65) {
      newIdx = 2;
    } else if (progress >= 0.28) {
      newIdx = 1;
    } else {
      newIdx = 0;
    }

    if (newIdx !== activeIndex || !cards[0].classList.contains('active-card')) {
      activeIndex = newIdx;
      cards.forEach((c, i) => {
        c.classList.toggle('active-card', i === activeIndex);
      });
      if (counter) counter.innerText = `PROJECT 0${activeIndex + 1} / 0${total}`;
      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === total - 1;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIndex);
      });
    }
  }

  // Smooth scroll to project at index i
  function scrollToProject(idx) {
    const targetIdx = Math.max(0, Math.min(idx, total - 1));
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollDistance = sectionHeight - window.innerHeight;
    const targetProgress = targetIdx / (total - 1);
    const targetY = sectionTop + targetProgress * scrollDistance;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 0.95 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeIndex > 0) scrollToProject(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeIndex < total - 1) scrollToProject(activeIndex + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      scrollToProject(idx);
    });
  });

  window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
  if (window.__lenis) {
    window.__lenis.on('scroll', updateHorizontalScroll);
  }
  window.addEventListener('resize', updateHorizontalScroll);

  // Keyboard navigation when Chapter 03 is in view
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    const r = section.getBoundingClientRect();
    const inView = r.top <= window.innerHeight * 0.4 && r.bottom >= window.innerHeight * 0.6;
    if (!inView) return;

    if (e.key === 'ArrowRight' && activeIndex < total - 1) {
      e.preventDefault();
      scrollToProject(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
      e.preventDefault();
      scrollToProject(activeIndex - 1);
    }
  });

  updateHorizontalScroll();
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
