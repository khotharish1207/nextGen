import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form'


/**
 * Import reducers
 */
import app from './sampleReducer'


/**
 * Create store state
 */
const rootReducer = combineReducers({
  app
});

export default rootReducer;
