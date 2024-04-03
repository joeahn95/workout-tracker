const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const exerciseRouter = require('./routes/exercise.js');
const workoutRouter = require('./routes/workout.js');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});  

// exercise functions
app.use('/api/exercises', exerciseRouter);

// workout functions
app.use('/api/workouts/', workoutRouter);

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
