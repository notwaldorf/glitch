// From https://ukuguides.com/beginner/ultimate-ukulele-strumming-tips-and-guide/
const PATTERNS = [
  'd - d u - u d -',
  'd - d u - u d u',
  'd - d - d u d u',
  'd - d u d u d u',
  'd - d u',
  'd u x u',
  'd - d u - u d u - u d -',
  'd u d U d u d U',
  'd u x u d u x u',
  '- d - d - d - d',
  '- - d u - - d -',
  'finger picking',
// From https://liveukulele.com/lessons/picking-patterns/
  '4 2 3 1', '1 3 2 4', '4 3 2 1', '4 1 3 2', '3 2 4 1 4 2', '1 4 2 1 4 2 3 2', '1 4 2 3 2 4'
];
const DOWN = '▼';
const UP = 'ᐃ';
const CHUCK = ' x ';
const PAUSE = '⏤';


const GREATS = ["C", "D", "F", "G", "Am", "Dm", "Em"];
const MAJOR =  ["C", "D", "E", "F", "G", "A", "B"];
const MINOR = ["Cm", "Dm", "Em", "Fm", "Gm", "Am", "Bm"];
const SEVEN = ["C7", "D7", "E7", "F7", "G7", "A7", "B7"];
const MAJ7 = ["Cmaj7", "Dmaj7", "Emaj7", "Fmaj7", "Gmaj7", "Amaj7", "Bmaj7"];
const M7 = ["Cm7", "Dm7", "Em7", "Fm7", "Gm7", "Am7", "Bm7"];
let availableChords = [];

const Tone = window.Tone;
const down = new Tone.Player("https://cdn.glitch.com/b88effbe-74da-4d3b-a459-8921f68aa225%2Ftick.wav?v=1586561795892").toMaster();
const up = new Tone.Player("https://cdn.glitch.com/b88effbe-74da-4d3b-a459-8921f68aa225%2Ftick.mp3?v=1586561478202").toMaster();
const pause = new Tone.Player("https://cdn.glitch.com/b88effbe-74da-4d3b-a459-8921f68aa225%2Ftick.wav?v=1586561795892").toMaster();
pause.volume.value = -30;

initChordSelects(true);
initStrumSelect();

randomChords();
showSong(['G', 'D', 'Am', 'C']);

document.querySelector('.go').disabled = false;

function initChordSelects(forceGreats=false) {
  availableChords = [];
  
  if (document.getElementById('greats').checked && forceGreats) {
    availableChords = availableChords.concat(GREATS);
    document.getElementById('major').checked = false;
    document.getElementById('minor').checked = false;
    document.getElementById('seven').checked = false;
    document.getElementById('maj7').checked = false;
    document.getElementById('m7').checked = false;
  } else {
    document.getElementById('greats').checked = false;
    if (document.getElementById('major').checked) availableChords = availableChords.concat(MAJOR);
    if (document.getElementById('minor').checked) availableChords = availableChords.concat(MINOR);
    if (document.getElementById('seven').checked) availableChords = availableChords.concat(SEVEN);
    if (document.getElementById('maj7').checked) availableChords = availableChords.concat(MAJ7);
    if (document.getElementById('m7').checked) availableChords = availableChords.concat(M7);
  }
  
    
  let s = document.querySelectorAll('.track select');
  for (let i = 0; i < s.length; i++) {
    s[i].innerHTML = availableChords.map(c => `<option>${c}</option>`).join('');
    s[i].onchange = chordChanged;
  }
}

function initStrumSelect() {
  function symbolForStrum(s) {
    if (s === 'd') return DOWN;
    else if (s === 'u') return UP;
    else if (s === 'U') return UP;
    else if (s === 'x') return CHUCK;
    else if (s === '-') return PAUSE;
    else return s;
  }
  const select = document.getElementById('strumming');
  select.innerHTML = '';
  // Parse every pattern.
  for (let i = 0; i < PATTERNS.length; i++) {
    const isLabel = PATTERNS[i].indexOf('finger') !== -1;
    const pattern = isLabel ? [PATTERNS[i]] : PATTERNS[i].split(' ');
    const option = document.createElement('option');
    option.innerHTML = pattern.map(s => `<span data-type="${s}">${symbolForStrum(s)}</span>`).join('');
    
    if (isLabel) {
      option.disabled = true;
    }
    select.appendChild(option);
  }
  select.nextElementSibling.innerHTML = select.selectedOptions[0].innerHTML;
  select.onchange = strumChanged;
}

