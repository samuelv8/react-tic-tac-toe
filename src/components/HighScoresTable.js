import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { loadHighScores } from '../redux/actions/tableActions';

export const api = axios.create({
    baseURL: "http://localhost:3000"
});

export default function HighScoresTable() {
    const dispatch = useDispatch();
    const highScores = useSelector(state => state.winnersHistory).sort(comparePlayers);
    if (highScores.length < 3) {
        trackPromise(
            api.get('/highscores')
                .then(({ data }) => {
                    dispatch(loadHighScores(data))
                })
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                {highScores.map(Row)}
            </tbody>
        </table>
    );
}

const Row = (item) => {
    return (
        <tr key={item.username}>
            <td>{item.username}</td>
            <td>{item.wins}</td>
        </tr>
    );
}

const comparePlayers = (a, b) => {
    if (a.wins > b.wins) {
        return -1;
    }
    if (a.wins < b.wins) {
        return 1;
    }
    return 0;
}