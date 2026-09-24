/**
 * @file script.js
 * @description MOHAMMAD FAIZAN ALAM - ULTRA-FUTURISTIC PORTFOLIO (2035 SYSTEM)
 * Pure Vanilla JavaScript (No React, No jQuery, No Three.js, No External Libraries)
 */

(function () {
  'use strict';

  /* Ensure window.fetch has both getter and setter in iframe environments */
  try {
    var _origFetch = window.fetch;
    var _activeFetch = _origFetch ? function() { return _origFetch.apply(window, arguments); } : undefined;
    var fetchDesc = {
      get: function() { return _activeFetch; },
      set: function(fn) { _activeFetch = fn; },
      configurable: true,
      enumerable: true
    };
    try { Object.defineProperty(window, 'fetch', fetchDesc); } catch (e) {}
    try {
      if (typeof Window !== 'undefined' && Window.prototype) {
        Object.defineProperty(Window.prototype, 'fetch', fetchDesc);
      }
    } catch (e) {}
  } catch (e) {}

  /* ==========================================================================
     1. WEB AUDIO API SOUND SYNTHESIZER (VANILLA SCI-FI SFX)
     ========================================================================== */
  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.initialized = true;
          this.enabled = true;
        }
      } catch (e) {
        console.warn('Web Audio not supported or blocked');
      }
    }

    toggle() {
      if (!this.initialized) this.init();
      this.enabled = !this.enabled;
      if (this.enabled && this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.enabled;
    }

    playHover() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
      } catch (e) {}
    }

    playTransmit() {
      if (!this.enabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        for (let i = 0; i < 4; i++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(400 + i * 220, now + i * 0.08);
          gain.gain.setValueAtTime(0.04, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.08);
        }
      } catch (e) {}
    }
  }

  const soundSystem = new CyberAudio();

  /* ==========================================================================
     2. CINEMATIC BOOT SEQUENCE
     ========================================================================== */
  function initBootSequence() {
    const loader = document.getElementById('boot-loader');
    const fill = document.getElementById('boot-progress-fill');
    const percentEl = document.getElementById('boot-percent-num');
    const hexEl = document.getElementById('boot-hex-num');
    const logContainer = document.getElementById('boot-console-logs');
    const skipBtn = document.getElementById('boot-skip-btn');

    if (!loader) return;

    const messages = [
      '>> INITIALIZING KERNEL 2035.SYS...',
      '>> MOUNTING NEURAL ACCELERATORS...',
      '>> VERIFYING HOLOGRAPHIC PIPELINE [OK]',
      '>> CONNECTING HIGH-FREQ DATA NODES...',
      '>> IDENTITY VERIFIED: MOHAMMAD FAIZAN ALAM',
      '>> SYSTEM ALLOCATION: COMPLETE // READY'
    ];

    let progress = 0;
    let msgIndex = 0;
    let bootDone = false;

    function finishBoot() {
      if (bootDone) return;
      bootDone = true;
      loader.classList.add('boot-complete');
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 900);
    }

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress > 100) progress = 100;

      if (fill) fill.style.width = progress + '%';
      if (percentEl) percentEl.textContent = progress + '%';
      if (hexEl) hexEl.textContent = '0x' + Math.floor((progress / 100) * 65535).toString(16).toUpperCase().padStart(4, '0');

      // Post messages sequentially
      if (progress > (msgIndex + 1) * 16 && msgIndex < messages.length) {
        if (logContainer) {
          const line = document.createElement('div');
          line.className = 'boot-log-line active';
          line.textContent = messages[msgIndex];
          logContainer.appendChild(line);
          logContainer.scrollTop = logContainer.scrollHeight;
        }
        msgIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(finishBoot, 400);
      }
    }, 45);

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearInterval(interval);
        finishBoot();
      });
    }

    // Safety fallback
    setTimeout(() => {
      if (!bootDone) finishBoot();
    }, 2800);
  }

  /* ==========================================================================
     3. HIGH-PERFORMANCE CANVAS BACKGROUND (PARTICLES + DIGITAL PERSPECTIVE GRID)
     ========================================================================== */
  function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });

    // Particle class
    const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 14), 110);
    let particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = -(Math.random() * 0.8 + 0.3);
        this.radius = Math.random() * 1.8 + 0.8;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        this.colorType = Math.random() > 0.3 ? 'cyan' : 'purple';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction repulsion/glow
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x += (dx / dist) * force * 2.5;
          this.y += (dy / dist) * force * 2.5;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          this.colorType === 'cyan'
            ? `rgba(0, 240, 255, ${this.baseAlpha})`
            : `rgba(139, 61, 255, ${this.baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.colorType === 'cyan' ? '#00f0ff' : '#8b3dff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Perspective floor grid parameters
    let gridOffset = 0;

    function drawDigitalGrid() {
      const horizonY = height * 0.52;
      const fov = 300;

      ctx.save();
      // Gradient fade to horizon
      const horizonGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      horizonGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      horizonGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.05)');
      horizonGrad.addColorStop(1, 'rgba(139, 61, 255, 0.12)');

      // Moving horizontal lines
      gridOffset = (gridOffset + 0.6) % 40;
      ctx.lineWidth = 1;

      for (let y = gridOffset; y < height - horizonY; y += 38) {
        // Perspective curve
        const py = horizonY + (y * y) / (height - horizonY);
        if (py > height) break;
        const alpha = Math.min((py - horizonY) / (height - horizonY), 0.22);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Converging perspective lines from horizon center
      const centerX = width * 0.5 + (mouseX - width * 0.5) * 0.05;
      const numRays = 18;
      for (let i = -numRays; i <= numRays; i++) {
        const targetX = centerX + i * (width / (numRays * 0.7));
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(centerX, horizonY);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawConnections() {
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      // Smooth lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw digital perspective floor
      drawDigitalGrid();

      // Update & draw particle network
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawConnections();

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================================================================
     4. ADVANCED CURSOR SYSTEM
     ========================================================================== */
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const label = document.getElementById('cursor-label');
    const ambientLight = document.getElementById('cursor-ambient');
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (ambientLight) {
        ambientLight.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive target detection
    function setCursorMode(mode, text = '') {
      document.body.classList.remove('cursor-hover-target', 'cursor-hover-view', 'cursor-hover-open');
      if (mode) document.body.classList.add(`cursor-hover-${mode}`);
      if (label) label.textContent = text;
    }

    // Target buttons
    document.querySelectorAll('button, .cyber-btn, .hud-connect-btn, .terminal-submit-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        setCursorMode('target', 'TARGET');
        soundSystem.playHover();
      });
      el.addEventListener('mouseleave', () => setCursorMode(''));
    });

    // Project cards
    document.querySelectorAll('.project-card-3d').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        setCursorMode('view', 'VIEW');
        soundSystem.playHover();
      });
      el.addEventListener('mouseleave', () => setCursorMode(''));
    });

    // Links & nav items
    document.querySelectorAll('a, .hud-nav-link, .social-hud-circle').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        setCursorMode('open', 'OPEN');
        soundSystem.playHover();
      });
      el.addEventListener('mouseleave', () => setCursorMode(''));
    });

    // Global click sound
    window.addEventListener('click', (e) => {
      if (e.target.closest('button, a, .cyber-btn, .filter-btn')) {
        soundSystem.playClick();
      }
    });
  }

  /* ==========================================================================
     5. MAGNETIC BUTTON PHYSICS & RIPPLES
     ========================================================================== */
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.cyber-btn, .hud-connect-btn, .social-hud-circle');

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.35;
        const deltaY = (e.clientY - centerY) * 0.35;

        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
      });

      // Click ripple wave
      el.addEventListener('click', (e) => {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ==========================================================================
     6. HERO 3D HOLOGRAPHIC REACTOR TILT (PURE CSS/JS)
     ========================================================================== */
  function initReactorTilt() {
    const viewport = document.querySelector('.reactor-viewport');
    const heroSection = document.querySelector('.hero-section');
    if (!viewport || !heroSection) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = x * 28;
      targetRotX = -y * 28;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });

    function updateTilt() {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      viewport.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      requestAnimationFrame(updateTilt);
    }
    requestAnimationFrame(updateTilt);
  }

  /* ==========================================================================
     7. DYNAMIC TYPING / TYPEWRITER EFFECT
     ========================================================================== */
  function initTypewriter() {
    const target = document.getElementById('hero-typewriter');
    if (!target) return;

    const phrases = [
      'SOFTWARE DEVELOPER',
      'CREATIVE CODER',
      'AI ENTHUSIAST',
      'PROBLEM SOLVER',
      'TECH EXPLORER'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 100;

    function tick() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        target.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        delay = 45;
      } else {
        target.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        delay = 95;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  /* ==========================================================================
     8. HACKER TEXT SCRAMBLE EFFECT
     ========================================================================== */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________0101';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color:var(--cyan);text-shadow:0 0 8px var(--cyan);">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  function initScrambleHeadings() {
    const headings = document.querySelectorAll('.scramble-target');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scrambler = new TextScramble(entry.target);
            const originalText = entry.target.getAttribute('data-original') || entry.target.innerText;
            entry.target.setAttribute('data-original', originalText);
            scrambler.setText(originalText);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    headings.forEach((h) => observer.observe(h));
  }

  /* ==========================================================================
     9. SCROLL PROGRESS HUD & SECTOR TRACKER
     ========================================================================== */
  function initScrollProgressHUD() {
    const thumb = document.getElementById('scroll-thumb-v');
    const percentEl = document.getElementById('scroll-percent-text');
    const sectorEl = document.getElementById('scroll-sector-badge');
    const navContainer = document.querySelector('.hud-nav-container');

    const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];

    window.addEventListener(
      'scroll',
      () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);

        if (thumb) thumb.style.height = `${progress}%`;
        if (percentEl) percentEl.textContent = `${Math.round(progress)}%`;

        // Compact nav on scroll
        if (navContainer) {
          if (scrollTop > 60) navContainer.classList.add('scrolled');
          else navContainer.classList.remove('scrolled');
        }

        // Active sector detection
        let currentSector = 1;
        sections.forEach((secId, idx) => {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              currentSector = idx + 1;
            }
          }
        });

        if (sectorEl) sectorEl.textContent = `SECTOR 0${currentSector}`;

        // Active nav link highlight
        document.querySelectorAll('.hud-nav-link').forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${sections[currentSector - 1]}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     10. ANIMATED TELEMETRY STATS COUNTERS
     ========================================================================== */
  function initTelemetryStats() {
    const statBoxes = document.querySelectorAll('.stat-number-display');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetVal = entry.target.getAttribute('data-count');
            animateCount(entry.target, targetVal);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    function animateCount(el, targetStr) {
      if (targetStr === '∞') {
        let cycles = 0;
        const glitchSymbols = ['01', '99', 'XX', '#!', '@@', '∞'];
        const interval = setInterval(() => {
          el.textContent = glitchSymbols[cycles % glitchSymbols.length];
          cycles++;
          if (cycles > 10) {
            clearInterval(interval);
            el.textContent = '∞';
          }
        }, 80);
        return;
      }

      const isPlus = targetStr.includes('+');
      const targetNum = parseInt(targetStr, 10);
      let current = 0;
      const duration = 1500;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = targetNum / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          clearInterval(timer);
          el.textContent = (targetNum < 10 ? '0' : '') + targetNum + (isPlus ? '+' : '');
        } else {
          const val = Math.floor(current);
          el.textContent = (val < 10 ? '0' : '') + val + (isPlus ? '+' : '');
        }
      }, stepTime);
    }

    statBoxes.forEach((box) => observer.observe(box));
  }

  /* ==========================================================================
     11. SKILLS MODULE MATRIX & PROGRESS BARS
     ========================================================================== */
  function initSkillsSystem() {
    const modules = document.querySelectorAll('.skill-matrix-module');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            const percent = entry.target.getAttribute('data-level');
            if (fill && percent) {
              fill.style.width = percent + '%';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    modules.forEach((mod) => observer.observe(mod));

    // Category Tabs Filter
    const tabs = document.querySelectorAll('.skill-category-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');

        modules.forEach((mod) => {
          const modCat = mod.getAttribute('data-category');
          if (cat === 'ALL' || modCat === cat) {
            mod.style.display = 'block';
            setTimeout(() => {
              mod.style.opacity = '1';
              mod.style.transform = 'translateY(0)';
            }, 10);
          } else {
            mod.style.opacity = '0';
            mod.style.transform = 'translateY(15px)';
            setTimeout(() => {
              mod.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* ==========================================================================
     12. 3D PROJECT CARD TILT & SPOTLIGHT FOLLOWER
     ========================================================================== */
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card-3d');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight variable
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D rotation angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // Project Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'ALL' || category === filter) {
            card.style.display = 'block';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'perspective(1000px) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'perspective(1000px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* ==========================================================================
     13. INTERACTIVE PROJECT MODAL (LIVE DEMO SYSTEM)
     ========================================================================== */
  function initProjectModals() {
    const backdrop = document.getElementById('project-hologram-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const titleEl = document.getElementById('modal-title');
    const typeEl = document.getElementById('modal-type');
    const descEl = document.getElementById('modal-desc');
    const terminalEl = document.getElementById('modal-terminal');
    const launchBtn = document.getElementById('modal-launch-btn');

    if (!backdrop) return;

    const projectData = {
      'ai-assistant': {
        title: 'AI WEB ASSISTANT',
        type: 'ARTIFICIAL INTELLIGENCE // LLM STREAMING',
        desc: 'An ultra-fast client-side neural copilot utilizing asynchronous streaming tokens, multimodal vision reasoning, and contextual intent execution.',
        logs: [
          '>> INITIALIZING NEURAL ENGINE CORE...',
          '>> BINDING CLIENT-SIDE WEB WORKER PROXIES...',
          '>> LATENCY: 18ms // STATUS: MAXIMUM EFFICIENCY',
          '>> SIMULATED UPLINK ACTIVE // READY FOR PROMPTS'
        ]
      },
      'interactive-portfolio': {
        title: 'INTERACTIVE PORTFOLIO OS',
        type: 'WEB EXPERIENCE // CYBERNETIC ARCHITECTURE',
        desc: 'A futuristic personal operating system built from scratch with pure HTML5 Canvas, CSS 3D perspectives, and high-precision event physics.',
        logs: [
          '>> RENDERING DYNAMIC PARTICLE MATRIX (60 FPS)...',
          '>> QUANTUM AUDIO SYNTHESIZER ARMED...',
          '>> MEMORY CONSUMPTION: 42MB // LEAK AUDIT: 0%',
          '>> LIVE RUNTIME ACTIVE'
        ]
      },
      'digital-dashboard': {
        title: 'DIGITAL DASHBOARD CONSOLE',
        type: 'APPLICATION // DISTRIBUTED TELEMETRY',
        desc: 'Enterprise mission control telemetry dashboard tracking distributed nodes, serverless edge latencies, and real-time transaction throughput.',
        logs: [
          '>> CONNECTING TO GLOBAL EDGE WEBSOCKETS...',
          '>> 2,400 CLOUD NODES REPORTING HEALTHY',
          '>> AGGREGATE THROUGHPUT: 98.4K TPS',
          '>> ANOMALY DETECTOR: PASS'
        ]
      },
      'neural-vision': {
        title: 'NEURAL VISION SYSTEM',
        type: 'ARTIFICIAL INTELLIGENCE // COMPUTER VISION',
        desc: 'Client-side camera vision matrix computing facial topological mesh points, spatial hand gestures, and optical tracking in real time.',
        logs: [
          '>> ACCESSING OPENCV WEBCAM MATRIX...',
          '>> MESH TESSELLATION: 468 FACIAL KEYPOINTS',
          '>> GESTURE RECOGNITION CONFIDENCE: 99.4%',
          '>> FRAME PROCESSING: 12ms PER FRAME'
        ]
      },
      'cyber-engine': {
        title: 'CYBER MATRIX ENGINE',
        type: 'CREATIVE CODE // HIGH-PERFORMANCE PHYSICS',
        desc: 'Algorithmic canvas sandbox simulating gravity wells, orbital attractors, harmonic wave vectors, and interactive audio fluid fields.',
        logs: [
          '>> ALLOCATING 5,000 VECTOR PARTICLES...',
          '>> RUNGE-KUTTA 4TH ORDER INTEGRATION MOUNTED',
          '>> SIMULATION TICK: 16.6ms STABLE',
          '>> INTERACTIVE FIELD READY'
        ]
      },
      'cloud-vault': {
        title: 'QUANTUM CLOUD VAULT',
        type: 'WEB APPLICATION // ZERO-KNOWLEDGE ENCRYPTION',
        desc: 'Decentralized cryptographic storage system featuring client-side end-to-end hashing, biometric authorization screens, and immutable shard sync.',
        logs: [
          '>> SHA-512 ENTROPY COLLECTED FROM CURSOR...',
          '>> ZERO-KNOWLEDGE PROOF GENERATED [OK]',
          '>> ENCRYPTED PAYLOAD DISPERSED OVER 12 SHARDS',
          '>> VAULT INTEGRITY: 100%'
        ]
      }
    };

    document.querySelectorAll('.project-link-demo').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-project');
        const data = projectData[key];
        if (!data) return;

        titleEl.textContent = data.title;
        typeEl.textContent = data.type;
        descEl.textContent = data.desc;
        terminalEl.innerHTML = data.logs.map((l) => `<div>${l}</div>`).join('');
        backdrop.classList.add('active');
        soundSystem.playClick();
      });
    });

    function closeModal() {
      backdrop.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ==========================================================================
     14. FUTURISTIC JOURNEY TIMELINE SCROLL
     ========================================================================== */
  function initJourneyTimeline() {
    const nodes = document.querySelectorAll('.timeline-event-node');
    const spineFill = document.getElementById('timeline-spine-fill');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );

    nodes.forEach((n) => observer.observe(n));

    // Dynamic timeline fill
    window.addEventListener(
      'scroll',
      () => {
        const timeline = document.querySelector('.timeline-circuit-wrap');
        if (!timeline || !spineFill) return;

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const totalH = rect.height;
          const currentProgress = (windowHeight * 0.5 - rect.top) / totalH;
          const pct = Math.min(Math.max(currentProgress * 100, 0), 100);
          spineFill.style.height = pct + '%';
        }
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     15. HOLOGRAPHIC CONTACT TERMINAL SUBMISSION
     ========================================================================== */
  function initContactTerminal() {
    const form = document.getElementById('contact-terminal-form');
    const submitBtn = document.getElementById('terminal-submit-btn');
    const feedback = document.getElementById('transmission-feedback');
    const resetBtn = document.getElementById('transmission-reset-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('>> ALERT: IDENTITY, EMAIL, AND PAYLOAD REQUIRED FOR TRANSMISSION.');
        return;
      }

      soundSystem.playTransmit();

      submitBtn.disabled = true;
      submitBtn.textContent = '>> ENCRYPTING & TRANSMITTING...';

      setTimeout(() => {
        form.style.display = 'none';
        if (feedback) feedback.classList.add('visible');
        submitBtn.disabled = false;
        submitBtn.textContent = 'TRANSMIT MESSAGE →';
      }, 1600);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        if (feedback) feedback.classList.remove('visible');
      });
    }
  }

  /* ==========================================================================
     16. AUDIO TOGGLE & MOBILE NAVIGATION
     ========================================================================== */
  function initNavAndAudioControls() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    const hamburger = document.getElementById('hud-hamburger');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isEnabled = soundSystem.toggle();
        audioBtn.textContent = isEnabled ? 'AUDIO: [ON]' : 'AUDIO: [OFF]';
        audioBtn.style.color = isEnabled ? 'var(--accent-green)' : 'var(--cyan)';
        audioBtn.style.borderColor = isEnabled ? 'var(--accent-green)' : 'rgba(0, 240, 255, 0.25)';
      });
    }

    if (hamburger && mobileDrawer) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
      });

      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          hamburger.classList.remove('open');
        });
      });
    }

    // Return to orbit button
    const returnOrbitBtn = document.getElementById('return-orbit-btn');
    if (returnOrbitBtn) {
      returnOrbitBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     17. RANDOM OCCASIONAL GLITCH EFFECT ON HEADINGS
     ========================================================================== */
  function initGlitchTriggers() {
    const glitchTargets = document.querySelectorAll('.glitch-target');
    if (!glitchTargets.length) return;

    setInterval(() => {
      const idx = Math.floor(Math.random() * glitchTargets.length);
      const target = glitchTargets[idx];
      target.classList.add('glitch-active');
      setTimeout(() => {
        target.classList.remove('glitch-active');
      }, 350);
    }, 4500);
  }

  /* ==========================================================================
     INITIALIZATION ORCHESTRATOR
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initBackgroundCanvas();
    initCustomCursor();
    initMagneticButtons();
    initReactorTilt();
    initTypewriter();
    initScrambleHeadings();
    initScrollProgressHUD();
    initTelemetryStats();
    initSkillsSystem();
    initProjectCards();
    initProjectModals();
    initJourneyTimeline();
    initContactTerminal();
    initNavAndAudioControls();
    initGlitchTriggers();
  });
})();
