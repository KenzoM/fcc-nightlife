import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form'
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
  onSubmit(props){
    console.log(props, 'this is props')
  }
  render(){
    const { name, address, display_phone, image_url, snippet_text, url, auth, handleSubmit } = this.props
    return(
      <Card className="my-card">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
              defaultChecked={false}
              onClick={ ()=> console.log('TEST!!')}
            />
            <Field name="rsvp" component={Checkbox}
              onCheck={value => {
              console.log('onCheck ', value ) // eslint-disable-line no-console
              }}
              disabled={!auth}
              defaultChecked={false}
              label="Going Tonight?"/>
          </CardActions>
        </form>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth.authenticated
  }
}

// export default connect(mapStateToProps)(YelpCard);

YelpCard = reduxForm({
  form: 'myYelpCard'
})(YelpCard)


export default YelpCard = connect(mapStateToProps, actions)(YelpCard)
