const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
c.lineWidth = 5;
c.shadowOffsetX = 10;
c.shadowOffsetY = 10;
c.shadowBlur = 10;
c.shadowColor = '#111';
let hue = 0;

function drawShape(x, y, radius, inset, n) {
  c.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
  // c.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';

  c.beginPath();
  c.save();
  c.translate(x, y);
  c.moveTo(0, 0 - radius);

  for (let i = 0; i < n; i++) {
    c.rotate(Math.PI / n);
    c.lineTo(0, 0 - radius * inset);
    c.rotate(Math.PI / n);
    c.lineTo(0, 0 - radius);
  }

  c.restore();
  c.closePath();
  // c.stroke();
  c.fill();
}

const radius = 50;
const inset = 0.9;
const n = 20;

drawShape(60, 60, radius / 2, inset, n);

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let angle = 0;
window.addEventListener('mousemove', function (e) {
  if (drawing) {
    c.save();
    c.translate(e.x, e.y);
    c.rotate(angle);
    hue++;

    angle += 0.05;

    drawShape(0, 0, randomBetween(5, 50), inset, n);
    c.restore();
  }
});

let drawing = false;

window.addEventListener('mousedown', function () {
  drawing = true;
});

window.addEventListener('mouseup', function () {
  drawing = false;
});
