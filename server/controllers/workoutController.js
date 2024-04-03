const db = require('../models/workoutModels');

const workoutController = {};

workoutController.getWorkouts = async (req, res, next) => {
    const queryText = 
    `SELECT workoutlist.name AS workout_name, workoutlist._id AS workout_id, 
    exerciselist.name AS exercise_name, exerciselist._id AS exercise_id
    FROM workoutlist 
    INNER JOIN workout_to_exercise 
    ON workoutlist._id = workout_to_exercise.workout_id 
    INNER JOIN exerciselist 
    ON workout_to_exercise.exercise_id = exerciselist._id`;

    try {
        const response = await db.query(queryText);
        res.locals.workouts = await response.rows;
        return next();
    } catch (err) {
        return next({
            log: 'problem in getWorkouts',
            message: {err: 'cannot get workout list'}
        })
    }
}

workoutController.addWorkout = async (req, res, next) => {
    const {_id, name, vid_link, equip_req} = req.body;

    try {
        await db.query(`INSERT INTO workoutlist VALUES (${_id}, '${name}')`);
        return next();
    } catch (err) {
        return next({
            log: 'problem in addWorkout',
            message: {err: 'cannot add workout'}
        })
    }
}

workoutController.deleteWorkout = async (req, res, next) => {
    const id = req.params.id;

    try {
        await db.query(`DELETE FROM workoutlist WHERE _id = ${id}`);
        return next();
    } catch (err) {
        return next({
            log: 'problem in addWorkout',
            message: {err: 'cannot add workout'}
        })
    }
}

module.exports = workoutController;
