/**
 * Single source of truth for names, requirements and links.
 * Change values here; copy in content.js reads from this object.
 * Keep this file free of browser-only APIs: vite.config.js imports it
 * at build time to pre-render the page.
 */
export const config = {
  productName: 'Witlet',
  /** The full name on the Mac App Store (and in the app's Info.plist). */
  appStoreName: 'Witlet: Private AI Assistant',
  companyName: 'Qbatch',
  copyrightYear: 2026,

  // Absolute production URL, used for canonical and Open Graph tags.
  siteUrl: 'https://witlet.lixul.com',

  /** Shown on the privacy policy, terms and support page. */
  policyUpdated: '24 November 2026',

  requirements: {
    chip: 'Apple silicon (M1 or newer)',
    os: 'macOS 14 Sonoma or later',
    minMemory: '8 GB',
    recommendedMemory: '16 GB',
  },

  /**
   * Mac App Store listing. Leave empty until the listing is live;
   * the download section then tells people to search the store.
   */
  appStore: '',

  /**
   * Public support address. Shown on the support page when set.
   * Leave empty rather than publishing an address that isn't monitored.
   */
  supportEmail: '',

  links: {
    privacy: '/privacy.html',
    terms: '/terms.html',
    support: '/support.html',
  },
};
