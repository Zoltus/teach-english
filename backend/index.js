const express = require('express');
const exercisesRoute = require('./routes/exercises.js');
const authRoute = require('./routes/auth.js');
const {app, startApp } = require('./database/database.js');
const cors = require('cors')

app.use(cors());
// Use json middleware to parse data in requesrs
app.use(express.json());
// Route for exercises
app.use('/api/exercises', exercisesRoute);
// Route for Authentication system
app.use('/api/auth', authRoute);
// Middleware to handle url-encoded data
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static(__dirname + '/frontend/dist'));
// Start the Express application.
startApp();