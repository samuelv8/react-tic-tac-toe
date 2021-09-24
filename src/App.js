import React from 'react';
import Game from './components/Game';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <Game />
        </Provider>
    );
}
