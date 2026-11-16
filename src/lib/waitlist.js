/**
 * Sends a waitlist sign-up to VITE_WAITLIST_ENDPOINT as JSON.
 * Data goes nowhere else, and nothing is logged.
 *
 * TODO: set VITE_WAITLIST_ENDPOINT (see .env.example and README) to a form
 * backend that accepts a JSON POST, e.g. your own API, Formspree, Basin,
 * a Netlify/Vercel function, or a mailing-list provider. Until it is set,
 * submissions are simulated locally so the page can be demoed safely.
 */
const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {{ email: string, job?: string, honeypot?: string }} data
 * @returns {Promise<{ ok: true, simulated?: boolean }>}
 */
export async function submitWaitlist({ email, job = '', honeypot = '' }) {
  // A filled honeypot means a bot: pretend success and send nothing.
  if (honeypot) {
    await wait(600);
    return { ok: true };
  }

  if (!endpoint) {
    await wait(900);
    return { ok: true, simulated: true };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, job, source: 'landing-page' }),
  });
  if (!response.ok) throw new Error(`Waitlist request failed with status ${response.status}`);
  return { ok: true };
}

/** Pragmatic email check: something@something.tld, no spaces. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
