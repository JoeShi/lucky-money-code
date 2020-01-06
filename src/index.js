import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Ranking from './components/Ranking';
import AR from './components/AR';
import Sharing from './components/Sharing';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      
      <Route exact path='/' component={App} />
      <Route path='/ar/' component={AR} />
      <Route path='/ranking' component={App} />
      <Route path='/sharing' component={App} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
