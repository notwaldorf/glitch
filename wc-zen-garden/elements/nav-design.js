import {Froyo, html} from '../lib/froyo.js';

export class NavDesign extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3-select">Select a Design:</h3>
				<nav role="navigation" part="nav">
					<ul part="ul">
          <li part="li">
            <a part="a" href="/221/" class="design-name">Mid Century Modern</a> by						<a part="a" href="http://andrewlohman.com/" class="designer-name">Andrew Lohman</a>
            </li>					<li part="li">
            <a part="a" href="/220/" class="design-name">Garments</a> by						<a part="a" href="http://danielmall.com/" class="designer-name">Dan Mall</a>
            </li>					<li part="li">
            <a part="a" href="/219/" class="design-name">Steel</a> by						<a part="a" href="http://steffen-knoeller.de" class="designer-name">Steffen Knoeller</a>
            </li>					<li part="li">
            <a part="a" href="/218/" class="design-name">Apothecary</a> by						<a part="a" href="http://trentwalton.com" class="designer-name">Trent Walton</a>
            </li>					<li part="li">
            <a part="a" href="/217/" class="design-name">Screen Filler</a> by						<a part="a" href="http://elliotjaystocks.com/" class="designer-name">Elliot Jay Stocks</a>
            </li>					<li part="li">
            <a part="a" href="/216/" class="design-name">Fountain Kiss</a> by						<a part="a" href="http://jeremycarlson.com" class="designer-name">Jeremy Carlson</a>
            </li>					<li part="li">
            <a part="a" href="/215/" class="design-name">A Robot Named Jimmy</a> by						<a part="a" href="http://meltmedia.com/" class="designer-name">meltmedia</a>
            </li>					<li part="li">
            <a part="a" href="/214/" class="design-name">Verde Moderna</a> by						<a part="a" href="http://www.mezzoblue.com/" class="designer-name">Dave Shea</a>
            </li>					</ul>
				</nav>

      `;
    };

}

customElements.define('nav-design', NavDesign);
