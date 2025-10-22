// lol at this whole file.

import {PartThemeMixin} from '../bower_components/part-theme/lib/part-theme.js';

// NOTE: This is just an echoing function for a string template literal.
// It exists only as a hint to editors to allow for HTML syntax highlighting.
export const html = (strings, ...values) => strings[0]+ values.map((v, i) => v + strings[i+1]).join('');

export let Froyo = (superclass) => class extends PartThemeMixin(superclass) {
  constructor() {
    super();

    this._readied = true;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;

    this.$ = {};
    let els = this.shadowRoot.querySelectorAll('*[id]');
    for (let el of els) {
      this.$[el.id] = el;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyPartTheme();
  }

  get template() { return `<div>base</div>`;}

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attr] = newValue;
    }
  }
};
