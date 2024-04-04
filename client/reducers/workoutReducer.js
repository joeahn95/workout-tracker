/**
 * ************************************
 *
 * @module  workoutReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */
import {GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT, GET_HISTORY, COMPLETE_WORKOUT} from '../constants/actionTypes.js';

const initialState = {
  workoutList : [],
  totalWorkouts : 0,
  history: {
    Chest: 0,
    Back: 0,
    Bicep: 0,
    Tricep: 0,
    Legs: 0
  }
};

const workoutReducer = (state = initialState, action) => {

  let workout;
  let workoutList;
  let totalWorkouts;
  let history;

  // reducers shouldn't perform actions like fetching, it should only take the payload and update the state
  switch (action.type) {

    case GET_WORKOUTS: {
        workoutList = action.payload;
        totalWorkouts = workoutList.length;

        return {
          ...state,
          workoutList,
          totalWorkouts,
        }
    }
    case GET_HISTORY: {
      history = action.payload;

      return {
        ...state,
        history,
      }
    }
    case ADD_WORKOUT: {
      workout = action.payload;

      totalWorkouts = state.workoutList.length + 1;
      workoutList = [...state.workoutList];
      workoutList.push(workout);

      return {
        ...state,
        workoutList,
        totalWorkouts,
      }
    }
    case COMPLETE_WORKOUT: {
      console.log('completed')
      workout = action.payload;
      history = {...state.history};

      for (const key in workout) {
        history[key] += workout[key];
      }
      console.log(history);

      return {
        ...state,
        history,
      }
    }
    case DELETE_WORKOUT: {
      const id = action.payload;

      totalWorkouts = state.workoutList.length - 1;
      workoutList = [...state.workoutList].filter((obj) => obj.workout_id !== id);
      console.log(workoutList);

      return {
        ...state,
        workoutList,
        totalWorkouts,
      }
    }
    default: {
      return state;
    }
  }
};

export default workoutReducer;
