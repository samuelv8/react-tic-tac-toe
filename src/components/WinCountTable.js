import React from 'react';
import { useSelector } from 'react-redux';

export default function WinCountTable() {
    const history = useSelector(state => state.winnersHistory)

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