import {Froyo} from './froyo.js';

/**
This element uses these custom properties
  --text-color
  --underline-color
 */
export class ToggleButton extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            display: inline-block;
            margin: 14px;
            position: relative;
          }
          label {
            border: 1px solid var(--text-color);
            display: inline-block;
            padding: 4px 0px;
            position: relative;
            text-align: center;
            -webkit-transition: background 600ms ease, color 600ms ease;
              transition: background 600ms ease, color 600ms ease;
            z-index: 1;
            background: white;
          }
          input[type="radio"] {
            position: absolute;
            top: 0;
            left: 0;
            height: 1px;
            width: 1px;
          }
          input[type="radio"] + label {
            cursor: pointer;
            min-width: 60px;
          }
          input[type="radio"] + label:hover {
            background: var(--placeholder-color);
            color: var(--text-color);
          }
          input[type="radio"] + label:after {
            background: var(--text-color);
            content: "";
            height: 100%;
            position: absolute;
            top: 0;
            -webkit-transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
            transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
            width: 100%;
            z-index: -1;
          }
          input[type="radio"].toggle-left + label {
            border-right: 0;
          }
          input[type="radio"].toggle-left + label:after {
            left: 100%;
          }
          input[type="radio"].toggle-right + label {
            margin-left: -5px;
          }
          input[type="radio"].toggle-right + label:after {
            left: -100%;
          }
          input[type="radio"]:checked + label {
            cursor: default;
            color: #fff;
            -webkit-transition: color 200ms;
            transition: color 200ms;
            z-index: 2;
          }
          input[type="radio"]:checked + label:after {
            left: 0;
          }
          input[type="radio"]:focus + label:after {
            background: var(--placeholder-color);
            color: var(--text-color);
          }
        </style>
        
        <input id="toggle-on" class="toggle-left" name="toggle" value="false" type="radio" checked tabindex=0>
        <label for="toggle-on" class="btn">Yes</label>
        <input id="toggle-off" class="toggle-right" name="toggle" value="true" type="radio">
        <label for="toggle-off" class="btn">No</label>
      `; 
    };   
  
} 

customElements.define('toggle-button', ToggleButton);