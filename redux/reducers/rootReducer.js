import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'

/**
 * Import reducers
 */
import app from './appReducer';
import posts from './postsRerducer';
import profiles from './profileReducer'

/**
 * Create store state
 */
const rootReducer = combineReducers({
  app, posts, profiles
});

export default rootReducer;
