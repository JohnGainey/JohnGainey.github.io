
var speed = 0;
var t = 0;


function setup() {
  createCanvas(400,400)
}

function draw() {
  background(0);
  t+= 1/60;

  fill(255);
  textSize(20);
  text(t, 100, 100);
}
