import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';

// import Characters from './components/Characters';
// import CreateCharacter from './components/CreateCharacter';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Exercises from './pages/Exercises.js';
import Workouts from './pages/Workouts.js'

const App = props => {

  return (
    <div>
      <BrowserRouter>
        <div>
          <Link to='/'>Home</Link>
          <br/>
          <Link to='/exercises'>Exercises</Link>
          <br/>
          <Link to='/workouts'>Workouts</Link>
        </div>

        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/exercises' element={<Exercises />}/>
          <Route path='/workouts' element={<Workouts />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
