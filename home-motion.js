const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
}

const hero = document.querySelector('.hero');
let framePending = false;
function updateHero() {
  framePending = false;
  if (reducedMotion.matches) {
    hero.style.removeProperty('--shift');
    return;
  }
  const distance = Math.min(Math.max(window.scrollY, 0), hero.offsetHeight);
  hero.style.setProperty('--shift', `${distance * 0.16}px`);
}
window.addEventListener('scroll', () => {
  if (!framePending && !reducedMotion.matches) {
    framePending = true;
    requestAnimationFrame(updateHero);
  }
}, { passive: true });
reducedMotion.addEventListener('change', updateHero);
updateHero();
