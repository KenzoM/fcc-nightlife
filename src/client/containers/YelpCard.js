import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

class YelpCard extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { name, address, display_phone, image_url, snippet_text, url, auth } = this.props
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
          <Checkbox
            name="rsvp"
            label="Going Tonight?"
            disabled={!auth}
            defaultChecked={true}
            onClick={ ()=> console.log('TEST!!')}
          />
        </CardActions>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(YelpCard);
