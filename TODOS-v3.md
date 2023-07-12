## Prod

- [ ] create all `sc-*.html` files dynamically, the 404.html trick is not good, it (logically) returns a 404 HTML status
      

## Tests

- [ ] with all global css removed

## components updated

- [x] sc-bang
- [x] sc-button
  + [ ] remove selected option
  + [ ] add `behavior` attribute "switch" or "trigger"?
- [ ] sc-chenillard
  + [ ] move into metronome for now
- [x] sc-clock
- [ ] sc-context-menu (is kind of broken for now...)
- [x] sc-dial
  + [ ] support keyboard arrows
  + [ ] add label
- [x] sc-dot-map
- [ ] sc-dragndrop
- [x] sc-editor
- [ ] sc-file-tree
- [x] sc-flash
- [x] sc-icon
- [x] sc-loop
- [x] sc-matrix
  + [ ] highlight row and or column
- [ ] sc-midi
- [x] sc-number
  + [ ] focus
  + [ ] open numeric keyboard on touchscreens
- [x] sc-position-surface
- [ ] sc-progress-bar
- [x] sc-radio
- [x] sc-record
- [x] sc-return -> sc-prev
- [x] sc-next
- [x] sc-signal
- [x] sc-slider 
  + [ ] focus
  + [ ] disabled
  + [ ] keyboard
- [x] sc-speed-surface
- [x] sc-tap-tempo
- [x] sc-text
- [x] sc-toggle
  + [ ] focus
- [ ] sc-transport

## Notes

### new nodes

- [x] sc-knob / sc-dial
- [x] sc-select
- [x] sc-radio
- [x] sc-switch
- [ ] sc-tab (cf. live.tab in Max)
- [ ] sc-qrcode
- [ ] multislider
- [ ] sc-keyboard
- [x] sc-code-example
- [ ] sc-panel (open close panel) cf. dat.gui.js

### audio components
- [ ] sc-resume-context
- [ ] sc-record -> return audio buffer or .wav file
- [ ] sc-waveform -> option to play the file
- [ ] sc-meter

### interactions

- [ ] keyboard
- [ ] undo / redo (for components that have a @change event)
- [ ] editable attribute? or component w/ slot
- [ ] bypass focus when disabled

### sc-number

- open keyboard on phone
- use @touchstart to create an `<input type="number" />` and focus on it?

### keyboard controls

- Enter for sc-bang, trigger, etc.
- Arrows for dial, number, sliders - pattern

```js
  _onFocus() {
    this._numKeyPressed = 0;
    window.addEventListener('keydown', this.onKeyDown);
  }

  _onBlur() {
    this.updateValueFromDisplayValue();
    window.removeEventListener('keydown', this.onKeyDown);
  }
```

### file-tree

- new layout

### midiValue

check if must be in properties
