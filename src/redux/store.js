import { gameReducer } from "./reducers/gameReducer";
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

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

const middleware = [thunk]

const store = createStore(gameReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;