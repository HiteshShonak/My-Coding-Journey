const display = document.querySelector(".display");

const operators = ['+','-','*','/','.'];

function appendToDisplay(input){


    let current = display.textContent;
    let lastChar = current.slice(-1);

    if (operators.includes(input) && operators.includes(lastChar)) {
        return;
    }

    if (operators.includes(input) && operators.includes(lastChar)) {
        return;
    }

    display.textContent += input;

    display.scrollLeft = display.scrollWidth;

}



function clearDisplay(){

    display.textContent = "";
}

function Calculate(){
    try {
        display.textContent = eval(display.textContent);
    } catch {
        display.textContent = "Error";
    }

    display.scrollLeft = display.scrollWidth;
}


function squareNumber() {
    let value = display.textContent.trim();
    if (value === "") return; 
    
    try {
        let num = eval(value);  
        display.textContent = Math.pow(num, 2);
    } catch (error) {
        display.textContent = "Error";
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
            display.textContent = Math.sqrt(num);
        }
    } catch (error) {
        display.textContent = "Error";
    }
}