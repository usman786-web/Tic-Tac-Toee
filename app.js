let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newbtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let modeBtn = document.querySelector("#modeBtn");
let winLine = document.querySelector("#winLine");
let oScore = 0;
let xScore = 0;
let drawScore = 0;

let oScoreText = document.querySelector("#oScore");
let xScoreText = document.querySelector("#xScore");
let drawScoreText = document.querySelector("#drawScore");
// winner sound
let winSound = new Audio("win.wav");
// drawn sound
let drawSound = new Audio("drawn.wav");
let count = 0;
let iswinner = false;
let turnO = true;
let winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetgame = () => {
    turnO = true;
    count = 0;
    iswinner = false;
    enableboxes();
    msgcontainer.classList.add("hide");
    winLine.style.width = "0px";
    winLine.style.width = "0";
    winLine.style.top = "50%";
    winLine.style.left = "50%";
    winLine.style.transform = "rotate(0deg)";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#FF4D4D"
            turnO = false;    
        } else {
            box.innerText = "X";
            box.style.color = "#00B4D8"
            turnO = true; 
        }
        box.disabled = true;
        count++;
        checkwinner();
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
        box.style.backgroundColor = "#ffffcf";
    }
};

let showwinner = (winner) => {
    iswinner = true;

    if(winner === "O"){
        oScore++;
        oScoreText.innerText = oScore;
    }
    else{
        xScore++;
        xScoreText.innerText = xScore;
    }

    msg.innerText = `Congratulation, Winner is ${winner} 👏🎉`;
    winSound.play();

    msgcontainer.classList.remove("hide");

    disableboxes();

};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log(pattern);
                
                boxes[pattern[0]].style.backgroundColor = "#00ff00";
                boxes[pattern[1]].style.backgroundColor = "#00ff00";
                boxes[pattern[2]].style.backgroundColor = "#00ff00";
                drawLine(pattern);
                showwinner(pos1val);
                return;
            }   
        } 
    }
      if (count === 9 && !iswinner) {

        drawScore++;

        drawScoreText.innerText = drawScore;

        msg.innerText = "Game has been Draw 🤝";
        drawSound.play();

        msgcontainer.classList.remove("hide");
        disableboxes();
    }
}

newbtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);
let darkMode = true;

modeBtn.addEventListener("click", () => {

    if(darkMode){

        document.body.style.backgroundColor = "#F5F5F5";

        boxes.forEach((box)=>{
            box.style.backgroundColor = "#FFFFFF";
        });

        modeBtn.innerText = "☀️ Light Mode";

        darkMode = false;

    }
    else{

        document.body.style.backgroundColor = "#2C3E50";

        boxes.forEach((box)=>{
            box.style.backgroundColor = "#FFFFCF";
        });

        modeBtn.innerText = "🌙 Dark Mode";

        darkMode = true;

    }

});
const drawLine = (pattern) => {

    // Horizontal Top
    if(pattern[0] === 0 && pattern[1] === 1 && pattern[2] === 2){
        winLine.style.width = "92%";
        winLine.style.top = "16.5%";
        winLine.style.left = "4%";
        winLine.style.transform = "rotate(0deg)";
    }

    // Horizontal Middle
    else if(pattern[0] === 3 && pattern[1] === 4 && pattern[2] === 5){
        winLine.style.width = "92%";
        winLine.style.top = "49.5%";
        winLine.style.left = "4%";
        winLine.style.transform = "rotate(0deg)";
    }

    // Horizontal Bottom
    else if(pattern[0] === 6 && pattern[1] === 7 && pattern[2] === 8){
        winLine.style.width = "92%";
        winLine.style.top = "82.5%";
        winLine.style.left = "4%";
        winLine.style.transform = "rotate(0deg)";
    }

    // Vertical Left
    else if(pattern[0] === 0 && pattern[1] === 3 && pattern[2] === 6){
        winLine.style.width = "92%";
        winLine.style.left = "16.5%";
        winLine.style.top = "4%";
        winLine.style.transform = "rotate(90deg)";
    }

    // Vertical Center
    else if(pattern[0] === 1 && pattern[1] === 4 && pattern[2] === 7){
        winLine.style.width = "92%";
        winLine.style.left = "49.5%";
        winLine.style.top = "4%";
        winLine.style.transform = "rotate(90deg)";
    }

    // Vertical Right
    else if(pattern[0] === 2 && pattern[1] === 5 && pattern[2] === 8){
        winLine.style.width = "92%";
        winLine.style.left = "82.5%";
        winLine.style.top = "4%";
        winLine.style.transform = "rotate(90deg)";
    }

    // Diagonal Left → Right
    else if(pattern[0] === 0 && pattern[1] === 4 && pattern[2] === 8){
        winLine.style.width = "130%";
        winLine.style.left = "2%";
        winLine.style.top = "2%";
        winLine.style.transform = "rotate(45deg)";
    }

    // Diagonal Right → Left
    else if(pattern[0] === 2 && pattern[1] === 4 && pattern[2] === 6){
        winLine.style.width = "130%";
        winLine.style.left = "95%";
        winLine.style.top = "2%";
        winLine.style.transform = "rotate(135deg)";
    }

};