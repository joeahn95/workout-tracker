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
import { getExerciseActionCreator, getWorkoutActionCreator, getWorkoutHistoryActionCreator, getExerciseBodyActionCreator } from './actions/actions';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// configureStore already includes composeWithDevTools
const store = configureStore({
  reducer: reducers,
});

// get initial exercises on load
const getExercises = async () => {
  try {
    const response = await fetch('/api/exercises/', {
      method: 'GET',
    });
    const exerciseData = await response.json();

    const bodyResponse = await fetch('/api/exercises/body', {
      method: 'GET',
    });
    const bodyData = await bodyResponse.json();

    // insert array of body parts to each exercise
    bodyData.forEach(el => {
      const foundObj = exerciseData.find(obj => obj.name === el.name);
      if(foundObj.parts) foundObj.parts.push(el.part);
        else foundObj.parts = [el.part];
    })

    console.log('exercises: ', exerciseData);

    store.dispatch(getExerciseActionCreator(exerciseData));
  } catch (err) {
    console.log(err);
  }
}

getExercises();

// get initial list of workouts
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

    const workoutList = [];
    for (const key in workoutObj) {
      workoutList.push({
        workout_name: key,
        workout_id: workoutObj[key][0].workout_id,
        exercises: workoutObj[key].map(el => el.exercise_name),
        exerciseIdx: workoutObj[key].map(el => el.exercise_id),
        sets: workoutObj[key].map(el => el.sets),
        reps: workoutObj[key].map(el => el.reps),
      })
    }
    console.log('workouts: ', workoutList);
    
    store.dispatch(getWorkoutActionCreator(workoutList));
  })
  .catch(err => console.log('get workouts: ERROR: ', err));

// get initial workout history
fetch('/api/workouts/history', {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    // get workout history by body part
    const bodyHistory = {
      Chest: 0,
      Back: 0,
      Bicep: 0,
      Tricep: 0,
      Legs: 0,
    };

    // get workout history by day of week
    const dayHistory = [0,0,0,0,0,0,0];

    data.forEach(el => {
      bodyHistory[el.part] += el.sets;
      const d = new Date(el.completed_date);
      dayHistory[d.getDay()]+= el.sets;
    });

    console.log('day history: ', dayHistory);
    console.log('history: ', bodyHistory);
    store.dispatch(getWorkoutHistoryActionCreator({
      dayHistory,
      bodyHistory,
    }));
  })
  .catch(err => console.log('get history: ERROR: ', err));

export default store;