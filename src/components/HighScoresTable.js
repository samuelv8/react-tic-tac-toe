import React, { useState } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const api = axios.create({
    baseURL: "http://localhost:3000"
});

export default function HighScoresTable() {
    // const history = useSelector(state => state.winnersHistory).sort(comparePlayers); // sort descending
    const [highScores, setHighScores] = useState([])
    trackPromise(
        api.get('/users')
            .then((response) => {
                setHighScores(response.data)
            })
    );
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

// const comparePlayers = (a, b) => {
//     if (a.count > b.count) {
//         return -1;
//     }
//     if (a.count < b.count) {
//         return 1;
//     }
//     return 0;

// }