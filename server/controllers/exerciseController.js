const db = require('../models/workoutModels');

const exerciseController = {};

exerciseController.getExercises = async (req, res, next) => {
    try {
        const response = await db.query('SELECT * FROM exerciselist');
        res.locals.exercises = await response.rows;
        return next();
    } catch (err) {
        return next({
            log: 'problem in getExercises',
            message: {err: 'cannot get exercise list'}
        })
    }
}

exerciseController.addExercise = async (req, res, next) => {
    const {_id, name, vid_link, equip_req} = req.body;

    try {
        await db.query(`INSERT INTO exerciselist VALUES (${_id}, '${name}', '${vid_link}', ${equip_req})`);
        return next();
    } catch (err) {
        return next({
            log: 'problem in addExercise',
            message: {err: 'cannot add exercise'}
        })
    }
}

exerciseController.deleteExercise = async (req, res, next) => {
    const id = req.params.id;

    try {
        await db.query(`DELETE FROM exerciselist WHERE _id = ${id}`);
        await db.query(`DELETE FROM workout_to_exercise WHERE exercise_id = ${id}`)
        return next();
    } catch (err) {
        return next({
            log: 'problem in addExercise',
            message: {err: 'cannot add exercise'}
        })
    }
}

// starWarsController.getCharacters = async (req, res, next) => {
//   // write code here

//   try{
//     const response = await db.query('SELECT people.*, species.name AS species, planets.name AS homeworld FROM people INNER JOIN species ON people.species_id = species._id INNER JOIN planets ON people.homeworld_id = planets._id');
//     // IF YOU PLAN TO CHANGE THE RESPONSE IN SOME WAY, USE SPREAD OPERATOR TO MAKE SHALLOW COPY OF RESPONSE.ROWS
//     // GOOD PRACTICE TO AVOID MUTATING THE ORIGINAL OBJECTS
//     // [ ...response.rows ]
//     res.locals.people = await response.rows;

//     const people = res.locals.people;
//     for (let i = 0; i < people.length; i++) {
//       const id = people[i]._id;
//       const filmResponse = await db.query('SELECT films.title, films._id AS id FROM people_in_films INNER JOIN films ON people_in_films.film_id = films._id WHERE people_in_films.person_id = $1',
//         [id]);

//       // set films array to the film query result above
//       res.locals.people[i].films = filmResponse.rows;
//     } 

//     return next();
//   }
//   catch (err) {
//     return next({
//       log: 'error in getCharacters',
//       message: {err: 'error while retrieveing characters'},
//       err
//     });
//   }
// };

// starWarsController.getSpecies = (req, res, next) => {
//   // write code here
//   const speciesId = req.query.id;
//   db.query(`SELECT species.*, planets.name AS homeworld FROM species INNER JOIN planets ON species.homeworld_id = planets._id WHERE species._id = ${speciesId}`)
//     .then(response => res.locals.speciesInfo = response.rows[0])
//     .then((arg) => next());
// };

// starWarsController.getHomeworld = (req, res, next) => {
//   const homeworldId = req.query.id;
//   // use parameterized query next time (see addCharacter)
//   db.query(`SELECT * FROM planets WHERE _id = ${homeworldId}`)
//     .then(response => res.locals.planetInfo = response.rows[0])
//     .then((arg) => next())
//     .catch((err) => {
//       return next({
//         log: 'error in getHomeworld',
//         message: {err: 'problem getting homeworld Data'},
//         err
//       });
//     });
// };

// starWarsController.getFilm = (req, res, next) => {
//   const filmId = req.query.id;
//   // use parameterized query next time (see addCharacter)
//   db.query(`SELECT * FROM films WHERE _id = ${filmId}`)
//     .then(response => res.locals.filmInfo = response.rows[0])
//     .then((arg) => next());
// };

// starWarsController.addCharacter = async (req, res, next) => {
//   // write code here

//   // const testBody = {
//   //   name: 'TEST PERSON',
//   //   gender: 'Male',
//   //   species: 'Aleena',
//   //   species_id: 16,
//   //   birth_year: '1990',
//   //   eye_color: 'blue',
//   //   skin_color: 'fair',
//   //   hair_color: 'blond',
//   //   mass: '80',
//   //   height: 180,
//   //   homeworld: 'Alderaan',
//   //   homeworld_id: 2,
//   //   films: [
//   //     { title: 'The Phantom Menace', id: 4 },
//   //     { title: 'Revenge of the Sith', id: 6 },
//   //     { title: 'A New Hope', id: 1 }
//   //   ]
//   // };

//   const {name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height, films} = req.body;

//   const peopleText = 'INSERT INTO people (name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
//   const peopleValues = [name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height];

//   try {
//     const response = await db.query(peopleText, peopleValues);
//     res.locals.id = await response.rows[0]._id;

//     const filmText = 'INSERT INTO people_in_films (person_id, film_id) VALUES ($1, $2)';
//     for (let i = 0; i < films.length; i++) {
//       const filmValues = [res.locals.id, films[i].id];
//       const filmResponse = await db.query(filmText, filmValues);
//     }

//     return next();
//   }
//   catch (err) {
//     return next({
//       log: 'error in addCharacter',
//       message: {err: 'problem adding character'},
//       err
//     });
//   }
// };

// starWarsController.deleteCharacter = async (req, res, next) => {
//   const personId = req.query.id;

//   try {
//     // use parameterized query next time (see addCharacter)
//     const peopleFilmResponse = await db.query(`DELETE FROM people_in_films WHERE person_id = ${personId}`);
//     const peopleResponse = await db.query(`DELETE FROM people WHERE _id = ${personId}`);
//     return next();
//   }
//   catch {
//     return next({
//       log: 'problem in deleteCharacter',
//       message: {err: 'problem deleting character'}
//     });
//   }
// };

// starWarsController.updateCharacter = async (req, res, next) => {
//   const personId = req.query.id;
//   let values = '';

//   // concat all update values from our req.body object
//   for (const key in req.body) {
//     if (values !== '') {
//       values += ', ';
//     }

//     // if value is string, add quote marks
//     if (typeof req.body[key] === 'string') values += `${key} = '${req.body[key]}'`;
//     else values += `${key} = ${req.body[key]}`;
//   }

//   console.log(values);

//   try {
//     // use parameterized query next time (see addCharacter)
//     const peopleResponse = await db.query(`UPDATE people SET ${values} WHERE _id = ${personId}`);
//     return next();
//   }
//   catch {
//     return next({
//       log: 'problem in updateCharacter',
//       message: {err: 'problem updating character, invalid entries'}
//     });
//   }
// };

module.exports = exerciseController;
