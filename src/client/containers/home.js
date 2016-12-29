import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
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
    console.log('submitted!')
    console.log(this.props,'this is MY props')
    console.log(props)
    console.log(this.props.submitting)
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="city" component={TextField} hintText="Enter Your City"/>
          <div>
            <button type="submit" disabled={this.state.submitted}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
          </div>
      </form>
    )
  }
}

// Decorate with redux-form
Home = reduxForm({
  form: 'myForm'
})(Home)

export default Home
