// State Variables
let playerScore = 0;
let compScore = 0;
let currentStreak = 0;
let bestStreak = 0;
let isGameActive = true; 

// DOM Elements
const resultMsg = document.querySelector("#resultMsg");
const playerResultEl = document.querySelector(".playerResult");
const compResultEl = document.querySelector(".compResult");
const streakEl = document.getElementById("currentStreak");
const bestStreakEl = document.getElementById("bestStreak");
const buttons = document.querySelectorAll(".game-btn");
const playAgainContainer = document.getElementById("playAgainContainer");
const rulesModal = document.getElementById("rulesModal");
const optionsDiv = document.querySelector('.options');

// Load Best Streak from Local Storage
document.addEventListener("DOMContentLoaded", () => {
    const savedBest = localStorage.getItem("rpsBestStreak");
    if (savedBest) {
        bestStreak = parseInt(savedBest);
        bestStreakEl.textContent = bestStreak;
    }
});

// Event Listeners for Game Buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (isGameActive) {
            playRound(button.id);
            triggerHaptic(); 
        }
    });
});

function playRound(playerChoice) {
    // Lock game input
    isGameActive = false;

    // Computer Move
    const options = ["rock", "paper", "scissors"];
    const compChoice = options[Math.floor(Math.random() * 3)];

    // Visual Logic
    highlightBoard(playerChoice, compChoice);

    // Determine Winner
    if (playerChoice === compChoice) {
        handleDraw(playerChoice);
    } else if (
        (playerChoice === "rock" && compChoice === "scissors") ||
        (playerChoice === "paper" && compChoice === "rock") ||
        (playerChoice === "scissors" && compChoice === "paper")
    ) {
        handleWin(playerChoice);
    } else {
        handleLoss(playerChoice, compChoice);
    }

    // Blur options and show Overlay
    optionsDiv.style.filter = "blur(5px)";
    optionsDiv.style.opacity = "0.5";
    showPlayAgainBtn();
}

function highlightBoard(player, comp) {
    // Dim all buttons
    buttons.forEach(btn => btn.classList.add("dimmed"));

    // Highlight selected
    document.getElementById(player).classList.remove("dimmed");
    document.getElementById(comp).classList.remove("dimmed");
}

function handleWin(player) {
    resultMsg.textContent = "YOU WON! 🔥";
    resultMsg.style.color = "#4cd137";
    document.getElementById(player).classList.add("won");
    
    playerScore++;
    currentStreak++;
    updateScores();
    checkBestStreak();
}

function handleLoss(player, comp) {
    resultMsg.textContent = "YOU LOST! 💀";
    resultMsg.style.color = "#ff4757";
    document.getElementById(player).classList.add("lost");
    document.getElementById(comp).classList.add("won"); 
    
    compScore++;
    currentStreak = 0;
    updateScores();
}

function handleDraw(player) {
    resultMsg.textContent = "DRAW! 😐";
    resultMsg.style.color = "#ffa502";
    document.getElementById(player).classList.add("draw");
}

function showPlayAgainBtn() {
    playAgainContainer.classList.add("active");
}

// Reset Game State for Next Round
function resetRound() {
    isGameActive = true;
    playAgainContainer.classList.remove("active");
    
    // Remove blur
    optionsDiv.style.filter = "none";
    optionsDiv.style.opacity = "1";
    
    // Reset button styles
    buttons.forEach(btn => {
        btn.classList.remove("won", "lost", "draw", "dimmed");
    });
    
    resultMsg.textContent = "Choose your weapon";
    resultMsg.style.color = "#fff";
}

function updateScores() {
    playerResultEl.textContent = playerScore;
    compResultEl.textContent = compScore;
    streakEl.textContent = currentStreak;
}

function checkBestStreak() {
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        bestStreakEl.textContent = bestStreak;
        localStorage.setItem("rpsBestStreak", bestStreak);
    }
}

// Mobile Vibration
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(40);
    }
}

// Modal Logic
function openRules() {
    rulesModal.classList.add("active");
}

function closeRules(event) {
    if (event.target.id === "rulesModal" || event.target.classList.contains("close-modal")) {
        rulesModal.classList.remove("active");
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && rulesModal.classList.contains("active")) {
        rulesModal.classList.remove("active");
    }
});