import { GOOGLE_API } from  '../actions/types';

const INITIAL = {}

export default function(state = INITIAL, action){
  switch (action.type){
    case GOOGLE_API:
      const { payload } = action
      return {...state, googleAPI: payload.googleAPI}
  }
  return state;
}
