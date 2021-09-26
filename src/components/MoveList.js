import React from 'react';
import PropTypes from 'prop-types';

MoveList.propTypes = {
    gameHistory: PropTypes.array,
    step: PropTypes.number,
    onClick: PropTypes.func
}

export default function MoveList(props) {
    const moves = props.gameHistory.map((step, move) => {
        const desc = move ?
            `Go to move #${move} (${step.posChanged.x}, ${step.posChanged.y})` :
            'Go to game start';
        return (
            <li key={move}>
                <button
                    onClick={() => props.onClick(move)}
                    disabled={props.step === move}
                >
                    {desc}
                </button>
            </li>
        );
    });

    return (
        <ol>
            {moves}
        </ol>
    )
}