import React, { Component } from 'react';
import NavBar from '../containers/navbar';
import Title from './Title';
import Home from '../containers/home'
import Footer from './footer';
import '../stylesheets/style.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Title />
          <Home />
        </div>
      </MuiThemeProvider>
    )
  }
}
