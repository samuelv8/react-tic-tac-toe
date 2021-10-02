import React from 'react';
import Game from './components/Game';
import WelcomePage from './components/WelcomePage';
import HighScoresTable from './components/HighScoresTable';
import LoadingIndicator from './components/LoadingIndicator';
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
                    <Route path="/game">
                        <Game />
                    </Route>
                    <Route path="/history">
                        <HighScoresTable />
                    </Route>
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                </Switch>
            </Router>
            <LoadingIndicator />
        </Provider>
    );
}
