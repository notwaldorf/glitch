import {Froyo} from './froyo.js';
import {PrettyInput} from './pretty-input.js';
import {ToggleButton} from './toggle-button.js';

/**
This element exposes these parts:
  - basic-info-input
  - basic-info-button
  - basic-info-wrapper
  - basic-info-label
This element technically uses these custom properties
  --text-color
  --underline-color
 */
export class BasicInfo extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            display: block;
            border: 1px solid #ccc;
            padding: 14px;
            margin: 14px;
          } 
          label {
            display: block;
          }
        </style>
        <label part="label">Basic info</label>
        <pretty-input part="* => basic-info-*" placeholder="First name"></pretty-input>
        <pretty-input part="* => basic-info-*" placeholder="Last name"></pretty-input>
        
        <p>This switch exposes no parts, but uses custom properties. Use <b>left</b> or <b>right</b> arrows to switch with the keyboard.</p>
          
        <toggle-button></toggle-button>
        `; 
    };
} 

customElements.define('basic-info', BasicInfo);