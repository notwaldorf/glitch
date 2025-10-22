import {Froyo} from './froyo.js';
import {PrettyInput} from './pretty-input.js';
import {BasicInfo} from './basic-info.js';
import {CCInfo} from './cc-info.js';

export class AnotherForm extends Froyo(HTMLElement) {  
    get template() { 
      return `
        <style>
          :host {
            display: block;
          } 
          
          basic-info {
            box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px, rgba(0, 0, 0, 0.4) 0px 3px 3px -2px;
            border: none;
          }
          basic-info::part(basic-info-wrapper) {
            box-sizing: border-box;
            padding: 10px 14px;
            border: 2px solid #F1F1F1;
            border-radius: 24px;
          }
          basic-info::part(basic-info-input) {
            background: transparent;
            font-size: 12px;
          }
          basic-info::part(basic-info-input)::placeholder {
            color: #c3c3c3;  
            font-weight: 100;
          }
          basic-info::part(basic-info-button) {
            display: none;
          }
          basic-info::part(label) {
            font-size: 30px;
            font-weight: 100;
            padding: 10px 14px;
          }

          cc-info {
            box-sizing: border-box;
            background: #7FD5B4;
            border-radius: 5px;
            color: white;
          }
          cc-info::part(label) {
            font-weight: 100;
            margin: 14px;
          }
          cc-info::part(cc-info-wrapper) {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            border: none;
            background: white;
            padding: 4px 10px;
            border-radius: 4px;
          }
          cc-info::part(cc-info-input) {
            background: transparent;
            font-size: 14px;
          }
          cc-info::part(cc-info-date-button) {
            display: none;
          }
          cc-info::part(cc-info-date-wrapper) {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            border: none;
            background: white;
            padding: 4px 10px;
            border-radius: 4px;
          }
        </style>
        <basic-info class="basic"></basic-info>
        <cc-info class="cc" ></cc-info>
      `; 
    };   
} 

customElements.define('another-form', AnotherForm);