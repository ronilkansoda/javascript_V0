let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let newcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let main1 = document.querySelector("main")


let turnO = true
let n = 0
// arr1 = [[1,6,23,45],["ronil","omil","harry"],["tomato","potato","cherry"]]
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",(e)=>{
        if(turnO){
            box.innerText = "O"
            turnO = false
        }
        else{
            box.innerText = "X"
            turnO = true
        }
        
        box.disabled = true
        n+=1
        let isWinner = checkWinner()

        if(turnO){
            box.style.color = "red"
        }
        else{
            box.style.color = "green"
        }
        if(n==9 && !isWinner)
        {
            Draw()
        }
    })
})

const checkWinner = () => {
    for(pattrens of winpatterns){
        // console.log(pattrens[0],pattrens[1],pattrens[2]);
        // console.log(
        //     boxes[pattrens[0]].innerText,
        //     boxes[pattrens[1]].innerText,
        //     boxes[pattrens[2]].innerText
        // );
        let pos1Val = boxes[pattrens[0]].innerText;
        let pos2Val = boxes[pattrens[1]].innerText;
        let pos3Val = boxes[pattrens[2]].innerText;        
        
        if (pos1Val != '' && pos2Val != '' && pos3Val != ''){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                console.log('Winner is : '+pos1Val);
                showWinner(pos1Val)
                return true
            }
        }    
    }
}

const disabledBoxes = () => {
    for (box of boxes) {
        box.disabled = true
    }
}
const enabledBoxes = () => {
    for (box of boxes) {
        box.disabled = false
        box.innerText = ''
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is : ${winner}`
    newcontainer.classList.remove("hidd");
    main1.classList.add("hidd")
    disabledBoxes()
}
const Draw = () => {
    msg.innerText = `Game is Draw, Try again ;)`
    newcontainer.classList.remove("hidd");
    main1.classList.add("hidd")
    disabledBoxes()
}

const restGame = () => {
    n = 0;
    turnO = true
    enabledBoxes()
    newcontainer.classList.add("hidd")
    main1.classList.remove("hidd")
}
newgamebtn.addEventListener("click",restGame)
reset.addEventListener("click",restGame)

