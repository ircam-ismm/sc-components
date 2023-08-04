import { html } from 'lit';

export const template = html`

<h2>Theming & Styling</h2>

The library can be styled and themed at three different levels.

At the most global level you can change the global css variables that are used
within the whole library:

<h3>Global css variables</h3>

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
`;
