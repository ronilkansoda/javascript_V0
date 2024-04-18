// modular way of writing code is to use functions more nd more
let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice")
const msg = document.querySelector("#msg")
const userScored = document.querySelector("#user-score")
const compScored = document.querySelector("#comp-score")
const restBtn = document.querySelector("#btn")

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id")
        playGame(userChoice)
    })
})

const playGame = (userChoice) => {
    console.log('User choice is : ',userChoice);
    const compChoice = genCompChoice()
    console.log('Comp Choice is : ',compChoice);
    if(userChoice==compChoice){
        //Draw Game
        drawGame()
    }
    else{
        let userWin = true;
        if(userChoice=="rock"){
            userWin = compChoice === "paper" ? false : true
        }
        else if(userChoice=="paper"){
            userWin = compChoice === "rock" ? true : false
        }
        else{
            userWin = compChoice === "rock" ? false : true
        }
        showWinner(userWin,userChoice,compChoice)
    }
}

const genCompChoice = () => {
    let options = ["rock","paper","scissors"]
    const randomIndex =  Math.floor(Math.random()*3)
    return options[randomIndex]
}

const drawGame = () => {
    console.log('game was draw');
    msg.innerText = "Game was draw"
    msg.style.backgroundColor = "grey"
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        console.log('User Wins');
        msg.innerText = `You Win! your ${userChoice} beats ${compChoice} `
        msg.style.backgroundColor = "green"
        userScore += 1
        userScored.innerText = userScore
    }
    else{
        console.log('Computer Wins');
        msg.innerText = `You Lost! ${compChoice} beats your ${userChoice} `
        msg.style.backgroundColor = "red"
        compScore +=1
        compScored.innerText = compScore
    }
}
restBtn.addEventListener("click",() => {
    userScored.innerText = 0
    compScored.innerText = 0
    // msg.style.backgroundColor = "#081b31"
    msg.removeAttribute("style")
    msg.innerText = "Play your Move"
})