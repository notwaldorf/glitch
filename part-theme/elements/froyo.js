// lol at this whole file. Anyway, web components boilerplate is real.

// This uses the shim at https://github.com/PolymerLabs/part-theme
import {PartThemeMixin} from 'https://cdn.rawgit.com/PolymerLabs/part-theme/f0e9d872/lib/part-theme.js';

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