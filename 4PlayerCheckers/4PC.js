//Pieces
  //0-5 = Red
  //6-11 = Blye
  //12-17 = Green
  //18-23 = Yellow
var pieces = [];

//Number of pieces
var numberOfPieces = [6,6,6,6]

//Tiles
var cb = [];

//Location Variables
var clickedSquare = 0;
var clickedPiece = 0;

//Extra Variables
var turn = 0
var time = 0;
var resetTime = 0;
var z = 0;


function setup() {
  createCanvas(800,500);

  //Selecting Turn
  turn = random([0,1,2,3]);

  //Constructing Tiles
  for(var i = 0; i < 50; i+=10) {
    cb[i]   = new MakeTile(i, 25+(i/10)*100, 25);
    cb[i+1] = new MakeTile(i+1, 75+(i/10)*100, 75);
    cb[i+2] = new MakeTile(i+2, 25+(i/10)*100, 125);
    cb[i+3] = new MakeTile(i+3, 75+(i/10)*100, 175);
    cb[i+4] = new MakeTile(i+4, 25+(i/10)*100, 225);
    cb[i+5] = new MakeTile(i+5, 75+(i/10)*100, 275);
    cb[i+6] = new MakeTile(i+6, 25+(i/10)*100, 325);
    cb[i+7] = new MakeTile(i+7, 75+(i/10)*100, 375);
    cb[i+8] = new MakeTile(i+8, 25+(i/10)*100, 425);
    cb[i+9] = new MakeTile(i+9, 75+(i/10)*100, 475);

  }

  //Setting cb[].tileColor
  for(var i = 0; i<6; i++) {
    cb[2+i].tileColor = 4;
    cb[42+i].tileColor = 2;
  }
  for(var i = 0; i <3; i++) {
    cb[10+10*i].tileColor = 1;
    cb[11+10*i].tileColor = 1;
    cb[18+10*i].tileColor = 3;
    cb[19+10*i].tileColor = 3;
  }

  //Constructing Pieces
{
  pieces[0]   = new MakePiece(0, 125, 25, 1, 10);
  pieces[1]   = new MakePiece(1, 225, 25, 1, 20);
  pieces[2]   = new MakePiece(2, 325, 25, 1, 30);
  pieces[3]   = new MakePiece(3, 175, 75, 1, 11);
  pieces[4]   = new MakePiece(4, 275, 75, 1, 21);
  pieces[5]   = new MakePiece(5, 375, 75, 1, 31);

  pieces[6]   = new MakePiece(6, 425, 125, 2, 42);
  pieces[7]   = new MakePiece(7, 425, 225, 2, 44);
  pieces[8]   = new MakePiece(8, 425, 325, 2, 46);
  pieces[9]   = new MakePiece(9, 475, 175, 2, 43);
  pieces[10]  = new MakePiece(10, 475, 275, 2, 45);
  pieces[11]  = new MakePiece(11, 475, 375, 2, 47);

  pieces[12]  = new MakePiece(12, 125, 425, 3, 18);
  pieces[13]  = new MakePiece(13, 225, 425, 3, 28);
  pieces[14]  = new MakePiece(14, 325, 425, 3, 38);
  pieces[15]  = new MakePiece(15, 175, 475, 3, 19);
  pieces[16]  = new MakePiece(16, 275, 475, 3, 29);
  pieces[17]  = new MakePiece(17, 375, 475, 3, 39);

  pieces[18]  = new MakePiece(18, 25, 125, 4, 2);
  pieces[19]  = new MakePiece(19, 25, 225, 4, 4);
  pieces[20]  = new MakePiece(20, 25, 325, 4, 6);
  pieces[21]  = new MakePiece(21, 75, 175, 4, 3);
  pieces[22]  = new MakePiece(22, 75, 275, 4, 5);
  pieces[23]  = new MakePiece(23, 75, 375, 4, 7);
}

  //Setting cb[].piece
{
  cb[10].piece = 0;
  cb[11].piece = 3;
  cb[20].piece = 1;
  cb[21].piece = 4;
  cb[30].piece = 2;
  cb[31].piece = 5;

  cb[42].piece = 6;
  cb[43].piece = 9;
  cb[44].piece = 7;
  cb[45].piece = 10;
  cb[46].piece = 8;
  cb[47].piece = 11;

  cb[18].piece = 12;
  cb[19].piece = 15;
  cb[28].piece = 13;
  cb[29].piece = 16;
  cb[38].piece = 15;
  cb[39].piece = 17;

  cb[2].piece = 18;
  cb[3].piece = 21;
  cb[4].piece = 19;
  cb[5].piece = 22;
  cb[6].piece = 20;
  cb[7].piece = 23;
}


}

