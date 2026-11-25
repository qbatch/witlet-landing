/**
 * All page copy lives here. Edit words in this file only; layout and
 * motion code read from it. Names and requirements come from config.js
 * so they stay consistent everywhere.
 *
 * House rules: short, warm, plain English. No jargon (see README).
 * The product story matches the Mac app: five setup steps, then an
 * offline chat. There is no side-by-side test drive, no account, and
 * no free/pro split inside the app.
 */
import { config } from './config.js';

const name = config.productName;
const req = config.requirements;

/** The job cards. Same ids and order as Job.swift in the Mac app. */
export const jobs = [
  { id: 'write', label: 'Write and rewrite', summary: 'Emails, letters and posts, in your own voice' },
  { id: 'summarise', label: 'Summarise documents', summary: 'The key points of long reports and articles' },
  { id: 'study', label: 'Study and explain', summary: 'Clear, step-by-step explanations of new topics' },
  { id: 'translate', label: 'Translate', summary: 'Natural translations between languages' },
  { id: 'brainstorm', label: 'Brainstorm and plan', summary: 'Ideas, names, outlines and plans' },
  { id: 'code', label: 'Help with code', summary: 'Explain, fix and write code' },
];

export const content = {
  meta: {
    title: `${name} — Private AI that just works on your Mac`,
    description: `${name} checks your Mac, shows which AI models fit the job you want, and sets one up. Chat offline. No account. Dictation and pictures stay on your Mac.`,
    ogImage: '/og-image.png',
    ogImageAlt: `${name}: private AI that just works on the Mac you already own.`,
  },

  skipLink: 'Skip to content',

  nav: {
    homeLabel: `${name} home`,
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#features', label: 'Features' },
      { href: config.links.privacy, label: 'Privacy' },
      { href: config.links.support, label: 'Support' },
    ],
    cta: 'Get the app',
    ctaHref: '#download',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  hero: {
    eyebrow: 'For Macs with Apple silicon',
    title: 'Private AI that just works on the Mac you already own.',
    subtitle: `${name} checks this Mac, shows which AI models fit the job you want, and sets one up. No account, and no technical questions.`,
    primaryCta: 'Get the app',
    secondaryCta: 'See how it works',
    note: 'No account. Works offline after one download.',
    replay: 'Replay',
    replayLabel: 'Replay the animation',
    visual: {
      windowTitle: `${name}`,
      checking: 'Checking this Mac…',
      gauges: [
        { id: 'chip', label: 'Chip', text: 'M series', ratio: 1 },
        { id: 'memory', label: 'Memory', count: 16, suffix: ' GB', ratio: 0.5 },
        { id: 'disk', label: 'Storage', count: 212, suffix: ' GB', ratio: 0.62 },
      ],
      verdict: 'Your Mac can comfortably run medium-sized AI models.',
      promptLabel: 'For this job',
      prompt: 'Write and rewrite',
      pick: 'Recommended',
      cards: [
        { id: 'A', size: 'About 1.5 GB', fit: 'Excellent fit', speed: 'Faster than you read' },
        { id: 'B', size: 'About 3 GB', fit: 'Excellent fit', speed: 'Keeps up with your reading', recommended: true },
        { id: 'C', size: 'About 4 GB', fit: 'Good fit', speed: 'About reading speed' },
      ],
    },
    srDescription:
      'Illustration: the app checks a Mac’s chip, memory and storage and concludes, “Your Mac can comfortably run medium-sized AI models.” Three models, labelled A, B and C, are then described in plain words. B is marked Recommended.',
  },

  problem: {
    eyebrow: 'The problem',
    title: 'Running AI on a Mac got easy. Choosing it didn’t.',
    intro: 'Other apps hand you a long catalog and wish you luck. Here is what usually happens next.',
    points: [
      {
        title: 'Jargon everywhere',
        text: 'Labels like “14B” and “Q4_K_M” say nothing about whether a model will run well on your Mac.',
      },
      {
        title: 'The wrong-size download',
        text: 'Pick one too big for your Mac and everything freezes, or replies crawl out a word at a time.',
      },
      {
        title: 'No way to judge first',
        text: 'You only find out if it fits after a download of several gigabytes. Most people give up here.',
      },
    ],
    jargon: {
      chips: ['14B', 'Q4_K_M', 'GGUF', 'ctx 32K', 'GPU offload', '7.2 GB'],
      label: `What ${name} tells you instead`,
      plain: ['Excellent fit', 'Faster than you read', 'leaves room for your apps'],
      srDescription:
        'Illustration: confusing labels such as 14B, Q4_K_M, GGUF, ctx 32K, GPU offload and 7.2 GB collapse into one plain line: “Excellent fit · Faster than you read · leaves room for your apps.”',
    },
  },

  journey: {
    eyebrow: 'How it works',
    title: 'From “I’d like a private assistant” to chatting offline.',
    intro: 'Five calm steps. A few minutes, plus the download.',
    progressLabel: 'Step {n} of 5',
    steps: [
      { title: 'Welcome', text: 'A privacy promise up front. No account to create.' },
      { title: 'Your Mac', text: 'Chip, memory and storage. Then one sentence about what this Mac can run.' },
      { title: 'Your task', text: 'The kind of help you want: writing, summaries, study, translation, planning or code.' },
      {
        title: 'Choose a model',
        text: 'Every model, with how well it fits and how fast it would write, in plain words. Recommended ones are starred.',
      },
      { title: 'Download, then chat', text: 'One download. Then a chat that works offline. Add or remove models any time.' },
    ],
    panes: {
      welcome: {
        title: 'Private AI, right on your Mac',
        text: 'Everything stays on this Mac. No account needed.',
        button: 'Get Started',
      },
      check: {
        rows: [
          { label: 'Chip', value: 'M series', ratio: 1 },
          { label: 'Memory', value: '16 GB', ratio: 0.5 },
          { label: 'Storage', value: '212 GB', ratio: 0.62 },
        ],
        verdict: 'Your Mac can comfortably run medium-sized AI models.',
      },
      questions: {
        title: 'What would you like help with?',
        selected: 'write',
        caption: 'Emails, letters and posts, in your own voice',
      },
      models: {
        title: 'Picked for your Mac',
        items: [
          { id: 'A', note: 'Quick and light', fit: 'Excellent fit', size: 'About 1.5 GB' },
          { id: 'B', note: 'Balanced', fit: 'Excellent fit', size: 'About 3 GB', recommended: true },
          { id: 'C', note: 'Most thorough', fit: 'Good fit', size: 'About 4 GB' },
        ],
        pick: 'Recommended',
        footer: 'Names stay hidden. Technical details are there if you want them.',
      },
      chat: {
        badge: 'Offline',
        messages: [
          { from: 'you', text: 'Can you make this sound a bit friendlier?' },
          {
            from: 'assistant',
            text: 'Of course. “Hi Sam, hope your week’s going well. Just a gentle nudge about invoice 1042. Could you let me know when to expect payment?”',
          },
        ],
        footer: 'Nothing leaves your Mac',
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
    segments: { os: 'macOS', apps: 'Your apps', model: 'AI model', headroom: 'Room to spare' },
    amount: 'about {n} GB',
    amountSmall: 'under 1 GB',
    shortlist: {
      title: 'What the app might recommend',
      note: 'In the app these are starred. Every model also gets a plain fit, from Excellent fit down to Won’t run, and a writing speed such as Faster than you read. You pick one, then download it. Option C is the one shown in the bar. Real names stay hidden unless you open Technical details.',
      option: 'Option {id}',
      columns: {
        option: 'Option',
        style: 'Style',
        download: 'Download',
        starts: 'Starts answering',
        pace: 'Writing pace',
        roomLeft: 'Room to spare',
      },
    },
    resultLabel: 'What to expect',
    note: 'Illustrative. The app measures your actual Mac.',
    hint: 'Not sure how much memory you have? Open the Apple menu and choose About This Mac.',
  },

  pillars: {
    eyebrow: 'Why it’s different',
    title: 'Six promises, kept by design.',
    items: [
      { icon: 'target', title: 'Chosen for your job', text: 'Tell it what you need help with. Recommendations start from that, not from a raw catalog.' },
      { icon: 'gauge', title: 'A fit you can read', text: 'Excellent fit, Good fit, Poor fit, or Won’t run. Speed in words, such as Faster than you read.' },
      { icon: 'proof', title: 'Never freezes your Mac', text: 'It won’t load a model your Mac can’t handle, or one that doesn’t fit in the memory free right now.' },
      { icon: 'speech', title: 'Plain language', text: 'No model names or jargon unless you turn on Technical details.' },
      { icon: 'lock', title: 'Truly offline and private', text: 'No account and no analytics. Chats, pictures and dictation stay on your Mac.' },
      { icon: 'rise', title: 'Switch any time', text: 'Download another model in the background, or remove one. Your chats stay either way.' },
    ],
  },

  included: {
    eyebrow: 'In the chat',
    title: 'A normal chat, once the model is on your Mac.',
    intro: 'Everything here is in the app. Nothing is locked behind a subscription.',
    items: [
      { icon: 'mic', title: 'Dictate on this Mac', text: 'Speak into the message box. The words stay here, and nothing is sent until you send the message.' },
      { icon: 'photo', title: 'Show it pictures', text: 'With a model that can see, attach, paste or drop up to four pictures. They’re shrunk on your Mac.' },
      { icon: 'chats', title: 'Keep several chats', text: 'A sidebar for your conversations, with search, rename and delete. New chat is Command-N.' },
      { icon: 'keys', title: 'Shortcuts for the rest', text: 'A command palette with Command-K, and every shortcut listed with Command-slash.' },
      { icon: 'meter', title: 'See when a chat fills up', text: 'A small meter shows how much of the conversation the model can still hold.' },
      { icon: 'models', title: 'Manage models', text: 'See type, fit, memory and size. Filter to what’s downloaded. Remove one when you want the space back.' },
    ],
  },

  privacy: {
    eyebrow: 'Privacy',
    title: 'Turn off the internet. Keep going.',
    text: 'After the model download, chat runs on your Mac. Your words never leave it. Try the switch.',
    points: ['No account', 'Chats, pictures and dictation stay here', 'Works in airplane mode'],
    policyLabel: 'Read the privacy policy',
    toggle: 'Airplane mode',
    statusOn: 'Airplane mode is on. It’s still answering.',
    statusOff: 'Connected, and still nothing from the chat is sent.',
    windowTitle: name,
    badge: 'Offline',
    question: 'Summarise this contract clause in plain English.',
    answer: 'Either side can end the agreement with 30 days’ written notice. Work already done still has to be paid for.',
    bytes: 'Nothing leaves your Mac',
    srDescription:
      'Illustration: a small chat window keeps answering a question after airplane mode is switched on. The status reads “Nothing leaves your Mac”.',
  },

  personas: {
    eyebrow: 'Who it’s for',
    title: 'For people who just want it to work.',
    items: [
      {
        role: 'A lawyer',
        title: 'Drafting client letters offline',
        text: 'Client details stay on the Mac. Draft the letter here, then paste it into Mail or Word. Both keep running, because the model leaves them room.',
      },
      {
        role: 'A student',
        title: 'Studying with no signal',
        text: 'Step-by-step explanations on an 8 GB MacBook Air, including on a train. Dictate a question when typing isn’t convenient.',
      },
      {
        role: 'A retired teacher',
        title: 'Who doesn’t know what any of these model names mean',
        text: 'And never needs to. Pick the kind of help you want, then pick the description you like. Technical details stay closed.',
      },
    ],
    footnote: 'Illustrative examples, not customer stories.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered plainly.',
    more: 'More answers on the support page',
    items: [
      {
        q: 'Is it really offline?',
        a: `After the model is on your Mac, chat runs there. Turn on airplane mode and keep going. The chat says “Offline, nothing leaves your Mac”. Once a day, if you are online, ${name} may fetch a small signed list of models. That check sends nothing about you or your Mac.`,
      },
      {
        q: 'Which Macs work?',
        a: `A Mac with ${req.chip}, running ${req.os}. ${req.minMemory} of memory works for small models. ${req.recommendedMemory} or more is more comfortable.`,
      },
      {
        q: 'How big are the downloads?',
        a: 'It depends on your Mac and the model. The list shows each download size before anything starts, and setup downloads only the one you pick. You can add another later, in the background, while you keep chatting.',
      },
      {
        q: 'How do I choose a model?',
        a: 'Every model is described in plain words: Excellent fit, Good fit, Poor fit, or Won’t run, and a writing speed such as Faster than you read. The ones recommended for your Mac and your job are starred. Technical details stay off unless you turn them on.',
      },
      {
        q: 'How is this different from an online chatbot?',
        a: `Online assistants run on someone else’s computers, so what you type travels over the internet. ${name} runs the model on your Mac. Your words stay with you, and after the download it works without a connection. There’s no account.`,
      },
      {
        q: 'What if I want a different model?',
        a: 'Open Manage Models and download another. It can arrive in the background, then the chat switches to it. Removing a model deletes its files after you confirm. Your chats are kept.',
      },
      {
        q: 'Do you collect my data?',
        a: `No. There’s no account and no analytics. Conversations, pictures and dictation stay on your Mac. The privacy policy has the full account, including the daily model-list check.`,
      },
    ],
  },

  download: {
    eyebrow: 'Get the app',
    title: `${name} is on the Mac App Store.`,
    text: `A Mac app from ${config.companyName}. No account to create. After one model download, the chat works offline.`,
    points: [
      `Needs a Mac with ${req.chip}, running ${req.os}.`,
      `${req.minMemory} of memory runs small models. ${req.recommendedMemory} or more is more comfortable.`,
      'Setup is five steps. The download is the part that takes a while.',
    ],
    storeCta: 'View on the Mac App Store',
    storeFallback: `Search the Mac App Store for ${config.appStoreName} by ${config.companyName}.`,
    support: 'Questions first? Read the support page.',
  },

  footer: {
    tagline: 'Private AI for the Mac you already own.',
    links: [
      { key: 'privacy', label: 'Privacy policy' },
      { key: 'terms', label: 'Terms of use' },
      { key: 'support', label: 'Support' },
    ],
    copyright: `© ${config.copyrightYear} ${config.companyName}`,
    trademark: 'Mac and macOS are trademarks of Apple Inc.',
  },

  pages: {
    privacy: {
      path: '/privacy',
      metaTitle: `Privacy policy — ${name}`,
      metaDescription: `What ${name} for Mac does with your information: chats, pictures and dictation stay on your Mac. No account and no analytics.`,
      eyebrow: 'Privacy policy',
      title: `How ${name} handles your information`,
      updated: `Last updated ${config.policyUpdated}`,
      sections: [
        {
          heading: 'The short version',
          paragraphs: [
            `${name} is a Mac app from ${config.companyName}. It downloads an AI model once, then runs that model on your Mac. Your chats stay on that Mac. There is no account, and the app does not include analytics.`,
            'This policy covers the Mac app and this website. It is written in plain language on purpose.',
          ],
        },
        {
          heading: 'What the app does not collect',
          paragraphs: [
            'The app’s privacy manifest lists no collected data and no tracking. We don’t receive your conversations, the pictures you attach, the audio from dictation, your Mac’s name, or a profile of you.',
            'There is no sign-in. Nothing in the app is sent to an advertising or analytics service, because the app doesn’t have one.',
          ],
        },
        {
          heading: 'What stays on your Mac',
          paragraphs: [
            'These stay in the app’s own storage on your Mac, and they are not synced by us:',
          ],
          list: [
            'Your chats and the messages in them, including any pictures you attached. Pictures are shrunk on your Mac before they’re saved with the chat.',
            'How far you got in setup, and whether you turned Technical details on.',
            'The model files you downloaded.',
          ],
        },
        {
          heading: 'Dictation',
          paragraphs: [
            'The microphone button (or Shift-Command-D) turns your speech into text on your Mac. Recognition is required to happen on the device. If this Mac can’t do that for your language, the app says so and does not send the audio anywhere else.',
            'Words appear as you speak. They go into the message box when you stop, and they are not kept as a recording. Nothing is sent until you send the message, and sending only adds the text to the chat stored on your Mac. Escape throws the dictation away.',
            'The first time, macOS asks you to allow the microphone and speech recognition. If either is off, the message box explains and can open System Settings.',
          ],
        },
        {
          heading: 'When the app uses the network',
          paragraphs: [
            'The network is used for two things, and chat itself is not one of them.',
          ],
          list: [
            `Downloading the model you chose, and any model you add later. The files come from Hugging Face, pinned to a fixed version and checked against stored checksums. That connection is what delivers the files. ${name} doesn’t add an account or an analytics payload to it. The host that serves the files can see a normal download request, including an IP address, the way any download works.`,
            `Once a day at most, if you are online, a small signed list of models from ${config.siteUrl.replace('https://', '')}. The request sends no cookies and nothing about you or your Mac. The user agent is the word “${name}”. If the list is missing, unsigned or older than the one the app already has, the app keeps what it has and says nothing.`,
          ],
        },
        {
          heading: 'This website',
          paragraphs: [
            `${config.siteUrl.replace('https://', '')} is a static site. It doesn’t have accounts, a waitlist, analytics, or cookies set by us. Your browser will still make ordinary requests for the pages themselves.`,
            'The site also hosts the public model list the app checks. That file is the same for everyone. Reading it doesn’t identify you to the app.',
          ],
        },
        {
          heading: 'Children',
          paragraphs: [
            `${name} is not made for children under 13, and we don’t knowingly collect personal information from anyone, including children.`,
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'If this policy changes, the date at the top of this page changes with it. The app you already installed keeps behaving as described here: chats stay on your Mac.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `Questions about privacy go to the support page. ${config.companyName} is responsible for ${name}, not Apple.`,
          ],
        },
      ],
    },

    terms: {
      path: '/terms',
      metaTitle: `Terms of use — ${name}`,
      metaDescription: `The user agreement for ${name} on the Mac and for this website. Your chats stay on your Mac. Answers can be wrong.`,
      eyebrow: 'Terms of use',
      title: `The agreement for using ${name}`,
      updated: `Last updated ${config.policyUpdated}`,
      sections: [
        {
          heading: 'Who this is between',
          paragraphs: [
            `These terms are the user agreement between you and ${config.companyName} for the ${name} Mac app and for this website. By downloading the app or using the site, you agree to them.`,
            'If you got the app from the Mac App Store, you also agree to Apple’s Licensed Application End User License Agreement. Where that license and these terms disagree about the store copy, Apple’s license wins. Apple is not responsible for the app, its content, or support. Those are our responsibility.',
          ],
        },
        {
          heading: 'What you get',
          paragraphs: [
            `${name} checks your Mac, helps you choose an AI model, downloads that model, and runs it on your Mac. After the download, chat works without a connection.`,
            'There is no account. We don’t promise a particular model will always be available to download, or that a future version of the app will offer the same list.',
          ],
        },
        {
          heading: 'Your chats stay yours',
          paragraphs: [
            'Conversations, attached pictures and dictated text are stored on your Mac, not by us. You are responsible for them, including anything confidential you type, and for your own backups. Removing the app, or removing its data, can delete them.',
            'Dictation writes text into the message box. It does not send audio off your Mac. Pictures you attach are prepared on your Mac and saved with the chat.',
          ],
        },
        {
          heading: 'The models',
          paragraphs: [
            'The AI models are made by other people. Each one has its own license. Downloading and using a model means you follow that license. We don’t give you extra rights to the model files.',
            'A model can use a lot of disk space and memory. The app refuses to load one that doesn’t fit, but you still choose what to download, and you can remove a model when you want the space back.',
          ],
        },
        {
          heading: 'Answers can be wrong',
          paragraphs: [
            'Answers come from a model running on your Mac. They can be wrong, incomplete, or unsuitable. Check anything important. The app is not a lawyer, a doctor, a financial adviser, or a substitute for your own judgment, and it isn’t an official source for exams, contracts, or professional work.',
          ],
        },
        {
          heading: 'Acceptable use',
          paragraphs: [
            'Don’t use the app or the website to break the law, to harm someone, or to get around a model’s license. Don’t interfere with the site or with the signed model list it hosts.',
            'The app is for you. Don’t resell it or present it as your own product.',
          ],
        },
        {
          heading: 'The website',
          paragraphs: [
            'The pages on this site describe the app. Illustrations, including the memory examples, are examples. The app measures your actual Mac. We can change or remove pages, including these terms, and the date at the top will change when these terms change.',
          ],
        },
        {
          heading: 'No warranty, and a limit on liability',
          paragraphs: [
            'The app, the models it downloads, and this website are provided as they are. We don’t warrant that answers will be accurate, that a download will always succeed, or that the app will suit a particular purpose.',
            'Nothing in these terms takes away rights you have under the law where you live, including rights that can’t legally be limited. Where the law allows a limit, Qbatch is not liable for lost chats, lost time, lost data, or decisions you make from an answer.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'Support for the app is on the support page. If you are old enough to agree to a contract where you live, you can agree to these terms yourself. If you are not, a parent or guardian should agree for you.',
          ],
        },
      ],
    },

    support: {
      path: '/support',
      metaTitle: `Support — ${name}`,
      metaDescription: `Answers for ${name} on the Mac: setup, offline chat, dictation, pictures, models, and privacy.`,
      eyebrow: 'Support',
      title: `Help with ${name}`,
      updated: `Last updated ${config.policyUpdated}`,
      intro: 'Short answers for setup, everyday chat, and privacy. The app itself uses the same plain language.',
      contactTitle: 'Still stuck?',
      contactText:
        'Tell us which macOS version you are on, what you expected to happen, and the words on the screen if there are any. Your chats are not included unless you choose to describe them.',
      items: [
        {
          q: 'Is it really offline?',
          a: `After the model is downloaded, chat runs on your Mac, including in airplane mode. The chat shows “Offline, nothing leaves your Mac”. Once a day, if you are online, the app may fetch a small signed list of models from ${config.siteUrl.replace('https://', '')}. That request sends nothing about you or your Mac. Model files download from Hugging Face, pinned to a fixed version and checked before they are kept.`,
        },
        {
          q: 'Which Macs work?',
          a: `A Mac with ${req.chip}, running ${req.os}. Intel Macs are not supported. ${req.minMemory} of memory is enough for small models. ${req.recommendedMemory} or more is more comfortable, especially for longer chats and for code or summaries.`,
        },
        {
          q: 'What are the five setup steps?',
          a: 'Welcome, Your Mac, Your task, Choose a model, then Download. Setup shows once. After the download finishes, the app opens on the chat. You can run setup again from the app menu (Start Setup Again). It asks first.',
        },
        {
          q: 'How do I choose a model?',
          a: 'The list shows every model the app knows, with a fit (Excellent fit, Good fit, Poor fit, or Won’t run) and a writing speed in plain words, such as Faster than you read or About reading speed. Recommended models for your Mac and your job are starred. Technical details, the names and the numbers, stay hidden until you turn them on.',
        },
        {
          q: 'How big is the download, and can I stop it?',
          a: 'The size is shown before the download starts. Setup downloads only the model you picked. You can quit and come back: it carries on where it stopped. A model that fails its check is not kept.',
        },
        {
          q: 'What if I want a different model later?',
          a: 'Use Manage Models in the model menu, or File ▸ Manage Models. A new model downloads in the background while you keep chatting, then the chat can switch to it. Only one model is loaded at a time. To free space, remove a model and confirm. Its files are deleted and the app forgets it. Your chats stay. If it was the model you were using, the chat moves back to the previous one.',
        },
        {
          q: 'Will a model freeze my Mac?',
          a: 'The app will not load a model that needs more memory than macOS will give it, or more than is free right now. You get a plain message instead of a frozen Mac. A model rated Won’t run is one the app will not load. Closing other apps can free enough memory for a tight fit.',
        },
        {
          q: 'Do I need to know anything technical?',
          a: 'No. Pick a job, pick a model from the plain description, and chat. Open Technical details only if you want the specifications. Window ▸ Models (Shift-Command-M) opens the same list at any time.',
        },
        {
          q: 'How do I dictate?',
          a: 'Click the microphone in the message box, or press Shift-Command-D. Words show as you talk. Stop, and they land in the box at the cursor. They are not sent until you send the message. Escape throws the dictation away. Recognition runs on your Mac only. The first time, macOS asks for the microphone and for speech recognition. If either is off, the message box tells you and can open System Settings.',
        },
        {
          q: 'Can it look at pictures?',
          a: 'Yes, when the model in use can see. Attach them with the paperclip (Shift-Command-A), or paste or drop them onto the message box. Up to four a message. They are shrunk on your Mac and saved with that chat. A text-only model can still read documents, but not pictures.',
        },
        {
          q: 'Can I hand it a PDF or a Word file?',
          a: `Yes. Click the paperclip in the message box (Shift-Command-A), drop files on it, or copy them in the Finder and paste. ${name} reads PDFs (scanned pages too, with text recognition on your Mac), Word, RTF, HTML, Markdown, plain text and code, and Excel, CSV and TSV spreadsheets. It turns them into text on your Mac, so this works with every model. A message can carry up to three documents of up to 25 MB each. Numbers files and the older .xls format can’t be read: export them as Excel or CSV first. Nothing is uploaded.`,
        },
        {
          q: 'What can I do in the chat?',
          a: 'Several chats, with search (Command-F), rename, and delete. Command-K opens the command palette. Command-slash lists every shortcut. Return sends, Shift-Return starts a new line, Command-period stops an answer, Command-R regenerates, and Shift-Command-C copies the last answer. Answers use formatted text, and code is highlighted. A small meter shows how full the conversation is. Answers can be wrong. Check anything important.',
        },
        {
          q: 'Where are my chats kept?',
          a: 'On this Mac, inside the app. They are not uploaded and not synced by us. Deleting a chat removes it from the app. Settings ▸ About ▸ Delete All Data deletes every chat, downloaded model and setting at once.',
        },
        {
          q: 'Do you collect my data?',
          a: 'No account, no analytics, and the privacy manifest lists nothing collected. Chats, pictures and dictation audio stay on your Mac. See the privacy policy for the model download and the daily model-list check.',
        },
        {
          q: 'How is this different from an online chatbot?',
          a: `An online chatbot runs on someone else’s computers, so what you type leaves your Mac. ${name} runs the model locally. After the download it works with no connection, and there is no account.`,
        },
        {
          q: 'The app won’t get past setup. What should I check?',
          a: 'You need Apple silicon and macOS 14 or later, enough free disk space for the model you picked, and a connection for that first download. If a download stops, open the app again. It resumes. If the model files are removed later, the chat offers to download that model again instead of starting setup over.',
        },
      ],
    },
  },
};
