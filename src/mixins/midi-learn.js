import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// const A = customElements.get('sc-slider')
// const a = new A();
// // console.log(a);
// console.log('className', a.constructor.name);
// console.log('tagName', a.tagName.toLowerCase());
// console.log('midiValue', a.midiValue);
// a.midiValue = 1;
// console.log('midiValue', a.midiValue);

const midiLearnSymbol = Symbol.for('sc-midi-learn');
if (!globalThis[midiLearnSymbol]) {
  globalThis[midiLearnSymbol] = new Set();
}

export default (className, parent) => {
  class child extends parent {
    static properties = {
      midiLearnActive: { // true is the sc-midi-learn is active
        type: Boolean,
        reflect: true,
        attribute: 'midi-learn-active',
      },
      midiLearnSelected: { // true if this element is selected
        type: Boolean,
        reflect: true,
        attribute: 'midi-learn-selected',
      },
      midiLearnInfos: {
        state: true,
      },
      midiLearnHighlight: {
        type: Boolean,
        state: true,
      },
    };

    static styles = css`
      ${parent.styles}

      :host {
        position: relative;
      }

      .midi-learn-overlay {
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

      .midi-learn-overlay span {
        position: absolute;
        top: 0;
        left: 2px;
        font-size: 9px;
        height: 12px;
        line-height: 12px;
      }

      .midi-learn-overlay::before {
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

      .midi-learn-overlay.learning::before {
        background-color: var(--sc-color-secondary-3);
      }

      .midi-learn-overlay.mapped::before {
        background-color: var(--sc-color-secondary-4);
      }

      .midi-learn-overlay.highlight {
        border: 1px solid var(--sc-color-primary-5);
      }
    `;

    constructor() {
      super();

      const tagName = this.tagName.toLowerCase();
      globalThis[midiLearnSymbol].add(tagName);

      // note hasOwn Property does not work here because the getter is defined in prototype (?)
      if (!'midiValue' in this) {
        console.warn(`[sc-components] no "midiValue" property found in "${className}" (fallback to default [0-1] mapped to [0, 128]). You should probably implement the "midiValue" getter and setters in your components`);

        Object.defineProperty(this, 'midiValue', {
          get() {
            return Math.floor(this.value * 127);
          },
          set(val) {
            this.value = val / 127;
            this.requestUpdate();
          },
        });
      }

      this.midiLearnState = 'idle';
    }

    render() {
      const template = super.render();

      if (this.midiLearnActive) {
        let stateClass = 'idle';

        if (this.midiLearnInfos) {
          stateClass = 'mapped';
        }

        if (this.midiLearnSelected) {
          stateClass = 'learning';
        }

        const classes = {
          'midi-learn-overlay': true,
          mapped: (this.midiLearnInfos && !this.midiLearnSelected),
          learning: this.midiLearnSelected,
          highlight: this.midiLearnHighlight,
        }

        return html`
          <div class="${classMap(classes)}">
            ${this.midiLearnInfos
              ? html`<span>cc ${this.midiLearnInfos.channel} - ${this.midiLearnInfos.deviceString}</span>`
              : nothing
            }
          </div>
          ${template}
        `
      } else {
        this.midiLearnHighlight = false;
        return template;
      }
    }
  }

  // let's have a clean class name
  // cf. https://stackoverflow.com/questions/33605775/es6-dynamic-class-names
  Object.defineProperty(child, 'name', { value: className });

  return child;
}

