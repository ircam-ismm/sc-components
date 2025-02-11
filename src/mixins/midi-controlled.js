import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const midiLearnSymbol = Symbol.for('sc-midi');

if (!globalThis[midiLearnSymbol]) {
  globalThis[midiLearnSymbol] = new Set();
}

export default (className, parent) => {
  class child extends parent {
    static properties = {
      midiLearnActive: { // true is the sc-midi-learn component is active
        type: Boolean,
        reflect: true,
        attribute: 'midi-learn-active',
      },
      midiLearnSelected: { // true if this element is selected for binding
        type: Boolean,
        reflect: true,
        attribute: 'midi-learn-selected',
      },
      midiControlInfos: {
        state: true,
      },
      midiControlHighlight: {
        type: Boolean,
        state: true,
      },
    };

    static styles = css`
      ${parent.styles}

      :host {
        position: relative;
      }

      .midi-control-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        color: black;
        overflow: hidden;
        white-space: nowrap;
        user-select: none;
        webkit-user-select: none;
        webkit-touch-callout: none;
        box-sizing: border-box;
      }

      .midi-control-overlay span {
        position: absolute;
        top: 0;
        left: 2px;
        font-size: 9px;
        height: 12px;
        line-height: 12px;
      }

      .midi-control-overlay::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        z-index: -1;
        background-color: var(--sc-color-secondary-2);
      }

      .midi-control-overlay.learning::before {
        background-color: var(--sc-color-secondary-3);
      }

      .midi-control-overlay.mapped::before {
        background-color: var(--sc-color-secondary-4);
      }

      .midi-control-overlay.highlight {
        border: 1px solid var(--sc-color-primary-5);
      }
    `;

    constructor() {
      super();

      const tagName = this.tagName.toLowerCase();
      globalThis[midiLearnSymbol].add(tagName);

      // note hasOwn Property does not work here because the getter is defined in prototype (?)
      if (!('midiValue' in this) || !('midiType' in this)) {
        throw new Error(`[sc-components] "${className}" must implement "midiType" getter  ("control" or "instrument") AND "midiValue" getter and setter to map from midi value to component value`);
      }

      this.midiLearnState = 'idle';
    }

    render() {
      const inner = super.render();

      if (this.midiLearnActive) {
        let stateClass = 'idle';

        if (this.midiControlInfos) {
          stateClass = 'mapped';
        }

        if (this.midiLearnSelected) {
          stateClass = 'learning';
        }

        const classes = {
          'midi-control-overlay': true,
          mapped: (this.midiControlInfos && !this.midiLearnSelected),
          learning: this.midiLearnSelected,
          highlight: this.midiControlHighlight,
        }

        return html`
          <div class="${classMap(classes)}">
            ${this.midiControlInfos
              ? html`<span>cc ${this.midiControlInfos.channel} - ${this.midiControlInfos.deviceString}</span>`
              : nothing
            }
          </div>
          ${inner}
        `
      } else {
        this.midiControlHighlight = false;
        return inner;
      }
    }
  }

  // let's have a clean class name
  // cf. https://stackoverflow.com/questions/33605775/es6-dynamic-class-names
  Object.defineProperty(child, 'name', { value: className });

  return child;
}

