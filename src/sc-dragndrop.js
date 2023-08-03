import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import ScElement from './ScElement.js';

const audioContext = new AudioContext();

class ScDragNDrop extends ScElement {
  static properties = {
    // "load" || "raw"
    format: {
      type: String,
      reflect: true,
    },
    _status: {
      type: String,
      state: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 300px;
      height: 150px;
      box-sizing: border-box;
      border: 1px solid var(--sc-color-primary-2);
      background-color: var(--sc-color-primary-1);
      border-radius: 2px;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: white;
      user-select: none;
      webkit-user-select: none;
      webkit-touch-callout: none;

      --sc-dragndrop-dragged-background-color: var(--sc-color-primary-2);
      --sc-dragndrop-processing-background-color: var(--sc-color-secondary-3);
    }

    :host([hidden]) {
      display: none
    }

    .drop-zone {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .drop-zone.dragged {
      background-color: var(--sc-dragndrop-dragged-background-color);
    }

    .drop-zone.processing {
      background-color: var(--sc-dragndrop-processing-background-color);
    }
  `;

  get format() {
    return this._format;
  }

  set format(value) {
    if (value !== 'load' && value !== 'raw') {
      console.warn('sc-dragndrop: format should be either "load" or "raw"');
      return;
    }

    const oldValue = this._format;
    this._format = value;
    this.requestUpdate('format', oldValue);
  }

  constructor() {
    super();

    this._status = 'idle'; // 'drag' | 'processing'
    this.format = 'load'; // load | raw
  }

  render() {
    const classes = {
      'drop-zone': true,
      'dragged': this._status === 'drag',
      'processing': this._status === 'processing',
    };

    return html`
      <div class="${classMap(classes)}"
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        ${this._status === 'processing' ? `processing...` : html`<slot>drag and drop files</slot>`}
      </div>
    `;
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    this._status = 'drag';
  }

  onDragLeave(e) {
    e.preventDefault();

    this._status = 'idle';
  }

  onDrop(e) {
    e.preventDefault();

    this._status = 'processing';

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
            this._status = 'idle';
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

      this._status = 'idle';

    } else {
      console.log(`Unknow format: "${this.format}"`)
    }
  }
}

if (customElements.get('sc-dragndrop') === undefined) {
  customElements.define('sc-dragndrop', ScDragNDrop);
}

export default ScDragNDrop;
