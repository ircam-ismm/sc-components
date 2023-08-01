import { html, css, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import ScElement from './ScElement.js';


const midiLearnSymbol = Symbol.for('sc-midi-learn');

function deviceToLightweight(device) {
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
    deviceString: deviceToString(device),
    channel,
  };
}

// this is subject to change, just isolate the dirt
function getNodeId(node) {
  return node.id || node._scId;
}

// this._devices
// this._knownDevices Map<id, <id, name, manufacturer>>
// this._bindings =Map<deviceId, Map<channel, Set<el.id>>
// this._liveElements = Map<elId, ScElement>

// @todo
// - export config
// - use mutation observer (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
//   to maintain a live list of <id, nodes>
// - change the bindings data to store only the ids and get the Element from the live list
// - store the devices that have been seen so far in knownDevices
// - delete device behavior,
//   - [if device connected] keep in list [else] remove from known devices
//   - delete related bindings are deleted
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
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      width: 50px;
      height: 30px;
    }

    sc-button {
      width: 100%;
      height: 100%;
    }

    .control-panel {
      position: fixed;
      /* use variables */
      top: 0;
      right: 0;
      width: 200px;
      height: 600px;
      background-color: green;
    }
  `;

  constructor() {
    super();

    // list of connected devices
    this._devices = new Map();
    // list of lightweigth devices that have been seen
    this._knownDevices = new Map();
    // list of elements that are midi learnable
    // the list is live
    this._$nodes = new Map();
     // currently selected element for learning
    this._$selectedNode = null;
     // Map<deviceId, Map<channel, Set<ScElement>>
    this._bindings = new Map();
    // observer that observe the DOM to maintain the live _$elements list
    this._mutationObserver = null;

    this.active = false;

    this._processMidiMessage = this._processMidiMessage.bind(this);
    this._onSelectElement = this._onSelectElement.bind(this);
    this._updateNodeList = this._updateNodeList.bind(this);

    // retrieve infos from local storage
    this._loadFromLocalStorage();
  }

  render() {
    return html`
      <sc-button
        ?selected="${this.active}"
        @input=${this._toggleActive}
      >MIDI</sc-button>

      ${this.active ?
        html`
          <div class="control-panel">
            <sc-icon
              icon="delete"
              @input=${this._toggleActive}
            >close</sc-icon>

            <div class="select-interface">
              <sc-text>connected interfaces</sc-text>
              <ul>
                ${repeat(this._knownDevices, ([id, device]) => id, ([id, device]) => {
                  let connected = this._devices.has(device.id);

                  return html`<li>${deviceToString(device)}</li>`;
                })}
              </ul>
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


    setTimeout(() => this._serialize(), 2000);
  }

  disconnectedCallback() {
    this._mutationObserver.disconnect();
  }

  _updateNodeList() {
    const learnableTags = Array.from(globalThis[midiLearnSymbol]);
    const $learnable = document.querySelectorAll(learnableTags.join(','));

    this._$nodes.clear();

    $learnable.forEach($el => {
      const id = $el.id || $el._scId;
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

      this._devices.set(id, device);
      this._knownDevices.set(id, deviceToLightweight(device));
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
        $el.addEventListener('click', this._onSelectElement);
      });
    } else {
      this._$nodes.forEach($el => {
        $el.midiLearnActive = false;
        $el.removeEventListener('click', this._onSelectElement);
      });
    }
  }

  _onSelectElement(e) {
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
    const deviceId = device.id;
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
        const $el = this._$nodes.get(nodeId);
        $el.midiValue = value;
      });
    }
  }

  _deleteBinding() {
    // @todo
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

