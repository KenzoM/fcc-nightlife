import axios from 'axios';
const ROOT_URL = 'http://localhost:1234';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import { GET_YELP, RECIEVE_YELP, AUTH_USER, UNAUTH_USER } from './types';


export function getYelp(city){
  const request = axios.get(`${ROOT_URL}/yelp/${city}`);
  //Fetch the data and call another dispatch to indicate it received the data

  return (dispatch) => {
    dispatch({
      type: GET_YELP
    })
    request.then( ({data}) =>{
      dispatch({ type: RECIEVE_YELP, payload: data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function signupUser( {userName, email, password}){
  let timeDelay = 4000;
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, { userName, email, password})
      .then(response =>{
        dispatch({type: AUTH_USER, payload: response.data.userName})
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        browserHistory.push('/')
        // Materialize.toast(`Welcome ${response.data.userName}!`, timeDelay)
      })
      .catch(response =>{
        console.log(response)
        // Materialize.toast('Email already exist!', timeDelay)
      })
  }
}

export function signoutUser(){
  let timeDelay = 3000;
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  browserHistory.push('/')
  // Materialize.toast(`See You Next Time!`, timeDelay)
  return ({
    type: UNAUTH_USER
  })
}
