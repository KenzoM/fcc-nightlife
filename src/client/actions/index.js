import axios from 'axios';
const ROOT_URL = 'http://localhost:1234'

import { GET_YELP, RECIEVE_YELP } from './types';


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
