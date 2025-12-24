const display = document.querySelector(".display");
const historyList = document.getElementById("historyList");
const historySidebar = document.getElementById("historySidebar");
const overlay = document.querySelector(".overlay");

const allowedKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 
    '+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape'
];

// 1. Load Everything from Local Storage on Startup
document.addEventListener("DOMContentLoaded", () => {
    // Load History
    const savedHistory = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    for (let i = savedHistory.length - 1; i >= 0; i--) {
        addToHistory(savedHistory[i].expression, savedHistory[i].result, false);
    }

    // Load Screen State (The new feature)
    const savedDisplay = localStorage.getItem("calculatorDisplay");
    if (savedDisplay) {
        display.textContent = savedDisplay;
    }
});

// 2. Save Display State Helper
function saveDisplay() {
    localStorage.setItem("calculatorDisplay", display.textContent);
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!allowedKeys.includes(key)) return;

    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === "Enter" || key === "=") {
        Calculate();
    } else if (key === "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
        saveDisplay(); // Save after delete
    } else if (key === "Escape") {
        clearDisplay();
    }
});

function appendToDisplay(input){
    let current = display.textContent;
    let lastChar = current.slice(-1);
    const operators = ['+','-','*','/','.'];

    if (operators.includes(input) && operators.includes(lastChar)) return;

    display.textContent += input;
    display.scrollLeft = display.scrollWidth;
    saveDisplay(); // Save after input
}

function clearDisplay(){
    display.textContent = "";
    saveDisplay(); // Save empty state
}

function Calculate(){
    let expression = display.textContent;
    if(expression.trim() === "") return;

    try {
        let result = eval(expression);
        if (result % 1 !== 0) result = parseFloat(result.toFixed(4));
        
        addToHistory(expression, result, true);
        display.textContent = result;
        saveDisplay(); // Save the result to screen memory
    } catch {
        display.textContent = "Error";
        saveDisplay();
    }
    display.scrollLeft = display.scrollWidth;
}

function squareNumber() {
    let value = display.textContent.trim();
    if (value === "") return; 
    try {
        let num = eval(value);  
        let result = Math.pow(num, 2);
        addToHistory(`${num}²`, result, true);
        display.textContent = result;
        saveDisplay();
    } catch { 
        display.textContent = "Error"; 
        saveDisplay();
    }
}

function squareRootNumber() {
    let value = display.textContent.trim();
    if (value === "") return;
    try {
        let num = eval(value);
        if (num < 0) {
            display.textContent = "Error";
        } else {
            let result = Math.sqrt(num);
            if (result % 1 !== 0) result = parseFloat(result.toFixed(4));
            addToHistory(`√${num}`, result, true);
            display.textContent = result;
        }
        saveDisplay();
    } catch { 
        display.textContent = "Error"; 
        saveDisplay();
    }
}

function toggleHistory() {
    historySidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function addToHistory(expression, result, shouldSave = false) {
    const emptyMsg = document.querySelector(".empty-msg");
    if(emptyMsg) emptyMsg.remove();

    const item = document.createElement("div");
    item.classList.add("history-item");
    item.innerHTML = `<span>${expression} =</span> <strong>${result}</strong>`;
    historyList.prepend(item);

    if (shouldSave) {
        const saved = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
        saved.unshift({ expression, result });
        localStorage.setItem("calculatorHistory", JSON.stringify(saved));
    }
}

function clearHistory() {
    historyList.innerHTML = '<p class="empty-msg">Start calculating...</p>';
    localStorage.removeItem("calculatorHistory");
}