function draw() {
  background(255);
  mousePressed();

  //Time
  time += 100;
  resetTime += 100;

  //Side Bar and Gameboard
  piecesLeft();
  turnDisplay();
  checkerBoard();
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].display();
  }

  //Movement
  movePiece();
  attackPiece();


  //Reset Button
  fill(0);
  rect(520, 340, 100, 50);
  fill(255);
  textSize(28.5);
  text("RESET", 522, 376);

  //Resets all Variables
  if (reset() && resetTime > 10000) {
    pieces = [];
    numberOfPieces = [6,6,6,6]
    cb = [];
    clickedSquare = 0;
    clickedPiece = 0;
    turn = 0
    time = 0;
    resetTime = 0;
    z = 0;

    turn = random([0,1,2,3]);

    //Constructing Tiles
    for(var i = 0; i < 50; i+=10) {
      cb[i]   = new MakeTile(i, 25+(i/10)*100, 25);
      cb[i+1] = new MakeTile(i+1, 75+(i/10)*100, 75);
      cb[i+2] = new MakeTile(i+2, 25+(i/10)*100, 125);
      cb[i+3] = new MakeTile(i+3, 75+(i/10)*100, 175);
      cb[i+4] = new MakeTile(i+4, 25+(i/10)*100, 225);
      cb[i+5] = new MakeTile(i+5, 75+(i/10)*100, 275);
      cb[i+6] = new MakeTile(i+6, 25+(i/10)*100, 325);
      cb[i+7] = new MakeTile(i+7, 75+(i/10)*100, 375);
      cb[i+8] = new MakeTile(i+8, 25+(i/10)*100, 425);
      cb[i+9] = new MakeTile(i+9, 75+(i/10)*100, 475);

    }

    //Tile Color
    for(var i = 0; i<6; i++) {
      cb[2+i].tileColor = 4;
      cb[42+i].tileColor = 2;
    }
    for(var i = 0; i <3; i++) {
      cb[10+10*i].tileColor = 1;
      cb[11+10*i].tileColor = 1;
      cb[18+10*i].tileColor = 3;
      cb[19+10*i].tileColor = 3;
    }

    //Constructing Pieces
  {
    pieces[0]   = new MakePiece(0, 125, 25, 1, 10);
    pieces[1]   = new MakePiece(1, 225, 25, 1, 20);
    pieces[2]   = new MakePiece(2, 325, 25, 1, 30);
    pieces[3]   = new MakePiece(3, 175, 75, 1, 11);
    pieces[4]   = new MakePiece(4, 275, 75, 1, 21);
    pieces[5]   = new MakePiece(5, 375, 75, 1, 31);

    pieces[6]   = new MakePiece(6, 425, 125, 2, 42);
    pieces[7]   = new MakePiece(7, 425, 225, 2, 44);
    pieces[8]   = new MakePiece(8, 425, 325, 2, 46);
    pieces[9]   = new MakePiece(9, 475, 175, 2, 43);
    pieces[10]  = new MakePiece(10, 475, 275, 2, 45);
    pieces[11]  = new MakePiece(11, 475, 375, 2, 47);

    pieces[12]  = new MakePiece(12, 125, 425, 3, 18);
    pieces[13]  = new MakePiece(13, 225, 425, 3, 28);
    pieces[14]  = new MakePiece(14, 325, 425, 3, 38);
    pieces[15]  = new MakePiece(15, 175, 475, 3, 19);
    pieces[16]  = new MakePiece(16, 275, 475, 3, 29);
    pieces[17]  = new MakePiece(17, 375, 475, 3, 39);

    pieces[18]  = new MakePiece(18, 25, 125, 4, 2);
    pieces[19]  = new MakePiece(19, 25, 225, 4, 4);
    pieces[20]  = new MakePiece(20, 25, 325, 4, 6);
    pieces[21]  = new MakePiece(21, 75, 175, 4, 3);
    pieces[22]  = new MakePiece(22, 75, 275, 4, 5);
    pieces[23]  = new MakePiece(23, 75, 375, 4, 7);
  }
    //Piece to Tile
  {
    cb[10].piece = 0;
    cb[11].piece = 3;
    cb[20].piece = 1;
    cb[21].piece = 4;
    cb[30].piece = 2;
    cb[31].piece = 5;

    cb[42].piece = 6;
    cb[43].piece = 9;
    cb[44].piece = 7;
    cb[45].piece = 10;
    cb[46].piece = 8;
    cb[47].piece = 11;

    cb[18].piece = 12;
    cb[19].piece = 15;
    cb[28].piece = 13;
    cb[29].piece = 16;
    cb[38].piece = 15;
    cb[39].piece = 17;

    cb[2].piece = 18;
    cb[3].piece = 21;
    cb[4].piece = 19;
    cb[5].piece = 22;
    cb[6].piece = 20;
    cb[7].piece = 23;
  }

  }

}

