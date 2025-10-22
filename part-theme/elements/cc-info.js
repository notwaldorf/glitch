import {Froyo} from './froyo.js';
import {PrettyInput} from './pretty-input.js';
import {DateInput} from './date-input.js';

/**
This element exposes these parts:
  - cc-info-input
  - cc-info-button
  - cc-info-wrapper
  - cc-info-label
 */
export class CCInfo extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            display: block;
            border: 1px solid #ccc;
            margin: 14px;
            padding: 14px;
            box-sizing: border-box;
          } 
          label {
            display: block;
          }
          pretty-input {
            display: block;
            width: 100%;
          }
          .exp-label {
            margin: 14px;
          }
        </style>
        <label part="label">Credit card information</label>
        <pretty-input part="* => cc-info-*" placeholder="CC number"></pretty-input>
        <label part="label" class="exp-label">Expiration date</label>        
        <date-input part="* => cc-info-*"></date-input>
      `; 
    };
} 

customElements.define('cc-info', CCInfo);