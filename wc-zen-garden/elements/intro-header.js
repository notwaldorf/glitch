import {Froyo, html} from '../lib/froyo.js';

export class IntroHeader extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h1 part="h1">CSS Zen Garden</h1>
        <h2 part="h2">The Beauty of <abbr part="abbr" title="Cascading Style Sheets">CSS</abbr> Design</h2>
      `;
    };

}

customElements.define('intro-header', IntroHeader);
