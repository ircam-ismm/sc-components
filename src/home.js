import { html } from 'lit';

export const template = html`
<div id="homepage">
  <h1>@ircam/sc-components</h1>

  <a href="https://badge.fury.io/js/@ircam%2Fsc-components">
    <img alt="npm version" src="https://badge.fury.io/js/@ircam%2Fsc-components.svg" />
  </a>

  <div style="margin-top: 20px">
    <img src="./assets/logo-200x200.png" alt="logo" />
  </div>

  <p>Simple and robust Web Component library for rapid prototyping of audio and creative applications in the browser.</p>

  <div id="demo">
    <sc-bang></sc-bang>
    <sc-number></sc-number>
    <sc-slider></sc-slider>
    <sc-dial></sc-dial>
    <sc-toggle></sc-toggle>
    <sc-text>some text</sc-text>
    <sc-switch></sc-switch>
  </div>

  <h2 style="margin-top: 60px;">Goal & Philosophy</h2>

  <p>
    This is a rather opinionated library, that primarily aims to provide practical and robust interfaces for practitionners in working and performance situations. Hence, it proposes different interaction modalities such as keyboard and MIDI controls where meaningful, and pretty agressively bypasses or overrides certain default browser's behaviours such as context menus, text selection, etc.
  </p>

  <h2 style="margin-top: 60px;">Usage</h2>

  <h3>With npm and bundlers</h3>

  <p>
    Install the library using npm (or yarn, or whatever)
  </p>

  <sc-code-example language="shell">${`
npm install --save @ircam/sc-components
  `}</sc-code-example>

  <p>Each components lives in its own file and can be imported separately, e.g.:</p>

  <sc-code-example language="javascript">${`
import { html, render } from 'lit';
import '@ircam/sc-components/sc-toggle.js';

render(html\`
  <sc-toggle
    @change=\${e => console.log(e)}
  ></sc-toggle>
\`, document.body);
  `}</sc-code-example>

  <p>
    For convenience, we also provide a global entry point which imports all components. However, in most cases you should avoid using this shortcut to keep your bundle size as small as possible:
  </p>

  <sc-code-example language="javascript">${`
import '@ircam/sc-components';
  `}</sc-code-example>


  <h3>With unpkg</h3>

  <p>
    If you don't use a bundler or for simple testing, you can also use the library from [https://unpkg.com/](https://unpkg.com/).
  </p>

  <h4>In HTML file</h4>

  <sc-code-example language="html">${`
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@ircam/sc-components@latest"></script>
</head>
<body>
  <sc-toggle></sc-toggle>
  <script>
    const $toggle = document.querySelector('sc-toggle');
    $toggle.addEventListener('change', e => console.log('Hello toggle', e.detail.value));
  </script>
</body>
<body>
  `}</sc-code-example>

  <h4>In JS file</h4>

  <sc-code-example language="html">${`
import { html, render } from 'https://unpkg.com/lit-html?module';
import 'https://unpkg.com/@ircam/sc-components@latest';

render(html\`
  <sc-toggle
    @change=\${e => console.log('Hello toggle', e.detail.value)}
  ></sc-toggle>
\`, document.body);
  `}</sc-code-example>

  <p>
    Note that this method will import the whole bundled library which is quite large. You may not want to use this is production._
  </p>

  <h3>Integration within other frameworks</h3>

  <p>The library has not been tested within other frameworks such as React or Vue yet.</p>
  <p>Any feedback is welcome!</p>

  <h2 style="margin-top: 60px;">License</h2>

  <a target="_blank" href="https://github.com/ircam-ismm/sc-components/blob/main/LICENSE">BSD-3-Clause</a>

  <div style="height: 120px;"></div>
`;
