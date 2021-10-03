import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { getHighScores } from '../api';
import { loadHighScores } from '../redux/actions/tableActions';



export default function HighScoresTable() {
    const dispatch = useDispatch();
    const highScores = useSelector(state => state.highScores).sort(comparePlayers);
    const hasLoadedHighScores = useSelector(state => state.hasLoadedHighScores);
    useEffect(() => {
        if (!hasLoadedHighScores) {
            trackPromise(
                getHighScores()
                    .then(({ data }) => {
                        dispatch(loadHighScores(data))
                    })
            );
        }
    }, [hasLoadedHighScores]);

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