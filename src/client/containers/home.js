import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../actions/';
import YelpCard from '../components/YelpCard'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {submitted: false}
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(props){
    this.setState( {submitted: true} )
    // extract the value city from Redux-form and pass it to Action-Creator
    const { city } = props
    this.props.getYelp(city)
  }
  renderCards({name, display_phone, location, image_url, snippet_text, id, url}){
    let address = location.address[0];
    return(
      <YelpCard
        key={id}
        name={name}
        address={address}
        image_url={image_url}
        snippet_text={snippet_text}
        display_phone={display_phone}
        url={url}
        />
    )
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, yelpData } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="city" component={TextField} hintText="Enter Your City"/>
            <div>
              <button type="submit" disabled={submitting}>Submit</button>
              <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
        <div className="my-container">
          {yelpData.data.map(this.renderCards)}
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
    yelpData: state.yelpData
  }
}

export default Home = connect(mapStateToProps, actions)(Home)
