import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutList from '../components/WorkoutList.jsx';
import CreateWorkout from '../components/createWorkout.jsx';

const Workouts = props => {

  // grab current exerciseList
  const workoutList = useSelector(state => state.workouts.workoutList);
  const numWorkouts = useSelector(state => state.workouts.totalWorkouts);
  const exerciseArr = useSelector(state => state.exercises.exerciseList);

  return (
    <div id='page'>
      <h2>Workouts Page</h2>
      <h3>Workouts: {numWorkouts}</h3>
      <CreateWorkout workoutList={workoutList} numWorkouts={numWorkouts} exerciseArr={exerciseArr}/>
      <WorkoutList workoutList={workoutList} numWorkouts={numWorkouts} exerciseArr={exerciseArr}/>
    </div>
  );
};

export default Workouts;