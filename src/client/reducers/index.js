import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import YelpData from './yelp_data_reducer'
import Authenticated from './authenticated_reducer';
import TabIndex from './tabs_index_reducer';
import GuestList from './guest_list_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  yelpData: YelpData,
  tabIndex: TabIndex,
  auth: Authenticated
});

export default rootReducer;
