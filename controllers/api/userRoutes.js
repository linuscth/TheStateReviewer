const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser } = require('./userController');


// User registration route
router.post('/register', createUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', logoutUser);

module.exports = router;