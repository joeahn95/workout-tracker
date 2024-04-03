const express = require('express');

const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.get('/',
  workoutController.getWorkouts,
  (req, res) => res.status(200).json(res.locals.workouts)
);

router.post('/',
  workoutController.addWorkout,
  (req, res) => res.status(200).json({})
);

router.delete('/:id',
  workoutController.deleteWorkout,
  (req, res) => res.status(200).json({})
);

module.exports = router;
