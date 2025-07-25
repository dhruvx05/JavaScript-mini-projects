// Initialize scores for player and computer
let playerScore = 0;
let computerScore = 0;

// Define the possible choices
const choices = ["rock", "paper", "scissors"];

// Get all choice buttons (Rock, Paper, Scissors)
const choiceButtons = document.querySelectorAll(".choice-btn");

// Get DOM elements for updating game information
const playerChoiceSpan = document.getElementById("player-choice");
const computerChoiceSpan = document.getElementById("computer-choice");
const winnerSpan = document.getElementById("winner");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const nextRoundBtn = document.getElementById("nextRound");

// This flag prevents input after a move is made, until next round starts
let gameLocked = false;

// Add click event listeners to all player choice buttons
choiceButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Prevent playing multiple times in one round
    if (gameLocked) return;

    // Get the player's choice by button text (convert to lowercase)
    const playerChoice = btn.innerText.toLowerCase();

    // Randomly generate the computer's choice
    const computerChoice = getComputerChoice();

    // Display both choices in the game UI
    playerChoiceSpan.innerText = playerChoice;
    computerChoiceSpan.innerText = computerChoice;

    // Determine the winner and display result
    const result = getWinner(playerChoice, computerChoice);
    winnerSpan.innerText = result;

    // Update scores based on result
    if (result === "You Win!") {
      playerScore++;
      playerScoreSpan.innerText = playerScore;
    } else if (result === "Computer Wins!") {
      computerScore++;
      computerScoreSpan.innerText = computerScore;
    }

    // Lock the game until "Next Round" is clicked
    gameLocked = true;
  });
});

// Function to return a random computer choice from the list
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex]; // returns "rock", "paper", or "scissors"
}

// Function to determine the winner based on game rules
function getWinner(player, computer) {
  // If both choices are the same, it's a draw
  if (player === computer) return "It's a Draw!";

  // Player wins if these conditions are true
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You Win!";
  } else {
    // Otherwise, computer wins
    return "Computer Wins!";
  }
}

// Reset the round when "Next Round" is clicked
nextRoundBtn.addEventListener("click", function () {
  // Reset UI text to placeholders
  playerChoiceSpan.innerText = "___";
  computerChoiceSpan.innerText = "___";
  winnerSpan.innerText = "___";

  // Unlock game for the next round
  gameLocked = false;
});
