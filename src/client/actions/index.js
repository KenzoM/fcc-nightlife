import axios from 'axios';
const ROOT_URL = 'http://localhost:1234';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import { GET_YELP, RECIEVE_YELP, REMOVE_YELP, AUTH_USER, UNAUTH_USER, TAB_INDEX } from './types';

export function changeTab(index){
  return ({
    type: TAB_INDEX,
    payload: index
  })
}

export function getYelp(city){
  const timeDelay = 2000;
  const request = axios.get(`${ROOT_URL}/yelp/${city}`);
  // const updateHistorySearch = axios.get(`${ROOT_URL}/user/${email}`)
  const currentEmail = localStorage.getItem('email')
  //Fetch the data and call another dispatch to indicate it received the data
  return (dispatch) => {
    //if logged in, update the current user's history search
    if (currentEmail){
      axios.put(`${ROOT_URL}/user/${currentEmail}/${city}`)
    }
    Materialize.toast(`Searching for clubs in ${city}...`, timeDelay)
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
        dispatch({type: AUTH_USER, payload: response.data.userName, email: response.data.email})
        dispatch({type: REMOVE_YELP})
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('email', response.data.email);
        browserHistory.push('/')
        Materialize.toast(`Welcome ${response.data.userName}!`, timeDelay)
      })
      .catch(response =>{
        console.log(response)
        Materialize.toast('Email already exist!', timeDelay)
      })
  }
}
export function loginUser( {email, password}){
  let timeDelay = 4000;
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response =>{
        dispatch({type: AUTH_USER, payload: response.data.userName, email: response.data.email})
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.userName)
        localStorage.setItem('email', response.data.email);
        browserHistory.push('/')
        Materialize.toast(`Welcome back ${response.data.userName}!`, timeDelay)
        dispatch({type: TAB_INDEX, payload: 0})
      })
      .catch(() =>{
        Materialize.toast('Ooops! Wrong email/password!', timeDelay)
      });
  }
}

export function signoutUser(){
  let timeDelay = 3000;
  return (dispatch) =>{
    dispatch({
      type: REMOVE_YELP
    })
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    browserHistory.push('/')
    Materialize.toast(`See You Next Time!`, timeDelay)
    dispatch({type: UNAUTH_USER})
  }
}
