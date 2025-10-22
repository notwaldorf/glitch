import {Froyo} from './froyo.js';

/**
This element has:
  - a placeholder attribute
  
This element exposes these parts:
  - input
  - button
  - wrapper
 */
export class PrettyInput extends Froyo(HTMLElement) {  
    get template() { 
      return `
         <style>
          :host {
            box-sizing: border-box;
            display: inline-block;
            margin: 14px;
          } 
          div {
            width: 100%;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid black;
          }
          input {
            font-size: 16px;
            border: none;
            min-width: 0;
            display: flex;
            flex: 1;
          }
          button {
            font-size: 16px;
            border: none;
            background: transparent;
            border-radius: 50%;
            cursor: pointer;
          }
        </style>
        <div part="wrapper">
          <input id="input" part="input">
          <button id="button" part="button" aria-label="delete text">ｘ</button>
        </div>
      `; 
    };   
  
    static get observedAttributes() {return ['placeholder']; }
  
    connectedCallback() {
      super.connectedCallback();
      this.$.button.addEventListener('click', () => { this.value = ''; });
      this.$.input.addEventListener('input',  () => { this.value = this.$.input.value; });
      this.$.input.addEventListener('change', () => { this.value = this.$.input.value; });
    }

    get placeholder() { return this.$.input.placeholder; }
    set placeholder(value) {
      if (this.$.input.placeholder !== value) {
        this.$.input.placeholder = value;
      }
      this.setAttribute('placeholder', value);
    }
} 

customElements.define('pretty-input', PrettyInput);