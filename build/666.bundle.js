/*! For license information please see 666.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[666],{2666:(t,e,s)=>{s.r(e),s.d(e,{template:()=>i});const i=s(9392).dy`
<div id="homepage">
  <h2>@ircam/sc-components</h2>

  <p>Web Component library for rapid prototyping audio and creative applications in the browser.</p>

  <div id="demo">
    <sc-bang></sc-bang>
    <sc-number></sc-number>
    <sc-slider></sc-slider>
    <sc-dial></sc-dial>
    <sc-toggle></sc-toggle>
    <sc-text>some text</sc-text>
    <sc-switch></sc-switch>
  </div>

  <h3>Install</h3>

  <sc-code-example language="bash">
npm install --save @ircam/sc-components
  </sc-code-example>

  <h3>Usage</h3>

  <p>Import components one by one:</p>

  <sc-code-example language="javascript">
import '@ircam/sc-components/sc-toggle.js';
import '@ircam/sc-components/sc-button.js';
// ...
  </sc-code-example>


  <p>
    Or all components at once:<br >
    <i>(note that it's best to import only the files you need to keep your bundle size as small as possibles)</i>
  </p>

  <sc-code-example language="javascript">
import '@ircam/sc-components';
  </sc-code-example>



  <h3>Theming - global css variables</h3>

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
</div>
`},9392:(t,e,s)=>{s.d(e,{dy:()=>E.dy});const i=window,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;class l{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}}const a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,r))(e)})(t):t;var c;const d=window,h=d.trustedTypes,p=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,v={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},g="finalized";class b extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{o?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const s=document.createElement("style"),o=i.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,t.appendChild(s)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const r=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:v).toAttribute(e,s.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:v;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||y)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}b[g]=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:b}),(null!==(c=d.reactiveElementVersions)&&void 0!==c?c:d.reactiveElementVersions=[]).push("1.6.2");var _,f,E=s(3692);class w extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,E.sY)(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return E.Jb}}w.finalized=!0,w._$litElement$=!0,null===(_=globalThis.litElementHydrateSupport)||void 0===_||_.call(globalThis,{LitElement:w});const x=globalThis.litElementPolyfillSupport;null==x||x({LitElement:w}),(null!==(f=globalThis.litElementVersions)&&void 0!==f?f:globalThis.litElementVersions=[]).push("3.3.2")}}]);