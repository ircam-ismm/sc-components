# sc-components

[![npm version](https://badge.fury.io/js/@ircam%2Fsc-components.svg)](https://badge.fury.io/js/@ircam%2Fsc-components)

Simple and robust Web Component library for rapid prototyping audio and creative applications in the browser. 

![banner](./docs/assets/banner.png)

The library is built on top of [lit](https://lit.dev/).

## Demo and Documentation

[http://ircam-ismm.github.io/sc-components/](http://ircam-ismm.github.io/sc-components/)

## Usage

### With NPM and bundlers

#### Installation

```sh
npm install @ircam/sc-components --save
```

#### Usage

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

## With Unpkg

If you don't use a bundler or for testing, you can also use the library from [https://unpkg.com/](https://unpkg.com/). Note that this will import the whole bundled library which is quite large, you may not want to use this is production.

### In HTML file

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

### In a JS file

```js
import { html, render } from 'https://unpkg.com/lit-html?module';
import 'https://unpkg.com/@ircam/sc-components@latest';

render(html`
  <sc-toggle
    @change=${e => console.log('Hello toggle', e.detail.value)}
  ></sc-toggle>
`, document.body);
```

## Integration within other frameworks

The library has not been tested within other frameworks such as React or Vue yet.

Any feedback is be welcome!

<!--
  todos
## Theming

### Global CSS variables

### Styling components

## The sc-* ecosystem

## Contributing

## Credits
-->

## License

[BSD-3-Clause](./LICENSE)
