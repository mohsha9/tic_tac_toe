
const sides = {
  cross: 'X',
  circle: 'O'
};

const score = {
  x: 0,
  o: 0
};

const buttons = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('.restart-button');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let playerMovesValue;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function initializeGame() {
  buttons.forEach(button => button.addEventListener('click', buttonClicked));
  restartBtn.addEventListener('click', resetGame);
  statusText.textContent = `${playerMovesValue}'s turn`;
  gameActive = true;
};

function buttonClicked() {
  const buttonIndex = this.getAttribute('cellIndex');
  if (gameBoard[buttonIndex] != '' || !gameActive) {
    return;
  }
  updateButton(this, buttonIndex);
  checkWinner();
};

function updateButton(button, index) {
  gameBoard[index] = playerMovesValue;
  button.textContent = playerMovesValue;
};

function changeplayer() {
  playerMovesValue = (playerMovesValue == 'X') ? 'O' : 'X';
  statusText.textContent = `${playerMovesValue}'s turn`;
};

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {

    const condition = winConditions[i];
    const buttonA = gameBoard[condition[0]];
    const buttonB = gameBoard[condition[1]];
    const buttonC = gameBoard[condition[2]];

    if (buttonA == '' || buttonA == '' || buttonC == '') {
      continue;
    }
    if (buttonA == buttonB && buttonB == buttonC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${playerMovesValue} wins!`;
    if (playerMovesValue == 'X') {
      score.x++;
      document.querySelector('.cross-score').innerHTML = score.x;
      setTimeout(() => {
        playerMovesValue = playerMovesValue;
        gameBoard = ['', '', '', '', '', '', '', '', '', ''];
        buttons.forEach(button => button.textContent = '');
      }, 1000)
    } else {
      score.o++;
      document.querySelector('.circle-score').innerHTML = score.o;
      setTimeout(() => {
        playerMovesValue = playerMovesValue;
        gameBoard = ['', '', '', '', '', '', '', '', '', ''];
        buttons.forEach(button => button.textContent = '');
      }, 1500)
    }
    gameActive = false;
  } else if (!gameBoard.includes('')) {
    statusText.textContent = 'It\'s a draw!';
    running = false;
  } else {
    changeplayer();
  }
};

function resetGame() {
  playerMovesValue = playerMovesValue;
  gameBoard = ['', '', '', '', '', '', '', '', '', ''];
  score.x = 0;
  document.querySelector('.cross-score').innerHTML = score.x;
  score.o = 0;
  document.querySelector('.circle-score').innerHTML = score.x;
  statusText.textContent = 'Select';
  document.querySelector('.cross-button')
    .classList.remove('js-cross-button');
  document.querySelector('.circle-button')
    .classList.remove('js-circle-button');
  buttons.forEach(button => button.textContent = '');
  statusText.classList.add('status-text');
  running = true;
};

const playButtons = document.querySelectorAll('.js-button');
playButtons.forEach(button => {
  button.addEventListener('click', () => {
    let playerMoves = button.innerHTML;
    playerMovesValue = playerMoves;
    initializeGame();
    const crossButton = document.querySelector('.cross-button');
    const circleButton = document.querySelector('.circle-button');
    const statusText = document.querySelector('.status-text');

    if (playerMoves === sides.cross) {
      crossButton.classList.add('js-cross-button');
      circleButton.classList.remove('js-circle-button');
    } else {
      circleButton.classList.add('js-circle-button');
      crossButton.classList.remove('js-cross-button');
    }
    const buttonSection = document.querySelector('.choose-button-section');
    if (buttonSection.classList.contains('js-choose-button-section')) {
      buttonSection.classList.add('choose-button-section');
    } else {
      buttonSection.classList.add('js-choose-button-section');
    }
    if (statusText.classList.contains('js-status-text')) {
      statusText.classList.add('status-text');
    } else {
      statusText.classList.add('js-status-text');
    }
    return playerMoves;
  });
});

