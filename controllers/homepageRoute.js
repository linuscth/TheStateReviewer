
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Comment, Review, State, User } = require('../models')

router.get('/dashboard', withAuth, async (req, res) => {
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




// Render the welcome page
router.get('/', (req, res) => {
    res.render('welcome');
});

// log out route 
router.get('/logout', async (req, res) => {
    res.render('logout');
});

router.get('/addcomment/:id', withAuth, async (req, res) => {
    try {
        const targetReviewId = req.params.id;

        const reviewPlusCommentsData = await Review.findByPk(targetReviewId,
            {
                include: { model: Comment, attributes: ['user_comment', 'createdAt'], include: { model: User, attributes: ['username'] } }
            });
        const reviewsPlusComments = reviewPlusCommentsData.get({ plain: true })
        res.render('addComment', {
            reviewsPlusComments,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }

})



router.get('/addreview', withAuth, async (req, res) => {
    try {
        const stateData = await State.findAll()
        const states = stateData.map((eachState) => eachState.get({ plain: true }))

        console.log(states);
        res.render('addReview', {
            states,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;
