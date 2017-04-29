new p5();

var app;
function setup() {
  var width = 300, height = 300;
  var xi = width / 2, yi = 5;
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
        ellipse(app.x, app.y, app.r, app.r);
      },
      applyPhysics: function() {
        app.x += app.vx;
        app.y += app.vy;
        app.vx += app.ax;
        app.vy += app.ay;
      },
      reset: function() {
        app.x = xi;
        app.y = yi;
        app.vx = vxi;
        app.vy = vyi;
        loop();
      }
    }
  });
  createCanvas(width, height);
}

function draw() {
  background(0);
  app.show();

  if (app.y >= width) {
    noLoop();
  } else {
    app.applyPhysics();
  }

}
