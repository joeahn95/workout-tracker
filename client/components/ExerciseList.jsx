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

const ExerciseList = ({exerciseArr, numExercises}) => {

  const exerciseMap = exerciseArr.map(el => {
    return <Exercise key={el._id} id={el._id} name={el.name} 
             vid_link={el.vid_link} equip_req={el.equip_req} parts={el.parts}/>
  })

  return (
    <div className="exerciseList">
      {exerciseMap}
    </div>
  )

};

export default ExerciseList;