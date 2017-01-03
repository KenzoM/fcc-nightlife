import { TAB_INDEX } from  '../actions/types';

const INITIAL = { tab_index: 0}

//This reducer is for keeping track of active tabs in Material UI
export default function(state = INITIAL, action){
  switch (action.type){
    case TAB_INDEX:
      const { payload } = action;
      return {...state, tab_index: payload}

  }
  return state;
}
