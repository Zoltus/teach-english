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

const findAllWords = ({lang1, lang2}) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT *
            FROM words
            WHERE (lang1 = ? AND lang2 = ?)
               OR (lang1 = ? AND lang2 = ?)`;
        pool.query(query, [lang1, lang2, lang2, lang1],
            (err, result) => err ? reject(err) : resolve(result));
    });
};

const addWord = ({lang1, lang2, value1, value2}) => {
    return new Promise((resolve, reject) => {
        const checkIfExists = `
            SELECT word_id
            FROM words
            WHERE (lang1 = ? AND lang2 = ? AND value1 = ? AND value2 = ?)
               OR (lang1 = ? AND lang2 = ? AND value1 = ? AND value2 = ?)`;
        pool.query(checkIfExists, [
            lang1, lang2, value1, value2,
            lang2, lang1, value2, value1
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    reject("Word already exists!");
                } else {
                    const query = `
                        INSERT INTO words (lang1, value1, lang2, value2)
                        VALUES (?, ?, ?, ?)`;
                    pool.query(query, [lang1, value1, lang2, value2],
                        (err, results) => err ? reject(error) : resolve("Word added!"));
                }
            }
        });
    });
};

const findWordById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM words WHERE id = ?';
        pool.query(query, [id], (err, result) => {
            if (err) {
                reject("ID not found!");
            } else {
                result.length === 0 ? reject('Word not found') : resolve(result[0]);
            }
        });
    });
};


module.exports = {app, startApp, findAllWords, addWord, findWordById};