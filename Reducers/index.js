import mainReducer from './mainReducer';

import { combineReducers } from 'redux';
export default combineReducers({
  main: mainReducer
});
