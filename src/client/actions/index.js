import axios from 'axios';
const ROOT_URL = 'http://localhost:1234';
import { browserHistory } from 'react-router';
import { GET_YELP, RECIEVE_YELP,
  REMOVE_YELP, LAST_CITY, AUTH_USER,
  UNAUTH_USER, TAB_INDEX, UPDATE_GUEST} from './types';

export function changeTab(index){
  return ({
    type: TAB_INDEX,
    payload: index
  })
}

export function getYelp(city){
  const timeDelay = 2000;
  const request = axios.get(`${ROOT_URL}/yelp/${city}`);
  const currentEmail = localStorage.getItem('email')
  //Fetch the data and call another dispatch to indicate it received the data
  return (dispatch) => {
    //if logged in, update the current user's history search
    if (currentEmail){
      axios.put(`${ROOT_URL}/user/${currentEmail}/${city}`)
      dispatch({type: LAST_CITY, payload: `${city}`})
    }
    //if city parameter is empty or undefined, dispatch REMOVE_YELP
    if(!city){
      return dispatch({type: REMOVE_YELP})
    }
    Materialize.toast(`Searching for clubs in ${city}...`, timeDelay)
    dispatch({
      type: GET_YELP
    })
    request.then( ({data}) =>{
      // this will iterate each clubID to see if the current user is on the guest list RSVP
      let currentUserReservations = [];
      let promisedClubs = data.businesses.map( club =>
        axios.get(`${ROOT_URL}/club/${currentEmail}/${club.id}`)
          .then( ({data}) => {
            currentUserReservations.push( Object.assign({}, club, data))
          })
          .then( () => data.businesses = currentUserReservations )
      );

      Promise.all(promisedClubs).then(clubs => {
        dispatch({ type: RECIEVE_YELP, payload: data})
      }, failedClub => {
        console.log('error!!')
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function updateGuestList(clubID, userName, userEmail, city ){
  return (dispatch) => {
    // this simply updates the current user RSVP and dispatch getYelp
    axios.put(`${ROOT_URL}/club/${clubID}/${userName}/${userEmail}`)
      .then(response =>{
        dispatch(getYelp(city))
      })
      .catch(response =>{
        console.log(response)
      })
  }
}

export function signupUser( {userName, email, password}){
  let timeDelay = 2000;
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
  let timeDelay = 2000;
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response =>{
        dispatch({type: AUTH_USER, payload: response.data.userName, email: response.data.email})
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.userName)
        localStorage.setItem('email', response.data.email);
        Materialize.toast(`Welcome back ${response.data.userName}!`, timeDelay)
        dispatch({type: LAST_CITY, payload: response.data.city})
        dispatch({type: TAB_INDEX, payload: 0})
        dispatch(getYelp(response.data.city))
        browserHistory.push('/')
      })
      .catch(() =>{
        Materialize.toast('Ooops! Wrong email/password!', timeDelay)
      });
  }
}

export function signoutUser(){
  let timeDelay = 2000;
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
