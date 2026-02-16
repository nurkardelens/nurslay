/* =============================================
   nurslay — script.js
   y2k sparkles, dark mode, scroll reveals
   ============================================= */

// === DARK MODE ===
const themeBtn = document.getElementById('themeBtn');
const themeBtnMob = document.getElementById('themeBtnMob');

function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('nurslay-theme', t);
  const icon = t === 'dark' ? '☀' : '☽';
  if (themeBtn) themeBtn.textContent = icon;
}

const saved = localStorage.getItem('nurslay-theme');
if (saved) setTheme(saved);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');

function toggle() {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
}
if (themeBtn) themeBtn.addEventListener('click', toggle);
if (themeBtnMob) themeBtnMob.addEventListener('click', toggle);

// === MOBILE MENU ===
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

if (burger && mobMenu) {
  burger.addEventListener('click', () => {
    mobMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobClose.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
  mobMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// === SCROLL REVEAL ===
function initReveals() {
  const targets = [
    '.hero-content', '.hero-badge',
    '.about-layout', '.about-left h2', '.y2k-card',
    '.work-card', '.writing-row',
    '.eco-item', '.contact-center',
    '.section-h2', '.section-tag'
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });

  // stagger grids
  document.querySelectorAll('.work-grid, .eco-strip, .writing-list').forEach(el => {
    el.classList.add('stagger-in');
    el.classList.add('reveal');
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// === CURSOR SPARKLES (y2k vibes) ===
function initSparkles() {
  const c = document.getElementById('sparkle-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let particles = [];
  let frame;

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const chars = ['✦', '★', '✧', '☆', '♡', '·'];
  const colors = ['#ff69b4', '#e040fb', '#c471f5', '#ff9ec6', '#ffc0d9', '#ff1493'];

  document.addEventListener('mousemove', e => {
    if (Math.random() > 0.6) {
      particles.push({
        x: e.clientX, y: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 14 + 8,
        life: 1,
        decay: Math.random() * 0.025 + 0.015,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1.5
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.life -= p.decay;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.font = `${p.size}px serif`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    });
    if (particles.length > 60) particles = particles.slice(-60);
    frame = requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else animate();
  });
}

// === NAV SHADOW ON SCROLL ===
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 2px 16px rgba(255,105,180,.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// === TYPEWRITER for hero subtitle ===
function typewriter(el, text, speed) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initReveals();
  initSparkles();

  const sub = document.querySelector('.hero-sub');
  if (sub) {
    const txt = sub.textContent;
    setTimeout(() => typewriter(sub, txt, 60), 400);
  }
});
