const dictionary = ['which',
'there',
'their',
'about',
'would',
'these',
'other',
'words',
'could',
'write',
'first',
'water',
'after',
'where',
'right',
'think',
'three',
'years',
'place',
'sound',
'great',
'again',
'still',
'every',
'small',
'found',
'those',
'never',
'under',
'might',
'while',
'house',
'world',
'below',
'asked',
'going',
'large',
'until',
'along',
'shall',
'being',
'often',
'earth',
'began',
'since',
'study',
'night',
'light',
'above',
'paper',
'parts',
'young',
'story',
'point',
'times',
'heard',
'whole',
'white',
'given',
'means',
'music',
'miles',
'thing',
'today',
'later',
'using',
'money',
'lines',
'order',
'group',
'among',
'learn',
'known',
'space',
'table',
'early',
'trees',
'short',
'hands',
'state',
'black',
'shown',
'stood',
'front',
'voice',
'kinds',
'makes',
'comes',
'close',
'power',
'lived',
'vowel',
'taken',
'built',
'heart',
'ready',
'quite',
'class',
'bring',
'round',
'horse',
'shows',
'piece',
'green',
'stand',
'birds',
'start',
'river',
'tried',
'least',
'field',
'whose',
'girls',
'leave',
'added',
'color',
'third',
'hours',
'moved',
'plant',
'doing',
'names',
'forms',
'heavy',
'ideas',
'cried',
'check',
'floor',
'begin',
'woman',
'alone',
'plane',
'spell',
'watch',
'carry',
'wrote',
'clear',
'named',
'books',
'child',
'glass',
'human',
'takes',
'party',
'build',
'seems',
'blood',
'sides',
'seven',
'mouth',
'solve',
'north',
'value',
'death',
'maybe',
'happy',
'tells',
'gives',
'looks',
'shape',
'lives',
'steps',
'areas',
'sense',
'speak',
'force',
'ocean',
'speed',
'women',
'metal',
'south',
'grass',
'scale',
'cells',
'lower'];
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = letter;
    box.id = `box${row}${col}`;

    container.appendChild(box);
    return box;
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('Not a valid word.');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;
    const animation_duration = 500; // ms

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            } else {
                box.classList.add('empty');
            }
        }, ((i + 1) * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            alert('Congratulations!');
        } else if (isGameOver) {
            alert(`Better luck next time! The word was ${state.secret}.`);
        }
    }, 3 * animation_duration);
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    registerKeyboardEvents();
}

startup();