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

// Validator for words
const wordValidator = [
    isValid('lang1'),
    isValid('value1'),
    isValid('lang2'),
    isValid('value2')
];

const getAllWords = async (req, res) => {
    try {
        const words = await database.findAllWords(req.query);
        res.status(200).json(words);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const addWord = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        try {
            const newWord = await database.addWord(req.body);
            res.status(201).json(newWord);
        } catch (err) {
            res.status(404).json(err.message);
        }
    }
};

const getWordById = async (req, res) => {

}

const deleteWord = async (req, res) => {

};

const updateWord = async (req, res) => {

};

// Get all words
router.get('/', getAllWords);
// Get word by id
router.get('/:myId', getWordById);
// Delete word by id
router.delete('/:myId', deleteWord);
// Add new word
router.post('/', wordValidator, addWord);
// Update word by id
router.put('/:myId', wordValidator, updateWord);

module.exports = router;