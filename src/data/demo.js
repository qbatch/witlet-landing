/**
 * Scene 4 mapping: memory size × job → how memory might be shared and what
 * to expect. Deliberately conservative and rounded. These are illustrations,
 * not measurements; the app itself measures the visitor's actual Mac.
 */
import { content } from '../content.js';

export const memorySizes = [8, 16, 24, 32, 64];
export const defaultMemory = 16;
export const defaultJob = 'write';

/** Rough share of memory (GB) for macOS and everyday apps, per memory size. */
const baseline = {
  8: { os: 3, apps: 2 },
  16: { os: 3.5, apps: 3.5 },
  24: { os: 4, apps: 4 },
  32: { os: 4, apps: 5 },
  64: { os: 4.5, apps: 6 },
};

/** Typical AI model footprint (GB) the app would aim for at each size. */
const modelSize = { 8: 1.5, 16: 4.5, 24: 8, 32: 11, 64: 22 };

/** Jobs that benefit from a little more room (longer documents, code). */
const jobWeight = { write: 1, summarise: 1.15, study: 1, translate: 0.9, brainstorm: 1, code: 1.15 };

const helper = {
  write: 'writing assistant',
  summarise: 'document summariser',
  study: 'study helper',
  translate: 'translator',
  brainstorm: 'brainstorming partner',
  code: 'coding helper',
};

/** Plain-language outcome per memory size. {helper} is replaced per job. */
const outcome = {
  8: 'A small {helper} that starts answering in about 1–2 seconds and leaves room for your other apps.',
  16: 'A medium-sized {helper} that writes noticeably better, starts answering in about 2 seconds and keeps up with your reading.',
  24: 'A capable {helper} for longer, trickier requests that keeps up with your reading, with comfortable room to spare.',
  32: 'A large {helper} for demanding work, with plenty of room left for everything else you have open.',
  64: 'A very capable {helper}, with lots of room to spare. You could keep a second assistant ready too.',
};

/** Extra honesty where a job asks more of a small Mac. */
const caveat = {
  '8:code': ' Fine for short snippets; 16 GB or more is better for bigger projects.',
  '8:summarise': ' Best with shorter documents; 16 GB or more handles long ones.',
};

/**
 * The shortlist the app might offer: three sizes, up to the model shown in
 * the bar (option C). Shares are of that model's footprint. Speeds are
 * deliberately loose, plain-language ranges, not measurements.
 */
const candidates = [
  { id: 'A', share: 0.45, style: 'Quick and light', starts: 'about 1 second', pace: 'faster than you read' },
  { id: 'B', share: 0.75, style: 'Balanced', starts: 'about 1–2 seconds', pace: 'keeps up with your reading' },
  { id: 'C', share: 1, style: 'Most thorough', starts: 'about 2–3 seconds', pace: 'about your reading speed' },
];

/** Files on disk are a little smaller than the memory they use while running. */
const DOWNLOAD_RATIO = 0.85;

const roundHalf = (n) => Math.round(n * 2) / 2;

/** "about 4.5 GB", or "under 1 GB" for small amounts. */
export const formatGb = (gb) => (gb < 1 ? content.demo.amountSmall : content.demo.amount.replace('{n}', gb));
const modelGb = (memory, job) => roundHalf(modelSize[memory] * (jobWeight[job] ?? 1));

/**
 * @returns {{ total:number, segments:{os:number, apps:number, model:number, headroom:number}, sentence:string }}
 */
export function getEstimate(memory, job) {
  const { os, apps } = baseline[memory];
  const model = modelGb(memory, job);
  const headroom = roundHalf(memory - os - apps - model);
  const sentence = outcome[memory].replace('{helper}', helper[job]) + (caveat[`${memory}:${job}`] ?? '');
  return { total: memory, segments: { os, apps, model, headroom }, sentence };
}

/**
 * @returns {{ id:string, style:string, download:number, starts:string, pace:string, roomLeft:number }[]}
 */
export function getShortlist(memory, job) {
  const { os, apps } = baseline[memory];
  const top = modelGb(memory, job);
  return candidates.map(({ id, share, style, starts, pace }) => {
    const used = roundHalf(top * share);
    return {
      id,
      style,
      starts,
      pace,
      download: roundHalf(used * DOWNLOAD_RATIO),
      roomLeft: roundHalf(memory - os - apps - used),
    };
  });
}

/** Display text for one shortlist cell (sizes formatted, phrases as-is). */
export const shortlistCell = (option, key) =>
  key === 'download' || key === 'roomLeft' ? formatGb(option[key]) : option[key];
