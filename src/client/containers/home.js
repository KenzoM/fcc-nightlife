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
  render() {
    return (
      <form>
        <Field name="username" component={TextField} hintText="Street"/>
      </form>
    )
  }
}

// Decorate with redux-form
Home = reduxForm({
  form: 'myForm'
})(Home)

export default Home
