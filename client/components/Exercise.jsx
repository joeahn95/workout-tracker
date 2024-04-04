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

const Exercise = ({id, name, vid_link, equip_req, parts}) => {
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

  const CheckMark = ({cond}) => {
    if (cond) {
      return (<span>yes</span>);
    } else {
      return (<span>no</span>);
    }
  }

  return (
    <div id="module">
      <span id='module--title'>{name}</span>
      <span id='module--text'>Equip Required: <CheckMark cond={equip_req}/></span>
      <span id='module--text'>{`Parts Worked: ${parts}`}</span>
      <iframe id='video' src={"https://www.youtube.com/embed/" + url}></iframe>
      <button id='exercise-box--button' onClick={handleClick}>X</button>
    </div>
  )
};

export default Exercise;