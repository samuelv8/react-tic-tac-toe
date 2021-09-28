export const PLAYER_WINS = 'PLAYER_WINS';
export const NAME_UPDATE = 'NAME_UPDATE';


export const playerWins = (playerName) => ({
    type: PLAYER_WINS,
    payload: { playerName }
});

export const updateName = (name, symbol) => ({
    type: NAME_UPDATE,
    payload: {
        name: name,
        symbol: symbol
    }
});
