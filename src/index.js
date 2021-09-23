import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
        // const cols = [0, 1, 2];
        // const rows = [];

        // for (let i = 0; i < 3; i++) {
        //     rows.push(<div className="board-row">{
        //         cols.map(j => {
        //             this.renderSquare(i + j)
        //         })
        //     }</div>)
        // }

        // return (
        //     <div>
        //         {rows}
        //     </div>
        // );



    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                nextPlayer: 'X',
                posChanged: null,
            }],
            stepNumber: 0,
            winnerPlayer: null,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || this.state.winnerPlayer) {
            return;
        }
        squares[i] = current.nextPlayer;
        const next = setNextPlayer(current.nextPlayer);
        this.setState({
            history: history.concat([{
                squares: squares,
                nextPlayer: next,
                posChanged: { x: i % 3, y: 2 - ((i / 3) >> 0) } //hardcoded
            }]),
            stepNumber: history.length,
            winnerPlayer: calculateWinner(squares),
        });
    }

    jumpTo(step) {
        const squares = this.state.history[step].squares.slice();
        const next = this.state.history[step].nextPlayer;
        this.setState({
            stepNumber: step,
            nextPlayer: next,
            winnerPlayer: calculateWinner(squares),
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        // const pastMoves = history.slice(0, history.length - 1);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move} (${step.posChanged.x}, ${step.posChanged.y})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        disabled={this.state.stepNumber === move}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status = '';
        if (this.state.winnerPlayer) {
            status = 'Winner: ' + this.state.winnerPlayer;
        } else {
            status = 'Next player: ' + current.nextPlayer;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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