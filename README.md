# sc-components

[![npm version](https://badge.fury.io/js/@ircam%2Fsc-components.svg)](https://badge.fury.io/js/@ircam%2Fsc-components)

Web Components for audio interfaces and rapid prototyping, based on the [lit](https://lit.dev/) library.

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

## Integration with other frameworks

For now, the library has never been tested within other frameworks such as React or Vue as these are not part of our stack.  
Any feedback on such attempt would be welcome!

## License

[BSD-3-Clause](./LICENSE)