//Reset
function reset() {
  if (mouseX > 520 && mouseX < 620 && mouseY > 340 && mouseY < 390 && mouseIsPressed) {
    return true;
  }
}

//Side Bar and Gameboard
function piecesLeft() {
  textSize(20);
  fill(0);
  text("Pieces Left:", 520, 180);
  fill(255,0,0);
  for (var i = 0; i < numberOfPieces[0]; i++) {
    ellipse(530+20*i, 205, 20);
  }
  fill(0,0,255);
  for (var i = 0; i < numberOfPieces[1]; i++) {
    ellipse(530+20*i, 235, 20);
  }
  fill(0,255,0);
  for (var i = 0; i < numberOfPieces[2]; i++) {
    ellipse(530+20*i, 265, 20);
  }
  fill(255,255,0);
  for (var i = 0; i < numberOfPieces[3]; i++) {
    ellipse(530+20*i, 295, 20);
  }
}
function turnDisplay() {
  if (turn == 0) {
    fill(255,0,0);
    textSize(20);
    text("Red's Turn", 520, 100);
    noStroke();
    ellipse(560, 130, 40);
  }
  else if (turn == 1) {
    fill(0,0,255);
    textSize(20);
    text("Blue's Turn", 520, 100);
    noStroke();
    ellipse(560, 130, 40);
  }
  else if (turn == 2) {
    fill(0,255,0);
    textSize(20);
    text("Green's Turn", 520, 100);
    noStroke();
    ellipse(560, 130, 40);
  }
  else if (turn == 3) {
    fill(255,255,0);
    textSize(20);
    text("Yellow's Turn", 520, 100);
    noStroke();
    ellipse(560, 130, 40);
  }
}
function checkerBoard() {
  for (var i = 0; i<5; i++) {
    for (var j = 0; j<5; j++) {
      fill(z);
      //Odd Rows
      noStroke();
      rect(i*100, j*100, 50, 50);
      //Even Rows
      noStroke();
      rect((i*100)+50, (j*100)+50, 50, 50);
    }
  }

  stroke(0);
  strokeWeight(4);
  line(0,0,0,500);
  line(0,0,500,0);
  line(500,0,500,500);
  line(0,500,500,500);
}

