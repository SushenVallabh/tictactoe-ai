
export function makeMove(board, player, index){
    board[index] = player;
}

export function checkWin(board, player){
    if(board[0]===player && board[1]===player && board[2]===player){
        return true;
    }
    else if(board[3]===player && board[4]===player && board[5]===player){
        return true;
    }
    else if(board[6]===player && board[7]===player && board[8]===player){
        return true;
    }
    else if(board[0]===player && board[3]===player && board[6]===player){
        return true;
    }
    else if(board[1]===player && board[4]===player && board[7]===player){
        return true;
    }
    else if(board[2]===player && board[5]===player && board[8]===player){
        return true;
    }
    else if(board[0]===player && board[4]===player && board[8]===player){
        return true;
    }
    else if(board[2]===player && board[4]===player && board[6]===player){
        return true;
    }
    return false;
}

var visited = []
export function getAIMove(board){
    return alphaBeta(board);
}

function alphaBeta(board){
    var bestBoard = maxValue({board: board, score: 0});
    return bestBoard.board;
}

function maxValue(board, alpha, beta){
    if(isTerminalState(board.board)){
        return {board:board.board, score: getUtility(board.board)};
    }
    var val = -99999;
    var children = getPossibleMoves(board.board, "O");
    var bestChild = {};
    children.forEach(child => {
        var childScore = minValue({board: cloneBoard(child), score:0}, alpha, beta);
        if(childScore.score > val){
            val = childScore.score;
            bestChild.board = child;
        }
        if(val>=beta){
            board.score = val;
            return board;
        }
        alpha = Math.max(alpha, val);
    });
    bestChild.score = val;
    return bestChild;
}

function minValue(board, alpha, beta){
    if(isTerminalState(board.board)){
        return {board:board.board, score: getUtility(board.board)};
    }
    var val = 99999;
    var children = getPossibleMoves(board.board, "X");
    var bestChild = {};
    children.forEach(child => {
        var childScore = maxValue({board: cloneBoard(child), score:0}, alpha, beta);
        if(childScore.score < val){
            val = childScore.score;
            bestChild.board = child;
        }
        if(val<=alpha){
            child.score = val;
            return child;
        }
        alpha = Math.min(alpha, val);
    });
    bestChild.score = val;
    return bestChild;
}

function getPossibleMoves(board, player){
    var moves = []
    for(var i=0;i<9;i++){
        if(board[i]==0){
            var newBoard = cloneBoard(board);
            newBoard[i] = player;
            moves.push(newBoard);
        }
    }
    return moves;
}
function getUtility(board){
    if(checkWin(board,"O")){
        return 1;
    }
    else if(checkWin(board, "X")){
        return -1;
    }
    else{
        return 0;
    }
}

function isVisited(board){
    for(var i=0;i<visited.length;i++){
        var same = true;
        for(var j=0;j<9;j++){
            if(board[j]!=visited[i][j]){
               same = false;
            }
        }
        if(same){
            return true;
        }
    }
    return false;
}

export function isTerminalState(board){
    if(checkWin(board,"X") || checkWin(board,"O")){
        return true;
    }
    for(var i=0;i<9;i++){
        if(board[i]==0){
            return false;
        }
    }
    return true;
}

export function isDraw(board){
    if(isTerminalState(board) && !checkWin(board, "X") && !checkWin(board, 'O')){
        return true;
    }
    return false;
}

function cloneBoard(board){
    var newBoard = []
    for(var i=0;i<9;i++){
        newBoard.push(board[i]);
    }
    return newBoard;
}

export function getLineDirection(board, player){
    if(board[0]===player && board[1]===player && board[2]===player){
        return "rotate(90deg) translateX(-30%)"; 
    }
    else if(board[3]===player && board[4]===player && board[5]===player){
        return "rotate(90deg)";
    }
    else if(board[6]===player && board[7]===player && board[8]===player){
        return "rotate(90deg) translateX(30%)";
    }
    else if(board[0]===player && board[3]===player && board[6]===player){
        return "rotate(0deg) translateX(-30%)";
    }
    else if(board[1]===player && board[4]===player && board[7]===player){
        return "rotate(0deg)";
    }
    else if(board[2]===player && board[5]===player && board[8]===player){
        return "rotate(0deg) translateX(30%)";
    }
    else if(board[0]===player && board[4]===player && board[8]===player){
        return "rotate(-45deg)";
    }
    else if(board[2]===player && board[4]===player && board[6]===player){
        return "rotate(45deg)";
    }
}   