// Minimal JS placeholder for future interactions if needed
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Helper: select elements
const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// Mobile nav toggle
const navToggle = select('.nav-toggle');
const siteNav = select('#site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on nav link click (mobile)
  selectAll('#site-nav a').forEach((a) => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scrolling (enhanced, as CSS smooth-behavior is not enough for offsets)
selectAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    const target = select(href);
    if (!target) return;
    e.preventDefault();
    const header = select('.site-header');
    const headerOffset = header ? header.getBoundingClientRect().height + 8 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Reveal on scroll using IntersectionObserver
const revealEls = selectAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Footer year
const yearEl = select('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Contact form: mailto fallback
const form = select('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = select('#name').value.trim();
    const email = select('#email').value.trim();
    const message = select('#message').value.trim();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  });
}


