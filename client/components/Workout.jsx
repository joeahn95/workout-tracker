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

      alert('Good Job!')

      await fetch(`/api/workouts/${id}`, {
        method: 'POST',
      });

      await dispatch(completeWorkoutActionCreator(setObj));
    } catch (err) {
      console.log('complete workout: ERROR: ', err)
    }
  }

  const exerciseMap = exerciseArr.map((el, idx) => {
    return (
      <div key={idx}>
        <span id='module--text'>{el}: </span>
        <span id='module--text'>sets: <span>{sets[idx]} </span></span>
        <span id='module--text'>reps: <span>{reps[idx]} </span></span>
      </div>
    )
  })

  return (
    <div id="module">
      <span id='module--title'>{name}</span>
      {exerciseMap}
      <button id='workoutCompleteBtn' onClick={handleCompleteClick}>Complete Workout</button>
      <button id='workoutDeleteBtn' onClick={handleDeleteClick}>X</button>
    </div>
  )
};

export default Workout;