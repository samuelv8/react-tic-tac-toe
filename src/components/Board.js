import React from 'react';
import Square from './Square.js';
import PropTypes from 'prop-types';

Board.propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func
}

function Board(props) {
    const renderSquare = (i) => {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }

    const cols = [0, 1, 2];
    const rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(<div className="board-row">{
            cols.map(j => renderSquare(i * 3 + j)) // hardcoded
        }</div>)
    }

    return (
        <div>
            {rows}
        </div>
    );

}

export default Board;