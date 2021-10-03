import { NAME_UPDATE, PLAYER_WINS } from "../actions/gameActions";
import { LOAD_HIGH_SCORES } from "../actions/tableActions";
import { postScore, updateScore } from "../../api";

export function gameReducer(state, action) {
    switch (action.type) {
        case PLAYER_WINS: {
            let hist = state.highScores.slice();
            let idx = hist.findIndex(x => x.username === action.payload.playerName);
            if (idx + 1) {
                hist[idx].wins += 1;
                updateScore(hist[idx].username, hist[idx].wins);
            } else {
                hist = hist.concat([{
                    username: action.payload.playerName,
                    wins: 1
                }])
                postScore(action.payload.playerName, 1);
            }
            return {
                ...state,
                highScores: hist
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
                highScores: action.payload.loadedHighScoresData,
                hasLoadedHighScores: true
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