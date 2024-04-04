/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import {GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE, GET_WORKOUTS, GET_HISTORY, ADD_WORKOUT, DELETE_WORKOUT, COMPLETE_WORKOUT} from '../constants/actionTypes';

// exercise action creators
export const getExerciseActionCreator = (list) => ({
  type: GET_EXERCISES,
  payload: list,
});

export const addExerciseActionCreator = exercise => ({
  type: ADD_EXERCISE,
  payload: exercise,
});

export const deleteExerciseActionCreator = id => ({
  type: DELETE_EXERCISE,
  payload: id,
});

// workout action creators
export const getWorkoutActionCreator = (list) => ({
  type: GET_WORKOUTS,
  payload: list,
});

export const getWorkoutHistoryActionCreator = (obj) => ({
  type: GET_HISTORY,
  payload: obj,
});

export const addWorkoutActionCreator = workout => ({
  type: ADD_WORKOUT,
  payload: workout,
});

export const completeWorkoutActionCreator = workout => ({
  type: COMPLETE_WORKOUT,
  payload: workout,
});

export const deleteWorkoutActionCreator = id => ({
  type: DELETE_WORKOUT,
  payload: id,
});

