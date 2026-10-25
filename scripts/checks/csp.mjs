import fs, { globSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import { policyFor } from '../csp/policy.mjs';

// Checks the Content Security Policy of every built page: each page has
// exactly one policy, before any script, style or stylesheet, and it is the
// policy policy.mjs makes for that page, so it allows exactly the page's own
// inline scripts and styles and no host. check:browser loads every page and
// fails on any violation, so the policy also allows everything a page uses.
const DIST_DIR = process.argv[2] ?? 'dist';
const POLICY =
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"\s*\/?>/gi;
const FIRST_RESOURCE = /<(script|style)\b|<link\b[^>]*rel="stylesheet"/i;
const failures = [];
const files = globSync('**/*.html', { cwd: DIST_DIR }).sort();

files.forEach((file) => {
  const html = fs.readFileSync(join(DIST_DIR, file), 'utf-8');
  const policies = [...html.matchAll(POLICY)];

  if (policies.length !== 1) {
    failures.push(`${file}: ${policies.length} policies, expected 1`);

    return;
  }

  const [{ 1: policy, index }] = policies;
  const resource = html.search(FIRST_RESOURCE);

  if (resource !== -1 && resource < index) {
    failures.push(`${file}: a script or style comes before the policy`);
  }

  if (policy !== policyFor(html.replace(policies[0][0], ''))) {
    failures.push(`${file}: the policy doesn't match the page's inline code`);
  }
});

if (failures.length !== 0) {
  failures.forEach((failure) => console.error(failure));
  console.error(`${failures.length} problem(s) on ${files.length} pages`);
  process.exit(1);
}

console.log(
  `csp: ${files.length} pages have one policy that matches their inline code`
);
