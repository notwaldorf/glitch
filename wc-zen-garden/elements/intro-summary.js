import {Froyo, html} from '../lib/froyo.js';

export class IntroSummary extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <p part="p">A demonstration of what can be accomplished through
        <abbr part="abbr"title="Cascading Style Sheets">CSS</abbr>-based design.
        Select any style sheet from the list to load it into this page.</p>
        <p part="p">Download the example <a part="a" href="/examples/index"
        title="This page's source HTML code, not to be modified.">html file</a>
        and <a part="a" href="/examples/style.css" title="This page's sample CSS, the
        file you may modify.">css file</a></p>
  `;
    };

}

customElements.define('intro-summary', IntroSummary);
