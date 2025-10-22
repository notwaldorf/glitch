const my_notes = ["do", "re", "mi", "fa", "sol", "la", "si"];
const your_notes = ["C", "D", "E", "F", "G", "A", "B"];

const NOTE_HEIGHT = 20;
const HALF_NOTE_HEIGHT = NOTE_HEIGHT / 2;

drawThings();
document.querySelector('button.mi').click();

function legendClick(event) {
  const btn = event.target;
  if (btn.localName !== "button") {
    return;
  }
  btn.classList.toggle('on');
  
  const note = btn.className.replace(' on', '');
  const notes = document.querySelectorAll(`div.${note}`);
  
  
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.toggle('hidden');
  }
}

function noteNamesClick(mine) {
  const legends = document.querySelectorAll('.legend > button');
  for (let i = 0; i < legends.length; i++) {
    legends[i].textContent = mine ? my_notes[i] : your_notes[i];
  }
  const toggles = document.querySelectorAll('.toggles > button');
  toggles[0].classList.toggle('on');
  toggles[1].classList.toggle('on');
}

function drawThings() {
  let x0 = window.innerWidth < 350 ? 40 : 60;
  
  drawMiddleDo(x0, 0 - HALF_NOTE_HEIGHT);

  
  // Here we add the actual dots for all the notes on the treble clef,
  // but they're initially hidden and dont get displayed until a note button
  // is clicked.

  x0 += getNoteOffset() - HALF_NOTE_HEIGHT;
  drawTrebleNotes(x0, 0 - NOTE_HEIGHT);

  const y = (NOTE_HEIGHT * 5) - HALF_NOTE_HEIGHT;
  drawBassNotes(x0, y);
}

function drawMiddleDo(x0, y0) {
  const parent = document.querySelector('.middle');
  drawOctave(parent, x0, y0, 0, 1);
}

function drawTrebleNotes(x0, y0) {
  const parent = document.querySelector('.treble');
  
  // The do is on the magic dotted line, so skip it.
  // This draws re-si.
  let [x, y] = drawOctave(parent, x0, y0, 1);
  
  // This draws middle do - si
  [x, y] = drawOctave(parent, x, y, 0, 7);
  
  // This draws top do - fa
  [x, y] = drawOctave(parent, x, y, 0, 4);
}

function drawBassNotes(x0, y0) {
  const parent = document.querySelector('.bass');
  
  // The do is on the magic dotted line, so skip it.
  // This draws si-do
  let [x, y] = drawReverseOctave(parent, x0, y0, 7, 0);
  
  // This draws middle si-do
  [x, y] = drawReverseOctave(parent, x, y, 7, 0);
  
  // This draws bottom si-sol
  [x, y] = drawReverseOctave(parent, x, y, 7, 4);
}

// x0, y0 is where to draw it.

function drawOctave(parent, x0, y0, noteStartAt = 0, noteEndAt = 7) {
  let x = x0;
  let y = y0;
  const halfHeight = NOTE_HEIGHT / 2;
  const offset = getNoteOffset();
  
  for (let i = noteStartAt; i < noteEndAt; i++) {
    drawNoteAt(parent, i, x, y);
    x += offset;
    y += halfHeight + 1;
  }
  return [x, y];
}

function drawReverseOctave(parent, x0, y0, noteStartAt = 7, noteEndAt = 0) {
  let x = x0;
  let y = y0;
  const halfHeight = NOTE_HEIGHT / 2;
  const offset = getNoteOffset();
  
  for (let i = noteStartAt - 1; i >= noteEndAt; i--) {
    drawNoteAt(parent, i, x, y);
    x += offset;
    y -= halfHeight + 1;
  }
  return [x, y];
}

function drawNoteAt(parent, i, x, y) {
  const div = document.createElement('div');
  div.className = my_notes[i] + ' hidden';
  div.style.left = `${x}px`;
  div.style.bottom = `${y}px`;
  parent.appendChild(div);
}

function getNoteOffset() {
  let multiplier = 2;
  if (window.innerWidth < 350) {
    multiplier = 0.8;
  } else if (window.innerWidth < 500) {
    multiplier = 1;
  }
  
  return NOTE_HEIGHT * multiplier;
}

/***************************************************
 * Code that I used to generate the HTML that I then
 * pasted in because running JS to generate the same
 * static content over and over is .... bad.
 ***************************************************/

// Legend.

/* 
drawLegend();
function drawLegend() {
  const parent = document.querySelector(".legend");

  for (let i = 0; i < 7; i++) {
    const btn = document.createElement("button");
    btn.textContent = my_notes[i];
    btn.className = my_notes[i];
    btn.setAttribute('on', '');
    parent.appendChild(btn);
  }
}
*/

// Clefs.

/*
drawLinesIn(document.querySelector('.treble'));
drawLinesIn(document.querySelector('.bass'));
drawDottedLine();

function drawLinesIn(parent) {
  for (let i = 0; i < 5; i++) {
    const hr = document.createElement("hr");
    parent.appendChild(hr);
  }
}

function drawDottedLine() {
  const parent = document.querySelector('.middle');
  const hr = document.createElement("hr");
  hr.className = 'dotted';
  parent.appendChild(hr);
}
*/