"use strict";

let player1Name = "Player 1";
let player2Name = "Player 2";

let player1Score = document.getElementById("player1-score-number");
let player2Score = document.getElementById("player2-score-number");

let player1ScoreTitle = document.getElementById("player1-score-title");
let player2ScoreTitle = document.getElementById("player2-score-title");

const cells = document.querySelectorAll(".cell");
const resultText = document.querySelector("#result-text");

const overlay = document.getElementById("overlay");
const playerForm = document.getElementById("player-form");

let boardArray = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get player names from input fields
  player1Name = document.getElementById("player1").value || "Player 1";
  player2Name = document.getElementById("player2").value || "Player 2";
  player1ScoreTitle.textContent = document.getElementById("player1").value;
  player2ScoreTitle.textContent = document.getElementById("player2").value;

  // Hide the overlay
  overlay.style.display = "none";

  // Update the result text to show Player 1's turn
  resultText.textContent = `${player1Name}'s Turn (X)`;
});

const checkWinner = (board, player) => {
  for (const tris of winningPatterns) {
    const [a, b, c] = tris;

    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
};

cells.forEach(function (cell) {
  cell.addEventListener("click", function (e) {
    if (gameOver) return;

    const cellIndex = Number(e.target.dataset.cell);

    if (!boardArray[cellIndex]) {
      boardArray[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      resultText.textContent = `${
        currentPlayer === "X" ? player2Name : player1Name
      }'s Turn!`;

      if (checkWinner(boardArray, currentPlayer)) {
        resultText.textContent = `${
          currentPlayer === "X" ? player1Name : player2Name
        } wins!`;
        if (currentPlayer === "X") {
          player1Score.textContent++;
        } else {
          player2Score.textContent++;
        }

        gameOver = true;
        return;
      }

      if (boardArray.every((cell) => cell !== "")) {
        resultText.textContent = `It's a Draw!`;

        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

const restartButton = document.getElementById("result");

restartButton.addEventListener("click", function () {
  boardArray = Array(9).fill("");
  gameOver = false;
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
  });
});
