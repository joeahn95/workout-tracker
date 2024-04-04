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

const CreateExercise = ({exerciseArr, numExercises}) => {

  // states to track new exercise details
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [equipReq, setEquipReq] = useState(false);
  const [parts, setParts] = useState({
    Chest: false,
    Back: false,
    Tricep: false,
    Bicep: false,
    Legs: false,
  });
  const dispatch = useDispatch();

  // when exercise is added
  const handleClick = () => {

    // form request body
    const bodyParts = Object.keys(parts).filter((part) => parts[part]);
    const body = {
        _id: numExercises + 1,
        name: name,
        vid_link: link,
        equip_req: equipReq,
        parts: bodyParts,
    }

    // reset form
    setName('');
    setLink('');
    setEquipReq(false);
    setParts({
      Chest: false,
      Back: false,
      Tricep: false,
      Bicep: false,
      Legs: false,
    });
    
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

  const handlePartsClick = (part) => {
    // switch boolean state
    const newParts = {...parts};
    newParts[part] = !parts[part];
    setParts(newParts);
  }

  return (
    <div id="create-box">
      <div id='create-box--options'>
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
          <input type="checkbox" id='equip_req_field' checked={equipReq} onChange={(e) => setEquipReq(!equipReq)}/>
        </div>
        <div id='create-box--parts'>
          <div id='parts--radio'>
            <p>Chest</p>
            <input type="radio" checked={parts.Chest} value={false} onChange={(e) => handlePartsClick('Chest')}/>
          </div>
          <div id='parts--radio'>
            <p>Back</p>
            <input type="radio" checked={parts.Back} value={false} onChange={(e) => handlePartsClick('Back')}/>
          </div>
            <div id='parts--radio'>
            <p>Tricep</p>
          <input type="radio" checked={parts.Tricep} value={false} onChange={(e) => handlePartsClick('Tricep')}/>
            </div>
            <div id='parts--radio'>
          <p>Bicep</p>
            <input type="radio" checked={parts.Bicep} value={false} onChange={(e) => handlePartsClick('Bicep')}/>
            </div>
          <div id='parts--radio'>
            <p>Legs</p>
            <input type="radio" checked={parts.Legs} value={false} onChange={(e) => handlePartsClick('Legs')}/>
          </div>
        </div>
      </div>

      <button id='create-box--button' onClick={handleClick}>add new exercise</button>
    </div>
  )

};

export default CreateExercise;