//Movement
function movePiece() {
      if (turn == 0 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 0 && clickedPiece < 6 && checkMove()) {
        pieces[clickedPiece].x = cb[clickedSquare].x;
        pieces[clickedPiece].y = cb[clickedSquare].y;
        cb[pieces[clickedPiece].tile].tileColor = 0;
        cb[pieces[clickedPiece].tile].piece = -1;
        pieces[clickedPiece].tile = clickedSquare;
        cb[clickedSquare].tileColor = 1;
        cb[clickedSquare].piece = clickedPiece;

        if (numberOfPieces[1] > 0) {
          turn = 1;
          time = 0;
        }
        else if (numberOfPieces[1] == 0 && numberOfPieces[2] > 0) {
          turn = 2;
          time = 0;
        }
        else if (numberOfPieces[1] == 0 && numberOfPieces[2] == 0 && numberOfPieces[3] > 0) {
          turn = 3;
          time = 0;
        }
        else {
          turn = 0;
          time = 0;
          z = color(255,0,0);
        }

        }
      else if (turn == 1 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 6 && clickedPiece < 12 && checkMove()) {
        pieces[clickedPiece].x = cb[clickedSquare].x;
        pieces[clickedPiece].y = cb[clickedSquare].y;
        cb[pieces[clickedPiece].tile].tileColor = 0;
        cb[pieces[clickedPiece].tile].piece = -1;
        pieces[clickedPiece].tile = clickedSquare;
        cb[clickedSquare].tileColor = 2;
        cb[clickedSquare].piece = clickedPiece;

        if (numberOfPieces[2] > 0) {
          turn = 2;
          time = 0;
        }
        else if (numberOfPieces[2] == 0 && numberOfPieces[3] > 0) {
          turn = 3;
          time = 0;
        }
        else if (numberOfPieces[2] == 0 && numberOfPieces[3] == 0 && numberOfPieces[0] > 0) {
          turn = 0;
          time = 0;
        }
        else {
          turn = 1;
          time = 0;
          z = color(0,0,255);
        }

        }
      else if (turn == 2 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 12 && clickedPiece < 18 && checkMove()) {
        pieces[clickedPiece].x = cb[clickedSquare].x;
        pieces[clickedPiece].y = cb[clickedSquare].y;
        cb[pieces[clickedPiece].tile].tileColor = 0;
        cb[pieces[clickedPiece].tile].piece = -1;
        pieces[clickedPiece].tile = clickedSquare;
        cb[clickedSquare].tileColor = 3;
        cb[clickedSquare].piece = clickedPiece;

        if (numberOfPieces[3] > 0) {
          turn = 3;
          time = 0;
        }
        else if (numberOfPieces[3] == 0 && numberOfPieces[0] > 0) {
          turn = 0;
          time = 0;
        }
        else if (numberOfPieces[3] == 0 && numberOfPieces[0] == 0 && numberOfPieces[1] > 0) {
          turn = 1;
          time = 0;
        }
        else {
          turn = 2;
          time = 0;
          z = color(0,255,0);
        }
        }
      else if (turn == 3 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >=18 && clickedPiece < 24 && checkMove()){
        pieces[clickedPiece].x = cb[clickedSquare].x;
        pieces[clickedPiece].y = cb[clickedSquare].y;
        cb[pieces[clickedPiece].tile].tileColor = 0;
        cb[pieces[clickedPiece].tile].piece = -1;
        pieces[clickedPiece].tile = clickedSquare;
        cb[clickedSquare].tileColor = 4;
        cb[clickedSquare].piece = clickedPiece;

        if (numberOfPieces[0] > 0) {
          turn = 0;
          time = 0;
        }
        else if (numberOfPieces[0] == 0 && numberOfPieces[1] > 0) {
          turn = 1;
          time = 0;
        }
        else if (numberOfPieces[0] == 0 && numberOfPieces[1] == 0 && numberOfPieces[2] > 0) {
          turn = 2;
          time = 0;
        }
        else {
          turn = 3;
          time = 0;
          z = color(255,255,0);
        }
        }
}
function attackPiece() {
  if (turn == 0 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 0 && clickedPiece < 6 && checkAttack()) {
    attack();
    pieces[clickedPiece].x = cb[clickedSquare].x;
    pieces[clickedPiece].y = cb[clickedSquare].y;
    cb[pieces[clickedPiece].tile].tileColor = 0;
    cb[pieces[clickedPiece].tile].piece = -1;
    pieces[clickedPiece].tile = clickedSquare;
    cb[clickedSquare].tileColor = 1;
    cb[clickedSquare].piece = clickedPiece;

    if (numberOfPieces[1] > 0) {
      turn = 1;
      time = 0;
    }
    else if (numberOfPieces[1] == 0 && numberOfPieces[2] > 0) {
      turn = 2;
      time = 0;
    }
    else if (numberOfPieces[1] == 0 && numberOfPieces[2] == 0 && numberOfPieces[3] > 0) {
      turn = 3;
      time = 0;
    }
    else {
      turn = 0;
      time = 0;
      z = color(255,0,0);
    }

    }
  else if (turn == 1 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 6 && clickedPiece < 12 && checkAttack()) {
    attack();
    pieces[clickedPiece].x = cb[clickedSquare].x;
    pieces[clickedPiece].y = cb[clickedSquare].y;
    cb[pieces[clickedPiece].tile].tileColor = 0;
    cb[pieces[clickedPiece].tile].piece = -1;
    pieces[clickedPiece].tile = clickedSquare;
    cb[clickedSquare].tileColor = 2;
    cb[clickedSquare].piece = clickedPiece;

    if (numberOfPieces[2] > 0) {
      turn = 2;
      time = 0;
    }
    else if (numberOfPieces[2] == 0 && numberOfPieces[3] > 0) {
      turn = 3;
      time = 0;
    }
    else if (numberOfPieces[2] == 0 && numberOfPieces[3] == 0 && numberOfPieces[0] > 0) {
      turn = 0;
      time = 0;
    }
    else {
      turn = 1;
      time = 0;
      z = color(0,0,255);
    }

    }
  else if (turn == 2 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >= 12 && clickedPiece < 18 && checkAttack()) {
    attack();
    pieces[clickedPiece].x = cb[clickedSquare].x;
    pieces[clickedPiece].y = cb[clickedSquare].y;
    cb[pieces[clickedPiece].tile].tileColor = 0;
    cb[pieces[clickedPiece].tile].piece = -1;
    pieces[clickedPiece].tile = clickedSquare;
    cb[clickedSquare].tileColor = 3;
    cb[clickedSquare].piece = clickedPiece;

    if (numberOfPieces[3] > 0) {
      turn = 3;
      time = 0;
    }
    else if (numberOfPieces[3] == 0 && numberOfPieces[0] > 0) {
      turn = 0;
      time = 0;
    }
    else if (numberOfPieces[3] == 0 && numberOfPieces[0] == 0 && numberOfPieces[1] > 0) {
      turn = 1;
      time = 0;
    }
    else {
      turn = 2;
      time = 0;
      z = color(0,255,0);
    }

    }
  else if (turn == 3 && mouseIsPressed && time > 10000 && cb[clickedSquare].tileColor == 0 && clickedPiece >=18 && clickedPiece < 24 && checkAttack()){
    attack();
    pieces[clickedPiece].x = cb[clickedSquare].x;
    pieces[clickedPiece].y = cb[clickedSquare].y;
    cb[pieces[clickedPiece].tile].tileColor = 0;
    cb[pieces[clickedPiece].tile].piece = -1;
    pieces[clickedPiece].tile = clickedSquare;
    cb[clickedSquare].tileColor = 4;
    cb[clickedSquare].piece = clickedPiece;

    if (numberOfPieces[0] > 0) {
      turn = 0;
      time = 0;
    }
    else if (numberOfPieces[0] == 0 && numberOfPieces[1] > 0) {
      turn = 1;
      time = 0;
    }
    else if (numberOfPieces[0] == 0 && numberOfPieces[1] == 0 && numberOfPieces[2] > 0) {
      turn = 2;
      time = 0;
    }
    else {
      turn = 3;
      time = 0;
      z = color(255,255,0);
    }

    }
}

