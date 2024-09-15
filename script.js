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
let userInput = ''; 

function setNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordContainer.innerHTML = '';

    currentWord.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        wordContainer.appendChild(span);
    });

    userInput = ''; 
    mistakesInCurrentWord = 0;
    mistakesEl.textContent = mistakesInCurrentWord; 
    startTimer(); 
    wordContainer.focus(); 
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

wordContainer.setAttribute('tabindex', '0');

wordContainer.addEventListener('keydown', (e) => {
    e.preventDefault();
    const inputChar = e.key;

    if (inputChar.length === 1 && /^[a-zA-Z]$/.test(inputChar)) {
        userInput += inputChar;
    } else if (inputChar === 'Backspace') {
        userInput = userInput.slice(0, -1); 
    } else {
        return; 
    }    

    wordContainer.childNodes.forEach((span) => {
        span.className = ''; 
    });

    if (currentWord.startsWith(userInput)) {
        wordContainer.childNodes.forEach((span, index) => {
            if (index < userInput.length) {
                span.className = 'correct';
            }
        });

        if (userInput === currentWord) {
            correctCount++;
            correctCountEl.textContent = correctCount;

            if (correctCount === 5) {
                alert('Вы выиграли!');
                resetGame();
            } else {
                setNewWord();
            }
        }
    } else {
        if (userInput.length <= currentWord.length) {
            const mistakeIndex = userInput.length - 1;
            if (mistakeIndex >= 0) {
                wordContainer.childNodes[mistakeIndex].className = 'wrong';
            }
            mistakesInCurrentWord++;
            mistakesEl.textContent = mistakesInCurrentWord;

            if (mistakesInCurrentWord > 5) {
                wrongCount++;
                wrongCountEl.textContent = wrongCount;

                if (wrongCount === 5) {
                    alert('Вы проиграли!');
                    resetGame();
                } else {
                    alert('Ошибка! Повторите ввод.');
                    mistakesInCurrentWord = 0;
                    mistakesEl.textContent = mistakesInCurrentWord;
                    userInput = '';
                }
            }
        }
    }
});

function resetGame() {
    clearInterval(timerInterval);
    correctCount = 0;
    wrongCount = 0;
    mistakesInCurrentWord = 0;
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
    mistakesEl.textContent = mistakesInCurrentWord;
    timerEl.textContent = '00:00';
    setNewWord();
}

setNewWord(); 