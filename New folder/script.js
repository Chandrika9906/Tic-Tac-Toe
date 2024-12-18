// script.js
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const currentPlayerText = document.getElementById("player");
const scoreXText = document.getElementById("score-x");
const scoreOText = document.getElementById("score-o");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let scoreX = 0, scoreO = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
    const cellIndex = Array.from(cells).indexOf(e.target);

    if (gameState[cellIndex] !== "" || checkWin()) return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        highlightWinningCells();
        updateScore();
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (!gameState.includes("")) {
        setTimeout(() => alert("It's a draw!"), 100);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerText.textContent = currentPlayer;
    }
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => gameState[index] === currentPlayer)
    );
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach(index => cells[index].classList.add("winning-cell"));
        }
    });
}

function updateScore() {
    if (currentPlayer === "X") {
        scoreX++;
        scoreXText.textContent = scoreX;
    } else {
        scoreO++;
        scoreOText.textContent = scoreO;
    }
}

function resetGame() {
    gameState.fill("");
    currentPlayer = "X";
    currentPlayerText.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
