var points = [];
var canvasP5;
var videoP5;

var vidW = 640;
var vidH = 480;
var vidX = 0;
var vidY = 100;

var hitbox = {
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  avgX: 0,
  avgY: 0,
  display: function() {
    //If an object can move
    if (canMove == true) {
      fill(0,255,0);
    }
    else {
      fill(255,0,0);
    }

    noStroke();
    //Hitbox
    rect(this.left, this.bottom, (this.right - this.left)*1.1, (this.top - this.bottom)*1.1 );
  }
}

var slider = [];

var eyeBrowLeft;
var eyeBrowRight;
var canMove;


function setup() {
  videoP5 = createCapture(VIDEO);
  videoP5.id("video");
  videoP5.size(vidW, vidH);
  videoP5.position(vidX, vidY);

  canvasP5 = createCanvas(vidW, vidH);
  canvasP5.position(vidX, vidY);

  var tracker = new tracking.LandmarksTracker();
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    if(!event.data) return;
    event.data.landmarks.forEach(function(landmarks) {
      points = [];
      for(var l in landmarks){
        points.push({x: landmarks[l][0], y: landmarks[l][1]});
      }
    });

  });

  colorMode(RGB, 255, 255, 255, 1);


  //Creating BLOCKS
  slider[1] = new createBlock(1, 420, 160, 2, 1, 0, 1);
  slider[0] = new createBlock(0, 20, 0, 2, 2, 1, 0);
  slider[2] = new createBlock(2, 420, 0, 2, 2, 1, 1);
}

function draw() {
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(videoP5, 0, 0);

  eyeBrowsRaised();

  //Displaying Points
  fill(0, 255, 0);
  for (var i = 0; i < points.length; i++) {
    text(i, points[i].x, points[i].y);
  }


  //Displaying Everything
  if (points.length > 24) {

    eyeBrowRight = points[20].y - points[10].y;
    eyeBrowLeft = points[25].y - points[13].y;

    //Hitbox Coords
    hitbox.left = points[16].x;
    hitbox.right = points[18].x;
    hitbox.bottom = points[15].y;
    hitbox.top = points[17].y;
    hitbox.avgX = (hitbox.left+hitbox.right)/2;
    hitbox.avgY = (hitbox.bottom+hitbox.top)/2;

    hitbox.display();
  }

  for (var i = 0; i < slider.length; i++) {
    slider[i].moves();
    slider[i].collision();
    slider[i].boundary();
    slider[i].display();

  }
}


function eyeBrowsRaised() {
  if (points.length > 24) {
    if ( eyeBrowLeft > 26 || eyeBrowRight > 26) {
      canMove = true;
    }
    else {
      canMove = false;
    }
  }
}

function createBlock(id, x, y, w, h, type, direction) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.w = w*100;
  this.h = h*80;
  //0 = KEY, 1 = BLOCK
  this.type = type;
  //0 = UP/DOWN, 1 = RIGHT/LEFT
  this.direction = direction;

  this.display = function() {
    if (this.type == 0) {
      fill(255,0,0, .5);
    }
    else if (this.type == 1) {
      fill(0,255,0, .5);
    }
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }

  this.boundary = function() {
    if (this.x < 20) {
      this.x = 20;
      }
    else if (this.x+this.w > 620) {
      this.x = 620-this.w;
      }
    else if (this.y < 0) {
      this.y = 0;
      }
    else if (this.y+this.h > 480) {
      this.y = 480-this.h;
      }
  }


  this.collision = function() {
    for (var i = this.id+1; i < slider.length; i++) {
      if (this.x < slider[i].x+slider[i].w && this.x+this.w > slider[i].x && this.y < slider[i].y && this.y+this.h > slider[i].y && this.direction == 0) {
        this.y = slider[i].y-this.h;
        console.log("true")
      }
      else if (this.x < slider[i].x+slider[i].w && this.x+this.w > slider[i].x && this.y < slider[i].y+slider[i].h && this.y+this.h > slider[i].y+slider[i].h && this.direction == 0) {
        this.y = slider[i].y+slider[i].h;
      }
      if (this.x < slider[i].x && this.x+this.w > slider[i].x && this.y+this.h > slider[i].y && this.y < slider[i].y+slider[i].h && this.direction == 1) {
        this.x = slider[i].x-this.w;
      }
      else if (this.x < slider[i].x+slider[i].w && this.x > slider[i].x && this.y+this.h > slider[i].y && this.y < slider[i].y+slider[i].h && this.direction == 1) {
        this.x = slider[i].x+slider[i].w;
      }
    }

    for (var i = 0; i < this.id; i++) {
      if (this.x < slider[i].x+slider[i].w && this.x+this.w > slider[i].x && this.y < slider[i].y && this.y+this.h > slider[i].y && this.direction == 0) {
        this.y = slider[i].y-this.h;
      }
      else if (this.x < slider[i].x+slider[i].w && this.x+this.w > slider[i].x && this.y < slider[i].y+slider[i].h && this.y+this.h > slider[i].y+slider[i].h && this.direction == 0) {
        this.y = slider[i].y+slider[i].h;
      }
      if (this.x < slider[i].x && this.x+this.w > slider[i].x && this.y+this.h > slider[i].y && this.y < slider[i].y+slider[i].h && this.direction == 1) {
        this.x = slider[i].x-this.w;
      }
      else if (this.x < slider[i].x+slider[i].w && this.x > slider[i].x && this.y+this.h > slider[i].y && this.y < slider[i].y+slider[i].h && this.direction == 1) {
        this.x = slider[i].x+slider[i].w;
      }
    }

  }




  this.moves = function() {
    //canMove == true
    if (640-mouseX > this.x && 640-mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y+this.h) && mouseIsPressed) {
      if (this.direction == 1) {
        // this.x = hitbox.avgX-50;
        this.x = 640-mouseX-50;
      }
      else if (this.direction == 0) {
        this.y = mouseY-40;
        // this.y = hitbox.avgY-40;
      }
    }
  }
}
