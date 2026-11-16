/**
 * All page copy lives here. Edit words in this file only; layout and
 * motion code read from it. Names, prices and requirements come from
 * config.js so they stay consistent everywhere.
 *
 * House rules: short, warm, plain English. No jargon (see README).
 */
import { config } from './config.js';

const name = config.productName;
const req = config.requirements;
const price = (amount) => `${config.pricing.currency}${amount}`;

/** The job cards. Used by the journey scene, the demo and the waitlist form. */
export const jobs = [
  { id: 'write', label: 'Write and rewrite' },
  { id: 'summarise', label: 'Summarise documents' },
  { id: 'study', label: 'Study and explain' },
  { id: 'translate', label: 'Translate' },
  { id: 'brainstorm', label: 'Brainstorm and plan' },
  { id: 'code', label: 'Help with code' },
];

export const content = {
  meta: {
    title: `${name} — Private AI that just works on your Mac`,
    description: `${name} picks the right AI model for your job, tests it on your own example and sets it up on your Mac. Works offline. No account. Join the waitlist.`,
    ogImage: '/og-image.png',
    ogImageAlt: `${name}: private AI that just works on the Mac you already own.`,
  },

  skipLink: 'Skip to content',

  nav: {
    homeLabel: `${name} home`,
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#privacy', label: 'Privacy' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQ' },
    ],
    cta: 'Join the waitlist',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  hero: {
    eyebrow: 'In development · For Macs with Apple Silicon',
    title: 'Private AI that just works on the Mac you already own.',
    subtitle: `${name} picks an AI model for the job you need, proves it on your own example, and sets it up without a single technical question.`,
    primaryCta: 'Join the waitlist',
    secondaryCta: 'See how it works',
    note: 'No account. Works offline. Be one of the first to try it.',
    replay: 'Replay',
    replayLabel: 'Replay the animation',
    visual: {
      windowTitle: `${name} · Setup`,
      checking: 'Checking this Mac…',
      gauges: [
        { id: 'memory', label: 'Memory', count: 16, suffix: ' GB', ratio: 0.5 },
        { id: 'speed', label: 'Speed', text: 'Quick', ratio: 0.72 },
        { id: 'disk', label: 'Free space', count: 212, suffix: ' GB', ratio: 0.62 },
      ],
      verdict: 'Your Mac can comfortably run medium-sized AI models.',
      promptLabel: 'Your example',
      prompt: 'Help me reply politely to a late-payment email',
      waiting: 'Thinking…',
      timer: 'starts answering in {s} s',
      pick: 'Your pick',
      // Mock-up values: how long each candidate waits before its first word,
      // and how long it takes to type the reply (in seconds).
      cards: [
        {
          id: 'A',
          wait: 0.9,
          typing: 2.0,
          reply: 'Hi Sam, invoice 1042 is overdue. Please pay it as soon as you can. Thanks.',
        },
        {
          id: 'B',
          wait: 1.8,
          typing: 2.8,
          reply: "Hi Sam, I hope you're well. A quick note that invoice 1042 is now two weeks overdue. Could you let me know when we can expect payment? Many thanks.",
        },
        {
          id: 'C',
          wait: 2.6,
          typing: 3.8,
          reply: 'Dear Sam, I am writing with regard to the outstanding balance on invoice 1042, which remains unpaid beyond its agreed due date.',
        },
      ],
    },
    srDescription:
      'Illustration: the app checks a Mac’s memory, speed and free space and concludes, “Your Mac can comfortably run medium-sized AI models.” Three AI models, labelled A, B and C, then answer the same request, “Help me reply politely to a late-payment email”, at different speeds. The person picks answer B.',
  },

  problem: {
    eyebrow: 'The problem',
    title: 'Running AI on a Mac got easy. Choosing it didn’t.',
    intro: 'Other apps hand you a long catalog and wish you luck. Here is what usually happens next.',
    points: [
      {
        title: 'Jargon everywhere',
        text: 'Labels like “14B” and “Q4_K_M” say nothing about whether a model is any good at your job.',
      },
      {
        title: 'The wrong-size download',
        text: 'Pick one too big for your Mac and everything freezes, or replies crawl out a word at a time.',
      },
      {
        title: 'No way to judge first',
        text: 'You only learn if it’s any good after a download of several gigabytes. Most people give up here.',
      },
    ],
    jargon: {
      chips: ['14B', 'Q4_K_M', 'GGUF', 'ctx 32K', 'GPU offload', '7.2 GB'],
      label: `What ${name} tells you instead`,
      plain: ['Writing helper', 'starts answering in 2 s', 'leaves room for your apps'],
      srDescription:
        'Illustration: confusing labels such as 14B, Q4_K_M, GGUF, ctx 32K, GPU offload and 7.2 GB collapse into one plain line: “Writing helper · starts answering in 2 seconds · leaves room for your apps.”',
    },
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From “I’d like a private assistant” to chatting offline.',
    intro: 'Seven calm steps. About 10–15 minutes, downloads included.',
    progressLabel: 'Step {n} of 7',
    steps: [
      { title: 'Welcome', text: 'A privacy promise up front. No account to create.' },
      { title: 'Check this Mac', text: 'About 10 seconds. It looks at memory, speed and free space, then sums it up in one sentence.' },
      { title: 'Three questions', text: 'The job you want help with, an example of your own if you like, and faster or smarter.' },
      { title: 'Your shortlist', text: 'Two or three AI models that fit your Mac comfortably, each with its download size.' },
      { title: 'Test drive', text: 'Each one answers your example side by side as A, B and C. Speed is measured live on your Mac. You pick the best.' },
      { title: 'Set up the winner', text: 'One click. It installs, tunes and checks it’s safe for your Mac’s memory. Runners-up are tidied away later.' },
      { title: 'Chat offline', text: 'One clean chat window that works in airplane mode. Re-check or switch any time.' },
    ],
    panes: {
      welcome: {
        title: 'Private AI, on this Mac',
        text: 'Everything stays on this Mac. No account needed.',
        button: 'Start',
      },
      check: {
        rows: [
          { label: 'Memory', value: '16 GB', ratio: 0.5 },
          { label: 'Speed', value: 'Quick', ratio: 0.72 },
          { label: 'Free space', value: '212 GB', ratio: 0.62 },
        ],
        verdict: 'Your Mac can comfortably run medium-sized AI models.',
      },
      questions: {
        title: 'What would you like help with?',
        selected: 'write',
        exampleLabel: 'Your example (optional)',
        example: 'Hi Sam, I still haven’t received payment for invoice 1042…',
        faster: 'Faster',
        smarter: 'Smarter',
      },
      shortlist: {
        title: 'Picked for your Mac',
        items: [
          { id: 'A', note: 'Quick and light', size: 'About 2 GB' },
          { id: 'B', note: 'Balanced', size: 'About 5 GB' },
          { id: 'C', note: 'Most thorough', size: 'About 6 GB' },
        ],
        footer: 'All three fit comfortably.',
      },
      drive: {
        prompt: 'Help me reply politely to a late-payment email',
        cards: [
          { id: 'A', timer: 'starts in 0.9 s', reply: 'Hi Sam, invoice 1042 is overdue. Please pay soon.' },
          { id: 'B', timer: 'starts in 1.8 s', reply: 'Hi Sam, hope you’re well. Could you let me know when invoice 1042 will be paid?' },
          { id: 'C', timer: 'starts in 2.6 s', reply: 'Dear Sam, I write regarding the outstanding balance…' },
        ],
        pick: 'Your pick',
      },
      setup: {
        title: 'Your writing helper is ready',
        items: ['Installed', 'Tuned for this Mac', 'Safe for your Mac’s memory'],
        button: 'Start chatting',
      },
      chat: {
        badge: 'Offline',
        messages: [
          { from: 'you', text: 'Can you make this sound a bit friendlier?' },
          { from: 'assistant', text: 'Of course. “Hi Sam, hope your week’s going well! Just a gentle nudge about invoice 1042 — could you let me know when to expect payment?”' },
        ],
        footer: '0 bytes sent',
        placeholder: 'Ask anything…',
      },
    },
  },

  demo: {
    eyebrow: 'What can my Mac do?',
    title: 'See what fits before you download anything.',
    intro: 'Choose a memory size and a job. The bar shows how your Mac’s memory might be shared, with room to spare.',
    memoryLabel: 'Memory in your Mac',
    jobLabel: 'What you want help with',
    barLabel: 'How memory might be shared',
    segments: { os: 'macOS', apps: 'Your apps', model: 'AI model', headroom: 'Headroom' },
    amount: 'about {n} GB',
    resultLabel: 'What to expect',
    note: 'Illustrative. The app measures your actual Mac.',
    hint: 'Not sure how much memory you have? Open the Apple menu and choose About This Mac.',
  },

  pillars: {
    eyebrow: 'Why it’s different',
    title: 'Six promises, kept by design.',
    items: [
      { icon: 'target', title: 'Chosen for your job', text: 'Tell it what you need help with. It chooses from there, not from a catalog.' },
      { icon: 'proof', title: 'Proven on your example', text: 'See real answers to your own request before you commit to a big download.' },
      { icon: 'gauge', title: 'Never freezes your Mac', text: 'It won’t install or load a model your Mac can’t comfortably handle.' },
      { icon: 'speech', title: 'Plain language', text: 'No model names or jargon unless you ask. An Advanced view is there for the curious.' },
      { icon: 'lock', title: 'Truly offline and private', text: 'An Offline badge, a “0 bytes sent” indicator, no account and no data collected.' },
      { icon: 'rise', title: 'Gets better over time', text: 'It lets you know when a better model for your job fits your Mac.' },
    ],
  },

  privacy: {
    eyebrow: 'Privacy',
    title: 'Turn off the internet. Keep going.',
    text: 'After the one-time model download, everything runs on your Mac. Your words never leave it. Try the switch.',
    points: ['No account', 'No data collected', 'Works in airplane mode'],
    toggle: 'Airplane mode',
    statusOn: 'Airplane mode is on. It’s still answering.',
    statusOff: 'Connected, and still nothing is sent.',
    windowTitle: name,
    badge: 'Offline',
    question: 'Summarise this contract clause in plain English.',
    answer: 'Either side can end the agreement with 30 days’ written notice. Work already done still has to be paid for.',
    bytes: '0 bytes sent',
    srDescription:
      'Illustration: a small chat window keeps answering a question after airplane mode is switched on. A counter reads “0 bytes sent” throughout.',
  },

  personas: {
    eyebrow: 'Who it’s for',
    title: 'For people who just want it to work.',
    items: [
      {
        role: 'A lawyer',
        title: 'Drafting client letters offline',
        text: 'Client details shouldn’t go to an online chatbot. Drafts and summaries happen on the Mac, and Mail and Word keep running smoothly.',
      },
      {
        role: 'A student',
        title: 'Studying for free',
        text: 'Step-by-step explanations with no monthly subscription. It works on an 8 GB MacBook Air, even on a train with no signal.',
      },
      {
        role: 'A retired teacher',
        title: 'Who doesn’t know what any of these model names mean',
        text: 'And never needs to. Answer three plain questions, pick the answer you like best, and start chatting.',
      },
    ],
    footnote: 'Illustrative examples, not customer stories.',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Free to start. Pro once, not monthly.',
    badge: config.pricing.label,
    note: `${config.pricing.label}. It may change before launch.`,
    cta: 'Join the waitlist',
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: price(config.pricing.free),
        priceNote: 'No card needed',
        features: ['Mac check', 'Test drive of up to 3 models', 'One installed model', 'Offline chat'],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: price(config.pricing.pro),
        priceNote: `${config.pricing.proTerms} · no subscription`,
        features: [
          'Everything in Free',
          'Chat with your documents (PDF and Word)',
          'Several models, switched per job',
          'Better-model alerts',
          'Voice',
          'Photo description',
          'Shortcuts',
        ],
      },
    ],
    requirements: `Needs a Mac with ${req.chip} running ${req.os}.`,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered plainly.',
    items: [
      {
        q: 'Is it really offline?',
        a: `Yes. After the one-time download of your AI model, everything runs on your Mac. Turn on airplane mode and keep chatting. ${name} shows an Offline badge and a “0 bytes sent” indicator so you can see it for yourself.`,
      },
      {
        q: 'Which Macs work?',
        a: `Any Mac with ${req.chip} running ${req.os}. ${req.minMemory} of memory works for small models; ${req.recommendedMemory} or more is recommended.`,
      },
      {
        q: 'How big are the downloads?',
        a: 'It depends on your Mac and your job. AI models are usually a few gigabytes each. The shortlist shows each download size before anything starts, and only models that fit your Mac comfortably are suggested.',
      },
      {
        q: 'How is this different from ChatGPT?',
        a: `Online assistants run on someone else’s computers, so what you type travels over the internet. ${name} runs the AI model on your own Mac. Your words stay with you, it works without a connection, and there’s no subscription.`,
      },
      {
        q: 'What if I don’t like the model it picks?',
        a: 'Try the runner-up in one click. You can also run the test drive again or switch models any time.',
      },
      {
        q: 'Do I need to know anything technical?',
        a: 'No. You answer three plain questions and pick the answer you like best. Model names and numbers stay hidden unless you open the Advanced view.',
      },
      {
        q: 'Do you collect my data?',
        a: `No. There’s no account and no data collected. Your conversations stay on your Mac. If you join the waitlist, we use your email only to tell you about ${name}.`,
      },
    ],
  },

  waitlist: {
    eyebrow: 'Join the waitlist',
    title: 'Be one of the first to try it.',
    text: `${name} is in development. Leave your email and we’ll let you know when it’s ready for your Mac.`,
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    jobLabel: 'What would you use it for?',
    jobOptional: '(optional)',
    jobPlaceholder: 'Choose one',
    honeypotLabel: 'Leave this field empty',
    submit: 'Join the waitlist',
    submitting: 'Joining…',
    success: `You’re on the list. We’ll email you when ${name} is ready to try.`,
    errors: {
      empty: 'Please enter your email address.',
      invalid: 'That email doesn’t look quite right. Please check it.',
      network: 'Something went wrong. Please try again in a moment.',
    },
    privacyNote: `We’ll only use your email to tell you about ${name}. No spam.`,
  },

  footer: {
    tagline: 'Private AI for the Mac you already own.',
    links: [
      { key: 'privacy', label: 'Privacy' },
      { key: 'contact', label: 'Contact' },
    ],
    copyright: `© ${config.copyrightYear} ${config.companyName}`,
    trademark: 'Mac and macOS are trademarks of Apple Inc.',
  },
};
