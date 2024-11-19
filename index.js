const board = document.getElementById('board');
const rollDiceButton = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');
const turnIndicator = document.getElementById('turnIndicator');
const questionBox = document.getElementById('questionBox');
const questionText = document.getElementById('question');
const optionsContainer = document.getElementById('options');

const questions = [
    { 
        question: "¿En qué año terminó la Primera Guerra Mundial?", 
        options: ["1914", "1918", "1939", "1945"], 
        correct: "1918" 
    },
    { 
        question: "¿Qué fue la Crisis de los Misiles?", 
        options: ["Un enfrentamiento nuclear", "Un acuerdo comercial", "Un tratado de paz", "Una revuelta social"], 
        correct: "Un enfrentamiento nuclear" 
    },
    { 
        question: "¿Quién fue el líder de la Revolución Rusa?", 
        options: ["Stalin", "Lenin", "Trotsky", "Gorbachev"], 
        correct: "Lenin" 
    },
    { 
        question: "¿Qué país fue invadido por Alemania en 1939, iniciando la Segunda Guerra Mundial?", 
        options: ["Francia", "Polonia", "Bélgica", "Rusia"], 
        correct: "Polonia" 
    },
    { 
        question: "¿Qué significan las siglas ONU?", 
        options: ["Organización de Naciones Unidas", "Oficina Nacional Unificada", "Organización de Nuevas Utopías", "Observatorio Nacional Unido"], 
        correct: "Organización de Naciones Unidas" 
    },
    { 
        question: "¿Qué ciudad fue bombardeada con la primera bomba atómica?", 
        options: ["Nagasaki", "Hiroshima", "Tokio", "Osaka"], 
        correct: "Hiroshima" 
    },
    { 
        question: "¿Qué era el Muro de Berlín?", 
        options: ["Un símbolo de paz", "Una barrera entre Alemania del Este y del Oeste", "Un monumento histórico", "Una frontera militarizada con Francia"], 
        correct: "Una barrera entre Alemania del Este y del Oeste" 
    },
    { 
        question: "¿Qué evento marcó el final de la Segunda Guerra Mundial?", 
        options: ["La rendición de Alemania", "El bombardeo de Hiroshima y Nagasaki", "El Día D", "La conferencia de Yalta"], 
        correct: "El bombardeo de Hiroshima y Nagasaki" 
    },
    { 
        question: "¿Quién lideró el movimiento por los derechos civiles en Estados Unidos?", 
        options: ["Malcolm X", "Martin Luther King Jr.", "John F. Kennedy", "Barack Obama"], 
        correct: "Martin Luther King Jr." 
    },
    { 
        question: "¿Qué fue el Holocausto?", 
        options: ["Un movimiento artístico", "El genocidio de los judíos por los nazis", "Un tratado de paz fallido", "Un levantamiento contra el comunismo"], 
        correct: "El genocidio de los judíos por los nazis" 
    },
    { 
        question: "¿Qué fue el movimiento hippie?", 
        options: ["Una protesta contra la guerra de Vietnam", "Un movimiento de contracultura", "Un grupo político radical", "Un festival artístico en Europa"], 
        correct: "Un movimiento de contracultura" 
    },
    { 
        question: "¿Qué líder promovió la política de la 'Perestroika'?", 
        options: ["Mikhail Gorbachov", "Nikita Khrushchev", "Joseph Stalin", "Vladimir Putin"], 
        correct: "Mikhail Gorbachov" 
    },
    { 
        question: "¿Qué evento se conoce como el 'Día D'?", 
        options: ["El inicio de la Primera Guerra Mundial", "La invasión de Normandía", "El bombardeo de Pearl Harbor", "La creación de la ONU"], 
        correct: "La invasión de Normandía" 
    },
    { 
        question: "¿Quién fue el líder de la India que luchó por la independencia a través de la no violencia?", 
        options: ["Jawaharlal Nehru", "Gandhi", "Indira Gandhi", "Bhagat Singh"], 
        correct: "Gandhi" 
    },
    { 
        question: "¿En qué año cayó el Muro de Berlín?", 
        options: ["1989", "1990", "1979", "1991"], 
        correct: "1989" 
    },
    { 
        question: "¿Qué fue el Plan Marshall?", 
        options: ["Un plan de reconstrucción para Europa tras la Segunda Guerra Mundial", "Una estrategia militar estadounidense", "Un acuerdo entre Rusia y EE.UU.", "Un tratado sobre el cambio climático"], 
        correct: "Un plan de reconstrucción para Europa tras la Segunda Guerra Mundial" 
    },
    { 
        question: "¿Qué país inició la Guerra de Vietnam?", 
        options: ["Vietnam del Norte", "Estados Unidos", "Francia", "China"], 
        correct: "Vietnam del Norte" 
    },
    { 
        question: "¿Qué tratado puso fin a la Primera Guerra Mundial?", 
        options: ["Tratado de Versalles", "Tratado de París", "Tratado de Ginebra", "Tratado de Roma"], 
        correct: "Tratado de Versalles" 
    },
    { 
        question: "¿Qué movimiento buscaba la igualdad de género en el siglo XX?", 
        options: ["El feminismo", "La revolución industrial", "El movimiento pacifista", "El comunismo"], 
        correct: "El feminismo" 
    },
    { 
        question: "¿Cuál fue el evento que inició la Guerra Fría?", 
        options: ["El bombardeo de Hiroshima", "El bloqueo de Berlín", "La Revolución Rusa", "La Conferencia de Potsdam"], 
        correct: "El bloqueo de Berlín" 
    }
];

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

// Inicializar las fichas
players.forEach(player => {
    player.element.className = `player player${player.id}`;
    player.element.style.top = `${player.offset}px`;
    board.children[49].appendChild(player.element);
});

rollDiceButton.addEventListener('click', () => {
    if (players[0].position === 49 || players[1].position === 49) return;

    currentDiceRoll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Resultado: ${currentDiceRoll}`;
    movePlayerAndCheckBomb();
});

function movePlayerAndCheckBomb() {
    const player = players[currentPlayerIndex];
    let newPosition = player.position + currentDiceRoll;
    const maxPosition = Math.min(newPosition, 49);

    updatePlayerPosition(player, maxPosition);

    if (maxPosition === 49) {
        alert(`¡Jugador ${player.id} ha ganado!`);
        rollDiceButton.disabled = true;
        return;
    }

    if (bombPositions.includes(maxPosition + 1)) {
        alert("¡Has caído en una bomba nuclear! Retrocedes " + currentDiceRoll + " casillas.");
        const fallbackPosition = Math.max(0, player.position - currentDiceRoll);
        updatePlayerPosition(player, fallbackPosition);
        switchTurn();
    } else {
        askQuestion();
    }
}

function updatePlayerPosition(player, newPosition) {
    const oldCell = board.children[50 - player.position - 1];
    if (oldCell.contains(player.element)) oldCell.removeChild(player.element);
    const newCell = board.children[50 - newPosition - 1];
    newCell.appendChild(player.element);
    player.position = newPosition;
}

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

function checkAnswer(selected, correct) {
    const player = players[currentPlayerIndex];

    if (selected === correct) {
        alert('¡Respuesta correcta!');
    } else {
        alert('Respuesta incorrecta');
        const fallbackPosition = Math.max(0, player.position - currentDiceRoll);
        updatePlayerPosition(player, fallbackPosition);
    }

    questionBox.classList.add('hidden');
    switchTurn();
}

function switchTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    turnIndicator.textContent = `Turno: Jugador ${players[currentPlayerIndex].id}`;
}
