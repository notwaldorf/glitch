import {colors, panelStyles} from './box-styles.js';

let templ = document.createElement('template');
templ.innerHTML = `
<style>
${colors}
${panelStyles}

*, *:after, *:before {
  box-sizing: border-box;
}
:host {
  display: inline-block;
  position: relative;
  min-width: 12em;
  min-height: 12em;
  xmargin: 40px;
  border: 8px solid black;
  color: inherit;
  z-index:20;
}
:host([expand]) {
  position: absolute !important;
  left: 3vw !important;
  top: 3vh !important;
  right: 5vw !important;
  bottom: 7vh !important;
  z-index: 100;

  /*width: 90vw !important;
  height: 88vh !important;*/
  margin: 0;

  animation: push 0.5s ease-out 1;
}
:host([expand-done]) {
  position: absolute !important;
}
.content {
  overflow: hidden;
  position: absolute;
  /* haxx. there seems to be an empty pixel randomly otherwise */
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
:host([split]) .content {
  flex-direction: row;
  align-items: center;
}

:host(:not([fit])) .content {
  padding: 1em;
}
:host([expand]:not([fit])) .content {
  padding: 4vw;
}

::slotted(img) {
  max-width: 40%;
}
::slotted(video) {
  max-width: 100%;
}
:host([split]) ::slotted(img) {
  max-height: 80%;
}

::slotted(.pretitle), ::slotted(.title), ::slotted(.subtitle) {
  /* Prevent selection */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
:host([expand]) ::slotted(.pretitle) {
  font-size: calc(16px + 4vw);
  font-size: calc(16px + 2vw);
  font-weight: 600;
}
:host([expand]) ::slotted(.title)  {
  xfont-size: calc(16px + 2vw);
  xfont-weight: bold;
  font-size: calc(16px + 10vw);
  font-size: calc(16px + 6vw);
  font-weight: 600;
}
:host([expand]) ::slotted(.title.xoxo)  {
  font-size: calc(16px + 10vw);
  font-weight: normal;
}
:host([expand]) ::slotted(.subtitle)  {
  font-size: calc(16px + 6vw);
  font-size: calc(16px + 4vw);
  font-weight: 600;
  line-height: 1.5;
}
:host([expand]) ::slotted(.subtitle.xoxo)  {
  font-size: calc(16px + 6vw);
  font-weight: normal;
}

:host([expand]) ::slotted(.glitch-frame)  {
  height: 100% !important;
  width: 100% !important;
}

@keyframes push {
  0% {
    position: relative;
    transform: scale(0.08);
  }
  20% {
    position: absolute;
    transform: scale(0.08);
  }
  50% {
    transform: scale(0.04);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes push {
  0% {
    position: relative;
    transform: scale(0.08);
  }
  20% {
    position: absolute;
    transform: scale(0.08);
  }
  50% {
    transform: scale(0.04);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<div class="content">
  <slot></slot>
</div>

<div class="panel-r"></div>
<div class="panel-b-r"></div>
`

window.customElements.define('a-box', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(templ.content.cloneNode(true));
    this.content = this.shadowRoot.querySelector('.content');
    this.panelRight = this.shadowRoot.querySelector('.panel-r');
    this.panelBottom = this.shadowRoot.querySelector('.panel-b-r');
    this.ready = true;

    this.addEventListener('click', () => {
      this.setAttribute('expand', true);
      // Eesize any iframes.
      const f = this.querySelector('iframe');
      if (f) {
        f.height = this.getBoundingClientRect().height + 'px';
        f.width = this.getBoundingClientRect().width + 'px';
      }
      this.dispatchEvent(new CustomEvent(
          'new-slide', {bubbles: true, detail: {which: this.dataset.id}}));
    });
    // this.addEventListener('animationend', (event) => {
    //   if (event.animationName === 'push') {
    //     this.setAttribute('expand-done', true);
    //   }
    // });
  }

  static get observedAttributes() {
    return ['bg', 'right', 'bottom'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue || !this.ready) {
      return;
    }
    switch (attr) {
      case 'bg':
        this.content.classList.add(newValue);
        break;
      case 'right':
        this.panelRight.classList.add(newValue);
        break;
      case 'bottom':
        this.panelBottom.classList.add(newValue);
        break;
    }
  }
});
