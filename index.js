// Seleccionar elementos del DOM
const board = document.getElementById('board');
const rollDiceButton = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');
const turnIndicator = document.getElementById('turnIndicator');
const questionBox = document.getElementById('questionBox');
const questionText = document.getElementById('question');
const optionsContainer = document.getElementById('options');

// Lista de preguntas
const questions = [
    { question: "¿En qué año terminó la Primera Guerra Mundial?", options: ["1914", "1918", "1939", "1945"], correct: "1918" },
    { question: "¿Qué fue la Crisis de los Misiles?", options: ["Un enfrentamiento nuclear", "Un acuerdo comercial", "Un tratado de paz", "Una revuelta social"], correct: "Un enfrentamiento nuclear" },
    { question: "¿Quién fue el líder de la Revolución Rusa?", options: ["Stalin", "Lenin", "Trotsky", "Gorbachev"], correct: "Lenin" },
    // Más preguntas aquí...
];

// Configuración inicial del juego
const players = [
    { id: 1, position: 0, element: document.createElement('div'), offset: 0 },
    { id: 2, position: 0, element: document.createElement('div'), offset: 20 }
];

const bombPositions = [8, 16, 24, 20, 33, 49];
let currentPlayerIndex = 0;
let currentDiceRoll = 0;

// Crear el tablero
for (let i = 50; i > 0; i--) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = i;
    if (bombPositions.includes(i)) {
        cell.classList.add('bomb');
        cell.textContent += " 💣";
    }
    board.appendChild(cell);
}

// Inicializar las fichas de los jugadores
players.forEach(player => {
    player.element.className = `player player${player.id}`;
    player.element.style.top = `${player.offset}px`;
    board.children[49].appendChild(player.element);
});

// Función para lanzar el dado
rollDiceButton.addEventListener('click', () => {
    rollDiceButton.disabled = true;

    if (players[0].position === 49 || players[1].position === 49) return;

    currentDiceRoll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Resultado: ${currentDiceRoll}`;
    movePlayerAndCheckBomb();
});

// Mover jugador y verificar bombas
function movePlayerAndCheckBomb() {
    const player = players[currentPlayerIndex];
    const newPosition = Math.min(player.position + currentDiceRoll, 49);

    updatePlayerPosition(player, newPosition);

    if (newPosition === 49) {
        alert(`¡Jugador ${player.id} ha ganado!`);
        rollDiceButton.disabled = true;
        return;
    }

    if (bombPositions.includes(newPosition + 1)) {
        alert("¡Has caído en una bomba nuclear! Retrocedes " + currentDiceRoll + " casillas.");
        const fallbackPosition = Math.max(0, player.position - currentDiceRoll);
        updatePlayerPosition(player, fallbackPosition);
        finishTurn();
    } else {
        askQuestion();
    }
}

// Hacer pregunta
function askQuestion() {
    const question = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = `Pregunta: ${question.question}`;
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.className = 'option';
        optionElement.onclick = () => checkAnswer(option, question.correct);
        optionsContainer.appendChild(optionElement);
    });
    questionBox.classList.remove('hidden');
}

// Verificar respuesta
function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert('¡Respuesta correcta!');
    } else {
        alert('Respuesta incorrecta');
        const player = players[currentPlayerIndex];
        const fallbackPosition = Math.max(0, player.position - currentDiceRoll);
        updatePlayerPosition(player, fallbackPosition);
    }
    questionBox.classList.add('hidden');
    finishTurn();
}

// Actualizar posición del jugador
function updatePlayerPosition(player, newPosition) {
    const oldCell = board.children[49 - player.position];
    const newCell = board.children[49 - newPosition];
    oldCell.removeChild(player.element);
    newCell.appendChild(player.element);
    player.position = newPosition;
}

// Cambiar turno
function switchTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    turnIndicator.textContent = `Turno del Jugador ${players[currentPlayerIndex].id}`;
}

// Finalizar turno
function finishTurn() {
    switchTurn();
    rollDiceButton.disabled = false;
}
