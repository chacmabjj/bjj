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
  const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = whatsappUrl(WHATSAPP_MESSAGE); link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  document.querySelectorAll('[data-whatsapp-topic]').forEach((link) => { const topic = link.getAttribute('data-whatsapp-topic'); link.href = whatsappUrl(`Hi Saul, I would like to discuss ${topic} with CHACMA BJJ. Could you tell me a little more about how you approach it and what a private session would involve?`); link.target = '_blank'; link.rel = 'noopener noreferrer'; });
})();
