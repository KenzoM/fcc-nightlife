import { GET_YELP, RECIEVE_YELP } from  '../actions/types';

const INITIAL = { data: [], isFetching: false }

export default function(state = INITIAL, action){
  switch (action.type){
    case RECIEVE_YELP:
      const { payload } = action
      return {...state, data: payload.businesses, isFetching: false}
    case GET_YELP:
      return {...state, isFetching: true}

  }
  return state;
}