//Check Movement Functions
function checkMove() {
  if (pieces[clickedPiece].tile%2 == 0) {
    if (clickedSquare == pieces[clickedPiece].tile-1 || clickedSquare == pieces[clickedPiece].tile+1 || clickedSquare == pieces[clickedPiece].tile-9 || clickedSquare == pieces[clickedPiece].tile-11) {
      return true;
    }
    else {
      return false;
    }
  }
  else if (pieces[clickedPiece].tile%2 == 1) {
    if (clickedSquare == pieces[clickedPiece].tile-1 || clickedSquare == pieces[clickedPiece].tile+1 || clickedSquare == pieces[clickedPiece].tile+9 || clickedSquare == pieces[clickedPiece].tile+11) {
      return true;
    }
    else {
      return false;
    }
  }
}
function checkAttack() {
  if (pieces[clickedPiece].tile%2 == 0) {
    if (clickedSquare == pieces[clickedPiece].tile+8 && cb[pieces[clickedPiece].tile-1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-1].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+12 && cb[pieces[clickedPiece].tile+1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+1].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-8 && cb[pieces[clickedPiece].tile-9].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-9].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-12 && cb[pieces[clickedPiece].tile-11].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-11].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else {
      return false;
    }
  }
  else if (pieces[clickedPiece].tile%2 == 1) {
    if (clickedSquare == pieces[clickedPiece].tile-12 && cb[pieces[clickedPiece].tile-1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-1].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-8 && cb[pieces[clickedPiece].tile+1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+1].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+8 && cb[pieces[clickedPiece].tile+9].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+9].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+12 && cb[pieces[clickedPiece].tile+11].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+11].tileColor !== pieces[clickedPiece].color) {
      return true;
    }
    else {
      return false;
    }
  }
}
function attack() {
  if (pieces[clickedPiece].tile%2 == 0) {
    if (clickedSquare == pieces[clickedPiece].tile+8 && cb[pieces[clickedPiece].tile-1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-1].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile-1].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile-1].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile-1].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile-1].tileColor = 0;
      cb[pieces[clickedPiece].tile-1].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+12 && cb[pieces[clickedPiece].tile+1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+1].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile+1].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile+1].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile+1].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile+1].tileColor = 0;
      cb[pieces[clickedPiece].tile+1].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-8 && cb[pieces[clickedPiece].tile-9].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-9].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile-9].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile-9].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile-9].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile-9].tileColor = 0;
      cb[pieces[clickedPiece].tile-9].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-12 && cb[pieces[clickedPiece].tile-11].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-11].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile-11].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile-11].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile-11].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile-11].tileColor = 0;
      cb[pieces[clickedPiece].tile-11].piece = -1;
    }

  }
  else if (pieces[clickedPiece].tile%2 == 1) {
    if (clickedSquare == pieces[clickedPiece].tile-12 && cb[pieces[clickedPiece].tile-1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile-1].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile-1].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile-1].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile-1].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile-1].tileColor = 0;
      cb[pieces[clickedPiece].tile-1].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile-8 && cb[pieces[clickedPiece].tile+1].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+1].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile+1].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile+1].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile+1].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile+1].tileColor = 0;
      cb[pieces[clickedPiece].tile+1].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+8 && cb[pieces[clickedPiece].tile+9].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+9].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile+9].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile+9].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile+9].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile+9].tileColor = 0;
      cb[pieces[clickedPiece].tile+9].piece = -1;
    }
    else if (clickedSquare == pieces[clickedPiece].tile+12 && cb[pieces[clickedPiece].tile+11].tileColor !== 0 &&  cb[pieces[clickedPiece].tile+11].tileColor !== pieces[clickedPiece].color) {
      pieces[cb[pieces[clickedPiece].tile+11].piece].x = 1000;
      pieces[cb[pieces[clickedPiece].tile+11].piece].y = 1000;
      numberOfPieces[cb[pieces[clickedPiece].tile+11].tileColor-1] -= 1;
      cb[pieces[clickedPiece].tile+11].tileColor = 0;
      cb[pieces[clickedPiece].tile+11].piece = -1;
    }
  }
}

