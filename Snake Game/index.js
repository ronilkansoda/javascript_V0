//Game Constants an variables

let inputDir = { x: 0, y: 0 }
const foodSound = new Audio("music/food.mp3")
const gameOverSound = new Audio("music/gameover.mp3")
const moveSound = new Audio("music/move.mp3")
const musicSound = new Audio("music/music.mp3")
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }


//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
    return false
}

function gameEngine() {
    // Part 1: Updating the snake array and food.
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        inputDir = { x: 0, y: 0 }
        alert('Press any Key to Again');
        snakeArray = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "Score : " + score
        musicSound.play()
    }

    //If you have eaten the food, increment the score and regenrate the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play()
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score++
        scoreBox.innerHTML = "Score : " + score
        if(score>highScoreVal){
            highScoreVal = score
            localStorage.setItem("highScoreBox", JSON.stringify(highScoreVal))
            highScoreBox.innerHTML = "High Score :" + highScoreVal
        }
    }

    //Moving the Snake 
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
    }

    snakeArray[0].x += inputDir.x
    snakeArray[0].y += inputDir.y

    //Part 2: Display the snake and food.
    //Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })


    // Display the Food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}


//Main Logic
let highScore = localStorage.getItem("highScoreBox") || 0
if (highScore === null) {
    highScore = 0
    localStorage.setItem("highScoreBox", JSON.stringify(highScoreVal))
}
else{   
    highScoreVal = JSON.parse(highScore)
    highScoreBox.innerHTML = "High Score :" + highScore
}
window.requestAnimationFrame(main)
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})