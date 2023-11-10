import { LitElement, html, css } from 'lit';

class MixerTrack extends LitElement {
  static properties = {
    channel: { type: Number },
    name: { type: String },
    volume: { type: Number },
    mute: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 80px;
      background-color: #232323;
    }

    .track {
      box-sizing: border-box;
      width: 80px;
      height: 100%;
      border: 1px solid #343434;
      background-color: #121212;
      padding: 4px;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      flex-direction: column;
    }

    p {
      margin: 0 0 2px;
      height: 20px;
    }

    .name {
      font-style: italic;
    }

    sc-slider {
      width: 100%;
      height: 100%;
      font-size: 10px;
    }

    .mute {
      margin-top: 5px;
      display: flex;
    }

    .mute p {
      font-size: 10px;
      width: 60px;
      height: 20px;
      line-height: 20px;
    }

    .mute sc-toggle {
      width: 40px;
      height: 20px;
    }
  `;

  constructor() {
    super();

    this.volume = 0;
    this.name = null;
    this.volume = 0;
    this.mute = false;
  }

  render() {
    const classes = {
      track: true,
    };

    return html`
      <div class="track">
        <div>
          <p>channel: ${this.channel}</p>
          <p class="name">${this.name ? this.name : '...'}</p>
        </div>
        <sc-slider
          relative
          min="-80"
          max="12"
          step="1"
          value=${this.volume}
          orientation="vertical"
          number-box
        ></sc-slider>
        <div class="mute">
          <p>mute:</p>
          <sc-toggle
            ?active=${this.mute}
          ></sc-toggle>
        </div>
      </div>
    `;
  }
}

customElements.define('mixer-track', MixerTrack);

const track = {
  channel: 1,
  name: 'My Track',
  volume: 0,
  mute: false,
};

export const template = html`
  <h2>mixer track</h2>
  <div style="height: 600px">
    <mixer-track
      channel="1",
      name="My Track"
      volume="0"
      ?mute=${false}
    ></mixer-track>
  </div>
`
