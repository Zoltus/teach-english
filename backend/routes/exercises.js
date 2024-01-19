const database = require('../database/database.js');
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

/**
 * Helper method to check if a field is valid.
 * @param {string} field - Name of the field.
 * @returns validation.
 */
const isValid = (field) => [
    body(field)
        .notEmpty()
        .withMessage(`${field} cannot be empty!`)
        .isString()
        .withMessage(`${field} must be a string!`),
];

/**
 * Validators for adding exercises.
 */
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

/**
 * Get all exercises.
 * @param {Request} req - Rrequest object.
 * @param {Response} res - Response object.
 */
const getAllExercises = async (req, res) => {
    try {
        const words = await database.getAllExercises();
        res.status(200).json(words);
    } catch (err) {
        console.error('Error getting exercises:', err);
        res.status(500).json(err);
    }
};

/**
 * Delete Exercise based on the id.
 * @param {Request} req - Containing id to delete.
 * @param {Response} res - Response object.
 */
const deleteExercise = async (req, res) => {
    const id = parseInt(req.params.myId);
    try {
        await database.deleteExercise(id);
        res.status(204).send({});
    } catch (err) {
        console.error('Error deleting exercise:', err);
        res.status(404).send(err);
    }
};

/**
 * Add new exercise to new id.
 * @param {Request} req - Containing new exercise data.
 * @param {Response} res - Response of the new id added.
 */
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

/**
 * Update exercise based on id.
 * @param {Request} req - Request containing id to update and new values.
 * @param {Response} res - Response status
 */
const updateExercise = async (req, res) => {
    const id = parseInt(req.params.myId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        await database.updateExercise(id, req.body);
        res.status(204).send({});
    } catch (error) {
        console.error('Error adding exercise:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Get all Exercises
router.get('/', getAllExercises);
// Delete Exercise by id
router.delete('/:myId', deleteExercise);
// Add new Exercise
router.post('/', exerciseValidator, addExercise);
// Update exercise
router.patch('/:myId', exerciseValidator, updateExercise);

module.exports = router;