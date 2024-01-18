const express = require('express');
const worldroute = require('./routes/exercises.js');
const {app, startApp } = require('./database/database.js');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use('/api/exercises', worldroute);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./frontend/dist"));
startApp();