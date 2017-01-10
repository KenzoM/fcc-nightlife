import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';

class YelpCard extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderGuestLists = this.renderGuestLists.bind(this);
    this.state = {open: false};
  }

  handleOpen(){
    this.setState({open: true})
  }

  handleClose(){
    this.setState({open: false})
  }

  onSubmit(){
    const {clubID, userName, userEmail, city } = this.props
    this.props.updateGuestList(clubID, userName, userEmail, city)
  }
  renderGuestLists(guestLists){
    if (guestLists.length !== 0){
      return(
        <ul>
          {guestLists.map( guest =>{
            return <li key={guest}>{guest}</li>
          })}
        </ul>
      )
    } else{
      return(
        <div>No Guests at the moment</div>
      )
    }
  }
  render(){
    const { name, guests, clubID, address, display_phone, image_url,
      snippet_text, url, auth, userName, userEmail, isCurrentUserReserved, city } = this.props
    let labelText = isCurrentUserReserved ? 'Yes I am going!' : 'Going Tonight?';
    const actions = [
      <FlatButton
        label="Ok!"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return(
      <div className="my-card">
        <Card>
          <CardMedia overlay={<CardTitle title={name} />}>
            <img src={image_url} />
          </CardMedia>
          <CardTitle title={address} subtitle={display_phone} />
          <CardText>
            {snippet_text}
          </CardText>
          <CardActions>
            <FlatButton label="Reviews at Yelp"
              href={url}
              target="_blank"
              backgroundColor="#e2e2e2"
            />
            <FlatButton label="List of Guests"
              primary={true}
              onTouchTap={this.handleOpen}
            />
            <FlatButton
              secondary={true}
              label={labelText}
              disabled={!auth}
              onTouchTap={ () => this.onSubmit()}
            />
          </CardActions>
        </Card>
        <Dialog
          title={`List of Guests at ${name}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.renderGuestLists(guests)}
        </Dialog>
      </div>
    )
  }
}
// {guests.length !== 0 ? guests.map(this.renderGuestLists) : 'No Guests at the moment'}

function mapStateToProps(state){
  return {
    auth: state.auth.authenticated,
    userName: state.auth.userName,
    userEmail: state.auth.email
  }
}

export default connect(mapStateToProps, actions)(YelpCard);
