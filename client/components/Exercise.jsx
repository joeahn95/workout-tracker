/**
 * ************************************
 *
 * @module  Exercise
 * @author
 * @date
 * @description renders single exercise
 *
 * ************************************
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExerciseActionCreator } from '../actions/actions.js';

const Exercise = ({id, name, vid_link, equip_req}) => {
  // have to change the youtube link to some embed format
  const url = vid_link.slice(32, 43);
  
  const dispatch = useDispatch();
  const handleClick = () => {
    // delete exercise
    fetch(`/api/exercises/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        dispatch(deleteExerciseActionCreator(id));
      })
      .catch(err => console.log('delete exercises: ERROR: ', err));
  }

  return (
    <div id="exercise-box">
      <p>{name}</p>
      {/* <iframe width="210" height="158" src={"https://www.youtube.com/embed/" + url}></iframe> */}
      <button onClick={handleClick}>X</button>
    </div>
  )
};

export default Exercise;