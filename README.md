# sc-components

[![npm version](https://badge.fury.io/js/@ircam%2Fsc-components.svg)](https://badge.fury.io/js/@ircam%2Fsc-components)

![sc-components logo](./docs/assets/logo-200x200.png)

Simple and robust Web Component library for rapid prototyping audio and creative applications in the browser. 

![banner](./docs/assets/banner.png)

The library is built with [lit](https://lit.dev/).

## Demo and Documentation

[http://ircam-ismm.github.io/sc-components/](http://ircam-ismm.github.io/sc-components/)

## Goal & Philosophy

This is a (very) opinionated library, which focuses on implementing interfaces that just work in working / performance situations. Hence, it's pretty agressive considering certain default browser's behaviours (which some might consider bad design). 

To make it short: it doesn't care of _not_ evergreen browsers, doesn't care of semantics, doesn't care of breaking regular users expectations, etc. It just aims to be practical, intuitive and robust for devs and practitioners. 

If you agree with that, any PR, issues, monkey testing and/or feedback of any kind is welcome. If you don't, but appreciate the lib nonetheless, its welcome too (but there will probably be more discussions :)

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

## Running the doc locally

```js
npm install
npm run doc
```

<!--
  todos
## Theming and styling

### Global CSS variables

### Styling components

## The sc-* ecosystem

## Contributing

## Credits
-->

## License

[BSD-3-Clause](./LICENSE)
