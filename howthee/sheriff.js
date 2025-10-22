window.defaultEmoji = window.defaultEmoji || '🚫';

function getSheriff(bodyEmoji,leftHand='✌', rightHand='✌️') {
  if (!bodyEmoji) {
    const q = decodeURIComponent(window.location.hash.substr(1));
    bodyEmoji = q.length === 0 ? window.defaultEmoji : q;
  }
  
  let x;
  x = `<div class="pixel body"><span>${bodyEmoji}</span></div>`;
  const s = '<div class="pixel space"><span>&nbsp;</span></div>';
  const l = `<div class="pixel hand" id="sup"><span>${leftHand}</span></div>`;
  const r = `<div class="pixel hand" id="pal"><span>${rightHand}</span></div>`;
  const h = '<div class="pixel head" id="head"><span>🤠</span></div>';
  const b = '<div class="pixel boot"><span>👢</span></div>'
  
  return `${s}${s}${s}${h}${s}${s}${s}
${s}${s}${x}${x}${x}${s}${s}
${s}${x}${s}${x}${s}${x}${s}
${l}${s}${x}${x}${s}${s}${r}
${s}${s}${x}${s}${x}${s}${s}
${s}${s}${x}${s}${s}${x}${s}
${s}${s}${b}${s}${s}${b}${s}`;
}

function getDanceSheriff(bodyEmoji) {
  if (!bodyEmoji) {
    const q = decodeURIComponent(window.location.hash.substr(1));
    bodyEmoji = q.length === 0 ? window.defaultEmoji : q;
  }
  
  let x;
  x = `<div class="pixel body"><span>${bodyEmoji}</span></div>`;
  const s = '<div class="pixel space"><span>&nbsp;</span></div>';
  const l = `<div class="pixel hand"><span>✋</span></div>`;
  const r = `<div class="pixel hand"<span>🤚</span></div>`;
  const h = '<div class="pixel head" id="head"><span>🤠</span></div>';
  const b = '<div class="pixel boot"><span>👢</span></div>'
  
  return `${s}${s}${l}${s}${r}${s}${s}
${s}${x}${s}${h}${s}${x}${s}
${s}${s}${x}${x}${x}${s}${s}
${s}${s}${s}${x}${x}${s}${s}
${s}${s}${x}${s}${s}${x}${s}
${s}${s}${x}${s}${s}${s}${b}
${s}${s}${b}${s}${s}${s}${s}`;
}

function getSheriffAsText(bodyEmoji, leftHand='✌', rightHand='✌') {
  if (!bodyEmoji) {
    const q = decodeURIComponent(window.location.hash.substr(1));
    bodyEmoji = q.length === 0 ? window.defaultEmoji : q;
  }
  
  let x = bodyEmoji;
  const s = ' ';
  const l = leftHand;
  const r = rightHand;
  const h = '🤠';
  const b = '👢'
  
  const forgiveMe = new Array(7);
  forgiveMe[0] = `${s}/${s}/${s}/${h}/${s}/${s}/${s}`.split('/')
  forgiveMe[1] = `${s}/${s}/${x}/${x}/${x}/${s}/${s}`.split('/')
  forgiveMe[2] = `${s}/${x}/${s}/${x}/${s}/${x}/${s}`.split('/')
  forgiveMe[3] = `${l}/${s}/${x}/${x}/${s}/${s}/${r}`.split('/')
  forgiveMe[4] = `${s}/${s}/${x}/${s}/${x}/${s}/${s}`.split('/')
  forgiveMe[5] = `${s}/${s}/${x}/${s}/${s}/${x}/${s}`.split('/')
  forgiveMe[6] = `${s}/${s}/${b}/${s}/${s}/${b}/${s}`.split('/')
  
  return forgiveMe;
}

//const drumPitches = [36, 38, 42, 45, 50, 49, 51];
const drumPitches = [38, 36, 42, 45, 50, 49, 51];
function sheriffToSequence() {
  const seq = new mm.NoteSequence();
  const pixels = output.querySelectorAll('.pixel');

  let col = 0; row = 0;
  for (let i = 0; i < pixels.length; i++) {
    if (!pixels[i].classList.contains('space')) {
      seq.notes.push({pitch:drumPitches[row], quantizedStartStep: col * 2, quantizedEndStep: col * 2 + 2, isDrum:true});  
      pixels[i].title = drumPitches[row];
    }
    col++;
    if (col === 7) {
      col = 0;
      row++;
    }
  } 
  seq.quantizationInfo = {stepsPerQuarter: 4};
  seq.totalQuantizedSteps = seq.notes[seq.notes.length - 1].quantizedEndStep;
  return seq;
}

window.onload = () => { 
  document.body.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) { // left
      window.location = `./day-${today-1}.html`
    } else if (event.keyCode === 39 && today < 31) {  // right
      window.location = `./day-${today+1}.html`
    }
  });
}

function addFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = '<hr><h3>a weird art experiment by <a href="https://twitter.com/notwaldorf">monica</a></h3>';
  document.body.appendChild(footer);
}