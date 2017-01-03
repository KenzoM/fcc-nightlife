import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import yelpData from './yelp_data_reducer'
import Authenticated from './authenticated_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  yelpData: yelpData,
  auth: Authenticated
});

export default rootReducer;
