(function() {
  const maxAttempts = 10;
  let attemptsLeft = maxAttempts;
  let secretNumber = Math.floor(Math.random() * 100) + 1;

  const guessInput = document.getElementById('guessInput');
  const guessBtn = document.getElementById('guessBtn');
  const message = document.getElementById('message');
  const attempts = document.getElementById('attempts');
  const restartBtn = document.getElementById('restartBtn');
  const gameContainer = document.querySelector('.game-container');

  function updateAttempts() {
    attempts.textContent = `Attempts left: ${attemptsLeft}`;
  }

  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    gameContainer.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }

  function celebrate() {
    for (let i = 0; i < 30; i++) {
      setTimeout(createConfetti, i * 100);
    }
  }

  function resetGame() {
    attemptsLeft = maxAttempts;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    message.textContent = '';
    message.className = 'message';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.style.display = 'none';
    gameContainer.style.backgroundColor = 'white';
    updateAttempts();
  }

  function endGame(win) {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
    if (win) {
      message.textContent = `Congratulations! You guessed the number ${secretNumber} correctly!`;
      message.className = 'message success';
      celebrate();
      gameContainer.style.backgroundColor = '#d4edda';
    } else {
      message.textContent = `Game over! Better luck next time! The number was ${secretNumber}.`;
      message.className = 'message error lost-animation';
      gameContainer.style.backgroundColor = '#f8d7da';
    }
  }

  guessBtn.addEventListener('click', () => {
    const guess = Number(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
      message.textContent = 'Please enter a valid number between 1 and 100.';
      message.className = 'message error animate-guess';
      return;
    }

    attemptsLeft--;
    if (guess === secretNumber) {
      endGame(true);
    } else if (attemptsLeft === 0) {
      endGame(false);
    } else {
      if (guess < secretNumber) {
        message.textContent = 'Too low! Try a higher number.';
      } else {
        message.textContent = 'Too high! Try a lower number.';
      }
      message.className = 'message animate-guess';
      updateAttempts();
    }
    guessInput.value = '';
    guessInput.focus();
  });

  restartBtn.addEventListener('click', resetGame);

  // Initialize game
  updateAttempts();
  guessInput.focus();
})();
