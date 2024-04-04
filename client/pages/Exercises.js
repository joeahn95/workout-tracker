import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseList from '../components/exerciseList.jsx';
import CreateExercise from '../components/CreateExercise.jsx';

const Exercises = props => {

  // grab current exerciseList
  const exerciseArr = useSelector(state => state.exercises.exerciseList);
  const numExercises = useSelector(state => state.exercises.totalExercises);

  return (
    <div id='page'>
      <h2 id='page--header'>Exercises Page</h2>
      <h3 id='page--subheader'>Exercises: {numExercises}</h3>
      <CreateExercise id='createExercise' exerciseArr={exerciseArr} numExercises={numExercises}/>
      <ExerciseList id='exerciseList' exerciseArr={exerciseArr} numExercises={numExercises}/>
    </div>
  );
};

export default Exercises;