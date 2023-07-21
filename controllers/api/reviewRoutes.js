const router = require('express').Router();
const { Comment, User, Review, State } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/reviews routes
router.get('/', async (req, res) => {
  try {
    // Retrieve all reviews from the database
    const reviews = await Review.findAll({
      include: State, // Include the State model to access state information
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/reviews/state/:stateId
router.get('/state/:stateName', async (req, res) => {
  try {
    const stateName = req.params.stateName;

    // Retrieve all reviews for a specific state
    const reviews = await Review.findAll({
      include: [{
        model: State,
        where: { name: stateName },
      },
      {
        model: User,
        attributes: ['username']
      }]
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


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