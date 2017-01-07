import { UPDATE_GUEST } from  '../actions/types';

const INITIAL = {}

//This reducer is for keeping track of active tabs in Material UI
export default function(state = INITIAL, action){
  switch (action.type){
    case UPDATE_GUEST:
      console.log('UPDATE GUEST in reducer')
      return state
  }
  return state;
}
