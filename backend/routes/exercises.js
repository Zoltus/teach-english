const database = require('../database/database.js');
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

// Helper method to check validation
const isValid = (field) => [
    body(field)
        .notEmpty()
        .withMessage(`${field} cannot be empty!`)
        .isString()
        .withMessage(`${field} must be a string!`),
];

//Validator for adding exercises
const exerciseValidator = [
    isValid('name'),
    isValid('category'),
    isValid('lang1'),
    isValid('lang2'),
    body('word_pairs')
        .isArray().withMessage('Word pairs must be an array!')
        .notEmpty().withMessage('Word pairs array cannot be empty!'),
    isValid('word_pairs.*.word1'),
    isValid('word_pairs.*.word2'),
];

const findAllWords = async (req, res) => {
    const id = parseInt(req.params.myId);
    try {
        const words = await database.findAllWords(id);
        res.status(200).json(words);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteExercise = async (req, res) => {
    const id = parseInt(req.params.myId);
    try {
        await database.deleteExercise(id);
        res.status(204).send({});
    } catch (err) {
        //todo console.error('Error deleting exercise:', error.message);
        res.status(404).send(err);
    }
};

const addExercise = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const insertedId = await database.addExercise(req.body);
        res.status(200).send({insertedId});
    } catch (error) {
        console.error('Error adding exercise:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Get all words
router.get('/:myId', findAllWords);
// Delete word by id
router.delete('/:myId', deleteExercise);
// Add new word
router.post('/', exerciseValidator, addExercise);

module.exports = router;