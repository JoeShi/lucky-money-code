import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import AR from './components/AR';
import Ranking from './components/Ranking';
import Sharing from './components/Sharing';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
        <Route path="/ar">
            <AR />
        </Route>
        <App />
        <Switch>
          <Route exact path="/">
            <Ranking />
          </Route>
          <Route path="/ranking">
            <Ranking />
          </Route>
          <Route path="/sharing">
            <Sharing />
          </Route>
          
          
        </Switch>
        
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
