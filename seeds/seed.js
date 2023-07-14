const sequelize = require('../config/connection');
const { Review, State, User } = require('../models');

const userData = require('./userData.json');
const stateData = require('./stateData.json');
const reviewData = require('./reviewData.json');

const seedDb = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, { individualHooks: true, returning: true });
    const reviews = await Review.bulkCreate(reviewData);
    const states = await State.bulkCreate(stateData);

    process.exit(0);

}


seedDb();