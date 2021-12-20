/*----- constants -----*/

const PLAYERS = {
   '': '',
   '1': 'X',
   '-1': 'O'
};

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;
let plays;
let player1Score = 0;
let player2Score = 0;

/*----- cached element references -----*/
let button = document.getElementById('play');
let reset = document.getElementById('reset')
let msgDisp = document.querySelector('h1');
let scoreX = document.getElementById('ScoreX');
let scoreO = document.getElementById('ScoreO');
    


/*----- event listeners -----*/
button.addEventListener('click', init);
document.getElementById('board')
    .addEventListener('click', renderChoice);
reset.addEventListener('click', resetScore)



/*----- functions -----*/
init();

function init(){
    board = [
        ['','',''], //c0r0, c1r0, c2r0
        ['','',''], //c0r1, c1r1, c2r1
        ['','','']  //c0r2, c1r2, c2r2
    ];
    turn = 1;
    winner = null;
    plays = 0;
    render();
}

function render(){
    button.style.visibility = winner ? 'visible' : 'hidden';
    reset.style.visibility = winner ? 'visible' : 'hidden';
    renderBoard();
    renderMessage();
}

function resetScore(){
    player1Score = 0;
    player2Score = 0;
    scoreO.innerHTML = `Score: ${player2Score}`;
    scoreX.innerHTML = `Score: ${player1Score}`;
}

function renderBoard() {
    
    board.forEach(function (rowArr, rowIdx) {
        rowArr.forEach(function (playerVal, colIdx) {
            const divId = `c${colIdx}r${rowIdx}`;  // e.g. "c6r5"
            const box = document.getElementById(divId);
            let element = board[rowIdx][colIdx];
            box.innerHTML = PLAYERS[element];
        });
    });
}

function renderChoice(e){
    let boxID = (e.target.id)
    let box = document.getElementById(boxID);
    let colIdx = boxID[1];
    let rowIdx = boxID[3];
    let currentPos = board[rowIdx][colIdx];
    if (boxID === "board" || winner) return;
    else if (currentPos !== '') return;
    board[rowIdx][colIdx] = turn;
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render();
 }

function renderMessage(){
    if (winner === "TIE"){
        msgDisp.innerHTML = "It's a Tie! Play again?";
    } else if (winner){
        msgDisp.innerHTML = `${PLAYERS[winner]} WINS!`;
        scoreO.innerHTML = `Score: ${player2Score}`;
        scoreX.innerHTML = `Score: ${player1Score}`;
    } else {
        msgDisp.innerHTML = `${PLAYERS[turn]}'s TURN!`;
    }
}

//check if there is a winner
function getWinner(){
    winner = checkWin();
    if (winner === 1)  player1Score ++;
    else if (winner === -1) player2Score ++;
    else if (plays === 9 && winner === null) return winner = "TIE";
return winner;
}

function checkWin(){
        // horizontal
        if (Math.abs(board[0][0] + board[0][1] + board[0][2]) === 3) return winner = turn;
        if (Math.abs(board[1][0] + board[1][1] + board[1][2]) === 3) return winner = turn;
        if (Math.abs(board[2][0] + board[2][1] + board[2][2]) === 3) return winner = turn;
        //vertical
        if (Math.abs(board[0][0] + board[1][0] + board[2][0]) === 3) return winner = turn;
        if (Math.abs(board[0][1] + board[1][1] + board[2][1]) === 3) return winner = turn;
        if (Math.abs(board[0][2] + board[1][2] + board[2][2]) === 3) return winner = turn;
        // diagonal
        if (Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3) return winner = turn;
        if (Math.abs(board[2][0] + board[1][1] + board[0][2]) === 3) return winner = turn;

        return null;
    }