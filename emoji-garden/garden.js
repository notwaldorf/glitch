let NUM_ROWS = 10;
let NUM_COLS = 10;
let NUM_VISITORS = 3;
let NUM_SNACKS = 5;

loadWorld();

document.addEventListener('input', function(e) {
  updateWorld();
  doAGarden();
});

function loadWorld() {
  const json = localStorage.getItem('__emoji_garden__') || '{}';
  let state = JSON.parse(json);
  if (json == '{}') {
    // Save the defaults.
    const state = {rows:NUM_ROWS, cols:NUM_COLS, visitors:NUM_VISITORS, snacks:NUM_SNACKS};
    localStorage.setItem('__emoji_garden__', JSON.stringify(state));
  } else {
    document.getElementById('rows').value = NUM_ROWS = state.rows;
    document.getElementById('cols').value = NUM_COLS = state.cols;
    document.getElementById('visitors').value = NUM_VISITORS = state.visitors;
    document.getElementById('snacks').value = NUM_SNACKS = state.snacks;
  }
}

function updateWorld() {
  NUM_ROWS = document.getElementById('rows').value;
  NUM_COLS = document.getElementById('cols').value;
  NUM_VISITORS = document.getElementById('visitors').value;
  NUM_SNACKS = document.getElementById('snacks').value;
  
  const state = {rows:NUM_ROWS, cols:NUM_COLS, visitors:NUM_VISITORS, snacks:NUM_SNACKS};
  localStorage.setItem('__emoji_garden__', JSON.stringify(state));
}

function doAGarden() {
  const world = {
      'v1': ['🐹', '🐣', '🐌', '🐢', '🐝', '🦔', '🐿', '🐰', '🐛', '🐦', '🦉'],
      'v2': ['🍁','🍃','🍂','🌰', '🍄', '💧', '🥕', '🌸', '☁️'],
      'm1': ['🌵', '🌵', '▫️'],
      'm2': ['🌱', '🌱', '▫️'],
      'm3': ['🌲', '🌲', '▫️'],
      'm4': ['🌳', '🌳', '▫️'],
      'm5': ['🌴', '🌴', '▫️'],
      'm6': ['🌼', '🌺', '▫️'],
      'm7': ['🌻', '🌷', '▫️'],
    }
  const grammar = window.tracery.createGrammar(world);
  
  // The initial pattern. 
  // m : main
  // a : animal visitor
  // l : special leaf
  const pattern = fillArray('m'.repeat(NUM_COLS), NUM_ROWS);

  // Add random animal visitors.
  for (let i = 0; i <= NUM_VISITORS; i++) {
    const row = getRandomInt(NUM_ROWS) - 1;
    const col = getRandomInt(NUM_COLS) - 1;
    pattern[row] = setCharAt(pattern[row], col, 'a');
  }
  
  // Add random snaxx.
  for (let i = 0; i <= NUM_SNACKS; i++) {
    const row = getRandomInt(NUM_ROWS) - 1;
    const col = getRandomInt(NUM_COLS) - 1;
    pattern[row] = setCharAt(pattern[row], col, 'l');
  }
  
  // console.log(pattern);
  
  // Fill in the randoms with actual emoji
  const main = `#m${getRandomInt(7)}#`;
  for (let i = 0; i < pattern.length; i++) {
    pattern[i] = pattern[i].replace(/m/g, main);
    pattern[i] = pattern[i].replace(/a/g, '#v1#');
    pattern[i] = pattern[i].replace(/l/g, '#v2#');
  }
  
  //console.log(pattern);
  const box = pattern.join('\n');
  const story = grammar.flatten(box);
  
  let output = document.getElementById('output');
  output.innerText = story;
  //console.log(story);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}