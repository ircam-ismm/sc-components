"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkjs_prototyping_boilerplate"] = self["webpackChunkjs_prototyping_boilerplate"] || []).push([["src_sc-toggle_js"],{

/***/ "./src/sc-toggle.js":
/*!**************************!*\
  !*** ./src/sc-toggle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"template\": () => (/* binding */ template)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n/* harmony import */ var _utils_applyStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/applyStyle.js */ \"./src/utils/applyStyle.js\");\nvar _templateObject;\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\nvar template = (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n<h2>sc-bang</h2>\\n\\n<pre><code class=\\\"language-javascript\\\">\", \"\\n</code></pre>\\n\\n<sc-toggle\\n  id=\\\"test-toggle\\\"\\n  @change=\", \"\\n></sc-toggle>\\n\\n<h3>Events</h3>\\n<p>\\n  <sc-text readonly>@change</sc-text>\\n  <sc-toggle id=\\\"toggle-change\\\"></sc-toggle>\\n</p>\\n<pre><code class=\\\"language-html\\\">\", \"\\n<code></pre>\\n\\n<h3>Attributes</h3>\\n<p>\\n  <sc-text readonly>[?active=false]</sc-text>\\n  <sc-toggle\\n    @change=\", \"\\n  ></sc-toggle>\\n</p>\\n<p>\\n  <sc-text readonly>[?disabled=false]</sc-text>\\n  <sc-toggle\\n    @change=\", \"\\n  ></sc-toggle>\\n</p>\\n\\n<h3>Styling</h3>\\n<sc-editor\\n  value=\\\"#test-toggle {\\n  width: 30px;\\n  height: 30px;\\n}\\n  \\\"\\n  @change=\", \"\\n></sc-editor>\\n\"], [\"\\n<h2>sc-bang</h2>\\n\\n<pre><code class=\\\"language-javascript\\\">\\\\\\n\", \"\\n</code></pre>\\n\\n<sc-toggle\\n  id=\\\"test-toggle\\\"\\n  @change=\", \"\\n></sc-toggle>\\n\\n<h3>Events</h3>\\n<p>\\n  <sc-text readonly>@change</sc-text>\\n  <sc-toggle id=\\\"toggle-change\\\"></sc-toggle>\\n</p>\\n<pre><code class=\\\"language-html\\\">\\\\\\n\", \"\\n<code></pre>\\n\\n<h3>Attributes</h3>\\n<p>\\n  <sc-text readonly>[?active=false]</sc-text>\\n  <sc-toggle\\n    @change=\", \"\\n  ></sc-toggle>\\n</p>\\n<p>\\n  <sc-text readonly>[?disabled=false]</sc-text>\\n  <sc-toggle\\n    @change=\", \"\\n  ></sc-toggle>\\n</p>\\n\\n<h3>Styling</h3>\\n<sc-editor\\n  value=\\\"\\\\\\n#test-toggle {\\n  width: 30px;\\n  height: 30px;\\n}\\n  \\\"\\n  @change=\", \"\\n></sc-editor>\\n\"])), \"import { html } from 'lit';\\nimport '@ircam/sc-components/sc-toggle.js';\\n\\nconst template = html`<sc-toggle></sc-toggle>`;\", function (e) {\n  return document.querySelector('#toggle-change').active = e.detail.value;\n}, \"<sc-toggle\\n  @change=${e => console.log(e.detail.value)}\\n></sc-toggle>\", function (e) {\n  return document.querySelector('#test-toggle').active = e.detail.value;\n}, function (e) {\n  return document.querySelector('#test-toggle').disabled = e.detail.value;\n}, function (e) {\n  return (0,_utils_applyStyle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.detail.value);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2MtdG9nZ2xlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFhQTtBQUFBO0FBbUJBO0FBQUE7QUFNQTtBQUFBO0FBWUE7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXByb3RvdHlwaW5nLWJvaWxlcnBsYXRlLy4vc3JjL3NjLXRvZ2dsZS5qcz82NGUxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0IGFwcGx5U3R5bGUgZnJvbSAnLi91dGlscy9hcHBseVN0eWxlLmpzJztcblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gaHRtbGBcbjxoMj5zYy1iYW5nPC9oMj5cblxuPHByZT48Y29kZSBjbGFzcz1cImxhbmd1YWdlLWphdmFzY3JpcHRcIj5cXFxuJHtgXFxcbmltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0ICdAaXJjYW0vc2MtY29tcG9uZW50cy9zYy10b2dnbGUuanMnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGh0bWxcXGA8c2MtdG9nZ2xlPjwvc2MtdG9nZ2xlPlxcYDtgfVxuPC9jb2RlPjwvcHJlPlxuXG48c2MtdG9nZ2xlXG4gIGlkPVwidGVzdC10b2dnbGVcIlxuICBAY2hhbmdlPSR7ZSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9nZ2xlLWNoYW5nZScpLmFjdGl2ZSA9IGUuZGV0YWlsLnZhbHVlfVxuPjwvc2MtdG9nZ2xlPlxuXG48aDM+RXZlbnRzPC9oMz5cbjxwPlxuICA8c2MtdGV4dCByZWFkb25seT5AY2hhbmdlPC9zYy10ZXh0PlxuICA8c2MtdG9nZ2xlIGlkPVwidG9nZ2xlLWNoYW5nZVwiPjwvc2MtdG9nZ2xlPlxuPC9wPlxuPHByZT48Y29kZSBjbGFzcz1cImxhbmd1YWdlLWh0bWxcIj5cXFxuJHtgXFxcbjxzYy10b2dnbGVcbiAgQGNoYW5nZT1cXCR7ZSA9PiBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSl9XG4+PC9zYy10b2dnbGU+YH1cbjxjb2RlPjwvcHJlPlxuXG48aDM+QXR0cmlidXRlczwvaDM+XG48cD5cbiAgPHNjLXRleHQgcmVhZG9ubHk+Wz9hY3RpdmU9ZmFsc2VdPC9zYy10ZXh0PlxuICA8c2MtdG9nZ2xlXG4gICAgQGNoYW5nZT0ke2UgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rlc3QtdG9nZ2xlJykuYWN0aXZlID0gZS5kZXRhaWwudmFsdWV9XG4gID48L3NjLXRvZ2dsZT5cbjwvcD5cbjxwPlxuICA8c2MtdGV4dCByZWFkb25seT5bP2Rpc2FibGVkPWZhbHNlXTwvc2MtdGV4dD5cbiAgPHNjLXRvZ2dsZVxuICAgIEBjaGFuZ2U9JHtlID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZXN0LXRvZ2dsZScpLmRpc2FibGVkID0gZS5kZXRhaWwudmFsdWV9XG4gID48L3NjLXRvZ2dsZT5cbjwvcD5cblxuPGgzPlN0eWxpbmc8L2gzPlxuPHNjLWVkaXRvclxuICB2YWx1ZT1cIlxcXG4jdGVzdC10b2dnbGUge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xufVxuICBcIlxuICBAY2hhbmdlPSR7ZSA9PiBhcHBseVN0eWxlKGUuZGV0YWlsLnZhbHVlKX1cbj48L3NjLWVkaXRvcj5cbmA7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/sc-toggle.js\n");

/***/ })

}]);