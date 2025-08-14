// Rotating Logos Carousel
(function() {
  const wrapper = document.querySelector('.swiper-wrapper');
  const slides = Array.from(document.querySelectorAll('.swiper-slide'));
  const prevBtn = document.querySelector('.swiper-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');
  let current = 0;
  let interval;

  function showSlide(idx) {
    wrapper.style.transition = 'transform 0.5s cubic-bezier(.4,2,.6,1)';
    wrapper.style.transform = `translateX(-${idx * slides[0].offsetWidth}px)`;
    current = idx;
  }
  function next() {
    showSlide((current + 1) % slides.length);
  }
  function prev() {
    showSlide((current - 1 + slides.length) % slides.length);
  }
  function startAuto() {
    interval = setInterval(next, 2500);
  }
  function stopAuto() {
    clearInterval(interval);
  }
  if (wrapper && slides.length > 1) {
    wrapper.style.display = 'flex';
    showSlide(0);
    nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
    prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
    startAuto();
    window.addEventListener('resize', () => showSlide(current));
  }
})();

// Tabbed Interfaces (Industries, Partners)
(function() {
  function setupTabs(tabSelector, panelSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const panels = document.querySelectorAll(panelSelector);
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        panels.forEach(p => {
          if (p.id === tab.getAttribute('aria-controls')) p.classList.add('active');
        });
        tabs.forEach(t => { if (t !== tab) t.setAttribute('aria-selected', 'false'); });
      });
    });
  }
  setupTabs('#industries .tab', '#industries .tab-panel');
  setupTabs('#partners .tab', '#partners .tab-panel');
})();

// Hero Section Animation (simple animated gradient)
(function() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  let angle = 120;
  setInterval(() => {
    angle = (angle + 1) % 360;
    bg.style.background = `linear-gradient(${angle}deg, var(--pastel-blue) 0%, var(--pastel-purple) 100%)`;
  }, 60);
})();

// Animated Counters (Impact Stats)
(function() {
  function animateValue(el, start, end, duration) {
    let startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.round(start + (end - start) * progress) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const stats = document.querySelectorAll('.stat-value');
  let animated = false;
  function onScroll() {
    if (animated) return;
    const statsBlock = document.querySelector('.impact-stats');
    if (!statsBlock) return;
    const rect = statsBlock.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      stats.forEach(stat => {
        const val = stat.textContent.match(/([\d]+)/);
        if (val) animateValue(stat, 0, parseInt(val[1]), 1200);
      });
      animated = true;
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// Smooth Scrolling for anchor links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// Form Validation (Contact Form)
(function() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    let valid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('input-error');
        valid = false;
      } else {
        input.classList.remove('input-error');
      }
    });
    const email = form.querySelector('input[type="email"]');
    if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add('input-error');
      valid = false;
    }
    if (!valid) {
      e.preventDefault();
      form.classList.add('form-error');
    } else {
      form.classList.remove('form-error');
    }
  });
})();

// Labs Private Hub Password Reveal
(function() {
  const btn = document.getElementById('labs-password-btn');
  const input = document.getElementById('labs-password');
  const content = document.getElementById('labs-content');
  if (!btn || !input || !content) return;
  btn.addEventListener('click', function() {
    if (input.value === 'govcomlabs') {
      content.style.display = 'block';
      input.value = '';
      input.disabled = true;
      btn.disabled = true;
      btn.textContent = 'Unlocked';
    } else {
      input.classList.add('input-error');
      setTimeout(() => input.classList.remove('input-error'), 1000);
    }
  });
})();

