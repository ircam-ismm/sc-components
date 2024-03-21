import { html, css } from 'lit';
import ScElement from './ScElement.js';

class ScAudioRecorder extends ScElement {
  static styles = css`
    #rec-button {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-3);
      border-radius: 2px;
    }

    #rec-button > svg {
      width: 100%;
      height: 100%;
      fill: #ffffff;
    }

    #rec-button > svg.active {
      background-color: var(--sc-color-primary-1);
      fill: var(--sc-color-secondary-3);
    }
  `;

  constructor() {
    super();

    this.audioContext = new AudioContext;
    this.micStream = null;
    this.mediaRecorder = null;
    this.fileReader = new FileReader();

    this.fileReader.addEventListener('loadend', async () => {
      const audioBuffer = await this.audioContext.decodeAudioData(this.fileReader.result);
      this.currentRecording = audioBuffer;
      this.cropStart = 0;
      this.cropEnd = audioBuffer.duration;
      this.requestUpdate();
    });

    this.recActive = false;
    this.currentRecording = null;
  }

  render() {
    return html`
      <div id="rec-button">
        <svg
          class="${this.recActive ? 'active' : ''}"
          viewbox="0 0 20 20"
          @mousedown=${this._updateValue}
          @touchend=${this._updateValue}
        >
          <circle cx="10" cy="10" r="5"></circle>
        </svg>
      </div>
    `
  }

  _updateValue(e) {
    e.preventDefault();
    e.stopPropagation();

    this.recActive = !this.recActive;
  
    if (this.micStream === null) {
      navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseReduction: false,
          autoGainControl: false
        },
        video: false
      }).then(stream => {
        this.micStream = stream;
        this.mediaRecorder = new MediaRecorder(this.micStream);
        this.mediaRecorder.addEventListener('dataavailable', e => {
          if (e.data.size > 0) {
            this.fileReader.readAsArrayBuffer(e.data);
          }
        });
        this.mediaRecorder.start();
      }).catch(err => {
        console.log(err);
      });
    } else {
      if (this.recActive) {
        this.mediaRecorder.start();
      } else {
        this.mediaRecorder.stop();
      }
    }

    this.requestUpdate();
  }
}  

if (customElements.get('sc-audio-recorder') === undefined) {
  customElements.define('sc-audio-recorder', ScAudioRecorder);
}

export default ScAudioRecorder;
