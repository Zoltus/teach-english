const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

let server = undefined;

/**
 * Database connection pool.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

/**
 * Start the application. First tests connection then initializes the server.
 */
const startApp = () => {
    //Test connection
    pool.getConnection((err, con) => {
        con.release();
        // mysql connection
        if (err) {
            console.error('Error connecting to MySQL:', err);
            process.exit(1);
        } else {
            console.log('MySQL connection successful.');
            listenApp();
            //pool.end();
        }
    });
};

/**
 * Start the server listening port.
 */
const listenApp = () => {
    server = app
        .listen(port, () => console.log(`Server listening on port ${port}`))
        .on('error', (err) => {
            console.error('Error starting server:', err);
            process.exit(1);
        });
};

/**
 * Gracefully shutdown the server and close the database connection.
 */
const gracefulShutdown = async () => {
    try {
        console.log('Starting graceful shutdown...');
        if (server) {
            console.log('Server was opened, so we can close it...');
            await server.close();
            console.log('Server closed.');
            console.log('Closing MySQL.');
            await pool.end();
            console.log('DB connection closed.');
            process.exit(0);
        }
    } catch (err) {
        console.log('Error closing server/db:', err);
        process.exit(1);
    }
};

process.on('SIGTERM', gracefulShutdown); // Some other app requirest shutdown.
process.on('SIGINT', gracefulShutdown); // ctrl-c

/**
 * Get all exercises from the database.
 *
 * Finds all exercises and then does another query to wind all words for them
 * then it strips down duplicate/useless data and makes array from the word_pairs.
 *
 * @returns {Promise} Containing all Exercises.
 */
const getAllExercises = () => {
    return new Promise((resolve, reject) => {
        let selectQuery = `
            SELECT *
            FROM exercises
                     LEFT JOIN word_pairs ON exercises.exercise_id = word_pairs.exercise_id`;
        pool.query(selectQuery, (err, result) => {
            if (err) {
                reject(err)
            } else {
                //Map for unique exercises
                const Exercises = new Map();
                result.forEach(item => {
                    const exerciseId = item.exercise_id;
                    //Add exercicse to map if it doesnt exist yet
                    if (!Exercises.has(exerciseId)) {
                        const exercise = {
                            "exercise_id": exerciseId,
                            "name": item.name,
                            "category": item.category,
                            "lang1": item.lang1,
                            "lang2": item.lang2,
                            "word_pairs": []
                        }
                        Exercises.set(exerciseId, exercise);
                    }
                    //Add words for exercise
                    const exercise = Exercises.get(exerciseId);
                    const word = {
                        "word1": item.word1,
                        "word2": item.word2,
                    }
                    // Push word pair to words array
                    exercise.word_pairs.push(word)
                })
                //Convert Exercises to array
                resolve(Array.from(Exercises.values()))
            }
        });
    });
};

/**
 * Add a new exercise to the database.
 *
 * First incerts exercise and if successfull it inserts all words to word_pairs table.
 *
 * @param {Object} exerciseData - Destructed data for new exercise.
 * @returns {Promise<number>} Promise with the newly added id.
 */
const addExercise = ({name, category, lang1, lang2, word_pairs}) => {
    return new Promise((resolve, reject) => {
        const insertExerciseQuery = 'INSERT INTO exercises (name, category, lang1, lang2) VALUES (?, ?, ?, ?)';
        pool.query(insertExerciseQuery, [name, category, lang1, lang2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const exerciseId = result.insertId;
                const insertQuery = 'INSERT INTO word_pairs (exercise_id, word1, word2) VALUES ?';
                const wordPairsData = word_pairs.map(pair => [exerciseId, pair.word1, pair.word2]);
                pool.query(insertQuery, [wordPairsData], (err) => err ? reject(err) : resolve(exerciseId));
            }
        });
    });
};

/**
 * Update an existing exercise in the database.
 * @param {number} id - of the exercise to update.
 * @param {Object} exerciseData - New data for the exercise to update destructed.
 * @returns {Promise<number>} Promise with the id updated.
 */
const updateExercise = (id, {name, category, lang1, lang2, word_pairs}) => {
    return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE exercises SET name=?, category=?, lang1=?, lang2=? WHERE exercise_id=?';
        // Update exercise info
        pool.query(updateQuery, [name, category, lang1, lang2, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Delete existing word pairs
                const deleteQuery = 'DELETE FROM word_pairs WHERE exercise_id=?';
                pool.query(deleteQuery, [id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Insert new word pairs for the exercise
                        const insertQuery = 'INSERT INTO word_pairs (exercise_id, word1, word2) VALUES ?';
                        const pair_data = word_pairs.map(pair => [id, pair.word1, pair.word2]);
                        pool.query(insertQuery, [pair_data], (err) => err ? reject(err) : resolve(id));
                    }
                });
            }
        });
    });
};

/**
 * Deletes an exercise from the database.
 *
 * @param {number} id - of the exercise to delete.
 */
const deleteExercise = (id) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = 'DELETE FROM exercises WHERE exercise_id = ?';
        pool.query(deleteQuery, [id], (err, result) => err ? reject(err) : resolve());
    });
};

module.exports = {app, startApp, getAllExercises, addExercise, deleteExercise, updateExercise};