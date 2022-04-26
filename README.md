# `simple-components`

> set of web components for audio interfaces and rapid prototyping, created using the [lit-element](https://lit-element.polymer-project.org/) library.

## Documentation

[http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/)

## Installation

```sh
npm install @ircam/simple-components --save
```

To support older browser, you should import `webcomponentsjs/webcomponents-bundle.js` and `./vendors/lit/polyfill-support.js`

A possible solution is to copy the file from your `node_modules` folder into a directory
exposed by your server using postinstall scripts

```json
# package.json
"scripts": {
  "postinstall": "mkdir -p ./vendors && cp -R node_modules/@webcomponents/webcomponentsjs ./vendors/ && cp -R node_modules/lit ./vendors/",
  // ...
}
```

```html
<script defer src="./vendors/webcomponentsjs/webcomponents-bundle.js"></script>
<script defer src="./vendors/lit/polyfill-support.js"></script> 
```

Such strategy as been implemented in the `docs` directory.

## Usage

All components live in their own file and should be imported separately, e.g.

```js 
import '@babel/polyfill';
import { html, render } from 'lit/html.js';
import '@ircam/simple-components/sc-toggle.js'

render(html`
  <sc-toggle
    @change="${e => console.log(e)}"
  ></sc-toggle>
`, document.body);
```

## Existing components

see. documentation ([http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/))


## Design Considerations

These design aspects aim at simplifying future wrapping of the components in an editing tool.

### Attributes

All components must expose a `width` and `height` attribute, for squared components (e.g. `<sc-bang>` and `<sc-toggle>`) the last attribute set wins

### Events

- all components should at least expose an `@input` or a `@change` event.
- they can expose additional events, e.g. button `@press` and `@release`
- payload should always have `e.details.value`

## @todos

### new elements

- `<sc-range>`
- `<sc-multislider>`
- `<sc-volume>` (slider and number w/ db and lin output)
- `<sc-pan>`
- `<sc-select>`
- `<sc-radio>`
- `<sc-dial>` (maybe we just have to accept some people like that sort of thing...)

### theming
  + https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  + https://lit-element.polymer-project.org/guide/styles#example-theme

## License

BSD-3-Clause
