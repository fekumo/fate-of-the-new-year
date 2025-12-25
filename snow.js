const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w, h;
let flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 100; i++) {
  flakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    d: Math.random()
  });
}

function snow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.beginPath();
  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
  });
  ctx.fill();
  flakes.forEach(f => {
    f.y += f.d + 0.5;
    if (f.y > h) f.y = 0;
  });
  requestAnimationFrame(snow);
}
snow();
