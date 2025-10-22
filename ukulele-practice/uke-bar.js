
 const template = document.createElement('template');
const html = `
  <div></div>
  <div fret="1" string="1" data-note='G#'></div>
  <div fret="1" string="2" data-note='C#'></div>
  <div fret="1" string="3" data-note='F'></div>
  <div fret="1" string="4" data-note='A#'></div>

  <div></div>
  <div fret="2" string="1" data-note='A'></div>
  <div fret="2" string="2" data-note='D'></div>
  <div fret="2" string="3" data-note='F#'></div>
  <div fret="2" string="4" data-note='B'></div>

  <div></div>
  <div fret="3" string="1" data-note='A#'></div>
  <div fret="3" string="2" data-note='D#'></div>
  <div fret="3" string="3" data-note='G'></div>
  <div fret="3" string="4" data-note='C'></div>

  <div></div>
  <div fret="4" string="1" data-note='B'></div>
  <div fret="4" string="2" data-note='E'></div>
  <div fret="4" string="3" data-note='G#'></div>
  <div fret="4" string="4" data-note='C#'></div>
`;
const styles = `
<style>
:host {
  --cell-width: 30px;
  --string-width: 4px;
  --cell-height: calc(1.4 * var(--cell-width));
  --cell-on-width: 20px;
  --cell-on-color: var(--fg);
  display: grid;
  grid-template-columns: 0 repeat(3, var(--cell-width)) 0;
  grid-template-rows: repeat(4, var(--cell-height));
  background: white;

  width: calc(3 * var(--cell-width) + var(--string-width));
  
  grid-gap: 0;
  border-top: 12px solid currentColor;
  border-radius: 5px;
  margin: var(--spacing) 0;
}

div[fret][string] {
  border-left: var(--string-width) solid currentColor;
  border-bottom: 1px solid currentColor;
  position: relative;
}
div[fret][string="4"] {
  border-bottom: none;
} 
div.on:after {
  display: block;
  content: '';
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 2;
  color: white;
  background: var(--cell-on-color);
  width: var(--cell-on-width);
  height: var(--cell-on-width);
  border-radius: 50%;
  position: absolute;
  left: calc(0px - calc(var(--cell-on-width) / 2) - 2px);
  top: calc(calc(var(--cell-height) - var(--cell-on-width)) / 2);
}
:host([show-notes]) div.on:after {
  content: attr(data-note);
}
</style>
`;
template.innerHTML = `${html}${styles}`;

const CHORDS = {
  c: [0,0,0,3],
  d: [2,2,2,0],
  e: [4,4,4,2],
  f: [2,0,1,0],
  g: [0,2,3,2],
  a: [2,1,0,0],
  b: [4,3,2,2],
  
  cm: [0,3,3,3],
  dm: [2,2,1,0],
  em: [0,4,3,2],
  fm: [1,0,1,3],
  gm: [0,2,3,1],
  am: [2,0,0,0],
  bm: [4,2,2,2],
  
  c7: [0,0,0,1],
  d7: [2,0,2,0],
  e7: [0,2,0,2],
  f7: [2,3,1,0],
  g7: [0,2,1,2],
  a7: [0,1,0,0],
  b7: [2,3,2,2],
  
  cmaj7: [0,0,0,2],
  dmaj7: [2,2,2,4],
  emaj7: [1,3,0,2],
  fmaj7: [2,4,1,3],
  gmaj7: [0,2,2,2],
  amaj7: [1,1,0,0],
  bmaj7: [3,3,2,2],
  
  cm7: [3,3,3,3],
  dm7: [2,2,1,3],
  em7: [0,2,0,2],
  fm7: [1,3,1,3],
  gm7: [0,2,1,1],
  am7: [0,4,3,3],
  bm7: [2,2,2,2],
};

class UkeBar extends HTMLElement {
  static get observedAttributes() { return ['chord'] }
  
  constructor() {
    super();
    this.chord = null;
    
    // Do this in here instead of the connected callback because I am
    // lazy and don't want to workaround the attribute being set before this.
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  
  attributeChangedCallback(name, oldVal, newVal) {
    this.chord = newVal;
    this.show(newVal);
  }
  
  set chord(value) {
    if (this.getAttribute('chord') !== value) {
      this.setAttribute('chord', value);
    }
  }
  
  get chord() {
    return this.getAttribute('chord');
  }
  
  reset() {
    const currentlyOn = this.shadowRoot.querySelectorAll('.on');
    for (let i = 0; i < currentlyOn.length; i++) {
      currentlyOn[i].classList.remove('on');
    }
  }
  
  show(chord) {
    this.reset();
    
    const notes = CHORDS[chord.toLowerCase()];
    if (!notes) {
      return;
    }
    
    notes.forEach((fret, string) => {
      if (fret !== 0) {
        this.shadowRoot.querySelector(`div[fret="${fret}"][string="${string+1}"]`).classList.add('on');
      }
    });
  }
}

customElements.define('uke-bar', UkeBar);