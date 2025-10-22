import {Froyo, html} from '../lib/froyo.js';

export class ArticleExplanation extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3">So What is This About?</h3>
        <p part="p">There is a continuing need to show the power of
        <abbr title="Cascading Style Sheets">CSS</abbr>.
        The Zen Garden aims to excite, inspire, and encourage participation.
        To begin, view some of the existing designs in the list. Clicking on
        any one will load the style sheet into this very page.
        The <abbr title="HyperText Markup Language">HTML</abbr>
        remains the same, the only thing that has changed is the external
        <abbr title="Cascading Style Sheets">CSS</abbr> file. Yes, really.</p>
        <p part="p"><abbr title="Cascading Style Sheets">CSS</abbr>
        allows complete and total control over the style of a hypertext document.
        The only way this can be illustrated in a way that gets people excited
        is by demonstrating what it can truly be, once the reins are placed
        in the hands of those able to create beauty from structure.
        Designers and coders alike have contributed to the beauty of the web; 
        we can always push it further.</p>
      `;
    };

}

customElements.define('article-explanation', ArticleExplanation);
