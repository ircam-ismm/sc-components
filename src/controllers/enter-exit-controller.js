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
    options = { active: false, touchId: null, ...options };
    this.components.set(component, options);

    component.addEventListener('mousedown', this.onMouseDown);
    component.addEventListener('touchstart', this.onTouchStart);
  }

  removeComponent(component, options) {
    this.components.delete(component, options);

    component.removeEventListener('mousedown', this.onMouseDown);
    component.removeEventListener('touchstart', this.onTouchStart);
  }

  onMouseDown(e) {
    if (this.mouseEventMounted) {
      return;
    }

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
        options.onExit();
      }
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    const els = document.elementsFromPoint(e.x, e.y);

    for (let [component, options] of this.components.entries()) {
      const inZone = els.includes(component);

      if (inZone && !options.active) {
        options.active = true;
        options.onEnter();
      } else if (!inZone && options.active) {
        options.active = false;
        options.onExit();
      }
    }
  }

  onTouchStart(e) {
    if (this.touchEventMounted) {
      return;
    }

    e.preventDefault();
    this.touchEventMounted = true;
    requestUserSelectNoneOnBody(this.id);

    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);
    window.addEventListener('touchcancel', this._touchEnd);

    this.onTouchMove(e);
  }

  onTouchEnd(e) {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      for (let [_component, options] of this.components.entries()) {
        if (options.active && options.touchId === touch.identifier) {
          options.active = false;
          options.touchId = null;
          options.onExit();
        }
      }
    }

    // if this is the last touch
    if (e.touches.length === 0) {
      this.touchEventMounted = false;
      cancelUserSelectNoneOnBody(this.id);

      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('touchcancel', this._touchEnd);
    }
  }

  onTouchMove(e) {
    for (let touch of e.changedTouches) {
      const els = document.elementsFromPoint(touch.clientX, touch.clientY);

      for (let [component, options] of this.components.entries()) {
        const inZone = els.includes(component);

        if (inZone && !options.active) {
          options.active = true;
          options.touchId = touch.identifier;
          options.onEnter();
        } else if (options.active && options.touchId === touch.identifier && !inZone) {
          options.active = false;
          options.touchId = null;
          options.onExit();
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
    enterExitControllerGlobalHandler.removeComponent(this.host, this.options);
  }
}
