import {Froyo, html} from '../lib/froyo.js';

import {SiteFooter} from './site-footer.js';
import {IntroHeader} from './intro-header.js';
import {IntroSummary} from './intro-summary.js';
import {IntroPreamble} from './intro-preamble.js';
import {ArticleParticipation} from './article-participation.js';
import {ArticleExplanation} from './article-explanation.js';
import {ArticleBenefits} from './article-benefits.js';
import {ArticleRequirements} from './article-requirements.js';
import {NavDesign} from './nav-design.js';
import {NavArchives} from './nav-archives.js';
import {NavResources} from './nav-resources.js';

/*
This is based on the default CSS Zen Garden HTML: http://www.csszengarden.com/examples/index
*/

export class PageWrapper extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>

        <div part="intro">
          <intro-header part="header, * => header-*" role="banner"></intro-header>
          <intro-summary part="summary, * => summary-*" role="article"></intro-summary>
          <intro-preamble part="preamble, * => preamble-*" role="article"></intro-preamble>
        </div>

        <div part="main,supporting">
          <article-explanation part="explanation * => explanation-*"></article-explanation>
          <article-participation part="participation * => participation-*"></article-participation>
          <article-benefits part="benefits * => benefits-*"></article-benefits>
          <article-requirements part="requirements * => requirements-*"></article-requirements>

          <site-footer part="footer, * => footer-*"></site-footer>
        </div>

        <div part="sidebar">
          <div part="sidebar-wrapper">
            <nav-design part="* => design-*, * => sidebar-*"></nav-design>
            <nav-archives part="* => archives-*, * => sidebar-*"></nav-archives>
            <nav-resources part="* => resources-*, * => sidebar-*"></nav-resources>
          </div>
        </div>

        <div part="extra1" role="presentation"></div><div part="extra2" role="presentation"></div><div part="extra3" role="presentation"></div>
        <div part="extra4" role="presentation"></div><div part="extra5" role="presentation"></div><div part="extra6" role="presentation"></div>
      `;
    };

}

customElements.define('page-wrapper', PageWrapper);
