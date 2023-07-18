const router = require('express').Router();
const reviewRoutes = require('./reviewRoutes');
const commentRoutes = require('./commentRoutes');
const stateRoutes = require('./stateRoutes');


router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);
router.use('/states', stateRoutes);

module.exports = router;