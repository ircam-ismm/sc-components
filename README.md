# sc-components

[![npm version](https://badge.fury.io/js/@ircam%2Fsc-components.svg)](https://badge.fury.io/js/@ircam%2Fsc-components)

Simple and robust Web Component library for rapid prototyping audio and creative applications in the browser. 

![banner](./docs/assets/banner.png)

The components are built on top of the [lit](https://lit.dev/) library.

## Documentation

[http://ircam-ismm.github.io/sc-components/](http://ircam-ismm.github.io/sc-components/)

## Installation

```sh
npm install lit @ircam/sc-components --save
```

## Usage

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

## Unpkg

For testing or if you don't use a bundler, you can also use the library from [https://unpkg.com/](https://unpkg.com/).

```js
import 'https://unpkg.com/@ircam/sc-components@latest';
```

### Example

```js
import { html, render } from 'https://unpkg.com/lit-html?module';
import 'https://unpkg.com/@ircam/sc-components@latest';

render(html`
  <sc-toggle
    @change=${e => console.log('Hello toggle', e.detail.value)}
  ></sc-toggle>
`, document.body);
```

## Integration

### Raw HTML and JavaScript

The components can be used without the `lit` helpers, e.g.

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

### Others

The library has not been tested yet within other frameworks such as React or Vue.

Any feedback is be welcome!

## License

[BSD-3-Clause](./LICENSE)