//Runs Piece/Tile checkMouse Function
function mousePressed() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].checkMouse();
  }
  for (var i = 0; i < cb.length; i++) {
    cb[i].checkMouse();
  }

}

//Piece and Tile Object Constructors
function MakePiece(id, x, y, color, tile) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.color = color;
  this.tile = tile;

  this.checkMouse = function() {
    if (mouseX < this.x+20 && mouseX > this.x-20 && mouseY < this.y+20 && mouseY > this.y-20 && mouseIsPressed) {
      clickedPiece = this.id;
    }
  }
  this.display = function() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, 42);
    if (this.color == 1) {
      fill(255,0,0);
    }
    else if (this.color == 2) {
      fill(0,0,255);
    }
    else if (this.color == 3) {
      fill(0,255,0);
    }
    else if (this.color == 4) {
      fill(255,255,0);
    }

    ellipse(this.x, this.y, 40);

    if (turn == 0 && clickedPiece == this.id && clickedPiece >=0 && clickedPiece <6) {
      fill(0);
      ellipse(this.x, this.y, 10);
    }
    else if (turn == 1 && clickedPiece == this.id && clickedPiece >=6 && clickedPiece <12) {
      fill(0);
      ellipse(this.x, this.y, 10);
    }
    else if (turn == 2 && clickedPiece == this.id && clickedPiece >=12 && clickedPiece <18) {
      fill(0);
      ellipse(this.x, this.y, 10);
    }
    else if (turn == 3 && clickedPiece == this.id && clickedPiece >=18 && clickedPiece <24) {
      fill(0);
      ellipse(this.x, this.y, 10);
    }
  }
}
function MakeTile(id, x, y) {
  this.x = x;
  this.y = y;
  this.id = id;

  //Tile Colors
    //0 = Nothing
    //1 = Red
    //2 = Blue
    //3 = Green
    //4 = Yellow
  this.tileColor = 0;
  this.piece = -1;

  this.checkMouse = function() {
    if (mouseX < this.x+25 && mouseX > this.x-25 && mouseY < this.y+25 && mouseY > this.y-25 && mouseIsPressed) {
      clickedSquare = this.id;
      }
    }

  }
