import React, { Component } from 'react';
import NavBar from '../containers/navbar';
import Footer from './footer';
import '../stylesheets/style.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MyAwesomeReactComponent />
      </MuiThemeProvider>
    )
  }
}
