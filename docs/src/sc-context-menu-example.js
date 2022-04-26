import { html } from 'lit';

export default function () {
  const context = [
    { action: 'edit', label: 'Edit' },
    { action: 'save', label: 'Save' },
    { action: 'delete', label: 'Delete' },
  ];

  return html`
    <sc-context-menu
      id="test-context-menu"
      value="${JSON.stringify(context)}"
      @input="${e => {
        document.querySelector('#context-menu-input').active = true;
        document.querySelector('#context-menu-value-input').value = e.detail.value;
      }}"
    ></sc-context-menu>
    <div
      style="
        width: 400px;
        height: 300px;
        text-align: center;
        line-height: 300px;
        background-color: #efefef;
      "
      @contextmenu="${e => {
        e.preventDefault();
        const $component = document.querySelector('#test-context-menu');
        $component.show(e);
      }}"
    >
      right-click to open the context menu
    </div>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input (e.detail.value)"></sc-text>
      <sc-bang id="context-menu-input"></sc-bang>
      <sc-text readonly id="context-menu-value-input"></sc-text>
    </p>


    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="value=null"></sc-text>
      <sc-text
        width="300"
        height="300"
        value="${JSON.stringify(context, null, 2)}"
        @change="${e => {
          const $component = document.querySelector('#test-context-menu');
          $component.value = JSON.parse(e.detail.value);
        }}"
      ></sc-number>
    </p>
  `;
}
