const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

let server = undefined;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

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

const listenApp = () => {
    server = app
        .listen(port, () => console.log(`Server listening on port ${port}`))
        .on('error', (err) => {
            console.error('Error starting server:', err);
            process.exit(1);
        });
};

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

const getAllExercises = () => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT *
            FROM exercises
                     LEFT JOIN word_pairs ON exercises.exercise_id = word_pairs.exercise_id`;
        pool.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
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

const addExercise = ({name, category, lang1, lang2, word_pairs}) => {
    return new Promise((resolve, reject) => {
        const exerciseQuery = 'INSERT INTO exercises (name, category, lang1, lang2) VALUES (?, ?, ?, ?)';
        pool.query(exerciseQuery, [name, category, lang1, lang2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const exerciseId = result.insertId;
                const wordPairsQuery = 'INSERT INTO word_pairs (exercise_id, word1, word2) VALUES ?';
                const wordPairsData = word_pairs.map(pair => [exerciseId, pair.word1, pair.word2]);
                console.log("PairData: ", wordPairsData)
                pool.query(wordPairsQuery, [wordPairsData], (err) =>
                    err ? reject(err) : resolve(exerciseId));
            }
        });
    });
};

const deleteExercise = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM exercises WHERE exercise_id = ?';
        pool.query(query, [id], (err, result) => err
            ? reject(err) : resolve());
    });
};

module.exports = {app, startApp, getAllExercises, addExercise, deleteExercise};