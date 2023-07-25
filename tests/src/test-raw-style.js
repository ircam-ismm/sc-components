import { html, literal, unsafeStatic } from 'lit/static-html.js';
import {  } from 'lit/static-html.js';
import components from '../../docs/src/components.js';

const rulers = new Map();

function toggleRulers(comp) {
  if (rulers.has(comp)) {
    const $lines = rulers.get(comp);
    $lines.forEach($line => $line.remove());
    rulers.delete(comp);
    return;
  }

  const $comp = document.querySelector(comp);
  const { top, left, width, height } = $comp.getBoundingClientRect();

  const scrollTop = document.documentElement.scrollTop;
  console.log();

  const $lines = [
    addHorizontalRuler(scrollTop + top - 1),
    addHorizontalRuler(scrollTop + top + height),
    addVerticalRuler(left - 1),
    addVerticalRuler(left + width),
  ]

  rulers.set(comp, $lines);
}

function addHorizontalRuler(top) {
  const $el = document.createElement('div');
  $el.style.height = '0px';
  $el.style.width = '100%';
  $el.style.borderTop = '1px dotted red';
  $el.style.position = 'absolute';
  $el.style.top = `${top}px`;
  $el.style.left = `0px`;

  document.body.appendChild($el);

  return $el;
}

function addVerticalRuler(left) {
  const $el = document.createElement('div');
  const { height } = document.body.getBoundingClientRect();
  $el.style.height = `${height}px`;
  $el.style.width = '0px';
  $el.style.borderLeft = '1px dotted red';
  $el.style.position = 'absolute';
  $el.style.left = `${left}px`;
  $el.style.top = `0px`;

  document.body.appendChild($el);

  return $el;
}


export function enter() {
  components.forEach(comp => {
    // computed size
    const $comp = document.querySelector(comp);
    const { top, left, width, height } = $comp.getBoundingClientRect();
    const $infos = document.querySelector(`#${comp} p`);
    $infos.textContent = `size: ${width}x${height}`;
  });
}

export const template = html`
  ${components.map(comp => {
    return html`
      <div id="${comp}" style="padding: 4px; border-bottom: 1px solid grey">
        <h2>
          ${comp}
        </h2>
        <${literal`${unsafeStatic(comp)}`}
          options="${JSON.stringify(['a', 'b', 'c'])}"
          @hover=${e => console.log('hover')}
        >slot</${literal`${unsafeStatic(comp)}`}>
        <br />
        <p style="display: inline-block"></p>
        <button @click=${e => toggleRulers(comp)}>toggle rulers</button>
      </div>
    `
  })}
`;

