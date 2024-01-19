const express = require('express');
const router = express.Router();
require('dotenv').config();

/**
 * Authenticates a user.
 *
 * @param {Request} req - Request containing the credentials.
 * @param {Response} res - Response true or false depending if login was success.
 */
const authenticate = async (req, res) => {
    const { name, password} = req.body;
    const ADMIN_NAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASS= process.env.ADMIN_PASSWORD;
    if (name === ADMIN_NAME && password === ADMIN_PASS) {
        res.status(200).json({login: true})
    } else {
        res.status(200).json({login: false})
    }
};
// Authentication route
router.post('/', authenticate);

module.exports = router;