import {Froyo, html} from '../lib/froyo.js';
import {PageWrapper} from '../elements/page-wrapper.js';

/*
This is based on the default CSS Zen Garden theme: http://www.csszengarden.com/examples/style.css
*/
export class ThemeDefault extends Froyo(HTMLElement) {
    get template() {
      return html`
        <style>
          :host {
            display: block;
            font: 75% georgia, sans-serif;
            line-height: 1.88889;
            color: #555753;
            background: #fff url(http://csszengarden.com/001/blossoms.jpg) no-repeat bottom right;
            margin: 0;
            padding: 0;
          }
          :host::theme(p) {
          	margin-top: 0;
          	text-align: justify;
        	}
          :host::theme(h3) {
          	font: italic normal 1.4em georgia, sans-serif;
          	letter-spacing: 1px;
          	margin-bottom: 0;
          	color: #7D775C;
        	}
          :host::theme(a):link {
          	font-weight: bold;
          	text-decoration: none;
          	color: #B7A5DF;
        	}
          :host::theme(a):visited {
          	font-weight: bold;
          	text-decoration: none;
          	color: #D4CDDC;
        	}
          :host::theme(a):hover, :host::theme(a):focus, :host::theme(a):active {
          	text-decoration: underline;
          	color: #9685BA;
        	}
          :host::theme(abbr) {
        	   border-bottom: none;
        	}
          /* specific divs */
          page-wrapper {
          	background: url(http://csszengarden.com/001/zen-bg.jpg) no-repeat top left;
          	padding: 0 175px 0 110px;
          	margin: 0;
          	position: relative;
        	}

          :host::theme(intro) {
          	min-width: 470px;
          	width: 100%;
        	}

          :host::theme(header-h1) {
          	background: transparent url(http://csszengarden.com/001/h1.gif) no-repeat top left;
          	margin-top: 10px;
          	display: block;
          	width: 219px;
          	height: 87px;
          	float: left;

          	text-indent: 100%;
          	white-space: nowrap;
          	overflow: hidden;
        	}
          :host::theme(header-h2) {
          	background: transparent url(http://csszengarden.com/001/h2.gif) no-repeat top left;
          	margin-top: 58px;
          	margin-bottom: 40px;
          	width: 200px;
          	height: 18px;
          	float: right;

          	text-indent: 100%;
          	white-space: nowrap;
          	overflow: hidden;
        	}
          :host::theme(header) {
          	padding-top: 20px;
          	height: 87px;
          }

          :host::theme(summary) {
          	clear: both;
          	margin: 20px 20px 20px 10px;
          	width: 160px;
          	float: left;
        	}
          :host::theme(summary-p) {
          	font: italic 1.1em/2.2 georgia;
          	text-align: center;
        	}

          :host::theme(preamble) {
          	clear: right;
          	padding: 0px 10px 0 10px;
        	}

          :host::theme(supporting) {
          	padding-left: 10px;
          	margin-bottom: 40px;
        	}

          :host::theme(footer) {
          	text-align: center;
        	}
          :host::theme(footer-a):link, :host::theme(footer-a):visited {
          	margin-right: 20px;
        	}

          :host::theme(sidebar) {
          	margin-left: 600px;
          	position: absolute;
          	top: 0;
          	right: 0;
        	}
          :host::theme(sidebar-wrapper) {
          	font: 10px verdana, sans-serif;
          	background: transparent url(http://csszengarden.com/001/paper-bg.jpg) top left repeat-y;
          	padding: 10px;
          	margin-top: 150px;
          	width: 130px;
        	}
          :host::theme(sidebar-h3-select) {
          	background: transparent url(http://csszengarden.com/001/h3.gif) no-repeat top left;
          	margin: 10px 0 5px 0;
          	width: 97px;
          	height: 16px;

          	text-indent: 100%;
          	white-space: nowrap;
          	overflow: hidden;
        	}
          :host::theme(sidebar-h3-archives) {
          	background: transparent url(http://csszengarden.com/001/h5.gif) no-repeat top left;
          	margin: 25px 0 5px 0;
          	width:57px;
          	height: 14px;

          	text-indent: 100%;
          	white-space: nowrap;
          	overflow: hidden;
        	}
          :host::theme(sidebar-h3-resources) {
          	background: transparent url(http://csszengarden.com/001/h6.gif) no-repeat top left;
          	margin: 25px 0 5px 0;
          	width:63px;
          	height: 10px;

          	text-indent: 100%;
          	white-space: nowrap;
          	overflow: hidden;
        	}

          :host::theme(sidebar-ul) {
          	margin: 0;
          	padding: 0;
        	}
          :host::theme(sidebar-li) {
          	line-height: 1.3em;
          	background: transparent url(http://csszengarden.com/001/cr1.gif) no-repeat top center;
          	display: block;
          	padding-top: 5px;
          	margin-bottom: 5px;
          	list-style-type: none;
        	}

          :host::theme(sidebar-a):link {
          	color: #988F5E;
        	}

          :host::theme(sidebar-a):visited {
          	color: #B3AE94;
        	}
          :host::theme(extra1) {
          	background: transparent url(http://csszengarden.com/001/cr2.gif) top left no-repeat;
          	position: absolute;
          	top: 40px;
          	right: 0;
          	width: 148px;
          	height: 110px;
        	}
        </style>

        <page-wrapper></page-wrapper>
      `;
    };

}

customElements.define('theme-default', ThemeDefault);
