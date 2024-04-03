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
import {GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE, GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT} from '../constants/actionTypes';

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

export const addWorkoutActionCreator = exercise => ({
  type: ADD_WORKOUT,
  payload: exercise,
});

export const deleteWorkoutActionCreator = id => ({
  type: DELETE_WORKOUT,
  payload: id,
});

