/**
 * ************************************
 *
 * @module  Workout
 * @author
 * @date
 * @description renders single exercise
 *
 * ************************************
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkoutActionCreator, completeWorkoutActionCreator } from '../actions/actions';

const Workout = ({id, name, exerciseArr, reps, sets, setObj}) => {

  
  const dispatch = useDispatch();
  const handleDeleteClick = async () => {
    // delete workout
    try {
      await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteWorkoutActionCreator(id));
    } catch (err) {
      console.log('delete workout: ERROR: ', err)
    }
  }

  const handleCompleteClick = async () => {
    // complete workout
    try {

      console.log('hi')

      await fetch(`/api/workouts/${id}`, {
        method: 'POST',
      });

      console.log('bye')

      await dispatch(completeWorkoutActionCreator(setObj));
    } catch (err) {
      console.log('complete workout: ERROR: ', err)
    }
  }

  const exerciseMap = exerciseArr.map((el, idx) => {
    return (
      <div key={idx}>
        <p>{el}</p>
        <p>sets: <span>{sets[idx]}</span></p>
        <p>reps: <span>{reps[idx]}</span></p>
      </div>
    )
  })

  return (
    <div id="exercise-box">
      <h3>{name}</h3>
      {exerciseMap}
      <button onClick={handleCompleteClick}>Complete Workout</button>
      <button onClick={handleDeleteClick}>X</button>
    </div>
  )
};

export default Workout;