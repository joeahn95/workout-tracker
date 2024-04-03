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
import {GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT} from '../constants/actionTypes.js';

const initialState = {
  workoutList : {},
  totalWorkouts : 0,
};

const workoutReducer = (state = initialState, action) => {

  let workout;
  let workoutList;
  let totalWorkouts;

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
    case DELETE_WORKOUT: {
      const id = action.payload;

      totalWorkouts = state.workoutList.length - 1;
      workoutList = [...state.workoutList].filter((obj) => obj._id !== id);

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
