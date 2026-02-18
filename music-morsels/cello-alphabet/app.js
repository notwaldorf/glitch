// Notes per ukulele string
// Format: { key: VexFlow key string, name: display name, string: string label }
const NOTES_BY_STRING = {
  A: [
    { key: 'a/3',  name: 'A',  string: 'A string' },
    { key: 'b/3',  name: 'B',  string: 'A string' },
    { key: 'c#/4', name: 'C#', string: 'A string' },
    { key: 'd/4',  name: 'D',  string: 'A string' },
  ],
  D: [
    { key: 'd/3',  name: 'D',  string: 'D string' },
    { key: 'e/3',  name: 'E',  string: 'D string' },
    { key: 'f#/3', name: 'F#', string: 'D string' },
    { key: 'g/3',  name: 'G',  string: 'D string' },
  ],
  G: [
    { key: 'g/2',  name: 'G',  string: 'G string' },
    { key: 'a/2',  name: 'A',  string: 'G string' },
    { key: 'b/2',  name: 'B',  string: 'G string' },
    { key: 'c/3',  name: 'C',  string: 'G string' },
  ],
  C: [
    { key: 'c/2',  name: 'C',  string: 'C string' },
    { key: 'd/2',  name: 'D',  string: 'C string' },
    { key: 'e/2',  name: 'E',  string: 'C string' },
    { key: 'f/2',  name: 'F',  string: 'C string' },
  ],
};

let selectedStrings = new Set(['D']);
let deck = [];
let currentIdx = 0;
let isFlipped = false;
let correct = 0, wrong = 0;

const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

// ── String selector ──────────────────────────────────────────────────────────

document.querySelectorAll('.string-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const s = btn.dataset.string;
    if (selectedStrings.has(s)) {
      if (selectedStrings.size === 1) return; // keep at least one
      selectedStrings.delete(s);
      btn.classList.remove('active');
    } else {
      selectedStrings.add(s);
      btn.classList.add('active');
    }
    rebuildDeck();
  });
});

function rebuildDeck() {
  const allNotes = [...selectedStrings].flatMap(s => NOTES_BY_STRING[s]);
  deck = allNotes.sort(() => Math.random() - 0.5);
  currentIdx = 0;
  correct = 0;
  wrong = 0;
  document.getElementById('score-correct').textContent = 0;
  document.getElementById('score-wrong').textContent = 0;
  loadCard(0);
}

// ── VexFlow rendering ────────────────────────────────────────────────────────

function renderNote(noteData) {
  const container = document.getElementById('vex-container');
  container.innerHTML = '';

  const WIDTH = 260;
  const HEIGHT = 220;
  const SCALE = 1.8;

  const renderer = new Renderer(container, Renderer.Backends.SVG);
  renderer.resize(WIDTH, HEIGHT);

  const context = renderer.getContext();
  context.scale(SCALE, SCALE);

  const scaledW = WIDTH / SCALE;
  const staveW = 110;
  const staveX = (scaledW - staveW) / 2;
  const staveY = 10; // push stave near the top, so ledger lines below have room

  const stave = new Stave(staveX, staveY, staveW);
  stave.addClef('bass');
  stave.setContext(context).draw();

  const staveNote = new StaveNote({
    keys: [noteData.key],
    duration: 'q',
    clef: 'bass',
  });

  if (noteData.key.includes('#')) {
    staveNote.addModifier(new Accidental('#'));
  }

  const voice = new Voice({ num_beats: 1, beat_value: 4 });
  voice.addTickables([staveNote]);

  new Formatter().joinVoices([voice]).format([voice], 40);
  voice.draw(context, stave);
}

// ── Card logic ───────────────────────────────────────────────────────────────

function loadCard(idx) {
  if (!deck.length) return;
  const note = deck[idx];
  renderNote(note);
  document.getElementById('note-letter').textContent = note.name;
  document.getElementById('note-octave').textContent = note.string;

  const card = document.getElementById('card');
  card.classList.remove('flipped');
  isFlipped = false;

  document.getElementById('flip-hint').classList.remove('hidden');
  // document.getElementById('counter').innerHTML =
  //   `Card <span>${idx + 1}</span> of ${deck.length}`;
}

function flipCard() {
  const card = document.getElementById('card');
  isFlipped = !isFlipped;
  card.classList.toggle('flipped', isFlipped);
  document.getElementById('flip-hint').classList.toggle('hidden', isFlipped);
}

function nextCard() {
  currentIdx = (currentIdx + 1) % deck.length;
  if (currentIdx === 0) {
    const allNotes = [...selectedStrings].flatMap(s => NOTES_BY_STRING[s]);
    deck = allNotes.sort(() => Math.random() - 0.5);
  }
  loadCard(currentIdx);
}

function markCorrect() {
  correct++;
  document.getElementById('score-correct').textContent = correct;
  nextCard();
}

function markWrong() {
  wrong++;
  document.getElementById('score-wrong').textContent = wrong;
  nextCard();
}

// ── Init ─────────────────────────────────────────────────────────────────────
rebuildDeck();