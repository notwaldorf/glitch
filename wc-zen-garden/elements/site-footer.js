import {Froyo} from '../lib/froyo.js';

export class SiteFooter extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            display: block;
          }
        </style>
        
        <a part="a" href="http://validator.w3.org/check/referer" title="Check the validity of this site&#8217;s HTML" class="zen-validate-html">HTML</a>
        <a part="a" href="http://jigsaw.w3.org/css-validator/check/referer" title="Check the validity of this site&#8217;s CSS" class="zen-validate-css">CSS</a>
        <a part="a" href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="View the Creative Commons license of this site: Attribution-NonCommercial-ShareAlike." class="zen-license">CC</a>
        <a part="a" href="http://mezzoblue.com/zengarden/faq/#aaa" title="Read about the accessibility of this site" class="zen-accessibility">A11y</a>
        <a part="a" href="https://github.com/mezzoblue/csszengarden.com" title="Fork this site on Github" class="zen-github">GH</a>
      `; 
    };   
  
} 

customElements.define('site-footer', SiteFooter);