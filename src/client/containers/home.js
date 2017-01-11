import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import * as actions from '../actions/';
import { Link } from 'react-router';
import LoadingCircle from '../components/LoadingCircle';
import GoogleMap from '../components/google-map';
import YelpCard from './YelpCard';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  Slider
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {distanceSlider: 0}
    this.onSubmit = this.onSubmit.bind(this);
    this.renderGoogleMap = this.renderGoogleMap.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }
  onSubmit(props){
    // extract the value city from Redux-form and pass it to Action-Creator
    const { city } = props;
    this.props.getYelp(city)
  }

  renderGoogleMap(){
    const {centerCoordinates, yelpData} = this.props
    return(
      <GoogleMap
        centerCoordinates={centerCoordinates}
        yelpData={yelpData}
      />
    )
  }

  renderCards({name, guests, display_phone, location, image_url, isCurrentUserReserved, snippet_text, id, url}){
    let address = location.address[0];
    const { yelpData } = this.props;
    if(!snippet_text){
      snippet_text = 'No reviews at the moment'
    } else{
      snippet_text = `"${snippet_text}"`
    }
    return(
      <YelpCard
        key={id}
        clubID={id}
        name={name}
        address={address}
        image_url={image_url || 'http://al3qarat.com/images/sorry_not_available.gif'}
        snippet_text={snippet_text}
        display_phone={display_phone}
        url={url}
        city={yelpData.lastCity}
        guests={guests}
        isCurrentUserReserved={isCurrentUserReserved}
        />
    )
  }

  render() {
    const style = {
      margin: 12,
    };
    const { handleSubmit, pristine, reset, submitting, yelpData, userName } = this.props;
    //isFetching helps sync correctly to load loader-image while fetching data from Yelp
    return (
      <div>
        <h1 className="title">Welcome {userName || 'Guest'} !</h1>
        <form className="center-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <Field name="city"
              hintText="Los Angeles Downtown"
              component={TextField}
              floatingLabelText="Enter Your City or Address"/>
          </div>
          <div>
            <RaisedButton
              style={style}
              label="Submit"
              type="submit"
              disabled={yelpData.isFetching}
              labelColor="white"
              backgroundColor="#26A69A"/>
            <RaisedButton
              style={style}
              label="Clear"
              onTouchTap={reset}
              disabled={pristine || yelpData.isFetching}
              labelColor="white"
              backgroundColor="#C15055"/>
          </div>
        </form>
        <div className="my-container">
          <div className="yelpCard-row">
            {yelpData.isFetching ? (<LoadingCircle />) : (yelpData.data.map(this.renderCards))}
          </div>
          <div className="google-map-row">
            {yelpData.isFetching || yelpData.data.length === 0 ? <div></div> : this.renderGoogleMap()}
          </div>
        </div>
      </div>
    )
  }
}


Home = reduxForm({
  form: 'myForm'
})(Home)

function mapStateToProps(state){
  return {
    yelpData: state.yelpData,
    centerCoordinates: state.yelpData.centerLocation,
    isReserved: state.yelpData.isReserved,
    userName: state.auth.userName,
    userEmail: state.auth.email
  }
}

export default Home = connect(mapStateToProps, actions)(Home)

// <Field
//   name="distance"
//   component={Slider}
//   min={1}
//   max={25}
//   format={null}
//   defaultValue={10}
//   step={1}
//  />
