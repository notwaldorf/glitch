import {Froyo} from './froyo.js';
import {PrettyInput} from './pretty-input.js';

/**
This element exposes these parts:
  - date-input
  - date-button
  - date-wrapper
 */

export class DateInput extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            display: block;
            margin: 14px;
          } 
          /* This doesn't work */
          pretty-input::xpart(button) {
            display: none;
          }
          pretty-input {
            width: 80px;
            margin: 0;
          }
        </style>
        <pretty-input part="* => date-*" placeholder="dd" aria-label="day"></pretty-input>
        <pretty-input part="* => date-*" placeholder="mm" aria-label="month"></pretty-input>
        <pretty-input part="* => date-*" placeholder="yy" aria-label="year"></pretty-input>
      `; 
    };
} 

customElements.define('date-input', DateInput);