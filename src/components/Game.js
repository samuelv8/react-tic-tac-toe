import React, { useState } from 'react';
import Board from './Board.js';
import StatusBar from './StatusBar.js';
import MoveList from './MoveList.js';
import WinCountTable from './WinCountTable.js';

function Game() {
    const [gameHistory, setGameHistory] = useState(
        [{
            squares: Array(9).fill(null),
            nextPlayer: 'X',
            posChanged: null,
        }]
    );
    const [stepNumber, setStepNumber] = useState(0);
    const [winnerStatus, setWinnerStatus] = useState(
        {
            currentWinner: null,
            xWinCount: 0,
            oWinCount: 0
        }
    );

    const handleClick = (i) => {
        const hist = gameHistory.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || winnerStatus.currentWinner) {
            return;
        }
        squares[i] = current.nextPlayer;
        const next = setNextPlayer(current.nextPlayer);
        setGameHistory(
            hist.concat([{
                squares: squares,
                nextPlayer: next,
                posChanged: { x: i % 3, y: 2 - ((i / 3) >> 0) } //hardcoded
            }])
        );
        setStepNumber(hist.length);
        setWinnerStatus(() => {
            let t = calculateWinner(squares);
            return ({
                currentWinner: t,
                xWinCount: t === 'X' ? winnerStatus.xWinCount + 1 : winnerStatus.xWinCount,
                oWinCount: t === 'O' ? winnerStatus.oWinCount + 1 : winnerStatus.oWinCount
            });
        });
    }

    const jumpTo = (step) => {
        const squares = gameHistory[step].squares.slice();
        setStepNumber(step);
        setWinnerStatus(() => ({
            ...winnerStatus,
            currentWinner: calculateWinner(squares)
        }));
    }

    const handleNewGame = () => {
        setGameHistory(
            [{
                squares: Array(9).fill(null),
                nextPlayer: 'X',
                posChanged: null,
            }]
        );
        setStepNumber(0);
        setWinnerStatus({
            ...winnerStatus,
            currentWinner: null
        });
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={gameHistory[stepNumber].squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <StatusBar
                    next={gameHistory[stepNumber].nextPlayer}
                    winner={winnerStatus.currentWinner}
                    onClick={() => handleNewGame()}
                />
                <MoveList
                    gameHistory={gameHistory}
                    step={stepNumber}
                    onClick={(move) => jumpTo(move)}
                />
            </div>
            <div className="game-info">
                <WinCountTable
                    winHistory={{
                        x: winnerStatus.xWinCount,
                        o: winnerStatus.oWinCount
                    }}
                />
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