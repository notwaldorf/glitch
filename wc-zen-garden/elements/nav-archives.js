import {Froyo, html} from '../lib/froyo.js';

export class NavArchives extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3-archives">Archives:</h3>
				<nav role="navigation" part="nav">
					<ul part="ul">
						<li part="li" class="next">
							<a part="a" href="/214/page1">
								Next Designs <span part="indicator">&rsaquo;</span>
							</a>
						</li>
						<li part="li" class="viewall">
							<a part="a" href="http://www.mezzoblue.com/zengarden/alldesigns/" title="View every submission to the Zen Garden.">
								View All Designs							</a>
						</li>
					</ul>
				</nav>
      `;
    };

}

customElements.define('nav-archives', NavArchives);
