// eu sei que não usei nenhum laço de repetição, que é o propósito da aula em desenvolver isso

const gameMenu = document.querySelector(".game-menu");
const playBtn = document.querySelector("#play-btn");

const gameDifficulty = document.querySelector(".game-difficulty");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
let difficulty;

const game = document.querySelector(".game");
const gameLog = document.querySelector("#game-log");
const gameHint = document.querySelector("#game-hint");
const mainLabel = document.querySelector("#main-label");
let triesSpan = document.querySelector("#tries-span");
let tries;
const mainInput = document.querySelector("#main-input");
let guessedNumber;
let range;
let secretNumber;
const sortBtn = document.querySelector("#sort-btn");
let sortedNumber;
const playAgainBtn = document.querySelector("#play-again-btn");

const gameWin = document.querySelector(".game-win");
const revealedSecretNumberSpan = document.querySelector("#revealed-secret-number-span");
const returnToMenuBtn = document.querySelector("#return-to-menu-btn");

playBtn.addEventListener("click", () => {    
    gameMenu.style.display = "none";
    gameDifficulty.style.display = "block";
});

difficultyBtns.forEach(difficultyBtn => {
    difficultyBtn.addEventListener("click", () => {
        difficulty = difficultyBtn.value;
        
        if(difficulty == "easy"){
            range = 50;
            tries = 20;
        } else if(difficulty == "normal"){
            range = 100;
            tries = 10;
        } else {
            range = 150;
            tries = 5;
        }

        gameDifficulty.style.display = "none";
        game.style.display = "flex";
        triesSpan.textContent = tries;
        secretNumber = parseInt(Math.random() * range)+1;
    });
});

mainInput.addEventListener("keyup", (e) => {
    guessedNumber = mainInput.value;
    
     breakme: if(e.keyCode == 13){ // verificar a tecla Enter
        if(tries > 0 && guessedNumber != ""){
            mainInput.value = "";

            const hint = document.createElement("li");

            if(guessedNumber < secretNumber){
                hint.textContent = "O número é maior";
                console.log("O número é maior");
            } else if(guessedNumber > secretNumber){
                hint.textContent = "O número é menor";
                console.log("O número é menor");
            }

            gameHint.appendChild(hint);

            const previousNumber = document.createElement("li");
            previousNumber.textContent = guessedNumber;
            gameLog.appendChild(previousNumber);

            if(guessedNumber == secretNumber){
                game.style.display = "none";
                gameWin.style.display = "block";
                revealedSecretNumberSpan.textContent = secretNumber;

                const ol = document.querySelectorAll("ol");
                ol.forEach(ol => {ol.innerHTML=""});
                break breakme;
            }

            tries--;
            triesSpan.textContent = tries;

            if(tries <= 0){
                mainLabel.textContent = "Você perdeu";
                mainLabel.style.fontSize = "x-large";
                mainInput.value = "";
                mainInput.placeholder = "Quem sabe na próxima?"
                mainInput.style.pointerEvents = "none";
                sortBtn.style.display = "none";
                playAgainBtn.style.display = "block";
            }
        }
    }
});

sortBtn.addEventListener("click", () => {
    sortedNumber = parseInt(Math.random() * range)+1;
    mainInput.value = sortedNumber;
});

playAgainBtn.addEventListener("click", () => {
    mainLabel.innerHTML = "<h2 id='main-label'>Tentativas: <span id='tries-span'>20</span><h2>";
    triesSpan = document.querySelector("#tries-span");
    mainLabel.style.fontSize = "medium";
    mainInput.placeholder = "Tente você mesmo";
    mainInput.style.pointerEvents = "auto";
    sortBtn.style.display = "block";
    playAgainBtn.style.display = "none";
    
    const ol = document.querySelectorAll("ol");
    ol.forEach(ol => {ol.innerHTML=""});

    if(difficulty == "easy"){
        range = 50;
        tries = 20;
    } else if(difficulty == "normal"){
        range = 100;
        tries = 10;
    } else {
        range = 500;
        tries = 5;
    }
    
    triesSpan.textContent = tries;
    secretNumber = parseInt(Math.random() * range)+1;
});

returnToMenuBtn.addEventListener("click", () => {
    gameWin.style.display = "none";
    gameMenu.style.display = "block";

    if(difficulty == "easy"){
        range = 50;
        tries = 20;
    } else if(difficulty == "normal"){
        range = 100;
        tries = 10;
    } else {
        range = 500;
        tries = 5;
    }
});