import { html, css } from 'lit';
import ScElement from './ScElement.js';

class ScLoading extends ScElement {
  static styles = css`
    :host {
      width: 50px;
      height: 50px;
      display: grid;
      grid-gap: 4px;
      padding: 2px;
      box-sizing: border-box;

      --sc-loading-color: var(--sc-color-primary-4);
      --sc-loading-duration: 3s;
    }

    div {
      background-color: var(--sc-loading-color);
      animation: o1 var(--sc-loading-duration) linear infinite;
      opacity: 0;
    }

    :host([type=square]) {
      grid-template-rows: repeat(2, auto);
      grid-template-columns: repeat(2, auto);
    }

    :host([type=horizontal]) {
      grid-template-rows: 100%;
      grid-template-columns: repeat(4, auto);
    }

    :host([type=vertical]) {
      grid-template-rows: repeat(4, auto);
      grid-template-columns: 100%;
    }

    div:nth-of-type(1) {
      animation-delay: 0s;
    }

    div:nth-of-type(2) {
      animation-delay: calc(var(--sc-loading-duration) / 4);
    }

    div:nth-of-type(3) {
      animation-delay: calc(var(--sc-loading-duration) / 4 * 2);
    }

    div:nth-of-type(4) {
      animation-delay: calc(var(--sc-loading-duration) / 4 * 3);
    }

    /* flip 3 & 4 in square type */
    :host([type=square]) div:nth-of-type(3) {
      animation-delay: calc(var(--sc-loading-duration) / 4 * 3);
    }

    :host([type=square]) div:nth-of-type(4) {
      animation-delay: calc(var(--sc-loading-duration) / 4 * 2);
    }

    @keyframes o1 {
      0%  { opacity: 0 }
      28% { opacity: 1 }
      56% { opacity: 0 }
      100% { opacity: 0 }
    }
  `

  static properties = {
    type: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();

    this.type = 'square';
  }

  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    `
  }
}

if (customElements.get('sc-loading') === undefined) {
  customElements.define('sc-loading', ScLoading);
}

export default ScLoading;
