const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// api/comments route
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
});

router.get('/:id', async (req, res) => {
    try {
      const reviewId = req.params.id;
  
      // Retrieve the review from the database based on the reviewId
      const review = await Review.findByPk(reviewId);
  
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
  
      res.render('addComment', { review });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
router.post('/:review_id', withAuth, async (req, res) => {
    try {
        const targetReviewId = req.params.review_id;

        const { user_comment } = req.body;

        if (!req.body) {
            res.status(404).json({ message: 'no user_comment ' })
            return
        }

        const createComment = await Comment.create({
            ...req.body,
            user_id: req.session.userId,
            review_id: targetReviewId
        })


        res.status(200).json(createComment)
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router