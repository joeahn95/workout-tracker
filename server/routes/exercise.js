const express = require('express');

const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

router.get('/',
  exerciseController.getExercises,
  (req, res) => res.status(200).json(res.locals.exercises)
);

router.get('/body',
  exerciseController.getExerciseBody,
  (req, res) => res.status(200).json(res.locals.exerciseBody)
);

router.post('/',
  exerciseController.addExercise,
  (req, res) => res.status(200).json({})
);

router.delete('/:id',
  exerciseController.deleteExercise,
  (req, res) => res.status(200).json({})
);

module.exports = router;
