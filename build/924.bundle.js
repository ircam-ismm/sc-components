"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[924],{6924:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{template:()=>template});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(182),_utils_applyStyle_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4670);const template=lit__WEBPACK_IMPORTED_MODULE_0__.dy`

<h2>sc-clock</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-clock.js';\n\nconst template = html`\n  <sc-clock></sc-clock>\n`;\n"}</sc-code-example>

<sc-clock id="test-clock"></sc-clock>

<h3>Attributes</h3>
<div>
  <sc-text>[?twinkle=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-clock").twinkle=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[format='hh:mm:ss:ms']</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-clock").format=e.detail.value}
  >hh:mm:ss:ms</sc-text>
</div>

<h3>Properties</h3>
<div>
  <p>By default, the time is retrieved from the locale date/time</p>
  <sc-text>[.getTimeFunction]</sc-text>
  <sc-editor
    save-button
    style="width: 420px;"
    value="\
const $clock = document.querySelector('#test-clock');
const startTime = Date.now();
// return a time in seconds
$clock.getTimeFunction = () => {
  const dt = Date.now() - startTime;
  return dt / 1000;
}
"
    @change=${e=>eval(e.detail.value)}
  ></sc-editor>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-clock {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e=>(0,_utils_applyStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(e.detail.value)}
></sc-editor>

`}}]);