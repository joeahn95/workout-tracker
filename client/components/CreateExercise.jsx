/**
 * ************************************
 *
 * @module  createExercise
 * @author
 * @date
 * @description form for adding a new exercise
 *
 * ************************************
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExerciseActionCreator } from '../actions/actions.js';

const createExercise = ({exerciseArr, numExercises}) => {

  // states to track new exercise details
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [equipReq, setEquipReq] = useState(false);
  const dispatch = useDispatch();

  // when exercise is added
  const handleClick = () => {
    // reset form
    setName('');
    setLink('');
    const button = document.getElementById('equip_req_field');
    button.checked = false;
    setEquipReq(false);

    // form request body
    const body = {
        _id: numExercises + 1,
        name: name,
        vid_link: link,
        equip_req: equipReq
    }
    
    // add new exercise
    fetch('/api/exercises/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(res => {
          dispatch(addExerciseActionCreator(body));
        })
        .catch(err => console.log('add exercises: ERROR: ', err));
  }

  return (
    <div id="create-box">
      <div id='create-box--name'>
        <p>Name</p>
        <input type="text" id='name_field' value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div id='create-box--link'>
        <p>Youtube Link</p>
        <input type="text" id='link_field' value={link} onChange={(e) => setLink(e.target.value)}/>
      </div>
      <div id='create-box--equipReq'>
        <p>Equipment Required</p>
        <input type="checkbox" id='equip_req_field' onChange={(e) => setEquipReq(!equipReq)}/>
      </div>

      <button onClick={handleClick}>add new exercise</button>
    </div>
  )

};

export default createExercise;