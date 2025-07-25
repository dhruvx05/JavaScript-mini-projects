// === SOUNDS ===
const gunshotSound = new Audio("gunshot.mp3");
const emptyShotSound = new Audio("empty gunshot.mp3");
const spinSound = new Audio("reload.mp3");
const deathSound = new Audio("death.mp3");
const killedSound = new Audio("killed.mp3");

// === ELEMENTS ===
const spinBtn = document.getElementById('spinBtn');
const shootBtn = document.getElementById('shootBtn');
const restartBtn = document.getElementById('restartBtn');
const currentPlayerText = document.getElementById('currentPlayer');
const statusMessage = document.getElementById('statusMessage');
const revolver = document.getElementById('revolver');
const bulletCountSelect = document.getElementById('bulletCount');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

// === STATE ===
let currentPlayer = 1;
let chamber = [false, false, false, false, false, false];
let currentChamberIndex = 0;
let isSpun = false;
let scores = {
  1: { wins: 0, deaths: 0 },
  2: { wins: 0, deaths: 0 }
};

// === FUNCTIONS ===

function loadBullets(count) {
  chamber = [false, false, false, false, false, false];
  let placed = 0;
  while (placed < count) {
    let rand = Math.floor(Math.random() * 6);
    if (!chamber[rand]) {
      chamber[rand] = true;
      placed++;
    }
  }
}

function spinChamber() {
  revolver.classList.add('rotate');
  spinSound.play();
  setTimeout(() => revolver.classList.remove('rotate'), 1000);
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentPlayerText.textContent = `🎯 Player ${currentPlayer}'s Turn`;
}

function pullTrigger() {
  if (chamber[currentChamberIndex]) {
    gunshotSound.play();
    killedSound.play();
    deathSound.play();
    statusMessage.textContent = `💥 Player ${currentPlayer} got shot!`;

    scores[currentPlayer].deaths++;
    let other = currentPlayer === 1 ? 2 : 1;
    scores[other].wins++;

    updateScore();
    shootBtn.disabled = true;
    spinBtn.disabled = false;
    isSpun = false;
  } else {
    emptyShotSound.play();
    statusMessage.textContent = `😅 Click! Player ${currentPlayer} survived.`;
    currentChamberIndex = (currentChamberIndex + 1) % 6;
    switchPlayer();
  }
}

function updateScore() {
  score1.textContent = `Player 1: ${scores[1].wins} Wins | ${scores[1].deaths} Deaths`;
  score2.textContent = `Player 2: ${scores[2].wins} Wins | ${scores[2].deaths} Deaths`;
}

function restartGame() {
  currentPlayer = 1;
  currentChamberIndex = 0;
  isSpun = false;
  currentPlayerText.textContent = `🎯 Player 1's Turn`;
  statusMessage.textContent = "Spin the chamber to begin!";
  shootBtn.disabled = true;
  spinBtn.disabled = false;
}

// === EVENTS ===

spinBtn.addEventListener('click', () => {
  const bullets = parseInt(bulletCountSelect.value);
  loadBullets(bullets);
  currentChamberIndex = Math.floor(Math.random() * 6);
  spinChamber();
  statusMessage.textContent = "🔫 Chamber spun. Ready to fire!";
  isSpun = true;
  shootBtn.disabled = false;
  spinBtn.disabled = true;
});

shootBtn.addEventListener('click', () => {
  if (!isSpun) {
    statusMessage.textContent = "❗ Spin the chamber first!";
    return;
  }
  pullTrigger();
});

restartBtn.addEventListener('click', restartGame);
