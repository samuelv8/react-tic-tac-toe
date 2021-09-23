import React from 'react';
import PropTypes from 'prop-types';

Square.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func
};

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;