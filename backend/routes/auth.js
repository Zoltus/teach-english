const express = require('express');
const router = express.Router();
require('dotenv').config();



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
// Authenticate
router.post('/', authenticate);

module.exports = router;