import React, {Component} from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tabs, Tab} from 'material-ui/Tabs';

class AppBarExampleComposition extends Component {
  constructor(props){
    super(props);
  }

  render() {
    var styles = {
      appBar: {
        flexWrap: 'wrap'
      },
      tabs: {
        width: '100%'
      }
    }
    return (
      //containerElement solution was found in stackoverflow to corporate
      //React-Router and Material-UI
      <div>
        <AppBar showMenuIconButton={false} style={styles.appBar} >
          <Tabs style={styles.tabs}>
            <Tab label='Home' containerElement={<Link to="/" />} />
            <Tab label='About' containerElement={<Link to="/about" />} />
            <Tab label='Login' containerElement={<Link to="/login" />}/>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default AppBarExampleComposition;
