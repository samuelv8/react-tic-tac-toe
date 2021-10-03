import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000"
});


export function getHighScores() {
    return (
        api.get('/highscores')
    );
}

export function postScore(username, wins) {
    api.post('/users', {
        username,
        wins
    })
        .catch((error) => console.log(error));
}

export function updateScore(username, wins) {
    api.put(`/users/${username}`, {
        wins
    })
        .catch((error) => console.log(error));
}
