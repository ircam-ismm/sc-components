# `simple-components`

> set of web components for audio interfaces

## Documentation

[http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/)

## Installation

```sh
npm install @ircam/simple-components --save
```

## Usage

## Design Consideration
  
These design decisions aim at simplifying later wrapping of the components in a edition library.

### Attributes

All components must expose a `width` and `height` attribute, for squared components (e.g. `<sc-bang>` and `<sc-toggle>`) the last attribute set wins

### Events

- rationalize events: all components should have at least an `@input` or `@change` event. 
- components can expose additional events, e.g. button `@press` and `@release`
- payload should always be `e.details.value`

## Notes

## Existing components

see. documentation

## @todos

- `<sc-range>`
- `<sc-multislider>`
- `<sc-matrix>`
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
