const scoreBoard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('button');

let lastMole;
let score = 0;
let timeUp = false;

function startGame() {
    timeUp = false;
    showMole();
    score = 0
    scoreBoard.textContent = score;
    let timeForGame = setTimeout(() => timeUp = true, 20000);
}

function randomTime(min, max) {
    const showTime = Math.floor(Math.random() * (max - min)) + min;
    return showTime;
}

function randomMole(moles) {
    let i = Math.floor(Math.random() * moles.length);
    let currentMole = moles[i];
    if (currentMole === lastMole) {
        randomMole(moles);
    }
    lastMole = currentMole;
    return currentMole;
}

function showMole() {
    const time = randomTime(400, 1000);
    const mole = randomMole(moles);
    mole.classList.add('mole_up');
    setTimeout(() => {
        mole.classList.remove('mole_up');
        if (!timeUp) showMole();
    }, time);
}

function catchMole(e) {
    if(e.isTrusted) {
        score++;
        scoreBoard.textContent = score;
    }
}

startButton.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', catchMole));