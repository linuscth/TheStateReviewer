const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Comment, Review, State, User } = require('../models')

router.get('/dashboard', async (req, res) => {
    try {
        const reviewData = await Review.findAll({ include: { model: User, attributes: ['username'] } });
        const reviews = reviewData.map((review) => review.get({ plain: true }))
        console.log(reviews[0]);
        res.render('dashboard', {
            reviews,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 