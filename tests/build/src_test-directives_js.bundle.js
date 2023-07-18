"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_ircam_sc_components_doc"] = self["webpackChunk_ircam_sc_components_doc"] || []).push([["src_test-directives_js"],{

/***/ "./src/test-directives.js":
/*!********************************!*\
  !*** ./src/test-directives.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   template: () => (/* binding */ template)\n/* harmony export */ });\n/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ \"./node_modules/lit/index.js\");\n/* harmony import */ var lit_directives_keyed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/directives/keyed.js */ \"./node_modules/lit/directives/keyed.js\");\n/* harmony import */ var lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit/directives/repeat.js */ \"./node_modules/lit/directives/repeat.js\");\n\n\n\n\nconst stuff = ['a', 'b', 'c'];\n\nconst template = (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n  <style>\n    sc-slider {\n      width: 200px;\n      height: 400px;\n    }\n  </style>\n  <h2>repeat</h2>\n  ${(0,lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_2__.repeat)(stuff, name => name, name => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <sc-slider orientation=\"vertical\"></sc-slider>\n    `\n  )}\n  <h2>keyed</h2>\n  <h3>sc-slider</h3>\n  ${stuff.map(name => {\n    return (0,lit_directives_keyed_js__WEBPACK_IMPORTED_MODULE_1__.keyed)(name, (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n      <sc-slider orientation=\"vertical\"></sc-slider>\n    `)\n  })}\n\n  <h3>select</h3>\n  ${(0,lit_directives_keyed_js__WEBPACK_IMPORTED_MODULE_1__.keyed)('abc', (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`\n    <sc-select options=\"${JSON.stringify(stuff)}\"></sc-select>\n  `)}\n`\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGVzdC1kaXJlY3RpdmVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BpcmNhbS9zYy1jb21wb25lbnRzLWRvYy8uL3NyYy90ZXN0LWRpcmVjdGl2ZXMuanM/Y2NjZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IGtleWVkIH0gZnJvbSAnbGl0L2RpcmVjdGl2ZXMva2V5ZWQuanMnO1xuaW1wb3J0IHsgcmVwZWF0IH0gZnJvbSAnbGl0L2RpcmVjdGl2ZXMvcmVwZWF0LmpzJztcblxuY29uc3Qgc3R1ZmYgPSBbJ2EnLCAnYicsICdjJ107XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGh0bWxgXG4gIDxzdHlsZT5cbiAgICBzYy1zbGlkZXIge1xuICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgaGVpZ2h0OiA0MDBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxoMj5yZXBlYXQ8L2gyPlxuICAke3JlcGVhdChzdHVmZiwgbmFtZSA9PiBuYW1lLCBuYW1lID0+IGh0bWxgXG4gICAgICA8c2Mtc2xpZGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj48L3NjLXNsaWRlcj5cbiAgICBgXG4gICl9XG4gIDxoMj5rZXllZDwvaDI+XG4gIDxoMz5zYy1zbGlkZXI8L2gzPlxuICAke3N0dWZmLm1hcChuYW1lID0+IHtcbiAgICByZXR1cm4ga2V5ZWQobmFtZSwgaHRtbGBcbiAgICAgIDxzYy1zbGlkZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvc2Mtc2xpZGVyPlxuICAgIGApXG4gIH0pfVxuXG4gIDxoMz5zZWxlY3Q8L2gzPlxuICAke2tleWVkKCdhYmMnLCBodG1sYFxuICAgIDxzYy1zZWxlY3Qgb3B0aW9ucz1cIiR7SlNPTi5zdHJpbmdpZnkoc3R1ZmYpfVwiPjwvc2Mtc2VsZWN0PlxuICBgKX1cbmBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/test-directives.js\n");

/***/ })

}]);