const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const getAllCommentData = await Comment.findAll({
            include:
                [{
                    model: User,
                    attributes: 'username'
                }]
        });
        res.status(200).json(getAllCommentData)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router