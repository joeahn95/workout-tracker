/**
 * ************************************
 *
 * @module  WorkoutList
 * @author
 * @date
 * @description renders list of all exercises
 *
 * ************************************
 */

import React from 'react';
import Workout from './Workout.jsx';

const WorkoutList = ({workoutObj, numWorkouts}) => {

  const workoutMap = [];

  for (const key in workoutObj) {
    const workout_id = workoutObj[key][0].exercise_id;
    const name = key;
    const exerciseArr = workoutObj[key];
    workoutMap.push(<Workout key={workout_id} id={workout_id} name={name} exerciseArr={exerciseArr}/>)
  }

  return (
    <div className="workoutList">
      <h3>Workouts: {numWorkouts}</h3>
      {workoutMap}
    </div>
  )

};

export default WorkoutList;