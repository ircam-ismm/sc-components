import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

// export const mackie = new Float32Array([-144.5,-144.5,-140,-130,-120,-110,-100,-90,-85,-80,-75,-70,-65,-60,-59.67,-59.33,-59,-58.67,-58.33,-58,-57.67,-57.33,-57,-56.67,-56.33,-56,-55.67,-55.33,-55,-54.67,-54.33,-54,-53.67,-53.33,-53,-52.67,-52.33,-52,-51.67,-51.33,-51,-50.67,-50.33,-50,-49.67,-49.33,-49,-48.67,-48.33,-48,-47.67,-47.33,-47,-46.67,-46.33,-46,-45.67,-45.33,-45,-44.67,-44.33,-44,-43.67,-43.33,-43,-42.67,-42.33,-42,-41.67,-41.33,-41,-40.67,-40.33,-40,-39.8,-39.6,-39.4,-39.2,-39,-38.8,-38.6,-38.4,-38.2,-38,-37.8,-37.6,-37.4,-37.2,-37,-36.8,-36.6,-36.4,-36.2,-36,-35.8,-35.6,-35.4,-35.2,-35,-34.8,-34.6,-34.4,-34.2,-34,-33.8,-33.6,-33.4,-33.2,-33,-32.8,-32.6,-32.4,-32.2,-32,-31.8,-31.6,-31.4,-31.2,-31,-30.8,-30.6,-30.4,-30.2,-30,-29.75,-29.5,-29.25,-29,-28.75,-28.5,-28.25,-28,-27.75,-27.5,-27.25,-27,-26.75,-26.5,-26.25,-26,-25.75,-25.5,-25.25,-25,-24.75,-24.5,-24.25,-24,-23.75,-23.5,-23.25,-23,-22.75,-22.5,-22.25,-22,-21.75,-21.5,-21.25,-21,-20.75,-20.5,-20.25,-20,-19.87,-19.73,-19.6,-19.47,-19.33,-19.2,-19.07,-18.93,-18.8,-18.67,-18.53,-18.4,-18.27,-18.13,-18,-17.87,-17.73,-17.6,-17.47,-17.33,-17.2,-17.07,-16.93,-16.8,-16.67,-16.53,-16.4,-16.27,-16.13,-16,-15.87,-15.73,-15.6,-15.47,-15.33,-15.2,-15.07,-14.93,-14.8,-14.67,-14.53,-14.4,-14.27,-14.13,-14,-13.87,-13.73,-13.6,-13.47,-13.33,-13.2,-13.07,-12.93,-12.8,-12.67,-12.53,-12.4,-12.27,-12.13,-12,-11.87,-11.73,-11.6,-11.47,-11.33,-11.2,-11.07,-10.93,-10.8,-10.67,-10.53,-10.4,-10.27,-10.13,-10,-9.94,-9.89,-9.83,-9.78,-9.72,-9.67,-9.61,-9.56,-9.5,-9.44,-9.39,-9.33,-9.28,-9.22,-9.17,-9.11,-9.06,-9,-8.94,-8.89,-8.83,-8.78,-8.72,-8.67,-8.61,-8.56,-8.5,-8.44,-8.39,-8.33,-8.28,-8.22,-8.17,-8.11,-8.06,-8,-7.94,-7.89,-7.83,-7.78,-7.72,-7.67,-7.61,-7.56,-7.5,-7.44,-7.39,-7.33,-7.28,-7.22,-7.17,-7.11,-7.06,-7,-6.94,-6.89,-6.83,-6.78,-6.72,-6.67,-6.61,-6.56,-6.5,-6.44,-6.39,-6.33,-6.28,-6.22,-6.17,-6.11,-6.06,-6,-5.94,-5.89,-5.83,-5.78,-5.72,-5.67,-5.61,-5.56,-5.5,-5.44,-5.39,-5.33,-5.28,-5.22,-5.17,-5.11,-5.06,-5,-4.92,-4.83,-4.75,-4.67,-4.58,-4.5,-4.42,-4.33,-4.25,-4.17,-4.08,-4,-3.92,-3.83,-3.75,-3.67,-3.58,-3.5,-3.42,-3.33,-3.25,-3.17,-3.08,-3,-2.92,-2.83,-2.75,-2.67,-2.58,-2.5,-2.42,-2.33,-2.25,-2.17,-2.08,-2,-1.92,-1.83,-1.75,-1.67,-1.58,-1.5,-1.42,-1.33,-1.25,-1.17,-1.08,-1,-0.92,-0.83,-0.75,-0.67,-0.58,-0.5,-0.42,-0.33,-0.25,-0.17,-0.08,0,0.08,0.17,0.25,0.33,0.42,0.5,0.58,0.67,0.75,0.83,0.92,1,1.08,1.17,1.25,1.33,1.42,1.5,1.58,1.67,1.75,1.83,1.92,2,2.08,2.17,2.25,2.33,2.42,2.5,2.58,2.67,2.75,2.83,2.92,3,3.08,3.17,3.25,3.33,3.42,3.5,3.58,3.67,3.75,3.83,3.92,4,4.08,4.17,4.25,4.33,4.42,4.5,4.58,4.67,4.75,4.83,4.92,5,5.11,5.22,5.33,5.44,5.56,5.67,5.78,5.89,6,6.11,6.22,6.33,6.44,6.56,6.67,6.78,6.89,7,7.11,7.22,7.33,7.44,7.56,7.67,7.78,7.89,8,8.11,8.22,8.33,8.44,8.56,8.67,8.78,8.89,9,9.11,9.22,9.33,9.44,9.56,9.67,9.78,9.89,10,10.11,10.22,10.33,10.44,10.56,10.67,10.78,10.89,11,11.11,11.22,11.33,11.44,11.56,11.67,11.78,11.89,12]);

