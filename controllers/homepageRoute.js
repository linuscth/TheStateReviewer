const express = require('express');
const router = express.Router();

// Render the welcome page
router.get('/', (req, res) => {
res.render('welcome');
});

module.exports = router;