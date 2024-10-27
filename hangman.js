let selectedWord = '';
let hiddenWordArray = [];
let wrongLetters = [];
let attempts = 6;

document.getElementById('startGameBtn').addEventListener('click', startGame);

function startGame() {
    const wordInput = document.getElementById('wordInput').value.trim().toLowerCase();
    
    if (wordInput === '') {
        alert('Por favor ingresa una palabra.');
        return;
    }

    // Ocultar la sección de entrada y mostrar el juego
    document.getElementById('word-input-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';

    // Inicializar el juego con la palabra ingresada
    selectedWord = wordInput;
    hiddenWordArray = Array(selectedWord.length).fill('_');
    document.getElementById('hiddenWord').textContent = hiddenWordArray.join(' ');
    document.getElementById('remainingAttempts').textContent = attempts; // Mostrar intentos iniciales

    generateKeyboard();
}

function generateKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = ''; // Limpiar el teclado

    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letters.forEach(letter => {
        const letterBtn = document.createElement('button');
        letterBtn.textContent = letter;
        letterBtn.addEventListener('click', () => guessLetter(letter));
        keyboard.appendChild(letterBtn);
    });
}

function guessLetter(letter) {
    if (selectedWord.includes(letter)) {
        // Letra correcta
        updateWord(letter);
    } else {
        // Letra incorrecta
        if (!wrongLetters.includes(letter)) { // Evitar añadir letras incorrectas repetidas
            wrongLetters.push(letter);
            document.getElementById('wrongLetters').textContent = wrongLetters.join(', ');
            attempts--;
            document.getElementById('remainingAttempts').textContent = attempts; // Actualizar intentos restantes
            if (attempts === 0) {
                endGame(false); // Perdiste
            }
        }
    }
    checkWin();
}

function updateWord(letter) {
    // Reemplaza los guiones bajos con la letra acertada
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            hiddenWordArray[i] = letter;
        }
    }
    document.getElementById('hiddenWord').textContent = hiddenWordArray.join(' ');
}

function checkWin() {
    if (!hiddenWordArray.includes('_')) {
        endGame(true); // Ganaste
    }
}

function endGame(won) {
    const gameMessage = document.getElementById('gameMessage');
    const resetBtn = document.getElementById('resetBtn');
    
    if (won) {
        gameMessage.textContent = '¡Felicidades, ganaste!';
    } else {
        gameMessage.textContent = `Perdiste. La palabra era "${selectedWord}".`;
    }

    resetBtn.style.display = 'inline-block';
    resetBtn.addEventListener('click', resetGame);
}

function resetGame() {
    // Reinicia el juego
    selectedWord = '';
    hiddenWordArray = [];
    wrongLetters = [];
    attempts = 6;

    // Restablece el estado visual inicial
    document.getElementById('wordInput').value = '';
    document.getElementById('hiddenWord').textContent = '';
    document.getElementById('wrongLetters').textContent = '';
    document.getElementById('gameMessage').textContent = '';
    document.getElementById('remainingAttempts').textContent = attempts; // Reiniciar intentos
    document.getElementById('resetBtn').style.display = 'none';

    // Mostrar de nuevo la sección de entrada de palabra
    document.getElementById('word-input-section').style.display = 'block';
    document.getElementById('game-section').style.display = 'none';

    // Asegurarse de que los estilos iniciales estén correctos
    const startGameBtn = document.getElementById('startGameBtn');
    const mainMenuBtn = document.getElementById('mainMenuBtn');

    // Restablece el estilo del botón Iniciar Juego y del botón Volver al Menú Principal
    startGameBtn.style.display = 'block';
    mainMenuBtn.style.display = 'block';
}

