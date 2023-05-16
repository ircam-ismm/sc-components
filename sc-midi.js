import { html, css } from 'lit';
import ScElement from './ScElement.js';
import { fontFamily, fontSize, theme } from './styles.js';


/*
TODO: 

-!! save/load from JSON (using element ID)

- use $el.id and fallback to $el._scId
- review styling
- select MIDI device
- ability to export configuration
*/ 

class ScMidi extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    }
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        overflow: hidden;
      }

      :host > div {
        box-sizing: border-box;
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: #ffffff;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      button {
        box-sizing: border-box;
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: #ffffff;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
        border-radius:  1px;
        font-size: 13px;
        padding: 0;
        cursor: pointer;
      }

      button.active {
        background-color: ${theme['--color-secondary-3']};
      }

      .panelLine {
        display: flex;
        justify-content: space-between;
        border-top: solid 1px ${theme['--color-primary-3']}
      }

      .panelLine > p {
        margin: 10px 20px;
      }

      .panelLine > button {
        margin: 10px 20px;
        width: 20px;
        height: 20px;
        margin: auto 20px;
        background-color: ${theme['--color-primary-2']};
        border: 1px solid ${theme['--color-primary-2']};
      }

      #bindings-panel {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      #bindings-panel > h3 {
        padding: 0 20px;
      }
    `;
  }

  constructor() {
    super();

    this.width = 50;
    this.height = 30;

    this.colorLayerBase = theme['--color-secondary-2'];
    this.colorLayerSelected = theme['--color-secondary-3'];
    this.colorLayerBound = theme['--color-secondary-4'];

    this.active = false;
    this.selectableTags = 'sc-slider, sc-bang, sc-toggle, sc-button';
    this.selection = null;
    this.midiBindings = {};
    this.hasBindings = new Set;

    this.midiAccess = navigator.requestMIDIAccess().then(access => {
      for (let device of access.inputs.values()) {
        device.addEventListener('midimessage', this.processMidiMessage);
      }
    });

    this._pressed = false;
    this.processMidiMessage = this.processMidiMessage.bind(this);
    this.selectElement = this.selectElement.bind(this);
  }

  createChannelTag(channel) {
    const $channelTag = document.createElement('div');
    $channelTag.className = 'channel-tag';
    $channelTag.textContent = `cc ${channel}`;
    $channelTag.style.position = "absolute";
    $channelTag.style.bottom = 0;
    $channelTag.style.left = 0;
    $channelTag.style.fontSize = '8px';
    $channelTag.style.borderStyle = 'none';
    $channelTag.style.padding = '2px';
    $channelTag.style.color = 'black';
    return $channelTag;
  }

  createMidiLayer(color) {
    const $layer = document.createElement('div');
    $layer.classList.add("midilayer");
    $layer.style.background = color;
    $layer.style.opacity = 0.3;
    $layer.style.position = "absolute";
    $layer.style.inset = "-2px";
    return $layer;
  }


  processMidiMessage(message) {
    const [deviceId, channel, value] = message.data;

    if (this.active) {
      if (this.selection) {
        // bind element to channel 
        if (!this.midiBindings[channel]) {
          this.midiBindings[channel] = new Set;
        }
        this.midiBindings[channel].add(this.selection);
        this.hasBindings.add(this.selection);

        // add small text on element to indicate channel number
        const $oldChannelTag = this.selection.shadowRoot.querySelector('.channel-tag');
        if ($oldChannelTag) {
          const text = $oldChannelTag.textContent;
          const oldChannel = parseInt(text.match(/[0-9]+/ig)[0]);
          this.selection.shadowRoot.removeChild($oldChannelTag);
          if (oldChannel !== channel) {
            this.midiBindings[oldChannel].delete(this.selection);
          }
        }

        const $channelTag = this.createChannelTag(channel);
        this.selection.shadowRoot.appendChild($channelTag);
      }
    } else {
      const assignedToChannel = this.midiBindings[channel];
      if (assignedToChannel) {
        assignedToChannel.forEach(element => {
          if (element) {
            switch (element.tagName) {
              case 'SC-SLIDER':
              case 'SC-BUTTON':
              case 'SC-TOGGLE':
                element.midiValue = value;
                break;
              case 'SC-BANG':
                element._triggerEvent(message);
                break;
            }
          }
        });
      }
    }

    this.requestUpdate();
  }

  selectElement(e) {
    if (this.selection) {
      const prevLayer = this.selection.shadowRoot.querySelector('.midilayer');
      const color = this.hasBindings.has(this.selection)
        ? this.colorLayerBound
        : this.colorLayerBase;
      prevLayer.style.background = color;
    }
    this.selection = e.target;
    const layer = e.target.shadowRoot.querySelector('.midilayer');
    layer.style.background = this.colorLayerSelected;
  }

  mouseOverBindingLine(el) {
    if (this.active) {
      const $layer = el.shadowRoot.querySelector('.midilayer');
      $layer.style.background = this.colorLayerSelected;
    } else {
      const $layer = this.createMidiLayer(this.colorLayerSelected);
      el.style.position = "relative";
      el.shadowRoot.appendChild($layer);
    }
  }

  mouseOutBindingLine(el) {
    const $layer = el.shadowRoot.querySelector('.midilayer');
    if (this.active) {
      const color = el === this.selection
        ? this.colorLayerSelected
        : this.colorLayerBound
      $layer.style.background = color;
    } else {
      el.shadowRoot.removeChild($layer);
    }
  }

  removeBinding(channel, el) {
    this.midiBindings[channel].delete(el);
    this.hasBindings.delete(el);
    if (this.active) {
      const $layer = el.shadowRoot.querySelector('.midilayer');
      $layer.style.background = this.colorLayerBase;
      const $channelTag = el.shadowRoot.querySelector('.channel-tag');
      el.shadowRoot.removeChild($channelTag);
    } else {
      const $layer = el.shadowRoot.querySelector('.midilayer');
      el.shadowRoot.removeChild($layer);
    }
    this.requestUpdate();
  }

  renderBindingsPanel() {
    return html`
      <div id="bindings-panel">
        <h3>midi bindings</h3>
        ${Object.entries(this.midiBindings).map(([channel, elSet]) => {
      return Array.from(elSet).map(el => {
        return html`
              <div 
                class="panelLine"
                @mouseover="${() => this.mouseOverBindingLine(el)}"
                @mouseout="${() => this.mouseOutBindingLine(el)}"
              >
                <p style="width: 6ch">cc ${channel}</p>
                <p>${el._scId}</p>
                <button
                  @mousedown="${() => this.removeBinding(channel, el)}"
                  @touchstart="${{
            handleEvent: () => this.removeBinding(channel, el),
            passive: false,
          }}"
                >x
                </button>
              </div>
            `
      });
    })}
      </div>
    `
  }

  onEvent() {
    this.active = !this.active;

    if (this.active) {
      this.midiSelectable = [];
      document.querySelectorAll(this.selectableTags).forEach(el => {
        this.midiSelectable.push(el);
      });

      // add semi-transparent layer on top of every selectable element
      this.midiSelectable.forEach(el => {
        const color = this.hasBindings.has(el)
          ? this.colorLayerBound
          : this.colorLayerBase;
        const layer = this.createMidiLayer(color);
        el.style.position = "relative";
        el.addEventListener('click', this.selectElement);
        el.shadowRoot.appendChild(layer);
      });

      // add small text on each midi-bound element to indicate channel number
      Object.entries(this.midiBindings).forEach(([channel, elSet]) => {
        elSet.forEach(el => {
          const $channelTag = this.createChannelTag(channel);
          el.shadowRoot.appendChild($channelTag);
        });
      });
    } else {
      this.selection = null;
      this.midiSelectable = [];
      document.querySelectorAll(this.selectableTags).forEach(el => {
        this.midiSelectable.push(el);
      });

      this.midiSelectable.forEach(el => {
        const layer = el.shadowRoot.querySelector('.midilayer');
        el.shadowRoot.removeChild(layer);
        el.removeEventListener('click', this.selectElement);
      });

      Object.entries(this.midiBindings).forEach(([channel, elSet]) => {
        elSet.forEach(el => {
          const $channelTag = el.shadowRoot.querySelector('.channel-tag');
          if ($channelTag) {
            el.shadowRoot.removeChild($channelTag);
          }
        });
      });
    }

    this.requestUpdate();
  }


  render() {
    return html`
      <button
        style="
          width: ${this.width}px;
          height: ${this.height}px;
          line-height: ${this.height}px;
        "
        class="${this.active ? 'active' : ''}"
        @mousedown="${this.onEvent}"

        @touchstart="${{
        handleEvent: this.onEvent,
        passive: false,
      }}"
        @contextmenu="${this._preventContextMenu}"
      >MIDI</button>

      ${this.active ? this.renderBindingsPanel() : ''}
    `;
  }
}

if (customElements.get('sc-midi') === undefined) {
  customElements.define('sc-midi', ScMidi);
}

export default ScMidi;

