import {Froyo, html} from '../lib/froyo.js';

export class NavResources extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3-resources">Resources:</h3>
				<ul part="ul">
					<li part="li" class="view-css">
						<a part="a" href="/214/214.css" title="View the source CSS file of the currently-viewed design.">
							View This Design&#8217;s <abbr title="Cascading Style Sheets">CSS</abbr>						</a>
					</li>
					<li part="li" class="css-resources">
						<a part="a" href="http://www.mezzoblue.com/zengarden/resources/" title="Links to great sites with information on using CSS.">
							<abbr title="Cascading Style Sheets">CSS</abbr> Resources						</a>
					</li>
					<li part="li" class="zen-faq">
						<a part="a" href="http://www.mezzoblue.com/zengarden/faq/" title="A list of Frequently Asked Questions about the Zen Garden.">
							<abbr title="Frequently Asked Questions">FAQ</abbr>						</a>
					</li>
					<li part="li" class="zen-submit">
						<a part="a" href="http://www.mezzoblue.com/zengarden/submit/" title="Send in your own CSS file.">
							Submit a Design						</a>
					</li>
					<li part="li" class="zen-translations">
						<a part="a" href="http://www.mezzoblue.com/zengarden/translations/" title="View translated versions of this page.">
							Translations						</a>
					</li>
				</ul>
      `;
    };

}

customElements.define('nav-resources', NavResources);
