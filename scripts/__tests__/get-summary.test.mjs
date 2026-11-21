import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getSummary } from '../posts/utils/get-summary.js';

describe('getSummary', () => {
  it('keeps an emoji whole when it ends the cut and there is no space', () => {
    const summary = getSummary(`<p>${'a'.repeat(157)}😀bb</p>`);

    assert.ok(summary.isWellFormed(), JSON.stringify(summary.slice(-3)));
    assert.equal(summary, `${'a'.repeat(157)}😀…`);
  });

  it('drops an emoji the cut would split when there is no space', () => {
    const summary = getSummary(`<p>${'a'.repeat(158)}😀bb</p>`);

    assert.equal(summary, `${'a'.repeat(158)}…`);
  });

  it('still cuts at the last space when there is one', () => {
    assert.equal(
      getSummary(`<p>${'word '.repeat(40)}</p>`),
      `${'word '.repeat(31).trim()}…`
    );
  });
});
