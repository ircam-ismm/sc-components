import {
  requestUserSelectNoneOnBody,
  cancelUserSelectNoneOnBody,
} from '../ScElement.js';

/**
 * private global handler for EnterExitController
 */
class EnterExitControllerGlobalHandler {
  constructor() {
    this.components = new Map(); // <component, options>
    this.id = '__enter-exit-controller__';

    this.rootNode = null;

    this.mouseEventMounted = false;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.touchEventMounted = false;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  addComponent(component, options) {
    options = { active: false, touchId: null, clientX: null, clientY: null, ...options };
    this.components.set(component, options);

    component.addEventListener('mousedown', this.onMouseDown);
    component.addEventListener('touchstart', this.onTouchStart);
  }

  removeComponent(component) {
    this.components.delete(component);

    component.removeEventListener('mousedown', this.onMouseDown);
    component.removeEventListener('touchstart', this.onTouchStart);
  }

  onMouseDown(e) {
    if (this.mouseEventMounted) {
      return;
    }

    // support wrapping element within a web component
    this.rootNode = e.currentTarget.getRootNode();
    this.mouseEventMounted = true;
    requestUserSelectNoneOnBody(this.id);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.onMouseMove(e);
  }

  onMouseUp(e) {
    this.mouseEventMounted = false;
    cancelUserSelectNoneOnBody(this.id);

    for (let [component, options] of this.components.entries()) {
      if (options.active) {
        e.preventDefault();
        options.active = false;
        options.onExit(e.clientX, e.clientY);
      }
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    const el = this.rootNode.elementFromPoint(e.clientX, e.clientY);

    for (let [component, options] of this.components.entries()) {
      const inZone = (el === component);

      if (inZone && !options.active) {
        options.active = true;
        options.onEnter(e.clientX, e.clientY);
      } else if (!inZone && options.active) {
        options.active = false;
        options.onExit(e.clientX, e.clientY);
      }
    }
  }

  onTouchStart(e) {
    e.preventDefault();

    if (!this.touchEventMounted) {
      // support wrapping element within a web component
      this.rootNode = e.currentTarget.getRootNode();
      requestUserSelectNoneOnBody(this.id);
      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('touchcancel', this.onTouchEnd);

      this.touchEventMounted = true;
    }

    this.onTouchMove(e);
  }

  onTouchEnd(e) {
    e.preventDefault();

    // @note - we don't use `e.changedTouches` here because Safari tends to swallow
    // some touch end events, if two of them appear at the same time
    // cf. https://github.com/ircam-ismm/sc-components/issues/60
    for (let [_component, options] of this.components.entries()) {
      let isPressed = false;

      // `e.touches` is a list of information for every finger currently touching the screen.
      for (let touch of e.touches) {
        if (options.active && options.touchId === touch.identifier) {
          isPressed = true;
        }
      }

      if (!isPressed && options.active) {
        const { clientX, clientY } = options;
        options.active = false;
        options.touchId = null;
        options.clientX = null;
        options.clientY = null;

        options.onExit(clientX, clientY);
      }
    }

    // if this is the last touch
    if (e.touches.length === 0) {
      this.touchEventMounted = false;
      cancelUserSelectNoneOnBody(this.id);

      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('touchcancel', this.onTouchEnd);
    }
  }

  onTouchMove(e) {
    for (let touch of e.changedTouches) {
      const el = this.rootNode.elementFromPoint(touch.clientX, touch.clientY);

      for (let [component, options] of this.components.entries()) {
        const inZone = (el === component);

        if (inZone && !options.active) {
          options.active = true;
          options.touchId = touch.identifier;
          // store clientX and clientY so we can use them in touchend workaround
          options.clientX = touch.clientX;
          options.clientY = touch.clientY;

          options.onEnter(touch.clientX, touch.clientY);
        } else if (options.active && options.touchId === touch.identifier && !inZone) {
          options.active = false;
          options.touchId = null;
          options.clientX = null;
          options.clientY = null;
          options.onExit(touch.clientX, touch.clientY);
        }
      }
    }
  }
}

const enterExitControllerGlobalHandler = new EnterExitControllerGlobalHandler();

export default class EnterExitController {
  constructor(host, options) {
    if (!options.onEnter) {
      throw new Error(`keyboard-controller: onEnter option is mandatory`);
    }

    if (!options.onExit) {
      throw new Error(`keyboard-controller: onExit option is mandatory`);
    }

    this.host = host;
    this.options = options;

    host.addController(this);
  }

  hostConnected() {
    enterExitControllerGlobalHandler.addComponent(this.host, this.options);
  }

  hostDisconnected() {
    enterExitControllerGlobalHandler.removeComponent(this.host);
  }
}
