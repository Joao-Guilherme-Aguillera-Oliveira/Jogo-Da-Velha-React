import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  //const emptyBoard =[
   // "0","X","O",
    //"0","X","O",
    //"0","X","O",
  //]
  const emptyBoard =Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("👵");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if(winner) return null;

    if(board[index] !== "") return null; //posição ocupada

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)); // === comparação
    
    setCurrentPlayer(currentPlayer === "🧓" ? "👵" : "🧓")
  }

  const checkWinner = () => {
    const possibleWayToWin = [ //

      //horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      //vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      //diagonal
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWayToWin.forEach(cells => { //
      if (cells.every(cell => cell === "👵")) setWinner("👵"); //every verifica todos os elementos
      if (cells.every(cell => cell === "🧓")) setWinner("🧓");
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) setWinner("E"); //função de flecha
  }

  useEffect(checkWinner, [board]);

  const restGame = () => {
    setCurrentPlayer("👵"); //winner
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className='title'>Jogo Da Velha</h1>
      <h1 className='title1'>Vez de {currentPlayer}</h1>
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (

        <div 

        key={index}
        className={`cell ${item === '🧓' ? 'cell-x' : (item === '👵' ? 'cell-o' : '')}`}//crase para string com variavel
        onClick={() => handleCellClick(index)}

        >

          {item}

        </div>

        ))}
      </div>

      {winner &&
        <footer>
          {winner === "E" ?
            <h2 className='winner-message'>
              <span className='empate'>Empatou !</span>
            </h2>
          :
            <h2 className='winner-message'>
              <span className={`massa ${winner === '🧓' ? 'massa-x' : (winner === '👵' ? 'massa-o' : '')}`}>{winner}</span> venceu !
            </h2>
          }


            <button onClick={restGame}>Reiniciar</button>
        </footer>
      }

    </main>
  );
}

export default App;
