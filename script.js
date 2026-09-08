(() => {
  const WHATSAPP_NUMBER = '27768858313';
  const WHATSAPP_MESSAGE = 'Hi Saul, I would like to discuss private Jiu-Jitsu training.';
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const updateHeader = () => { if (header) header.classList.toggle('is-scrolled', window.scrollY > 16); };
  updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
  menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('is-open', !open); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealNodes.forEach((node) => observer.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('is-visible'));
})();
