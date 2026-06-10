/* =============================================
   QUIZKIDS — MAIN.JS
   Shared utilities, nav, animations
   ============================================= */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // animate hamburger
    const spans = hamburger.querySelectorAll('span');
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ── Scroll Reveal Animation ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── Toast Notification ──
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  });
}
window.showToast = showToast;

// ── Background Canvas Particles ──
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '22,163,74' : '250,204,21';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  
  // Draw connections between close particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(22,163,74,${0.05 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Session / Auth helpers ──
const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('qk_user')); } catch { return null; }
  },
  setUser(user) { localStorage.setItem('qk_user', JSON.stringify(user)); },
  logout() { localStorage.removeItem('qk_user'); window.location.href = '/index.html'; },
  isLoggedIn() { return !!this.getUser(); },
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/pages/auth.html';
      return false;
    }
    return true;
  }
};
window.Auth = Auth;

// ── XP & Level helpers ──
const XPSystem = {
  getLevel(xp) {
    const levels = [0,100,250,500,900,1400,2100,3000,4200,6000,10000];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i]) return i + 1;
    }
    return 1;
  },
  getTitle(level) {
    const titles = ['Novice','Explorer','Scholar','Achiever','Champion','Elite','Master','Grand Master','Legend','Apex'];
    return titles[Math.min(level - 1, titles.length - 1)];
  },
  getProgress(xp) {
    const levels = [0,100,250,500,900,1400,2100,3000,4200,6000,10000];
    const l = this.getLevel(xp);
    const curr = levels[Math.min(l-1, levels.length-1)];
    const next = levels[Math.min(l, levels.length-1)];
    if (next === curr) return 100;
    return Math.round(((xp - curr) / (next - curr)) * 100);
  }
};
window.XPSystem = XPSystem;

// ── Number formatter ──
function formatNum(n) {
  if (n >= 1000) return (n/1000).toFixed(1).replace(/\.0$/,'') + 'k';
  return n.toString();
}
window.formatNum = formatNum;
