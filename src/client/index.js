import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import RequireAuth from './components/auth/require_auth';

import App from './components/app';
import About from './components/About';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './containers/home';

import { AUTH_USER , TAB_INDEX} from './actions/types'

//This is for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import reducers from './reducers/';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

//This is for JWT applications, if needed
const token = localStorage.getItem('token');

if(token) {
  store.dispatch( {type: AUTH_USER} );
}

injectTapEventPlugin();


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={() => store.dispatch( {type: TAB_INDEX, payload: 0} )} />
        <Route path="about" component={About} onEnter={() => store.dispatch( {type: TAB_INDEX, payload: 1} )} />
        <Route path="login" component={Login} onEnter={() => store.dispatch( {type: TAB_INDEX, payload: 2} )} />
        <Route path="signup" component={Signup} onEnter={() => store.dispatch( {type: TAB_INDEX, payload: 3} )} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#project'));