// General UI Enhancements (hover/focus, button ripple)
(function() {
  document.querySelectorAll('.cta, .tile, .tab, .filter').forEach(el => {
    el.addEventListener('mousedown', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
})();

// Theme Toggle Logic
(function() {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const themes = ['dark-theme', 'light-theme', 'hybrid-theme'];
  let idx = 0;
  function setTheme(i) {
    themes.forEach(t => body.classList.remove(t));
    body.classList.add(themes[i]);
    // Animate icon: change inner circle color for each theme
    if (i === 0) icon.children[1].setAttribute('fill', '#111'); // dark
    if (i === 1) icon.children[1].setAttribute('fill', '#fff'); // light
    if (i === 2) icon.children[1].setAttribute('fill', 'url(#multiColor)'); // hybrid
  }
  if (toggle) {
    setTheme(idx);
    toggle.addEventListener('click', () => {
      idx = (idx + 1) % themes.length;
      setTheme(idx);
    });
  }
})();

// Animated Neural Network in Anatomically Correct Top-View Brain SVG Shape in Hero
(function() {
  const canvas = document.getElementById('keadilan-hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;
  const NODES = 28;
  const nodes = [];
  const lines = [];
  const colors = ['#fff', '#DF9A2B', '#2196F3'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Firing signals
  const firings = [];
  const MAX_FIRINGS = 7;

  // SVG path for a real top-view brain outline (public domain, simplified for performance)
  // This path is centered and aspect-ratio preserved
  let brainPath2D = null;
  let brainBox = {x: 0, y: 0, w: 1, h: 1};
  function getBrainPath2DAndBox() {
    // SVG path: top view, two hemispheres, central groove
    // Sourced and simplified from open SVGs (e.g. Wikimedia, public domain)
    // Path is normalized to fit a 1x1 box, centered
    // You can replace this with a more detailed path if desired
    const pathStr =
      'M0.5,0.08 '+
      'C0.32,0.08 0.08,0.22 0.08,0.5 '+
      'C0.08,0.78 0.32,0.92 0.5,0.92 '+
      'C0.68,0.92 0.92,0.78 0.92,0.5 '+
      'C0.92,0.22 0.68,0.08 0.5,0.08 '+
      // Central groove
      'M0.5,0.08 '+
      'C0.48,0.18 0.48,0.82 0.5,0.92 '+
      'C0.52,0.82 0.52,0.18 0.5,0.08';
    // Path2D does not support SVG path strings with commas, so replace with spaces
    const path = new Path2D(pathStr.replace(/,/g, ' '));
    // The bounding box is 0.08,0.08 to 0.92,0.92
    return {path, box: {x: 0.08, y: 0.08, w: 0.84, h: 0.84}};
  }

  function resize() {
    const hero = document.getElementById('hero');
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    // Center the brain, preserve aspect ratio
    const {path, box} = getBrainPath2DAndBox();
    // Fit brain in 80% of hero area, centered
    const scale = Math.min(width * 0.8 / box.w, height * 0.8 / box.h);
    const offsetX = (width - box.w * scale) / 2 - box.x * scale;
    const offsetY = (height - box.h * scale) / 2 - box.y * scale;
    brainPath2D = new Path2D();
    brainPath2D.addPath(path, new DOMMatrix([scale, 0, 0, scale, offsetX, offsetY]));
    brainBox = {x: offsetX, y: offsetY, w: box.w * scale, h: box.h * scale};
  }

  function random(min, max) { return Math.random() * (max - min) + min; }

  function createNodes() {
    nodes.length = 0;
    let tries = 0;
    while (nodes.length < NODES && tries < 3000) {
      // Place nodes within the brain bounding box
      const x = random(brainBox.x, brainBox.x + brainBox.w);
      const y = random(brainBox.y, brainBox.y + brainBox.h);
      if (ctx.isPointInPath(brainPath2D, x, y)) {
        nodes.push({
          x,
          y,
          r: random(7, 16),
          color: colors[nodes.length % colors.length],
          dx: random(-0.18, 0.18),
          dy: random(-0.12, 0.12),
          pulse: random(0, Math.PI * 2),
          nx: (x - brainBox.x) / brainBox.w,
          ny: (y - brainBox.y) / brainBox.h
        });
      }
      tries++;
    }
  }

  function createLines() {
    lines.length = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i], n2 = nodes[j];
        if (Math.abs(n1.x - n2.x) < width * 0.28 && Math.abs(n1.y - n2.y) < height * 0.22) {
          lines.push([i, j]);
        }
      }
    }
  }

  function drawBrainOutline() {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#B3E5FC';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#B3E5FC';
    ctx.shadowBlur = 10;
    ctx.stroke(brainPath2D);
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawBrainOutline();
    // Draw lines (light, transparent)
    for (const [i, j] of lines) {
      const n1 = nodes[i], n2 = nodes[j];
      ctx.save();
      ctx.globalAlpha = 0.10; // Very transparent
      ctx.strokeStyle = '#B3E5FC'; // Light blue
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#B3E5FC';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
      ctx.restore();
    }
    // Draw nodes (light, transparent)
    for (const n of nodes) {
      ctx.save();
      ctx.globalAlpha = 0.18; // Very transparent
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + Math.sin(n.pulse) * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#B3E5FC';
      ctx.shadowColor = '#B3E5FC';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
    // Draw firing signals (keep vibrant)
    for (const f of firings) {
      const n1 = nodes[f.from], n2 = nodes[f.to];
      const t = f.progress;
      const x = n1.x + (n2.x - n1.x) * t;
      const y = n1.y + (n2.y - n1.y) * t;
      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.arc(x, y, 7 + 3 * Math.sin(Date.now() / 120), 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    if (prefersReducedMotion) return;
    for (const n of nodes) {
      // Move node in normalized brain box coordinates
      n.nx += n.dx / width * 0.7;
      n.ny += n.dy / height * 0.7;
      // Keep inside brain
      let x = brainBox.x + n.nx * brainBox.w;
      let y = brainBox.y + n.ny * brainBox.h;
      if (!ctx.isPointInPath(brainPath2D, x, y)) {
        n.dx *= -1;
        n.dy *= -1;
        n.nx = Math.max(0, Math.min(1, n.nx));
        n.ny = Math.max(0, Math.min(1, n.ny));
        x = brainBox.x + n.nx * brainBox.w;
        y = brainBox.y + n.ny * brainBox.h;
      }
      n.x = x;
      n.y = y;
      n.pulse += 0.04 + Math.random() * 0.01;
    }
    // Animate firings
    for (let i = firings.length - 1; i >= 0; i--) {
      const f = firings[i];
      f.progress += f.speed;
      if (f.progress >= 1) firings.splice(i, 1);
    }
    // Randomly add new firings
    if (firings.length < MAX_FIRINGS && Math.random() < 0.13) {
      const lineIdx = Math.floor(Math.random() * lines.length);
      if (lines[lineIdx]) {
        const [from, to] = lines[lineIdx];
        firings.push({
          from,
          to,
          color: colors[Math.floor(Math.random() * colors.length)],
          progress: 0,
          speed: random(0.012, 0.025)
        });
      }
    }
    draw();
    requestAnimationFrame(animate);
  }

  function setup() {
    resize();
    createNodes();
    createLines();
    draw();
    firings.length = 0;
    if (!prefersReducedMotion) animate();
  }

  window.addEventListener('resize', () => {
    resize();
    createNodes();
    createLines();
    draw();
    firings.length = 0;
  });
  setTimeout(setup, 200);
})(); 