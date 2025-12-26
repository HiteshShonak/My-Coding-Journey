
        let randomNumber = Math.floor(Math.random()*100 + 1);
        document.querySelector(".randNumber").textContent = randomNumber;
        let submitGuess = document.querySelector(".SubmitGuess");
        let submitBtn = document.querySelector(".submit-btn");
        let CompResponse = document.querySelector(".ComputerResponse");
        let guessInput = document.querySelector(".guess");

        submitBtn.onclick = () => {
            let guess = Number(document.querySelector(".guess").value);

            CompResponse.classList.remove("correctGuess");
            CompResponse.classList.remove("incorrectGuess");

            if(guess === randomNumber){
                CompResponse.textContent = "Correct Guess. Congratulation You Won🏆";
                CompResponse.classList.add("correctGuess");
                document.querySelector(".randNumber").classList.remove("randNumberBluring");

                guessInput.disabled = true;
                submitBtn.disabled = true;
            }

            else if(guess > 100 || guess < 1){
                CompResponse.textContent = "Achha Lode🍌";
                CompResponse.classList.add("incorrectGuess");
            }

            else if(guess > randomNumber){
                CompResponse.textContent = "Too Hot🔥";
                CompResponse.classList.add("incorrectGuess");
            }

            else if(guess < randomNumber){
                CompResponse.textContent = "Too Cold❄️";
                CompResponse.classList.add("incorrectGuess");
            }
        }

        
        guessInput.addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            submitBtn.onclick();
        }
    });