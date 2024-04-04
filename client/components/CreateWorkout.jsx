/**
 * ************************************
 *
 * @module  CreateWorkout
 * @author
 * @date
 * @description form for adding a new exercise
 *
 * ************************************
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkoutActionCreator } from '../actions/actions';

const CreateWorkout = ({workoutObj, numWorkouts, exerciseArr}) => {

  // states to track new exercise details
  const [name, setName] = useState('');
  const [entries, setEntries] = useState([[exerciseArr[0].name, 0, 0]]);

  // exercise dropdown component (should really be in its own component tbh)
  const ExerciseDropdown = ({idx}) => {
    return (
        <div>
          <label>Choose an exercise:</label>
          <select name='exercises' id='exercise-dropdown' value={entries[idx][0]} onChange={(e) => handleChange(idx, 0, e.target.value)}>{
            exerciseArr.map((el, idx) => {
              return <option key={idx} value={el.name}>{el.name}</option>
            })
          }</select>

          <input id='sets' value={entries[idx][1]} type="text" onChange={(e) => handleChange(idx, 1, e.target.value)}/>
          <input id='reps' value={entries[idx][2]} type="text" onChange={(e) => handleChange(idx, 2, e.target.value)}/>
        </div>
    )
  }

  // creates a list of the exercise dropdown component
  const ExerciseDropdownList = () => {
    return (
        <div>
            {entries.map((el, idx) => {
                return (<ExerciseDropdown key={idx} idx={idx} />)
            })}
        </div>
    )
  }

  const handleChange = (idx, subIdx, value) => {
    const newEntries = [...entries];
    newEntries[idx][subIdx] = value;
    setEntries(newEntries);
  }

  const handleAddExerciseClick = () => {
    setEntries([...entries, [exerciseArr[0].name, 0, 0]]);
    return;
  }

  const dispatch = useDispatch();
  const handleAddWorkoutClick = async () => {
    // form dispatch action payload
    const payload = {
        workout_name: name,
        workout_id: numWorkouts + 1,
        exercises: [],
        exerciseIdx: [],
        sets: [],
        reps: [],
    };

    // add in each exercise of the workout to the payload
    entries.forEach(el => {
        const obj = exerciseArr.find(item => item.name === el[0]);
        payload.exercises.push(el[0]);
        payload.exerciseIdx.push(obj._id);
        payload.sets.push(el[1]);
        payload.reps.push(el[2]);
    })

    // clear form
    setName('');
    setEntries([[exerciseArr[0].name, 0, 0]]);

    try {
      await fetch('/api/workouts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }); 

      dispatch(addWorkoutActionCreator(payload));
    } catch (err) {
      console.log('add workouts: ERROR: ', err)
    }
        
  }
  

  return (
    <div id="create-workout-box">
      <div id='create-workout-box--name'>
        <p>Name</p>
        <input type="text" id='name_field' value={name} onChange={(e) => setName(e.target.value)}/>
      </div>

      <ExerciseDropdownList />

      <button onClick={handleAddExerciseClick}>add exercise</button>
      <button onClick={handleAddWorkoutClick}>add new workout</button>
    </div>
  )

};

export default CreateWorkout;