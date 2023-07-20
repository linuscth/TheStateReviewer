const router = require('express').Router();
const { State, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const getStateReviewData = await State.findByPk(req.params.id, {
            include: {
                model: Review,
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        })

        res.status(200).json(getStateReviewData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/findstateid/:name', async (req, res) => {
    try {
        console.log(req.params.name);

        const getStateData = await State.findOne({ where: { name: req.params.name } })
        res.status(200).json(getStateData.id)
    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router