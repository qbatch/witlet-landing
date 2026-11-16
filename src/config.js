/**
 * Single source of truth for names, prices, requirements and links.
 * Change values here; copy in content.js reads from this object.
 * Keep this file free of browser-only APIs: vite.config.js imports it
 * at build time to pre-render the page.
 */
export const config = {
  productName: 'Headroom', // Working name — placeholder.
  companyName: 'Qbatch',
  copyrightYear: 2026,

  // Absolute production URL, used for canonical and Open Graph tags.
  siteUrl: 'https://example.com', // TODO: replace before launch.

  requirements: {
    chip: 'Apple Silicon (M1 or newer)',
    os: 'macOS 14 Sonoma or later',
    minMemory: '8 GB',
    recommendedMemory: '16 GB',
  },

  pricing: {
    label: 'Planned pricing',
    currency: '$',
    free: '0',
    pro: '24.99',
    proTerms: 'one-time',
  },

  links: {
    privacy: '#', // TODO: privacy policy URL.
    contact: '#', // TODO: contact page or mailto: link.
  },
};
