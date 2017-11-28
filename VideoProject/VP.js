var video;

var vScale = 10;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(255, 0, 0);

  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      // calculate average of pixel values
      var c = (r+g+b)/3;

      // fill the pixel values with this color
      fill(r,g,b);

      rectMode(CENTER);
      rect(x*vScale, y*vScale, vScale, vScale);
    }
  }

}
