const router = require('express').Router();
const { Comment, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/reviews routes



router.post('/:state_id', withAuth, async (req, res) => {
    try {
        const targetStateId = req.params.state_id;

        const { rating, review_topic, review_details } = req.body;

        if (!req.body) {
            res.status(404).json({ message: 'no user_comment ' })
            return
        }

        const createReview = await Review.create({
            ...req.body,
            user_id: req.session.userId,
            state_id: targetStateId
        })


        res.status(200).json(createReview)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router