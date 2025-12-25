const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
fw.width = window.innerWidth;
fw.height = window.innerHeight;

let particles = [];

function explode(x, y) {
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60
    });
  }
}

function fireworks() {
  fctx.clearRect(0, 0, fw.width, fw.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    fctx.fillStyle = "gold";
    fctx.fillRect(p.x, p.y, 2, 2);
  });
  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(fireworks);
}
fireworks();
