import { NAME_UPDATE, PLAYER_WINS } from "../actions/gameActions";

const initialState = {
    winnersHistory: [],
    players: [
        {
            name: 'X',
            symbol: 'X'
        },
        {
            name: 'O',
            symbol: 'O'
        }
    ]
}

export function gameReducer(state = initialState, action) {
    switch (action.type) {
        case PLAYER_WINS: {
            let hist = state.winnersHistory.slice();
            let idx = hist.findIndex(x => x.name === action.payload.playerName);
            if (idx + 1) {
                hist[idx].count += 1;
            } else {
                hist = hist.concat([{
                    name: action.payload.playerName,
                    count: 1
                }])
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