// Polyfill the browser-only CustomEvent API when executed in Node.js
if (typeof (globalThis as any).CustomEvent === 'undefined') {
  interface CustomEventInit<T = unknown> extends EventInit {
    detail?: T;
  }
  class CustomEventPolyfill<T = unknown> extends Event {
    public readonly detail: T;
    constructor(type: string, params: CustomEventInit<T> = {}) {
      super(type, params);
      this.detail = params.detail as T;
    }
  }
  (globalThis as any).CustomEvent = CustomEventPolyfill;
}
