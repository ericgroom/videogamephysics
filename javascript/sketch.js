var test = new Vue({
  el: '#test',
  data: {
    dy: 4
  }
});

function setup() {
  createCanvas(720, 400);
  stroke(255);
  y = height * 0.5;
  console.log(test.dy);
  test.dy = 2;
  console.log(test.dy);
}

function draw() {
 background(0);
 console.log(test.dy);
 y = y - test.dy;
 if (y < 0) {
   y = height;
 }
 line(0, y, width, y);
}
