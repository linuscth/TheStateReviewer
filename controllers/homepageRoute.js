const router = require('express').Router();

// Render welcome page
router.get('/', (req, res) => {
  res.render('welcome');
});

module.exports = router;
