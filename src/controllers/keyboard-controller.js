
class KeyboardController {
  constructor(host, options) {
    if (!options.callback) {
      throw new Error(`keyboard-controller: callback option is mandatory`);
    }

    this._host = host;

    // e.code is not altered by keyboard layout
    // cf. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    this._filterCodes = options.filterCodes || [];
    // e.key is relative to actuallocale and layout
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    this._filterKeys = options.filterKeys || [];
    this._callback = options.callback;
    // trigger a new keypress only if keyup has been triggered
    this._deduplicateEvents = options.deduplicateEvents || false;
    this._debug = options.debug || false;
    this._codeLastEventTypeMap = new Map(); // Map<code, eventType>

    host.addController(this);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this._triggerEvent = this._triggerEvent.bind(this);
  }

  hostConnected() {
    this._host.addEventListener('focus', this._onFocus);
    this._host.addEventListener('blur', this._onBlur);
  }

  hostDisconnect() {
    this._host.removeEventListener('focus', this._onFocus);
    this._host.removeEventListener('blur', this._onBlur);
  }

  _onFocus() {
    document.addEventListener('keydown', this._triggerEvent);
    document.addEventListener('keyup', this._triggerEvent);
  }

  _onBlur() {
    document.removeEventListener('keydown', this._triggerEvent);
    document.removeEventListener('keyup', this._triggerEvent);
  }

  _triggerEvent(e) {
    if (this._debug) {
      console.log('code:', e.code, '- key:', e.key);
    }

    if (this._filterCodes.includes(e.code) || this._filterKeys.includes(e.key)) {
      // prevent default only if key is one of the requested ones
      e.preventDefault();

      if (this._deduplicateEvents) {
        const lastEventType = this._codeLastEventTypeMap.get(e.code);

        if (lastEventType === e.type) {
          return;
        }
      }

      this._codeLastEventTypeMap.set(e.code, e.type);
      this._callback(e);
    }
  }
}

export default KeyboardController;
