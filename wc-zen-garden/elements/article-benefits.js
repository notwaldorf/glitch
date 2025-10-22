import {Froyo, html} from '../lib/froyo.js';

export class ArticleBenefits extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3">Benefits</h3>
			  <p part="p">Why participate? For recognition, inspiration,
        and a resource we can all refer to showing people how amazing
        <abbr title="Cascading Style Sheets">CSS</abbr> really can be.
        This site serves as equal parts inspiration for those working on the web today,
        learning tool for those who will be tomorrow, and gallery of future
        techniques we can all look forward to.</p>
        `;
    };

}

customElements.define('article-benefits', ArticleBenefits);
