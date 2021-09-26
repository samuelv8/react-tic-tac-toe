import React from 'react';
import PropTypes from 'prop-types';

WinCountTable.propTypes = {
    winHistory: PropTypes.object
}

export default function WinCountTable(props) {
    return(
        <div>
            X: {props.winHistory.x} | O: {props.winHistory.o}
        </div>
    );
}