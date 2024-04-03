import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutList from '../components/WorkoutList.jsx';

const Workouts = props => {

  // grab current exerciseList
  const workoutObj = useSelector(state => state.workouts.workoutList);
  const numWorkouts = useSelector(state => state.workouts.totalWorkouts);

  return (
    <div>
      <h2>Workouts Page</h2>
      <WorkoutList workoutObj={workoutObj} numWorkouts={numWorkouts}/>
    </div>
  );
};

export default Workouts;