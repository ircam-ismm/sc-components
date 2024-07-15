import { html, svg, css, nothing } from 'lit';

import ScElement from './ScElement.js';
import { atodb, linearScale } from '@ircam/sc-utils';

// @todo
// - Q control
//   + cf. http://www.sengpielaudio.com/calculator-bandwidth.htm for convertion formulas
// - edit should be position relative
// - compute display according to real width / height, so lines are not stretched
// - define API for several


// .value = BiquadFilterNode[] || BiquadFilterOptions[]
// // cf. https://webaudio.github.io/web-audio-api/#BiquadFilterOptions

// @input { index, [param]: value }

// also triggered on `numFilters` change
// @change { value: this.value }


// rely on native `getFrequencyResponse`
const defaultSampleRate = 48000;
const audioContext = new OfflineAudioContext(1, 1, defaultSampleRate);
const biquadFilterType = [
  "lowpass",
  "highpass",
  "bandpass",
  "lowshelf",
  "highshelf",
  "peaking",
  "notch",
  "allpass",
];

class ScFilter extends ScElement {
  #numFilters = null;
  #filterNodes = [];

  static properties = {
    mode: {
      type: String,
      reflect: true,
    },
    controlPanel: {
      type: Number,
      reflect: true,
      attribute: 'control-panel',
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
      display: block;
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

    .control-panel {
      background-color: var(--sc-color-primary-2);
/*      border: 1px solid var(--sc-color-primary-3);*/
      position: absolute;
      box-sizing: border-box;
      top: -1px;
      left: calc(100% + 1px);
      padding: 4px;
      height: calc(100% + 2px);
    }

    .control-panel div {
      margin-bottom: 3px;
      display: flex;
    }

    .control-panel .edit-filter {
      flex-direction: column;
    }

    .control-panel sc-text {
      width: 90px;
      height: 24px;
      line-height: 16px;
      font-size: 10px;
    }

    .control-panel sc-number {
      width: 60px;
      height: 24px;
      font-size: 10px;
    }

    .control-panel sc-select {
      width: 101px;
      height: 24px;
      font-size: 10px;
    }

    .control-panel sc-dial {
      width: 61px;
      height: 61px;
      margin-right: 4px;
    }

    .control-panel sc-dial:last-child {
      margin-right: 0;
    }

    .ruler {
/*      stroke: var(--sc-color-secondary-1);*/
      stroke: var(--sc-color-primary-5);
      stroke-opacity: 0.3;
      stroke-width: 1px;
    }

    .db-tick line {
/*      stroke: var(--sc-color-secondary-1);*/
      stroke: var(--sc-color-primary-5);
      stroke-opacity: 0.5;
      stroke-width: 1px;
    }

    .db-tick text {
      stroke: var(--sc-color-primary-5);
      stroke-opacity: 0.7;
      stroke-width: 1px;
      font-family: arial;
/*      font-family: var(--sc-font-family);*/
      text-anchor: end;
      font-weight: 100;
      font-size: 9px;
    }

    .infos text {
      stroke: var(--sc-color-primary-5);
      stroke-opacity: 0.9;
      stroke-width: 1px;
      font-family: arial;
/*      font-family: var(--sc-font-family);*/
      text-anchor: start;
      font-weight: 100;
      font-size: 9px;
      letter-spacing: 0.06em;
      display: none;
    }

    svg.edit .infos text,
    .filter-controls:hover .infos text {
      display: block;
    }

    .accumulated-filter {
      fill: var(--sc-color-primary-5);
      stroke: none;
      fill-opacity: 0.2;
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

    .filter-controls:hover rect, svg.edit .filter-controls rect {
      fill-opacity: 0.1;
    }

    .filter-controls line {
      stroke: var(--sc-color-secondary-2);
      stroke-opacity: 0.8;
      stroke-width: 1;
    }

    .filter-controls:hover {
      cursor: move;
    }

    .filter-controls:hover line.q-control {
      stroke-width: 2;
    }

    .filter-controls line.q-control {
      cursor: ew-resize;
    }

    svg.edit {
      cursor: move;
    }

    svg.edit.f1, svg.edit.f1 .filter-controls:hover,
    svg.edit.f2, svg.edit.f2 .filter-controls:hover {
      cursor: ew-resize;
    }
  `;

  get numFilters() {
    return this.#numFilters;
  }

  set numFilters(value) {
    if (!Number.isInteger(value)) {
      throw new TypeError(`Cannot set property 'numFilters' on sc-filter: value (${value}) is not an integer`);
    }

    if (value === this.#numFilters) {
      return;
    }

    if (value > this.#numFilters) {
      while (this.#filterNodes.length < value) {
        const filter = audioContext.createBiquadFilter();
        this.#filterNodes.push(filter);
      }
    } else {
      this.#filterNodes.splice(value);
    }

    const oldValue = this.#numFilters;
    this.#numFilters = value;

    if (this.editFilterIndex >= this.#numFilters) {
      this.editFilterIndex = this.#numFilters - 1;
    }

    this.requestUpdate('numFilters', oldValue);
  }

  constructor() {
    super();

    this.numFilters = 1;
    this.editFilterIndex = 0;
    this.mode = 'log';
    this.controlPanel = true

    this.minGain = -24;
    this.maxGain = 24;

    this._width = 300;
    this._height = 150;

    this._f1 = null;
    this._f2 = null;

    // f0 (f0 + gain) | f1 (Q + gain) | f2 (Q + gain)
    this._editMode = null;

    // @todo - this should be dynamic too

    // for (let i = 0; i < this.numFilters; i++) {
    //   this.#filterNodes[i] = audioContext.createBiquadFilter();;
    // }

    // this.#filterNodes[0].type = 'peaking';
    // this.#filterNodes[0].frequency.value = 200;
    // this.#filterNodes[0].gain.value = +6;
    // this.#filterNodes[0].Q.value = 0.2;

    // this.#filterNodes[1].type = 'highshelf';
    // this.#filterNodes[1].frequency.value = 2000;
    // this.#filterNodes[1].gain.value = -12;
    // this.#filterNodes[1].Q.value = 0.3;
    // // @todo - this should dynamic according to sample rate

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

    // gain only applies for certain filter types, i.e. lowshelf, highshelf, peaking

    // reset accumulated buffer
    for (let i = 0; i < this._accumulatedDbResponse.length; i++) {
      this._accumulatedDbResponse[i] = 0;
    }

    // - compute filters in dB according to their frequency response
    // - compute accumulated filter
    this.#filterNodes.forEach((filterNode, filterIndex) => {
      filterNode.getFrequencyResponse(freqs, this._magResponse, this._phaseResponse);

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
    // close accumulated filter path below visible render area
    accumulatedFilterPath += `${this._width},${this._height + 10}, 0,${this._height + 10}`;

    const filter = this.#filterNodes[this.editFilterIndex];
    const type = filter.type;
    const freq = filter.frequency.value;
    const gain = filter.gain.value; // this is in dB
    const Q = filter.Q.value;
    // find f1 and f2 from f0 and Q
    // http://www.sengpielaudio.com/calculator-cutoffFrequencies.htm
    this._f1 = freq * (Math.sqrt(1 + 1 / (4 * Q **2)) - 1 / (2 * Q));
    this._f2 = freq * (Math.sqrt(1 + 1 / (4 * Q **2)) + 1 / (2 * Q));

    return html`
      <svg
        @mousedown=${this._onMouseDown}
        shape-rendering="crispEdges"
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
          />
        </g>

        <polyline class="accumulated-filter" points="${accumulatedFilterPath}" />
        <polyline class="selected-filter" points="${selectedFilterPath}" />

        <g class="db-axis">
          ${[-18, -12, -6, 0, 6, 12, 18].map(value => {
            const y = yScale(value);
            return svg`
              <g class="db-tick">
                <line
                  x1=${this._width - 5}
                  x2=${this._width}
                  y1=${y}
                  y2=${y}
                />
                <text
                  x="${this._width - 10}"
                  y="${y + 3}"
                >${value}</text>
              </g>
            `;
          })}
        </g>

        <g class="filter-controls">
          <g class="infos">
            <text
              x="4"
              y="${this._height - 4}"
            >${type} | ${gain.toFixed(1)}dB | ${Q.toFixed(1)}Q | ${parseInt(freq)}Hz</text>
          </g>

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
                y1=${yScale(gain)}
                y2=${yScale(gain)}
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
      ${this.controlPanel
        ? html`
          <div class="control-panel">
            <div>
              <sc-text># filters</sc-text>
              <sc-number
                integer
                min="1"
                max="10"
                value=${this.numFilters}
                @change=${e => this.numFilters = e.detail.value}
              ></sc-number>
            </div>
            <div>
              <sc-text>Edit index</sc-text>
              <sc-number
                integer
                min="0"
                max=${this.numFilters - 1}
                value=${this.editFilterIndex}
                @change=${e => this.editFilterIndex = e.detail.value}
              ></sc-number>
            </div>
            <div class="edit-filter">
              <div>
                <sc-text>Filter #${this.editFilterIndex}</sc-text>
                <sc-select
                  .options=${biquadFilterType}
                  value=${type}
                  @change=${e => {
                    filter.type = e.detail.value;
                    this.requestUpdate();
                  }}
                ></sc-select>
              </div>
              <div>
                <sc-dial
                  min="1"
                  max=${this._nquist}
                  value=${filter.frequency.value}
                  unit="Hz"
                  num-decimals="0"
                  mode="exp"
                  mode-basis="200"
                  @input=${e => {
                    filter.frequency.value = e.detail.value;
                    this.requestUpdate();
                  }}
                ></sc-dial>
                ${type === 'lowshelf' || type === 'highshelf' || type === 'peaking'
                  ? html`
                    <sc-dial
                      min="-24"
                      max="24"
                      value=${filter.gain.value}
                      unit="dB"
                      num-decimals="1"
                      @input=${e => {
                        filter.gain.value = e.detail.value;
                        this.requestUpdate();
                      }}
                    ></sc-dial>
                  `
                  : nothing
                }
                ${type !== 'lowshelf' && type !== 'highshelf'
                  ? html`
                    <sc-dial
                      min=${0.000001}
                      max=${30}
                      value=${filter.Q.value}
                      unit="Q"
                      num-decimals="1"
                      mode="exp"
                      mode-basis="20"
                      @input=${e => {
                        filter.Q.value = e.detail.value;
                        this.requestUpdate();
                      }}
                    ></sc-dial>
                  `
                  : nothing
                }
              </div>
            </div>
          </div>
        `
        : nothing
      }
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

    const $svg = this.shadowRoot.querySelector('svg')
    $svg.classList.add('edit');
    $svg.classList.add(this._editMode);

    const filter = this.#filterNodes[this.editFilterIndex];
    this._mousedownInfos = {
      x: this._freqToNorm(filter.frequency.value),
      y: (filter.gain.value - this.minGain) / (this.maxGain - this.minGain),
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }

  _onMouseMove(e) {
    this._handleEvent(e);
  }

  _onMouseUp(e) {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
    this._cancelUserSelectNoneOnBody(e);

    const $svg = this.shadowRoot.querySelector('svg')
    $svg.classList.remove('edit');
    $svg.classList.remove(this._editMode);

    this._editMode = null;
  }

  _handleEvent(e) {
    // http://www.sengpielaudio.com/calculator-bandwidth.htm
    // Q = f0 / BW
    // BW = f2 − f1
    // f0= BW × Q = √ (f1 × f2)
    // f1 = f0^2 / f2 = f2 − BW
    // f2 = f0^2 / f1 = f1 + BW
    // note that Q is not used for highshelf and lowshelf
    const filter = this.#filterNodes[this.editFilterIndex];

    // gain is updated in every mode
    const deltaY = (e.clientY - this._mousedownInfos.clientY) / this._height;
    const y = this._mousedownInfos.y - deltaY;
    const gain = y * (this.maxGain - this.minGain) + this.minGain;
    filter.gain.value = gain;

    switch (this._editMode) {
      case 'f0': {
        // interaction is relative to mouse down
        const deltaX = (e.clientX - this._mousedownInfos.clientX) / this._width;
        const x = Math.min(1, Math.max(0, this._mousedownInfos.x + deltaX));

        const frequency = this._normToFreq(x);
        filter.frequency.value = frequency;
        break;
      }
      case 'f1': {
        // interaction is absolute according to mouse position
        const rect = this.getBoundingClientRect();
        let x = (e.clientX - rect.left) / this._width;
        x = Math.max(0, Math.min(1, x));

        const f0 = filter.frequency.value;
        const f1 = Math.min(this._normToFreq(x), f0 - 1e-3); // prevent Infinity
        const f2 = f0**2 / f1;
        const Q = f0 / (f2 - f1);
        filter.Q.value = Q;
        break;
      }
      case 'f2': {
        // interaction is absolute according to mouse position
        const rect = this.getBoundingClientRect();
        let x = (e.clientX - rect.left) / this._width;
        x = Math.max(0, Math.min(1, x));

        const f0 = filter.frequency.value;
        const f2 = Math.max(this._normToFreq(x), f0 + 1e-3); // prevent Infinity
        const f1 = f0**2 / f2;
        const Q = f0 / (f2 - f1);
        filter.Q.value = Q;
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
