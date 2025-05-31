let currentPlayer = 'X';
let array = Array(9).fill(null);
let vsAI = false; // New: true if playing vs AI

const modal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeModal = document.getElementById('closeModal');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const changeModeBtn = document.getElementById('changeModeBtn');

// Game mode modal
const modeModal = document.getElementById('modeModal');
const playerMode = document.getElementById('playerMode');
const aiMode = document.getElementById('aiMode');

// Initialize the board
function init() {
  array.fill(null);
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
    cell.onclick = () => handleClick(cell);
  });
}

// Handle player click
function handleClick(ele) {
  const id = Number(ele.id);
  if (array[id] !== null) return;

  makeMove(id, currentPlayer);

  if (!checkWinner(currentPlayer)) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // If playing vs AI and it's O's turn, trigger AI
    if (vsAI && currentPlayer === 'O') {
      setTimeout(aiMove, 400); // Delay for effect
    }
  }
}

// Perform a move
function makeMove(index, player) {
  const cell = document.getElementById(index);
  cell.innerText = player;
  cell.classList.add(player.toLowerCase());
  array[index] = player;
  cell.onclick = null;
}

// Random AI Move
function aiMove() {
  const available = array
    .map((val, idx) => val === null ? idx : null)
    .filter(v => v !== null);

  if (available.length === 0) return;

  const randIndex = available[Math.floor(Math.random() * available.length)];
  makeMove(randIndex, 'O');

  if (!checkWinner('O')) {
    currentPlayer = 'X';
  }
}

// Check for winner or draw
function checkWinner(player) {
  const win =
    (array[0] && array[0] === array[1] && array[1] === array[2]) ||
    (array[3] && array[3] === array[4] && array[4] === array[5]) ||
    (array[6] && array[6] === array[7] && array[7] === array[8]) ||
    (array[0] && array[0] === array[3] && array[3] === array[6]) ||
    (array[1] && array[1] === array[4] && array[4] === array[7]) ||
    (array[2] && array[2] === array[5] && array[5] === array[8]) ||
    (array[0] && array[0] === array[4] && array[4] === array[8]) ||
    (array[2] && array[2] === array[4] && array[4] === array[6]);

  if (win) {
    winnerMessage.innerHTML = `🎉 The winner is <strong>${player}</strong>!`;
    modal.style.display = 'flex';
    disableClicks();
    return true;
  }

  if (!array.includes(null)) {
    winnerMessage.innerHTML = `🤝 It's a draw!`;
    modal.style.display = 'flex';
    disableClicks();
    return true;
  }

  return false;
}

// Disable further clicks
function disableClicks() {
  document.querySelectorAll('.cell').forEach(cell => cell.onclick = null);
}

// Reset game
function resetGame() {
  init();
  if (vsAI && currentPlayer === 'O') {
    aiMove();
  }
}

// Close win modal
closeModal.onclick = () => modal.style.display = 'none';
restartBtn.onclick = () => {
  modal.style.display = 'none';
  resetGame();
};
resetBtn.onclick = () => resetGame();
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

// Game mode selection
playerMode.onclick = () => {
  vsAI = false;
  modeModal.style.display = 'none';
  init();
};
aiMode.onclick = () => {
  vsAI = true;
  modeModal.style.display = 'none';
  init();
  if (currentPlayer === 'O') aiMove();
};

// Show mode selection at start
window.onload = () => {
  if (modeModal) {
    modeModal.style.display = 'flex';  // show start modal on load
  }
  if (winnerModal) {
    winnerModal.style.display = 'none';  // hide winner modal on load
  }
};



changeModeBtn.onclick = () => {
  modeModal.style.display = 'flex';
};
