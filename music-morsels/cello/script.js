const { Factory } = Vex.Flow;

const KEYS = {
  C: ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3'], 
  G: ['G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F#3', 'G3'],
  D: ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4'],
}

var activeKey = KEYS.D;
var activeSignature = "D"

const vf = new Factory({ renderer: { elementId: 'staff' } });

next() 

function switchKey(event) {
  const btn = document.querySelector('button.active');
  if (btn) {
    btn.classList.remove('active');
  }
  const key = event.target.dataset.key;
  activeSignature = key
  activeKey = KEYS[key]
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
  if (prevBubble) { prevBubble.classList.remove('active')}
  
  // Get a new note.
  const note = activeKey[Math.floor(Math.random() * activeKey.length)];
  //console.log(note)
  
  // Show it on the cello.
  const bubble = document.querySelector(`[data-note="${note}"]`)
  //console.log(bubble)
  bubble.classList.add('active');
  
  // Show it on the staff.
  const noteWithoutSharp = note.replace('#', "")
  system.addStave({
    voices: [
      score.voice(score.notes(`${noteWithoutSharp}/w`, {clef: 'bass', stem: 'up'})),
    ]
  }).addClef('bass').addKeySignature(activeSignature)

  vf.draw();
}
