import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import yelpData from './yelp_data_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  yelpData: yelpData
});

export default rootReducer;
