import React from 'react';
import { useSelector } from 'react-redux';

export default function WinCountTable() {
    const history = useSelector(state => state.winnersHistory).sort(comparePlayers); // sort descending

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                {history.map(item => {
                    return (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const comparePlayers = (a, b) => {
    if (a.count > b.count) {
        return -1;
    }
    if (a.count < b.count) {
        return 1;
    }
    return 0;

}