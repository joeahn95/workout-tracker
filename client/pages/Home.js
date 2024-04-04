// import './stylesheets/styles.css';

import React from "react";
import { useSelector } from "react-redux";
import RadarChart from '../components/RadarChart.jsx';
import BarChart from "../components/BarChart.jsx";



const Home = props => {

  // import workout history
  const history = useSelector(state => state.workouts.history);

  return (
    <div id='page'>
      <h1 id='page--header'>Welcome!</h1>
      <body id='home--body'>
        <div style={{height: '300px'}} id='module'>
          <span>Sets Progress</span>
          <RadarChart history={history}/>
        </div>
        <div style={{height: '300px'}} id='module'>
          <span>Workout Days</span>
          <BarChart/>
        </div>
      </body>
    </div>
  );
};

export default Home;