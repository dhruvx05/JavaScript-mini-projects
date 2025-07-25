// === Pomodoro Timer Logic ===
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alert("⏰ Time's up!");
        isRunning = false;
      }
    }, 1000);
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateDisplay();
  isRunning = false;
});

updateDisplay();

// === Quote Generator Logic ===
const quotes = [
  "Productivity is never an accident.",
  "Focus on being productive instead of busy.",
  "Small progress is still progress.",
  "You don’t need a new plan. You need to stick to it.",
  "Push yourself, because no one else is going to do it for you."
];

document.getElementById("new-quote").addEventListener("click", () => {
  const quoteText = document.getElementById("quote-text");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
});

// === Theme Toggle Logic ===
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// === Notes Feature ===
const noteInput = document.getElementById("note-input");
const noteList = document.getElementById("note-list");
const addNoteBtn = document.getElementById("add-note");

addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText === "") return;

  const li = document.createElement("li");
  li.textContent = noteText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  noteList.appendChild(li);
  noteInput.value = "";
});
