import { html } from 'lit';

import '../../src/sc-editor.js';

// see https://github.com/ircam-ismm/sc-components/issues/15
// did not find a way to reproduce yet...

export const template = html`
  <div style="display: flex; align-content: stretch; align-items: stretch;">
     <sc-editor style="height: 100%; width: 100%"></sc-editor>
  </div>

  <!-- <div style="width: 50vw; height: 50vh;">
    <sc-editor style="width: 100%; height: 100%"></sc-editor>
  </div> -->

  <!-- <sc-editor style="width: 50vw; height: 100%;"></sc-editor> -->
`;
