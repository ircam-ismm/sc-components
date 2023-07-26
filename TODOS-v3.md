## Deployement

- [ ] provide an unpkg version

## Doc

- [x] create all `sc-*.html` files dynamically, the 404.html trick is not good, it (logically) returns a 404 HTML status      

## Tests

- [x] with all global css removed

## components updated

- [x] sc-bang
- [x] sc-button
  + [ ] remove selected option (?)
  + [ ] add `behavior` attribute "switch" or "trigger"?
- [ ] sc-chenillard
  + [ ] remove, just move into metronome codebase for now
- [x] sc-clock
- [ ] sc-context-menu (is kind of broken for now...)
  + [ ] do not expose, just use it in `sc-filetree`
- [x] sc-dial
  + [ ] support keyboard arrows
  + [ ] add label (?)
- [x] sc-dot-map
- [x] sc-dragndrop
- [x] sc-editor
- [x] sc-filetree
- [x] sc-flash
- [x] sc-icon
- [x] sc-loop
- [x] sc-matrix
  + [ ] highlight row and/or column
- [ ] sc-midi
- [x] sc-number
  + [x] use keyboard on touch screens
- [x] sc-position-surface
- [ ] sc-progress-bar
  --> should we expose that?
- [x] sc-radio
- [x] sc-record
- [x] sc-return -> sc-prev
- [x] sc-next
- [x] sc-signal
  + [ ] implement observer attribute, cf. https://github.com/ircam-ismm/simple-components/issues/6
- [x] sc-slider 
- [x] sc-speed-surface
- [x] sc-tap-tempo
- [x] sc-text
- [x] sc-toggle
- [x] sc-transport

## Notes

### new nodes

- [x] sc-knob / sc-dial
- [x] sc-select
- [x] sc-radio
- [x] sc-tab (cf. live.tab in Max)
- [x] sc-switch
- [x] sc-keyboard
- [ ] sc-qrcode
- [ ] sc-multislider
- [ ] sc-range
- [ ] sc-breakpoint (see .bak)
- [x] sc-code-example
- [ ] sc-panel (open close panel) cf. dat.gui.js

### audio components

- [ ] sc-resume-context
- [ ] sc-record -> return audio buffer or .wav file
- [ ] sc-waveform -> option to play the file
- [ ] sc-meter

### Check/improve interactions on all components

- [ ] focus
- [ ] disabled
- [ ] bypass focus when disabled
- [ ] keyboard
- [ ] undo / redo (for components that have a @change event) (?)
- [ ] editable attribute or component w/ slot

- [ ] global save/restore state / presets, 
  + [ ] generalize over sc-midi
  + [ ] generate some serialized version of the state (e.g. share link, etc.)
  + [ ] should integrate properly with soundwork's states too

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
