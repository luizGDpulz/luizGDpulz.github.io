// scripts/anim.js
// Utilitário para acionar animações Animista via JS
// animate(element, presetName, options)

function animate(element, preset, options = {}) {
  if (!element) return;
  const className = `animista-${preset}`;
  element.classList.add(className);
  if (options.once) {
    element.addEventListener('animationend', () => {
      element.classList.remove(className);
    }, { once: true });
  }
}

// On-scroll reveal usando IntersectionObserver + Animista
function onScrollReveal(selector = '.fade-up', preset = 'fade-up') {
  const els = document.querySelectorAll(selector);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          animate(entry.target, preset, { once: true });
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(el => observer.observe(el));
}

window.addEventListener('DOMContentLoaded', () => {
  onScrollReveal();
});
