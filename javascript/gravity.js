var xinit = 10;
var yinit = 5;
var vxinit = 0;
var vyinit = 0;
var axinit = 0;
var ayinit = 2;

function getCanvas() {
  return document.getElementById("grav").getContext('2d');
}

function clearCanvas() {
  // TODO
}

function addRect() {
  var c = app.canvas.getContext("2d");
  c.fillRect(app.x, app.y, 10, 10);
}
function setVue() {
  return new Vue({
    el: '#grav-wrap',
    data: {
      x: xinit,
      y: yinit,
      vx: vxinit,
      vy: vyinit,
      ax: axinit,
      ay: ayinit,
      canvas: getCanvas()
    },
    directives: {
      addRect: function(canvas, binding) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.fillRect(binding.value, binding.value, 10, 10);
      }
    }
  });
}

var app = setVue();
