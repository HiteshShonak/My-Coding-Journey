// State Variables
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let bestScore = localStorage.getItem("ngBestScore") || "-";
let isGameActive = true;

// DOM Elements
const guessInput = document.querySelector(".guess");
const submitBtn = document.querySelector("#submitBtn");
const messageEl = document.querySelector(".ComputerResponse");
const numberDisplay = document.querySelector(".randNumber");
const attemptsEl = document.querySelector("#attempts");
const bestScoreEl = document.querySelector("#bestScore");
const restartContainer = document.querySelector("#restartContainer");

// Initialize Best Score on Load
document.addEventListener("DOMContentLoaded", () => {
    bestScoreEl.textContent = bestScore;
    numberDisplay.textContent = "?";
});

// Event Listeners
submitBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkGuess();
});

function checkGuess() {
    if (!isGameActive) return;

    let guess = Number(guessInput.value);

    // Reset Classes
    messageEl.classList.remove("correctGuess", "incorrectGuess");

    // 1. Validation Logic
    if (!guess || guess > 100 || guess < 1) {
        messageEl.textContent = "Nice try, genius! 🤡";
        messageEl.classList.add("incorrectGuess");
        shakeInput();
        return;
    }

    // Gameplay
    attempts++;
    attemptsEl.textContent = attempts;

    // 2. Win Logic
    if (guess === randomNumber) {
        handleWin();
    } 
    // 3. Too High (Hot)
    else if (guess > randomNumber) {
        messageEl.textContent = "Too Hot🔥";
        messageEl.classList.add("incorrectGuess");
        triggerHaptic();
    } 
    // 4. Too Low (Cold)
    else if (guess < randomNumber) {
        messageEl.textContent = "Too Cold❄️";
        messageEl.classList.add("incorrectGuess");
        triggerHaptic();
    }

    // Clear input for speed
    guessInput.value = "";
    guessInput.focus();
}

function handleWin() {
    isGameActive = false;
    
    // Show the number
    numberDisplay.textContent = randomNumber;
    numberDisplay.classList.remove("randNumberBluring");

    // Success Message
    messageEl.textContent = "Correct! You Won 🏆";
    messageEl.classList.add("correctGuess");

    // Update Best Score
    if (bestScore === "-" || attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem("ngBestScore", bestScore);
        bestScoreEl.textContent = bestScore;
    }

    // Reveal Play Again Button
    restartContainer.classList.add("active");
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    triggerWinHaptic();
}

function resetGame() {
    // Reset Logic
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    isGameActive = true;

    // Reset UI
    attemptsEl.textContent = "0";
    messageEl.textContent = "";
    numberDisplay.textContent = "?";
    numberDisplay.classList.add("randNumberBluring");
    
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    
    restartContainer.classList.remove("active");
    guessInput.focus();
}

// Shake Animation for Bad Input
function shakeInput() {
    guessInput.classList.add("shake");
    setTimeout(() => guessInput.classList.remove("shake"), 400);
    if(navigator.vibrate) navigator.vibrate(50);
}

// Mobile Haptics
function triggerHaptic() {
    if (navigator.vibrate) navigator.vibrate(20);
}

function triggerWinHaptic() {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}