new p5();

var cwidth;
var cheight;
function Thing(x, y, vx, vy, r) {
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.r = r;
  this.col = '#5F0EA6';

  this.display = function() {
    noStroke();
    fill(this.col);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r);
  }

  this.applyPhysics = function() {
    this.position.add(this.velocity);
    if (this.position.x + this.r >= cwidth() || this.position.x - this.r <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y + this.r >= cheight() || this.position.y - this.r <= 0) {
      this.velocity.y = -this.velocity.y;
    }
  }

  this.intersects = function(other) {
    var d = this.position.dist(other.position);
    return (d < (this.r + other.r))
  }

  this.changeColor = function(color) {
    this.col = color;
  }

  this.collide = function(other) {
    let temp = this.velocity;
    this.velocity = other.velocity;
    other.velocity = temp;
  }
}


var things;
var app;
function setup() {
  cwidth = () => $('#p5cnv')[0].offsetWidth;
  cheight = () => 300;
  var val = 2;
  app = new Vue({
    el: '#coll-wrap',
    data: {
      val: val
    },
    methods: {
      reset: function() {
        things = [];
        this.val = 0;
      },
      add: function() {
        things.push(createCircle());
        this.val++;
      },
      remove: function () {
        things.pop();
        this.val--;
      }
    }
  });
  function createCircle() {
    let r = random(20, 30);
    let xrange = cwidth() - r;
    let x = random(r, xrange);
    let yrange = cheight() - r;
    let y = random(r, yrange);
    let vx = random(0.1, 1);
    let vy = random(0.1, 1);
    let temp = new Thing(x, y, vx, vy, r)
    while(things.filter(x => x.collide(temp)).length != 0) {
      let x = random(r, xrange);
      let y = random(r, yrange);
      temp = new Thing(x, y, vx, vy, r)
    }
    return temp;
  }
  things = [];
  for (let i = 0; i < val; i++) {
    things.push(createCircle());
  }
  var cnv = createCanvas(cwidth(), cheight());
  cnv.parent('p5cnv');
}

function draw() {
  background(210);
  var white = '#FFFFFF';
  var purple = '#5F0EA6';
  things.map(x => x.display());
  things.map(x => x.applyPhysics());
  things.forEach((x, i) => {
    for(let j = 0; j < things.length; j++) {
      if (i != j && x.intersects(things[j])) {
        x.collide(things[j]);
        x.applyPhysics();
        x.display()
        things[j].applyPhysics();
        things[j].display();
      }
    }
  });
}

function windowResized() {
  resizeCanvas(cwidth(), cheight());
}
