const cardsArray = [
    '🐶', '🐶', '🐱', '🐱', '🐭', '🐭', '🐹', '🐹',
    '🐰', '🐰', '🦊', '🦊', '🐻', '🐻', '🐼', '🐼'
]; // Array con pares de cartas

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = ''; // Limpiar el tablero
    matchedPairs = 0;
    lockBoard = false;
    document.getElementById('message').textContent = ''; // Limpiar mensaje
    document.getElementById('resetBtn').style.display = 'none'; // Ocultar botón de reinicio

    // Mezclar cartas
    const shuffledCards = shuffle(cardsArray);

    // Crear el tablero de cartas
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card; // Asignar el valor de la carta
        cardElement.innerHTML = `<div class="front">?</div><div class="back">${card}</div>`;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function flipCard() {
    if (lockBoard) return; // Bloquear si ya se están comparando dos cartas
    if (this === firstCard) return; // Evitar que se haga clic dos veces en la misma carta

    this.classList.add('flipped'); // Voltear la carta

    if (!firstCard) {
        firstCard = this; // Asignar la primera carta seleccionada
        return;
    }

    secondCard = this; // Asignar la segunda carta seleccionada
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards(); // Desactivar cartas si son iguales
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            endGame(); // Terminar el juego si se encontraron todos los pares
        }
    } else {
        unflipCards(); // Volver a voltear las cartas si no coinciden
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Bloquear el tablero mientras las cartas se voltean de nuevo

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null]; // Reiniciar las cartas seleccionadas
    lockBoard = false; // Desbloquear el tablero
}

function endGame() {
    document.getElementById('message').textContent = '¡Felicidades, encontraste todos los pares!';
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').addEventListener('click', startGame);
}
