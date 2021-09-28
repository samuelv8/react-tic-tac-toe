import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateName } from '../redux/actions/gameActions';

export default function WelcomePage() {
    const dispatch = useDispatch();

    return (
        <main>
            <form>
                <h1>Welcome to Tic Tac Toe game.</h1>
                <p> Please enter each player&apos;s name below</p>
                X: <input type="text" onChange={(e) => dispatch(updateName(e.target.value, 'X'))} />
                <p></p>
                O: <input type="text" onChange={(e) => dispatch(updateName(e.target.value, 'O'))} />
                <p></p>
            </form>
            <Link to="/game">
                <button>
                    Play Game
                </button>
            </Link>
        </main>
    );
}