function showSong(song) {
  const selects = document.querySelectorAll('.track select');
  const ukes = document.querySelectorAll('uke-bar');

  for (let i = 0; i < selects.length; i++) {
    selects[i].value = song[i];
    const span = selects[i].nextElementSibling
    span.textContent = song[i];
    if (song[i].length === 1) span.classList.remove('small');
    else span.classList.add('small');
    
    ukes[i].chord = song[i];
  }
}

function chordChanged(event) {
  const select = event.target;
  select.parentElement.parentElement.nextElementSibling.chord = select.value;
  
  const span = select.nextElementSibling
  span.textContent = select.value;
  if (select.value.length === 1) span.classList.remove('small');
  else span.classList.add('small');
}

function strumChanged(event) {
  const select = event.target;
  document.querySelector('.strumming-help').hidden = select.selectedIndex > 11;
  document.querySelector('.picking-help').hidden = select.selectedIndex < 11;
  select.nextElementSibling.innerHTML = select.selectedOptions[0].innerHTML;
}

let eventID, step = 0, strum = 0;
async function go() {
  Tone.Transport.stop();
  
  const btn = document.querySelector('button.go');
  btn.classList.toggle('going');
  if (btn.classList.contains('going')) {
    btn.textContent = 'stop';
    Tone.Transport.start();
    step = 0;
    strum = 0;
    document.querySelector('.settings').hidden = true;
    document.querySelector('.main').hidden = false;
    document.querySelector('#btnSettings').disabled = true;
  } else {
    clearAll();
    btn.textContent = 'start';
    Tone.Transport.stop();
    Tone.Transport.clear(eventID);
    document.querySelector('#btnSettings').disabled = false;
    return;
  }

  Tone.Transport.bpm.value = parseInt(document.querySelector('input').value);


  // Things to update.
  const divs = document.querySelectorAll('.track > div');
  const strumSpans = document.querySelectorAll('.pattern > span > span')
  
  const randomize = document.getElementById('randomChords').checked;
  const speedup = document.getElementById('speed').checked;
  const ticksAndTocks = document.getElementById('tocks').checked;
  
  
  eventID = Tone.Transport.scheduleRepeat((time) => {
    // Done all the strums, next chord.
    if (strum >= strumSpans.length) {
      strumSpans[strum - 1].classList.remove('current');
      strum = 0;
      step++;
    }
    
    // Done all the chords, re-loop.
    if (step >= 4) {
      divs[step - 1].classList.remove('current');
      strum = 0;
      step = 0;
      if (randomize) {
        showSong(randomChords());
      }
      if (speedup) {
        Tone.Transport.bpm.value += 10;
        document.querySelector('input').value = Math.floor(Tone.Transport.bpm.value);
      }
    }
    
    // Tick!
    if (ticksAndTocks) {
      if (strumSpans[strum].dataset.type ==='u' || strumSpans[strum].dataset.type ==='U') {
        up.start(time);
      } else if (strumSpans[strum].dataset.type === '-') {
        pause.start(time);
      } else {
        down.start(time);
      }
    } else {
      if (strumSpans[strum].dataset.type === '-') {
        pause.start(time);
      } else {
        down.start(time);
      }
    }
    
    updateCurrentStrum(strum);
    updateCurrentChord(step);
    strum++;
  }, "8n");

  
  function updateCurrentChord(i) {
    if (i >= 1) {
      divs[i - 1].classList.remove('current');
    }
    divs[i].classList.add('current');
  }
  
  function updateCurrentStrum(i) {
    if (i >= 1) {
      strumSpans[i - 1].classList.remove('current');
    }
    strumSpans[i].classList.add('current');
  }
  
  function clearAll() {
    const els = document.querySelectorAll('.current');
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('current');
    }
  }
}

function toggleSettings() {
  const el = document.querySelector('.settings');
  el.hidden = !el.hidden;
  document.querySelector('.main').hidden = !el.hidden;
}

function toggleChordShapes(event) {
  const input = event.target;
  const track = document.querySelector('.track');
  if (input.checked) {
    track.classList.add('no-shapes');
  } else {
    track.classList.remove('no-shapes');
  }
}

function toggleChordNotes() {
  const ukes = document.querySelectorAll('uke-bar');
  for (let i = 0; i < ukes.length; i++) {
    if (ukes[i].hasAttribute('show-notes')) {
      ukes[i].removeAttribute('show-notes');
    } else {
      ukes[i].setAttribute('show-notes', true);
    }
  }
}
function randomChords() {
  const c1 = Math.floor(Math.random() * availableChords.length);
  const c2 = Math.floor(Math.random() * availableChords.length);
  const c3 = Math.floor(Math.random() * availableChords.length);
  const c4 = Math.floor(Math.random() * availableChords.length);
  return [availableChords[c1], availableChords[c2], availableChords[c3], availableChords[c4]];
}