// import './stylesheets/styles.css';

import React from "react";
import { useSelector } from "react-redux";
import RadarChart from '../components/RadarChart.jsx';




const Home = props => {

  // import workout history
  const history = useSelector(state => state.workouts.history);

  return (
    <div>
      <h1>Home Page</h1>
      <RadarChart history={history}/>
    </div>
  );
};

export default Home;