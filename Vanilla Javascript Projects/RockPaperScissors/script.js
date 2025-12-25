let compScore = 0;
const compResult = document.querySelector(".compResult");

let playerScore = 0;
const playerResult = document.querySelector(".playerResult");

const result = document.querySelector(".result");

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

let compChoice = "";
let playerChoice = "";

let options = document.querySelector(".options");


function resetHighlights(){
    rock.classList.remove("compChoice", "playerChoice", "bothChoice");
    paper.classList.remove("compChoice", "playerChoice", "bothChoice");
    scissors.classList.remove("compChoice", "playerChoice", "bothChoice");
    

    // rock.classList.remove("defaultOptions");
    // paper.classList.remove("defaultOptions");
    // scissors.classList.remove("defaultOptions");
    

}

function checkResult(player,computer){

    result.classList.remove("playerResult","compResult","bothResult");

    if(player==computer){
        result.textContent = "It's a Draw";
        result.classList.add("bothResult");

    }

    else if(player=="rock" && computer=="scissors" ||
        player=="paper" && computer=="rock" ||
        player=="scissors" && computer=="paper"){

            result.textContent = "Player Won";
            result.classList.add("playerResult");
            playerScore++;
            playerResult.textContent = playerScore;
            
    }

    else{
        result.textContent = "Computer Won";
        result.classList.add("compResult");
        compScore++;
        compResult.textContent = compScore;
        
    }
}

function compMove(){
    let choice = Math.floor(Math.random()*3);
    if(choice==0){
        rock.classList.add("compChoice");
        compChoice = "rock"
    }

    else if(choice==1){
        paper.classList.add("compChoice");
        compChoice = "paper";
    }

    else{
        scissors.classList.add("compChoice");
        compChoice = "scissors";
    }

    return compChoice;
}

options.addEventListener("click", (event) => {
    
    if (!event.target.id) return; 
    resetHighlights();

    playerChoice = event.target.id;
    event.target.classList.add("playerChoice");

    compChoice = compMove();

    if(playerChoice==compChoice){
        event.target.classList.add("bothChoice");
    }

    checkResult(playerChoice, compChoice);

});

