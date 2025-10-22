let isABC = true;
let key;
let notes;
let answer;
let callbackSeconds = 1;
let intervalId = null;


const MAJORS = 
{
  // sharps
  C: ["C", "D", "E", "F", "G", "A", "B" ],
  G: ["G", "A", "B","C", "D", "E", "F♯",],
  D: ["D", "E", "F♯", "G", "A", "B", "C♯",],
  A: ["A", "B", "C♯", "D", "E", "F♯", "G♯", ],
  E: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯", ],
  B: ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯", ],
  "F♯": ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯", ],
  "C♯": ["F♯", "G♯", "A♯", "B♯", "C♯", "D♯", "E♯", ],
  
  // flats
  "F": ["F", "G", "A", "B♭", "C", "D", "E", ],
  "B♭": ["B♭", "C", "D", "E♭", "F", "G", "A", ],
  "E♭": ["E♭", "F", "G", "A♭", "B♭", "C", "D", ],
  "A♭": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G", ],
  "D♭": ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C", ],
  "G♭": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F", ],
  "C♭": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F♭", ],
}
const letterToSolfege = {
  "A": "LA",
  "B": "SI",
  "C": "DO",
  "D": "RE",
  "E": "MI",
  "F": "FA",
  "G": "SOL",
  
}

document.getElementById("doremi").addEventListener("change", (event) => {
  isABC = !event.target.checked;
  switchLetters()
});
document.getElementById("abc").addEventListener("change", (event) => {
  isABC = event.target.checked;
  switchLetters()
});
document.getElementById('slider').addEventListener('input', startInterval)


document.querySelector('button.go').addEventListener('click', () => {
  document.querySelector('.selects').hidden = true;
  document.querySelector('button.go').hidden = true;
  //document.querySelector('button.next').hidden = false;
  document.querySelector('.slider-box').hidden = false;
  
  document.querySelectorAll('.radios').forEach(el => el.hidden = true)
  document.querySelectorAll('h2').forEach(el => el.hidden = true)
  document.querySelector('h1').hidden = true;
  document.querySelector('footer').classList.add('absolute')
  document.querySelector('.description').hidden = false
  
  key = document.getElementById('key').value;
  notes = MAJORS[key]  
  
  let letter = key[0]
  let accent = key.length > 1 ? key[1] : ""
      
  if (!isABC) {
    letter = letterToSolfege[letter]
  }
  document.querySelector('.description > .key').textContent = letter
  document.querySelector('.description > .key-accent').textContent = accent
  
  next()
  startInterval()
})

let note_el, staff_el;
function next() {
  const useTreble = document.querySelector("#treble").checked;
  const useBass = document.querySelector("#bass").checked;
  
  // Reset the test.
  if (note_el) {
    note_el.classList.add('hidden');
  }
  if (staff_el) {
    staff_el.hidden = true;
  }
  // Hide all the staff signatures
  document.querySelectorAll('staff div.signature').forEach(el => el.classList.add('hidden'))
  
  // Pick the staff
  let staff;
  if (useTreble) staff = 'treble';
  else if (useBass) staff = 'bass';
  else {
    const randomBit = Math.round(Math.random());
    staff = randomBit == 0 ? 'treble' : 'bass';
  }
  
  // Pick the note.
  answer = pickFromArray(notes)
  const letter = answer[0].toLowerCase()
  const octave = pickFromArray([1,2])
  const noteToShow = letter + octave
  console.log(staff, answer, noteToShow)
  
  let displayNote = isABC ? letter.toUpperCase() : letterToSolfege[letter.toUpperCase()]
  
  document.querySelector('.description > .note').textContent = displayNote
  document.querySelector('.description > .note-accent').textContent = answer.length > 1 ? answer[1] : ""
  
  // Show the staff. I have regrets about my naming choices.
  staff_el = document.getElementById(`staff-${staff}`);
  staff_el.hidden = false;
  
  // Show the staff signature.
  notes.forEach(note => {
    // There's a sharp in the signature
    if (note.indexOf("♯") == 1) {
      let lowered = note.toLowerCase()
      const selector = `#staff-${staff} .${lowered}.signature`
      document.querySelector(selector).classList.remove('hidden')
    }
    // There's a flat in the signature
    if (note.indexOf("♭") == 1) {
      let lowered = note.toLowerCase()
      const selector = `#staff-${staff} .${lowered}.signature`
      document.querySelector(selector).classList.remove('hidden')
    }
  });
  
  
  // Show the note.
  note_el = staff_el.querySelector(`.${noteToShow}`);
  note_el.classList.remove('hidden');
}


function startInterval() {
  let value = parseFloat(document.getElementById('slider').value)
  callbackSeconds = 5 - value;
  let isPaused = value == 0
  
  document.getElementById('intervalAmount').textContent = callbackSeconds.toFixed(1)
  document.getElementById('bpmAmount').textContent = Math.round(60/callbackSeconds)
  document.querySelector('button.next').hidden = !isPaused
  document.getElementById('auto').hidden = isPaused
  document.getElementById('manual').hidden = !isPaused

  if (intervalId) {
      clearInterval(intervalId);
  }
  if (!isPaused) {
    intervalId = setInterval(next, callbackSeconds * 1000);
  }
  
}

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function switchLetters() {
  document.getElementById("key").innerHTML = isABC
    ? `<option>A</option>
      <option>B</option>
      <option>C</option>
      <option>D</option>
      <option>E</option>
      <option>F</option>
      <option>G</option>
      <option>C♯</option>
      <option>F♯</option>
      <option>A♭</option>
      <option>B♭</option>
      <option>D♭</option>
      <option>E♭</option>
      <option>G♭</option>
      <option>C♭</option>
      `
    : `<option value="A">la</option>
        <option value="B">si</option>
        <option value="C">do</option>
        <option value="D">re</option>
        <option value="E">mi</option>
        <option value="F">fa</option>
        <option value="G">sol</option>
        <option value="C♯">do♯</option>
        <option value="F♯">fa♯</option>
        <option value="A♭">la♭</option>
        <option value="B♭">si♭</option>
        <option value="D♭">re♭</option>
        <option value="E♭">mi♭</option>
        <option value="G♭">sol♭</option>
        <option value="C♭">do♭</option>
      `;
}
