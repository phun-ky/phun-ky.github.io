import { createHash } from 'node:crypto';

// The Content Security Policy every page gets, as a <meta> tag: GitHub Pages
// can't send headers. Nothing loads from other hosts, so every source is the
// site itself. Inline scripts and <style> blocks are allowed by their hash,
// computed from the built page; inline style attributes are allowed because
// a few posts and Prism's inline-color plugin use them, and they can't run
// code. A <meta> policy can't set frame-ancestors, report-to or sandbox.
const sha256 = (text) =>
  `'sha256-${createHash('sha256').update(text).digest('base64')}'`;
const unique = (values) => [...new Set(values)];

export const INLINE_SCRIPT =
  /<script\b(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;

export const INLINE_STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

export const CSP_META =
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?>\s*/gi;

export const REFERRER_META =
  '<meta name="referrer" content="strict-origin-when-cross-origin" />';

/**
 * Hashes of every inline script and <style> block in a page.
 * @param {string} html - The page.
 * @returns {{ scripts: string[], styles: string[] }} CSP hash sources.
 */
export const inlineHashes = (html) => ({
  scripts: unique(
    [...html.matchAll(INLINE_SCRIPT)].map(([, code]) => sha256(code))
  ),
  styles: unique([...html.matchAll(INLINE_STYLE)].map(([, css]) => sha256(css)))
});

/**
 * The policy for a page.
 * @param {string} html - The page.
 * @returns {string} The policy.
 */
export const policyFor = (html) => {
  const { scripts, styles } = inlineHashes(html);

  return [
    "default-src 'none'",
    ["script-src 'self'", ...scripts].join(' '),
    ["style-src 'self'", ...styles].join(' '),
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
    'upgrade-insecure-requests'
  ].join('; ');
};
