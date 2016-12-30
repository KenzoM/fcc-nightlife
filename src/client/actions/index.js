var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'VWr9fLWUAVVysF6a0n5ETg',
  consumer_secret: 'uiRR3XetMsz4QKxOfrOMMovhjag',
  token: '8ySZ933jN55vudN21_ZTvLYIYEXq-_ar',
  token_secret: 'wKn5_Ykn5KIOS716leP76zhMUGs',
});

import axios from 'axios';
const ROOT_URL = 'http://localhost:1234'

import { GET_YELP } from './types';

export function kenzo(){

  // const request = yelp.search({ term: 'food', location: 'Montreal' });
  // return ( dispatch ) => {
  //   request.then( ({data} )=> {
  //     console.log(data)
  //   })
  // }
  const request = axios.get(`${ROOT_URL}/yelp`);
  return (dispatch) => {
    request.then( ({data}) =>{
      console.log(data, 'this is data')
    })
  }
}
