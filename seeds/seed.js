const sequelize = require('../config/connection');
const { Review, State, User, Comment } = require('../models');

const userData = require('./userData.json');
const stateData = require('./stateData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');


const seedDb = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, { individualHooks: true, returning: true });
    const reviews = await Review.bulkCreate(reviewData);
    const states = await State.bulkCreate(stateData);
    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);

}


seedDb();