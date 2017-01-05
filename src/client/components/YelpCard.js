import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

class YelpCard extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { name, address, display_phone, image_url, snippet_text, url } = this.props
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
          <FlatButton label="Going?" />
        </CardActions>
      </Card>
    )
  }
}

export default YelpCard;
