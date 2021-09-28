import React, { useState } from 'react';
import Board from './Board.js';
import StatusBar from './StatusBar.js';
import MoveList from './MoveList.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playerWins } from '../redux/actions/gameActions.js';
import { findName } from '../redux/reducers/gameReducer.js';

export default function Game() {
    const dispatch = useDispatch();
    const playersNames = useSelector(state => state.players);
    
    const [gameHistory, setGameHistory] = useState(
        [{
            squares: Array(9).fill(null),
            nextPlayer: 'X',
            posChanged: null,
        }]
    );
    const [stepNumber, setStepNumber] = useState(0);
    const [currentWinner, setCurrentWinner] = useState(null);
    const [gameDraw, setGameDraw] = useState(false);

    const handleClick = (i) => {
        const hist = gameHistory.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || currentWinner || gameDraw) {
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
        setCurrentWinner(() => {
            let t = calculateWinner(squares);
            if (t) {
                handleWin(t);
            }
            return t;
        });
        setGameDraw(checkDraw(squares));
    }

    const jumpTo = (step) => {
        const squares = gameHistory[step].squares.slice();
        setStepNumber(step);
        setCurrentWinner(() => calculateWinner(squares));
        setGameDraw(checkDraw(squares));
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
        setCurrentWinner(null);
        setGameDraw(false);
    }

    const handleWin = (winner) => {
        let winnerName = findName(playersNames, winner);
        dispatch(playerWins(winnerName));
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
                    winner={currentWinner}
                    draw={gameDraw}
                    onClick={() => handleNewGame()}
                />
                <MoveList
                    gameHistory={gameHistory}
                    step={stepNumber}
                    onClick={(move) => jumpTo(move)}
                />
            </div>
            <Link to="/history">History</Link>
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

// TODO: smarter draw logic (don't wait to fill the entirely board)
function checkDraw(squares) {
    return squares.every((value) => (value !== null))
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