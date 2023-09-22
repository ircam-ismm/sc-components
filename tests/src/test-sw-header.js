import { LitElement, html, render, css } from 'lit';

import '../../src/sc-tab.js';
import '../../src/sc-button.js';

class ControllerLayout extends LitElement {
  static get styles() {
    return css`
      :host > div {
        padding: 20px;
      }

      header {
        display: block;
        height: 38px;
        line-height: 38px;
        background-color: #121212;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #343434;
      }

      header h1 {
        font-size: 12px;
        margin: 0;
        padding-left: 20px;
        color: white
      }

      sc-tab {
/*        height: 100%;*/
      }
    `;
  }

  constructor() {
    super();

  }

  render() {
    return html`
      <header>
        <h1>sw-tab/sw-button in sw-header - issue #9</h1>
        <sc-tab options="${JSON.stringify(['a', 'b'])}" value="a"></sc-tab>
        <sc-button selected>coucou</sc-button>
      </header>
      <div>
      </div>
    `;
  }
}

customElements.define('controller-layout', ControllerLayout);

export const template = html`
  <controller-layout></controller-layout>
`
