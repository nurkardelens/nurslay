/* ============================================
   nurslay portfolio — script.js
   2000s internet core × carrie bradshaw writer
   vibes × gen z energy × web3
   ============================================ */

// --- DARK MODE TOGGLE ---
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nurslay-theme', theme);
  const icon = theme === 'dark' ? '☀' : '☽';
  if (darkModeToggle) darkModeToggle.querySelector('.toggle-icon').textContent = icon;
}

// check saved preference or system preference
const savedTheme = localStorage.getItem('nurslay-theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
if (darkModeToggleMobile) darkModeToggleMobile.addEventListener('click', toggleDarkMode);


// --- MOBILE MENU ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });

  // close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


// --- SCROLL FADE-IN ANIMATIONS ---
function initScrollAnimations() {
  // add fade-in class to animatable elements
  const animTargets = [
    '.about-grid',
    '.project-card',
    '.tweet-embed',
    '.eco-card',
    '.skill-group',
    '.contact-content',
    '.section-title',
    '.about-headline',
    '.hero-sticker',
    '.hero-title',
    '.hero-tagline',
    '.hero-statement',
    '.hero-cta'
  ];

  animTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
    });
  });

  // stagger grids
  document.querySelectorAll('.work-grid, .tweets-grid, .eco-grid, .skills-grid').forEach(el => {
    el.classList.add('stagger');
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}


// --- CURSOR SPARKLE EFFECT (y2k vibes) ---
function initSparkles() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const sparkleChars = ['✦', '★', '✧', '☆', '·'];
  const colors = ['#ff69b4', '#e040fb', '#c471f5', '#ff9ec6', '#ffc0d9'];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // only spawn sparkle occasionally
    if (Math.random() > 0.7) {
      particles.push({
        x: mouseX,
        y: mouseY,
        char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 8,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
      p.life -= p.decay;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // slight gravity

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.font = `${p.size}px serif`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    });

    // cap particles for performance
    if (particles.length > 50) {
      particles = particles.slice(-50);
    }

    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // cleanup on visibility change for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      animate();
    }
  });
}


// --- SMOOTH SCROLL for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// --- NAV SCROLL EFFECT ---
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    nav.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
}, { passive: true });


// --- TYPEWRITER EFFECT for hero tagline ---
function typewriter(element, text, speed) {
  if (!element) return;
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}


// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSparkles();

  // typewriter for tagline
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    setTimeout(() => typewriter(tagline, text, 50), 500);
  }
});
