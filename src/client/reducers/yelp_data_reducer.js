import { GET_YELP } from  '../actions/types';

const INITIAL = { data: [] }

export default function(state = INITIAL, action){
  switch (action.type){
    case GET_YELP:
      const { payload } = action
      return {...state, data: payload.businesses}
  }
  return state;
}
