import React from 'react';
import Game from './components/Game';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Game />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
