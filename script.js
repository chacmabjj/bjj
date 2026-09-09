/* Shared navigation, accessible native dialogs and non-personal conversion events. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const button = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = button?.getAttribute('aria-expanded') === 'true';
    nav?.classList.remove('is-open');
    button?.setAttribute('aria-expanded', 'false');
    if (restoreFocus && wasOpen) button.focus();
  };
  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('focusin', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(max-width:1180px)').addEventListener('change', () => closeMenu());

  // Never pass hrefs, form content, names, contact details or free text to analytics.
  window.chacmaTrack = (eventName, channel, placement) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        contact_channel: channel,
        placement,
        page_location: location.origin + location.pathname,
        transport_type: 'beacon'
      });
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const url = new URL(link.href, location.href);
    const placement = link.closest('header') ? 'header' : link.closest('.footer') ? 'footer' : link.closest('.authority-strip') ? 'authority_strip' : 'content';
    let name, channel;
    if (url.hostname === 'wa.me') { name = 'whatsapp_enquiry'; channel = 'whatsapp'; }
    else if (url.protocol === 'mailto:') { name = 'email_enquiry'; channel = 'email'; }
    else if (url.protocol === 'tel:') { name = 'phone_enquiry'; channel = 'phone'; }
    else if (url.hostname === 'www.youtube.com') { name = 'youtube_click'; channel = 'youtube'; }
    else if (url.hostname === 'www.instagram.com') { name = 'instagram_click'; channel = 'instagram'; }
    else if (url.hostname === 'www.facebook.com') { name = 'facebook_click'; channel = 'facebook'; }
    else if (url.origin === location.origin && (url.pathname.endsWith('/request-session.html') || url.hash === '#request-form')) { name = 'request_session_click'; channel = 'request_form'; }
    if (name) window.chacmaTrack(name, channel, placement);
  });

  document.querySelectorAll('[data-testimonial-open]').forEach(opener => {
    const dialog = document.getElementById(opener.dataset.testimonialOpen);
    if (!dialog) return;
    opener.addEventListener('click', () => {
      dialog.showModal();
      document.body.classList.add('testimonial-modal-open');
    });
    dialog.querySelector('[data-testimonial-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('testimonial-modal-open');
      opener.focus();
    });
  });
})();
