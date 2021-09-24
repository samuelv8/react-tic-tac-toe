import React, { useState } from 'react';
import Board from './Board.js';

function Game() {
    const [history, setHistory] = useState(
        [{
            squares: Array(9).fill(null),
            nextPlayer: 'X',
            posChanged: null,
        }]
    );
    const [stepNumber, setStepNumber] = useState(0);
    const [winnerPlayer, setWinnerPlayer] = useState(null);

    const handleClick = (i) => {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || winnerPlayer) {
            return;
        }
        squares[i] = current.nextPlayer;
        const next = setNextPlayer(current.nextPlayer);
        setHistory(
            hist.concat([{
                squares: squares,
                nextPlayer: next,
                posChanged: { x: i % 3, y: 2 - ((i / 3) >> 0) } //hardcoded
            }])
        );
        setStepNumber(hist.length);
        setWinnerPlayer(calculateWinner(squares));
    }

    const jumpTo = (step) => {
        const squares = history[step].squares.slice();
        setStepNumber(step);
        setWinnerPlayer(calculateWinner(squares));
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move #${move} (${step.posChanged.x}, ${step.posChanged.y})` :
            'Go to game start';
        return (
            <li key={move}>
                <button
                    onClick={() => jumpTo(move)}
                    disabled={stepNumber === move}
                >
                    {desc}
                </button>
            </li>
        );
    });

    let status = '';
    if (winnerPlayer) {
        status = 'Winner: ' + winnerPlayer;
    } else {
        status = 'Next player: ' + history[stepNumber].nextPlayer;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history[stepNumber].squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

function setNextPlayer(currentPlayer) {
    switch (currentPlayer) {
        case 'X':
            return 'O';
        default:
            return 'X';
    }
}

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

export default Game;