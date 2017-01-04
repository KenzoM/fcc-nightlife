import { AUTH_USER, UNAUTH_USER } from '../actions/types'

const INITIAL = {authenticated: false}

export default function(state = INITIAL, action){
  switch (action.type) {
    case AUTH_USER:
      // this ensures that user can see whose account is currently logged in
      let currentUser = localStorage.getItem('userName');
      let currentEmail = localStorage.getItem('email');
      return { ...state, authenticated: true,
        userName: action.payload || currentUser,
        email: action.email || currentEmail }
    case UNAUTH_USER:
      return { ...state, authenticated: false, userName: '' , email: ''}
  }
  return state;
}
