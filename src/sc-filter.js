import { html, svg, css, nothing } from 'lit';

import ScElement from './ScElement.js';
import { atodb, linearScale } from '@ircam/sc-utils';

// rely on native `getFrequencyResponse`
const defaultSampleRate = 48000;
const audioContext = new OfflineAudioContext(1, 1, defaultSampleRate);

class ScFilter extends ScElement {
  static properties = {
    mode: {
      type: String,
      reflect: true,
    },
    // numFilters
    // sampleRate
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 300px;
      height: 150px;
      background-color: var(--sc-color-primary-1);
      border: 1px solid var(--sc-color-primary-3);
      position: relative;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    sc-position-surface {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `;

  constructor() {
    super();

    this.numFilters = 1;
    this.selectedFilterIndex = 0;
    this.mode = 'log';

    // @todo - this should be dynamic too
    this._filterNodes = [];

    for (let i = 0; i < this.numFilters; i++) {
      this._filterNodes[i] = audioContext.createBiquadFilter();;
    }

    // @todo - this should dynamic according to sample rate

    // number of computed points to display the reponse curve
    const numPoints = 256; // this is arbitrary
    const delta = 1 / (numPoints - 1);

    this._nquist = defaultSampleRate / 2;

    // buffer with regularly sampled frequencies between [0, nquiyst]
    this._frequencyHzLin = new Float32Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
      this._frequencyHzLin[i] = this._normToFreqLin(i * delta);
    }

    // buffer with frequencies distributed on log scale between [1, nquiyst]
    this._frequencyHzLog = new Float32Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
      // this._frequencyHzLog[i] = 20 + 20000 ** (i * delta);
      this._frequencyHzLog[i] = this._normToFreqLog(i * delta);
    }

    this._magResponse = new Float32Array(numPoints);
    this._phaseResponse = new Float32Array(numPoints);

    // response for the currenty manipulated filter
    this._selectedFilterDbResponse = new Float32Array(numPoints)
    // response accumulated for all filters
    this._accumulatedDbResponse = new Float32Array(numPoints);
  }

  render() {
    const freqs = this.mode === 'log' ? this._frequencyHzLog : this._frequencyHzLin;

    // gain only change something for certain filter types, i.e. lowshelf, highshelf, peaking
    this._filterNodes[0].type = 'peaking';
    // this._filterNodes[0].gain.value = 1;
    // this._filterNodes[0].Q.value = 3;

    // console.log(this._filterNodes[0].gain.value)

    // reset accumulated buffer
    for (let i = 0; i < this._accumulatedDbResponse.length; i++) {
      this._accumulatedDbResponse[i] = 0;
    }

    this._filterNodes.forEach((filterNode, filterIndex) => {
      // set filter node
      filterNode.getFrequencyResponse(freqs, this._magResponse, this._phaseResponse);

      // accumulate
      for (let i = 0; i < freqs.length; i++) {
        const db = atodb(this._magResponse[i]);

        if (filterIndex === this.selectedFilterIndex) {
          this._selectedFilterDbResponse[i] = db;
        }

        this._accumulatedDbResponse[i] += db;
      }
    });

    // @todo - work with real width and height so that lines width are consistant
    const minDB = -24;
    const maxDB = +24;

    const xStep = 1000 / (freqs.length - 1);
    const yScale = linearScale(minDB, maxDB, 1000 + 10, 0 + 10, true);

    let selectedFilterPath = ``;

    this._selectedFilterDbResponse.forEach((db, index) => {
      const x = index * xStep;
      const y = yScale(db);

      selectedFilterPath += `${x},${y} `;
    });

    let accumulatedFilterPath = ``;

    this._accumulatedDbResponse.forEach((db, index) => {
      const x = index * xStep;
      const y = yScale(db);

      accumulatedFilterPath += `${x},${y} `;
    });

    // close the path
    accumulatedFilterPath += `1000,1010, 0,1010`;

    const node = this._filterNodes[this.selectedFilterIndex];
    const type = node.type;
    const freq = node.frequency.value;
    const gain = node.gain.value; // this is in dB
    const Q = node.Q.value;

    return html`
      <svg viewbox="0 0 1000 1000"  preserveAspectRatio="none">
        <!-- rulers: freqs: [100, 1000, 10000], gain: 0 -->
        <g>
          ${[100, 1000, 10000].map(freq => {
            return svg`
              <line
                x1=${this._freqToNorm(freq) * 1000}
                x2=${this._freqToNorm(freq) * 1000}
                y1="0"
                y2="1000"
                stroke="steelblue"
                stroke-width="1"
              />`;
          })}
          <line
            x1="0"
            x2="1000"
            y1="500"
            y2="500"
            stroke="steelblue"
            stroke-width="1"
          />
        </g>

        <polyline points="${accumulatedFilterPath}" fill="red" stroke="none" style="fill-opacity: 0.2" />
        <polyline points="${selectedFilterPath}" fill="none" stroke="white" stroke-width="3" />

        <g>
          <!-- freq line -->
          <line
            x1=${this._freqToNorm(freq) * 1000}
            x2=${this._freqToNorm(freq) * 1000}
            y1="0"
            y2="1000"
            stroke="yellow"
            stroke-width="2"
          />

          <!-- gain line -->
          ${type === 'lowshelf' || type === 'highshelf' || type === 'peaking'
            ? svg`<line
                x1="0"
                x2="1000"
                y1=${yScale(gain) - 1}
                y2=${yScale(gain) - 1}
                stroke="yellow"
                stroke-width="2" />`
            : nothing
          }
        </g>
      </svg>
      <sc-position-surface
        x-range=${JSON.stringify([0, 1])}
        y-range=${JSON.stringify([maxDB, minDB])}
        @input=${this._onInput}
        clamp
      >
      </sc-position-surface>
    `;
  }

  _normToFreqLin(norm) {
    return norm * this._nquist + 20;
  }

  // @todo - cf. https://en.wikipedia.org/wiki/Decade_(log_scale)
  _normToFreqLog(norm) {
    // 20    => 2 * 10^1
    // 200   => 2 * 10^2
    // 2000  => 2 * 10^3
    // 20000 => 2 * 10^4

    // [0,1] -> [1,4]
    const exp = norm * 3 + 1;
    return 2 * 10 ** exp;
  }

  _normToFreq(freq) {
    return this.mode === 'log'
      ? this._normToFreqLog(freq)
      : this._normToFreqLin(freq);
  }

  _freqToNormLin(freq) {
    return (freq - 20) / this._nquist
  }

  _freqToNormLog(freq) {
    const exp = Math.log10(freq / 2); // [1,4];
    return (exp - 1) / 3; // [0, 1]
  }

  _freqToNorm(freq) {
    return this.mode === 'log'
      ? this._freqToNormLog(freq)
      : this._freqToNormLin(freq);
  }

  _onInput(e) {
    if (e.detail.value.length === 0) {
      // @todo - trigger @change event
      return;
    }

    // consider only first input (no multitouch)
    let { x, y: gain } = e.detail.value[0];

    // @todo - review
    x = Math.min(1, Math.max(0, x));
    const frequency = this._normToFreq(x);
    // @todo - review
    gain = Math.min(24, Math.max(gain, -24));


    this._filterNodes[0].frequency.value = frequency;
    this._filterNodes[0].gain.value = gain;

    this.requestUpdate();

    // @todo - trigger @input event
  }
}


if (customElements.get('sc-filter') === undefined) {
  customElements.define('sc-filter', ScFilter);
}

export default ScFilter;

// 0 1  2   3    4 5 6
// 0 10 100 1000 1
