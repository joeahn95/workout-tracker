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
import { deleteExerciseActionCreator } from '../actions/actions.js';

const Workout = ({id, name, exerciseArr}) => {

  
//   const dispatch = useDispatch();
//   const handleClick = () => {
//     // delete exercise
//     fetch(`/api/exercises/${id}`, {
//       method: 'DELETE',
//     })
//       .then(res => {
//         dispatch(deleteExerciseActionCreator(id));
//       })
//       .catch(err => console.log('delete exercises: ERROR: ', err));
//   }

  const exerciseMap = exerciseArr.map((el, idx) => {
    return <p key={idx}>{el.exercise_name}</p>
  })

  return (
    <div id="exercise-box">
      <h3>{name}</h3>
      {/* <button onClick={handleClick}>X</button> */}
      {exerciseMap}
    </div>
  )
};

export default Workout;