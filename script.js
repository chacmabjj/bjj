(() => {
  // Saul Abelson / CHACMA business WhatsApp. Digits only, country code first.
  const WHATSAPP_NUMBER = '27768858313';
  const WHATSAPP_MESSAGE = 'Hi Saul, I would like to discuss private Jiu-Jitsu training.';

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
  const status = document.querySelector('[data-contact-status]');
  if (WHATSAPP_NUMBER) {
    const target = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    whatsappLinks.forEach((link) => {
      link.href = target;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
    if (status) status.textContent = 'WhatsApp Saul directly to discuss your goals, location and availability.';
  } else {
    whatsappLinks.forEach((link) => { link.href = '#contact'; });
  }

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach((el) => observer.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('is-visible'));
  }
})();
