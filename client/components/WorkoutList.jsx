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

const WorkoutList = ({workoutList, numWorkouts, exerciseArr}) => {

  const workoutMap = workoutList.map((el, idx) => {

    // create object that gathers how many sets done for each body part with each workout
    const setObj = {};

    el.exercises.forEach((ex, idx) => {
      const foundObj = exerciseArr.find(obj => obj.name === ex);
      foundObj.parts.forEach(part => {
        if (setObj[part]) setObj[part] += el.sets[idx];
          else setObj[part] = el.sets[idx];
      })
    })

    return (
      <Workout key={el.workout_id} id={el.workout_id} name={el.workout_name} 
      exerciseArr={el.exercises} reps={el.reps} sets={el.sets} setObj={setObj}/>
    )
  })

  return (
    <div className="workoutList">
      <h3>Workouts: {numWorkouts}</h3>
      {workoutMap}
    </div>
  )

};

export default WorkoutList;