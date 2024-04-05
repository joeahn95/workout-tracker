const db = require('../models/workoutModels');

const workoutController = {};

workoutController.getWorkouts = async (req, res, next) => {
    const queryText = 
    `SELECT workoutlist.name AS workout_name, workoutlist._id AS workout_id, 
    exerciselist.name AS exercise_name, exerciselist._id AS exercise_id,
    workout_to_exercise.reps, workout_to_exercise.sets
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

workoutController.getWorkoutHistory = async (req, res, next) => {
    const queryText = 
    `SELECT workout_to_exercise.sets, workout_to_exercise.reps, body.part, workout_record.completed_date
    FROM workout_record 
    INNER JOIN workout_to_exercise 
    ON workout_record.workout_id=workout_to_exercise.workout_id 
    INNER JOIN exercise_to_body 
    ON workout_to_exercise.exercise_id=exercise_to_body.exercise_id 
    INNER JOIN body 
    ON body._id=exercise_to_body.body_id`;

    try {
        const response = await db.query(queryText);
        res.locals.history = await response.rows;
        return next();
    } catch (err) {
        return next({
            log: 'problem in getWorkoutHistory',
            message: {err: 'cannot get workout history'}
        })
    }
}

workoutController.addWorkout = async (req, res, next) => {
    console.log(req.body);
    const {workout_id, workout_name, exerciseIdx, sets, reps} = req.body;

    try {
        // add workout to workoutlist
        await db.query(`INSERT INTO workoutlist VALUES (${workout_id}, '${workout_name}')`);
        const result = await(db.query('SELECT MAX(_id) FROM workout_to_exercise'));
        let join_table_id = result.rows[0].max + 1;

        // add each exercise in workout to the workout_to_exercise join table
        // form query text for multiple exercises
        let queryText = 'INSERT INTO workout_to_exercise VALUES';
        for (let i = 0; i < exerciseIdx.length; i++) {
          queryText += '(' + join_table_id + ',' + workout_id + ',' + exerciseIdx[i] + ',' + reps[i] + ',' + sets[i] + '),';
          join_table_id++;
        }
        queryText = queryText.slice(0,-1) + ';';
        // execute query for workout_to_exercise
        await db.query(queryText);

        return next();
    } catch (err) {
        return next({
            log: 'problem in addWorkout',
            message: {err: 'cannot add workout'}
        })
    }
}

workoutController.completeWorkout = async (req, res, next) => {
    const id = req.params.id;

    try {
        const result = await(db.query('SELECT MAX(_id) FROM workout_record'));
        let idx = result.rows[0].max + 1;
        const date = new Date();
        let currentDate = date.toJSON();

        await(db.query(`INSERT INTO workout_record VALUES(${idx}, ${id}, '${currentDate.slice(0,10)}');`));
        
        return next();
    } catch (err) {
        return next({
            log: 'problem in completeWorkout',
            message: {err: 'cannot complete workout'}
        })
    }
}

workoutController.deleteWorkout = async (req, res, next) => {
    const id = req.params.id;

    try {
        // delete from workout list
        await db.query(`DELETE FROM workoutlist WHERE _id = ${id}`);
        // delete all entries of join table that involve this workout
        await db.query(`DELETE FROM workout_to_exercise WHERE workout_id = ${id}`)
        return next();
    } catch (err) {
        return next({
            log: 'problem in addWorkout',
            message: {err: 'cannot add workout'}
        })
    }
}

module.exports = workoutController;
