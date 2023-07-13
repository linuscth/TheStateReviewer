const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoute = require('./homepageRoute')

router.use('/api', apiRoutes);
router.use('/', homepageRoute);

module.exports = router;