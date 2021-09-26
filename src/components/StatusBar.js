import React from 'react';
import PropTypes from 'prop-types';

StatusBar.propTypes = {
    next: PropTypes.string,
    winner: PropTypes.string,
    onClick: PropTypes.func
}

export default function StatusBar(props) {
    let newGame = null;
    const handleWin = () => {
        status = 'Winner: ' + props.winner;
        newGame =
            <button onClick={props.onClick}>
                Start a new game.
            </button>;
    }

    let status = '';
    if (props.winner) {
        handleWin();
    } else {
        status = 'Next player: ' + props.next;
    }
    return (
        <div>
            {status} <span>{newGame}</span>
        </div>

    );
}