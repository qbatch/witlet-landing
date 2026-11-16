/**
 * Scene 4 mapping: memory size × job → how memory might be shared and what
 * to expect. Deliberately conservative and rounded. These are illustrations,
 * not measurements; the app itself measures the visitor's actual Mac.
 */

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

const roundHalf = (n) => Math.round(n * 2) / 2;

/**
 * @returns {{ total:number, segments:{os:number, apps:number, model:number, headroom:number}, sentence:string }}
 */
export function getEstimate(memory, job) {
  const { os, apps } = baseline[memory];
  const model = roundHalf(modelSize[memory] * (jobWeight[job] ?? 1));
  const headroom = roundHalf(memory - os - apps - model);
  const sentence = outcome[memory].replace('{helper}', helper[job]) + (caveat[`${memory}:${job}`] ?? '');
  return { total: memory, segments: { os, apps, model, headroom }, sentence };
}
