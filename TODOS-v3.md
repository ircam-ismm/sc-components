## components updated

- [x] sc-bang
- [x] sc-button
  + [ ] remove selected option
  + [ ] add `behavior` attribute "switch" or "trigger"
- [ ] sc-chenillard
- [x] sc-clock
- [ ] sc-context-menu
- [x] sc-dial
  + [ ] support keyboard arrows
  + [ ] add label
- [ ] sc-dot-map
- [ ] sc-dragndrop
- [ ] sc-editor
- [ ] sc-file-tree
- [ ] sc-flash
- [x] sc-icon
- [ ] sc-loop
- [ ] sc-matrix
- [ ] sc-midi
- [x] sc-number
  + [ ] focus
  + [ ] open numeric keyboard on touchscreens
- [ ] sc-position-surface
- [ ] sc-progress-bar
- [x] sc-radio
- [ ] sc-record
- [ ] sc-return -> sc-backward
- [ ] sc-signal
- [x] sc-slider 
  + [ ] focus
  + [ ] disabled
  + [ ] keyboard
- [ ] sc-speed-surface
- [ ] sc-tap-tempo
- [x] sc-text
- [x] sc-toggle
  + [ ] focus
- [ ] sc-transport

## Notes

### new nodes

- [x] sc-knob / sc-dial
- [ ] sc-select (drop down list, radio or buttons)
- [ ] sc-switch
- [ ] sc-qrcode
- [ ] multislider
- [ ] sc-keyboard
- [ ] sc-code-example

### audio components
- [ ] sc-resume-context
- [ ] sc-record -> return audio buffer or .wav file
- [ ] sc-waveform -> option to play the file
- [ ] sc-meter


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
