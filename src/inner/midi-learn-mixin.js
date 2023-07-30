import { html, css } from 'lit';

export default (className, parent) => {
  class child extends parent {
    static properties = {
      midiLearn: {
        type: Boolean,
        reflect: true,
        attribute: 'midi-learn',
      },
      // @note - midiValuecannot be made a reactive property:
      // cf. https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields
      // but it's not an issue as it is a mere proxy/converter to the real object value
      // midiValue: { type: Number },
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
        background-color: pink;
        opacity: 0.4;
      }
    `;

    constructor() {
      super();

      this.midiLearn = false;

      // @todo
      // ScSlider
      // ScDial
      // ScBang
      // ScToggle
      // ScButton

      // dyanmically define `midiValue` getter and setter according to the className
      switch (className) {
        case 'ScSlider': {
          Object.defineProperty(this, 'midiValue', {
            get() {
              return this.value;
            },
            set(val) {
              this.value = val;
              // should request update if
              this.requestUpdate();
            },
          });
          break;
        }
      }
    }

    render() {
      const template = super.render();


      if (this.midiLearn) {
        return html`
          ${template}
          <div class="midi-learn-overlay"></div>
        `
      } else {
        return template;
      }
    }
  }

  // let's have a clean class name
  // cf. https://stackoverflow.com/questions/33605775/es6-dynamic-class-names
  Object.defineProperty(child, 'name', { value: className });

  return child;
}
