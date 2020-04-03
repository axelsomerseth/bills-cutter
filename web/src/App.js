import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import FeedForm from './components/FeedForm.js';
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import history from "./utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';

const feedFormProps = {
    action: 'http://localhost:8080/',
    method: 'POST',
    mode: 'no-cors'
}

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact>
                        <div id="App-content" className="App-content">
                            <FeedForm name="feedForm" action={feedFormProps.action} method={feedFormProps.method} mode={feedFormProps.mode} />
                        </div>
                    </Route>
                    <PrivateRoute path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;