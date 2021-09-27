import React from 'react';
import PropTypes from 'prop-types';

StatusBar.propTypes = {
    next: PropTypes.string,
    winner: PropTypes.string,
    draw: PropTypes.bool,
    onClick: PropTypes.func
}

export default function StatusBar(props) {
    const handleWin = () => {
        status = 'Winner: ' + props.winner;
        setNewGameOption();

    }

    const handleDraw = () => {
        status = 'Draw.';
        setNewGameOption();

    }

    const setNewGameOption = () => {
        newGame =
            <button onClick={props.onClick}>
                Start a new game.
            </button>;
    }

    let newGame = null;
    let status = '';
    if (props.winner) {
        handleWin();
    } else if (props.draw) {
        handleDraw();
    } else {
        status = 'Next player: ' + props.next;
    }

    return (
        <div>
            {status} <span>{newGame}</span>
        </div>
    );
}