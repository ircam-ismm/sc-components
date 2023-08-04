# sc-components

[![npm version](https://badge.fury.io/js/@ircam%2Fsc-components.svg)](https://badge.fury.io/js/@ircam%2Fsc-components)

![sc-components logo](./docs/assets/logo-200x200.png)

Simple and robust Web Component library for rapid prototyping audio and creative applications in the browser. 

![banner](./docs/assets/banner.png)

The library is built with [lit](https://lit.dev/).

## Demo and Documentation

[http://ircam-ismm.github.io/sc-components/](http://ircam-ismm.github.io/sc-components/)

## Goal & Philosophy

This is a quite opinionated library, which aims to propose practical and robust interfaces for practitionners in working and performance situations. Hence, it pretty agressively bypass or override certain default browser's behaviours such as context menus, text-selection, etc. While some may consider this bad design, this is actually a design choice.

## Usage

### With npm and bundlers

Install the library using npm (or yarn, or whatever)

```sh
npm install --save @ircam/sc-components
```

Each components lives in its own file and can be imported separately, e.g.:

```js
import { html, render } from 'lit';
import '@ircam/sc-components/sc-toggle.js';

render(html`
  <sc-toggle
    @change=${e => console.log(e)}
  ></sc-toggle>
`, document.body);
```

For convenience, we also provide a global entry point which imports all components. However, in most cases you should avoid using this shortcut to keep your bundle size as small as possible:

```js
import '@ircam/sc-components';
```

### With unpkg

If you don't use a bundler or for simple testing, you can also use the library from [https://unpkg.com/](https://unpkg.com/).

#### In HTML file

```html
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
```

#### In JS file

```js
import { html, render } from 'https://unpkg.com/lit-html?module';
import 'https://unpkg.com/@ircam/sc-components@latest';

render(html`
  <sc-toggle
    @change=${e => console.log('Hello toggle', e.detail.value)}
  ></sc-toggle>
`, document.body);
```

_Note that this method will import the whole bundled library which is quite large. You may not want to use this is production._

### Integration within other frameworks

The library has not been tested within other frameworks such as React or Vue yet.

Any feedback is be welcome!

## Development notes

### Run the doc and tests locally

```sh
npm install
npm run doc
```

Alongside the docs, which already helps to develop and fix most issues, the `tests` directory allows to isolate test cases that would not fit in the docs.

```sh
npm install
npm run test
```

### Unlock context menu

When developing, having the possibility to right-click on an element to inspect it can be very handy. You can re-enable this behavior by setting the `SC-DEBUG` global variable to `true`:

```js
window.SC_DEBUG = true;
```

Note that this is the case when the docs and tests are run locally:

```js
window.SC_DEBUG = window.location.hostname === 'localhost';
````

<!-- &todos
## Theming and styling
### Global CSS variables
### Styling components
## The sc-* ecosystem
## Contributing
## Credits
-->

## License

[BSD-3-Clause](./LICENSE)
