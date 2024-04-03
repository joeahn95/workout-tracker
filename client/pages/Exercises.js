import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseList from '../components/exerciseList.jsx';
import CreateExercise from '../components/CreateExercise.jsx';

const Exercises = props => {

  // grab current exerciseList
  const exerciseArr = useSelector(state => state.exercises.exerciseList);
  const numExercises = useSelector(state => state.exercises.totalExercises);

  return (
    <div>
      <h2>Exercises Page</h2>
      <CreateExercise exerciseArr={exerciseArr} numExercises={numExercises}/>
      <ExerciseList exerciseArr={exerciseArr} numExercises={numExercises}/>
    </div>
  );
};

export default Exercises;