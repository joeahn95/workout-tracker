/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import exerciseReducer from './exerciseReducer.js';
import workoutReducer from './workoutReducer.js';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  exercises: exerciseReducer,
  workouts: workoutReducer,
});

// make the combined reducers available for import
export default reducers;

