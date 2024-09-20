const words = ["apple", "banana", "orange", "grape", "watermelon"];
const wordContainer = document.querySelector('.word');
const correctCountEl = document.querySelector('.correct-count');
const wrongCountEl = document.querySelector('.wrong-count');
const mistakesEl = document.querySelector('.word-mistakes');
const timerEl = document.getElementById('timer');

let currentWord = '';
let correctCount = 0;
let wrongCount = 0;
let mistakesInCurrentWord = 0;
let timerInterval;
let idx = 0;

function setNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordContainer.innerHTML = '';

    currentWord.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('symbol');
        wordContainer.appendChild(span);
    });

    idx = 0;
    mistakesInCurrentWord = 0;
    mistakesEl.textContent = mistakesInCurrentWord;
    startTimer();
    checkWordsCount();  
}

function startTimer() {
    const startTime = Date.now();
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function checkWordsCount() {
    if (wrongCount >= 5) {
        alert('Вы проиграли :( Ваше время: ' + timerEl.textContent);
        clearInterval(timerInterval);
    }

    if (correctCount >= 5) {
        alert('Победа! Ваше время: ' + timerEl.textContent);
        clearInterval(timerInterval);
    }
}

wordContainer.setAttribute('tabindex', '0');
wordContainer.focus();

wordContainer.addEventListener('keydown', (e) => {
    const inputChar = e.key;

    if (inputChar.length === 1 && /^[a-zA-Z]$/.test(inputChar)) {
        if (inputChar === currentWord[idx]) {
            if (wordContainer.childNodes[idx].classList.contains('w')) {
                wordContainer.childNodes[idx].classList.remove('w');
            }
            wordContainer.childNodes[idx].classList.add('c');
            idx++;

            checkWordsCount();
        } else {
            wordContainer.childNodes[idx].classList.add('w');
            mistakesInCurrentWord++;
            mistakesEl.textContent = mistakesInCurrentWord;
            wrongCount++;
            wrongCountEl.textContent = wrongCount;
        }

        if (idx === currentWord.length) {
            correctCount++;
            correctCountEl.textContent = correctCount;
            setTimeout(() => {
                setNewWord();
            }, 1000);
        }
    }
});

setNewWord();
wordContainer.focus();