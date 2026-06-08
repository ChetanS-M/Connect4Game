const rows = 6;
const columns = 7;

let board = [];
let currentPlayer = "R";
let gameOver = false;

window.onload = () => {
    initializeGame();
};

function initializeGame() {

    board = [];

    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    for(let r=0;r<rows;r++){

        let row = [];

        for(let c=0;c<columns;c++){

            row.push("");

            let tile = document.createElement("div");

            tile.id = r + "-" + c;
            tile.classList.add("tile");

            tile.addEventListener("click", placePiece);

            boardElement.appendChild(tile);
        }

        board.push(row);
    }

    currentPlayer = "R";
    gameOver = false;

    document.getElementById("status").innerHTML =
        "🔴 Red's Turn";
}

function placePiece(){

    if(gameOver) return;

    let coords = this.id.split("-");
    let column = parseInt(coords[1]);

    let row = -1;

    for(let r = rows-1; r >= 0; r--){

        if(board[r][column] === ""){
            row = r;
            break;
        }
    }

    if(row === -1) return;

    board[row][column] = currentPlayer;

    let tile = document.getElementById(row + "-" + column);

    if(currentPlayer === "R"){

        tile.classList.add("red-piece");

        currentPlayer = "Y";

        document.getElementById("status").innerHTML =
            "🟡 Yellow's Turn";
    }
    else{

        tile.classList.add("yellow-piece");

        currentPlayer = "R";

        document.getElementById("status").innerHTML =
            "🔴 Red's Turn";
    }

    checkWinner();
}

function checkWinner(){

    // Horizontal
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){

            let piece = board[r][c];

            if(
                piece !== "" &&
                piece === board[r][c+1] &&
                piece === board[r][c+2] &&
                piece === board[r][c+3]
            ){
                declareWinner(piece);
                return;
            }
        }
    }

    // Vertical
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){

            let piece = board[r][c];

            if(
                piece !== "" &&
                piece === board[r+1][c] &&
                piece === board[r+2][c] &&
                piece === board[r+3][c]
            ){
                declareWinner(piece);
                return;
            }
        }
    }

    // Diagonal ↘
    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns-3;c++){

            let piece = board[r][c];

            if(
                piece !== "" &&
                piece === board[r+1][c+1] &&
                piece === board[r+2][c+2] &&
                piece === board[r+3][c+3]
            ){
                declareWinner(piece);
                return;
            }
        }
    }

    // Diagonal ↗
    for(let r=3;r<rows;r++){
        for(let c=0;c<columns-3;c++){

            let piece = board[r][c];

            if(
                piece !== "" &&
                piece === board[r-1][c+1] &&
                piece === board[r-2][c+2] &&
                piece === board[r-3][c+3]
            ){
                declareWinner(piece);
                return;
            }
        }
    }
}

function declareWinner(player){

    gameOver = true;

    if(player === "R"){
        document.getElementById("status").innerHTML =
            "🏆 Red Wins!";
    }
    else{
        document.getElementById("status").innerHTML =
            "🏆 Yellow Wins!";
    }
}

function resetGame(){
    initializeGame();
}