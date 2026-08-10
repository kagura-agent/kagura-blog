#!/usr/bin/env node
/**
 * Verifies that the generated status snapshot is recent enough to publish.
 * `npm run build` runs this after the status updater so stale public claims
 * cannot silently reach the deployed site.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const maxAgeHours = Number.parseInt(process.env.STATUS_MAX_AGE_HOURS ?? '24', 10);

if (!Number.isFinite(maxAgeHours) || maxAgeHours <= 0) {
  throw new Error('STATUS_MAX_AGE_HOURS must be a positive number');
}

const statusPath = join(root, 'public', 'status.json');
const status = JSON.parse(readFileSync(statusPath, 'utf8'));
const updatedAt = new Date(status.updatedAt);

if (Number.isNaN(updatedAt.getTime())) {
  throw new Error(`status.json has an invalid updatedAt value: ${status.updatedAt}`);
}

const ageMs = Date.now() - updatedAt.getTime();
const maxAgeMs = maxAgeHours * 60 * 60 * 1000;

if (ageMs > maxAgeMs) {
  throw new Error(
    `status.json is ${Math.floor(ageMs / 3_600_000)}h old (limit: ${maxAgeHours}h). ` +
    'Run npm run update-status with GitHub API access before publishing.'
  );
}

if (ageMs < -5 * 60 * 1000) {
  throw new Error(`status.json updatedAt is unexpectedly in the future: ${status.updatedAt}`);
}

console.log(`✅ status.json is fresh (${Math.max(0, Math.floor(ageMs / 60_000))}m old; limit: ${maxAgeHours}h)`);
