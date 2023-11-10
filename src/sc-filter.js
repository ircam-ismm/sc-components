import { html, svg, css, nothing } from 'lit';

import ScElement from './ScElement.js';
import { atodb, linearScale } from '@ircam/sc-utils';

// @todo
// - Q control
//   + cf. http://www.sengpielaudio.com/calculator-bandwidth.htm for convertion formulas
// - edit should be position relative
// - compute display according to real width / height, so lines are not stretched
// - define API for several

// rely on native `getFrequencyResponse`
const defaultSampleRate = 48000;
const audioContext = new OfflineAudioContext(1, 1, defaultSampleRate);

class ScFilter extends ScElement {
  static properties = {
    mode: {
      type: String,
      reflect: true,
    },
    numFilters: {
      type: Number,
      reflect: true,
      attribute: 'num-filters',
    },
    editFilterIndex: {
      type: Number,
      reflect: true,
      attribute: 'edit-filter-index',
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
      position: relative;
    }

    .ruler {
      stroke: var(--sc-color-secondary-1);
      stroke-opacity: 0.3;
      stroke-width: 1px;
    }

    .accumulated-filter {
      fill: var(--sc-color-primary-5);
      stroke: none;
      fill-opacity: 0.15;
    }

    .selected-filter {
      fill: none;
      stroke: var(--sc-color-primary-5);
      stroke-width: 1;
    }

    .filter-controls rect {
      fill: white;
      fill-opacity: 0;
    }

    .filter-controls:hover rect {
      fill: white;
      fill-opacity: 0.1;
      cursor: move;
    }

    .filter-controls line {
      stroke: var(--sc-color-secondary-2);
      stroke-opacity: 1;
      stroke-width: 1;
    }

    .filter-controls:hover line {
      cursor: move;
    }

    .filter-controls line.q-control {
      cursor: ew-resize;
    }
  `;

  constructor() {
    super();

    this.numFilters = 1;
    this.editFilterIndex = 0;
    this.mode = 'log';

    this.minGain = -24;
    this.maxGain = 24;

    this._width = 300;
    this._height = 150;

    this._f1 = null;
    this._f2 = null;

    // f0 (f0 + gain) | f1 (Q + gain) | f2 (Q + gain)
    this._editMode = null;

    // @todo - this should be dynamic too
    this._filterNodes = [];

    for (let i = 0; i < this.numFilters; i++) {
      this._filterNodes[i] = audioContext.createBiquadFilter();;
    }

    this._filterNodes[0].type = 'peaking';
    this._filterNodes[0].frequency.value = 200;
    this._filterNodes[0].gain.value = +6;
    this._filterNodes[0].Q.value = 0.2;

    // this._filterNodes[1].type = 'highshelf';
    // this._filterNodes[1].frequency.value = 2000;
    // this._filterNodes[1].gain.value = -12;
    // this._filterNodes[1].Q.value = 0.3;
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


    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  render() {
    const freqs = this.mode === 'log' ? this._frequencyHzLog : this._frequencyHzLin;

    // gain only change something for certain filter types, i.e. lowshelf, highshelf, peaking
    // this._filterNodes[0].type = 'peaking';
    // this._filterNodes[0].gain.value = 1;
    // this._filterNodes[0].Q.value = 3;

    // reset accumulated buffer
    for (let i = 0; i < this._accumulatedDbResponse.length; i++) {
      this._accumulatedDbResponse[i] = 0;
    }

    // - compute filters in dB according to their frequency response
    // - compute accumulated filter
    this._filterNodes.forEach((filterNode, filterIndex) => {
      // set filter node
      filterNode.getFrequencyResponse(freqs, this._magResponse, this._phaseResponse);

      // accumulate
      for (let i = 0; i < freqs.length; i++) {
        const db = atodb(this._magResponse[i]);

        if (filterIndex === this.editFilterIndex) {
          this._selectedFilterDbResponse[i] = db;
        }

        this._accumulatedDbResponse[i] += db;
      }
    });

    const xStep = this._width / (freqs.length - 1);
    const yScale = linearScale(this.minGain, this.maxGain, this._height, 0, true);
    const xScale = freq => this._freqToNorm(freq) * this._width;

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
    accumulatedFilterPath += `${this._width},${this._height + 10}, 0,${this._height + 10}`;

    const node = this._filterNodes[this.editFilterIndex];
    const type = node.type;
    const freq = node.frequency.value;
    const gain = node.gain.value; // this is in dB
    const Q = node.Q.value;

    // find f1 and f2 from f0 and Q
    // http://www.sengpielaudio.com/calculator-cutoffFrequencies.htm
    this._f1 = freq * (Math.sqrt(1 + 1 / (4 * Q **2)) - 1 / (2 * Q));
    this._f2 = freq * (Math.sqrt(1 + 1 / (4 * Q **2)) + 1 / (2 * Q));

    return html`
      <svg
        @mousedown=${this._onMouseDown}
      >
        <!-- rulers: freqs: [100, 1000, 10000], gain: 0 -->
        <g>
          ${[100, 1000, 10000].map(_freq => {
            return svg`
              <line
                class="ruler"
                x1=${xScale(_freq)}
                x2=${xScale(_freq)}
                y1="0"
                y2=${this._height}
              />`;
          })}
          <!-- ruler: zero gain -->
          <line
            class="ruler"
            x1="0"
            x2=${this._width}
            y1=${this._height / 2}
            y2=${this._height / 2}
            stroke="steelblue"
            stroke-width="1"
          />
        </g>

        <polyline class="accumulated-filter" points="${accumulatedFilterPath}" />
        <polyline class="selected-filter" points="${selectedFilterPath}" />

        <g class="filter-controls">
          ${type !== 'lowshelf' && type !== 'highshelf'
            ? svg`
              <rect class="filter-params"
                x=${xScale(this._f1)}
                y="0"
                width=${xScale(this._f2) - xScale(this._f1)}
                height=${this._height}
              ></rect>`
            : nothing
          }

          <!-- gain line -->
          ${type === 'lowshelf' || type === 'highshelf' || type === 'peaking'
            ? svg`
              <line
                x1="0"
                x2=${this._width}
                y1=${yScale(gain) - 1}
                y2=${yScale(gain) - 1}
              />`
            : nothing
          }

          <!-- freq line -->
          <line
            x1=${xScale(freq)}
            x2=${xScale(freq)}
            y1="0"
            y2=${this._height}
          />

          <!-- bandwidth lines -->
          ${type !== 'lowshelf' && type !== 'highshelf'
            ? svg`
              <line
                class="q-control f1"
                x1=${xScale(this._f1)}
                x2=${xScale(this._f1)}
                y1="0"
                y2=${this._height}
              />
              <line
                class="q-control f2"
                x1=${xScale(this._f2)}
                x2=${xScale(this._f2)}
                y1="0"
                y2=${this._height}
              />`
            : nothing
          }
        </g>
      </svg>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // @note - this is important if the compoent is e.g. embedded in another component
    // this._tabindex = this.getAttribute('tabindex') || 0;

    this._resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      this._width = width;
      this._height = height;
      this.requestUpdate();
    });

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
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

  _normToFreq(norm) {
    return this.mode === 'log'
      ? this._normToFreqLog(norm)
      : this._normToFreqLin(norm);
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

  _onMouseDown(e) {
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    this._requestUserSelectNoneOnBody();

    const $target = e.target;

    if ($target.classList.contains('f1')) {
      this._editMode = 'f1';
    } else if ($target.classList.contains('f2')) {
      this._editMode = 'f2';
    } else {
      this._editMode = 'f0';
    }

    this._handleEvent(e);
  }

  _onMouseMove(e) {
    this._handleEvent(e);
  }

  _onMouseUp(e) {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
    this._cancelUserSelectNoneOnBody(e);
    this._editMode = null;
  }

  _handleEvent(e) {
    // http://www.sengpielaudio.com/calculator-bandwidth.htm
    // Q = f0 / BW          f0= BW × Q = √ (f1 × f2)
    // BW = f2 − f1

    const rect = this.getBoundingClientRect();
    let x = (e.clientX - rect.left) / this._width;
    x = Math.max(0, Math.min(1, x));
    let y = (this._height - (e.clientY - rect.top)) / this._height;
    // y = Math.max(0, Math.min(1, y));

    // gain is updated in every mode
    const gain = y * (this.maxGain - this.minGain) + this.minGain;
    this._filterNodes[this.editFilterIndex].gain.value = gain;

    switch (this._editMode) {
      case 'f0': {
        const frequency = this._normToFreq(x);
        this._filterNodes[this.editFilterIndex].frequency.value = frequency;
        break;
      }
      // Q = f0 / BW
      // BW = f2 − f1
      // f1 = f0^2 / f2 = f2 − BW
      // f2 = f0^2 / f1 = f1 + BW
      // @note - Q is not used for highshelf and lowshelf
      case 'f1': {
        const f0 = this._filterNodes[this.editFilterIndex].frequency.value;
        const f1 = Math.min(this._normToFreq(x), f0 - 1e-3); // prevent Infinity
        const f2 = f0**2 / f1;
        const Q = f0 / (f2 - f1);
        this._filterNodes[this.editFilterIndex].Q.value = Q;
        break;
      }
      case 'f2': {
        const f0 = this._filterNodes[this.editFilterIndex].frequency.value;
        const f2 = Math.max(this._normToFreq(x), f0 + 1e-3); // prevent Infinity
        const f1 = f0**2 / f2;
        const Q = f0 / (f2 - f1);
        this._filterNodes[this.editFilterIndex].Q.value = Q;
        break;
      }
    }

    this.requestUpdate();
  }
}


if (customElements.get('sc-filter') === undefined) {
  customElements.define('sc-filter', ScFilter);
}

export default ScFilter;
