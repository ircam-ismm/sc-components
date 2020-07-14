# `simple-components`

> Set of WebComponents dedicated to creating audio interfaces

## Documentation

[http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/)

## Installation

```sh
npm install @ircam/simple-components --save
```

## Usage

### native

### lit-element

### react

### vue

```js

```

## Design Consideration
  
These design decisions aim at simplifying later wrapping of the components in a edition library.

### Attributes

All components must expose a `width` and `height` attribute, for squared components (e.g. `<sc-bang>` and `<sc-toggle>`) the last attribute set wins

### Events

- rationalize events: all components should have at least an `input`. 
- a `change` event should be trigerred on interaction end (as with `[type=range]`) when it makes sens (e.g. `number`, `slider`)
- components can expose additional events, e.g. button `press` and `release`
- the payload should always be `e.details.value`

- [tbc] : all components should implement a `triggerChange` function allowing trigger a `change`  event from outside with current value


## v1.0.0.

- [done] `<sc-slider>` --> add a `display-number` attribute in `sc-slider`
- [done] `<sc-text>`
- [done] `<sc-bang>`
- [done] rename `<sc-surface>` to `<sc-position-surface>`
- [done] styles: use theme colors everywhere
- [done] styles: hardcode font-size

- [done] `<sc-signal>`

Note `<sc-preset>`: keep this in soundworks-template for now...

## todos

- `<sc-message>`
- `<sc-range>`
- `<sc-multislider>`
- `<sc-matrix>`
- `<sc-volume>` (slider and number w/ db and lin output)
- `<sc-select>`
- `<sc-radio>`
- `<sc-pan>`
- `<sc-dial>` (maybe we just have to accept some people like that sort of thing...)

- `sc-vu-meter`


- theming
  + https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  + https://lit-element.polymer-project.org/guide/styles#example-theme

## Related libraries

- NexusUI

## Credits

@todo

## License

BSD-3-Clause
