import { api } from "../../components/HighScoresTable";
import { NAME_UPDATE, PLAYER_WINS } from "../actions/gameActions";
import { LOAD_HIGH_SCORES } from "../actions/tableActions";

export function gameReducer(state, action) {
    switch (action.type) {
        case PLAYER_WINS: {
            let hist = state.winnersHistory.slice();
            let idx = hist.findIndex(x => x.username === action.payload.playerName);
            if (idx + 1) {
                hist[idx].wins += 1;
                api.put(`/users/${action.payload.playerName}`, {
                    wins: hist[idx].wins
                })
                    .catch((error) => console.log(error));
            } else {
                hist = hist.concat([{
                    username: action.payload.playerName,
                    wins: 1
                }])
                api.post('/users', {
                    username: action.payload.playerName,
                    wins: 1
                })
                    .catch((error) => console.log(error));
            }
            return {
                ...state,
                winnersHistory: hist
            }
        }
        case NAME_UPDATE: {
            let ply = state.players.slice();
            let idx = findNameIdx(ply, action.payload.symbol)
            // assumes it will always find idx in array
            ply[idx].name = action.payload.name;
            return {
                ...state,
                players: ply
            }
        }
        case LOAD_HIGH_SCORES: {
            return {
                ...state,
                winnersHistory: action.payload.loadedHighScoresData
            }
        }
        default:
            return state;
    }
}

// Get player's name by it's symbol
export function findName(players, symbol) {
    let idx = findNameIdx(players, symbol);
    // assumes it will always find idx in array
    return players[idx].name;
}

function findNameIdx(players, symbol) {
    return players.findIndex(x => x.symbol === symbol);
}