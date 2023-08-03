import { html, css, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

const midiLearnSymbol = Symbol.for('sc-midi-learn');

/**
 * Just use a concatenation of "name" and "manufacturer" as device id
 *
 * We can't rely on the one given by the brwoser, e.g. we have a new id each
 * time we restart Max on Chrome... This is de facto more susceptible of collisions,
 * but people genrally don't have dozens of MIDI control interface. At contrary
 * this will break if we connect twice the same interface.
 *
 * @todo - find if there is a way to mitigate these two issues.
 */
function getDeviceId(device) {
  return `${device.manufacturer}${device.name}`;
}

function deviceInfos(device) {
  return {
    id: device.id,
    manufacturer: device.manufacturer,
    name: device.name,
  };
}

// can also receive a lightweight device
function deviceToString(device) {
  return device.manufacturer
    ? `${device.name} (${device.manufacturer})`
    : `${device.name}`;
}

function getBindingInfos(device, channel) {
  return {
    device: deviceInfos(device),
    deviceString: deviceToString(device),
    channel,
  };
}

// this is subject to change, just isolate the dirt
function getNodeId(node) {
  return node.id || node._scId;
}

// @todos
// - [x] use mutation observer (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
//   to maintain a live list of <id, nodes>
// - [x] change the bindings data to store only the ids and get the Element from the live list
// - [x] store the devices that have been seen so far in knownDevices
// - [x] delete device
// - [x] use concatenation of name and manufacturer has deviceId
// - [x] disallow multiple bindings on a single element
// - [x] highlight element on panel hover

// - [ ] import / export config - trigger @change event

class ScMidiLearn extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    _devices: {
      state: true,
    },
    _connected: {
      type: Boolean,
      state: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      width: 80px;
      height: 30px;

      background-color: var(--sc-color-primary-3);
      border: 1px solid var(--sc-color-primary-3);

      --sc-midi-learn-panel-position-top: 0;
      --sc-midi-learn-panel-position-right: 0;
      --sc-midi-learn-panel-position-bottom: auto;
      --sc-midi-learn-panel-position-left: auto;
      --sc-midi-learn-panel-position-width: 300px;
      --sc-midi-learn-panel-position-height: auto;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    :host([active]) {
      background-color: var(--sc-color-secondary-3);
      border: 1px solid var(--sc-color-secondary-3);
    }

    .button {
      width: 100%;
      height: 100%;
      display: flex;
      flex-orientation: row;
      justify-content: space-between;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .button sc-text, .button sc-icon {
      background: transparent;
      border: none;
      height: 100%;
    }

    .button sc-text {
      user-select: none;
    }

    .button sc-text {
      width: 40px;
    }

    .button sc-icon {
      opacity: 0.6;
    }

    .button.connected sc-icon {
      opacity: 1;
    }

    .control-panel {
      position: fixed;
      top: var(--sc-midi-learn-panel-position-top);
      right: var(--sc-midi-learn-panel-position-right);;
      bottom: var(--sc-midi-learn-panel-position-bottom);;
      left: var(--sc-midi-learn-panel-position-left);
      width: var(--sc-midi-learn-panel-position-width);
      height: var(--sc-midi-learn-panel-position-height);
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      z-index: 50;
      overflow-y: auto;
    }

    .control-panel .header {
      display: flex;
      padding: 4px 0;
      background-color: var(--sc-color-primary-1);
    }

    .control-panel .header sc-text {
      width: 80%;
    }

    .control-panel .header sc-icon {
      background-color: var(--sc-color-primary-1);
      border: none;
    }

    .device-bindings {
      margin-top: 12px;
    }

    .device-bindings .title {
      display: flex;
    }

    .device-bindings .title sc-text {
      background-color: var(--sc-color-primary-3);
      width: 100%;
    }

    .device-bindings.disconnected {
      font-style: italic;
      opacity: 0.6;
    }

    .binding-item {
      display: flex;
      flex-orientation: row;
      justify-content: space-between;
      border-bottom: 1px solid var(--sc-color-primary-3);
    }

    .binding-item.not-in-dom {
      font-style: italic;
      opacity: 0.6;
    }

    /* channel */
    .binding-item > sc-text.channel {
      width: 70px;
      border-right: 1px solid var(--sc-color-primary-4);
    }

    /* id */
    .binding-item > sc-text.node-id {
      width: 80%;
    }
  `;

  constructor() {
    super();

    // list of connected devices
    // Map<id, MidiInputDevice>
    this._devices = new Map(); // <
    // list of lightweigth devices that have been seen
    // Map<id, Object<id, name, manufacturer>>
    this._knownDevices = new Map();
    // list of elements that are midi learnable
    // the list is live
    // Map<id, ScElement>
    this._$nodes = new Map();
    // list of bindings
    // Map<deviceId, Map<channel, Set<id>>
    this._bindings = new Map();

    // currently selected element for learning
    this._$selectedNode = null;
    // observer that observe the DOM to maintain the live _$elements list
    this._mutationObserver = null;

    this.active = false;

    this._processMidiMessage = this._processMidiMessage.bind(this);
    this._onSelectNode = this._onSelectNode.bind(this);
    this._updateNodeList = this._updateNodeList.bind(this);
    this._onKeyboardEvent = this._onKeyboardEvent.bind(this);

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['Enter', 'Space'],
      callback: this._onKeyboardEvent,
      deduplicateEvents: true,
    });

    // retrieve infos from local storage
    this._loadFromLocalStorage();
  }

  render() {
    const hasConnections = this._devices.size > 0;

    const btnClasses = {
      button: true,
      connected: hasConnections,
    }

    return html`
      <div
        class="${classMap(btnClasses)}"
        @click=${this._toggleActive}
      >
        <sc-icon type="midi" disabled></sc-icon>
        <sc-text>MIDI</sc-text>
      </div>

      ${this.active ?
        html`
          <div class="control-panel">
            <div class="header">
              <sc-icon type="midi"></sc-icon>
              <sc-text>MIDI bindings</sc-text>
              <sc-icon
                class="close"
                type="close"
                @input=${this._toggleActive}
              >close</sc-icon>
            </div>

            <div class="select-interface">
              ${repeat(this._knownDevices, ([deviceId, device]) => deviceId, ([deviceId, device]) => {
                const connected = this._devices.has(deviceId);
                const bindings = this._bindings.get(deviceId);

                const list = [];
                // a device may have node bindings
                if (bindings) {
                  for (let [channel, ids] of bindings.entries()) {
                    ids.forEach(nodeId => {
                      const inDOM = this._$nodes.has(nodeId);

                      const template = html`
                        <div
                          class="binding-item ${inDOM ? '' : 'not-in-dom'}"
                          @mouseover=${e => this._highlightElement(nodeId)}
                          @mouseout=${e => this._unhighlightElement(nodeId)}
                        >
                          <sc-text class="channel">cc ${channel}</sc-text>
                          <sc-text class="node-id">${nodeId}</sc-text>
                          <sc-icon
                            type="delete"
                            @input=${e => this._deleteBinding(deviceId, channel, nodeId)}
                          ></sc-icon>
                        </div>
                      `

                      list.push(template)
                    });
                  }
                }

                return html`
                  <div class="device-bindings ${connected ? '' : 'disconnected'}">
                    <div class="title">
                      <sc-text>${deviceToString(device)}</sc-text>
                      <sc-icon type="delete" @input=${e => this._deleteDevice(deviceId)}></sc-icon>
                    </div>
                    ${list}
                  </div>
                `;
              })}
            </div>
          </div>
        ` : nothing
      }
    `;
  }

  // @note this method is not async, just candy to use await
  async connectedCallback() {
    super.connectedCallback();

    const midiAccess = await navigator.requestMIDIAccess();

    // listen for connected / disconnected devices
    midiAccess.addEventListener('statechange', (e) => {
      // only listen for midi inputs
      if (e.port.type === 'input') {
        this._updateDeviceList(e.currentTarget.inputs);
      }
    });

    // init with currently connected inputs
    this._updateDeviceList(midiAccess.inputs);

    // observe mutation in the DOM to have live list the midi learnable nodes
    this._mutationObserver = new MutationObserver(this._updateNodeList);
    this._mutationObserver.observe(document.body, { subtree: true, childList: true });

    this._updateNodeList();

    if (!this.hasAttribute('tabindex')) {
      console.log('coucou');
      this.setAttribute('tabindex', 0);
    }

    setTimeout(() => this._serialize(), 2000);
  }

  disconnectedCallback() {
    this._mutationObserver.disconnect();
  }

  _onKeyboardEvent(e) {
    if (e.type === 'keydown') {
      this._toggleActive();
    }
  }

  _updateNodeList() {
    const learnableTags = Array.from(globalThis[midiLearnSymbol]);
    const $learnable = document.querySelectorAll(learnableTags.join(','));

    this._$nodes.clear();

    $learnable.forEach($el => {
      const id = getNodeId($el);
      this._$nodes.set(id, $el);
    });

    // loop though all bindings and send midi learn infos to nodes that are in the live list
    for (let [deviceId, channelBindings] of this._bindings.entries()) {
      let device = this._knownDevices.get(deviceId);

      for (let [channel, ids] of channelBindings.entries()) {
        ids.forEach(id => {
          if (this._$nodes.has(id)) {
            const $node = this._$nodes.get(id);
            const bindingInfos = getBindingInfos(device, channel);
            $node.midiLearnInfos = bindingInfos;
          }
        });
      }
    }

    // update learnable elements if some new ones appeared
    this._toggleLearnableElements();
  }

  _updateDeviceList(inputMap) {
    // listen all devices, a bit brute force but this is not something that should happen frequently
    this._devices = new Map();

    for (let [id, device] of inputMap.entries()) {
      device.removeEventListener('midimessage', this._processMidiMessage);
      device.addEventListener('midimessage', this._processMidiMessage);

      const deviceId = getDeviceId(device);
      this._devices.set(deviceId, device);
      this._knownDevices.set(deviceId, deviceInfos(device));
    }

    this._persistToLocalStorage();
  }

  _toggleActive() {
    this.active = !this.active;
    this._toggleLearnableElements();
  }

  _toggleLearnableElements() {
    if (this.active) {
      this._$nodes.forEach($el => {
        $el.midiLearnActive = true;
        $el.addEventListener('click', this._onSelectNode);
      });
    } else {
      this._$nodes.forEach($el => {
        $el.midiLearnActive = false;
        $el.removeEventListener('click', this._onSelectNode);
      });
    }
  }

  // highlight element on mouseover in panel, note that elemnt might not be in the DOM
  _highlightElement(nodeId) {
    if (this._$nodes.has(nodeId)) {
      const $el = this._$nodes.get(nodeId);
      $el.midiLearnHighlight = true;
    }
  }

  _unhighlightElement(nodeId) {
    if (this._$nodes.has(nodeId)) {
      const $el = this._$nodes.get(nodeId);
      $el.midiLearnHighlight = false;
    }
  }

  _onSelectNode(e) {
    const $target = e.currentTarget;

    this._$nodes.forEach(($el) => {
      if ($el !== $target) {
        $el.midiLearnSelected = false;
      }
    });

    if (!$target.midiLearnSelected) {
      $target.midiLearnSelected = true;
      this._$selectedNode = $target;
    } else {
      $target.midiLearnSelected = false;
      this._$selectedNode = null;
    }
  }

  _processMidiMessage(e) {
    const device = e.currentTarget;
    const deviceId = getDeviceId(device);
    const [_messageType, channel, value] = e.data;

    if (this.active && this._$selectedNode !== null) {
      if (!this._bindings.has(deviceId)) {
        this._bindings.set(deviceId, new Map());
      }

      const deviceBindings = this._bindings.get(deviceId);

      if (!deviceBindings.has(channel)) {
        deviceBindings.set(channel, new Set());
      }

      const channelBindings = deviceBindings.get(channel);
      const nodeId = getNodeId(this._$selectedNode);

      if (!channelBindings.has(nodeId)) {
        // remove previous binding if any
        if (this._$selectedNode.midiLearnInfos) {
          const { device, channel } = this._$selectedNode.midiLearnInfos;
          const deviceId = getDeviceId(device);
          const nodeId = getNodeId(this._$selectedNode);

          this._deleteBinding(deviceId, channel, nodeId);
        }

        channelBindings.add(nodeId);
        // set midiLearnInfos on _$selectedNode
        const bindingInfos = getBindingInfos(device, channel);
        this._$selectedNode.midiLearnInfos = bindingInfos;

        this._persistToLocalStorage();
        this.requestUpdate();
      }
    }

    // always propagate binded values
    const deviceBindings = this._bindings.get(deviceId);

    if (deviceBindings.has(channel)) {
      const channelBindings = deviceBindings.get(channel);

      channelBindings.forEach(nodeId => {
        // bindings might exists from recorded config, but element not in the DOM
        if (this._$nodes.has(nodeId)) {
          const $el = this._$nodes.get(nodeId);
          $el.midiValue = value;
        }
      });
    }
  }

  _deleteBinding(deviceId, channel, nodeId) {
    this._bindings.get(deviceId).get(channel).delete(nodeId);

    if (this._$nodes.has(nodeId)) {
      const $node = this._$nodes.get(nodeId);
      $node.midiLearnInfos = null;
      $node.midiLearnHighlight = null;
    }

    this._persistToLocalStorage();
    this.requestUpdate();
  }

  _deleteDevice(deviceId) {
    const connected = this._devices.has(deviceId);

    // retrieve the list of node associated to this device for cleaning
    const nodeList = [];

    if (this._bindings.has(deviceId)) {
      const deviceBindings = this._bindings.get(deviceId);

      for (let [channel, nodeIds] of deviceBindings.entries()) {
        nodeIds.forEach(id => nodeList.push(id));
      }
    }

    // if device is not connected remove from known devices
    if (!connected) {
      this._knownDevices.delete(deviceId);
    }

    // delete all related bindings
    this._bindings.delete(deviceId);
    // clean infos on nodes
    nodeList.forEach(id => {
      const $node = this._$nodes.get(id);
      $node.midiLearnInfos = null;
    });

    this._persistToLocalStorage();
    this.requestUpdate();
  }

  // create POJO data from this._bindings structure
  _serialize() {
    const knownDevices = Object.fromEntries(this._knownDevices.entries());
    // bindings need more parsing
    const bindings = {};

    for (let [deviceId, channelBindings] of this._bindings.entries()) {
      bindings[deviceId] = {};

      for (let [channel, nodeIds] of channelBindings.entries()) {
        bindings[deviceId][channel] = Array.from(nodeIds);
      }
    }

    return JSON.stringify({ knownDevices, bindings });
  }

  _deserialize(json) {
    let data;

    try {
      data = JSON.parse(json);
    } catch (err) {
      console.warn('Malformed stored data for sc-midi-learn');
    }

    const knownDevices = new Map();
    const bindings = new Map();

    if (data) {
      // populate knownDevices
      for (let deviceId in data.knownDevices) {
        const device = data.knownDevices[deviceId];
        knownDevices.set(deviceId, device);
      }

      // populate bindings
      for (let deviceId in data.bindings) {
        bindings.set(deviceId, new Map());

        const channelBindingsRaw = data.bindings[deviceId];
        const channelBindings = bindings.get(deviceId);

        for (let channel in channelBindingsRaw) {
          const ids = channelBindingsRaw[channel];
          channelBindings.set(parseInt(channel), new Set(ids));
        }
      }
    }

    return { knownDevices, bindings };
  }

  // create this._bindings structure from POJO data
  _persistToLocalStorage() {
    const json = this._serialize();

    localStorage.setItem('sc-midi-learn-bindings', json);
  }

  _loadFromLocalStorage() {
    const json = localStorage.getItem('sc-midi-learn-bindings');

    const { knownDevices, bindings } = this._deserialize(json);

    this._knownDevices = knownDevices;
    this._bindings = bindings;
  }
}

if (customElements.get('sc-midi-learn') === undefined) {
  customElements.define('sc-midi-learn', ScMidiLearn);
}

export default ScMidiLearn;

