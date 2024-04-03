/**
 * ************************************
 *
 * @module  ExerciseList
 * @author
 * @date
 * @description renders list of all exercises
 *
 * ************************************
 */

import React from 'react';
import Exercise from './Exercise.jsx';
import { useDispatch } from 'react-redux';

const ExerciseList = ({exerciseArr, numExercises}) => {

  const exerciseMap = exerciseArr.map(el => {
    return <Exercise key={el._id} id={el._id} name={el.name} 
             vid_link={el.vid_link} equip_req={el.equip_req}/>
  })

  return (
    <div className="exerciseList">
      <h3>Exercises: {numExercises}</h3>
      {exerciseMap}
    </div>
  )

};

export default ExerciseList;