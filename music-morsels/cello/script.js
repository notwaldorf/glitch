const { Factory } = Vex.Flow;

const STRINGS = {
  A: ['A3', 'B3', 'C#4', 'D4'],
  D: ['D3', 'E3', 'F#3', 'G3'],
  G: ['G2', 'A2', 'B2', 'C3'],
  C: ['C2', 'D2', 'E2', 'F2'], 
}

var activeKey = STRINGS.D;

const vf = new Factory({ renderer: { elementId: 'staff' } });

next() 

function switchKey(event) {
  const btn = document.querySelector('button.active');
  if (btn) {
    btn.classList.remove('active');
  }
  const key = event.target.dataset.key;
  activeKey = STRINGS[key]
  event.target.classList.add('active')
  
  next()
}

function next() {
  // I don't know how else to reset it.
  document.querySelector('#staff > svg').innerHTML = ''
  const score = vf.EasyScore();
  const system = vf.System({x: 0, y: 0, width: 140});
  
  // Clear previous answer.
  const prevBubble = document.querySelector('#cello > div.active');
  let prevNote = null;
  if (prevBubble) { 
    prevNote = prevBubble.dataset.note;
    prevBubble.classList.remove('active');
  }
  
  // Get a new note.
  let note = activeKey[Math.floor(Math.random() * activeKey.length)];

  // Make sure it's not the same as the previous note.
  while (note == prevNote) {
    note = activeKey[Math.floor(Math.random() * activeKey.length)];
  }
  
  // Show it on the cello.
  const bubble = document.querySelector(`[data-note="${note}"]`)
  bubble.classList.add('active');
  
  // Show it on the staff.
  system.addStave({
    voices: [
      score.voice(score.notes(`${note}/w`, { clef: 'bass', stem: 'up' })),
    ]
  }).addClef('bass')

  vf.draw();
}
