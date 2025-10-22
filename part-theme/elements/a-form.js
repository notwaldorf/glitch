import {Froyo} from './froyo.js';
import {PrettyInput} from './pretty-input.js';
import {BasicInfo} from './basic-info.js';
import {CCInfo} from './cc-info.js';

export class AForm extends Froyo(HTMLElement) {  
    get template() { 
      return `
        <style>
          :host {
            display: block;
          } 
          
          basic-info, cc-info {
            border: 1px solid var(--text-color);
          }
          :host::theme(input)::placeholder {
            color: var(--placeholder-color);
          }
          :host::theme(wrapper) {
            border-bottom: 1px solid var(--underline-color);
          }
          :host::theme(input) {
            color: var(--text-color);
          }
          :host::theme(label) {
            color: var(--text-color);
            font-weight: bold;
          }
          :host::theme(button):hover,  
          :host::theme(button):focus {
            color: white;
            background: var(--text-color);
          }
        </style>
        <basic-info class="basic"></basic-info>
        <cc-info class="cc" ></cc-info>
      `; 
    };   
} 

customElements.define('a-form', AForm);