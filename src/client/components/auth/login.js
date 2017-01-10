import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field,  reduxForm } from 'redux-form';
const  { DOM: { input, select, textarea } } = React;
// import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import * as actions from '../../actions/';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(props){
    this.props.loginUser(props)
  }
  render(){
    const style = {
      margin: 12,
    };
    const { handleSubmit, submitting, reset, pristine } = this.props;
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field name="email"
              floatingLabelText="Enter Your Email"
              component={TextField}
              ref="name" withRef
              type="text"/>
          </div>
          <div>
            <Field name="password"
              floatingLabelText="Enter a Password"
              component={TextField}
              type="password"/>
            </div>
          <div>
            <RaisedButton
              label="Submit"
              type="submit"
              labelColor="white"
              backgroundColor="#26A69A"/>
            <RaisedButton
              style={style}
              label="Clear"
              onTouchTap={reset}
              disabled={pristine}
              labelColor="white"
              backgroundColor="#C15055"/>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if(!values.email){
    errors.email = "Please enter an email"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password){
    errors.password = "Please enter an password"
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && (error && <div className="error">{error}</div>)}
    </div>
  </div>
)

Login = reduxForm({
  form: 'Login',
  validate
})(Login)

export default Login = connect(null, actions)(Login)