export const template = html`

<h2>sc-slider</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-slider.js';

const template = html\`
  <sc-slider></sc-slider>
\`;
`}</sc-code-example>

<sc-slider
  id="test-slider"
  @input=${e => document.querySelector('#slider-input').value = e.detail.value}
  @change=${e => document.querySelector('#slider-change').value = e.detail.value}
></sc-slider>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-number readonly id="slider-input"></sc-number>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="slider-change"></sc-number>
</div>


<h3>Attributes</h3>
<div>
  <sc-text>min [=0]</sc-text>
  <sc-number value="0" integer
    @input=${e => document.querySelector('#test-slider').min = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>max [=1]</sc-text>
  <sc-number value="1" integer
    @input=${e => document.querySelector('#test-slider').max = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>value [=0.5]</sc-text>
  <sc-number value="0.5"
    @input=${e => document.querySelector('#test-slider').value = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>step [=0.001]</sc-text>
  <sc-number value="0.001"
    @input=${e => document.querySelector('#test-slider').step = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?number-box [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').numberBox = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>orientation [="horizontal"]</sc-text>
  <sc-radio
    options=${JSON.stringify(['horizontal', 'vertical'])}
    value="horizontal"
    @change=${e => document.querySelector('#test-slider').orientation = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?relative [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').relative = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').disabled = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>mode [='lin']</sc-text>
  <sc-tab
    value="lin"
    .options=${['lin', 'exp', 'log']}
    @change=${e => document.querySelector('#test-slider').mode = e.detail.value}
  ></sc-tab>
</div>
<div>
  <sc-text>modeBase [=2]</sc-text>
  <sc-number
    value="2"
    min="0.01"
    max="100"
    @change=${e => document.querySelector('#test-slider').modeBase = e.detail.value}
  ></sc-number>
  <p style="font-style:italic;">Only applies if "mode" is "exp" or "log"</p>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.curve [=null] </sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-slider').curve = JSON.parse(e.detail.value)}
  >[0, 1, 4]</sc-text>
  <p style="font-style:italic;">
    Sequence of numbers to use as a lookup table for mapping between component and values.
    <br />
    If set, take precedence over "mode", "min" and "max" attributes
  </p>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-slider {
  width: 200px;
  height: 30px;
  --sc-slider-background-color: var(--sc-color-primary-2);
  --sc-slider-foreground-color: var(--sc-color-primary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
