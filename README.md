# `simple-components`

> set of web components for audio interfaces and rapid prototyping, created using the [lit-element](https://lit-element.polymer-project.org/) library.

## Warning

Some components are broken with `lit-html 2`, please use version `lit-html#v1.4.1`

cf. [https://github.com/ircam-ismm/simple-components/issues/7](https://github.com/ircam-ismm/simple-components/issues/7)

## Documentation

[http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/)

## Installation

```sh
npm install @ircam/simple-components --save
```

## Usage

@todo

## Design Consideration

These design aspects aim at simplifying future wrapping of the components in an editing tool.

### Attributes

All components must expose a `width` and `height` attribute, for squared components (e.g. `<sc-bang>` and `<sc-toggle>`) the last attribute set wins

### Events

- all components should at least expose an `@input` or a `@change` event.
- they can expose additional events, e.g. button `@press` and `@release`
- payload should always have `e.details.value`

## Notes

## Existing components

see. documentation ([http://ircam-ismm.github.io/simple-components/](http://ircam-ismm.github.io/simple-components/))

## @todos

- `<sc-range>`
- `<sc-multislider>`
- `<sc-matrix>`
- `<sc-volume>` (slider and number w/ db and lin output)
- `<sc-pan>`
- `<sc-select>`
- `<sc-radio>`
- `<sc-dial>` (maybe we just have to accept some people like that sort of thing...)

## @fixme

- `<sc-number>` allows (display) values such as "0000."

### theming
  + https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  + https://lit-element.polymer-project.org/guide/styles#example-theme

## License

BSD-3-Clause
