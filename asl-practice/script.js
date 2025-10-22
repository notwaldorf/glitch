let allWords = []
let currentWord;
let retried;

// Selectors be selecting
const IMG = document.querySelector("img.gif");
const BTN = document.querySelector("button.answer");
const TEXT = document.querySelector(".text");


IMG.onerror = () => {
  if (!retried) {
    // Some gifs are in a separate format, let's try that one too.
    IMG.src = `https://www.lifeprint.com/asl101/gifs/${currentWord.charAt(0)}/${currentWord}.gif`;
    retried = true;
  } else {
    // Out of ideas.
    BTN.disabled = true;
    IMG.hidden = true;
    TEXT.hidden = false;
    TEXT.textContent = currentWord;
    
    // https://www.lifeprint.com/asl101/pages-layout/signs.htm
  }
}

IMG.onload = () => {
  // We have this image, so make sure the buttons are enabled correctly.
  BTN.disabled = false;
  IMG.hidden = false;
  TEXT.hidden = true;
}

init();

async function init() {
  const string = await (await fetch(
    "./words.csv"
  )).text();
  allWords = string.split('\n');
  
  next();
  
}

function next() {
  const i = Math.floor(Math.random() * allWords.length);
  currentWord = allWords[i].toLowerCase();
  retried = false;
  
  BTN.textContent = 'show answer';
  IMG.src = `http://www.lifeprint.com/asl101/gifs-animated/${currentWord}.gif`;
}

function answer() {
  BTN.textContent = currentWord;
}