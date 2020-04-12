import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import FeedForm from './components/FeedForm.js';
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import BillsHistory from "./components/BillsHistory";
import PrivateRoute from "./components/PrivateRoute";
import history from "./utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    document.title = 'Bills Cutter';

    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact>
                        <div id="App-content" className="App-content">
                            <FeedForm name="feedForm" />
                        </div>
                    </Route>
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/history" component={BillsHistory} />
                </Switch>
            </Router>
        </div>
    );
}


export default App;