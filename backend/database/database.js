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

module.exports = {app, startApp};