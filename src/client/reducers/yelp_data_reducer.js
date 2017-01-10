import { GET_YELP, RECIEVE_YELP, REMOVE_YELP, LAST_CITY } from  '../actions/types';

const INITIAL = { data: [], isFetching: false }

export default function(state = INITIAL, action){
  switch (action.type){
    case RECIEVE_YELP:
      const { payload } = action
      // console.log(payload)
      return {...state, data: payload.businesses, isFetching: false, isReserved: payload.currentUserReservations}
    case GET_YELP:
      return {...state, isFetching: true}
    case REMOVE_YELP:
      return {...state, data: [], lastCity: null}
    case LAST_CITY: //this is when users Logs in, it searches the last city automatically
      return {...state, lastCity: action.payload}
  }
  return state;
}
