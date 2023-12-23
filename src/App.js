import { useState } from "react";



// Main Board Components
export default function Board() {
  // useState for Squares Make Array
  const [squares, setSquares] = useState(Array(9).fill(null));

  // useState for X & O
  const [xIsNext, setXIsNext] = useState(true);

  // UseState for History
  const [history, setHistory] = useState(Array(1).fill(Array(9).fill(null)));
  const [saveR, setSaveR] = useState(0);

  // HandleCLick Function
  function handleClick(i) {
    // Condition for that not remove filled square with X || O
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Condition for Square Array that it's a X move or O move
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // set Number R
    let r = saveR;
    setSaveR(r + 1);
    // History Variable
    const changeHistory = history.concat([nextSquares]);
    setHistory(changeHistory);

    // Consolo.logs ======================================
    console.log(`Move Number:${r + 1}`, nextSquares);
    console.log("Histor", changeHistory);
  }

  // Status Who is the Winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // HTML return
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Square Components
function Square({ value, onSquareClick }) {
  // State for Remembring things
  // const [value, setValue] = useState(null);

  // HandleClick Function
  // function handleClick() {
  //   setValue("X");
  // }

  return (
    <button
      //  onClick={handleClick}
      onClick={onSquareClick}
      className="square"
    >
      {value}
    </button>
  );
}

// Calculate Winner Function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
