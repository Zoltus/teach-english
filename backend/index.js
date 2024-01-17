const express = require('express');
const worldroute = require('./routes/words.js');
const {app, startApp } = require('./database/database.js');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use('/words', worldroute);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./frontend/dist"));
startApp();