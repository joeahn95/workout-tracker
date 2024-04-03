/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers/index';
import { getExerciseActionCreator, getWorkoutActionCreator } from './actions/actions';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// configureStore already includes composeWithDevTools
const store = configureStore({
  reducer: reducers,
});

// get initial exercises and workouts list on load
fetch('/api/exercises/', {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    store.dispatch(getExerciseActionCreator(data));
  })
  .catch(err => console.log('get exercises: ERROR: ', err));

fetch('/api/workouts/', {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    // grab data and group in object of arrays
    const workoutObj = {};
    data.forEach(el => {
      if (workoutObj[el.workout_name]) workoutObj[el.workout_name].push(el)
        else workoutObj[el.workout_name] = [el];
    })
    console.log(workoutObj);
    
    store.dispatch(getWorkoutActionCreator(workoutObj));
  })
  .catch(err => console.log('get workouts: ERROR: ', err));

fetch('/api/workouts/')

export default store;