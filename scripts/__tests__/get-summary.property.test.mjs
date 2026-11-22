import fc from 'fast-check';

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getSummary } from '../posts/utils/get-summary.js';

const html = fc
  .array(
    fc.oneof(
      fc.constantFrom(
        '<p>',
        '</p>',
        '<p class="lead">',
        '<b>',
        '</b>',
        '<',
        '>',
        '&nbsp;',
        ' ',
        '\n',
        '<figure>',
        '</figure>',
        '<pre>',
        '</pre>',
        '<div class="message">',
        '</div>'
      ),
      fc.string({ unit: 'grapheme' })
    ),
    { maxLength: 60 }
  )
  .map((parts) => parts.join(''));
const prose = fc
  .array(fc.stringMatching(/^[a-z]{1,12}$/), { minLength: 1, maxLength: 60 })
  .map((words) => words.join(' '));

describe('getSummary properties', () => {
  it('is at most 160 characters', () => {
    fc.assert(
      fc.property(html, (page) => {
        assert.ok(getSummary(page).length <= 160);
      })
    );
  });

  it('is plain text: no angle brackets and no stray whitespace', () => {
    fc.assert(
      fc.property(html, (page) => {
        const summary = getSummary(page);

        assert.doesNotMatch(summary, /[<>]/);
        assert.equal(summary, summary.trim());
        assert.doesNotMatch(summary, /\s\s/);
      })
    );
  });

  it('keeps a short paragraph whole and cuts a long one after a word', () => {
    fc.assert(
      fc.property(prose, (text) => {
        const summary = getSummary(`<p>${text}</p>`);

        if (text.length <= 160) {
          assert.equal(summary, text);
        } else {
          assert.ok(summary.endsWith('…'));
          assert.ok(`${text} `.startsWith(`${summary.slice(0, -1)} `));
        }
      })
    );
  });

  it('skips figures, code and note boxes before the first paragraph', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.tuple(
            fc.constantFrom(
              ['<figure><p>', '</p></figure>'],
              ['<pre><p>', '</p></pre>'],
              ['<div class="note message"><p>', '</p></div>']
            ),
            prose
          ),
          { minLength: 1 }
        ),
        // At least 40 characters, so it is the paragraph a summary uses
        prose.filter((text) => text.length >= 40),
        (skipped, text) => {
          const before = skipped
            .map(([[open, close], noise]) => `${open}${noise}${close}`)
            .join('');

          assert.equal(
            getSummary(`${before}<p>${text}</p>`),
            getSummary(`<p>${text}</p>`)
          );
        }
      )
    );
  });
});
