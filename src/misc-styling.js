import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>Styling</h2>

<h3>Default theme colors</h3>

<div style="display: flex; flex-wrap: wrap;">
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-primary-1)"></div>
    <p style="margin-top: 8px;">--sc-color-primary-1</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-primary-2)"></div>
    <p style="margin-top: 8px;">--sc-color-primary-2</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-primary-3)"></div>
    <p style="margin-top: 8px;">--sc-color-primary-3</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-primary-4)"></div>
    <p style="margin-top: 8px;">--sc-color-primary-4</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-primary-5)"></div>
    <p style="margin-top: 8px;">--sc-color-primary-5</p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; margin-top: 30px;">
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-secondary-1)"></div>
    <p style="margin-top: 8px;">--sc-color-secondary-1</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-secondary-2)"></div>
    <p style="margin-top: 8px;">--sc-color-secondary-2</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-secondary-3)"></div>
    <p style="margin-top: 8px;">--sc-color-secondary-3</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-secondary-4)"></div>
    <p style="margin-top: 8px;">--sc-color-secondary-4</p>
  </div>
  <div style="width: 200px;">
    <div style="width: 100px; height: 100px; background-color: var(--sc-color-secondary-5)"></div>
    <p style="margin-top: 8px;">--sc-color-secondary-5</p>
  </div>
</div>

<h3>Change the theme</h3>
<sc-editor
  style="width: 500px; height: 250px;"
  save-button
  value="\
:root {
  --sc-font-family: Consolas, monaco, monospace;
  --sc-font-size: 11px;
  --sc-color-primary-1: #121212ff;
  --sc-color-primary-2: #272822ff;
  --sc-color-primary-3: #3d3e39ff;
  --sc-color-primary-4: #6a6a69ff;
  --sc-color-primary-5: #dededeff;
  --sc-color-secondary-1: #f4b43eff;
  --sc-color-secondary-2: #1c78c0ff;
  --sc-color-secondary-3: #d9534fff;
  --sc-color-secondary-4: #5ec451ff;
  --sc-color-secondary-5: #cd7afaff;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<h3>Style components</h3>
<div>
  <sc-toggle></sc-toggle>
  <sc-toggle></sc-toggle>
  <sc-toggle></sc-toggle>
</div>
<sc-editor
  style="width: 500px; height: 140px;"
  save-button
  value="\
sc-toggle {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-2);
  --sc-toggle-inactive-color: var(--sc-color-primary-4);
  --sc-toggle-active-color: var(--sc-color-primary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<div style="margin-top: 40px;">
  <sc-slider id="my-slider"></sc-slider>
</div>
<sc-editor
  style="width: 500px; height: 140px;"
  save-button
  value="\
#my-slider {
  width: 200px;
  height: 30px;
  --sc-slider-background-color: var(--sc-color-primary-2);
  --sc-slider-foreground-color: var(--sc-color-primary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
