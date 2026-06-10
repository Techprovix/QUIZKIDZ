/* =============================================
   QUIZKIDS — LANDING.JS
   Animated counters, FAQ, interactions
   ============================================= */

// ── Animated Counters ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Observe counters and trigger when visible
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── FAQ Accordion ──
const faqList = document.getElementById('faqList');
if (faqList) {
  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    
    // Close all
    faqList.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    
    // Open clicked if it wasn't open
    if (!isOpen) item.classList.add('open');
  });
}

// ── Stagger delays for grid items ──
document.querySelectorAll('.subjects-grid .subject-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.05}s`;
});
document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.testi-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ── If logged in, update nav CTA ──
const user = Auth.getUser();
if (user) {
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.innerHTML = `
      <a href="pages/dashboard.html" class="btn-primary">
        👤 ${user.name.split(' ')[0]}
      </a>
    `;
  }
}

// ── Subject card click (logged in check) ──
document.querySelectorAll('.subject-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Allow without login so user can see the quiz page, but quiz itself requires auth
  });
});
