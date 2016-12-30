import { GET_YELP } from  '../actions/types';

const INITIAL = { yelpData: [] }

export default function(state = INITIAL, action){
  switch (action.type){
    case GET_YELP: 
      const { payload } = action
      return {...state, yelpData: payload.businesses}
  }
  return state;
}
