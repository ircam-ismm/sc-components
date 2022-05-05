import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScTransport extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      buttons: {},
      state: {
        type: String,
      },
      value: {},
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        font-size: 0 !important;
        cursor: pointer;
      }

      div {
        display: inline;
        margin-right: 5px;
      }

      svg {
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid ${theme['--color-primary-2']};
        background-color: ${theme['--color-primary-2']};
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

  set buttons(value) {
    const replace = value.replace(/[\[\]\s]/g, '');
    this._buttons = replace.split(',');
    this.requestUpdate();
  }

  constructor() {
    super();

    this.width = 30;
    this.height = 30;
    this.value = true;
    this.buttons = "['play']";
    this.state = undefined;

    this.renderFunctions = {
      'play': this.renderPlay,
      'pause': this.renderPause,
      'stop': this.renderStop,
    };
  }

  renderPlay(context) {
    const size = context._size - 2;

    return html`
      <div>
        <svg 
          style="
            width: ${size}px;
            height: ${size}px;
          "
          viewbox="0 0 20 20"
          @mousedown="${e => context._onChange(e, 'play')}"
          @touchstart="${e => context._onChange(e, 'play')}"
          @contextmenu="${context._preventContextMenu}"
        >
          ${context.state === 'play'
            ? svg`
                <polygon 
                  style="fill: ${theme['--color-secondary-4']}"
                  class="play-shape" 
                  points="6, 5, 15, 10, 6, 15"
                ></polygon>
              `
            : svg`
                <polygon 
                  style="fill: #ffffff"
                  class="play-shape" 
                  points="6, 5, 15, 10, 6, 15"
                ></polygon>
              `
          }
        </svg>
      </div>
    `
  }

  renderPause(context) {
    const size = context._size - 2;

    return html`
      <div>
        <svg 
          style="
            width: ${size}px;
            height: ${size}px;
          "
          viewbox="0 0 20 20"
          @mousedown="${e => context._onChange(e, 'pause') }"
          @touchstart="${e => context._onChange(e, 'stop') }"
          @contextmenu="${context._preventContextMenu}"
        >
          ${context.state === 'pause'
            ? svg`
                <rect 
                  style="fill: ${theme['--color-secondary-2']}"
                  class="left"
                  x="5"
                  y="5"
                  width="3" 
                  height="10"
                ></rect>
                <rect
                  style="fill: ${theme['--color-secondary-2']}"
                  class="right" 
                  x="12" 
                  y="5" 
                  width="3" 
                  height="10"
                ></rect>
              `
            : svg`
                <rect 
                  style="fill: #ffffff"
                  class="left"
                  x="5"
                  y="5"
                  width="3" 
                  height="10"
                ></rect>
                <rect
                  style="fill: #ffffff"
                  class="right" 
                  x="12" 
                  y="5" 
                  width="3" 
                  height="10"
                ></rect>
              `
          }
        </svg>
      </div>
    `
  }

  renderStop(context) {
    const size = context._size - 2;

    return html`
      <div>
        <svg 
          style="
            width: ${size}px;
            height: ${size}px;
          "
          viewbox="0 0 20 20"
          @mousedown="${e => context._onChange(e, 'stop') }"
          @touchstart="${e => context._onChange(e, 'stop') }"
          @contextmenu="${context._preventContextMenu}"
        >
          ${context.state === 'stop'
            ? svg`
                <rect 
                  style="fill: ${theme['--color-secondary-3']}"
                  class="stop-shape" 
                  x="6" 
                  y="6" 
                  width="8" 
                  height="8"
                ></rect>
              `
            : svg`
                <rect
                  style="fill: #ffffff"
                  class="stop-shape" 
                  x="6" 
                  y="6" 
                  width="8" 
                  height="8"
                ></rect>
              `
          }
          
        </svg>
      </div>
    `
  }

  // renderRecord(context) {
  //   const size = context._size - 2;

  //   return html`
  //     <div>
  //       <svg 
  //         style="
  //           width: ${size}px;
  //           height: ${size}px;
  //         "
  //         viewbox="0 0 20 20"
  //         @mousedown="${context._triggerEvent}"
  //         @touchstart="${context._triggerEvent}"
  //         @contextmenu="${context._preventContextMenu}"
  //       >
  //         ${context.state === 'play'
  //           ? svg`
  //               <circle 
  //                 style="fill: ${theme['--color-secondary-3']}"
  //                 class="record-shape" 
  //                 cx="10" 
  //                 cy="10" 
  //                 r="5"
  //               ></circle>
  //             `
  //           : svg`
  //               <circle 
  //                 style="fill: 
  //                 class="record-shape" 
  //                 cx="10" 
  //                 cy="10" 
  //                 r="5"
  //               ></circle>
  //             `
  //         }
          
  //       </svg>
  //     </div>
  //   `
  // }


  render() {
    return html`
      ${this._buttons.map(type => {
        return this.renderFunctions[type](this);
      })}
    `
  }

  _triggerEvent(e) {
    e.preventDefault();

    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(inputEvent);
  }

  _onChange(e, value) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state !== value) {
      this.state = value;

      const changeEvent = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.state },
      });

      this.dispatchEvent(changeEvent);
      this.requestUpdate();
    }
  }

}

customElements.define('sc-transport', ScTransport);

export default ScTransport;

