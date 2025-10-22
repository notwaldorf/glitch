let currentWord;
let allWords = [];
let timeouts = [];

// Selectors be selecting
const CIRCLE = document.querySelector('.circle');
const TEXT = document.querySelector('.asl');
const ANSWER = document.querySelector('.accent');
const SLIDER = document.querySelector('input[type=range]');

init();

async function init() {
  allWords = await (await fetch('https://cdn.glitch.com/8bd11670-4f32-4ff1-8ab9-679abad0aaec%2Fglitch-friendly-words.json?v=1600378385448')).json();
  next();
}

async function showWord(word) {
  timeouts.forEach(t => clearTimeout(t));
  timeouts = [];
  
  CIRCLE.classList.add('start');
  TEXT.textContent = '';
  
  setTimeout(() => startAnimation(word), 400)
}

function startAnimation(word) {
  const letters = word.split('');
  const duration = parseInt(SLIDER.value);
  for (let i = 0; i < letters.length; i++) {
    const when = duration * i;
    const needsOffset = i > 0 && (letters[i] == letters[i - 1]);
    let x = setTimeout(() => show(letters[i], needsOffset), when)
    timeouts.push(x);
  }
  
}
function show(letter, needsOffset) {
  CIRCLE.classList.remove('start');
  TEXT.textContent = letter;
  CIRCLE.style.paddingRight = needsOffset ? '80px' : '0';
}

function next() {
  const i = Math.floor(Math.random() * allWords.length); 
  ANSWER.textContent = 'show answer';
  currentWord = allWords[i];
  repeat();
}

function repeat() {
  showWord(currentWord);
}

function answer() {
  ANSWER.textContent = currentWord;
}

function changeLanguage() {
  const lang = document.querySelector('input:checked').value;
  
  CIRCLE.classList.remove('asl');
  CIRCLE.classList.remove('auslan');
  CIRCLE.classList.remove('bsl');
  CIRCLE.classList.add(lang);
  repeat()
}