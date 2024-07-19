function createPlyer(name,sign){
    return {
        name,
        sign
    }
}
const gameboard =(()=>{
    let gameBoard=['','','','','','','','',''];

    const render =()=>{
        //generate html
        console.log(gameBoard);
    }

    return{
        gameBoard,
        render
    }
})();

const game =(function gameController(){
    let players = [
     createPlyer(prompt('enter X player name'),"x"),   
     createPlyer(prompt('enter Y player name'),"y")   
    ];
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
    let gameOver=false;
    let Xturn = true;

    const start = ()=>{
       while(!gameOver){
        currentPlayer = Xturn? players[0]:players[1]
        playTurn(currentPlayer);
        Xturn = !Xturn;
       }
    }

    function playTurn(player){
        let index;
        index = prompt(`enter game bord postions for ${player.name}`)
        gameboard.gameBoard[index-1] = player.sign;
         gameboard.render();
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
  
        if(result){
            console.dir(result)
            const winner = players.find((player) => player.sign ===result)
            console.log({winner})
        }else{
            console.log('no winner//tie')
        }

   
   }
    return {
        start
    }
})();

game.start();
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

