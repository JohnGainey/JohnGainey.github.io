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

var eyeBrowLeftAVG = 0;
var eyeBrowRightAVG = 0;
var counter = 0;

var eyeBrowLeft;
var eyeBrowRight;
var canMove;

//Current Level/Level to switch to
var win = 0;


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


  //Alert with Game Name and Rules
  alert("Welcome to My Slider Puzzle \nTo play this puzzle Lower your Eyebrows to move around. Raise your Eyebrows while over a block to move it and Lower them to release it. Keep your face at the same distance from the screen while playing.");

  //Creating BFirst Level
  slider[0] = new CreateBlock(0, 420, 160, 2, 1, 0, 1);
  slider[1] = new CreateBlock(1, 320, 0, 3, 1, 1, 1);
  slider[2] = new CreateBlock(2, 220, 0, 1, 2, 1, 0);
  slider[3] = new CreateBlock(3, 20, 80, 2, 1, 1, 1);
  slider[4] = new CreateBlock(4, 320, 80, 1, 3, 1, 0);
  slider[5] = new CreateBlock(5, 0, 160, 1, 3, 1, 0);
  slider[6] = new CreateBlock(6, 120, 240, 2, 1, 1, 1);
  slider[7] = new CreateBlock(7, 120, 320, 1, 2, 1, 0);
  slider[8] = new CreateBlock(8, 220, 320, 3, 1, 1, 1);
  slider[9] = new CreateBlock(9, 220, 400, 2, 1, 1, 1);
  slider[10] = new CreateBlock(10, 420, 400, 2, 1, 1, 1);
  slider[11] = new CreateBlock(11, 520, 240, 1, 2, 1, 0);
}

function draw() {
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(videoP5, 0, 0);

  eyeBrowsRaised();


  if (win == 0) {
    //Hitbox Coords
    if (points.length > 24) {

      if (counter <= 30) {
        eyeBrowLeftAVG += points[25].y - points[13].y;
        eyeBrowRightAVG += points[20].y - points[10].y;
        counter += 1;
      }
      if (counter == 30) {
        eyeBrowRightAVG = eyeBrowRightAVG/counter;
        eyeBrowLeftAVG = eyeBrowLeftAVG/counter;
        counter += 1;
      }

      eyeBrowRight = points[20].y - points[10].y;
      eyeBrowLeft = points[25].y - points[13].y;

      hitbox.left = points[16].x;
      hitbox.right = points[18].x;
      hitbox.bottom = points[15].y;
      hitbox.top = points[17].y;
      hitbox.avgX = (hitbox.left+hitbox.right)/2;
      hitbox.avgY = (hitbox.bottom+hitbox.top)/2;
      hitbox.display();
    }


    for (var i = 0; i < slider.length; i++) {
      slider[i].win();
      slider[i].moves();
      slider[i].collision();
      slider[i].boundary();
      slider[i].display();

    }

    boundary();
  }

  if (win == 1) {
    alert("You have won my puzzle");
    win += 1;
  }

  if (win == 2) {
    if (points.length > 24) {
      noStroke();
      fill(255);
      beginShape();
      for (var i = 0; i < 9; i++) {
        vertex(points[i].x, points[i].y);
      }
      for (var i = 14; i >= 9; i--) {
        vertex(points[i].x, points[i].y);
      }
      endShape();

      fill(0);
      beginShape();
        for (var i = 27; i < 31; i++) {
          vertex(points[i].x, points[i].y);
        }
      endShape();
      beginShape();
        for (var i = 19; i < 23; i++) {
          vertex(points[i].x, points[i].y);
        }
      endShape();
      beginShape();
        for (var i = 23; i < 27; i++) {
          vertex(points[i].x, points[i].y);
        }
      endShape();
    }
  }
}

//To check if Eyebrows are raised
function eyeBrowsRaised() {
  if (points.length > 24) {
    if ( eyeBrowLeft > eyeBrowLeftAVG*1.1 || eyeBrowRight > eyeBrowRightAVG*1.1) {
      canMove = true;
    }
    else {
      canMove = false;
    }
  }
}

function boundary() {
  //Displaying End Point and boundary
  strokeWeight(5);
  line(20,0,620,0);
  line(20,480,620,480);
  line(620,0,620,480);
  line(20,0,20,160);
  line(20,240,20,480);
  line(20,160,0,160);
  line(20,240,0,240);
  fill(0);
  rect(0,0,20,160);
  rect(0,240,20,240);
  rect(620,0,20,480);
}

function CreateBlock(id, x, y, w, h, type, direction) {
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

//To check if the Block is hitting the sides
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


//To check if the Block is hitting any other blocks
  this.collision = function() {
    for (var i = this.id+1; i < slider.length; i++) {
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

  this.win = function() {
    if (this.type == 0) {
      if (this.x < 30) {
        win += 1;
      }
    }
  }

//To move the block w/ your nose
  this.moves = function() {
    if (hitbox.avgX > this.x && hitbox.avgX < (this.x + this.w) && hitbox.avgY > this.y && hitbox.avgY < (this.y+this.h) && canMove == true) {
      if (this.direction == 1) {
        // this.x = hitbox.avgX-50;
        this.x = hitbox.avgX-(this.w/2);
      }
      else if (this.direction == 0) {
        this.y = hitbox.avgY-(this.h/2);
        // this.y = hitbox.avgY-40;
      }
    }
  }
}
