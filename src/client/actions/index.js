import axios from 'axios';
const ROOT_URL = 'http://localhost:1234'

import { GET_YELP } from './types';

export function getYelp(){
  const request = axios.get(`${ROOT_URL}/yelp`);
  return (dispatch) => {
    request.then( ({data}) =>{
      dispatch({ type: GET_YELP, payload: data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
