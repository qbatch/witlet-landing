#!/usr/bin/env node
/**
 * Fails the build if the hosted model catalog is missing, unsigned or broken, so a bad
 * deploy never replaces the good one on Cloudflare Pages (a failed build isn't published).
 *
 *   node scripts/check-catalog.mjs [dist/catalog/v1.json]
 *
 * The file itself is made in the Mac app repo with Scripts/publish-catalog.mjs; never edit
 * it by hand (any change breaks the signature).
 */
import { readFileSync } from 'node:fs';
import { createPublicKey, verify } from 'node:crypto';

const file = process.argv[2] ?? 'dist/catalog/v1.json';
const trusted = JSON.parse(readFileSync(new URL('../catalog-keys.json', import.meta.url), 'utf8')).keys;

function fail(message) {
  console.error(`Catalog check failed (${file}): ${message}`);
  process.exit(1);
}

let envelope;
try {
  envelope = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  fail(`can't read it (${error.message}). Run Scripts/publish-catalog.mjs in the Mac app repo.`);
}
if (envelope.format !== 1) fail(`unknown format ${envelope.format}`);
const keyBase64 = trusted[envelope.keyID];
if (!keyBase64) fail(`signed with key "${envelope.keyID}", which isn't in catalog-keys.json`);

const key = createPublicKey({
  key: { kty: 'OKP', crv: 'Ed25519', x: Buffer.from(keyBase64, 'base64').toString('base64url') },
  format: 'jwk',
});
const bytes = Buffer.from(envelope.catalog ?? '', 'base64');
if (!verify(null, bytes, key, Buffer.from(envelope.signature ?? '', 'base64'))) {
  fail('the signature does not match. Was the file edited by hand?');
}

const catalog = JSON.parse(bytes.toString('utf8'));
if (catalog.version !== 1 || !Number.isInteger(catalog.serial)) fail('missing version or serial');
for (const memory of ['8', '16', '24', '32', '64']) {
  for (const option of ['A', 'B', 'C']) {
    const id = catalog.tiers?.[memory]?.[option];
    if (!id || !catalog.models?.[id]) fail(`${memory} GB option ${option} has no model`);
  }
}
console.log(`Catalog OK: serial ${catalog.serial}, key ${envelope.keyID}, ${Object.keys(catalog.models).length} models`);
