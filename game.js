let score = 0;
let time = 10;
let countdownNum = 3;
let timerInterval;
let lastClick = 0;
let rapidClicks = 0;

const sound = document.getElementById("clickSound");

const fates = [
  { min: 0, title: "🌱 Reset Year", text: "Slow growth, reflection, rebuilding." },
  { min: 6, title: "🧠 Growth Arc", text: "Consistency will change everything." },
  { min: 11, title: "💰 Opportunity Year", text: "Doors will open if you act." },
  { min: 17, title: "🚀 Breakout Year", text: "This is your moment." }
];

function startCountdown() {
  document.getElementById("overlay").style.display = "none";
  const cd = document.getElementById("countdown");
  cd.classList.remove("hidden");

  const interval = setInterval(() => {
    cd.innerText = countdownNum;
    countdownNum--;
    if (countdownNum < 0) {
      clearInterval(interval);
      cd.classList.add("hidden");
      startGame();
    }
  }, 1000);
}

function startGame() {
  document.getElementById("game").style.display = "block";
  moveOrb();
  timerInterval = setInterval(runTimer, 1000);
}

function hitOrb() {
  const now = Date.now();
  if (now - lastClick < 300) rapidClicks++;
  lastClick = now;

  score++;
  sound.currentTime = 0;
  sound.play();
  moveOrb();
}

function moveOrb() {
  const orb = document.getElementById("orb");
  orb.style.left = Math.random() * (window.innerWidth - 60) + "px";
  orb.style.top = Math.random() * (window.innerHeight - 60) + "px";
}

function runTimer() {
  time--;
  document.getElementById("timer").innerText = time;
  if (time === 0) endGame();
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById("game").style.display = "none";
  document.getElementById("result").classList.remove("hidden");

  let fate;
  if (score >= 20 && rapidClicks >= 8) {
    fate = {
      title: "🦇 The Night Guardian",
      text: "You move in silence. You build in shadows. This year bends to your will."
    };
  } else {
    fate = fates[0];
    for (let f of fates) if (score >= f.min) fate = f;
  }

  document.getElementById("fortuneTitle").innerText = fate.title;
  document.getElementById("fortuneText").innerText =
    `${fate.text} (Energy: ${score})`;

  saveScore(score);
  renderScores();

  const today = new Date();
  if (today.getMonth() === 11 || today.getMonth() === 0) {
    explode(window.innerWidth / 2, window.innerHeight / 2);
  }
}

function copyResult() {
  navigator.clipboard.writeText(
    document.getElementById("fortuneTitle").innerText + " — " +
    document.getElementById("fortuneText").innerText
  );
  alert("Copied 🎉");
}

function saveScore(score) {
  const name = prompt("Enter your name 👀") || "Anonymous";
  let scores = JSON.parse(localStorage.getItem("fateScores")) || [];
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 5);
  localStorage.setItem("fateScores", JSON.stringify(scores));
}

function renderScores() {
  const list = document.getElementById("scores");
  list.innerHTML = "";
  const scores = JSON.parse(localStorage.getItem("fateScores")) || [];
  scores.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} — ${s.score}`;
    list.appendChild(li);
  });
}
