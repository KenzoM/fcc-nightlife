import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

class YelpCard extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(){
    const {clubID, userName, userEmail } = this.props
    this.props.updateGuestList(clubID, userName, userEmail)
  }
  render(){
    const { name, clubID, address, display_phone, image_url,
      snippet_text, url, auth, userName, userEmail, isCurrentUserReserved } = this.props
      let labelText = isCurrentUserReserved ? 'Yes I am going!' : 'Going Tonight?'
    return(
      <Card className="my-card">
        <CardMedia overlay={<CardTitle title={name} />}>
          <img src={image_url} />
        </CardMedia>
        <CardTitle title={address} subtitle={display_phone} />
        <CardText>
          {snippet_text}
        </CardText>
        <CardActions>
          <FlatButton label="Reviews at Yelp" href={url} target="_blank"/>
          <FlatButton label="List of Guest" primary={true} />
          <FlatButton
            label={labelText}
            disabled={!auth}
            onClick={ () => this.onSubmit()}
            secondary={true} />
        </CardActions>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth.authenticated,
    userName: state.auth.userName,
    userEmail: state.auth.email
  }
}

export default connect(mapStateToProps, actions)(YelpCard);

// YelpCard = reduxForm({
//   form: 'myYelpCard'
// })(YelpCard)
//
//
// export default YelpCard = connect(mapStateToProps, actions)(YelpCard)
