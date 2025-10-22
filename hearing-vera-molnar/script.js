// Globals for everyone!

// Initialize the canvas.
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let noteSequence;
let started = false;

const w = window.innerWidth / 2;
const h = window.innerHeight / 2;
const aThirdOfHeight = h / 3;
initCanvas();

// Start/stop on click.
document.body.addEventListener('click', () => {
  if (!started) {
    return;
  }
  
  if (player.isPlaying()) {
    player.stop();
  } else {
    mm.Player.tone.context.resume();
    player.start(noteSequence);
  }
});

// Initialize a Music VAE and a player to play it.
const mvae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');
const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player.callbackObject = {
  run: (note) => drawNote(note),
  stop: () => getSample()
};

mvae.initialize().then(async () => {
  const seq = await mvae.sample(1);
  noteSequence = seq[0];
  btnGo.disabled = false;
  btnGo.textContent = 'Ready!';
});

function go() {
  started = true;
  hello.hidden = true;
  canvas.hidden = false;
}

function drawNote(note) {
  const x = Math.random() * w;
  const y = Math.random() * aThirdOfHeight;
  
  // Vera Molnar drew things differently in the different thirds.
  if (note.instrument === 2) {
    drawOne(x, y);
  } else if (note.instrument === 1) {
    drawTwo(x, y + aThirdOfHeight);
  } else {
    drawThree(x, y + aThirdOfHeight + aThirdOfHeight);
  }
}
  
function getSample() {
  mvae.sample(1).then((ns) => {
    noteSequence = ns[0];
    player.start(ns[0], 80);
  });
}

/* 
 * Drawing bits from https://generativeartistry.com/tutorials/un-deux-trois/
 * Thanks Tim! @twholman
 */
function initCanvas() {
  const dpr = window.devicePixelRatio;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  context.scale(dpr, dpr);

  context.lineWidth = 4;
  context.lineCap = 'round';
}

const step = 20;
function draw(x, y, width, height, positions) {
  context.save();
  context.translate(x + width/2, y + height/2);
  context.rotate(Math.random() * 5);
  context.translate(-width/2, -height/2);

  for(var i = 0; i <= positions.length; i++) {
    context.beginPath();
    context.moveTo(positions[i] * width, 0);
    context.lineTo(positions[i] * width, height);
    context.stroke();
  }

  context.restore();
}

function drawOne(x, y) {
  draw(x, y, step, step, [0.5]); 
}
function drawTwo(x, y) {
  draw(x, y, step, step, [0.2, 0.8]);    
}
function drawThree(x, y) {
  draw(x, y, step, step, [0.1, 0.5, 0.9]);   
}
