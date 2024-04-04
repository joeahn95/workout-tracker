/**
 * ************************************
 *
 * @module  exerciseReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */
import {GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE} from '../constants/actionTypes.js';

const initialState = {
  exerciseList : [],
  totalExercises : 0,
};

const exerciseReducer = (state = initialState, action) => {

  let exercise;
  let exerciseList;
  let totalExercises;

  // reducers shouldn't perform actions like fetching, it should only take the payload and update the state
  switch (action.type) {

    case GET_EXERCISES: {
      exerciseList = action.payload;
      totalExercises = exerciseList.length;

      return {
        ...state,
        exerciseList,
        totalExercises,
      }
    }
    case ADD_EXERCISE: {
      exercise = action.payload;

      totalExercises = state.exerciseList.length + 1;
      exerciseList = [...state.exerciseList];
      exerciseList.push(exercise);

      return {
        ...state,
        exerciseList,
        totalExercises,
      }
    }
    case DELETE_EXERCISE: {
      const id = action.payload;

      totalExercises = state.exerciseList.length - 1;
      exerciseList = [...state.exerciseList].filter((obj) => obj._id !== id);

      return {
        ...state,
        exerciseList,
        totalExercises,
      }
    }
    default: {
      return state;
    }
  }
};

export default exerciseReducer;
