document.querySelector('button.go').addEventListener('click', () => {
  document.querySelector('.instructions').hidden = true;
  document.querySelector('button.go').hidden = true;
  document.querySelectorAll('.radios').forEach(el => el.hidden = true)
  document.querySelectorAll('h2').forEach(el => el.hidden = true)
  document.querySelector('h1').hidden = true;
  document.querySelector('footer').classList.add('absolute')
  document.querySelector('.answers').hidden = false;
  document.querySelector('.hint').hidden = false;  
  
  // const hasLedger = document.querySelector("#yes").checked;
  // if (!hasLedger) {
  //   document.querySelectorAll('.note-holder.ledger').forEach(el => el.hidden = true)
  // }
  const isDoReMi = document.querySelector("#doremi").checked;
  if (isDoReMi) {
    const names = ['la', 'si', 'do', 're', 'mi', 'fa', 'sol'];
    document.querySelectorAll('.answers button').forEach((el, i) => el.textContent = names[i])
    
  }
  next();
})

const notes = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2'];
let note_el, staff_el, answer;

function next() {
  // Reset the test.
  if (note_el) {
    note_el.classList.add('hidden');
  }
  if (staff_el) {
    staff_el.hidden = true;
  }
  
  // And all the buttons
  const bs = document.querySelectorAll('.answers > button');
  bs.forEach(b => {
    b.classList.remove('nope');
    b.classList.remove('yup');
    b.disabled = false;
  })
  
  const useTreble = document.querySelector("#treble").checked;
  const useBass = document.querySelector("#bass").checked;
  
  // Pick the staff
  let staff;
  if (useTreble) staff = 'treble';
  else if (useBass) staff = 'bass';
  else {
    const randomBit = Math.round(Math.random());
    staff = randomBit == 0 ? 'treble' : 'bass';
  }
  
  // Pick the note.
  answer = notes[Math.floor(Math.random() * notes.length)];
  console.log(staff, answer)
  
  // Show the staff. I have regrets about my naming choices.
  staff_el = document.getElementById(`staff-${staff}`);
  staff_el.hidden = false;
  
  // Show the note.
  note_el = staff_el.querySelector(`.${answer}`);
  note_el.classList.remove('hidden');
}

function checkAnswer(el) {
  const guess = el.dataset.note;
  //console.log(guess)
  if (guess == answer[0]) {
    next()
  } else {
    el.classList.add('nope')
    el.disabled = true;
    
    // note_el.style.animation = 'none';
    // note_el.offsetHeight; /* trigger reflow */
    // note_el.style.animation = null; 
  }
}

function justTellMe() {
  const el = document.querySelector(`.answers button[data-note="${answer[0]}"]`);
  el.classList.add('yup')
}