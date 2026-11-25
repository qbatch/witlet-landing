#!/usr/bin/env node
/**
 * Exports shortlist-fixtures.json from src/data/demo.js: every memory size × job, with the
 * memory estimate (the bar and its sentence) and the A/B/C shortlist, raw and as displayed.
 *
 * The Witlet Mac app's tests load this file and check that its Swift port gives exactly
 * the same answers, so the app and the website never drift apart.
 *
 *   npm run fixtures                          # writes fixtures/shortlist-fixtures.json
 *   npm run fixtures -- path/to/output.json   # writes somewhere else
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { jobs } from '../src/content.js';
import { memorySizes, getEstimate, getShortlist, shortlistCell } from '../src/data/demo.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] ?? path.join(root, 'fixtures', 'shortlist-fixtures.json'));

const cases = [];
for (const memory of memorySizes) {
  for (const { id: job } of jobs) {
    const estimate = getEstimate(memory, job);
    const shortlist = getShortlist(memory, job).map((option) => ({
      ...option,
      cells: { download: shortlistCell(option, 'download'), roomLeft: shortlistCell(option, 'roomLeft') },
    }));
    cases.push({ memory, job, estimate, shortlist });
  }
}

const fixtures = {
  source: 'witlet-landing/src/data/demo.js',
  memorySizes,
  jobs: jobs.map((j) => j.id),
  cases,
};

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(fixtures, null, 2) + '\n');
console.log(`Wrote ${cases.length} cases to ${path.relative(process.cwd(), output)}`);
