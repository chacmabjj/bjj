/* Request-to-confirm: prepares a message locally; nothing is submitted to a server. */
(() => {
  'use strict';
  const form = document.querySelector('#session-request-form');
  if (!form) return;
  const errorBox = form.querySelector('[data-form-error]');
  const status = form.querySelector('[data-request-status]');
  const fallback = form.querySelector('[data-request-fallback]');
  const copy = form.querySelector('[data-request-copy]');
  const dates = form.querySelectorAll('input[type="date"]');
  const phone = form.elements.phone;
  const contact = form.elements.contact_method;
  const timeZone = 'Africa/Johannesburg';
  const localNow = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
    const get = type => parts.find(part => part.type === type).value;
    return {date:`${get('year')}-${get('month')}-${get('day')}`,time:`${get('hour')}:${get('minute')}`};
  };
  const updateRules = () => {
    const now = localNow();
    dates.forEach(input => {input.min = now.date;});
    phone.required = ['WhatsApp','Phone call'].includes(contact.value);
    phone.setCustomValidity(phone.required && !phone.value.trim() ? 'Add your mobile number for your preferred contact method.' : '');
    for (const prefix of ['preferred','alternative']) {
      const date = form.elements[`${prefix}_date`], time = form.elements[`${prefix}_time`];
      date.setCustomValidity(time.value && !date.value ? 'Choose a date for this time.' : '');
      time.setCustomValidity(date.value === now.date && time.value && time.value <= now.time ? 'Choose a future time in South African time.' : '');
    }
    for (const key of ['name','location']) {
      const input = form.elements[key];
      input.setCustomValidity(input.value && !input.value.trim() ? 'Please enter a value, not only spaces.' : '');
    }
  };
  const friendlyDate = value => {
    if (!value) return 'To discuss';
    const [year,month,day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-ZA',{weekday:'short',year:'numeric',month:'short',day:'numeric'}).format(new Date(year,month-1,day));
  };
  const buildRequest = () => {
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const display = key => get(key) || 'Not specified';
    const subject = `CHACMA BJJ session request — ${get('name')} — ${friendlyDate(get('preferred_date'))}`;
    const lines = ['CHACMA BJJ — SESSION REQUEST','',`Name: ${get('name')}`,`Email: ${get('email')}`,`Mobile / WhatsApp: ${display('phone')}`,`Preferred contact: ${display('contact_method')}`,'',`Session format: ${display('session_format')}`,`Experience: ${display('experience')}`,`Focus: ${display('focus')}`,`Gi / no-gi: ${display('gi_preference')}`,'',`Preferred date: ${friendlyDate(get('preferred_date'))}`,`Preferred time (South Africa): ${display('preferred_time')}`,`Alternative date: ${friendlyDate(get('alternative_date'))}`,`Alternative time (South Africa): ${display('alternative_time')}`,`Area / suburb: ${get('location')}`,`Venue preference: ${display('venue_preference')}`,'','Goals / questions / practical notes:',get('notes') || 'None provided.','','This is a request. The booking is confirmed only once Saul agrees the date, time and arrangements.'];
    return {subject,body:lines.join('\n')};
  };
  const prepare = channel => {
    updateRules();
    if (!form.reportValidity()) {
      errorBox.textContent = 'Please check the highlighted field and complete the required details.';
      errorBox.hidden = false;
      return;
    }
    errorBox.hidden = true;
    const request = buildRequest();
    copy.value = `${request.subject}\n\n${request.body}`;
    fallback.hidden = false;
    status.textContent = `Your request is prepared. Review it in ${channel === 'email' ? 'your email app' : 'WhatsApp'} and press Send. If the app does not open, use the copy option below.`;
    // A hand-off is observable; delivery, a qualified lead and a booking are not.
    window.chacmaTrack?.('session_request_prepared', channel, 'request_form');
    if (channel === 'email') {
      location.href = `mailto:chacmabjj@gmail.com?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.body)}`;
    } else {
      window.open(`https://wa.me/27768858313?text=${encodeURIComponent(copy.value)}`, '_blank', 'noopener,noreferrer');
    }
  };
  form.addEventListener('submit', event => {event.preventDefault();prepare('email');});
  form.querySelector('[data-session-whatsapp]').addEventListener('click', () => prepare('whatsapp'));
  form.addEventListener('input', updateRules);
  form.addEventListener('change', updateRules);
  form.addEventListener('focusin', updateRules);
  copy.addEventListener('focus', () => copy.select());
  updateRules();
  form.hidden = false;
})();
