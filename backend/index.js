const express = require('express');
const exercisesRoute = require('./routes/exercises.js');
const authRoute = require('./routes/auth.js');
const {app, startApp } = require('./database/database.js');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use('/api/exercises', exercisesRoute);
app.use('/api/auth', authRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/frontend/dist'));
startApp();