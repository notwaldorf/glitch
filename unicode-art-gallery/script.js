const SHAPES = ['◧','◨','◩','◪','◫','○','◍','●','◐','◑','◒','◓','◔','◕','◖','◗','▰','▱','△','▼','▽','◆','◇','◈','◊',,'◭','◮'];
const GOODBOYS = ['▤','▥','▦','▧','▨','◌','◬','◎','⍝', '⌁'];
const BUMP = ['◜','◝','◞','◟','◠','◡'];

const sketch = function(p) {
  isPaused = false;
  p.setup = function() {
    const start = performance.now();
    // Unclear if this is allowed.
    const rekt = p._userNode.getBoundingClientRect();
    p.createCanvas(Math.floor(rekt.width), Math.floor(rekt.height));
    p.background('white');
    p.noStroke();
    p.frameRate(0);
    
    requestAnimationFrame(() => p.loop());
    console.log('took', performance.now() - start); 
    
    document.getElementById('button').addEventListener('click', () => p.saveCanvas('myCanvas', 'jpg'));
  }
  
  
  p.loop = function() {
    if (!isPaused) {
      p.background('white');
      new Shape();
      new GoodBoy();
      new Bump();
      new Bump();
      
      p.fill('black');
      p.textSize(12);
      p.text('@notwaldorf', 4, p.height - 4);
    }
    setTimeout(() => window.requestAnimationFrame(() => p.loop()), 3000);
  }
  
  p.keyPressed = function() {
    if (p.key == 'p') {
      isPaused = !isPaused;
    } else if (p.key == 's') {
      p.saveCanvas('myCanvas', 'jpg');
    }
  }
  p.mousePressed = function() {
    isPaused = !isPaused;
  }
  
  function Shape() {
    this.x = -p.width/4;
    this.size = p.width * 2;
    
    this.color = randomColor();
    p.fill(this.color);
    p.textSize(this.size)
    p.text(getThing(SHAPES), this.x, p.height);
  }
  
  function GoodBoy(content) {
    this.x = p.random(-p.width/4, p.width/2);
    this.y = p.height - p.random(0, p.height/4);
    this.size = p.random(60, p.width * 2);
    this.color = randomColor();
    p.fill(this.color);
    p.textSize(this.size)
    p.text(getThing(GOODBOYS), this.x, this.y);
  }
  
  function Bump(content) {
    this.x = p.random(0, p.width/2);
    this.y = p.height - p.random(0, p.height/4);
    this.size = p.random(p.width / 2, p.width * 2);
    this.color = 'black';
    p.fill(this.color);
    p.textSize(this.size)
    p.text(getThing(BUMP), this.x, this.y);
  }
};
new p5(sketch, 'canvas-container');
    
function getThing(what) {
  return what[Math.floor(Math.random() * what.length)];
}