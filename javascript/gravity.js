new p5();

var app;
function setup() {
  var width = $('#p5cnv')[0].offsetWidth;
  var height = 300;
  var xi = $('#p5cnv')[0].offsetWidth / 2, yi = 5;
  var vxi = 0, vyi = 0;
  var axi = 0, ayi = 0.2;
  var r = 20;
  app = new Vue({
    el: '#grav-wrap',
    data: {
      x: xi,
      y: yi,
      vx: vxi,
      vy: vyi,
      ax: axi,
      ay: ayi,
      r: r
    },
    methods: {
      show: function() {
        noStroke();
        fill('#5F0EA6');
        ellipse(app.x, app.y, app.r, app.r);
      },
      applyPhysics: function() {
        app.x += app.vx;
        app.y += app.vy;
        app.vx += app.ax;
        app.vy += app.ay;
      },
      reset: function() {
        app.x = $('#p5cnv')[0].offsetWidth / 2;
        app.y = yi;
        app.vx = vxi;
        app.vy = vyi;
        loop();
      }
    }
  });
  var cnv = createCanvas(width, height);
  cnv.parent('p5cnv');
}

function draw() {
  background(210);
  app.show();

  if (app.y >= width) {
    noLoop();
  } else {
    app.applyPhysics();
  }

}

function windowResized() {
  resizeCanvas($('#p5cnv')[0].offsetWidth, height);
}
