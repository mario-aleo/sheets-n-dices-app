import { html, fixture, expect } from '@open-wc/testing';

import '../src/sheets-n-dices';

describe('<sheets-n-dices>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<sheets-n-dices></sheets-n-dices>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <sheets-n-dices title="different"></sheets-n-dices>
    `);
    expect(el.title).to.equal('different');
  });
});
