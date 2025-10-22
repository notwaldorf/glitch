import {Froyo, html} from '../lib/froyo.js';

export class IntroPreamble extends Froyo(HTMLElement) {
    get template() {
      return html`
         <style>
          :host {
            display: block;
          }
        </style>
        <h3 part="h3">The Road to Enlightenment</h3>
        <p part="p">Littering a dark and dreary road lay
        the past relics of browser-specific tags, incompatible
        <abbr part="abbr"title="Document Object Model">DOM</abbr>s, broken
        <abbr part="abbr"title="Cascading Style Sheets">CSS</abbr> support, and abandoned browsers.</p>
        <p part="p">We must clear the mind of the past. Web enlightenment has been
        achieved thanks to the tireless efforts of folk like the
        <abbr part="abbr"title="World Wide Web Consortium">W3C</abbr>,
        <abbr part="abbr"title="Web Standards Project">WaSP</abbr>, and the major browser creators.</p>
        <p part="p">The CSS Zen Garden invites you to relax and meditate on the important
        lessons of the masters. Begin to see with clarity. Learn to use the time-honored
        techniques in new and invigorating fashion. Become one with the web.</p>  `;
    };

}

customElements.define('intro-preamble', IntroPreamble);
