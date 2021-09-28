import React from 'react';
import Game from './components/Game';
import WelcomePage from './components/WelcomePage';
import WinCountTable from './components/WinCountTable';
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
                        <WinCountTable />
                    </Route>
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
