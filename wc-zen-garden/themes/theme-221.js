import {Froyo, html} from '../lib/froyo.js';
import {PageWrapper} from '../elements/page-wrapper.js';

/*
This is based on the 221 Zen Garden theme: http://www.csszengarden.com/221/221.css

These are the transformations i made by hand:
delete all media queries (shim isn't dynamic)
fix images (they were relative urls)

html/body -> host
abbr[title] -> :host::theme(abbr)
a -> :host::theme(a)
p -> :host::theme(p)

.page-wrapper -> page-wrapper

.intro -> :host::theme(intro)

.intro header -> :host::theme(header)
.intro header h1 -> :host::theme(header-h1)
.intro header h2 -> :host::theme(header-h2)
.intro .summary -> :host::theme(summary)
.intro .summary .p -> :host::theme(summary-p)
.intro .summary .a -> :host::theme(summary-a)
.intro .preamble -> :host::theme(preamble)
.intro .preamble h3-> :host::theme(preamble-h3)
.intro .preamble p-> :host::theme(preamble-p)

.main -> :host::theme(main)
.main footer -> :host::theme(footer)
.main footer a -> :host::theme(footer-a)

.main .explanation -> :host::theme(explanation)
.main .explanation h3 -> :host::theme(explanation-h3)
.main .explanation p -> :host::theme(explanation-p)
.main .participation -> :host::theme(participation)
.main .participation h3 -> :host::theme(participation-h3)
.main .benefits -> :host::theme(benefits)
.main .benefits h3 -> :host::theme(benefits-h3)
.main .requirements -> :host::theme(requirements)
.main .requirements h3 -> :host::theme(requirements-h3)
.main .requirements p -> :host::theme(requirements-p)
.main .requirements::before -> :host::theme(requirements)::before

.sidebar -> :host::theme(sidebar)
.sidebar .design-selection h3 -> :host::theme(design-h3)
.sidebar .design-selection nav -> :host::theme(design-nav)
.sidebar .design-selection nav ul -> :host::theme(design-ul)
.sidebar .design-selection nav li -> :host::theme(design-li)
.sidebar .design-selection nav a -> :host::theme(design-a)

.sidebar .design-archives -> :host::theme(archives)
.sidebar .design-archives nav -> :host::theme(archives-nav)
.sidebar .design-archives nav ul -> :host::theme(archives-ul)
.sidebar .design-archives nav li -> :host::theme(archives-li)

.sidebar .zen-resources -> :host::theme(resources)
.sidebar .zen-resources nav ul -> :host::theme(resources-ul)
.sidebar .zen-resourcess nav li -> :host::theme(resources-li)

*/
export class Theme221 extends Froyo(HTMLElement) {
    get template() {
      return html`
        <style>
          /*
          ==========================================================================
          Some globals
          ==========================================================================
          */
          :host {
            font-family: "ff-meta-web-pro", sans-serif;
            text-rendering: optimizeLegibility;
            font-size: 100%;
            line-height: 26px;
            background: #f6efe5;
            background-size: 60%;
            color: #0d2c40;
          }
          :host::theme(abbr),
          :host::theme(acronym) {
            border-bottom-width: 0;
          }

          :host::theme(a) {
            color: #0d2c40;
            text-decoration: none;
            border-bottom: 1px solid #0d2c40;
            -webkit-transition: all 0.2s ease-out;
            -moz-transition: all 0.2s ease-out;
            -o-transition: all 0.2s ease-out;
            -ms-transition: all 0.2s ease-out;
            transition: all 0.2s ease-out;
          }
          :host::theme(a):hover {
            color: rgba(0, 0, 0, 0.4);
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          }
          /*
          ==========================================================================
          Page wrapper
          ==========================================================================
          */
          page-wrapper {
            position: relative;
            width: 100%;
            max-width: 120em;
            margin: 0 auto;
            padding: 0;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          /*
          ==========================================================================
          Intro
          ==========================================================================
          */
          :host::theme(intro) {
            overflow: hidden;
          }
          :host::theme(header) {
            position: relative;
            background: #c879b2;
            overflow: hidden;
            width: 40%;
            height: 50em;
            float: left;
            -webkit-transition: all 0.4s ease;
            -moz-transition: all 0.4s ease;
            -o-transition: all 0.4s ease;
            -ms-transition: all 0.4s ease;
            transition: all 0.4s ease;
          }

          :host::theme(header-h1) {
            position: absolute;
            color: #ffffff;
            font-size: 100%;
            line-height: 2em;
            top: 4.2em;
            left: -3em;
            width: auto;
            margin: 0;
            padding: 1em;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          :host::theme(header-h2) {
            position: relative;
            background: #0d2c40 url(http://www.csszengarden.com/221/icon-star.svg) no-repeat left bottom;
            background-size: 101%;
            float: right;
            color: #ffffff;
            font-size: 250%;
            line-height: 1.25em;
            width: 50%;
            height: 20.019em;
            margin: 0 0 0 0;
            padding: 6em 0.5em 0 0.5em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(summary) {
            font-size: 100%;
            color: #ffffff;
            width: 60%;
            float: left;
            background: #c879b2 url(http://www.csszengarden.com/221/icons-3-pack.svg);
            background-repeat: no-repeat;
            background-position: center bottom;
            background-size: 101%;
            height: 50em;
            margin: 0;
            padding: 16.3em 2em 10em 2em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(summary-p) {
            padding: 0 40% 2em 0 ;
            margin: 0;
          }

          :host::theme(summary-a) {
            color: #ffffff;
            text-decoration: none;
            border-bottom: 1px solid #ffffff;
          }
          :host::theme(summary-a):hover {
            color: rgba(0, 0, 0, 0.4);
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          }
          :host::theme(preamble) {
            position: relative;
            float: left;
            width: 60.1%;
            margin: 0 0 0 20%;
            padding: 8em 0.5em 32em 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(preamble-h3) {
            font-size: 150%;
            margin-right: 35%;
          }

          :host::theme(preamble-p) {
            margin-right: 35%;
          }

          :host::theme(preamble-p):last-child {
            position: absolute;
            z-index: 2;
            color: #ffffff;
            background: rgba(0, 188, 217, 0.8);
            width: 33.650%;
            top: -1em;
            right: 0;
            margin-right: 0;
            padding: 10em 1em 20em 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          /*
          ==========================================================================
          Main
          ==========================================================================
          */
          :host::theme(supporting) {
            background: url(http://www.csszengarden.com/221/mid-century-1.jpg) no-repeat center center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            z-index: 1;
            top: -25em;
            margin-bottom: 1em;
            padding: 20em 0;
            position: relative;
          }

          :host::theme(footer) {
            display: block;
            position: absolute;
            left: 1em;
            bottom: 1em;
            width: 20%;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(footer-a) {
            margin: 0 0.25em;
            display: block;
            border-bottom: 0px solid transparent;
          }
          :host::theme(explanation) {
            background: #0d2c40 url(http://www.csszengarden.com/221/icon-half.svg);
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 40%;
            position: relative;
            color: #ffffff;
            width: 40%;
            margin: 0;
            padding: 2em 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(explanation-h3) {
            position: absolute;
            color: #ffffff;
            font-size: 150%;
            line-height: 2em;
            top: 6em;
            left: -4.5em;
            margin: 0;
            padding: 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
          }

          :host::theme(explanation-p) {
            width: 60%;
            padding-left: 15%;
          }

          :host::theme(participation) {
            background: #f6efe5;
            position: absolute;
            right: 40%;
            z-index: 2;
            margin-top: 14em;
            width: 40%;
            padding: 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(participation-h3) {
            font-size: 150%;
          }
          :host::theme(benefits) {
            background: rgba(0, 188, 217, 0.8) url(http://www.csszengarden.com/221/icon-circles.svg) no-repeat left top;
            background-size: 100%;
            position: absolute;
            right: 20%;
            z-index: 2;
            margin-top: 3em;
            margin-left: 0;
            width: 20%;
            padding: 22em 1em 25em 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(benefits-3) {
            font-size: 150%;
          }
          :host::theme(requirements) {
            position: absolute;
            -moz-column-count: 2;
            -moz-column-gap: 2em;
            -webkit-column-count: 2;
            -webkit-column-gap: 2em;
            right: 0;
            z-index: 2;
            margin: 60em 0 0 0;
            width: 60%;
            padding: 1em 0 0 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(requirements-h3) {
            position: absolute;
            z-index: 3;
            font-size: 300%;
            line-height: 2em;
            top: 0em;
            left: -6em;
            margin: 0;
            padding: 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
          }
          :host::theme(requirements-p) {
            margin: 0 1em 1em 1em;
          }
          :host::theme(requirements-p)::before {
            content: "";
            position: absolute;
            top: 0;
            left: -60%;
            background: url(http://www.csszengarden.com/221/mid-century-2.jpg) no-repeat left center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            z-index: 2;
            width: 60%;
            height: 40em;
            margin-top: 0;
            padding: 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          /*
          ==========================================================================
          Sidebar
          ==========================================================================
          */
         :host::theme(sidebar) {
            margin-top: 55em;
            padding-top: 20em;
            background: #c879b2;
            overflow: hidden;
          }

          :host::theme(design-h3) {
            color: #ffffff;
            font-size: 150%;
            line-height: 1em;
            width: 20%;
            float: left;
            padding: 5em 1em;
            text-align: left;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(design-nav) {
            width: 80%;
            margin-left: 20%;
            padding: 1em 0 2em 0;
          }

          :host::theme(design-ul) {
            padding: 0;
          }
          :host::theme(design-li) {
            display: inline-block;
            list-style: none;
            color: #ffffff;
            width: 25%;
            float: left;
            padding: 10em 1em 2em 1em;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
          }

          :host::theme(design-a) {
            color: #ffffff;
            text-decoration: none;
            display: block;
            border-bottom: 0 solid transparent;
          }

          :host::theme(design-a):hover {
            color: rgba(0, 0, 0, 0.4);
            border-bottom: 0 solid transparent;
          }
          :host::theme(design-li):nth-child(1) {
            background: #0d2c40;
            margin-top: -29em;
            padding: 39em 1em 2em 1em;
          }

          :host::theme(design-li):nth-child(2) {
            background: #f15a30;
          }
          :host::theme(design-li):nth-child(3) {
            background: #31c5da;
          }
          :host::theme(design-li):nth-child(4) {
            background: #f15a30;
          }
          :host::theme(design-li):nth-child(5) {
            background: #0d2c40;
          }
          :host::theme(design-li):nth-child(6) {
            background: #f15a30;
          }
          :host::theme(design-li):nth-child(7) {
            background: #31c5da;
          }
          :host::theme(design-li):nth-child(8) {
            background: #f15a30;
          }
          :host::theme(design-li):nth-child(1)::before {
            content: "1";
            font-size: 700%;
          }
          :host::theme(design-li):nth-child(2)::before {
            content: "2";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(3)::before {
            content: "3";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(4)::before {
            content: "4";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(5)::before {
            content: "5";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(6)::before {
            content: "6";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(7)::before {
            content: "7";
            font-size: 700%;
          }

          :host::theme(design-li):nth-child(8)::before {
            content: "8";
            font-size: 700%;
          }

          :host::theme(archives) {
            background: #31c5da;
            position: relative;
            width: 20%;
            margin: 0 20% 0 60%;
            padding: 10em 1em 3em 1em;
            float: right;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(archives-h3) {
            position: absolute;
            color: #ffffff;
            z-index: 3;
            font-size: 150%;
            line-height: 2em;
            top: 8.5em;
            left: -4em;
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
          }

          :host::theme(archives-nav) {
            overflow: hidden;
            width: 100%;
          }
          :host::theme(archives-ul) {
            padding: 0;
            overflow: hidden;
          }
          :host::theme(archives-li) {
            display: inline-block;
            list-style: none;
            width: 100%;
            float: left;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
          }
          :host::theme(resources) {
            background: #31c5da url(http://www.csszengarden.com/221/icon-circles.svg) no-repeat left bottom;
            background-size: 100%;
            position: relative;
            z-index: 2;
            width: 20%;
            margin: 0 20% 0 60%;
            padding: 8em 1em 22em 1em;
            float: right;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }

          :host::theme(resources-h3) {
            position: absolute;
            color: #ffffff;
            z-index: 3;
            font-size: 150%;
            line-height: 2em;
            top: 8em;
            left: -4.5em;
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
          }

          :host::theme(resources-ul) {
            padding: 0;
            overflow: hidden;
          }
          :host::theme(resources-li) {
            display: inline-block;
            list-style: none;
            width: 100%;
            float: left;
            padding: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
          }
        </style>

        <page-wrapper></page-wrapper>
      `;
    };

}

customElements.define('theme-221', Theme221);
