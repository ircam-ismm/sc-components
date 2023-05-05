import { html, css } from 'lit';
import ScElement from './ScElement.js';
import { fontFamily, fontSize, theme } from './styles.js';


const questionMark = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-100 -100 1200 1200" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path fill="white" d="M500,9.9c270.1,0,490.5,220.6,490,490.3c-0.5,270.7-220.6,490.6-490.3,489.9C229.2,989.4,10.4,770.5,10,500.1C9.6,230.3,229.9,9.9,500,9.9z M943.7,499.9c0-244.4-198-443-443.5-443.5C255.5,55.9,56.6,254.5,56.3,499.9c-0.3,244.4,198.3,442.9,443.4,443.6C743.8,944.2,943.8,744.5,943.7,499.9z M527.3,658.3c-20.9,0-41.3,0-62.2,0c0-12.4-0.7-24.6,0.1-36.7c1.6-24.4,7.3-47.9,20-69.2c9.9-16.6,22.6-30.9,36.7-44c17.5-16.3,35.1-32.4,52.3-49.1c10.1-9.8,19-20.8,23.7-34.4c11.2-32.7,4-61.8-17.7-87.8c-36.1-43.1-96.4-44.6-133.4-23c-23.3,13.6-37.3,34.4-45.4,59.5c-3.7,11.2-6.2,22.8-9.5,35.1c-21.5-2.5-43.5-5.2-66.3-7.9c0.9-5.7,1.5-11,2.5-16.3c5.7-29.6,15.9-57.2,35.3-80.8c23.5-28.8,54.2-45.6,90.3-52.5c37.7-7.2,75.3-6.5,112,5.5c46.9,15.2,81.6,45,97.4,92.4c15.1,45.5,7.7,88.5-22.1,127c-18.9,24.4-42.4,44.2-64.5,65.4c-9.7,9.3-19.6,18.7-28,29.2c-12.5,15.5-17.3,34.3-18.8,53.9C528.6,635.5,528.1,646.6,527.3,658.3z M461,790c0-24.6,0-48.9,0-73.7c24.6,0,49,0,73.7,0c0,24.5,0,48.9,0,73.7C510.3,790,485.8,790,461,790z"/></g>
</svg>`

class ScIconButton extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      backgroundColor: {
        type: String,
      },
      icon: {
        type: String,
      },
      tooltip: {
        type: String,
      },
      value: {
        type: String,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        overflow: hidden;
      }

      div {
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
        border-radius: 2px;
        box-sizing: border-box;
        border: 1px solid ${theme['--color-primary-2']};
      }

      div:active {
        opacity: 0.7;
      }
    `;
  }

  set width(value) {
    this._size = value;
    this.requestUpdate();
  }

  get width() {
    return this._size;
  }

  set height(value) {
    this._size = value;
    this.requestUpdate();
  }

  get height() {
    return this._size;
  }

  constructor() {
    super();

    this.width = 30;
    this.height = 30;
    this.backgroundColor = theme['--color-primary-1'];
    this.icon = `"data:image/svg+xml,${encodeURIComponent(questionMark)}"`;

    this._pressed = false;

    this.onEvent = this.onEvent.bind(this);
  }

  /**
   * @todo - add `down` and `up` events
   */
  render() {
    const text = this.text ? this.text : this.value;

    return html`
      <div
        style="
          width: ${this.width}px;
          height: ${this.height}px;
          background-color: ${this.backgroundColor};
          background-image: url(${this.icon});
        "
        @mousedown="${this.onEvent}"
        @mouseup="${this.onEvent}"

        @touchstart="${{
          handleEvent:this.onEvent,
          passive: false,
        }}"
        @touchend="${this.onEvent}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `;
  }

  onEvent(e) {
    e.preventDefault();
    let eventName;

    if (e.type === 'touchend' || e.type === 'mouseup') {
      eventName = 'release';
    } else {
      eventName = 'press'
    }

    // we don't want to trigger a release if no pressed has been recorded
    if (eventName === 'release' && this._pressed === false) {
      return;
    }

    this._pressed = (eventName === 'press');

    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);

    if (eventName === 'press') {
      const inputEvent = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(inputEvent);
    }
  }
}

if (customElements.get('sc-icon-button') === undefined) {
  customElements.define('sc-icon-button', ScIconButton);
}

export default ScIconButton;

