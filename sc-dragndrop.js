import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import ScElement from './ScElement.js';
import { fontFamily, fontSize, theme } from './styles.js';

const audioContext = new AudioContext();

class ScDragNDrop extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      label: { type: String },
      status: { type: String },
      format: { type: String }, // "load" || "raw"
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        user-select: none;
        vertical-align: middle;
      }

      .drop-zone {
        background-color: red;
        text-align: center;
        vertical-align: middle;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
        box-sizing: border-box;
        border-radius: 2px;
        color: white;
        font-family: ${fontFamily};
      }

      .drop-zone.drag {
        background-color: ${theme['--color-primary-2']};
      }

      .drop-zone.processing {
        background-color: ${theme['--color-secondary-3']};
      }
    `
  }

  constructor() {
    super();

    this.width = 300;
    this.height = 200;
    this.label = 'Drag and drop Files';
    this.status = 'idle'; // 'drag' | 'decoding'

    this.format = 'load';
  }

  render() {
    const classes = {
      'drop-zone': true,
      'drag': this.status === 'drag',
      'processing': this.status === 'processing',
    };

    return html`
      <div class="${classMap(classes)}"
        style="
          width: ${this.width}px;
          height: ${this.height}px;
          line-height: ${this.height}px;
        "
        @dragover="${this.onDragOver}"
        @dragleave="${this.onDragLeave}"
        @drop="${this.onDrop}"
      >${this.status !== 'processing' ? this.label : 'Processing...'}</div>
    `;
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    this.status = 'drag';
  }

  onDragLeave(e) {
    e.preventDefault();

    this.status = 'idle';
  }

  onDrop(e) {
    e.preventDefault();

    this.status = 'processing';

    if (this.format === 'load') {
      const files = Array.from(e.dataTransfer.files);
      const results = {};
      let counter = 0;

      files.forEach((file, index) => {
        let type;
        const reader = new FileReader();

        if (file.type === 'audio/midi') {
          type = 'midi';
        } else if (/^audio/.test(file.type)) {
          type = 'audio';
        } else if (/json$/.test(file.type)) {
          type = 'json';
        } else if (/^image/.test(file.type)) {
          type = 'image';
        } else if (/^text/.test(file.type)) {
          type = 'text';
        } else {
          type = 'unknown';
        }

        reader.onload = async (e) => {
          switch (type) {
            case 'audio': {
              try {
                const buffer = await audioContext.decodeAudioData(reader.result);
                results[file.name] = buffer;
              } catch(err) {
                console.log(err);
                results[file.name] = null;
              }
              break;
            }
            case 'json': {
              results[file.name] = JSON.parse(reader.result);
              break;
            }
            case 'image': {
              const $img = new Image();
              $img.src = reader.result;
              results[file.name] = $img;
              break;
            }
            case 'midi':{
              results[file.name] = reader.result;
              break;
            }
            case 'text': {
              results[file.name] = reader.result;
              break;
            }
            default: {
              results[file.name] = reader.result;
              break;
            }
          }

          counter += 1;

          if (counter === files.length) {
            this.value = results;

            const changeEvent = new CustomEvent('change', {
              bubbles: true,
              composed: true,
              detail: { value: this.value },
            });

            this.dispatchEvent(changeEvent);
            this.status = 'idle';
          }
        }

        switch (type) {
          case 'audio':
            reader.readAsArrayBuffer(file);
            break;
          case 'json':
            reader.readAsText(file);
            break;
          case 'image':
            reader.readAsDataURL(file);
            break;
          case 'midi':
            reader.readAsDataURL(file);
            break;
          case 'text':
            reader.readAsText(file);
            break;
          default:
            reader.readAsText(file);
            break;
        }
      });
    } else if (this.format == 'raw') {
      const arr = Array.from(e.dataTransfer.files);
      this.value = {};

      arr.forEach(v => this.value[v.name] = v);

      const changeEvent = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(changeEvent);
      this.status = 'idle';
    } else {
      console.log(`Unknow format: "${this.format}"`)
    }
  }
}

customElements.define('sc-dragndrop', ScDragNDrop);

export default ScDragNDrop;
