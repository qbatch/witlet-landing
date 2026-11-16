/**
 * Scene 7 — Final CTA. A slow aurora (CSS keyframes on three soft
 * gradients, paused off-screen) sits behind the waitlist form. On success
 * the button label lifts away and a check mark draws in its place (CSS,
 * driven by .is-done). Reduced motion: no aurora drift, instant states.
 */
import { qs } from '../lib/dom.js';
import { flagVisibility } from '../lib/motion.js';
import { isValidEmail, submitWaitlist } from '../lib/waitlist.js';

export function init(root) {
  const form = qs('.waitlist-form', root);
  const email = qs('#wl-email', form);
  const job = qs('#wl-job', form);
  const honeypot = qs('#wl-website', form);
  const button = qs('.submit', form);
  const label = qs('.submit-label', form);
  const error = qs('#wl-email-error', form);
  const status = qs('.form-status', form);
  const msg = form.dataset;
  const stopFlag = flagVisibility(root);
  let busy = false;

  const setError = (text) => {
    error.textContent = text;
    email.setAttribute('aria-invalid', text ? 'true' : 'false');
  };

  const setStatus = (text, isError = false) => {
    status.textContent = text;
    status.classList.toggle('is-error', isError);
  };

  // aria-disabled (not disabled) keeps focus on the button while busy.
  const setBusy = (on) => {
    busy = on;
    button.setAttribute('aria-disabled', String(on));
    button.setAttribute('aria-busy', String(on));
    label.textContent = on ? msg.labelSubmitting : msg.labelSubmit;
  };

  const onInput = () => {
    if (email.getAttribute('aria-invalid') === 'true' && isValidEmail(email.value.trim())) setError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy || form.classList.contains('is-done')) return;

    const value = email.value.trim();
    if (!value || !isValidEmail(value)) {
      setError(value ? msg.msgInvalid : msg.msgEmpty);
      email.focus();
      return;
    }

    setError('');
    setStatus('');
    setBusy(true);
    try {
      await submitWaitlist({ email: value, job: job.value, honeypot: honeypot.value });
      setBusy(false);
      form.classList.add('is-done');
      button.setAttribute('aria-disabled', 'true');
      email.readOnly = true;
      job.disabled = true;
      setStatus(msg.msgSuccess);
    } catch {
      setBusy(false);
      setStatus(msg.msgNetwork, true);
    }
  };

  email.addEventListener('input', onInput);
  form.addEventListener('submit', onSubmit);
  return () => {
    email.removeEventListener('input', onInput);
    form.removeEventListener('submit', onSubmit);
    stopFlag();
  };
}
