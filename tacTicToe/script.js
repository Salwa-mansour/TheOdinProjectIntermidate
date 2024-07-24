const startBtn = document.querySelector('.controles button');
const boardCells = document.querySelectorAll('.game table td');
const overlay = document.querySelector('.game .overlay');
const showResult = overlay.querySelector('p');

function createPlyer(name,sign){
    return {
        name,
        sign
    }
}
const gameboard =(()=>{
    let gameBoard=['','','','','','','','',''];

    const render =()=>{
        //generate html complete
        console.log(gameBoard);
    }

    return{
        gameBoard,
        render
    }
})();

const game =(function gameController(){
  
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
    let gameOver=true;
    let Xturn = true;
    let players;
   function start(){

        const player1Sign="x";
        const player2Sign="o";
         players = [
         createPlyer(document.querySelector('.player-1 .name').innerText,player1Sign),   
         createPlyer(document.querySelector('.player-2 .name').innerText,player2Sign)   
        ];
        gameOver =false;
        gameReset();
     
        overlay.classList.add('hide');
      // while(!gameOver){
        // currentPlayer = Xturn? players[0]:players[1]
        // playTurn(currentPlayer);
        // Xturn = !Xturn;
    //   }
       
    }
    function playTurn(e){
        if(gameOver) return;
        let index = e.target.dataset.index;
        player = Xturn? players[0]:players[1];
    
        console.log(`${e.target.matches('td')} ${ e.target.innerText.match("")} ${ gameboard.gameBoard[index-1].match("")}`)
        if(e.target.matches('td') && e.target.innerText.match("") && gameboard.gameBoard[index-1].match("") ){
        
        gameboard.gameBoard[index-1] = player.sign;
         e.target.innerText = player.sign
         //using if statment when calling checkwin
         if(checkWin()){
            gameOver = true;
            finishGame(player.sign);
            console.log('we have winner')
         }else if(checkDraw()){
            gameOver = true;
            finishGame();
            console.log('we have tie')
         }
        }
        Xturn = !Xturn;
        showCurrentPlayer();
    }
    function checkWin(){
     //   let winnerSign;
        for(let i=0;i<WINNING_COMBINATIONS.length;i++){
            const [a,b,c]=WINNING_COMBINATIONS[i]
            if(gameboard.gameBoard[a]&&gameboard.gameBoard[b]&&gameboard.gameBoard[c]){//check if not empty
                console.log(`,${gameboard.gameBoard[a]},${gameboard.gameBoard[b]},${gameboard.gameBoard[c]},`)
              
                if(gameboard.gameBoard[a] === gameboard.gameBoard[b] && gameboard.gameBoard[a] === gameboard.gameBoard[c]){
                  //  winnerSign = gameboard.gameBoard[a];
                  
                    return true ;
                }
            }
           
        }
        return false;
    }
   function checkDraw(){

     return gameboard.gameBoard.every(item=> item !=="");
   }
   function finishGame(result=""){
    let winner;
        overlay.classList.remove('hide');
        startBtn.innerText = 'Restart';
        if(result){
            console.dir(result)
             winner = players.find((player) => player.sign ===result)
            console.log({winner})
           
            showResult.innerText = `${winner.name} is the winner !`
        }else{
            console.log('no winner//tie')
            showResult.innerText = 'no winner//tie';
        }
        if(winner.sign==="x"){
            document.querySelector('.player-1').classList.add('winner');
            document.querySelector('.player-2').classList.add('loser');
        }else{
            document.querySelector('.player-2').classList.add('winner');
            document.querySelector('.player-1').classList.add('loser');
        }
        gameOver=true;
   }
   function gameReset(){
   gameboard.gameBoard = gameboard.gameBoard.map(item => item = '');
    console.log(gameboard.gameBoard)
    boardCells.forEach(cell=>cell.innerText='');
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('.player-2').classList.remove('loser');
    document.querySelector('.player-2').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('loser');
   }
   function showCurrentPlayer(){
        if(Xturn){
            document.querySelector(`.player-1 .arrow`).classList.remove('hide') ;   
            document.querySelector(`.player-2 .arrow`).classList.add('hide') ;
            // document.documentElement.style.setProperty(`--current-player`,"X");
            }else{
            document.querySelector(`.player-2 .arrow`).classList.remove('hide');
            document.querySelector(`.player-1 .arrow`).classList.add('hide');
            // document.documentElement.style.setProperty(`--current-player`,"O");
        }
   }
    return {
        start,playTurn
    }
})();
startBtn.addEventListener('click',game.start);
boardCells.forEach(cell=>cell.addEventListener('click', game.playTurn,{
    once:false,
}));
// console.log(startBtn)
// const arr=[]
// console.dir(Array.prototype)
// function takeChoeis(){

// }

// function didecateWinner(){

// }

// function checkWinner(){

// }

// function genereteWinChicker(){

// }

